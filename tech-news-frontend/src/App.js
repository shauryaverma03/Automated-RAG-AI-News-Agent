import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // Load news data when component mounts
  useEffect(() => {
    loadNews();
    // Auto-refresh every hour
    const interval = setInterval(loadNews, 3600000);
    return () => clearInterval(interval);
  }, []);

  const loadNews = async () => {
    try {
      const response = await fetch('/knowledge_base.json');
      const data = await response.json();
      
      // Sort by published date (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.published) - new Date(a.published)
      );
      
      setArticles(sorted.slice(0, 20)); // Latest 20
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    } catch (error) {
      console.error('Error loading news:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>⚡ TechPulse AI</h1>
        <p>Automated Tech News Platform</p>
        <span className="badge">Updates Hourly | DevOps Project 2025</span>
      </header>

      {/* Info Banner */}
      <div className="info-banner">
        <span>📡 Auto-fetches from <strong>15+ tech news sources</strong> every hour</span>
        <span className="update-time">Last updated:  {lastUpdated}</span>
      </div>

      {/* Main Content */}
      <main className="main">
        <h2>Latest Tech News</h2>
        
        {loading ?  (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading latest news...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="no-data">
            <p>No articles found. Please run the news ingestion script. </p>
          </div>
        ) : (
          <div className="news-grid">
            {articles.map((article, index) => (
              <div key={index} className="news-card">
                <div className="card-header">
                  <span className="source">{article.source || 'Tech News'}</span>
                  <span className="date">
                    {new Date(article.published).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="title">{article.title}</h3>
                
                <p className="summary">
                  {article.summary 
                    ? article.summary.substring(0, 150) + '...' 
                    : 'No summary available'}
                </p>
                
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read Article →
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Powered by GitHub Actions | RAG Pipeline with Pinecone & Gemini AI</p>
        <p>Data updates automatically every hour</p>
      </footer>
    </div>
  );
}

export default App;
