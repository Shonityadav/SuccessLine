import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-2) var(--space-4)',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'white',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-text)',
    },
    danger: {
      backgroundColor: 'var(--color-danger)',
      color: 'white',
    }
  };

  return (
    <button
      style={{ ...baseStyle, ...variants[variant] }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
