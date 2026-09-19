import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, ChalkboardTeacher, ArrowRight, CheckCircle } from '@phosphor-icons/react';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem('role', role);
    navigate(role === 'student' ? '/student' : '/teacher');
  };

  const studentFeatures = ['View attendance & grades', 'Join class chats', 'Take tests online'];
  const teacherFeatures = ['Manage classes & students', 'Create & grade tests', 'Send notifications'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #fdf2f8 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '45vw', height: '45vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '20vw', height: '20vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72,
          height: 72,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
          marginBottom: '1.25rem',
        }}>
          <img
            src="https://ui-avatars.com/api/?name=SL&background=transparent&color=fff&size=48&bold=true&font-size=0.5"
            alt="Logo"
            style={{ width: 40, height: 40 }}
          />
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 0.5rem 0',
          lineHeight: 1.1,
        }}>
          SuccessLine
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', margin: 0 }}>
          Next-Generation Coaching Institute Platform
        </p>
      </div>

      {/* Cards Row */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '780px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ---- Student Card ---- */}
        <div style={{
          flex: '1 1 300px',
          maxWidth: '360px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(99,102,241,0.15)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
          overflow: 'hidden',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(99,102,241,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.10)'; }}
        >
          {/* Card top accent strip */}
          <div style={{ height: 6, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

          <div style={{ padding: '2rem 2rem 2.25rem' }}>
            {/* Icon */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(99,102,241,0.15)',
            }}>
              <Student size={36} color="#6366f1" weight="duotone" />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              Student Portal
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Access your learning dashboard, track attendance, and take online tests.
            </p>

            {/* Features list */}
            <ul style={{ listStyle: 'none', margin: '0 0 2rem 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {studentFeatures.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#334155' }}>
                  <CheckCircle size={16} color="#6366f1" weight="fill" style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={() => handleLogin('student')}
              style={{
                width: '100%',
                padding: '0.875rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                transition: 'opacity 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Login as Student <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* ---- Teacher Card ---- */}
        <div style={{
          flex: '1 1 300px',
          maxWidth: '360px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(244,63,94,0.15)',
          boxShadow: '0 8px 32px rgba(244,63,94,0.10)',
          overflow: 'hidden',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(244,63,94,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(244,63,94,0.10)'; }}
        >
          {/* Card top accent strip */}
          <div style={{ height: 6, background: 'linear-gradient(90deg, #f43f5e, #fb7185)' }} />

          <div style={{ padding: '2rem 2rem 2.25rem' }}>
            {/* Icon */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(244,63,94,0.15)',
            }}>
              <ChalkboardTeacher size={36} color="#f43f5e" weight="duotone" />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              Teacher Portal
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Manage classes, monitor student progress and create robust assessments.
            </p>

            {/* Features list */}
            <ul style={{ listStyle: 'none', margin: '0 0 2rem 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {teacherFeatures.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#334155' }}>
                  <CheckCircle size={16} color="#f43f5e" weight="fill" style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={() => handleLogin('teacher')}
              style={{
                width: '100%',
                padding: '0.875rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(244,63,94,0.35)',
                transition: 'opacity 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Login as Teacher <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer note */}
      <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', position: 'relative', zIndex: 1 }}>
        © 2026 SuccessLine · Coaching Institute Management Platform
      </p>
    </div>
  );
};
