import os
import feedparser
import pandas as pd
import google.generativeai as genai
from pinecone import Pinecone
from huggingface_hub import HfApi, hf_hub_download
from datetime import datetime

# --- CONFIGURATION ---
# 15 High-Quality Tech RSS Feeds
RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/rss",
    "https://feeds.arstechnica.com/arstechnica/index",
    "https://venturebeat.com/feed/",
    "https://www.engadget.com/rss.xml",
    "https://gizmodo.com/rss",
    "https://mashable.com/feed",
    "https://readwrite.com/feed/",
    "https://www.zdnet.com/news/rss.xml",
    "https://www.computerworld.com/index.rss",
    "https://www.infoworld.com/index.rss",
    "https://news.ycombinator.com/rss",
    "https://www.artificialintelligence-news.com/feed/",
    "https://www.technologyreview.com/feed/"
]

# Load Keys from Environment (GitHub Secrets)
PINECONE_KEY = os.getenv("PINECONE_API_KEY")
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
HF_TOKEN = os.getenv("HF_TOKEN")
HF_REPO_ID = os.getenv("HF_REPO_ID")

def fetch_feeds():
    """Scrapes RSS feeds and cleans data."""
    articles = []
    print("📡 Scanning feeds...")
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            # Take top 5 newest articles from each site
            for entry in feed.entries[:5]:
                published = entry.get("published", str(datetime.now()))
                summary = entry.get("summary", "")[:500] # Shorten summary
                
                articles.append({
                    "id": entry.link, 
                    "title": entry.title,
                    "link": entry.link,
                    "published": published,
                    "source": feed.feed.get("title", "Unknown"),
                    "summary": summary
                })
        except Exception as e:
            print(f"⚠️ Error fetching {url}: {e}")
    
    # Remove duplicates
    df = pd.DataFrame(articles)
    if not df.empty:
        df.drop_duplicates(subset="link", keep="first", inplace=True)
    return df

def update_pinecone(df):
    """Hot Storage: Updates Vector DB for the App."""
    print("🌲 Updating Pinecone...")
    try:
        pc = Pinecone(api_key=PINECONE_KEY)
        index = pc.Index("tech-news")
        genai.configure(api_key=GEMINI_KEY)
        
        vectors = []
        for _, row in df.iterrows():
            try:
                # Create text chunk for embedding
                text = f"{row['title']} - {row['summary']}"
                
                # Generate Embedding
                emb = genai.embed_content(
                    model="models/text-embedding-004",
                    content=text,
                    task_type="retrieval_document"
                )['embedding']
                
                # Metadata for the app to display
                meta = {
                    "text": text,
                    "url": row['link'],
                    "source": row['source'],
                    "date": row['published']
                }
                vectors.append((row['link'], emb, meta))
            except Exception as e:
                print(f"Embedding error: {e}")

        # Upload in batches
        if vectors:
            index.upsert(vectors=vectors)
            print(f"✅ Indexed {len(vectors)} articles.")
    except Exception as e:
        print(f"Pinecone connection error: {e}")

def update_huggingface(df):
    """Cold Storage: Archives data for future training."""
    print("🤗 Archiving to Hugging Face...")
    try:
        api = HfApi(token=HF_TOKEN)
        file_name = "daily_news.csv"
        
        # 1. Download existing data (if any)
        try:
            path = hf_hub_download(repo_id=HF_REPO_ID, filename=file_name, repo_type="dataset", token=HF_TOKEN)
            existing_df = pd.read_csv(path)
            # Combine and remove duplicates
            combined_df = pd.concat([existing_df, df]).drop_duplicates(subset="link")
        except:
            print("ℹ️ Creating new dataset file.")
            combined_df = df

        # 2. Save and Upload
        combined_df.to_csv(file_name, index=False)
        api.upload_file(
            path_or_fileobj=file_name,
            path_in_repo=file_name,
            repo_id=HF_REPO_ID,
            repo_type="dataset",
            commit_message=f"Auto-update {datetime.now()}"
        )
        print("✅ Dataset backed up.")
    except Exception as e:
        print(f"Hugging Face upload error: {e}")

if __name__ == "__main__":
    news_df = fetch_feeds()
    if not news_df.empty:
        update_pinecone(news_df)
        update_huggingface(news_df)
    else:
        print("No news found.")