import React, { useEffect, useState, useRef, memo } from 'react';
import Section from '../layout/Section';

// Use memo to prevent unnecessary re-renders
const QuizSection: React.FC = memo(() => {
  const [iframeHeight, setIframeHeight] = useState(600);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
      <div className="w-full px-4 mx-auto"> {/* Add padding and center alignment */}
        <div className="max-w-4xl mx-auto"> {/* Center content with max width */}
          <iframe
            ref={iframeRef}
            src="https://alignment-cards.vercel.app"
            width="100%"
            height={iframeHeight}
            style={{ border: "none", borderRadius: "8px" }}
            title="Alignment Cards"
          />
        </div>
      </div>
    </Section>
  );
});

QuizSection.displayName = 'QuizSection'; // For React DevTools

export default QuizSection;
