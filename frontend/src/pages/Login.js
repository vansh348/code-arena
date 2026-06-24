import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/problems';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
      toast('Welcome back!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  const fillDemo = (role) => {
    if (role === 'admin') setForm({ email: 'admin@codearena.com', password: 'password' });
    else setForm({ email: 'alice@example.com', password: 'password' });
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚔️</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome back</h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.4rem', fontSize: '0.9rem' }}>Sign in to continue coding</p>
        </div>

        {/* Demo pills */}
        <div style={{
          background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.2)',
          borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.5rem'
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--accent3)', fontWeight: 600, marginBottom: '0.55rem' }}>🧪 Try a demo account</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => fillDemo('user')}>👤 User Demo</button>
            <button className="btn btn-ghost btn-sm" onClick={() => fillDemo('admin')}>🛡️ Admin Demo</button>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required autoComplete="current-password" />
            </div>
            {error && <p className="form-error">⚠️ {error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
          No account?{' '}
          <Link to="/register" style={{ color: 'var(--accent3)', fontWeight: 600, textDecoration: 'none' }}>Create one free →</Link>
        </p>
      </div>
    </div>
  );
}
