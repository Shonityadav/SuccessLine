import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Books, Chat, CalendarCheck, Exam, Robot } from '@phosphor-icons/react';

export const StudentAttendance = () => {
  const sidebarLinks = [
    { label: 'Dashboard', path: '/student', icon: <Books size={20} /> },
    { label: 'Attendance', path: '/student/attendance', icon: <CalendarCheck size={20} /> },
    { label: 'Class Chat', path: '/student/chat', icon: <Chat size={20} /> },
    { label: 'Tests', path: '/student/tests', icon: <Exam size={20} /> },
    { label: 'AI Tutor', path: '/student/ai-tutor', icon: <Robot size={20} /> }
  ];

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const presentDays = [1, 2, 3, 4, 5, 8, 9, 10, 11, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30];
  const absentDays = [12];
  const holidays = [6, 7, 13, 14, 20, 21, 27, 28];

  const getStatus = (day) => {
    if (presentDays.includes(day)) return 'present';
    if (absentDays.includes(day)) return 'absent';
    if (holidays.includes(day)) return 'holiday';
    return 'upcoming';
  };

  return (
    <Layout sidebarLinks={sidebarLinks} role="student">
      <div className="page-header mb-8 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-6)' }}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Attendance Record 📅</h1>
          <p className="text-muted">Track your daily class presence.</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p className="text-sm text-muted">Overall Attendance</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>92%</p>
        </div>
      </div>

      <Card title="Current Month (September)" className="glass">
        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>
            <span className="text-sm">Present</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: 'var(--color-danger)' }}></div>
            <span className="text-sm">Absent</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
            <span className="text-sm">Holiday/Weekend</span>
          </div>
        </div>

        {/* Calendar grid — uses auto columns so cells shrink on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: '0.5rem',
          marginTop: 'var(--space-6)',
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.75rem', padding: '0.25rem 0' }}>{day}</div>
          ))}
          
          {daysInMonth.map(day => {
            const status = getStatus(day);
            let bgColor = 'var(--color-surface)';
            let borderColor = 'var(--color-border)';
            let textColor = 'var(--color-text)';
            
            if (status === 'present') {
              bgColor = 'var(--color-success)';
              borderColor = 'var(--color-success)';
              textColor = 'white';
            } else if (status === 'absent') {
              bgColor = 'var(--color-danger)';
              borderColor = 'var(--color-danger)';
              textColor = 'white';
            } else if (status === 'holiday') {
              bgColor = '#f1f5f9';
              textColor = 'var(--color-text-muted)';
            }

            return (
              <div
                key={day}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  aspectRatio: '1',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  color: textColor,
                  fontWeight: 600,
                  fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                  transition: 'transform 0.15s ease',
                  cursor: 'default',
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </Card>
    </Layout>
  );
};
