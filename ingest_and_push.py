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
    "https://www.infoworld.com/index. rss",
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
            for entry in feed.entries[: 5]:
                published = entry. get("published", str(datetime. now()))
                summary = entry. get("summary", "")[:500]
                
                articles.append({
                    "id": entry.link, 
                    "title": entry.title,
                    "link": entry.link,
                    "published": published,
                    "source": feed. feed.get("title", "Unknown"),
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
        for _, row in df. iterrows():
            try:
                text = f"{row['title']} - {row['summary']}"
                emb = genai.embed_content(
                    model="models/text-embedding-004",
                    content=text,
                    task_type="retrieval_document"
                )['embedding']
                
                meta = {
                    "text":  text,
                    "url":  row['link'],
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
            existing_df = pd. read_csv(path)
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
            commit_message=f"Auto-update {datetime. now()}"
        )
        print("✅ Dataset backed up.")
    except Exception as e:
        print(f"Hugging Face upload error: {e}")

def save_to_json(df):
    """Saves new articles to JSON files in BOTH locations."""
    print("📝 Writing to JSON Knowledge Base...")
    
    # Define both file paths
    json_files = [
        "knowledge_base.json",  # Root location
        "tech-news-frontend/public/knowledge_base.json"  # React public folder
    ]
    
    # Process each location
    for json_file in json_files: 
        # 1. Ensure directory exists (for React public folder)
        os.makedirs(os.path.dirname(json_file) if os.path.dirname(json_file) else ".", exist_ok=True)
        
        # 2. Load existing data
        data = []
        if os.path.exists(json_file):
            try:
                with open(json_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                print(f"📂 Loaded {len(data)} existing articles from {json_file}")
            except json.JSONDecodeError:
                print(f"⚠️ Could not read {json_file}, starting fresh")
                data = []
        else:
            print(f"ℹ️ {json_file} does not exist, creating new file")
        
        # 3. Check for duplicates using a set of links
        existing_links = {item['link'] for item in data}
        
        new_count = 0
        for _, row in df.iterrows():
            if row['link'] not in existing_links:
                # Convert row to dictionary and append
                data.append(row.to_dict())
                new_count += 1
        
        # 4. Save back to file
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, default=str)
        
        if new_count > 0:
            print(f"✅ Added {new_count} new articles to {json_file}")
        else:
            print(f"ℹ️ No new articles added to {json_file} (already up to date)")
    
    print(f"✨ Both JSON files updated successfully!")

if __name__ == "__main__": 
    print("\n" + "="*60)
    print("🚀 TechPulse AI - Automated News Ingestion")
    print("="*60 + "\n")
    
    news_df = fetch_feeds()
    
    if not news_df.empty:
        print(f"\n📊 Fetched {len(news_df)} unique articles")
        print("-" * 60)
        update_pinecone(news_df)
        print("-" * 60)
        update_huggingface(news_df)
        print("-" * 60)
        save_to_json(news_df)
        print("\n" + "="*60)
        print("✅ Ingestion Complete!")
        print("="*60 + "\n")
    else:
        print("\n⚠️ No news articles found.\n")