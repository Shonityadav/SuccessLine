import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { List } from '@phosphor-icons/react';

export const Layout = ({ children, sidebarLinks, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-layout">
      {/* Overlay backdrop for mobile */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' active' : ''}`}
        onClick={closeSidebar}
      />

      <Sidebar links={sidebarLinks} role={role} isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main scrollable area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Mobile top bar — shown on mobile via CSS */}
        <div className="mobile-topbar">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <List size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src="https://ui-avatars.com/api/?name=SL&background=6366f1&color=fff&rounded=true"
              alt="Logo"
              style={{ width: 28, height: 28 }}
            />
            <span className="font-bold text-primary" style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>
              SuccessLine
            </span>
          </div>
        </div>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
