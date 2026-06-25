import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return { theme, toggleTheme };
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span style={{ fontSize: '1.3rem' }}>⚔️</span> CodeArena
      </Link>

      <div className="navbar-links">
        <NavLink to="/problems" className={({ isActive }) => isActive ? 'active' : ''}>Problems</NavLink>
        <NavLink to="/contests" className={({ isActive }) => isActive ? 'active' : ''}>Contests</NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'active' : ''}>Leaderboard</NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink>
        )}
      </div>

      <div className="navbar-right">

        {/* THEME TOGGLE */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--bg3)', border: '1px solid var(--border2)',
                borderRadius: 8, padding: '0.35rem 0.75rem',
                cursor: 'pointer', color: 'var(--text)', fontFamily: 'inherit',
                fontSize: '0.875rem', fontWeight: 500,
              }}
            >
              <div className="avatar" style={{ width: 26, height: 26, fontSize: '0.75rem' }}>
                {user.username[0].toUpperCase()}
              </div>
              {user.username}
              <span style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>▾</span>
            </button>

            {menuOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setMenuOpen(false)} />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'var(--bg3)', border: '1px solid var(--border2)',
                  borderRadius: 10, minWidth: 180, zIndex: 100,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)', overflow: 'hidden',
                }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user.username}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: 2 }}>{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="badge badge-admin" style={{ marginTop: 6, fontSize: '0.65rem' }}>ADMIN</span>
                    )}
                  </div>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', padding: '0.65rem 1rem', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem' }}
                    onMouseEnter={e => e.target.style.background = 'var(--bg4)'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >👤 Profile</Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%', textAlign: 'left', padding: '0.65rem 1rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--red)', fontSize: '0.875rem', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg4)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >↩ Sign Out</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
