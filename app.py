import streamlit as st
import os
import google.generativeai as genai
from pinecone import Pinecone

# --- CONFIG ---
# Grab secrets from Streamlit Cloud or Environment variables
PINECONE_KEY = st.secrets.get("PINECONE_API_KEY", os.getenv("PINECONE_API_KEY"))
GEMINI_KEY = st.secrets.get("GEMINI_API_KEY", os.getenv("GEMINI_API_KEY"))

st.set_page_config(page_title="TechPulse AI", page_icon="⚡")

# --- SIDEBAR ---
with st.sidebar:
    st.title("⚡ TechPulse AI")
    st.markdown("This agent scans **15+ Tech News Sites** every hour.")
    st.markdown("---")
    st.info("Ask about recent AI models, Apple updates, or Crypto moves.")

# --- MAIN APP ---
st.title("The 'Real-Time' Tech Analyst")

if "messages" not in st.session_state:
    st.session_state.messages = []

# Display Chat History
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# --- LOGIC ---
def get_answer(query):
    try:
        pc = Pinecone(api_key=PINECONE_KEY)
        index = pc.Index("tech-news") 
        genai.configure(api_key=GEMINI_KEY)

        # 1. Embed Query (using the newer embedding model)
        query_embedding = genai.embed_content(
            model="models/text-embedding-004",
            content=query,
            task_type="retrieval_query"
        )['embedding']

        # 2. Search Pinecone
        results = index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )

        # 3. Construct Context
        context_text = ""
        for match in results['matches']:
            meta = match['metadata']
            context_text += f"- {meta['text']} (Source: {meta['source']})\n"

        # 4. Generate Answer with Gemini 2.5 (The FIX)
        # We use 'gemini-2.5-flash' because 1.5 is deprecated
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""
        You are a Tech News Analyst. Use the context below to answer the user's question.
        If the answer isn't in the news, say "I haven't seen news about that in the last 24 hours."
        
        LATEST NEWS CONTEXT:
        {context_text}
        
        USER QUESTION: {query}
        """
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {e}"

# Chat Input
if prompt := st.chat_input("What's happening in AI today?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Reading the news..."):
            response = get_answer(prompt)
            st.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})
