
import React, { useState, useEffect, useRef } from 'react';

// Interface for configuration
interface CircularMenuConfig {
  radius: string;
  invisRadius: string;
  invisOffset: string;
  offset: string;
  cBg: string;
  cAccent: string;
  cText: string;
  itemOpacityDefault: number;
  snapHeight: string;
  snapCount: number;
  degPerRotation: number;
}

// Props interface
interface CircularMenuWithGooeyTextProps {
  items?: string[];
  customConfig?: Partial<CircularMenuConfig>;
}

// Main component integrating the circular menu with GooeyText
const CircularMenuWithGooeyText: React.FC<CircularMenuWithGooeyTextProps> = ({ 
  items: propItems,
  customConfig = {}
}) => {
  // Default configuration values from CSS variables
  const [config, setConfig] = useState<CircularMenuConfig>({
    radius: '10vw',
    invisRadius: '50vw',
    invisOffset: '-50vw',
    offset: '15vw',
    cBg: '#F4F3F0',
    cAccent: '#FF5E2B',
    cText: '#222',
    itemOpacityDefault: 0.2,
    snapHeight: '40vh',
    snapCount: 8,
    degPerRotation: 12,
    ...customConfig // Override defaults with any custom config
  });

  // Item texts - use provided items or defaults
  const items = propItems || [
    "Make a song to be happy.",
    "Make a song for a workout.",
    "Make a song for a farewell.",
    "Make a song for my friend Earl.",
    "Make a song about the moon.",
    "Make a song about mum's cooking.",
    "Make a song for lunch.",
    "Make a song for a road trip.",
  ];

  // Limit items to config.snapCount
  const limitedItems = items.slice(0, config.snapCount);

  // State for the current active item index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for the previous active item index
  const [prevIndex, setPrevIndex] = useState(0);
  // State to trigger gooey animation
  const [animationTrigger, setAnimationTrigger] = useState(0);
  // State for scrolling
  const [scrolling, setScrolling] = useState(false);
  // State for explainer collapsed
  const [explainerCollapsed, setExplainerCollapsed] = useState(true);

  // Refs
  const scrollerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const itemWrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize
  useEffect(() => {
    // Set initial scroll position
    if (scrollerRef.current) {
      setTimeout(() => {
        if (scrollerRef.current) {
          scrollerRef.current.scrollTop = window.innerHeight;
          updateSpinnerRotation();
        }
      }, 100);
    }

    // Set up event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (currentIndex < config.snapCount - 1) {
          e.preventDefault();
          scrollToItem(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToItem(currentIndex - 1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentIndex, scrolling, config.snapCount]);

  // Calculate snap height in pixels
  const getSnapHeightPx = (): number => {
    const snapHeightStr = config.snapHeight;
    if (snapHeightStr.includes('vh')) {
      const percentage = parseFloat(snapHeightStr) / 100;
      return window.innerHeight * percentage;
    } else {
      return parseFloat(snapHeightStr);
    }
  };

  // Update spinner rotation based on scroll position
  const updateSpinnerRotation = (): void => {
    if (scrolling || !scrollerRef.current) return;
    
    // Get current scroll position
    const scrollTop = scrollerRef.current.scrollTop;
    const height = window.innerHeight;
    
    // Calculate which snap point we're at
    const snapHeight = getSnapHeightPx();
    
    // Calculate the current index based on scroll position
    const index = Math.round((scrollTop - height) / snapHeight);
    
    // Ensure index is within boundaries
    const boundedIndex = Math.max(0, Math.min(index, config.snapCount - 1));
    
    // Only update if index changed
    if (boundedIndex !== currentIndex) {
      // Store previous index for animation
      setPrevIndex(currentIndex);
      
      // Update active item
      updateActiveItem(boundedIndex);
      
      // Update spinner rotation
      const rotation = boundedIndex * -config.degPerRotation;
      if (spinnerRef.current) {
        spinnerRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      
      // Animate the dot
      animateDot();
      
      // Update current index
      setCurrentIndex(boundedIndex);
      
      // Trigger gooey text animation
      setAnimationTrigger(prev => prev + 1);
    }
  };

  // Update which item is active
  const updateActiveItem = (index: number): void => {
    // Find all item elements
    const itemElements = document.querySelectorAll('.item');
    
    // Store reference to the active item for gooey effect
    if (itemElements[index]) {
      activeItemRef.current = itemElements[index] as HTMLElement;
    }
    
    // Remove active class from all items
    for (let i = 0; i < itemElements.length; i++) {
      itemElements[i].classList.remove('active');
    }
    
    // Add active class to current item
    if (itemElements[index]) {
      itemElements[index].classList.add('active');
    }
  };

  // Animate the dot when changing items
  const animateDot = (): void => {
    if (!dotRef.current) return;
    
    // Remove existing animation
    dotRef.current.classList.remove('pulse');
    
    // Force reflow to restart animation
    void dotRef.current.offsetWidth;
    
    // Add animation class
    dotRef.current.classList.add('pulse');
  };

  // Scroll to a specific item
  const scrollToItem = (index: number): void => {
    if (scrolling || !scrollerRef.current) return;
    
    // Ensure index is within boundaries
    const boundedIndex = Math.max(0, Math.min(index, config.snapCount - 1));
    
    // Skip if already at this index
    if (boundedIndex === currentIndex) return;
    
    // Store previous index for animation
    setPrevIndex(currentIndex);
    
    // Set scrolling flag
    setScrolling(true);
    
    // Calculate target position
    const snapHeight = getSnapHeightPx();
    const targetPosition = boundedIndex * snapHeight + window.innerHeight;
    
    // Scroll to the target
    scrollerRef.current.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update active item immediately for better UX
    updateActiveItem(boundedIndex);
    
    // Update rotation
    const rotation = boundedIndex * -config.degPerRotation;
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotate(${rotation}deg)`;
    }
    
    // Animate the dot
    animateDot();
    
    // Update current index
    setCurrentIndex(boundedIndex);
    
    // Trigger gooey text animation
    setAnimationTrigger(prev => prev + 1);
    
    // Clear scrolling flag after animation completes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 500);
  };

  // Handle scroll events
  const handleScroll = (): void => {
    // Only update during natural scrolling (not programmatic)
    if (!scrolling) {
      updateSpinnerRotation();
    }
    
    // Debounce scroll end detection
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 150);
  };

  // Handle wheel events for better control
  const handleWheel = (e: React.WheelEvent): void => {
    // Don't intercept if already scrolling
    if (scrolling) {
      e.preventDefault();
      return;
    }
    
    // Determine scroll direction
    const delta = e.deltaY;
    
    if (delta > 0 && currentIndex < config.snapCount - 1) {
      // Scroll down - next item
      e.preventDefault();
      scrollToItem(currentIndex + 1);
    } else if (delta < 0 && currentIndex > 0) {
      // Scroll up - previous item
      e.preventDefault();
      scrollToItem(currentIndex - 1);
    }
  };

  // Handle item click
  const handleItemClick = (index: number): void => {
    // Only navigate if it's within the valid range
    if (index >= 0 && index < config.snapCount) {
      scrollToItem(index);
    }
  };

  // Toggle explainer visibility
  const toggleExplainer = (): void => {
    setExplainerCollapsed(!explainerCollapsed);
  };

  // CSS styles for components
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
    '--snap-count': config.snapCount
  } as React.CSSProperties,
  body: {
    height: '100vh',
    margin: 0,
    padding: 0,
    background: 'var(--c-bg)',
    overflow: 'hidden',
    minWidth: '320px'
  } as React.CSSProperties,
  scroller: {
    scrollSnapType: 'y mandatory',
    height: '100vh',
    overflowY: 'scroll',
    position: 'relative',
    zIndex: 1,
    scrollbarWidth: 'none'
  } as React.CSSProperties,
  buffer: {
    height: '100vh',
    scrollSnapAlign: 'start'
  } as React.CSSProperties,
  snap: {
    height: 'var(--snap-height)',
    scrollSnapAlign: 'end'
  } as React.CSSProperties,
  spinnerWrap: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none'
  } as React.CSSProperties,
  spinner: {
    position: 'absolute',
    top: '-9999px',
    bottom: '-9999px',
    left: 'var(--invis-offset)',
    width: 'calc(var(--radius) * 2)',
    height: 'calc(var(--radius) * 2)',
    margin: 'auto',
    transformOrigin: '50% 50%'
  } as React.CSSProperties,
  dot: {
    position: 'absolute',
    top: 0,
    left: 'calc(50vw - var(--invis-radius) + 3.5vw)',
    bottom: 0,
    margin: 'auto',
    width: '3vw',
    height: '3vw',
    borderRadius: '50%',
    backgroundColor: 'var(--c-accent)',
    transition: 'transform 0.3s ease, opacity 0.3s ease'
  } as React.CSSProperties,
  itemWrap: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    top: 0,
    margin: 'auto'
  } as React.CSSProperties,
  item: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'min(7vw, 96px)',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.02em',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    transformOrigin: '0 50%',
    opacity: 'var(--item-opacity-default)',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  } as React.CSSProperties,
  activeItem: {
    opacity: 1
  } as React.CSSProperties,
  explainer: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    backgroundColor: explainerCollapsed ? 'transparent' : '#fff',
    width: '300px',
    padding: '24px',
    paddingRight: '40px',
    zIndex: 2,
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
  } as React.CSSProperties,
  explainerToggle: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    appearance: 'none',
    width: '30px',
    height: '30px'
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
    height: '30px'
  } as React.CSSProperties,
  explainerText: {
    fontSize: '12px',
    lineHeight: '18px',
    margin: 0,
    display: explainerCollapsed ? 'none' : 'block'
  } as React.CSSProperties,
  gooeyTextContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
    width: '80vw',
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none'
  } as React.CSSProperties
};
  // Use the gooey text effect hook
  useEffect(() => {
    // Find the currently active item
    const activeItem = document.querySelector('.item.active');
    if (activeItem) {
      activeItemRef.current = activeItem as HTMLElement;
      
      // Apply gooey effect only when changing items
      if (animationTrigger > 0) {
        // Get the text content
        const prevText = limitedItems[prevIndex] || "";
        const nextText = limitedItems[currentIndex] || "";
        
        // Create our text elements for the morphing effect
        const parentElement = activeItem as HTMLElement;
        
        // Clear any existing content
        const originalHTML = parentElement.innerHTML;
        parentElement.innerHTML = '';
        
        // Create filter if it doesn't exist
        let filterElement = document.getElementById('gooey-filter');
        if (!filterElement) {
          const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svgElement.setAttribute('class', 'absolute h-0 w-0');
          svgElement.setAttribute('aria-hidden', 'true');
          svgElement.setAttribute('focusable', 'false');
          
          const defsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          
          const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
          filter.setAttribute('id', 'gooey-filter');
          
          const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
          feColorMatrix.setAttribute('in', 'SourceGraphic');
          feColorMatrix.setAttribute('type', 'matrix');
          feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140');
          
          filter.appendChild(feColorMatrix);
          defsElement.appendChild(filter);
          svgElement.appendChild(defsElement);
          
          document.body.appendChild(svgElement);
          filterElement = document.getElementById('gooey-filter');
        }
        
        // Create wrapper with filter
        const wrapper = document.createElement('div');
        wrapper.style.filter = 'url(#gooey-filter)';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        parentElement.appendChild(wrapper);
        
        // Create the two text elements for morphing
        const text1 = document.createElement('span');
        text1.style.position = 'absolute';
        text1.style.opacity = '0';
        text1.textContent = prevText;
        
        const text2 = document.createElement('span');
        text2.style.opacity = '100%';
        text2.textContent = nextText;
        
        wrapper.appendChild(text1);
        wrapper.appendChild(text2);
        
        // Morph animation variables
        let morph = 1;
        let cooldown = 0;
        let time = new Date();
        const morphTime = 1;
        const cooldownTime = 0.25;
        
        const setMorph = (fraction: number) => {
          text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
          
          fraction = 1 - fraction;
          text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        };
        
        const doMorph = () => {
          morph -= cooldown;
          cooldown = 0;
          let fraction = morph / morphTime;
          if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
          }
          setMorph(fraction);
        };
        
        const doCooldown = () => {
          morph = 0;
          text2.style.filter = "";
          text2.style.opacity = "100%";
          text1.style.filter = "";
          text1.style.opacity = "0%";
        };
        
        // Animation loop
        let animationId: number;
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          const newTime = new Date();
          const dt = (newTime.getTime() - time.getTime()) / 1000;
          time = newTime;
          cooldown -= dt;
          
          if (cooldown <= 0) {
            doMorph();
          } else {
            doCooldown();
          }
          
          // End animation if complete
          if (morph <= 0 && cooldown >= cooldownTime - 0.01) {
            cancelAnimationFrame(animationId);
            // Reset the original content
            parentElement.innerHTML = nextText;
          }
        };
        
        // Start animation
        animationId = requestAnimationFrame(animate);
        
        // Clean up after animation is done
        setTimeout(() => {
          cancelAnimationFrame(animationId);
          // Reset the content
          if (parentElement && parentElement.innerHTML !== nextText) {
            parentElement.innerHTML = nextText;
          }
        }, (morphTime + cooldownTime) * 1000 + 100);
      }
    }
  }, [currentIndex, prevIndex, animationTrigger, limitedItems]);

  return (
    <div style={{ ...styles.root, ...styles.body }}>
      <div 
        ref={scrollerRef} 
        style={styles.scroller} 
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="scroller"
      >
        {/* First item is the full view height */}
        <div style={styles.buffer}></div>
        
        {/* Each .snap element is the scroll for a carousel item */}
        {Array.from({ length: config.snapCount }).map((_, i) => (
          <div key={`snap-${i}`} style={styles.snap}></div>
        ))}
        
        {/* Overflow wrapper */}
        <div style={styles.spinnerWrap}>
          <div ref={spinnerRef} style={styles.spinner}>
            <div ref={itemWrapRef} style={styles.itemWrap}>
              {limitedItems.map((text, i) => (
                <div 
                  key={`item-${i}`}
                  className={`item ${i === 0 ? 'active' : ''}`}
                  data-index={i}
                  style={{
                    ...styles.item,
                    ...(i === currentIndex ? styles.activeItem : {}),
                    transform: `rotate(${i * config.degPerRotation - 60}deg) translateX(var(--invis-radius))`
                  }}
                  onClick={() => handleItemClick(i)}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div 
            ref={dotRef}
            className={`dot ${currentIndex !== null ? 'pulse' : ''}`}
            style={styles.dot}
          ></div>
        </div>
      </div>

      {/* Explainer section */}
      <div style={styles.explainer}>
        <input 
          type="checkbox" 
          checked={explainerCollapsed}
          onChange={toggleExplainer}
          style={styles.explainerToggle}
        />
        <div style={styles.explainerIcon}>
          {explainerCollapsed ? 'i' : '×'}
        </div>
        <p style={styles.explainerText}>
          Enhanced scroll carousel with gooey text morphing animation.
          Use arrow keys or scroll to navigate between items.
        </p>
        <p style={styles.explainerText}>
          Scroll to navigate between prompts, or click on any item to select it.
        </p>
        <p style={styles.explainerText}>
          The active text morphs with a gooey animation when changed.
        </p>
      </div>

      {/* CSS for animations */}
      <style>{`
        .dot.pulse {
          animation: dotPulse 0.5s ease-out;
        }
        
        @keyframes dotPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CircularMenuWithGooeyText;
