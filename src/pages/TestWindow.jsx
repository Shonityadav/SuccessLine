import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTests } from '../mockData';
import { Button } from '../components/Button';
import { WarningCircle, List, X } from '@phosphor-icons/react';

export const TestWindow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = mockTests.find(t => t.id === id);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(test ? test.durationMinutes * 60 : 0);
  const [answers, setAnswers] = useState({});
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    if (!test) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [test]);

  if (!test) return <div style={{ padding: '2rem', textAlign: 'center' }}>Test not found.</div>;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectOption = (qId, opt) => {
    setAnswers({ ...answers, [qId]: opt });
  };

  const handleSubmit = () => {
    alert('Test submitted successfully!');
    navigate('/student');
  };

  const q = test.questions[currentQ];
  const isLowTime = timeLeft < 300;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--color-background)' }}>

      {/* ===== Header ===== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 10,
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontWeight: 700, fontSize: 'clamp(1rem, 3vw, 1.4rem)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{test.title}</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>SuccessLine Secure Assessment</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Timer */}
          <div style={{
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'monospace',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            backgroundColor: isLowTime ? '#fef2f2' : 'var(--color-surface)',
            color: isLowTime ? 'var(--color-danger)' : 'var(--color-text)',
            border: `2px solid ${isLowTime ? 'var(--color-danger)' : 'var(--color-border)'}`,
          }}>
            {formatTime(timeLeft)}
          </div>
          {/* Mobile palette toggle */}
          <button
            onClick={() => setPaletteOpen(v => !v)}
            style={{
              display: 'none', // shown via CSS on mobile
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
            }}
            className="palette-toggle-btn"
            aria-label="Question palette"
          >
            {paletteOpen ? <X size={20} color="var(--color-primary)" /> : <List size={20} color="var(--color-primary)" />}
          </button>
          <Button variant="danger" onClick={handleSubmit} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
            Submit
          </Button>
        </div>
      </div>

      {/* ===== Body ===== */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', padding: '1rem', gap: '1rem', position: 'relative' }}>

        {/* ===== Question Area ===== */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}>
          {/* Question meta */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px dashed var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                Question {currentQ + 1} of {test.questions.length}
              </span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Marks: +1.0 / -0.25</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 500, lineHeight: 1.5 }}>{q.text}</h2>
          </div>

          {/* Options / Textarea */}
          <div style={{ flex: 1 }}>
            {q.type === 'mcq' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((opt, i) => {
                  const isSelected = answers[q.id] === opt;
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectOption(q.id, opt)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.15s ease',
                        userSelect: 'none',
                      }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        border: isSelected ? '7px solid var(--color-primary)' : '2px solid var(--color-border)',
                        backgroundColor: 'white',
                        transition: 'all 0.15s ease',
                      }} />
                      <span style={{ fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--color-primary-hover)' : 'var(--color-text)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <textarea
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--color-border)',
                  minHeight: '220px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-surface-hover)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
                placeholder="Type your detailed answer here..."
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', gap: '0.75rem' }}>
            <Button
              variant="outline"
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              style={{ padding: '0.75rem 1.25rem', flex: 1, maxWidth: '180px' }}
            >
              ← Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentQ(prev => Math.min(test.questions.length - 1, prev + 1))}
              disabled={currentQ === test.questions.length - 1}
              style={{ padding: '0.75rem 1.25rem', flex: 1, maxWidth: '180px' }}
            >
              Save & Next →
            </Button>
          </div>
        </div>

        {/* ===== Question Palette (desktop sidebar / mobile overlay) ===== */}
        <div
          className={`question-palette${paletteOpen ? ' palette-open' : ''}`}
          style={{
            width: '260px',
            flexShrink: 0,
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>Question Palette</h3>
          </div>

          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {test.questions.map((question, i) => {
                const isAnswered = !!answers[question.id];
                const isActive = i === currentQ;
                return (
                  <button
                    key={question.id}
                    onClick={() => { setCurrentQ(i); setPaletteOpen(false); }}
                    style={{
                      width: 44, height: 44,
                      borderRadius: 'var(--radius-md)',
                      border: isActive ? '3px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: isAnswered ? 'var(--color-success)' : 'var(--color-surface)',
                      color: isAnswered ? 'white' : 'var(--color-text)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-hover)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 16, height: 16, backgroundColor: 'var(--color-success)', borderRadius: 4 }} />
                <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>Answered ({Object.keys(answers).length})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 16, height: 16, backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)', borderRadius: 4 }} />
                <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>Not Answered ({test.questions.length - Object.keys(answers).length})</span>
              </div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <WarningCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 }}>Do not switch tabs or exit fullscreen. Doing so may submit your test.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
