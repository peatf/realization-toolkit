import React, { useEffect } from 'react';

const QuizSection: React.FC = () => {
  useEffect(() => {
    const minHeight = 600;
    const maxHeight = 2400; // Maximum allowed height
    let lastHeight = minHeight;
    let lastUpdateTime = 0;
    const updateThrottle = 500; // Minimum ms between updates

    function resizeIframe(height: number) {
      const now = Date.now();
      // Throttle updates
      if (now - lastUpdateTime < updateThrottle) return;
      const wrapper = document.querySelector('.iframe-wrapper') as HTMLElement;
      if (!wrapper) return;
      // Clamp height between min and max
      const newHeight = Math.min(maxHeight, Math.max(minHeight, height));
      // Only update if change is significant
      if (Math.abs(lastHeight - newHeight) > 5) {
        wrapper.style.height = `${newHeight}px`;
        lastHeight = newHeight;
        lastUpdateTime = now;
      }
    }

    const messageHandler = (event: MessageEvent) => {
      // Ensure the message comes from the correct origin
      if (event.origin !== "https://alignment-cards.vercel.app") return;
      if (event.data && typeof event.data.height === 'number') {
        resizeIframe(event.data.height);
      }
    };

    window.addEventListener("message", messageHandler);

    // Initial setup: set the iframe wrapper's height
    const wrapper = document.querySelector('.iframe-wrapper') as HTMLElement;
    if (wrapper) {
      wrapper.style.height = `${minHeight}px`;
    }

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <div id="quiz-section">
      <div className="iframe-wrapper">
        <iframe
          src="https://alignment-cards.vercel.app"
          title="Alignment Cards"
          id="alignmentIframe"
          allow="fullscreen"
          scrolling="no"
        ></iframe>
      </div>
      <style jsx>{`
        .iframe-wrapper {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 15px;
          overflow: hidden;
          min-height: 600px;
          transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: height;
        }
        #alignmentIframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          border-radius: 15px; /* Add border radius to iframe itself */
        }
        @media (max-width: 768px) {
          .iframe-wrapper {
            min-height: 720px; /* Increased mobile height */
          }
        }
      `}</style>
    </div>
  );
};

export default QuizSection;
