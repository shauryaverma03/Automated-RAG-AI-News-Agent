# 🤖 Automated RAG AI News Agent

[![GitHub](https://img.shields.io/badge/GitHub-shauryaverma03%2FAutomated--RAG--AI--News--Agent-blue)](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent)
[![Language: JavaScript](https://img.shields.io/badge/Language-JavaScript%20%7C%20Python-yellow)](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/blob/main/LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent)

---

## 🤗 Hugging Face Profile & Dataset

- **Check my Hugging Face profile:** [https://huggingface.co/shaurya03](https://huggingface.co/shaurya03)
- **Directly download the dataset:** [https://huggingface.co/datasets/shaurya03/tech-news-daily](https://huggingface.co/datasets/shaurya03/tech-news-daily)

---

Welcome to **Automated-RAG-AI-News-Agent**! This Python-powered project brings together the latest advances in Retrieval-Augmented Generation (RAG) with automated news gathering and summarization.   
Whether you're a developer, data scientist, or news enthusiast, this agent makes it easy to collect, analyze, and summarize news with just a few steps.  

The project features a modern **React-based frontend** for an interactive user experience paired with a powerful **Python backend** for RAG-driven news processing.

---

## 🌟 Features

- **Automated News Ingestion**: Pulls in news articles from multiple sources (RSS, APIs, or web scraping).
- **RAG-Driven Summarization**: Uses Retrieval-Augmented Generation integrating cutting-edge AI from Hugging Face and Google Generative AI.
- **Knowledge Base**:  Stores retrieved content for fast contextual access and analysis.
- **React-based Web Interface**: Modern, responsive UI built with React for seamless user interaction.
- **Easy Customization**: Swap sources, adjust summarization logic, or plug in your own AI models. 
- **Real-time News Updates**: Stay informed with the latest news from multiple sources.

---

## 📁 Project Structure

```
Automated-RAG-AI-News-Agent/
├── backend/
│   ├── ingest_and_push.py      # News ingestion & knowledge base population
│   ├── knowledge_base.json     # Structured news storage & summaries
│   ├── requirements.txt        # Python dependencies
│   └── . env                    # Environment variables (create yourself)
│
├── tech-news-frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── assets/             # Images & static files
│   │   ├── styles/             # CSS stylesheets
│   │   └── App.js              # Main React component
│   ├── public/
│   └── package.json            # Node.js dependencies
│
├── README.md                   # This file
├── LICENSE                     # MIT License
└── . github/                    # GitHub workflows & templates

```

---

## 🛠️ Installation & Setup

### **Prerequisites**
- Python 3.8+
- Node.js 14+ & npm
- Git

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent.git
cd Automated-RAG-AI-News-Agent
```

---

## Backend Setup

### **Step 2: Install Python Dependencies**

Ensure you have Python 3.8+, then run:
```sh
pip install -r requirements.txt
```

**Key packages used:**
- `requests`, `beautifulsoup4`, `feedparser` — News ingestion & parsing
- `pinecone` — Vector database for RAG
- `huggingface_hub`, `google-generativeai` — AI model integration
- `pandas` — Data handling
- `python-dotenv`, `lxml` — Configuration & parsing

### **Step 3: Configure Environment**

Create a `.env` file in the root folder: 
```env
HUGGINGFACE_API_KEY=your_hf_key_here
GOOGLE_API_KEY=your_google_key_here
PINECONE_API_KEY=your_pinecone_key_here
PINECONE_ENVIRONMENT=your_env_here
```

Add relevant API keys for the services you plan to use.

### **Step 4: Ingest News and Populate Knowledge Base**
```sh
python ingest_and_push.py
```
- Fetches news from configured sources
- Scrapes & extracts important content
- Populates `knowledge_base.json` for use by the agent

---

## Frontend Setup

### **Step 5: Install Frontend Dependencies**

Navigate to the frontend directory: 
```sh
cd tech-news-frontend
npm install
```

### **Step 6: Configure Frontend**

Create a `.env` file in the `tech-news-frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_KEY=your_api_key
```

### **Step 7: Run the React Application**
```sh
npm start
```
- Launches the development server on `http://localhost:3000`
- Hot reload enabled for live development

---

## 🚦 How to Use

### **Option 1: Run Both Services**

**Terminal 1 - Backend:**
```sh
# From root directory
python ingest_and_push.py
# Then start your Flask/FastAPI server (if applicable)
```

**Terminal 2 - Frontend:**
```sh
cd tech-news-frontend
npm start
```

Then open your browser and navigate to `http://localhost:3000`

### **Option 2: Production Build**

**Build the React frontend:**
```sh
cd tech-news-frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 💡 How It Works

```
┌──────────────────────────────────────────────────────────┐
│           React Frontend (tech-news-frontend)             │
│        Interactive UI for user interactions              │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTP/REST API
┌─────────────────────────▼────────────────────────────────┐
│             Python Backend (Flask/FastAPI)                │
│          API routes & RAG processing logic                │
└─────────────────────────┬────────────────────────────────┘
                          │
            ┌─────────────┼──────────────┐
            │             │              │
    ┌───────▼──────┐  ┌───▼────────┐  ┌─▼──────────────┐
    │   Ingestion  │  │ Knowledge  │  │ RAG Pipeline   │
    │   (ingest_   │  │ Base       │  │ (Hugging Face/ │
    │   and_push)  │  │ (JSON)     │  │  Google AI)    │
    └──────────────┘  └────────────┘  └────────────────┘
            │             │              │
            └─────────────┼──────────────┘
                          │
                    ┌─────▼─────┐
                    │ Pinecone  │
                    │ Vector DB │
                    └───────────┘
```

1. **Frontend (React)**: Users interact with the modern UI to query news and request summaries.
2. **Backend (Python)**: Processes requests, retrieves relevant news from the knowledge base. 
3. **Ingestion**: `ingest_and_push.py` fetches news, parses content, and populates the knowledge base. 
4. **RAG Processing**:  Combines retrieved news with AI models for intelligent summarization. 
5. **Vector Storage**: Pinecone stores embeddings for fast semantic search.

---

## 🧑‍💻 Customization

- **Add/Remove News Sources**: Edit `ingest_and_push.py` to modify RSS feeds or API endpoints.
- **Integrate Additional LLMs**: Update RAG modules to use different AI providers. 
- **Customize Frontend**: Modify React components in `tech-news-frontend/src/`.
- **Adjust Knowledge Base**: Change structure or add new fields in `knowledge_base.json`.
- **Styling**: Edit CSS files in `tech-news-frontend/src/styles/` for custom design.

---

## 📜 License

This project is licensed under the MIT License.  See [LICENSE](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/blob/main/LICENSE) for details.

---

## 🙋‍♀️ Contributing

Contributions, feature requests, and feedback are welcome! 
- 🐛 Report bugs via [GitHub Issues](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/issues)
- 💡 Suggest features via [Discussions](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/discussions)
- 🔀 Open a [Pull Request](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/pulls) to contribute code

---

## 🔗 References & Support

- [Hugging Face](https://huggingface.co/) — AI Model Hub
- [Google Generative AI](https://ai.google/) — Generative AI Models
- [Pinecone](https://www.pinecone.io/) — Vector Database
- [React Documentation](https://react.dev/) — Frontend Framework
- [Python Requests](https://requests.readthedocs.io/) — HTTP Library
- [MIT License](https://opensource.org/licenses/MIT) — License Info

---

## 📧 Support

For questions, issues, or suggestions: 
- 📝 Check the [GitHub Issues](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/issues)
- 💬 Open a [GitHub Discussion](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/discussions)
- 📧 Contact:  [shauryaverma03](https://github.com/shauryaverma03)

---

<div align="center">

*Developed by [shauryaverma03](https://github.com/shauryaverma03) — Automated RAG meets the world of news!*

**⭐ If you find this project helpful, please consider giving it a star! **

</div>
