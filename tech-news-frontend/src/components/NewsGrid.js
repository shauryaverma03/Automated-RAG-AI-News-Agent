import React from 'react';
import NewsCard from './NewsCard';
import '../index.css';

const NewsGrid = ({ articles }) => {
    if (!articles || articles.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-secondary)' }}>
                <p>No articles found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', // Reduced min-width slightly but increased gap
            gap: '40px', // Adjusted to be balanced
            padding: 'var(--spacing-xl) 0'
        }}>
            {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
            ))}
        </div>
    );
};

export default NewsGrid;
