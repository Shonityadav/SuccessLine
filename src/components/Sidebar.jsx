import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignOut, X } from '@phosphor-icons/react';
import { mockUsers } from '../mockData';

export const Sidebar = ({ links, role, isOpen, onClose }) => {
  const navigate = useNavigate();
  // Get the first user of the role to show their profile
  const userProfile = role === 'student' ? mockUsers.students[0] : mockUsers.teachers[0];

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div
      className={`glass sidebar${isOpen ? ' open' : ''}`}
      style={{
        width: '280px',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      {/* Brand + mobile close */}
      <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="https://ui-avatars.com/api/?name=SL&background=6366f1&color=fff&rounded=true" alt="Logo" style={{ width: 40, height: 40, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <h2 className="text-xl font-bold text-primary" style={{ letterSpacing: '-0.03em' }}>SuccessLine</h2>
          <p className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{role} Portal</p>
        </div>
        {/* Close button — only visible on mobile (hidden via CSS on desktop) */}
        <button
          onClick={onClose}
          className="hamburger-btn"
          style={{ display: 'flex', background: 'transparent', border: 'none', padding: '4px' }}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
      </div>

      <div style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--color-border)' }}>
        <img src={userProfile.avatar} alt={userProfile.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary-light)', flexShrink: 0 }} />
        <div>
          <p className="font-semibold">{userProfile.name}</p>
          <p className="text-xs text-muted">{role === 'student' ? `${userProfile.grade} Grade` : userProfile.subject}</p>
        </div>
      </div>

      <nav style={{ flex: 1, padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            end={link.path === '/student' || link.path === '/teacher'}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
              fontWeight: isActive ? '600' : '500',
              textDecoration: 'none',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
              minHeight: '48px', // touch-friendly
            })}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            color: 'var(--color-danger)',
            fontWeight: '600',
            textAlign: 'left',
            borderRadius: 'var(--radius-lg)',
            transition: 'background-color 0.2s ease',
            minHeight: '48px',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <SignOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};
