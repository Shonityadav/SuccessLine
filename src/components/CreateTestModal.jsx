import React, { useState, useEffect } from 'react';
import {
  X, Plus, Trash, ArrowLeft, ArrowRight, CheckCircle,
  Exam, Clock, Users, TextT, ListChecks, Image, FloppyDisk
} from '@phosphor-icons/react';
import { mockClasses } from '../mockData';

const STEPS = ['Test Details', 'Add Questions', 'Review & Publish'];

const blankQuestion = () => ({
  id: `q_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  text: '',
  type: 'mcq',
  options: ['', '', '', ''],
  answer: '',
});

export const CreateTestModal = ({ onClose, onPublish }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    classId: '',
    durationMinutes: 30,
    status: 'active',
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
  });
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [errors, setErrors] = useState({});

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ---- Validation ----
  const validateStep1 = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Test title is required';
    if (!form.classId) e.classId = 'Please select a class';
    if (!form.durationMinutes || form.durationMinutes < 5) e.duration = 'Min duration is 5 mins';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    questions.forEach((q, i) => {
      if (!q.text.trim()) e[`q_${i}_text`] = 'Question text required';
      if (q.type === 'mcq') {
        q.options.forEach((opt, j) => {
          if (!opt.trim()) e[`q_${i}_opt_${j}`] = `Option ${j + 1} required`;
        });
        if (!q.answer) e[`q_${i}_ans`] = 'Select correct answer';
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setErrors({});
    setStep(s => s + 1);
  };

  // ---- Form handlers ----
  const updateForm = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const updateQuestion = (idx, field, val) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, [field]: val } : q));
  };

  const updateOption = (qIdx, optIdx, val) => {
    setQuestions(qs => qs.map((q, i) => {
      if (i !== qIdx) return q;
      const opts = [...q.options];
      opts[optIdx] = val;
      return { ...q, options: opts };
    }));
  };

  const addQuestion = () => setQuestions(qs => [...qs, blankQuestion()]);
  const removeQuestion = (idx) => setQuestions(qs => qs.filter((_, i) => i !== idx));

  const handlePublish = () => {
    const newTest = {
      id: `test_${Date.now()}`,
      ...form,
      durationMinutes: Number(form.durationMinutes),
      questions: questions.map(q => ({
        ...q,
        options: q.type === 'mcq' ? q.options : undefined,
      })),
    };
    onPublish(newTest);
    onClose();
  };

  const coverOptions = [
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
  ];

  const teacherClasses = mockClasses.filter(c => c.teacherId === 't1');

  // ---- Styles ----
  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: '10px',
    border: `1.5px solid ${hasError ? 'var(--color-danger)' : 'var(--color-border)'}`,
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'var(--color-surface)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s ease',
  });

  const labelStyle = { display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' };
  const errorStyle = { color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.3rem' };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 1000,
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1001,
        width: 'min(680px, 95vw)',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}>

        {/* ===== Header ===== */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Exam size={22} color="white" weight="duotone" />
            <div>
              <h2 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>Create New Test</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0 }}>{STEPS[step]}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="white" />
          </button>
        </div>

        {/* ===== Step Indicator ===== */}
        <div style={{ display: 'flex', padding: '1rem 1.5rem 0', gap: '0.5rem', flexShrink: 0 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{
                height: 4, borderRadius: 99,
                backgroundColor: i <= step ? '#6366f1' : '#e2e8f0',
                transition: 'background-color 0.3s ease',
              }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: i <= step ? '#6366f1' : '#94a3b8' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* ===== Body ===== */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>

          {/* ======= STEP 1: Details ======= */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Title */}
              <div>
                <label style={labelStyle}>Test Title *</label>
                <input
                  style={inputStyle(errors.title)}
                  placeholder="e.g. Algebra Mid-Term Exam"
                  value={form.title}
                  onChange={e => updateForm('title', e.target.value)}
                />
                {errors.title && <p style={errorStyle}>{errors.title}</p>}
              </div>

              {/* Class */}
              <div>
                <label style={labelStyle}>Assign to Class *</label>
                <select
                  style={{ ...inputStyle(errors.classId), cursor: 'pointer' }}
                  value={form.classId}
                  onChange={e => updateForm('classId', e.target.value)}
                >
                  <option value="">-- Select a class --</option>
                  {teacherClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.classId && <p style={errorStyle}>{errors.classId}</p>}
              </div>

              {/* Duration + Status row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Duration (minutes) *</label>
                  <input
                    type="number" min="5" max="180"
                    style={inputStyle(errors.duration)}
                    value={form.durationMinutes}
                    onChange={e => updateForm('durationMinutes', e.target.value)}
                  />
                  {errors.duration && <p style={errorStyle}>{errors.duration}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Publish Status</label>
                  <select
                    style={{ ...inputStyle(false), cursor: 'pointer' }}
                    value={form.status}
                    onChange={e => updateForm('status', e.target.value)}
                  >
                    <option value="active">🟢 Active (live now)</option>
                    <option value="upcoming">🟡 Upcoming (scheduled)</option>
                  </select>
                </div>
              </div>

              {/* Cover image picker */}
              <div>
                <label style={labelStyle}><Image size={14} style={{ marginRight: 4 }} />Cover Image</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {coverOptions.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => updateForm('cover', url)}
                      style={{
                        height: 70, borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                        border: form.cover === url ? '3px solid #6366f1' : '2px solid transparent',
                        boxShadow: form.cover === url ? '0 0 0 2px rgba(99,102,241,0.3)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======= STEP 2: Questions ======= */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {questions.map((q, qIdx) => (
                <div key={q.id} style={{
                  border: '1.5px solid var(--color-border)',
                  borderRadius: '14px',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fafafa',
                  position: 'relative',
                }}>
                  {/* Question header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#6366f1' }}>
                      Q{qIdx + 1}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {/* Type toggle */}
                      <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                        {['mcq', 'text'].map(type => (
                          <button
                            key={type}
                            onClick={() => updateQuestion(qIdx, 'type', type)}
                            style={{
                              padding: '0.3rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: q.type === type ? '#6366f1' : 'white',
                              color: q.type === type ? 'white' : '#64748b',
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {type === 'mcq' ? <><ListChecks size={12} /> MCQ</> : <><TextT size={12} /> Text</>}
                          </button>
                        ))}
                      </div>
                      {/* Delete */}
                      {questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(qIdx)}
                          style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.3rem 0.6rem', cursor: 'pointer', color: 'var(--color-danger)', display: 'flex', alignItems: 'center' }}
                        >
                          <Trash size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question text */}
                  <textarea
                    rows={2}
                    placeholder="Enter the question..."
                    value={q.text}
                    onChange={e => updateQuestion(qIdx, 'text', e.target.value)}
                    style={{
                      ...inputStyle(errors[`q_${qIdx}_text`]),
                      resize: 'vertical',
                      minHeight: '60px',
                    }}
                  />
                  {errors[`q_${qIdx}_text`] && <p style={errorStyle}>{errors[`q_${qIdx}_text`]}</p>}

                  {/* MCQ Options */}
                  {q.type === 'mcq' && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Options & Correct Answer</label>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {/* Radio to mark correct */}
                          <input
                            type="radio"
                            name={`correct_${q.id}`}
                            checked={q.answer === opt && opt !== ''}
                            onChange={() => updateQuestion(qIdx, 'answer', opt)}
                            style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#6366f1', flexShrink: 0 }}
                            title="Mark as correct answer"
                          />
                          <input
                            placeholder={`Option ${optIdx + 1}`}
                            value={opt}
                            onChange={e => {
                              updateOption(qIdx, optIdx, e.target.value);
                              // Update answer if it matched old value
                              if (q.answer === opt) updateQuestion(qIdx, 'answer', e.target.value);
                            }}
                            style={{
                              ...inputStyle(errors[`q_${qIdx}_opt_${optIdx}`]),
                              borderColor: q.answer === opt && opt ? '#6366f1' : errors[`q_${qIdx}_opt_${optIdx}`] ? 'var(--color-danger)' : 'var(--color-border)',
                              backgroundColor: q.answer === opt && opt ? '#eef2ff' : 'white',
                            }}
                          />
                        </div>
                      ))}
                      {errors[`q_${qIdx}_ans`] && <p style={errorStyle}>☝️ {errors[`q_${qIdx}_ans`]}</p>}
                      <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                        Click the radio button next to the correct answer
                      </p>
                    </div>
                  )}

                  {q.type === 'text' && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      Students will type a free-text answer for this question.
                    </p>
                  )}
                </div>
              ))}

              {/* Add question */}
              <button
                onClick={addQuestion}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '2px dashed #6366f1',
                  backgroundColor: '#eef2ff',
                  color: '#6366f1',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Plus size={18} weight="bold" /> Add Question
              </button>
            </div>
          )}

          {/* ======= STEP 3: Review ======= */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Cover preview */}
              <div style={{ borderRadius: '14px', overflow: 'hidden', height: 140, position: 'relative' }}>
                <img src={form.cover} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>{form.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0 }}>
                    {mockClasses.find(c => c.id === form.classId)?.name}
                  </p>
                </div>
                <span style={{
                  position: 'absolute', top: 10, right: 10,
                  padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem',
                  fontWeight: 700, textTransform: 'uppercase',
                  backgroundColor: form.status === 'active' ? '#6366f1' : '#f59e0b',
                  color: 'white',
                }}>
                  {form.status}
                </span>
              </div>

              {/* Summary chips */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Clock size={14} />, label: `${form.durationMinutes} mins` },
                  { icon: <Exam size={14} />, label: `${questions.length} Questions` },
                  { icon: <Users size={14} />, label: mockClasses.find(c => c.id === form.classId)?.name || '' },
                ].map((chip, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', borderRadius: '999px', backgroundColor: '#eef2ff', color: '#6366f1', fontWeight: 600, fontSize: '0.82rem' }}>
                    {chip.icon} {chip.label}
                  </div>
                ))}
              </div>

              {/* Questions preview */}
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: '#0f172a' }}>
                  Questions Preview
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {questions.map((q, i) => (
                    <div key={q.id} style={{ padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 700, color: '#6366f1', fontSize: '0.8rem', flexShrink: 0 }}>Q{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.88rem', fontWeight: 500, color: '#1e293b', margin: '0 0 0.3rem 0' }}>{q.text}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '999px', backgroundColor: q.type === 'mcq' ? '#e0e7ff' : '#f0fdf4', color: q.type === 'mcq' ? '#4338ca' : '#166534', fontWeight: 600 }}>
                              {q.type === 'mcq' ? 'MCQ' : 'Text'}
                            </span>
                            {q.type === 'mcq' && q.answer && (
                              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>
                                ✓ Answer: {q.answer}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish notice */}
              <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: form.status === 'active' ? '#f0fdf4' : '#fffbeb', border: `1px solid ${form.status === 'active' ? '#86efac' : '#fde68a'}` }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={18} color={form.status === 'active' ? '#16a34a' : '#d97706'} weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: '0.82rem', color: form.status === 'active' ? '#166534' : '#92400e', fontWeight: 500, margin: 0 }}>
                    {form.status === 'active'
                      ? 'This test will be immediately visible and active for students.'
                      : 'This test will be saved as upcoming and not visible to students yet.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== Footer ===== */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: '#fafafa',
          flexShrink: 0,
          gap: '0.75rem',
        }}>
          <button
            onClick={step === 0 ? onClose : () => setStep(s => s - 1)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.65rem 1.25rem', borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              backgroundColor: 'white', color: '#64748b',
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} /> {step === 0 ? 'Cancel' : 'Back'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
              Step {step + 1} of {STEPS.length}
            </span>
          </div>

          {step < 2 ? (
            <button
              onClick={handleNext}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', fontWeight: 700, fontSize: '0.9rem',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
              }}
            >
              Next <ArrowRight size={16} weight="bold" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem', borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white', fontWeight: 700, fontSize: '0.9rem',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16,185,129,0.35)',
              }}
            >
              <FloppyDisk size={16} weight="bold" /> Publish Test
            </button>
          )}
        </div>
      </div>
    </>
  );
};
