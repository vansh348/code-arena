import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
    try {
      await register(form.username, form.email, form.password);
      toast('Account created! Welcome to CodeArena 🎉', 'success');
      navigate('/problems');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Join CodeArena</h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.4rem', fontSize: '0.9rem' }}>Start your competitive coding journey</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="coolcoder42" value={form.username}
                onChange={set('username')} required minLength={3} maxLength={30}
                pattern="[a-zA-Z0-9_]+" title="Only letters, numbers, and underscores" autoComplete="username" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={set('email')} required autoComplete="email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Min. 6 characters" value={form.password}
                onChange={set('password')} required minLength={6} autoComplete="new-password" />
            </div>
            {error && <p className="form-error">⚠️ {error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent3)', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
