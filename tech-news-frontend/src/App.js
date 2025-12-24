import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  // Function to strip HTML tags using Regex
  const stripHTML = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, ''); // Remove all HTML tags.
  };

  useEffect(() => {
    fetch('/knowledge_base.json')
      .then((response) => response.json())
      .then((json) => {
        const limitedData = json.slice(0, 50); // Limit to top 50 articles.
        const modifiedData = limitedData.map((article) => ({
          ...article,
          shortSource: article.source.length > 20 ? `${article.source.substring(0, 20)}...` : article.source, // Truncate source names to avoid overflow issues.
          date: new Date().toLocaleDateString(), // Format article date.
          sanitizedSummary: stripHTML(article.summary), // Strip HTML tags from summary.
        }));
        setData(modifiedData);
      });
  }, []);

  return (
    <>
      <header className="header">
        <div className="logo">⚡ TechPulse</div>
        <input className="search-bar" type="text" placeholder="Search articles..." />
      </header>
      <main>
        <section className="hero">
          <h1>Stay Updated with the Latest in Tech News</h1>
          <p>Discover top stories, breakthroughs, and trends in technology every day. Tailored for tech enthusiasts.</p>
        </section>
        <section className="articles">
          {data.map((article, index) => (
            <div key={index} className="article-card">
              <div className="article-content">
                <span className="source">{article.shortSource}</span>
                <span className="date">{article.date}</span> {/* Display article date */}
                <h2>{article.title}</h2>
                <p>{article.sanitizedSummary}</p> {/* Sanitized content */}
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="footer">
        <p>Powered by Gemini AI • Updates every hour</p>
        <p>&copy; 2025 TechPulse - All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;