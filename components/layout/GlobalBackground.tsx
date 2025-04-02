import React from 'react';

const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-2]">
      {/* Base background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'var(--color-background)'
        }}
      />
      
      {/* Subtle accent elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-accent-lavender)' }}
        />
        <div 
          className="absolute bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-accent-green)' }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-5 blur-3xl"
          style={{ background: 'var(--color-accent-sand)' }}
        />
      </div>
    </div>
  );
};

export default GlobalBackground;
