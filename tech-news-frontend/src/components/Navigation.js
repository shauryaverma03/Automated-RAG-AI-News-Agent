import React from 'react';
import '../index.css';

const Navigation = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <nav style={{
            position: 'sticky',
            top: '73px', // Adjust based on Header height
            zIndex: 90,
            backgroundColor: 'var(--bg-secondary)', // Slightly different bg to distinguish from header
            borderBottom: '1px solid var(--border-light)',
            padding: 'var(--spacing-sm) 0',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: 'var(--spacing-sm)',
        }} className="hide-scrollbar">
            <div style={{ padding: '0 var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-sm)' }}>
                {['All', ...Object.keys(categories)].map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            transition: 'all var(--transition-fast)',
                            border: selectedCategory === category
                                ? '1px solid var(--accent-primary)'
                                : '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: selectedCategory === category
                                ? 'rgba(138, 180, 248, 0.15)'
                                : 'rgba(255,255,255,0.03)',
                            color: selectedCategory === category
                                ? 'var(--accent-primary)'
                                : 'var(--text-secondary)',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            if (selectedCategory !== category) {
                                e.target.style.backgroundColor = 'var(--bg-tertiary)';
                                e.target.style.color = 'var(--text-primary)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (selectedCategory !== category) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = 'var(--text-secondary)';
                            }
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </nav >
    );
};

export default Navigation;
