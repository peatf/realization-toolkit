import React, { useState, useEffect, useRef } from 'react';
import Section from '../layout/Section';

// Updated interface for menu items with links
interface MenuItem {
  text: string;
  target: string;
}

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

// Updated Props interface to support menu items with links
interface CircularMenuWithGooeyTextProps {
  items: MenuItem[];
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
    accentColor: 'var(--color-accent-green)',
    textColor: 'var(--color-secondary)',
    activeTextColor: 'var(--color-foreground)',
    indicatorSize: 16,
    ...customConfig
  };

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isMenuFocused, setIsMenuFocused] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const touchThreshold = 50; // Minimum pixel distance for a swipe
  
  // Refs
  const spinnerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>(Array(items.length).fill(null));
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const interactiveAreaRef = useRef<HTMLDivElement>(null);
  
  // Set up gooey filter once (optimized version)
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
      } else if (e.key === 'Enter' || e.key === ' ') {
        // Navigate to the target section when Enter or Space is pressed
        if (items[currentIndex] && items[currentIndex].target) {
          handleNavigateToTarget(items[currentIndex].target);
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);
  
  // Add this useEffect to set up passive touch events for better performance
  useEffect(() => {
    // Make sure we're using the correct reference for event listeners
    const interactiveArea = interactiveAreaRef.current;
    if (!interactiveArea) return;
    
    // Setup touch events
    const setupPassiveListeners = () => {
      // Remove existing listeners
      interactiveArea.removeEventListener('touchstart', handleTouchStartPassive);
      interactiveArea.removeEventListener('touchmove', handleTouchMovePassive);
      interactiveArea.removeEventListener('touchend', handleTouchEndPassive);
      
      // Add optimized listeners with appropriate passive settings
      interactiveArea.addEventListener('touchstart', handleTouchStartPassive, { passive: true });
      interactiveArea.addEventListener('touchmove', handleTouchMovePassive, { passive: false });
      interactiveArea.addEventListener('touchend', handleTouchEndPassive, { passive: true });
    };
    
    setupPassiveListeners();
    
    return () => {
      interactiveArea.removeEventListener('touchstart', handleTouchStartPassive);
      interactiveArea.removeEventListener('touchmove', handleTouchMovePassive);
      interactiveArea.removeEventListener('touchend', handleTouchEndPassive);
    };
  }, [interactiveAreaRef.current]);

  // Define the passive handlers
  const handleTouchStartPassive = (e: TouchEvent) => {
    if (!e.touches[0]) return;
    
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    
    // Get the interactive area element
    const interactiveArea = interactiveAreaRef.current;
    if (!interactiveArea) return;
    
    // Get the bounding rectangle
    const rect = interactiveArea.getBoundingClientRect();
    
    // Calculate the center of the interactive area
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from touch to center
    const distanceX = touch.clientX - centerX;
    const distanceY = touch.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Check if the touch is within the menu circle (using half the width as radius)
    const isWithinCircle = distance < (rect.width / 2);
    
    setIsMenuFocused(isWithinCircle);
  };

  const handleTouchMovePassive = (e: TouchEvent) => {
    if (!isMenuFocused || scrolling) return;
    
    const currentY = e.touches[0].clientY;
    const delta = touchStartY - currentY;
    setTouchDelta(delta);
    
    // Only prevent default for significant vertical movement within the menu
    if (Math.abs(delta) > 10 && isMenuFocused) {
      e.preventDefault();
    }
  };

  const handleTouchEndPassive = () => {
    if (isMenuFocused && !scrolling) {
      if (touchDelta > touchThreshold && currentIndex < items.length - 1) {
        navigateToItem(currentIndex + 1);
      } else if (touchDelta < -touchThreshold && currentIndex > 0) {
        navigateToItem(currentIndex - 1);
      } else if (Math.abs(touchDelta) < 10) {
        // Treat as a tap if there's minimal movement
        if (items[currentIndex] && items[currentIndex].target) {
          handleNavigateToTarget(items[currentIndex].target);
        }
      }
    }
    
    setTouchDelta(0);
    setTimeout(() => setIsMenuFocused(false), 500);
  };

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
  
  // Set up gooey filter - original version
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
  
  // Function to handle navigation to target sections
  const handleNavigateToTarget = (target: string) => {
    if (!target) return;
    
    const targetElement = document.getElementById(target);
    if (targetElement) {
      // Smooth scroll to the target element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Replace the current wheel event handler with a more universal solution
  useEffect(() => {
    // Function to check if target element is part of our menu
    const isElementInMenu = (element: Element | null): boolean => {
      if (!element) return false;
      
      // Check if it's one of our menu items
      const isMenuItem = itemsRef.current.some(item => item && item.contains(element));
      
      // Check if it's the dot
      const isDot = dotRef.current && dotRef.current.contains(element);
      
      // Check if it's the interactive area itself
      const isArea = interactiveAreaRef.current && interactiveAreaRef.current.contains(element);
      
      return isMenuItem || isDot || isArea;
    };

    // Wheel event handler - simplified to reduce browser compatibility issues
    const handleWheel = (e: WheelEvent) => {
      // Check if the wheel event started on any of our menu elements
      if (isElementInMenu(e.target as Element)) {
        // For menu interaction, try to prevent default behavior
        try {
          e.preventDefault();
        } catch (err) {
          // Some browsers won't allow this - we'll handle navigation anyway
        }
        
        if (scrolling) return;
        
        // Simple navigation based on wheel direction
        if (e.deltaY > 0 && currentIndex < items.length - 1) {
          navigateToItem(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          navigateToItem(currentIndex - 1);
        }
      }
      // Otherwise let the browser handle normal scrolling
    };

    // Use the capture phase to get events before they reach other handlers
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [currentIndex, items.length, scrolling]);

  // Add these functions to track when the user is interacting with the menu
  const handleMenuEnter = () => {
    setIsMenuFocused(true);
  };

  const handleMenuLeave = () => {
    setIsMenuFocused(false);
  };

  // Handle item click
  const handleItemClick = (index: number) => {
    if (scrolling) return;
    
    if (index >= 0 && index < items.length) {
      navigateToItem(index);
      
      // Navigate to the target section after the animation
      const targetTimeout = setTimeout(() => {
        if (items[index] && items[index].target) {
          handleNavigateToTarget(items[index].target);
        }
      }, config.animationDuration);
      
      // Make sure this timeout gets cleared if needed
      return () => clearTimeout(targetTimeout);
    }
  };
  
  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    
    // Get the interactive area element
    const interactiveArea = interactiveAreaRef.current;
    if (!interactiveArea) return;
    
    // Get the bounding rectangle
    const rect = interactiveArea.getBoundingClientRect();
    
    // Calculate the center of the interactive area
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from touch to center
    const distanceX = touch.clientX - centerX;
    const distanceY = touch.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Check if the touch is within the menu circle (using half the width as radius)
    const isWithinCircle = distance < (rect.width / 2);
    
    setIsMenuFocused(isWithinCircle);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMenuFocused || scrolling) return;
    
    // Only prevent default if we're interacting with the menu
    e.preventDefault();
    e.stopPropagation();
    
    const currentY = e.touches[0].clientY;
    const delta = touchStartY - currentY;
    setTouchDelta(delta);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMenuFocused && !scrolling) {
      // Check if the swipe is significant enough to change the menu item
      if (touchDelta > touchThreshold && currentIndex < items.length - 1) {
        // Swipe up - next item
        navigateToItem(currentIndex + 1);
      } else if (touchDelta < -touchThreshold && currentIndex > 0) {
        // Swipe down - previous item
        navigateToItem(currentIndex - 1);
      } else if (Math.abs(touchDelta) < 10) {
        // Treat as a tap if there's minimal movement
        if (items[currentIndex] && items[currentIndex].target) {
          handleNavigateToTarget(items[currentIndex].target);
        }
      }
    }
    
    // Reset touch state
    setTouchDelta(0);
    setIsMenuFocused(false);
  };

  // Apply original gooey text effect when changing items
  useEffect(() => {
    // Only run if we have a valid trigger and target element
    if (animationTrigger <= 0 || !itemsRef.current[currentIndex]) {
      return;
    }
    
    const prevText = items[prevIndex]?.text || "";
    const nextText = items[currentIndex]?.text || "";
    const activeItem = itemsRef.current[currentIndex];
    
    if (!activeItem) return;
    
    // Reset item content to prepare for animation
    activeItem.innerHTML = '';
    
    // Create wrapper with filter
    const wrapper = document.createElement('div');
    wrapper.style.filter = 'url(#gooey-filter)'; // Use the original filter ID
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.position = 'relative'; // Add position relative
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
    <div 
      ref={menuContainerRef}
      className="relative w-full h-screen font-sans" 
    >
      {/* Container for curved menu - positioned to the left */}
      <div 
        ref={interactiveAreaRef}
        className="absolute w-[340px] h-[340px] overflow-visible left-0 md:left-16 lg:left-24 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        {/* Spinner - rotates to position items */}
        <div 
          ref={spinnerRef} 
          className="absolute top-0 bottom-0 left-0 m-auto h-full transition-all duration-500 ease-out"
          style={{ 
            transformOrigin: 'center',
            transform: `rotate(${currentIndex * -config.degPerRotation}deg)`,
            transitionDuration: `${config.animationDuration}ms`
          }}
        >
          {/* Item wrapper */}
          <div className="relative h-full">
            {items.map((item, i) => (
              <div
                key={`item-${i}`}
                ref={(el) => setItemRef(el, i)}
                className={`absolute whitespace-nowrap transition-all duration-300 cursor-pointer font-sans z-10
                  ${i === currentIndex ? 
                    'active text-2xl md:text-3xl font-bold' : 
                    'text-lg md:text-xl hover:opacity-80'}`}
                style={{
                  top: '50%',
                  left: 0,
                  transform: `rotate(${i * config.degPerRotation}deg) translateX(max(120px, min(30vw, 380px))) translateY(-50%)`,
                  transformOrigin: 'left center',
                  color: i === currentIndex ? config.activeTextColor : config.textColor,
                  pointerEvents: 'auto',
                  padding: '12px', // Increased padding for better touch targets
                  marginBottom: '4px', // Add spacing between items
                  background: 'rgba(255,255,255,0.01)', // Nearly invisible background for hit testing
                  letterSpacing: '0.02em', // Slightly increased letter spacing for readability
                }}
                onClick={() => handleItemClick(i)}
                onMouseOver={() => setIsMenuFocused(true)}
                onMouseOut={() => setIsMenuFocused(false)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicator dot */}
        <div 
          ref={dotRef}
          className="absolute rounded-full top-1/2 left-20 transform -translate-y-1/2 transition-all duration-500 z-20"
          style={{
            backgroundColor: config.accentColor,
            height: `${config.indicatorSize}px`,
            width: `${config.indicatorSize}px`,
            transform: `translateY(calc(-50% + ${currentIndex * 0.5}px))`,
            transitionDuration: `${config.animationDuration}ms`,
            boxShadow: '0 0 8px rgba(0,0,0,0.1)' // Add subtle shadow to make dot more visible
          }}
        ></div>
        
        {/* Helper element for focusing and scrolling on hover */}
        <div 
          className="absolute w-full h-full pointer-events-auto"
          style={{ zIndex: 5 }}
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        ></div>
      </div>
      
      {/* Styles */}
      <style jsx>{`
        @keyframes dotPulse {
          0% { transform: translateY(-50%) scale(1); opacity: 1; }
          50% { transform: translateY(-50%) scale(1.3); opacity: 0.8; }
          100% { transform: translateY(-50%) scale(1); opacity: 1; }
        }
        
        .pulse {
          animation: dotPulse 0.6s ease-out;
        }
        
        .active {
          z-index: 10;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .active {
            font-size: 1.25rem !important; /* Adjust font size on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default CircularMenuWithGooeyText;