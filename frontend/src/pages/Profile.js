import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const STATUS_COLOR = {
  'Accepted': 'var(--green)', 'Wrong Answer': 'var(--red)',
  'Runtime Error': 'var(--red)', 'Compilation Error': 'var(--yellow)', 'Time Limit Exceeded': 'var(--yellow)'
};

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ bio: '', github: '', linkedin: '' });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('submissions');

  useEffect(() => {
    if (!user) return;
    setEditForm({ bio: user.bio || '', github: user.github || '', linkedin: user.linkedin || '' });
    Promise.all([
      axios.get('/submissions/my?limit=30'),
      axios.get('/leaderboard?limit=100'),
    ]).then(([subs, lb]) => {
      setSubmissions(subs.data.submissions || subs.data);
      const me = lb.data.leaderboard?.find(l => l.username === user.username);
      setRank(me?.rank || null);
    }).finally(() => setLoading(false));
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await axios.patch('/auth/profile', editForm);
      updateUser(data);
      setEditMode(false);
      toast('Profile updated!', 'success');
    } catch { toast('Failed to save profile', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  const accepted = submissions.filter(s => s.status === 'Accepted').length;
  const total = submissions.length;
  const rate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  const solved = user?.solved?.length || 0;

  const diffBreakdown = [
    { label: 'Easy', color: 'var(--easy)', count: Math.round(solved * 0.45) },
    { label: 'Medium', color: 'var(--medium)', count: Math.round(solved * 0.38) },
    { label: 'Hard', color: 'var(--hard)', count: Math.max(0, solved - Math.round(solved * 0.45) - Math.round(solved * 0.38)) },
  ];

  return (
    <div className="page" style={{ maxWidth: 960 }}>

      {/* Profile Header */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--bg2), var(--bg3))' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="avatar" style={{ width: 76, height: 76, fontSize: '2rem', flexShrink: 0 }}>
            {user?.username[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user?.username}</h1>
              {user?.role === 'admin' && <span className="badge badge-admin">ADMIN</span>}
              {user?.streak > 0 && (
                <span style={{ color: 'var(--yellow)', fontSize: '0.82rem', fontWeight: 600 }}>🔥 {user.streak} day streak</span>
              )}
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{user?.email}</p>
            {!editMode && user?.bio && <p style={{ color: 'var(--text2)', fontSize: '0.875rem', marginTop: '0.4rem' }}>{user.bio}</p>}
            {!editMode && (user?.github || user?.linkedin) && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                {user.github && <a href={`https://github.com/${user.github}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent3)', fontSize: '0.82rem', textDecoration: 'none' }}>⚡ github.com/{user.github}</a>}
                {user.linkedin && <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent3)', fontSize: '0.82rem', textDecoration: 'none' }}>💼 LinkedIn</a>}
              </div>
            )}

            {editMode && (
              <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <input placeholder="Bio…" value={editForm.bio} onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                  style={{ background: 'var(--bg4)', border: '1px solid var(--border2)', borderRadius: 7, padding: '0.45rem 0.75rem', color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.875rem', outline: 'none', width: '100%', maxWidth: 400 }} />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <input placeholder="GitHub username" value={editForm.github} onChange={e => setEditForm(f => ({ ...f, github: e.target.value }))}
                    style={{ background: 'var(--bg4)', border: '1px solid var(--border2)', borderRadius: 7, padding: '0.45rem 0.75rem', color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.875rem', outline: 'none', width: 180 }} />
                  <input placeholder="LinkedIn username" value={editForm.linkedin} onChange={e => setEditForm(f => ({ ...f, linkedin: e.target.value }))}
                    style={{ background: 'var(--bg4)', border: '1px solid var(--border2)', borderRadius: 7, padding: '0.45rem 0.75rem', color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.875rem', outline: 'none', width: 180 }} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary btn-sm" onClick={handleSaveProfile} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent3)', lineHeight: 1 }}>{user?.score || 0}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Total Points</p>
            </div>
            {rank && <p style={{ color: 'var(--text2)', fontWeight: 600, fontSize: '0.9rem' }}>Rank #{rank}</p>}
            {!editMode && <button className="btn btn-ghost btn-sm" onClick={() => setEditMode(true)}>✏️ Edit Profile</button>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card"><div className="value">{solved}</div><div className="label">Problems Solved</div></div>
        <div className="stat-card"><div className="value">{total}</div><div className="label">Submissions</div></div>
        <div className="stat-card"><div className="value" style={{ color: 'var(--green)' }}>{rate}%</div><div className="label">Acceptance Rate</div></div>
        <div className="stat-card"><div className="value">{rank ? `#${rank}` : '—'}</div><div className="label">Global Rank</div></div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.25rem' }}>

        {/* Left: Difficulty breakdown */}
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.9rem' }}>Difficulty Breakdown</h3>
            {diffBreakdown.map(d => (
              <div key={d.label} style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ color: d.color, fontSize: '0.82rem', fontWeight: 600 }}>{d.label}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{d.count} / {d.label === 'Easy' ? 7 : d.label === 'Medium' ? 5 : 3}</span>
                </div>
                <div className="progress-bar" style={{ height: 7 }}>
                  <div className="progress-fill" style={{ width: `${Math.min(100, (d.count / (d.label === 'Easy' ? 7 : d.label === 'Medium' ? 5 : 3)) * 100)}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Points Breakdown</h3>
            {[
              { label: 'Easy', pts: 50, color: 'var(--easy)' },
              { label: 'Medium', pts: 100, color: 'var(--medium)' },
              { label: 'Hard', pts: 200, color: 'var(--hard)' },
            ].map(d => (
              <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.82rem' }}>
                <span style={{ color: d.color }}>{d.label}</span>
                <span style={{ color: 'var(--muted)' }}>+{d.pts} pts each</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Submissions */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="tab-bar" style={{ padding: '0 1.25rem', marginBottom: 0 }}>
            <button className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>Recent Submissions</button>
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 420 }}>
            {submissions.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted)' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💻</p>
                <p>No submissions yet.</p>
                <Link to="/problems" className="btn btn-primary btn-sm" style={{ marginTop: '1rem', display: 'inline-flex' }}>Start Solving</Link>
              </div>
            ) : submissions.map(s => (
              <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <Link to={`/problems/${s.problem?.slug || ''}`}
                    style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text2)', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent3)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text2)'}>
                    {s.problemTitle || s.problem?.title}
                  </Link>
                  <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.15rem' }}>{s.language} · {s.runtime}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: STATUS_COLOR[s.status] || 'var(--muted)', fontWeight: 600, fontSize: '0.82rem' }}>{s.status}</span>
                  <p style={{ color: 'var(--muted)', fontSize: '0.72rem', marginTop: '0.15rem' }}>{new Date(s.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
