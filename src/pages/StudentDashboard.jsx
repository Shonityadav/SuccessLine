import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Books, Chat, CalendarCheck, Bell, Exam, Info, Warning, Robot } from '@phosphor-icons/react';
import { mockNotifications, mockTests, mockUsers } from '../mockData';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentNotifications = mockNotifications.filter(n => n.targetRole === 'student');
  const studentTests = mockTests;
  const user = mockUsers.students[0];

  const sidebarLinks = [
    { label: 'Dashboard', path: '/student', icon: <Books size={20} /> },
    { label: 'Attendance', path: '/student/attendance', icon: <CalendarCheck size={20} /> },
    { label: 'Class Chat', path: '/student/chat', icon: <Chat size={20} /> },
    { label: 'Tests', path: '/student/tests', icon: <Exam size={20} /> },
    { label: 'AI Tutor', path: '/student/ai-tutor', icon: <Robot size={20} /> }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'warning': return <Warning size={20} color="var(--color-warning)" />;
      case 'success': return <Exam size={20} color="var(--color-success)" />;
      default: return <Info size={20} color="var(--color-info)" />;
    }
  };

  return (
    <Layout sidebarLinks={sidebarLinks} role="student">
      {/* Page header */}
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-muted">{user.grade} Standard | <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Attendance: {user.attendance}</span></p>
        </div>
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        {/* Left column */}
        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card title="Upcoming Tests" className="glass">
            <div className="flex flex-col gap-4">
              {studentTests.map(test => (
                <div key={test.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', alignItems: 'center' }}>
                  <img src={test.cover} alt="Test Cover" style={{ width: '90px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
                    <div>
                      <h4 className="font-bold" style={{ fontSize: '1rem', marginBottom: '0.25rem', wordBreak: 'break-word' }}>{test.title}</h4>
                      <p className="text-sm text-muted">
                        {test.durationMinutes} mins • <span style={{ color: test.status === 'active' ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 600 }}>{test.status.toUpperCase()}</span>
                      </p>
                    </div>
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      {test.status === 'active' ? (
                        <Button variant="primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => navigate(`/test/${test.id}`)}>Take Test</Button>
                      ) : (
                        <Button variant="outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} disabled>Upcoming</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Class Chat" className="glass">
            <div className="flex flex-col gap-6">
              <div style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                <img src={mockUsers.teachers[0].avatar} alt="Teacher" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p className="font-bold">{mockUsers.teachers[0].name} <span className="text-muted font-normal text-xs" style={{ marginLeft: 8 }}>10:30 AM</span></p>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', wordBreak: 'break-word' }}>Don't forget to review algebra formulas for the upcoming mid-term! I have uploaded some practice sheets in the portal.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card title={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bell size={18} weight="fill" color="var(--color-primary)"/> Notifications</div>} className="glass">
            <div className="flex flex-col gap-4">
              {studentNotifications.map(n => (
                <div key={n.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid var(--color-${n.type === 'info' ? 'primary' : n.type})` }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>{getNotificationIcon(n.type)}</div>
                  <div style={{ minWidth: 0 }}>
                    <h5 className="font-bold" style={{ marginBottom: 4, wordBreak: 'break-word' }}>{n.title}</h5>
                    <p className="text-sm text-muted" style={{ marginBottom: 6, wordBreak: 'break-word' }}>{n.text}</p>
                    <span className="text-xs text-muted font-medium">{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
