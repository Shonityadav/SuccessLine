import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Users, UsersThree, Exam, Plus, CheckCircle, Clock, ChartBar } from '@phosphor-icons/react';
import { mockTests, mockClasses } from '../mockData';

export const TeacherTests = () => {
  const teacherClasses = mockClasses.filter(c => c.teacherId === 't1');
  const classIds = teacherClasses.map(c => c.id);
  const teacherTests = mockTests.filter(t => classIds.includes(t.classId));

  const activeTests = teacherTests.filter(t => t.status === 'active');
  const upcomingTests = teacherTests.filter(t => t.status === 'upcoming');

  const sidebarLinks = [
    { label: 'Dashboard', path: '/teacher', icon: <Users size={20} /> },
    { label: 'My Classes', path: '/teacher/classes', icon: <UsersThree size={20} /> },
    { label: 'Test Management', path: '/teacher/tests', icon: <Exam size={20} /> },
  ];

  const TestCard = ({ test }) => {
    const isActive = test.status === 'active';
    const className = mockClasses.find(c => c.id === test.classId)?.name;

    return (
      <div style={{
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '16px',
        border: `1.5px solid ${isActive ? 'rgba(99,102,241,0.2)' : 'var(--color-border)'}`,
        boxShadow: isActive ? '0 4px 20px rgba(99,102,241,0.1)' : 'var(--shadow-sm)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isActive ? '0 4px 20px rgba(99,102,241,0.1)' : 'var(--shadow-sm)'; }}
      >
        {/* Cover image */}
        <div style={{ position: 'relative', height: 130 }}>
          <img
            src={test.cover}
            alt={test.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />

          {/* Status badge */}
          <span style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backgroundColor: isActive ? '#6366f1' : '#f59e0b',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            {test.status}
          </span>

          {/* Class name at bottom of image */}
          <span style={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 600,
            backgroundColor: 'rgba(0,0,0,0.35)',
            padding: '2px 8px',
            borderRadius: '999px',
          }}>
            {className}
          </span>
        </div>

        {/* Card body */}
        <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
          <h4 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', margin: '0 0 0.75rem 0', lineHeight: 1.3 }}>
            {test.title}
          </h4>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Clock size={14} color="var(--color-primary)" weight="fill" />
              {test.durationMinutes} mins
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Exam size={14} color="var(--color-primary)" weight="fill" />
              {test.questions.length} Questions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <ChartBar size={14} color={isActive ? 'var(--color-success)' : 'var(--color-warning)'} weight="fill" />
              {isActive ? '0/2 Submissions' : 'Not started'}
            </div>
          </div>

          {/* Action button */}
          <button
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              background: isActive
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                : 'transparent',
              color: isActive ? 'white' : 'var(--color-text-muted)',
              border: isActive ? 'none' : '1px solid var(--color-border)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              boxShadow: isActive ? '0 2px 10px rgba(99,102,241,0.3)' : 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {isActive ? '📊 View Results' : '🕐 Upcoming'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout sidebarLinks={sidebarLinks} role="teacher">
      {/* Header */}
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Test Management 📊</h1>
          <p className="text-muted">Create, monitor, and review tests for your classes.</p>
        </div>
        <div className="header-actions">
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              transition: 'opacity 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Plus size={18} weight="bold" /> Create New Test
          </button>
        </div>
      </div>

      {/* Active Tests */}
      {activeTests.length > 0 && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: 'var(--space-4)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>Active Tests</h2>
            <span style={{ padding: '2px 10px', borderRadius: '999px', backgroundColor: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: 700 }}>
              {activeTests.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {activeTests.map(test => <TestCard key={test.id} test={test} />)}
          </div>
        </div>
      )}

      {/* Upcoming Tests */}
      {upcomingTests.length > 0 && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: 'var(--space-4)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block', boxShadow: '0 0 0 3px rgba(245,158,11,0.2)' }} />
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>Upcoming Tests</h2>
            <span style={{ padding: '2px 10px', borderRadius: '999px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: 700 }}>
              {upcomingTests.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {upcomingTests.map(test => <TestCard key={test.id} test={test} />)}
          </div>
        </div>
      )}

      {/* All tests fallback (shows all if no active/upcoming split) */}
      {activeTests.length === 0 && upcomingTests.length === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {teacherTests.map(test => <TestCard key={test.id} test={test} />)}
        </div>
      )}

      {teacherTests.length === 0 && (
        <Card className="glass" style={{ textAlign: 'center', padding: '3rem' }}>
          <Exam size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
          <p className="text-muted">No tests yet. Create your first test!</p>
        </Card>
      )}
    </Layout>
  );
};
