import React, { useEffect, useState, useRef, memo } from 'react';
import Section from '../layout/Section';

// Use memo to prevent unnecessary re-renders
const QuizSection: React.FC = memo(() => {
  const [iframeHeight, setIframeHeight] = useState(600);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastUpdateTimeRef = useRef(0);
  
  useEffect(() => {
    const minHeight = 600;
    const maxHeight = 1800; 
    let lastHeight = minHeight;
    const updateThrottle = 500;
    
    // More efficient resize logic with useRef
    const throttledResize = (height: number) => {
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < updateThrottle) return;
      
      const newHeight = Math.min(maxHeight, Math.max(minHeight, height));
      if (Math.abs(lastHeight - newHeight) > 5) {
        setIframeHeight(newHeight);
        lastHeight = newHeight;
        lastUpdateTimeRef.current = now;
      }
    };
    
    // Optimized event handler with origin check first
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== "https://alignment-cards.vercel.app") return;
      
      // Only access data if origin is verified
      const height = event.data?.height;
      if (height) throttledResize(height);
    };
    
    window.addEventListener("message", messageHandler);
    
    // Cleanup function
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);
  
  return (
    <Section id="quiz-section">
      <div 
        ref={wrapperRef}
        className="iframe-wrapper"
        style={{ 
          height: `${iframeHeight}px`,
          position: 'relative',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          borderRadius: '15px',
          overflow: 'hidden',
          minHeight: '600px',
          transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'height'
        }}
      >
        <iframe
          src="https://alignment-cards.vercel.app"
          title="Alignment Cards"
          id="alignmentIframe"
          allow="fullscreen"
          scrolling="no"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            borderRadius: '15px'
          }}
          loading="lazy" // Add lazy loading for iframe
        />
      </div>
    </Section>
  );
});

QuizSection.displayName = 'QuizSection'; // For React DevTools

export default QuizSection;
