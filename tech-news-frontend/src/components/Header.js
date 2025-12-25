import React from 'react';
import { Search, Zap } from 'lucide-react';
import '../index.css';

const Header = ({ searchQuery, setSearchQuery }) => {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'var(--bg-glass)',
            backdropFilter: 'var(--glass-blur)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-lg)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <Zap color="var(--accent-primary)" fill="var(--accent-primary)" size={24} />
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0
                }}>
                    TechPulse
                </h1>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '350px' // Fixed width constraint without flex-grow
            }}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 16px 10px 42px', // Slightly more padding
                        borderRadius: '99px',
                        backgroundColor: 'rgba(30, 30, 30, 0.6)', // Semi-transparent
                        border: '1px solid isset(var(--border-light)) ? var(--border-light) : rgba(255,255,255,0.2)', // Stronger border fallback
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'all var(--transition-fast)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' // Inset shadow for depth
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.backgroundColor = 'var(--bg-tertiary)';
                        e.target.style.boxShadow = '0 0 0 2px var(--accent-glow)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.target.style.backgroundColor = 'rgba(30, 30, 30, 0.6)';
                        e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
                    }}
                />
                <Search
                    size={18} // Back to 18 for visibility
                    style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-secondary)',
                        pointerEvents: 'none'
                    }}
                />
            </div>
        </header>
    );
};

export default Header;
