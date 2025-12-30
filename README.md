# 🚀 Automated RAG AI News Agent

![GitHub Repo stars](https://img.shields.io/github/stars/shauryaverma03/Automated-RAG-AI-News-Agent?style=social)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![Streamlit](https://img.shields.io/badge/Streamlit-App-red)
![License](https://img.shields.io/badge/License-MIT-green)

An AI-powered automated news intelligence system that collects, processes, summarizes, and retrieves daily tech news using Retrieval-Augmented Generation (RAG).

GitHub Repository: https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent  
Hugging Face Profile: https://huggingface.co/shaurya03  
Dataset: https://huggingface.co/datasets/shaurya03/tech-news-daily  

---

## About

Automated RAG AI News Agent automates the complete tech news pipeline:
- News collection and ingestion
- AI-based summarization
- Knowledge storage
- Semantic retrieval using RAG
- Interactive UI using Streamlit and React

This project is suitable for AI portfolios, hackathons, and real-world AI systems.

---

## Features

- Automated tech news ingestion
- RAG-based summarization
- JSON-based knowledge base
- Semantic search
- Streamlit interactive UI
- React frontend support
- Hugging Face & Pinecone integration

---

## Project Structure

Automated-RAG-AI-News-Agent/
├── tech-news-frontend/
├── ingest_and_push.py
├── knowledge_base.json
├── app.py
├── requirements.txt
├── .env.example
└── README.md

---

## Tech Stack

- Python
- Hugging Face Transformers
- Google Generative AI
- Pinecone / Vector Search
- Streamlit
- React
- JSON Knowledge Base

---

## Installation

git clone https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent.git  
cd Automated-RAG-AI-News-Agent  
pip install -r requirements.txt  

---

## Environment Variables

Create a .env file:

HUGGINGFACE_API_KEY=your_hf_key_here  
GOOGLE_API_KEY=your_google_key_here  
PINECONE_API_KEY=your_pinecone_key_here  

---

## Usage

Ingest News:

python ingest_and_push.py  

Run App:

streamlit run app.py  

---

## RAG Workflow

1. News scraping / RSS ingestion  
2. Text chunking  
3. Embedding generation  
4. Knowledge storage  
5. Semantic retrieval  
6. AI-generated summaries  

---

## Customization

- Add new sources in ingest_and_push.py
- Customize Streamlit or React UI
- Replace JSON with Pinecone or MongoDB
- Automate ingestion using cron jobs

---

## Future Scope

- Real-time news ingestion
- Topic-wise clustering
- Multilingual summaries
- Voice-based interaction
- User authentication

---

## License

MIT License

---

## Contributing

Issues and pull requests are welcome.

---

## Support

If you like this project, give it a star ⭐
