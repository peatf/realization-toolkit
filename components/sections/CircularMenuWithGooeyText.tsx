import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CircularMenuWithGooeyTextProps {
  items: string[];
  initialIndex?: number;
  config?: {
    radius?: string;
    invisRadius?: string;
    invisOffset?: string;
    offset?: string;
    cBg?: string;
    cAccent?: string;
    cText?: string;
    itemOpacityDefault?: number;
    snapHeight?: string;
    snapCount?: number;
    degPerRotation?: number;
    gooeyTransitionDuration?: number;
  };
}

// Main component - React-Friendly Gooey Effect
const CircularMenuWithGooeyText: React.FC<CircularMenuWithGooeyTextProps> = ({
  items,
  initialIndex = 0,
  config: customConfig = {}
}) => {
  // Default configuration merged with custom configuration
  const config = {
    radius: '10vw', 
    invisRadius: '50vw', 
    invisOffset: '-50vw', 
    offset: '15vw',
    cBg: 'transparent', // Changed to transparent to work with your gradients
    cAccent: '#8abeff', // Using your sky color
    cText: '#495057', // Using your mist-700 color
    itemOpacityDefault: 0.2,
    snapHeight: '40vh', 
    snapCount: items.length || 8, 
    degPerRotation: 12,
    gooeyTransitionDuration: 300, // ms for CSS transition
    ...customConfig
  };

  // State variables
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevIndex, setPrevIndex] = useState(initialIndex);
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [explainerCollapsed, setExplainerCollapsed] = useState(true);

  // --- State for Gooey Effect ---
  const [gooeyText1, setGooeyText1] = useState(items[initialIndex] || '');
  const [gooeyText2, setGooeyText2] = useState('');
  const [gooeyOpacity1, setGooeyOpacity1] = useState(1);
  const [gooeyOpacity2, setGooeyOpacity2] = useState(0);
  
  // Refs
  const scrollerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const itemWrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const gooeyTextContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gooeyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Helper Function ---
  const getSnapHeightPx = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    const snapHeightStr = config.snapHeight;
    if (snapHeightStr.includes('vh')) {
      const percentage = parseFloat(snapHeightStr) / 100;
      const viewHeight = window.innerHeight || 0;
      return viewHeight * percentage;
    } else { 
      return parseFloat(snapHeightStr); 
    }
  }, [config.snapHeight]);

  // --- Core Functions ---
  const animateDot = useCallback(() => {
    if (!dotRef.current) return;
    dotRef.current.classList.remove('pulse');
    void dotRef.current.offsetWidth; // Force reflow
    dotRef.current.classList.add('pulse');
  }, []);

  const updateSpinnerRotation = useCallback(() => {
    if (!scrollerRef.current) return;
    const scrollTop = scrollerRef.current.scrollTop;
    const height = typeof window !== 'undefined' ? window.innerHeight : 0; 
    if (height <= 0) return;
    
    const snapHeight = getSnapHeightPx(); 
    if (snapHeight <= 0) return;
    
    const index = Math.round((scrollTop - height) / snapHeight);
    const boundedIndex = Math.max(0, Math.min(index, config.snapCount - 1));

    setCurrentIndex((prevCurrentIndex) => {
      if (boundedIndex !== prevCurrentIndex) {
        setPrevIndex(prevCurrentIndex);
        setAnimationTrigger(prev => prev + 1); // Trigger gooey effect
        return boundedIndex;
      }
      return prevCurrentIndex;
    });
  }, [config.snapCount, getSnapHeightPx]);

  const scrollToItem = useCallback((index: number) => {
    if (!scrollerRef.current) return;
    
    // Get latest scrolling state to prevent stale closure issue
    setScrolling(currentScrolling => {
      if (currentScrolling) return true; // Don't proceed if already scrolling
      
      const boundedIndex = Math.max(0, Math.min(index, config.snapCount - 1));
      const snapHeight = getSnapHeightPx();
      const height = typeof window !== 'undefined' ? window.innerHeight : 0;
      
      if (snapHeight <= 0 || height <= 0) return false;
      
      const targetPosition = boundedIndex * snapHeight + height;
      scrollerRef.current?.scrollTo({ top: targetPosition, behavior: 'smooth' });
      
      if (scrollingTimeoutRef.current) clearTimeout(scrollingTimeoutRef.current);
      scrollingTimeoutRef.current = setTimeout(() => {
        setScrolling(false);
        scrollingTimeoutRef.current = null;
      }, 500);
      
      return true; // Set scrolling to true
    });
  }, [config.snapCount, getSnapHeightPx]);

  const handleScroll = useCallback(() => {
    // Use state updater to get fresh state
    setScrolling(isCurrentlyScrolling => {
      if (!isCurrentlyScrolling) {
        updateSpinnerRotation();
      }
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        // Use another state updater to get fresh state after timeout
        setScrolling(isStillScrolling => {
          if (!isStillScrolling) {
            updateSpinnerRotation();
          }
          return isStillScrolling;
        });
      }, 150);
      
      return isCurrentlyScrolling;
    });
  }, [updateSpinnerRotation]);

  // Only use standard TypeScript WheelEvent properties
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement> | WheelEvent) => {
    // Access current states properly with state updater pattern
    setScrolling(isCurrentlyScrolling => {
      if (isCurrentlyScrolling) {
        e.preventDefault();
        return isCurrentlyScrolling;
      }
      
      // Just use deltaY which is standard and well-supported
      const delta = e.deltaY;
      
      setCurrentIndex(currentIdx => {
        if (delta > 0 && currentIdx < config.snapCount - 1) {
          e.preventDefault();
          scrollToItem(currentIdx + 1);
        } else if (delta < 0 && currentIdx > 0) {
          e.preventDefault();
          scrollToItem(currentIdx - 1);
        }
        return currentIdx;
      });
      
      return isCurrentlyScrolling;
    });
  }, [config.snapCount, scrollToItem]);

  const toggleExplainer = useCallback(() => {
    setExplainerCollapsed(prev => !prev);
  }, []);

  const handleItemClick = useCallback((index: number) => {
    scrollToItem(index);
  }, [scrollToItem]);

  // --- Initialization and Event Listeners ---
  useEffect(() => {
    const initTimer = setTimeout(() => {
      if (scrollerRef.current) {
        const viewHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        if (viewHeight > 0) {
          scrollerRef.current.scrollTop = viewHeight;
        }
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Use state updater pattern to avoid stale closures
      setScrolling(isCurrentlyScrolling => {
        if (isCurrentlyScrolling) return isCurrentlyScrolling;
        
        setCurrentIndex(currentIdx => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (currentIdx < config.snapCount - 1) {
              e.preventDefault();
              scrollToItem(currentIdx + 1);
            }
          } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (currentIdx > 0) {
              e.preventDefault();
              scrollToItem(currentIdx - 1);
            }
          }
          return currentIdx;
        });
        
        return isCurrentlyScrolling;
      });
    };

    document.addEventListener('keydown', handleKeyDown);

    // We'll handle wheel events with React's onWheel instead of addEventListener
    // for better TypeScript compatibility

    return () => {
      clearTimeout(initTimer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (scrollingTimeoutRef.current) clearTimeout(scrollingTimeoutRef.current);
      if (gooeyTimeoutRef.current) clearTimeout(gooeyTimeoutRef.current);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [config.snapCount, handleWheel, scrollToItem]);

  // --- Rotation based on currentIndex ---
  useEffect(() => {
    if (spinnerRef.current) {
      const rotation = currentIndex * -config.degPerRotation;
      spinnerRef.current.style.transform = `translateY(-50%) rotate(${rotation}deg)`;
    }
    animateDot();
  }, [currentIndex, config.degPerRotation, animateDot]);

  // --- Gooey Text Effect (React State + CSS Transition) ---
  useEffect(() => {
    if (animationTrigger === 0) return;
    
    // Only run the effect if indices are different
    if (currentIndex !== prevIndex) {
      // Set texts and opacities for the cross-fade
      setGooeyText1(items[prevIndex] || '');
      setGooeyText2(items[currentIndex] || '');
      setGooeyOpacity1(0);
      setGooeyOpacity2(1);

      // Clear any existing timeout
      if (gooeyTimeoutRef.current) {
        clearTimeout(gooeyTimeoutRef.current);
      }

      // After transition completes, reset to a single visible text
      gooeyTimeoutRef.current = setTimeout(() => {
        setGooeyText1(items[currentIndex] || '');
        setGooeyOpacity1(1);
        setGooeyText2('');
        setGooeyOpacity2(0);
        gooeyTimeoutRef.current = null;
      }, config.gooeyTransitionDuration + 50); // Adding a small buffer
    }

    return () => {
      if (gooeyTimeoutRef.current) {
        clearTimeout(gooeyTimeoutRef.current);
      }
    };
  }, [animationTrigger, currentIndex, prevIndex, items, config.gooeyTransitionDuration]);

  // --- SVG Filter Definition for Gooey Effect ---
  const svgFilter = `
    <svg style="position: absolute; width: 0; height: 0;">
      <defs>
        <filter id="gooey-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        </filter>
      </defs>
    </svg>
  `;

  // --- Styles ---
  const styles = {
    root: {
      '--radius': config.radius,
      '--invis-radius': config.invisRadius,
      '--invis-offset': config.invisOffset,
      '--offset': config.offset,
      '--c-bg': config.cBg,
      '--c-accent': config.cAccent,
      '--c-text': config.cText,
      '--item-opacity-default': config.itemOpacityDefault,
      '--snap-height': config.snapHeight,
      '--snap-count': config.snapCount,
      height: '100vh',
      margin: 0,
      padding: 0,
      background: 'var(--c-bg)',
      overflow: 'hidden',
      minWidth: '320px',
      fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: 'var(--c-text)',
      position: 'relative',
    } as React.CSSProperties,
    scroller: {
      scrollSnapType: 'y mandatory',
      scrollSnapStop: 'always',
      height: '100vh',
      overflowY: 'scroll',
      position: 'relative',
      zIndex: 1,
      scrollbarWidth: 'none',
    } as React.CSSProperties,
    buffer: {
      height: '100vh',
      scrollSnapAlign: 'start'
    },
    snap: {
      height: 'var(--snap-height)',
      scrollSnapAlign: 'end'
    },
    spinnerWrap: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 2,
    },
    spinner: {
      position: 'absolute',
      top: '50%',
      left: 'var(--invis-offset)',
      width: 'calc(var(--invis-radius) * 2)',
      height: 'calc(var(--invis-radius) * 2)',
      transform: 'translateY(-50%)',
      transformOrigin: '50% 50%',
      transition: 'transform 0.3s ease',
    },
    dot: {
      position: 'absolute',
      top: '50%',
      left: 'calc(50vw - var(--invis-radius) + 3.5vw)',
      transform: 'translateY(-50%)',
      width: '3vw',
      height: '3vw',
      maxWidth: '20px',
      maxHeight: '20px',
      borderRadius: '50%',
      backgroundColor: 'var(--c-accent)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      zIndex: 3,
    },
    itemWrap: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1px',
      height: '1px',
    },
    item: {
      position: 'absolute',
      left: '0',
      top: '0',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 'min(7vw, 96px)',
      whiteSpace: 'nowrap',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      transformOrigin: '0 50%',
      opacity: 'var(--item-opacity-default)',
      cursor: 'pointer',
      pointerEvents: 'auto',
      transition: 'opacity 0.3s ease',
      color: 'var(--c-text)',
      padding: '0 10px',
    },
    activeItem: {
      opacity: 1
    },
    gooeyTextContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80vw',
      height: 'auto',
      minHeight: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 4,
      pointerEvents: 'none',
      fontSize: 'min(5vw, 60px)',
      letterSpacing: '-0.02em',
      textAlign: 'center',
      color: 'var(--c-text)',
      fontWeight: 200,
    },
    gooeyTextWrapper: {
      filter: 'url(#gooey-filter)',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gooeySpanBase: {
      position: 'absolute',
      textAlign: 'center',
      fontWeight: 200,
      transition: `opacity ${config.gooeyTransitionDuration}ms ease-in-out`,
    },
    explainer: {
      position: 'absolute',
      right: '16px',
      top: '16px',
      backgroundColor: explainerCollapsed ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
      width: '300px',
      maxWidth: 'calc(100vw - 60px)',
      padding: '24px',
      paddingRight: '40px',
      zIndex: 10,
      fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      boxShadow: explainerCollapsed ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
      transition: 'background-color 0.3s ease',
    },
    explainerToggle: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      appearance: 'none',
      width: '30px',
      height: '30px',
      cursor: 'pointer',
      zIndex: 11,
      border: 'none',
      background: 'transparent',
    } as React.CSSProperties,
    explainerIcon: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      color: '#333',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    explainerText: {
      fontSize: '12px',
      lineHeight: '18px',
      margin: '0 0 1em 0',
      display: explainerCollapsed ? 'none' : 'block',
      color: '#495057',
    },
  };

  // --- Render ---
  return (
    <div style={styles.root}>
      {/* Inline SVG filter definition instead of DOM manipulation */}
      <div dangerouslySetInnerHTML={{ __html: svgFilter }} />
      
      <div ref={scrollerRef} style={styles.scroller} onScroll={handleScroll}>
        <div style={styles.buffer}></div>
        {Array.from({ length: config.snapCount }).map((_, i) => (
          <div key={`snap-${i}`} style={styles.snap}></div>
        ))}
      </div>
      
      <div style={styles.spinnerWrap}>
        <div ref={spinnerRef} style={styles.spinner}>
          <div ref={itemWrapRef} style={styles.itemWrap}>
            {items.slice(0, config.snapCount).map((text, i) => (
              <div
                key={`item-${i}`}
                className={`item ${i === currentIndex ? 'active' : ''}`}
                data-index={i}
                style={{
                  ...styles.item,
                  ...(i === currentIndex ? styles.activeItem : {}),
                  transform: `rotate(${i * config.degPerRotation}deg) translateX(var(--invis-radius))`,
                  opacity: 0, // Invisible items (replaced by gooey text)
                  pointerEvents: 'none',
                }}
                onClick={() => handleItemClick(i)}
              ></div>
            ))}
          </div>
        </div>
        
        <div ref={gooeyTextContainerRef} style={styles.gooeyTextContainer}>
          <div style={styles.gooeyTextWrapper}>
            <span style={{ ...styles.gooeySpanBase, opacity: gooeyOpacity1 }}>
              {gooeyText1}
            </span>
            <span style={{ ...styles.gooeySpanBase, opacity: gooeyOpacity2 }}>
              {gooeyText2}
            </span>
          </div>
        </div>
        
        <div
          ref={dotRef}
          className={`dot ${currentIndex !== null ? 'pulse' : ''}`}
          style={styles.dot}
        ></div>
      </div>
      
      {/* Simplified explainer for integration */}
      <div style={styles.explainer}>
        <input
          type="checkbox"
          id="explainer-toggle-checkbox"
          checked={!explainerCollapsed}
          onChange={toggleExplainer}
          style={styles.explainerToggle}
          aria-label="Toggle explanation"
        />
        <div style={styles.explainerIcon} aria-hidden="true">
          {explainerCollapsed ? 'i' : '×'}
        </div>
        <div style={{ display: explainerCollapsed ? 'none' : 'block' }}>
          <p style={styles.explainerText}>
            Scroll or use Arrow keys to navigate between prompts.
          </p>
          <p style={styles.explainerText}>
            Select a prompt to begin creating.
          </p>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        body { overscroll-behavior: none; }
        .scroller::-webkit-scrollbar { display: none; }
        .dot.pulse { animation: dotPulse 0.5s ease-out; }
        @keyframes dotPulse {
          0% { transform: scale(1) translateY(-50%); opacity: 1; }
          50% { transform: scale(0.2) translateY(-50%); opacity: 0; }
          100% { transform: scale(1) translateY(-50%); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CircularMenuWithGooeyText;
