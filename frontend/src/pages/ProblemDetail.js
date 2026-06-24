import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const LANGS = ['javascript', 'python', 'java'];
const LANG_LABELS = { javascript: 'JavaScript', python: 'Python', java: 'Java' };

const STATUS_STYLE = {
  'Accepted':          { color: 'var(--green)',  bg: 'var(--green-bg)',  icon: '✓' },
  'Wrong Answer':      { color: 'var(--red)',    bg: 'var(--red-bg)',    icon: '✗' },
  'Runtime Error':     { color: 'var(--red)',    bg: 'var(--red-bg)',    icon: '⚠' },
  'Compilation Error': { color: 'var(--yellow)', bg: 'var(--yellow-bg)', icon: '⚠' },
  'Time Limit Exceeded':{ color: 'var(--yellow)', bg: 'var(--yellow-bg)', icon: '⏱' },
};

export default function ProblemDetail() {
  const { slug } = useParams();
  const { user, getSocket } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('description'); // description | submissions
  const [rightTab, setRightTab] = useState('code'); // code | result
  const editorRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/problems/${slug}`)
      .then(res => {
        setProblem(res.data);
        const starter = res.data.starterCode?.[lang] || '';
        setCode(starter);
      })
      .catch(() => navigate('/problems'))
      .finally(() => setLoading(false));
  }, [slug, navigate]); // eslint-disable-line

  useEffect(() => {
    if (problem) setCode(problem.starterCode?.[lang] || '');
  }, [lang]); // eslint-disable-line

  useEffect(() => {
    if (user && problem) {
      axios.get(`/submissions/problem/${problem._id}`).then(res => setSubmissions(res.data));
    }
  }, [user, problem]);

  // Listen for socket events
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const onResult = ({ status }) => {
      toast(status === 'Accepted' ? '✅ Accepted!' : `❌ ${status}`, status === 'Accepted' ? 'success' : 'error');
    };
    socket.on('submission_result', onResult);
    return () => socket.off('submission_result', onResult);
  }, [getSocket, toast]);

  // Handle TAB key in editor
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = editorRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newVal = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newVal);
      setTimeout(() => { el.selectionStart = el.selectionEnd = start + 2; }, 0);
    }
  };

  const handleSubmit = async () => {
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    setRightTab('result');
    setResult({ status: 'Judging…', judging: true });
    try {
      const { data } = await axios.post('/submissions', { problemId: problem._id, code, language: lang });
      setResult(data.result);
      setSubmissions(prev => [data.submission, ...prev]);
      // Update user solved list in UI
      if (data.result.status === 'Accepted' && !user.solved?.includes(problem._id)) {
        toast('🎉 Accepted! Points added to your score!', 'success');
      }
    } catch (err) {
      setResult({ status: 'Runtime Error', error: err.response?.data?.message || 'Submission failed.' });
      toast('Submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!problem) return null;

  const diffColor = { Easy: 'var(--easy)', Medium: 'var(--medium)', Hard: 'var(--hard)' }[problem.difficulty];
  const isSolved = user?.solved?.includes(problem._id);

  return (
    <div style={{ height: 'calc(100vh - 58px)', display: 'flex', overflow: 'hidden' }}>

      {/* LEFT: Problem description */}
      <div style={{ width: '42%', minWidth: 340, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Problem header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1rem', fontWeight: 700, flex: 1 }}>{problem.title}</h1>
            {isSolved && <span style={{ color: 'var(--green)', fontSize: '0.8rem', fontWeight: 600 }}>✓ Solved</span>}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.55rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
            {problem.tags.map(t => <span key={t} className="badge badge-tag" style={{ fontSize: '0.68rem' }}>{t}</span>)}
            <span style={{ color: 'var(--muted2)', fontSize: '0.75rem', marginLeft: 'auto' }}>
              {problem.acceptance}% accepted
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-bar" style={{ padding: '0 1.25rem', marginBottom: 0 }}>
          <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button>
          <button className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>Submissions {submissions.length > 0 && `(${submissions.length})`}</button>
          {problem.hints?.length > 0 && (
            <button className={`tab-btn ${activeTab === 'hints' ? 'active' : ''}`} onClick={() => setActiveTab('hints')}>Hints</button>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {activeTab === 'description' && (
            <>
              {/* Description */}
              <div style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text2)', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                {problem.description}
              </div>

              {/* Examples */}
              {problem.examples?.map((ex, i) => (
                <div key={i} style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Example {i + 1}:</p>
                  <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '0.85rem 1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', lineHeight: 1.7 }}>
                    <div><span style={{ color: 'var(--muted)' }}>Input:</span>  {ex.input}</div>
                    <div><span style={{ color: 'var(--muted)' }}>Output:</span> {ex.output}</div>
                    {ex.explanation && <div style={{ color: 'var(--muted)', marginTop: '0.3rem' }}>Explanation: {ex.explanation}</div>}
                  </div>
                </div>
              ))}

              {/* Constraints */}
              {problem.constraints?.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Constraints:</p>
                  <ul style={{ paddingLeft: '1.2rem' }}>
                    {problem.constraints.map((c, i) => (
                      <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: '0.25rem', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.7 }}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Points info */}
              <div style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.2)', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--accent3)', fontWeight: 600 }}>
                  +{problem.difficulty === 'Easy' ? 50 : problem.difficulty === 'Medium' ? 100 : 200} pts
                </span>
                <span style={{ color: 'var(--muted)', marginLeft: '0.4rem' }}>for solving this problem</span>
              </div>
            </>
          )}

          {activeTab === 'submissions' && (
            <div>
              {!user ? (
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                  <Link to="/login" style={{ color: 'var(--accent3)' }}>Sign in</Link> to view your submissions.
                </p>
              ) : submissions.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>No submissions yet.</p>
              ) : submissions.map(s => {
                const st = STATUS_STYLE[s.status] || {};
                return (
                  <div key={s._id} style={{
                    padding: '0.75rem 1rem', marginBottom: '0.5rem',
                    background: 'var(--bg3)', borderRadius: 8,
                    border: `1px solid ${st.color || 'var(--border)'}22`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: st.color, fontWeight: 600, fontSize: '0.875rem' }}>{st.icon} {s.status}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{new Date(s.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>⏱ {s.runtime}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>💾 {s.memory}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{LANG_LABELS[s.language]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'hints' && (
            <div>
              {problem.hints.map((h, i) => (
                <details key={i} style={{ marginBottom: '0.75rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', padding: '0.65rem 1rem', background: 'var(--bg3)', borderRadius: 8, userSelect: 'none', listStyle: 'none' }}>
                    💡 Hint {i + 1}
                  </summary>
                  <p style={{ padding: '0.75rem 1rem', color: 'var(--text2)', fontSize: '0.875rem', lineHeight: 1.7 }}>{h}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Editor + Result */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Editor top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', flexShrink: 0 }}>
          <div className="tab-bar" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>
            <button className={`tab-btn ${rightTab === 'code' ? 'active' : ''}`} onClick={() => setRightTab('code')}>Code</button>
            <button className={`tab-btn ${rightTab === 'result' ? 'active' : ''}`} onClick={() => setRightTab('result')}>Result {result && `• ${result.status}`}</button>
          </div>

          {/* Language selector */}
          <select value={lang} onChange={e => setLang(e.target.value)}
            style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '0.3rem 0.65rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
            {LANGS.map(l => <option key={l} value={l}>{LANG_LABELS[l]}</option>)}
          </select>

          <button className="btn btn-success btn-sm" onClick={handleSubmit} disabled={submitting}>
            {submitting ? '⏳ Judging…' : '▶ Submit'}
          </button>
        </div>

        {/* Editor */}
        {rightTab === 'code' && (
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <textarea
              ref={editorRef}
              className="code-editor"
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={{ height: '100%', width: '100%', display: 'block' }}
            />
          </div>
        )}

        {/* Result panel */}
        {rightTab === 'result' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {!result ? (
              <div style={{ textAlign: 'center', color: 'var(--muted)', paddingTop: '3rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💻</div>
                <p>Submit your code to see results here.</p>
              </div>
            ) : result.judging ? (
              <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
                <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--muted)' }}>Judging your solution…</p>
              </div>
            ) : (
              <>
                {/* Status banner */}
                {(() => {
                  const st = STATUS_STYLE[result.status] || {};
                  return (
                    <div style={{
                      padding: '1.25rem 1.5rem', borderRadius: 12,
                      background: st.bg || 'var(--bg3)',
                      border: `1px solid ${st.color || 'var(--border)'}44`,
                      marginBottom: '1.25rem'
                    }}>
                      <p style={{ fontSize: '1.3rem', fontWeight: 800, color: st.color }}>{st.icon} {result.status}</p>
                      {result.passedCases !== undefined && (
                        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                          Passed {result.passedCases} / {result.totalCases} test cases
                        </p>
                      )}
                    </div>
                  );
                })()}

                {/* Stats */}
                {result.runtime && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    {[{ label: 'Runtime', val: result.runtime, icon: '⏱' }, { label: 'Memory', val: result.memory, icon: '💾' }].map(s => (
                      <div key={s.label} style={{ background: 'var(--bg3)', borderRadius: 8, padding: '0.85rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>{s.icon} {s.label}</p>
                        <p style={{ fontWeight: 700, color: 'var(--accent3)', fontFamily: 'JetBrains Mono, monospace' }}>{s.val}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error details */}
                {result.errors?.map((e, i) => (
                  <div key={i} style={{ background: 'var(--bg3)', borderRadius: 8, padding: '0.85rem 1rem', marginBottom: '0.6rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--muted)' }}>
                    {e.error ? (
                      <><span style={{ color: 'var(--red)' }}>Error: </span>{e.error}</>
                    ) : (
                      <>
                        <div><span style={{ color: 'var(--muted)' }}>Input:</span>  {JSON.stringify(e.input)}</div>
                        <div><span style={{ color: 'var(--green)' }}>Expected:</span> {JSON.stringify(e.expected)}</div>
                        <div><span style={{ color: 'var(--red)' }}>Got:</span>      {JSON.stringify(e.got)}</div>
                      </>
                    )}
                  </div>
                ))}

                {result.error && (
                  <div style={{ background: 'var(--red-bg)', borderRadius: 8, padding: '0.85rem 1rem', color: 'var(--red)', fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {result.error}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
