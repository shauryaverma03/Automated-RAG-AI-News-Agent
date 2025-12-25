import React from 'react';
import { Loader2 } from 'lucide-react';
import '../index.css';

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'var(--accent-primary)',
            gap: 'var(--spacing-md)',
            flexDirection: 'column'
        }}>
            <Loader2 size={48} className="spin-animation" />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fetching latest tech insights...</p>
            <style>{`
        .spin-animation {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loading;
