import React, { useState, useEffect } from 'react';
import './App.css';

// Dynamic Subcategories
const SUBCATEGORIES = [
  { name: 'Artificial Intelligence & Machine Learning', keywords: ['ai', 'machine learning', 'neural', 'deep learning', 'nlp'] },
  { name: 'Software Development & Programming', keywords: ['programming', 'coding', 'software', 'development', 'framework', 'app', 'application'] },
  { name: 'Hardware & Devices', keywords: ['hardware', 'devices', 'laptop', 'smartphone', 'chip', 'computer'] },
  { name: 'Cybersecurity & Privacy', keywords: ['cybersecurity', 'privacy', 'hack', 'security', 'breach'] },
  { name: 'Cloud Computing & Infrastructure', keywords: ['cloud', 'infrastructure', 'aws', 'azure', 'container', 'serverless', 'hosting'] },
  { name: 'Blockchain, Web3 & FinTech', keywords: ['blockchain', 'crypto', 'web3', 'fintech', 'bitcoin', 'ethereum'] },
  { name: 'Big Data, Data Science & Analytics', keywords: ['big data', 'data science', 'analytics', 'visualization', 'modeling', 'statistics'] },
  { name: 'Emerging & Future Technologies', keywords: ['emerging', 'future', 'quantum', 'robotics', 'nanotechnology'] },
  { name: 'Tech Business, Startups & Industry', keywords: ['startup', 'business', 'industry', 'investment'] },
  { name: 'Tech Education, Careers & Community', keywords: ['education', 'career', 'training', 'community', 'learning', 'resources'] },
];

function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to truncate long sources
  const truncateSource = (source) => {
    return source.length > 10 ? `${source.substring(0, 10)}...` : source; // Truncate to 10 characters.
  };

  // Function to dynamically assign articles to subcategories based on keywords
  const categorizeArticles = (articles) => {
    const categories = SUBCATEGORIES.reduce((acc, subcategory) => {
      acc[subcategory.name] = [];
      return acc;
    }, {});
    categories['General Tech News'] = []; // Default category for uncategorized articles.

    articles.forEach((article) => {
      const content = (article.title + ' ' + article.summary).toLowerCase();
      const matchedCategory =
        SUBCATEGORIES.find((subcategory) =>
          subcategory.keywords.some((keyword) => content.includes(keyword))
        )?.name || 'General Tech News'; // Assign General Tech News if no match found.

      categories[matchedCategory].push(article);
    });

    return categories;
  };

  useEffect(() => {
    fetch('/knowledge_base.json')
      .then((response) => response.json())
      .then((json) => {
        const modifiedData = json.map((article) => ({
          ...article,
          source: truncateSource(article.source), // Truncate source names.
          summary: article.summary.replace(/<\/?[^>]+(>|$)/g, ''), // Strip HTML tags.
          date: new Date().toLocaleDateString(), // Format article date.
        }));

        setData(modifiedData);

        const categorized = categorizeArticles(modifiedData);
        setCategories(categorized);
      });
  }, []);

  // Search functionality integrated with subcategory selection
  const filteredNews =
    selectedSubcategory === 'All'
      ? data.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 52) // Show up to 52 results matching the search query
      : categories[selectedSubcategory]?.filter((article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

  return (
    <>
      <header className="header">
        <div className="logo">⚡ TechPulse</div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </header>
      <nav className="subcategory-nav">
        {['All', ...Object.keys(categories)].map((subcategory) => (
          <button
            key={subcategory}
            className={`category-btn ${selectedSubcategory === subcategory ? 'active' : ''}`}
            onClick={() => setSelectedSubcategory(subcategory)} // Select subcategory
          >
            {subcategory}
          </button>
        ))}
      </nav>
      <main>
        <section className="hero">
          <h1>Stay Updated with the Latest in Tech News</h1>
          <p>Discover top stories, breakthroughs, and trends in technology every day. Tailored for tech enthusiasts.</p>
        </section>
        <section className="articles">
          {filteredNews.length > 0 ? (
            filteredNews.map((article, index) => (
              <div key={index} className="article-card">
                <div className="article-content">
                  <span className="source">{article.source} </span>
                  <span className="date">{article.date}</span>
                  <h2>{article.title}</h2>
                  <p>{article.summary}</p>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    Read More →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No articles available for this category.</p>
          )}
        </section>
      </main>
      <footer className="footer">
        <p>Powered by Shaurya Verma • Updates every hour</p>
        <p>&copy; 2025 TechPulse - All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;