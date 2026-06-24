import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1 }}>404</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--accent2), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Looks like you've wandered off the board.<br />This route doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">← Go Home</Link>
      </div>
    </div>
  );
}
