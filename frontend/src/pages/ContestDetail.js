import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

function Countdown({ target, label }) {
  const [diff, setDiff] = useState(new Date(target) - Date.now());
  useEffect(() => {
    const t = setInterval(() => setDiff(new Date(target) - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent3)' }}>
        {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
      </p>
    </div>
  );
}

export default function ContestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [tab, setTab] = useState('problems');

  useEffect(() => {
    Promise.all([
      axios.get(`/contests/${id}`),
      axios.get(`/contests/${id}/standings`)
    ]).then(([c, s]) => {
      setContest(c.data);
      setStandings(s.data);
    }).catch(() => navigate('/contests'))
    .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleRegister = async () => {
    if (!user) { navigate('/login'); return; }
    setRegistering(true);
    try {
      await axios.post(`/contests/${id}/register`);
      toast('Registered for contest!', 'success');
      const { data } = await axios.get(`/contests/${id}`);
      setContest(data);
    } catch (err) {
      toast(err.response?.data?.message || 'Registration failed', 'error');
    } finally { setRegistering(false); }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!contest) return null;

  const isRegistered = contest.participants?.some(p =>
    (p.user?._id || p.user?.toString?.() || p.user) === user?._id
  );
  const duration = Math.round((new Date(contest.endTime) - new Date(contest.startTime)) / 60000);

  const statusColor = { upcoming: 'var(--blue)', active: 'var(--green)', ended: 'var(--muted)' }[contest.status];

  return (
    <div className="page" style={{ maxWidth: 900 }}>

      {/* Header */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--bg2), var(--bg3))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
              <span style={{
                background: statusColor + '22', color: statusColor, border: `1px solid ${statusColor}44`,
                borderRadius: 9999, padding: '0.15rem 0.65rem', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase'
              }}>
                {contest.status === 'active' ? '🟢 Live Now' : contest.status === 'upcoming' ? '⏳ Upcoming' : '✓ Ended'}
              </span>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{contest.title}</h1>
            </div>
            {contest.description && <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>{contest.description}</p>}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📅 {new Date(contest.startTime).toLocaleString()}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>⏱ {duration} min</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📋 {contest.problems?.length} problems</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>👥 {contest.participants?.length || 0} registered</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
            {contest.status === 'upcoming' && (
              <Countdown target={contest.startTime} label="Starts in" />
            )}
            {contest.status === 'active' && (
              <Countdown target={contest.endTime} label="Ends in" />
            )}
            {contest.status !== 'ended' && (
              isRegistered ? (
                <span style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.875rem' }}>✓ Registered</span>
              ) : (
                <button className="btn btn-primary" onClick={handleRegister} disabled={registering}>
                  {registering ? 'Registering…' : 'Register'}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        <button className={`tab-btn ${tab === 'problems' ? 'active' : ''}`} onClick={() => setTab('problems')}>Problems</button>
        <button className={`tab-btn ${tab === 'standings' ? 'active' : ''}`} onClick={() => setTab('standings')}>Standings ({standings.length})</button>
      </div>

      {/* Problems tab */}
      {tab === 'problems' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {contest.problems?.length === 0 ? (
            <p style={{ padding: '2rem', color: 'var(--muted)', textAlign: 'center' }}>No problems assigned yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>#</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Acceptance</th>
                    <th style={{ width: 80 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contest.problems.map((p, i) => (
                    <tr key={p._id}>
                      <td style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {String.fromCharCode(65 + i)}
                      </td>
                      <td style={{ fontWeight: 500 }}>{p.title}</td>
                      <td><span className={`badge badge-${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span></td>
                      <td style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{p.acceptance}%</td>
                      <td>
                        {(contest.status === 'active' && isRegistered) || contest.status === 'ended' ? (
                          <Link to={`/problems/${p.slug}`} className="btn btn-primary btn-sm">Solve</Link>
                        ) : (
                          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                            {contest.status === 'upcoming' ? 'Locked' : '—'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Standings tab */}
      {tab === 'standings' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {standings.length === 0 ? (
            <p style={{ padding: '2rem', color: 'var(--muted)', textAlign: 'center' }}>No standings yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                    <th>Solved</th>
                    <th>Finish Time</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map(s => (
                    <tr key={s.username} style={s.username === user?.username ? { background: 'rgba(109,40,217,0.05)' } : {}}>
                      <td style={{ fontWeight: 700, color: s.rank <= 3 ? 'var(--accent3)' : 'var(--muted)' }}>
                        {s.rank <= 3 ? ['🥇','🥈','🥉'][s.rank-1] : `#${s.rank}`}
                      </td>
                      <td style={{ fontWeight: s.username === user?.username ? 700 : 400 }}>
                        {s.username}
                        {s.username === user?.username && <span style={{ color: 'var(--accent3)', fontSize: '0.72rem', marginLeft: '0.4rem' }}>(you)</span>}
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--accent3)' }}>{s.score}</td>
                      <td>{s.solved}</td>
                      <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                        {s.finishTime ? new Date(s.finishTime).toLocaleTimeString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
