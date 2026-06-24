import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 20;

  useEffect(() => {
    setLoading(true);
    axios.get('/leaderboard', { params: { page, limit: LIMIT } })
      .then(res => { setLeaderboard(res.data.leaderboard); setTotal(res.data.total); })
      .finally(() => setLoading(false));
  }, [page]);

  const myEntry = leaderboard.find(l => l.username === user?.username);

  return (
    <div className="page-md" style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.75rem' }}>
      <div className="section-header">
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>🏆 Leaderboard</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Top coders ranked by total score · {total} participants
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { setLoading(true); axios.get('/leaderboard', { params: { page, limit: LIMIT } }).then(r => { setLeaderboard(r.data.leaderboard); setTotal(r.data.total); }).finally(() => setLoading(false)); }}>
          ↺ Refresh
        </button>
      </div>

      {/* My rank */}
      {user && myEntry && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.12), rgba(139,92,246,0.06))',
          border: '1px solid rgba(109,40,217,0.3)', borderRadius: 12,
          padding: '1rem 1.25rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div className="avatar" style={{ width: 42, height: 42, fontSize: '1rem' }}>
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <p style={{ fontWeight: 700 }}>Your Rank</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{user.username}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent3)', lineHeight: 1 }}>#{myEntry.rank}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Rank</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent3)', lineHeight: 1 }}>{myEntry.score}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Points</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent3)', lineHeight: 1 }}>{myEntry.solved}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Solved</p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 70 }}>Rank</th>
                <th>User</th>
                <th>Problems Solved</th>
                <th>Score</th>
                <th style={{ width: 110 }}>Streak</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
                  <div className="spinner" style={{ margin: '0 auto 0.75rem' }} />
                </td></tr>
              ) : leaderboard.map(l => {
                const isMe = l.username === user?.username;
                return (
                  <tr key={l._id} style={{ background: isMe ? 'rgba(109,40,217,0.04)' : 'transparent' }}>
                    <td style={{ fontWeight: 700 }}>
                      <span style={{ fontSize: l.rank <= 3 ? '1.25rem' : '0.9rem', color: l.rank <= 3 ? undefined : 'var(--muted)' }}>
                        {MEDALS[l.rank] || `#${l.rank}`}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="avatar" style={{
                          width: 34, height: 34, fontSize: '0.85rem',
                          background: l.rank === 1
                            ? 'linear-gradient(135deg,#f59e0b,#fbbf24)'
                            : l.rank === 2 ? 'linear-gradient(135deg,#94a3b8,#cbd5e1)'
                            : l.rank === 3 ? 'linear-gradient(135deg,#b45309,#d97706)'
                            : 'linear-gradient(135deg,var(--accent),var(--accent2))'
                        }}>
                          {l.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontWeight: isMe ? 700 : 500, fontSize: '0.9rem' }}>
                            {l.username}
                            {isMe && <span style={{ color: 'var(--accent3)', fontSize: '0.72rem', marginLeft: '0.4rem' }}>(you)</span>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div className="progress-bar" style={{ width: 70, height: 6 }}>
                          <div className="progress-fill" style={{ width: `${Math.min(100, (l.solved / 15) * 100)}%`, background: 'var(--accent2)' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: isMe ? 'var(--text)' : 'var(--text2)' }}>{l.solved}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: l.rank === 1 ? '#f59e0b' : isMe ? 'var(--accent3)' : 'var(--text)' }}>
                      {l.score.toLocaleString()}
                      <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.75rem' }}> pts</span>
                    </td>
                    <td>
                      {l.streak > 0 && (
                        <span style={{ color: 'var(--yellow)', fontSize: '0.82rem' }}>🔥 {l.streak} day{l.streak !== 1 ? 's' : ''}</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                      {new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {total > LIMIT && (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Page {page} of {Math.ceil(total / LIMIT)}</span>
          <button className="btn btn-ghost btn-sm" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}
