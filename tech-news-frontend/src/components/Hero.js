import React from 'react';
import '../index.css';

const Hero = () => {
    return (
        <section style={{
            padding: 'var(--spacing-xl) 0',
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--border-light)'
        }}>
            <h2 style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
                background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
            }}>
                Discover Tomorrow's Tech
            </h2>
            <p style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.5
            }}>
                Curated insights on AI, Development, and Future Tech using advanced RAG agents.
            </p>
        </section>
    );
};

export default Hero;
