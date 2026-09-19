import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Books, Chat, CalendarCheck, Exam, PaperPlaneRight, Robot, Sparkle } from '@phosphor-icons/react';
import { mockUsers } from '../mockData';

export const AIChatbot = () => {
  const sidebarLinks = [
    { label: 'Dashboard', path: '/student', icon: <Books size={20} /> },
    { label: 'Attendance', path: '/student/attendance', icon: <CalendarCheck size={20} /> },
    { label: 'Class Chat', path: '/student/chat', icon: <Chat size={20} /> },
    { label: 'Tests', path: '/student/tests', icon: <Exam size={20} /> },
    { label: 'AI Tutor', path: '/student/ai-tutor', icon: <Robot size={20} /> }
  ];

  const me = mockUsers.students[0];
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'Hello there! 👋 I am your SuccessLine AI Tutor. I can help you understand concepts, solve problems, or prepare for tests. What would you like to learn today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      sender: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! In simple terms, photosynthesis is how plants make their own food using sunlight.",
        "Let me break down that formula for you. E=mc² means energy equals mass times the speed of light squared.",
        "I can certainly help you practice for your upcoming Algebra Mid-Term. Shall we start with some linear equations?",
        "Excellent attempt! However, remember to carry the 1 when adding those fractions. Want to try another one?",
        "Based on your recent tests, you might want to focus on Kinematics. Would you like a quick summary of the key concepts?"
      ];
      
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout sidebarLinks={sidebarLinks} role="student">
      <div className="page-header mb-4 bg-surface rounded-xl shadow-sm glass" style={{ padding: 'var(--space-4) var(--space-6)', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '14px', color: 'white', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
            <Robot size={28} weight="duotone" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              AI Tutor <Sparkle size={20} color="#8b5cf6" weight="fill" />
            </h1>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Your personal AI learning assistant, available 24/7.</p>
          </div>
        </div>
      </div>

      <Card className="glass" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 240px)', minHeight: '400px', border: '1px solid rgba(139,92,246,0.15)' }}>
        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: '#fafafa' }}>
          {messages.map(msg => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} style={{ display: 'flex', gap: 'var(--space-3)', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
                {isMe ? (
                   <img src={me.avatar} alt="Me" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                ) : (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 2px 8px rgba(99,102,241,0.25)' }}>
                    <Robot size={20} weight="fill" />
                  </div>
                )}
                
                <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexDirection: isMe ? 'row-reverse' : 'row' }}>
                    <span className="font-semibold text-sm">{isMe ? 'You' : 'AI Tutor'}</span>
                    <span className="text-xs text-muted">{msg.time}</span>
                  </div>
                  <div style={{
                    padding: '0.75rem 1.15rem',
                    borderRadius: '1.25rem',
                    backgroundColor: isMe ? '#6366f1' : 'white',
                    color: isMe ? 'white' : '#1e293b',
                    border: isMe ? 'none' : '1px solid var(--color-border)',
                    borderTopRightRadius: isMe ? '0' : '1.25rem',
                    borderTopLeftRadius: isMe ? '1.25rem' : '0',
                    wordBreak: 'break-word',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    boxShadow: isMe ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && (
             <div style={{ display: 'flex', gap: 'var(--space-3)', flexDirection: 'row', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 2px 8px rgba(99,102,241,0.25)' }}>
                  <Robot size={20} weight="fill" />
                </div>
                <div style={{
                    padding: '0.75rem 1.15rem',
                    borderRadius: '1.25rem',
                    backgroundColor: 'white',
                    border: '1px solid var(--color-border)',
                    borderTopLeftRadius: '0',
                    display: 'flex', gap: 4, alignItems: 'center', height: 44
                  }}>
                    <span style={{ width: 6, height: 6, backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ width: 6, height: 6, backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.2s' }} />
                    <span style={{ width: 6, height: 6, backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.4s' }} />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center', backgroundColor: 'white', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '0.8rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--color-primary-light)',
              outline: 'none',
              fontSize: '0.95rem',
              minWidth: 0,
              backgroundColor: '#f8fafc',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = 'var(--color-primary-light)'}
          />
          <Button
            style={{ borderRadius: 'var(--radius-full)', width: '48px', height: '48px', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(99,102,241,0.3)', cursor: 'pointer', transition: 'transform 0.15s' }}
            onClick={handleSend}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <PaperPlaneRight size={20} weight="fill" />
          </Button>
        </div>
      </Card>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </Layout>
  );
};
