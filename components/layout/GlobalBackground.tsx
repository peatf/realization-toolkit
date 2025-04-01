import React from 'react';

const GlobalBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full z-[-1]"
      style={{
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        // Or a single color: background: '#0f172a',
      }}
    />
  );
};

export default GlobalBackground;