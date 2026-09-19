import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CreateTestModal } from '../components/CreateTestModal';
import { Users, UsersThree, Exam, Bell, Student } from '@phosphor-icons/react';
import { mockClasses, mockTests, mockUsers } from '../mockData';

export const TeacherDashboard = () => {
  const teacherClasses = mockClasses.filter(c => c.teacherId === 't1');
  const classIds = teacherClasses.map(c => c.id);
  const user = mockUsers.teachers[0];

  const [tests, setTests] = useState(mockTests.filter(t => classIds.includes(t.classId)));
  const [showCreateModal, setShowCreateModal] = useState(false);

  const sidebarLinks = [
    { label: 'Dashboard', path: '/teacher', icon: <Users size={20} /> },
    { label: 'My Classes', path: '/teacher/classes', icon: <UsersThree size={20} /> },
    { label: 'Test Management', path: '/teacher/tests', icon: <Exam size={20} /> },
  ];

  const handlePublish = (newTest) => {
    setTests(prev => [newTest, ...prev]);
  };

  return (
    <Layout sidebarLinks={sidebarLinks} role="teacher">

      {/* Create Test Modal */}
      {showCreateModal && (
        <CreateTestModal
          onClose={() => setShowCreateModal(false)}
          onPublish={handlePublish}
        />
      )}

      {/* Page Header */}
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div style={{ flex: 1 }}>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 📚</h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>{user.subject} Department</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button variant="outline"><Bell size={18} style={{ marginRight: 6 }}/> Send Notification</Button>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', fontWeight: 700, fontSize: '0.9rem',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
              transition: 'opacity 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Exam size={16} weight="bold" /> Create New Test
          </button>
        </div>
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card title="My Assigned Classes" className="glass">
            <div className="flex flex-col gap-6">
              {teacherClasses.map(c => (
                <div key={c.id} className="rounded-xl overflow-hidden shadow-sm bg-surface hover-scale" style={{ border: '1px solid var(--color-border)', transition: 'transform 0.2s ease' }}>
                  <div style={{ height: '110px', backgroundImage: `url(${c.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: 'var(--space-4)' }}>
                    <div className="flex justify-between items-center mb-4" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 className="font-bold" style={{ fontSize: '1rem' }}>{c.name}</h4>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700, padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-primary-light)', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                        <Student size={14} /> {c.students.length} Students
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                      <Button variant="outline" className="text-sm">View Students</Button>
                      <Button variant="outline" className="text-sm">Class Chat</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card title={`Recent Tests (${tests.length})`} className="glass">
            <div className="flex flex-col gap-4">
              {tests.length === 0 && (
                <p className="text-muted text-sm" style={{ textAlign: 'center', padding: '1rem' }}>
                  No tests yet. Click "Create New Test" to get started!
                </p>
              )}
              {tests.map(test => (
                <div key={test.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                  <img src={test.cover} alt="Test" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
                    <p className="font-bold" style={{ wordBreak: 'break-word', fontSize: '0.9rem' }}>{test.title}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', flexWrap: 'wrap', gap: '0.3rem' }}>
                      <span style={{
                        fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 700,
                        backgroundColor: test.status === 'active' ? 'var(--color-primary-light)' : '#fef3c7',
                        color: test.status === 'active' ? 'var(--color-primary)' : '#b45309'
                      }}>
                        {test.status.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        {test.questions?.length || 0} Qs
                      </span>
                    </div>
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
