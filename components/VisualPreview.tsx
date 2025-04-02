import React, { useEffect } from 'react';

const VisualPreview = () => {
  useEffect(() => {
    console.log("VisualPreview component mounted");
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div
        className="relative max-w-3xl w-full aspect-video overflow-hidden rounded-xl border border-gray-200 shadow-lg quiz-preview-container"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Simplified animation using CSS instead of framer-motion */}
        <div className="quiz-animation-container">
          <div className="quiz-circle quiz-circle-1"></div>
          <div className="quiz-circle quiz-circle-2"></div>
          <div className="quiz-circle quiz-circle-3"></div>
          <div className="quiz-circle quiz-circle-4"></div>
          <div className="quiz-circle quiz-circle-5"></div>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-8 pointer-events-none">
          <div className="text-center">
            <div style={{
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              color: '#1A1A1A'
            }}>
              <span className="text-lg tracking-wide">Tool Discovery Evaluation</span>
            </div>
            <div className="mt-2 text-xs" style={{ color: '#5A5A5A' }}>click to experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualPreview;