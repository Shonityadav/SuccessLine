import React from 'react';

export const Card = ({ children, className = '', title, style = {} }) => {
  return (
    <div
      className={`bg-surface shadow-sm rounded-lg ${className}`}
      style={{ border: '1px solid var(--color-border)', ...style }}
    >
      {title && (
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      )}
      <div style={{ padding: 'var(--space-4)' }}>
        {children}
      </div>
    </div>
  );
};
