import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const FEATURES = [
  { icon: '💻', title: 'Real Code Editor', desc: 'Full syntax-highlighted editor with starter templates for JavaScript, Python, and Java.' },
  { icon: '⚡', title: 'Instant Judging', desc: 'Submit your code and get real-time feedback via WebSocket — accepted, wrong answer, or runtime error.' },
  { icon: '🏆', title: 'Live Leaderboard', desc: 'Earn points for every accepted solution. Easy=50pts, Medium=100pts, Hard=200pts.' },
  { icon: '🎯', title: 'Timed Contests', desc: 'Compete in weekly and biweekly contests. Race the clock and see your global ranking.' },
  { icon: '📊', title: 'Detailed Analytics', desc: 'Track your acceptance rate, streak, difficulty breakdown, and submission history.' },
  { icon: '🛡️', title: 'Admin Dashboard', desc: 'Full admin panel to manage problems, users, contests, and monitor all activity.' },
];

const STACK = ['React 18', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT Auth', 'REST API'];

export default function Landing() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ problems: '15+', users: '—', submissions: '—' });

  useEffect(() => {
    Promise.allSettled([
      axios.get('/leaderboard?limit=1'),
      axios.get('/problems?limit=1'),
    ]).then(([lb, pr]) => {
      setStats(s => ({
        ...s,
        users: lb.status === 'fulfilled' ? lb.value.data.total + '+' : s.users,
        problems: pr.status === 'fulfilled' ? pr.value.data.total + '+' : s.problems,
      }));
    });
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem 5rem', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(109,40,217,0.2), transparent)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(37,37,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,37,55,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none', opacity: 0.4
        }} />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(109,40,217,0.12)', border: '1px solid rgba(109,40,217,0.3)',
            borderRadius: 9999, padding: '0.3rem 1rem',
            fontSize: '0.78rem', color: 'var(--accent3)', fontWeight: 600,
            marginBottom: '1.75rem', letterSpacing: '0.04em'
          }}>
            ⚔️ COMPETITIVE CODING PLATFORM
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.25rem)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em',
            marginBottom: '1.25rem', color: '#f1f5f9'
          }}>
            Level Up Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Coding Skills
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 2.5rem' }}>
            Solve algorithmic problems, compete in timed contests, and climb the global leaderboard. Built like LeetCode — from scratch.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/problems" className="btn btn-primary btn-lg">Start Solving →</Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
                <Link to="/login" className="btn btn-ghost btn-lg">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { val: stats.problems, label: 'Problems' },
            { val: '3', label: 'Languages' },
            { val: '24/7', label: 'Judge Online' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent3)', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.4rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '2rem 2rem 5rem', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', fontWeight: 600 }}>Everything you need</p>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '3rem', color: '#f1f5f9' }}>
          Built for serious coders
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card card-hover"
              style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: 'rgba(109,40,217,0.15)', border: '1px solid rgba(109,40,217,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem'
              }}>{f.icon}</div>
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 2rem 6rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: 580, margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(109,40,217,0.12), rgba(139,92,246,0.06))',
          border: '1px solid rgba(109,40,217,0.25)', borderRadius: 20, padding: '3rem 2rem'
        }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to compete?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Join CodeArena today. It's free, fast, and your next interview might depend on it.
          </p>
          {user ? (
            <Link to="/contests" className="btn btn-primary btn-lg">View Contests →</Link>
          ) : (
            <Link to="/register" className="btn btn-primary btn-lg">Create Free Account →</Link>
          )}
        </div>

        <div style={{ marginTop: '3rem' }}>
          <p style={{ color: 'var(--muted2)', marginBottom: '1rem', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tech Stack</p>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {STACK.map(t => (
              <span key={t} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '0.35rem 0.9rem',
                fontSize: '0.8rem', color: 'var(--text2)'
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
