import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function useCountdown(target) {
  const [diff, setDiff] = useState(new Date(target) - Date.now());
  useEffect(() => {
    const t = setInterval(() => setDiff(new Date(target) - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h}h ${m.toString().padStart(2,'0')}m ${s.toString().padStart(2,'0')}s`;
}

function ContestCard({ contest }) {
  const { user } = useAuth();
  const countdown = useCountdown(contest.status === 'upcoming' ? contest.startTime : contest.endTime);
  const isRegistered = contest.participants?.some(p =>
    (typeof p === 'string' ? p : p.user?.toString?.() || p.user) === user?._id
  );

  const statusColor = {
    upcoming: 'var(--blue)', active: 'var(--green)', ended: 'var(--muted)'
  }[contest.status];

  const duration = Math.round((new Date(contest.endTime) - new Date(contest.startTime)) / 60000);

  return (
    <div className="card" style={{ marginBottom: '1rem', transition: 'border-color 0.18s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{
              background: statusColor + '22', color: statusColor,
              border: `1px solid ${statusColor}44`,
              borderRadius: 9999, padding: '0.15rem 0.65rem',
              fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              {contest.status === 'active' ? '🟢 Live' : contest.status === 'upcoming' ? '⏳ Upcoming' : '✓ Ended'}
            </span>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>{contest.title}</h3>
          </div>

          {contest.description && (
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>{contest.description}</p>
          )}

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
              📅 {new Date(contest.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>⏱ {duration} min</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>📋 {contest.problems?.length || 0} problems</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>👥 {contest.participantCount || 0} participants</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem', flexShrink: 0 }}>
          {countdown && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {contest.status === 'upcoming' ? 'Starts in' : 'Ends in'}
              </p>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: contest.status === 'active' ? 'var(--green)' : 'var(--accent3)', fontSize: '1rem' }}>
                {countdown}
              </p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/contests/${contest._id}`} className="btn btn-ghost btn-sm">View</Link>
            {contest.status !== 'ended' && user && !isRegistered && (
              <Link to={`/contests/${contest._id}`} className="btn btn-primary btn-sm">Register</Link>
            )}
            {contest.status === 'ended' && (
              <Link to={`/contests/${contest._id}`} className="btn btn-ghost btn-sm">Results</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/contests')
      .then(res => setContests(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? contests : contests.filter(c => c.status === filter);
  const counts = { all: contests.length, upcoming: 0, active: 0, ended: 0 };
  contests.forEach(c => counts[c.status]++);

  return (
    <div className="page" style={{ maxWidth: 860 }}>
      <div className="section-header">
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>🎯 Contests</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Compete in timed challenges and earn contest ratings
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: '🟢 Live' },
          { key: 'upcoming', label: '⏳ Upcoming' },
          { key: 'ended', label: '✓ Past' },
        ].map(f => (
          <button key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}>
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📅</p>
          <p>No {filter !== 'all' ? filter : ''} contests found.</p>
        </div>
      ) : (
        filtered.map(c => <ContestCard key={c._id} contest={c} />)
      )}
    </div>
  );
}
