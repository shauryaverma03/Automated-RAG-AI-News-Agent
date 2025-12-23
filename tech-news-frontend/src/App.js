import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * TechPulse - AI-Powered Tech News Aggregator
 * Main application component that displays curated tech news from various sources
 */
function App() {
  // State management
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Available news categories
  const categories = ['All', 'AI', 'Hardware', 'Software', 'Startups', 'Security'];

  // Load news on component mount and refresh every hour
  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  /**
   * Fetches news articles from the knowledge base
   * Sorts articles by published date (newest first)
   */
  const loadNews = async () => {
    try {
      const response = await fetch('/knowledge_base.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
      
      const sorted = data.sort((a, b) => 
        new Date(b.published) - new Date(a.published)
      );
      
      setArticles(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error loading news:', error);
      setArticles([]);
      setLoading(false);
    }
  };

  /**
   * Converts a date to a human-readable "time ago" format
   * @param {string} date - ISO date string
   * @returns {string} Formatted time ago string
   */
  const getTimeAgo = (date) => {
    const now = new Date();
    const published = new Date(date);
    const diffMs = now - published;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  /**
   * Returns an emoji logo for each news source
   * @param {string} source - News source name
   * @returns {string} Emoji representing the source
   */
  const getSourceLogo = (source) => {
    const logos = {
      'TechCrunch': '🚀',
      'The Verge': '🔷',
      'Wired':  '⚡',
      'Ars Technica': '🎯',
      'VentureBeat': '💼',
      'Engadget': '📱',
      'Gizmodo': '🔧',
      'Mashable': '🌐',
      'ZDNet': '💻',
      'AI News': '🤖'
    };
    return logos[source] || '📰';
  };

  const filterArticles = () => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        article.summary.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredArticles = filterArticles();
  const heroArticle = filteredArticles[0];
  const topStories = filteredArticles.slice(1, 7);
  const moreNews = filteredArticles.slice(7);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading latest tech news...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 className="logo">⚡ TechPulse</h1>
        </div>
        
        <div className="search-container">
          <input 
            type="text"
            placeholder="Search for topics, sources & articles..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="header-right">
          <button className="icon-btn" title="Help">❓</button>
          <button className="icon-btn" title="Settings">⚙️</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        {categories.map(category => (
          <button
            key={category}
            className={`nav-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Article */}
        {heroArticle && (
          <section className="hero-section">
            <div className="section-header">
              <h2 className="section-title">Top Story</h2>
            </div>
            
            <a href={heroArticle.link} target="_blank" rel="noopener noreferrer" className="hero-card">
              <div className="hero-content">
                <div className="hero-meta">
                  <span className="source-badge">
                    {getSourceLogo(heroArticle.source)} {heroArticle.source}
                  </span>
                  <span className="time-badge">{getTimeAgo(heroArticle.published)}</span>
                </div>
                <h1 className="hero-title">{heroArticle.title}</h1>
                <p className="hero-summary">{heroArticle.summary?.substring(0, 200)}...</p>
              </div>
            </a>
          </section>
        )}

        {/* Top Stories Grid */}
        <section className="top-stories-section">
          <div className="section-header">
            <h2 className="section-title">Latest Updates</h2>
            <span className="article-count">{filteredArticles.length} articles</span>
          </div>

          <div className="top-stories-grid">
            {topStories.map((article, index) => (
              <a 
                key={index}
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="story-card"
              >
                <div className="story-meta">
                  <span className="source-tag">
                    {getSourceLogo(article.source)} {article.source}
                  </span>
                </div>
                <h3 className="story-title">{article.title}</h3>
                <p className="story-summary">{article.summary?.substring(0, 120)}...</p>
                <div className="story-footer">
                  <span className="story-time">{getTimeAgo(article.published)}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* More News List */}
        <section className="more-news-section">
          <div className="section-header">
            <h2 className="section-title">More Headlines</h2>
          </div>

          <div className="news-list">
            {moreNews.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-item"
              >
                <div className="news-item-content">
                  <div className="news-item-header">
                    <span className="news-source">
                      {getSourceLogo(article.source)} {article.source}
                    </span>
                    <span className="news-time">{getTimeAgo(article.published)}</span>
                  </div>
                  <h4 className="news-item-title">{article.title}</h4>
                  <p className="news-item-summary">{article.summary?.substring(0, 150)}...</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Powered by GitHub Actions • RAG Pipeline with Pinecone & Gemini AI</p>
        <p>Updates automatically every hour • DevOps Project 2025</p>
      </footer>
    </div>
  );
}

export default App;