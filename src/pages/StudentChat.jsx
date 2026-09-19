import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Books, Chat, CalendarCheck, Exam, PaperPlaneRight } from '@phosphor-icons/react';
import { mockUsers } from '../mockData';

export const StudentChat = () => {
  const sidebarLinks = [
    { label: 'Dashboard', path: '/student', icon: <Books size={20} /> },
    { label: 'Attendance', path: '/student/attendance', icon: <CalendarCheck size={20} /> },
    { label: 'Class Chat', path: '/student/chat', icon: <Chat size={20} /> },
    { label: 'Tests', path: '/student/tests', icon: <Exam size={20} /> }
  ];

  const teacher = mockUsers.teachers[0];
  const me = mockUsers.students[0];
  
  const [messages, setMessages] = useState([
    { id: 1, sender: teacher, text: 'Hello class! Welcome to the new semester.', time: '10:00 AM' },
    { id: 2, sender: teacher, text: "Don't forget to review algebra formulas for the upcoming mid-term! I have uploaded some practice sheets in the portal.", time: '10:30 AM' },
    { id: 3, sender: mockUsers.students[1], text: 'Thank you sir, will check them out.', time: '10:45 AM' },
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      sender: me,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
  };

  return (
    <Layout sidebarLinks={sidebarLinks} role="student">
      <div className="page-header mb-4 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-4) var(--space-6)' }}>
        <div>
          <h1 className="text-3xl font-bold mb-1">Class Chat 💬</h1>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Communicate with your teacher and classmates.</p>
        </div>
      </div>

      <Card className="glass" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 240px)', minHeight: '350px' }}>
        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {messages.map(msg => {
            const isMe = msg.sender.id === me.id;
            return (
              <div key={msg.id} style={{ display: 'flex', gap: 'var(--space-3)', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
                <img
                  src={msg.sender.avatar}
                  alt={msg.sender.name}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexDirection: isMe ? 'row-reverse' : 'row' }}>
                    <span className="font-semibold text-sm">{isMe ? 'You' : msg.sender.name}</span>
                    <span className="text-xs text-muted">{msg.time}</span>
                  </div>
                  <div style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '1rem',
                    backgroundColor: isMe ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isMe ? 'white' : 'var(--color-text)',
                    border: isMe ? 'none' : '1px solid var(--color-border)',
                    borderTopRightRadius: isMe ? '0' : '1rem',
                    borderTopLeftRadius: isMe ? '1rem' : '0',
                    wordBreak: 'break-word',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input area */}
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '0.7rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              outline: 'none',
              fontSize: '0.95rem',
              minWidth: 0,
            }}
          />
          <Button
            variant="primary"
            style={{ borderRadius: 'var(--radius-full)', width: '44px', height: '44px', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={handleSend}
          >
            <PaperPlaneRight size={18} weight="fill" />
          </Button>
        </div>
      </Card>
    </Layout>
  );
};
