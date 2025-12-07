import os
import json
import feedparser
import pandas as pd
import google.generativeai as genai
from pinecone import Pinecone
from huggingface_hub import HfApi, hf_hub_download
from datetime import datetime

# --- CONFIGURATION ---
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

# Load Keys
PINECONE_KEY = os.getenv("PINECONE_API_KEY")
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
HF_TOKEN = os.getenv("HF_TOKEN")
HF_REPO_ID = os.getenv("HF_REPO_ID")

def fetch_feeds():
    """Scrapes RSS feeds."""
    articles = []
    print("📡 Scanning feeds...")
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:5]:
                published = entry.get("published", str(datetime.now()))
                summary = entry.get("summary", "")[:500]
                
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
    
    df = pd.DataFrame(articles)
    if not df.empty:
        df.drop_duplicates(subset="link", keep="first", inplace=True)
    return df

def update_pinecone(df):
    """Updates Vector DB."""
    print("🌲 Updating Pinecone...")
    try:
        pc = Pinecone(api_key=PINECONE_KEY)
        index = pc.Index("tech-news")
        genai.configure(api_key=GEMINI_KEY)
        
        vectors = []
        for _, row in df.iterrows():
            try:
                text = f"{row['title']} - {row['summary']}"
                emb = genai.embed_content(
                    model="models/text-embedding-004",
                    content=text,
                    task_type="retrieval_document"
                )['embedding']
                
                meta = {
                    "text": text,
                    "url": row['link'],
                    "source": row['source'],
                    "date": row['published']
                }
                vectors.append((row['link'], emb, meta))
            except Exception as e:
                print(f"Embedding error: {e}")

        if vectors:
            index.upsert(vectors=vectors)
            print(f"✅ Indexed {len(vectors)} articles.")
    except Exception as e:
        print(f"Pinecone error: {e}")

def update_huggingface(df):
    """Archives to Hugging Face."""
    print("🤗 Archiving...")
    try:
        api = HfApi(token=HF_TOKEN)
        file_name = "daily_news.csv"
        
        try:
            path = hf_hub_download(repo_id=HF_REPO_ID, filename=file_name, repo_type="dataset", token=HF_TOKEN)
            existing_df = pd.read_csv(path)
            combined_df = pd.concat([existing_df, df]).drop_duplicates(subset="link")
        except:
            print("ℹ️ Creating new dataset file.")
            combined_df = df

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

def save_to_json(df):
    """Saves new articles to a local JSON file (The Data Book)."""
    print("📝 Writing to JSON Knowledge Base...")
    json_file = "knowledge_base.json"
    
    # 1. Load existing data
    data = []
    if os.path.exists(json_file):
        try:
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError:
            data = []
    
    # 2. Check for duplicates using a set of links
    existing_links = {item['link'] for item in data}
    
    new_count = 0
    for _, row in df.iterrows():
        if row['link'] not in existing_links:
            # Convert row to dictionary and append
            data.append(row.to_dict())
            new_count += 1
            
    # 3. Save back to file
    if new_count > 0:
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, default=str)
        print(f"✅ Added {new_count} new articles to {json_file}")
    else:
        print("ℹ️ No new articles to add to JSON.")

if __name__ == "__main__":
    news_df = fetch_feeds()
    if not news_df.empty:
        update_pinecone(news_df)
        update_huggingface(news_df)
        save_to_json(news_df) # <--- UPDATED to use JSON
    else:
        print("No news found.")
