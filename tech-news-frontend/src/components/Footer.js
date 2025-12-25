import React from 'react';
import { Github, Twitter } from 'lucide-react';
import '../index.css';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-light)',
            padding: 'var(--spacing-xl) var(--spacing-lg)',
            marginTop: 'auto',
            backgroundColor: 'var(--bg-secondary)',
            textAlign: 'center'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-md)',
                color: 'var(--text-secondary)'
            }}>
                <span>Powered by Shaurya Verma</span>
                <span style={{ color: 'var(--accent-secondary)' }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Updates every hour <ZapIcon size={14} color="var(--accent-primary)" />
                </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                &copy; {new Date().getFullYear()} TechPulse. All Rights Reserved.
            </p>

            {/* Socials Placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                <Github size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                <Twitter size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            </div>
        </footer>
    );
};

// Small local component for icon reuse if needed, mostly for structure
const ZapIcon = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: color }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export default Footer;
