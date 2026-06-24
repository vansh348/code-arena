import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/Toast';

const TABS = ['overview', 'problems', 'users', 'contests', 'add-problem', 'add-contest'];

const emptyProblem = {
  title: '', difficulty: 'Easy', tags: '',
  description: '', constraints: '', hints: '',
  jsCode: '', pyCode: '', javaCode: '',
  testCasesRaw: '[{"input": [[2,7,11,15], 9], "expected": [0,1]}]'
};

const emptyContest = {
  title: '', description: '',
  startTime: '', endTime: '', problemIds: ''
};

export default function AdminPanel() {
  const { toast } = useToast();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [problems, setProblems] = useState([]);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProblem, setNewProblem] = useState(emptyProblem);
  const [newContest, setNewContest] = useState(emptyContest);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([
      axios.get('/admin/stats'),
      axios.get('/admin/users'),
      axios.get('/problems?limit=100'),
      axios.get('/contests'),
    ]).then(([s, u, p, c]) => {
      setStats(s.data);
      setUsers(u.data);
      setProblems(p.data.problems);
      setContests(c.data);
    }).catch(() => toast('Failed to load data', 'error'))
    .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []); // eslint-disable-line

  const handleDeleteProblem = async (id) => {
    if (!window.confirm('Delete this problem? This cannot be undone.')) return;
    try {
      await axios.delete(`/admin/problems/${id}`);
      setProblems(prev => prev.filter(p => p._id !== id));
      toast('Problem deleted', 'success');
    } catch { toast('Failed to delete problem', 'error'); }
  };

  const handleToggleRole = async (id) => {
    try {
      const { data } = await axios.patch(`/admin/users/${id}/role`);
      setUsers(prev => prev.map(u => u._id === id ? data : u));
      toast(`Role updated to ${data.role}`, 'success');
    } catch { toast('Failed to update role', 'error'); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user? All their submissions will also be deleted.')) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      toast('User deleted', 'success');
    } catch { toast('Failed to delete user', 'error'); }
  };

  const handleAddProblem = async () => {
    if (!newProblem.title || !newProblem.description) { toast('Title and description are required', 'error'); return; }
    setSubmitting(true);
    try {
      let testCases = [];
      try { testCases = JSON.parse(newProblem.testCasesRaw); } catch { toast('Invalid test cases JSON', 'error'); setSubmitting(false); return; }

      const payload = {
        title: newProblem.title,
        difficulty: newProblem.difficulty,
        tags: newProblem.tags.split(',').map(t => t.trim()).filter(Boolean),
        description: newProblem.description,
        constraints: newProblem.constraints.split('\n').filter(Boolean),
        hints: newProblem.hints.split('\n').filter(Boolean),
        starterCode: {
          javascript: newProblem.jsCode || `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction solution(nums) {\n  \n}`,
          python: newProblem.pyCode || `def solution(nums):\n    pass`,
          java: newProblem.javaCode || `class Solution {\n    public int[] solution(int[] nums) {\n        \n    }\n}`
        },
        testCases,
      };
      const { data } = await axios.post('/admin/problems', payload);
      setProblems(prev => [...prev, data]);
      setNewProblem(emptyProblem);
      toast('Problem created!', 'success');
      setTab('problems');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to create problem', 'error');
    } finally { setSubmitting(false); }
  };

  const handleAddContest = async () => {
    if (!newContest.title || !newContest.startTime || !newContest.endTime) {
      toast('Title, start time, and end time are required', 'error'); return;
    }
    setSubmitting(true);
    try {
      const problemIds = newContest.problemIds.split(',').map(s => s.trim()).filter(Boolean);
      await axios.post('/admin/contests', {
        title: newContest.title,
        description: newContest.description,
        startTime: new Date(newContest.startTime).toISOString(),
        endTime: new Date(newContest.endTime).toISOString(),
        problems: problemIds,
      });
      setNewContest(emptyContest);
      toast('Contest created!', 'success');
      setTab('contests');
      const { data } = await axios.get('/contests');
      setContests(data);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to create contest', 'error');
    } finally { setSubmitting(false); }
  };

  const handleDeleteContest = async (id) => {
    if (!window.confirm('Delete this contest?')) return;
    try {
      await axios.delete(`/admin/contests/${id}`);
      setContests(prev => prev.filter(c => c._id !== id));
      toast('Contest deleted', 'success');
    } catch { toast('Failed to delete contest', 'error'); }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  const set = (setter) => (k) => (e) => setter(prev => ({ ...prev, [k]: e.target.value }));
  const setP = set(setNewProblem);
  const setC = set(setNewContest);

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>🛡️ Admin Panel</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Manage problems, users, and contests</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={load}>↺ Refresh</button>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'overview' ? '📊 Overview' : t === 'problems' ? `📋 Problems (${problems.length})` : t === 'users' ? `👥 Users (${users.length})` : t === 'contests' ? `🎯 Contests (${contests.length})` : t === 'add-problem' ? '+ Problem' : '+ Contest'}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && stats && (
        <>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-card"><div className="value">{stats.totalUsers}</div><div className="label">Total Users</div></div>
            <div className="stat-card"><div className="value">{stats.totalProblems}</div><div className="label">Problems</div></div>
            <div className="stat-card"><div className="value">{stats.totalSubmissions}</div><div className="label">Submissions</div></div>
            <div className="stat-card">
              <div className="value" style={{ color: 'var(--green)' }}>
                {stats.totalSubmissions > 0 ? Math.round((stats.acceptedSubmissions / stats.totalSubmissions) * 100) : 0}%
              </div>
              <div className="label">Acceptance Rate</div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.95rem' }}>Recent Submissions</h3>
            {stats.recentSubmissions?.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>No submissions yet.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Problem</th><th>User</th><th>Status</th><th>Language</th><th>Time</th></tr></thead>
                  <tbody>
                    {stats.recentSubmissions?.map(s => (
                      <tr key={s._id}>
                        <td style={{ fontWeight: 500, fontSize: '0.875rem' }}>{s.problem?.title || s.problemTitle}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{s.user?.username || '—'}</td>
                        <td>
                          <span style={{
                            color: s.status === 'Accepted' ? 'var(--green)' : s.status === 'Wrong Answer' ? 'var(--red)' : 'var(--yellow)',
                            fontWeight: 600, fontSize: '0.82rem'
                          }}>{s.status}</span>
                        </td>
                        <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{s.language}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{new Date(s.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* PROBLEMS */}
      {tab === 'problems' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontWeight: 700 }}>All Problems ({problems.length})</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setTab('add-problem')}>+ Add Problem</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Title</th><th>Difficulty</th><th>Tags</th><th>Acceptance</th><th>Submissions</th><th>Actions</th></tr></thead>
              <tbody>
                {problems.map(p => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 500, fontSize: '0.875rem' }}>{p.title}</td>
                    <td><span className={`badge badge-${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {p.tags?.slice(0,2).map(t => <span key={t} className="badge badge-tag" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                      </div>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{p.acceptance}%</td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{p.totalSubmissions}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProblem(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USERS */}
      {tab === 'users' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontWeight: 700 }}>All Users ({users.length})</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Score</th><th>Solved</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td style={{ fontWeight: 600, fontSize: '0.875rem' }}>{u.username}</td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{u.email}</td>
                    <td>
                      <span style={{ color: u.role === 'admin' ? 'var(--accent3)' : 'var(--muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{u.score}</td>
                    <td style={{ color: 'var(--muted)' }}>{u.solved?.length || 0}</td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => handleToggleRole(u._id)}>Toggle Role</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTESTS */}
      {tab === 'contests' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontWeight: 700 }}>All Contests ({contests.length})</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setTab('add-contest')}>+ Add Contest</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Title</th><th>Status</th><th>Problems</th><th>Participants</th><th>Start Time</th><th>Actions</th></tr></thead>
              <tbody>
                {contests.map(c => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.title}</td>
                    <td>
                      <span style={{
                        color: c.status === 'active' ? 'var(--green)' : c.status === 'upcoming' ? 'var(--blue)' : 'var(--muted)',
                        fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase'
                      }}>{c.status}</span>
                    </td>
                    <td style={{ color: 'var(--muted)' }}>{c.problems?.length || 0}</td>
                    <td style={{ color: 'var(--muted)' }}>{c.participants?.length || 0}</td>
                    <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{new Date(c.startTime).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteContest(c._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD PROBLEM */}
      {tab === 'add-problem' && (
        <div style={{ maxWidth: 740 }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Add New Problem</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Problem Title *</label>
                <input value={newProblem.title} onChange={setP('title')} placeholder="e.g. Two Sum" />
              </div>
              <div className="form-group">
                <label>Difficulty *</label>
                <select value={newProblem.difficulty} onChange={setP('difficulty')}>
                  <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input value={newProblem.tags} onChange={setP('tags')} placeholder="Array, Hash Table, Two Pointers" />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea rows={5} value={newProblem.description} onChange={setP('description')} placeholder="Full problem description in plain text or markdown..." />
            </div>
            <div className="form-group">
              <label>Constraints (one per line)</label>
              <textarea rows={3} value={newProblem.constraints} onChange={setP('constraints')} placeholder={'1 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9'} />
            </div>
            <div className="form-group">
              <label>Hints (one per line, optional)</label>
              <textarea rows={2} value={newProblem.hints} onChange={setP('hints')} placeholder="Try using a hash map..." />
            </div>
            <div className="form-group">
              <label>JavaScript Starter Code</label>
              <textarea rows={5} value={newProblem.jsCode} onChange={setP('jsCode')}
                placeholder={"/**\n * @param {number[]} nums\n */\nfunction twoSum(nums, target) {\n  \n}"}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Python Starter Code</label>
                <textarea rows={4} value={newProblem.pyCode} onChange={setP('pyCode')} placeholder={"def two_sum(nums, target):\n    pass"} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }} />
              </div>
              <div className="form-group">
                <label>Java Starter Code</label>
                <textarea rows={4} value={newProblem.javaCode} onChange={setP('javaCode')} placeholder={"class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }} />
              </div>
            </div>
            <div className="form-group">
              <label>Test Cases (JSON array) *</label>
              <textarea rows={4} value={newProblem.testCasesRaw} onChange={setP('testCasesRaw')}
                placeholder={'[{"input": [[2,7,11,15], 9], "expected": [0,1]}, {"input": [[3,2,4], 6], "expected": [1,2]}]'}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }} />
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.35rem' }}>Format: {"[ { \"input\": [arg1, arg2, ...], \"expected\": result }, ... ]"}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button className="btn btn-primary" onClick={handleAddProblem} disabled={submitting}>{submitting ? 'Creating…' : 'Create Problem'}</button>
              <button className="btn btn-ghost" onClick={() => setTab('problems')}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CONTEST */}
      {tab === 'add-contest' && (
        <div style={{ maxWidth: 600 }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Add New Contest</h3>
            <div className="form-group">
              <label>Contest Title *</label>
              <input value={newContest.title} onChange={setC('title')} placeholder="Weekly Contest 42" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows={2} value={newContest.description} onChange={setC('description')} placeholder="Brief description of the contest..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Start Time *</label>
                <input type="datetime-local" value={newContest.startTime} onChange={setC('startTime')} />
              </div>
              <div className="form-group">
                <label>End Time *</label>
                <input type="datetime-local" value={newContest.endTime} onChange={setC('endTime')} />
              </div>
            </div>
            <div className="form-group">
              <label>Problem IDs (comma-separated MongoDB IDs)</label>
              <input value={newContest.problemIds} onChange={setC('problemIds')} placeholder="6507abc..., 6507def..." />
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                Find IDs in the Problems tab. Leave blank to add problems later.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" onClick={handleAddContest} disabled={submitting}>{submitting ? 'Creating…' : 'Create Contest'}</button>
              <button className="btn btn-ghost" onClick={() => setTab('contests')}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
