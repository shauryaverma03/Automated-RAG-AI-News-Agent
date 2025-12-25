import React from 'react';
import { ExternalLink, Calendar, Clock } from 'lucide-react';
import { formatDate, truncateText } from '../utils/helpers';
import '../index.css';

const NewsCard = ({ article }) => {
    return (
        <article
            className="news-card"
            style={{
                backgroundColor: 'var(--bg-secondary)',
                backgroundImage: 'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-tertiary))',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all var(--transition-smooth)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
            }}
            onClick={() => window.open(article.link, '_blank')}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md), 0 0 20px var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {truncateText(article.source, 30)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    <Calendar size={12} />
                    <span>{formatDate(article.timestamp)}</span>
                </div>
            </div>

            <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {article.title}
            </h2>

            <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: 'var(--spacing-lg)',
                flex: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {article.summary}
            </p>

            <div style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: 'var(--spacing-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <Clock size={12} />
                    <span>3 min read</span>
                </div>
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--accent-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 500
                }}>
                    Read Article <ExternalLink size={14} />
                </span>
            </div>
        </article>
    );
};

export default NewsCard;
