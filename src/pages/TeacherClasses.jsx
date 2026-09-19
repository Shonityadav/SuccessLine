import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Users, UsersThree, Exam, Bell } from '@phosphor-icons/react';
import { mockClasses, mockUsers } from '../mockData';

export const TeacherClasses = () => {
  const teacherClasses = mockClasses.filter(c => c.teacherId === 't1');
  
  const sidebarLinks = [
    { label: 'Dashboard', path: '/teacher', icon: <Users size={20} /> },
    { label: 'My Classes', path: '/teacher/classes', icon: <UsersThree size={20} /> },
    { label: 'Test Management', path: '/teacher/tests', icon: <Exam size={20} /> },
  ];

  return (
    <Layout sidebarLinks={sidebarLinks} role="teacher">
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div>
          <h1 className="text-3xl font-bold mb-2">My Classes 📖</h1>
          <p className="text-muted">Manage your assigned classes and student details.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
          {teacherClasses.map(c => {
             const enrolledStudents = mockUsers.students.filter(s => c.students.includes(s.id));
             
             return (
              <Card key={c.id} className="glass overflow-hidden" style={{ padding: 0 }}>
                <div style={{ height: '140px', backgroundImage: `url(${c.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
                        <h2 className="text-2xl font-bold">{c.name}</h2>
                        <p className="text-sm" style={{ opacity: 0.9 }}>{c.students.length} Students Enrolled</p>
                    </div>
                </div>
                <div style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                        <h3 className="font-bold text-lg">Student Roster</h3>
                        <Button variant="outline">Download CSV</Button>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        {enrolledStudents.map(s => (
                            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <img src={s.avatar} alt={s.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                                    <div>
                                        <p className="font-bold">{s.name}</p>
                                        <p className="text-sm text-muted">{s.grade} Grade</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <p className="text-xs text-muted">Attendance</p>
                                        <p className="font-bold" style={{ color: 'var(--color-success)' }}>{s.attendance}</p>
                                    </div>
                                    <Button variant="outline" style={{ padding: '0.5rem 0.75rem' }}>Message</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </Card>
             );
          })}
      </div>
    </Layout>
  );
};
