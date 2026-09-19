import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Users, UsersThree, Exam, Bell, Student } from '@phosphor-icons/react';
import { mockClasses, mockTests, mockUsers } from '../mockData';

export const TeacherDashboard = () => {
  const teacherClasses = mockClasses.filter(c => c.teacherId === 't1');
  const classIds = teacherClasses.map(c => c.id);
  const teacherTests = mockTests.filter(t => classIds.includes(t.classId));
  const user = mockUsers.teachers[0];
  
  const sidebarLinks = [
    { label: 'Dashboard', path: '/teacher', icon: <Users size={20} /> },
    { label: 'My Classes', path: '/teacher/classes', icon: <UsersThree size={20} /> },
    { label: 'Test Management', path: '/teacher/tests', icon: <Exam size={20} /> },
  ];

  return (
    <Layout sidebarLinks={sidebarLinks} role="teacher">
      {/* Page Header */}
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div style={{ flex: 1 }}>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 📚</h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>{user.subject} Department</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button variant="outline"><Bell size={18} style={{ marginRight: 6 }}/> Send Notification</Button>
          <Button variant="primary"><Exam size={18} style={{ marginRight: 6 }}/> Create New Test</Button>
        </div>
      </div>

      {/* Two-column grid — stacks on mobile */}
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card title="My Assigned Classes" className="glass">
            <div className="flex flex-col gap-6">
              {teacherClasses.map(c => (
                <div key={c.id} className="rounded-xl overflow-hidden shadow-sm bg-surface transition-transform hover-scale" style={{ border: '1px solid var(--color-border)' }}>
                  <div style={{ height: '110px', backgroundImage: `url(${c.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: 'var(--space-4)' }}>
                    <div className="flex justify-between items-center mb-4" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 className="font-bold text-xl">{c.name}</h4>
                      <span className="flex items-center gap-2 text-sm text-primary font-bold px-3 py-1 bg-primary-light rounded-full" style={{ backgroundColor: 'var(--color-primary-light)', whiteSpace: 'nowrap' }}>
                        <Student size={16}/> {c.students.length} Students
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
          <Card title="Recent Tests" className="glass">
            <div className="flex flex-col gap-4">
              {teacherTests.map(test => (
                <div key={test.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                  <img src={test.cover} alt="Test" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
                    <p className="font-bold" style={{ wordBreak: 'break-word' }}>{test.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ backgroundColor: test.status === 'active' ? 'var(--color-primary-light)' : '#fef3c7', color: test.status === 'active' ? 'var(--color-primary)' : '#b45309' }}>
                        {test.status.toUpperCase()}
                      </span>
                      <button className="text-xs font-bold text-primary">Results</button>
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
