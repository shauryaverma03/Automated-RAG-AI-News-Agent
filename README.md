# 🚀 Automated-RAG-AI-News-Agent

[![GitHub](https://img.shields.io/badge/GitHub-shauryaverma03%2FAutomated--RAG--AI--News--Agent-blue)](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent)

## 🤗 Hugging Face Profile & Dataset

- **Check my Hugging Face profile:** [https://huggingface.co/your-hf-username](https://huggingface.co/your-hf-username)
- **Directly download the dataset:** [https://huggingface.co/datasets/your-dataset-path](https://huggingface.co/datasets/your-dataset-path)

---

Welcome to **Automated-RAG-AI-News-Agent**! This Python-powered project brings together the latest advances in Retrieval-Augmented Generation (RAG) with automated news gathering and summarization.  
Whether you're a developer, data scientist, or news enthusiast, this agent makes it easy to collect, analyze, and summarize news with just a few steps.  

---

## 🌟 Features

- **Automated News Ingestion**: Pulls in news articles from multiple sources (RSS, APIs, or web scraping).
- **RAG-Driven Summarization**: Uses Retrieval-Augmented Generation integrating cutting-edge AI from Hugging Face and Google Generative AI.
- **Knowledge Base**: Stores retrieved content for fast contextual access and analysis.
- **Streamlit UI**: Ready-to-use interactive web interface.
- **Easy Customization**: Swap sources, adjust summarization logic, or plug in your own AI models.

---

## 📁 Project Structure

| File Name                | Purpose                                                                              |
|--------------------------|--------------------------------------------------------------------------------------|
| `app.py`                 | Main Streamlit application, provides user interface for querying and results display.|
| `ingest_and_push.py`     | Handles downloading news, extracting content, and populating the knowledge base.     |
| `knowledge_base.json`    | Stores news articles and summaries in structured format.                             |
| `requirements.txt`       | Lists all Python dependencies needed for the project.                                |
| `.env` (create yourself) | Stores API keys and configuration values.                                            |

---

## 🛠️ Installation & Setup

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent.git
cd Automated-RAG-AI-News-Agent
```

### **Step 2: Install Dependencies**

Ensure you have Python 3.8+, then run:
```sh
pip install -r requirements.txt
```
Key packages used:
- `requests`, `beautifulsoup4`, `feedparser` (news ingestion & parsing)
- `pinecone`, `huggingface_hub`, `google-generativeai` (RAG & AI integration)
- `pandas` (data handling)
- `streamlit` (web UI)
- `python-dotenv`, `lxml` (config management, parsing)

### **Step 3: Configure Environment**

Create a `.env` file in the root folder:
```env
HUGGINGFACE_API_KEY=your_hf_key_here
GOOGLE_API_KEY=your_google_key_here
PINECONE_API_KEY=your_pinecone_key_here
```
Add relevant API keys for the services you plan to use.

---

## 🚦 How to Use

### **Ingest News and Populate Knowledge Base**
```sh
python ingest_and_push.py
```
- Fetches news, scrapes & extracts important content.
- Populates `knowledge_base.json` for use by the agent.

### **Run the Interactive Web App**
```sh
streamlit run app.py
```
- Launches an interactive UI for querying news topics and reviewing AI-generated summaries.

### **Query the RAG AI News Agent**
- Use the UI or connect via API (see `app.py` for endpoint details).
- Ask questions, request summaries, or explore the knowledge base.

---

## 💡 How It Works

1. **Ingestion**: Downloads and parses news articles using Python libraries (`requests`, `beautifulsoup4`, etc.).
2. **Knowledge Base Population**: Stores articles in `knowledge_base.json` with topic metadata.
3. **RAG Summarization**: For user queries, retrieves relevant news excerpts and sends them to either Hugging Face or Google Generative AI models.
4. **User Interface**: Streamlit provides a friendly interface for exploration and interaction.

---

## 🧑‍💻 Customization

- Add/remove news sources in `ingest_and_push.py`.
- Integrate with additional LLMs by updating RAG modules.
- Personalize the Streamlit UI in `app.py`.
- Adjust knowledge base structure or add new fields as needed.

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/blob/main/LICENSE) for details.

---

## 🙋‍♀️ Contributing

- Contributions, feature requests, and feedback are welcome!
- Open an issue or pull request to improve the agent.

---

## 🔗 References & Support

- [Hugging Face](https://huggingface.co/)
- [Google Generative AI](https://ai.google/)
- [Streamlit Docs](https://docs.streamlit.io/)
- [MIT License](https://opensource.org/licenses/MIT)

---
*Developed by shauryaverma03 – Automated RAG meets the world of news!*
