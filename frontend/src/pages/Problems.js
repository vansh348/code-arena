import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const TAGS = ['All', 'Array', 'Hash Table', 'Stack', 'String', 'Sliding Window', 'Tree', 'BFS', 'DFS', 'Binary Search', 'Dynamic Programming', 'Backtracking', 'Linked List', 'Bit Manipulation', 'Math', 'Sorting', 'Matrix', 'Recursion'];
const SORTS = [
  { val: 'oldest', label: 'ID ↑' },
  { val: 'newest', label: 'Newest' },
  { val: 'acceptance', label: 'Acceptance ↓' },
  { val: 'submissions', label: 'Most Popular' },
];

export default function Problems() {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [tag, setTag] = useState('All');
  const [sort, setSort] = useState('oldest');
  const [page, setPage] = useState(1);
  const LIMIT = 15;

  const fetchProblems = useCallback(() => {
    setLoading(true);
    const params = { page, limit: LIMIT, sort };
    if (search) params.search = search;
    if (difficulty !== 'All') params.difficulty = difficulty;
    if (tag !== 'All') params.tag = tag;
    axios.get('/problems', { params })
      .then(res => { setProblems(res.data.problems); setTotal(res.data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, difficulty, tag, sort, page]);

  useEffect(() => { fetchProblems(); }, [fetchProblems]);

  useEffect(() => { setPage(1); }, [search, difficulty, tag, sort]);

  const isSolved = (id) => user?.solved?.includes(id);
  const totalPages = Math.ceil(total / LIMIT);

  // Difficulty counts (approximation from visible data)
  const counts = { Easy: 0, Medium: 0, Hard: 0 };
  problems.forEach(p => counts[p.difficulty]++);

  return (
    <div className="page">
      {/* Header */}
      <div className="section-header">
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Problems</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {total} problems — solve to earn points
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { label: 'Easy', color: 'var(--easy)' },
            { label: 'Medium', color: 'var(--medium)' },
            { label: 'Hard', color: 'var(--hard)' },
          ].map(d => (
            <div key={d.label} style={{ textAlign: 'center', padding: '0.5rem 0.9rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: d.color }}>
                {user?.solved ? problems.filter(p => p.difficulty === d.label && isSolved(p._id)).length : '—'}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          placeholder="🔍 Search problems..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {DIFFICULTIES.map(d => (
            <button key={d} className={`filter-btn ${difficulty === d ? 'active' : ''}`}
              onClick={() => setDifficulty(d)}>{d}</button>
          ))}
        </div>
        <select value={tag} onChange={e => setTag(e.target.value)}
          style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '0.4rem 0.75rem', borderRadius: 8, fontSize: '0.82rem', cursor: 'pointer', outline: 'none' }}>
          {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '0.4rem 0.75rem', borderRadius: 8, fontSize: '0.82rem', cursor: 'pointer', outline: 'none' }}>
          {SORTS.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th style={{ width: 44 }}></th>
                <th>Title</th>
                <th>Tags</th>
                <th>Difficulty</th>
                <th>Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
                  <div className="spinner" style={{ margin: '0 auto 0.75rem' }} />
                  Loading problems…
                </td></tr>
              ) : problems.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
                  No problems match your filters.
                </td></tr>
              ) : problems.map((p, i) => (
                <tr key={p._id} style={{ transition: 'background 0.1s' }}>
                  <td style={{ color: 'var(--muted2)', fontSize: '0.82rem' }}>
                    {(page - 1) * LIMIT + i + 1}
                  </td>
                  <td>
                    {user && isSolved(p._id)
                      ? <span style={{ color: 'var(--green)', fontSize: '1rem' }}>✓</span>
                      : <span style={{ color: 'var(--border2)', fontSize: '1rem' }}>○</span>
                    }
                  </td>
                  <td>
                    <Link to={`/problems/${p.slug}`}
                      style={{ color: 'var(--text2)', fontWeight: 500, textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--accent3)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text2)'}>
                      {p.title}
                    </Link>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {p.tags.slice(0, 2).map(t => (
                        <span key={t} className="badge badge-tag" style={{ fontSize: '0.68rem' }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td><span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span></td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{p.acceptance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '1.5rem', alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(1)}>«</button>
          <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i));
            return p;
          }).filter((p, i, a) => a.indexOf(p) === i && p >= 1 && p <= totalPages).map(p => (
            <button key={p} className={`btn btn-sm ${page === p ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setPage(p)}>{p}</button>
          ))}
          <button className="btn btn-ghost btn-sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
          <button className="btn btn-ghost btn-sm" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      )}

      {totalPages > 1 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.78rem', marginTop: '0.65rem' }}>
          Page {page} of {totalPages} — {total} total problems
        </p>
      )}
    </div>
  );
}
