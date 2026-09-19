import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Books, Chat, CalendarCheck, Exam, Robot } from '@phosphor-icons/react';
import { mockTests } from '../mockData';
import { useNavigate } from 'react-router-dom';

export const StudentTests = () => {
  const navigate = useNavigate();
  const sidebarLinks = [
    { label: 'Dashboard', path: '/student', icon: <Books size={20} /> },
    { label: 'Attendance', path: '/student/attendance', icon: <CalendarCheck size={20} /> },
    { label: 'Class Chat', path: '/student/chat', icon: <Chat size={20} /> },
    { label: 'Tests', path: '/student/tests', icon: <Exam size={20} /> },
    { label: 'AI Tutor', path: '/student/ai-tutor', icon: <Robot size={20} /> }
  ];

  const activeTests = mockTests.filter(t => t.status === 'active');
  const upcomingTests = mockTests.filter(t => t.status === 'upcoming');
  const completedTests = [
    { id: 'test0', title: 'Basic Arithmetic', status: 'completed', score: '95/100', date: 'Last Week', cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <Layout sidebarLinks={sidebarLinks} role="student">
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div>
          <h1 className="text-3xl font-bold mb-2">My Tests 📝</h1>
          <p className="text-muted">Manage your assessments and view results.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Active Tests */}
        <Card title="Active Tests" className="glass">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
            {activeTests.map(test => (
              <div key={test.id} style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img src={test.cover} alt="Cover" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 className="font-bold" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{test.title}</h4>
                  <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-3)' }}>Duration: {test.durationMinutes} mins</p>
                  <Button variant="primary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => navigate(`/test/${test.id}`)}>Take Test Now</Button>
                </div>
              </div>
            ))}
            {activeTests.length === 0 && <p className="text-muted" style={{ padding: 'var(--space-4)' }}>No active tests right now.</p>}
          </div>
        </Card>

        {/* Upcoming Tests */}
        <Card title="Upcoming Tests" className="glass">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            {upcomingTests.map(test => (
              <div key={test.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', alignItems: 'center' }}>
                <img src={test.cover} alt="Cover" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <h4 className="font-bold" style={{ wordBreak: 'break-word' }}>{test.title}</h4>
                  <p className="text-sm text-muted">Duration: {test.durationMinutes} mins</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Completed Tests */}
        <Card title="Completed Tests & Results" className="glass">
          <div className="flex flex-col gap-4" style={{ marginTop: 'var(--space-2)' }}>
            {completedTests.map(test => (
              <div key={test.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <img src={test.cover} alt="Cover" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                  <div>
                    <h4 className="font-bold">{test.title}</h4>
                    <p className="text-sm text-muted">Completed: {test.date}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="text-sm text-muted">Score</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)' }}>{test.score}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};
