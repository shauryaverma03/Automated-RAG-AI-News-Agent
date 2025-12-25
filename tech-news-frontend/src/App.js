import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { useNewsData } from './hooks/useNewsData';
import './index.css';

function App() {
  const { categories, loading, error } = useNewsData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let articles = [];
    if (selectedCategory === 'All') {
      // Flatten all categories into a single array, removing duplicates if any (though logic assigns unique)
      const allArticles = Object.values(categories).flat();
      articles = allArticles;
    } else {
      articles = categories[selectedCategory] || [];
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query)
      );
    }

    // De-duplicate by ID just in case
    const seen = new Set();
    const uniqueArticles = articles.filter(article => {
      if (seen.has(article.id)) return false;
      seen.add(article.id);
      return true;
    });

    return uniqueArticles.slice(0, 52); // Limit to top 52 stories

  }, [categories, selectedCategory, searchQuery]);

  if (loading) return <Loading />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error loading news: {error}</div>;

  return (
    <div className="app">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Navigation
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 var(--spacing-lg)',
        minHeight: 'calc(100vh - 400px)' // ensure footer pushed down
      }}>
        {selectedCategory === 'All' && !searchQuery && <Hero />}

        <div style={{ margin: 'var(--spacing-lg) 0' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>
            {selectedCategory === 'All' ? 'Top Stories' : selectedCategory}
          </h3>
          <NewsGrid articles={filteredArticles} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;