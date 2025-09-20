import React from 'react';

export const TopBar: React.FC<{ title: string; color?: string; favicon?: string }> = ({ title, color = '#333', favicon }) => {
  return (
    <div style={{ background: color, color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      {favicon ? <img src={favicon} alt="favicon" style={{ width: 28, height: 28 }} /> : null}
      <strong>{title}</strong>
    </div>
  );
};


