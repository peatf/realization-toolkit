import React, { useState, useEffect, useRef } from 'react';
import Section from '../layout/Section';

// Interface for configuration options
interface CircularMenuConfig {
  degPerRotation?: number;
  animationDuration?: number;
  gooeyAnimationDuration?: number;
  accentColor?: string;
  textColor?: string;
  activeTextColor?: string;
  indicatorSize?: number;
}

// Props interface
interface CircularMenuWithGooeyTextProps {
  items: string[];
  customConfig?: CircularMenuConfig;
}

const CircularMenuWithGooeyText: React.FC<CircularMenuWithGooeyTextProps> = ({ 
  items,
  customConfig = {}
}) => {
  // Default configuration with overrides from props
  const config = {
    degPerRotation: 10,
    animationDuration: 600,
    gooeyAnimationDuration: 1.2,
    accentColor: 'var(--color-accent-green)', // Use your color variable
    textColor: 'var(--color-secondary)', // Use secondary color
    activeTextColor: 'var(--color-foreground)', // Use main text color
    indicatorSize: 16,
    ...customConfig
  };

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);
  
  // Refs
  const spinnerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>(Array(items.length).fill(null));
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Set up gooey filter once
  useEffect(() => {
    setupGooeyFilter();
    
    // Set up event listeners for keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (currentIndex < items.length - 1) {
          e.preventDefault();
          navigateToItem(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          e.preventDefault();
          navigateToItem(currentIndex - 1);
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Set initial active item
    updateActiveItem(currentIndex);
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearAllTimeouts();
    };
  }, []);
  
  // Watch for currentIndex changes to update the active item
  useEffect(() => {
    updateActiveItem(currentIndex);
  }, [currentIndex]);
  
  // Clear all timeouts to prevent memory leaks
  const clearAllTimeouts = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  };
  
  // Set up gooey filter
  const setupGooeyFilter = () => {
    if (!document.getElementById('gooey-filter')) {
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('class', 'absolute h-0 w-0');
      svgElement.setAttribute('aria-hidden', 'true');
      
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', 'gooey-filter');
      
      const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      feGaussianBlur.setAttribute('in', 'SourceGraphic');
      feGaussianBlur.setAttribute('stdDeviation', '3');
      feGaussianBlur.setAttribute('result', 'blur');
      
      const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      feColorMatrix.setAttribute('in', 'blur');
      feColorMatrix.setAttribute('type', 'matrix');
      feColorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7');
      
      filter.appendChild(feGaussianBlur);
      filter.appendChild(feColorMatrix);
      defs.appendChild(filter);
      svgElement.appendChild(defs);
      
      document.body.appendChild(svgElement);
    }
  };
  
  // Set a ref for item element
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };
  
  // Update active item visual state
  const updateActiveItem = (index: number) => {
    itemsRef.current.forEach((item, i) => {
      if (item) {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    });
    
    // Update spinner rotation
    rotateSpinner(index);
    
    // Animate the dot
    animateDot();
  };
  
  // Rotate the spinner
  const rotateSpinner = (index: number) => {
    if (spinnerRef.current) {
      const rotation = index * -config.degPerRotation;
      spinnerRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  };
  
  // Animate the dot
  const animateDot = () => {
    if (!dotRef.current) return;
    
    // Remove existing animation class
    dotRef.current.classList.remove('pulse');
    
    // Force reflow to restart animation
    void dotRef.current.offsetWidth;
    
    // Add animation class
    dotRef.current.classList.add('pulse');
  };
  
  // Navigate to a specific item
  const navigateToItem = (index: number) => {
    // Prevent navigation while scrolling
    if (scrolling) {
      return;
    }
    
    // Ensure index is within boundaries
    const boundedIndex = Math.max(0, Math.min(index, items.length - 1));
    
    // Skip if already at this index
    if (boundedIndex === currentIndex) {
      return;
    }
    
    // Store previous index for animation
    setPrevIndex(currentIndex);
    
    // Set scrolling flag
    setScrolling(true);
    
    // Update current index
    setCurrentIndex(boundedIndex);
    
    // Trigger gooey text animation
    setAnimationTrigger(prevTrigger => prevTrigger + 1);
    
    // Clear any existing timeout
    clearAllTimeouts();
    
    // Set new timeout to unlock scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, config.animationDuration);
  };
  
  // Handle wheel events for scrolling navigation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (scrolling) {
      return;
    }
    
    // Determine scroll direction
    const delta = e.deltaY;
    
    if (delta > 0 && currentIndex < items.length - 1) {
      // Scroll down - next item
      navigateToItem(currentIndex + 1);
    } else if (delta < 0 && currentIndex > 0) {
      // Scroll up - previous item
      navigateToItem(currentIndex - 1);
    }
  };
  
  // Handle item click
  const handleItemClick = (index: number) => {
    if (scrolling) return;
    
    if (index >= 0 && index < items.length) {
      navigateToItem(index);
    }
  };
  
  // Apply gooey text effect when changing items
  useEffect(() => {
    // Only run if we have a valid trigger and target element
    if (animationTrigger <= 0 || !itemsRef.current[currentIndex]) {
      return;
    }
    
    const prevText = items[prevIndex] || "";
    const nextText = items[currentIndex] || "";
    const activeItem = itemsRef.current[currentIndex];
    
    if (!activeItem) return;
    
    // Reset item content to prepare for animation
    activeItem.innerHTML = '';
    
    // Create wrapper with filter
    const wrapper = document.createElement('div');
    wrapper.style.filter = 'url(#gooey-filter)';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    activeItem.appendChild(wrapper);
    
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
    
    // Animation variables
    let morph = 1;
    let cooldown = 0;
    let time = new Date();
    const morphTime = config.gooeyAnimationDuration;
    const cooldownTime = 0.25;
    
    // Animation control functions
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
    let animationId: number | null = null;
    
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
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        
        // Reset to simple text (cleanup)
        if (activeItem && activeItem.parentNode) {
          activeItem.innerHTML = nextText;
        }
      }
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Safety cleanup - ensure text is restored
      if (activeItem && activeItem.parentNode) {
        activeItem.innerHTML = nextText;
      }
    };
  }, [animationTrigger, currentIndex, prevIndex, items]);
  
  return (
    <Section fullHeight className="p-0 overflow-hidden">
      <div 
        className="relative w-full h-full overflow-hidden" 
        onWheel={handleWheel}
      >
        {/* Optional: Add subtle section-specific elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
        </div>
        
        {/* Container for curved menu */}
        <div className="absolute w-full h-full overflow-hidden">
          {/* Spinner - rotates to position items */}
          <div 
            ref={spinnerRef} 
            className="absolute top-0 bottom-0 left-0 m-auto h-full transition-all duration-500 ease-in-out"
            style={{ 
              transformOrigin: 'center',
              transform: `rotate(${currentIndex * -config.degPerRotation}deg)`,
              transitionDuration: `${config.animationDuration}ms`
            }}
          >
            {/* Item wrapper */}
            <div className="relative h-full">
              {items.map((text, i) => (
                <div
                  key={`item-${i}`}
                  ref={(el) => setItemRef(el, i)}
                  className={`absolute whitespace-nowrap transition-all duration-300 cursor-pointer text-lg font-sans
                    ${i === currentIndex ? 
                      'active text-2xl font-bold' : 
                      'hover:text-mist-700'}`}
                  style={{
                    top: '50%',
                    left: 0,
                    transform: `rotate(${i * config.degPerRotation}deg) translateX(35vw) translateY(-50%)`,
                    transformOrigin: 'left center',
                    color: i === currentIndex ? config.activeTextColor : config.textColor,
                    filter: i === currentIndex ? 'drop-shadow(0 0 6px rgba(219, 39, 119, 0.5))' : 'none'
                  }}
                  onClick={() => handleItemClick(i)}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicator dot */}
          <div 
            ref={dotRef}
            className="absolute rounded-full top-1/2 left-20 transform -translate-y-1/2 transition-all duration-500 shadow-lg"
            style={{
              backgroundColor: config.accentColor,
              height: `${config.indicatorSize}px`,
              width: `${config.indicatorSize}px`,
              transform: `translateY(calc(-50% + ${currentIndex * 0.5}px))`,
              transitionDuration: `${config.animationDuration}ms`
            }}
          ></div>
        </div>
        
        {/* CSS for animations */}
        <style jsx>{`
          .pulse {
            animation: dotPulse 0.8s ease-out;
          }
          
          @keyframes dotPulse {
            0% { transform: translateY(-50%) scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(138, 190, 255, 0.7); }
            50% { transform: translateY(-50%) scale(1.4); opacity: 0.7; box-shadow: 0 0 0 10px rgba(138, 190, 255, 0); }
            100% { transform: translateY(-50%) scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(138, 190, 255, 0); }
          }
          
          .item {
            transition: all 0.3s ease, filter 0.3s ease, transform 0.5s ease, color 0.3s ease, font-size 0.3s ease;
          }
          
          .item.active {
            z-index: 10;
          }
        `}</style>
      </div>
    </Section>
  );
};

export default CircularMenuWithGooeyText;
