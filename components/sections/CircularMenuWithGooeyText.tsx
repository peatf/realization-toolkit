import React, { useState, useEffect, useCallback } from 'react';

// Define the structure for navigation items
interface NavItem {
  id: string;
  label: string;
  target: string; // Used for scrolling to the target section ID
}

// Define props for the component (currently unused but good practice)
interface CircularMenuProps {
  items?: NavItem[]; // Allow passing custom items, though defaults are used if not provided
}

const CircularMenuWithGooeyText: React.FC<CircularMenuProps> = (props) => {
  // --- Navigation Items (from your original code) ---
  const navItems: NavItem[] = [
    { id: 'membership-benefits', label: 'Realization Toolkit', target: 'membership-benefits' },
    { id: 'quiz', label: 'Find Your Tools', target: 'quiz' },
    { id: 'product-carousels', label: 'Learn About the Tools', target: 'product-carousels' },
    { id: 'pricing', label: 'Enroll Now', target: 'pricing' },
    { id: 'toolkit-exclusives', label: 'Realization Toolkit Exclusives', target: 'toolkit-exclusives' },
    { id: 'testimonials', label: 'Testimonials', target: 'testimonials' }
  ];

  // --- State Variables ---
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [labels, setLabels] = useState<string[]>(navItems.map(item => item.label));

  // --- Define colors ---
  const textColor = {
    active: '#60a5fa', // Blue-400 (Used for inactive text and spiral path)
    hover: '#3b82f6', // Blue-500 (Used for hovered text)
    normal: '#2563eb', // Blue-600 (Used for active text and active point fill)
    progressBarBg: '#93c5fd', // Blue-300 (Progress bar background)
    progressBarFill: '#1d4ed8', // Blue-700 (Progress bar fill)
  };

  // --- Text scramble effect configuration ---
  const scrambleConfig = {
    duration: 800,
    chars: '!<>-_\\/[]{}—=+*^?#________',
  };

  // --- Spiral Parameters for Visual Path ---
  const spiralParams = {
    startAngle: Math.PI * 5,        // Increased from 3 to add more rotations
    endAngle: Math.PI * 0.1,        // Decreased to extend the spiral further
    minRadiusPath: 120,             // Increased from 80
    maxRadiusPath: 700,             // Increased from 400
    svgViewBox: "-750 -750 1500 1500", // Expanded viewBox to fit larger spiral
    containerSize: "h-screen w-full max-w-[1800px]", // Increased max width and using full viewport height
  };

  // --- Explicit Menu Item Coordinates ---
  const menuItemCoordinates = [
    { x: 0, y: 0, rotationOffset: 0 },                  // Center - Realization Toolkit
    { x: 300, y: -260, rotationOffset: 0 },             // Adjusted Position 1 
    { x: 450, y: -50, rotationOffset: 0 },              // Adjusted Position 2
    { x: 380, y: 230, rotationOffset: 0 },              // Adjusted Position 3
    { x: 120, y: 450, rotationOffset: 0 },              // Adjusted Position 4
    { x: -270, y: 400, rotationOffset: 0 }              // Adjusted Position 5
  ];

  // --- Generate Spiral Path for Visual Reference Only ---
  const generateSpiralPath = (steps = 250): string => {
    const { startAngle, endAngle, minRadiusPath, maxRadiusPath } = spiralParams;
    const totalAngle = startAngle - endAngle;
    const b = Math.log(maxRadiusPath / minRadiusPath) / totalAngle;
    let path = '';
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = startAngle - t * totalAngle;
      const radius = minRadiusPath * Math.exp(b * (startAngle - angle));
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      path += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return path;
  };

  // Increase steps for a smoother spiral
  const spiralPath = generateSpiralPath(450); // Increased from 250

  // --- Text Scramble Animation ---
  const textScrambleEffect = (targetIndex: number): void => {
    const finalText = navItems[targetIndex].label;
    const finalTextArray = finalText.split('');
    const charIndexes = Array.from(Array(finalTextArray.length).keys())
      .sort(() => Math.random() - 0.5);
    let frame = 0;
    const totalFrames = 20;

    const animateText = () => {
      if (frame >= totalFrames) {
        setLabels(currentLabels => {
            const newLabels = [...currentLabels];
            newLabels[targetIndex] = finalText;
            return newLabels;
        });
        return;
      }
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(finalTextArray.length * progress);
      let scrambledText = '';
      for (let i = 0; i < finalTextArray.length; i++) {
        const charIndex = charIndexes[i];
        if (i < revealedCount) {
          scrambledText += finalTextArray[charIndex];
        } else {
          scrambledText += scrambleConfig.chars[Math.floor(Math.random() * scrambleConfig.chars.length)];
        }
      }
      setLabels(currentLabels => {
          const newLabels = [...currentLabels];
          newLabels[targetIndex] = scrambledText;
          return newLabels;
      });
      frame++;
      setTimeout(animateText, scrambleConfig.duration / totalFrames);
    };
    animateText();
  };

  // --- Calculate Rotation ---
  const calculateRotation = (index: number): number => {
    // If it's the first (centered) item, don't rotate
    if (index === 0) return 0;

    const safeIndex = Math.max(0, Math.min(index, menuItemCoordinates.length - 1));
    const coords = menuItemCoordinates[safeIndex];
    if (!coords) return 0;
    const angle = Math.atan2(coords.y, coords.x);
    return (-angle * (180 / Math.PI)) + 90 + (coords.rotationOffset || 0);
  };

  // --- Navigation Function ---
  const navigateToSection = useCallback((targetId: string): void => {
    try {
      const targetElement = document.getElementById(targetId);
      const menuSection = document.getElementById('gooey-menu-section');
      
      if (targetElement) {
        // Add transition class to menu section
        if (menuSection) menuSection.classList.add('section-hidden');
        
        // Smooth scroll to target
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Optional: add a nice flash effect on the target section
        setTimeout(() => {
          targetElement.classList.add('flash-highlight');
          setTimeout(() => targetElement.classList.remove('flash-highlight'), 1000);
        }, 500);
      } else {
        console.warn(`Target element with ID "${targetId}" not found.`);
      }
    } catch (error) {
      console.error("Error navigating to section:", error);
    }
  }, []);

  // --- useEffect Hook ---
  useEffect(() => {
    const targetRotation = calculateRotation(activeIndex);
    setRotation(targetRotation);
    textScrambleEffect(activeIndex);
  }, [activeIndex]);

  // --- Scroll effect for menu expansion ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const menuSection = document.getElementById('gooey-menu-section');
    if (!menuSection) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const openingHeight = window.innerHeight; // Assuming opening section is 100vh
      
      // Start expanding when scrolling past 50% of opening section
      if (scrollY > openingHeight * 0.5) {
        menuSection.classList.add('expanded');
      } else {
        menuSection.classList.remove('expanded');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handle Item Click ---
  const handleItemClick = useCallback((index: number): void => {
    if (index >= 0 && index < navItems.length) {
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
      navigateToSection(navItems[index].target);
    }
  }, [activeIndex, navItems, navigateToSection]);

  // --- Render JSX ---
  return (
    // Main container - Make it fill entire space
    <div className="flex items-center justify-center w-full h-screen bg-transparent font-sans overflow-hidden">
      {/* Relative container for positioning - make it larger */}
      <div
        className={`relative ${spiralParams.containerSize} flex items-center justify-center overflow-visible`}
      >
        {/* Rotating container */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 1s ease-in-out',
            transformOrigin: 'center center'
          }}
        >
          {/* SVG container */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox={spiralParams.svgViewBox}
            style={{ overflow: 'visible' }}
          >
            {/* Visual spiral path */}
            <path
              d={spiralPath} 
              fill="none" 
              stroke={textColor.active}
              strokeWidth="2.5" // Increased from 0.8
              style={{ opacity: 0.85 }} // Slightly increased opacity
            />
            {/* Points representing menu item locations */}
            {menuItemCoordinates.map((point, index) => (
              index < navItems.length && (
                <g key={`point-${navItems[index].id}`}>
                  <defs>
                    <filter id={`blur-${navItems[index].id}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                  </defs>
                  <circle
                    cx={point.x} cy={point.y} r={index === activeIndex ? 4 : 2}
                    fill={index === activeIndex ? textColor.normal : textColor.active}
                    style={{
                      transition: 'r 0.3s ease, fill 0.3s ease, opacity 0.3s ease',
                      opacity: index === activeIndex ? 0.7 : 0.3,
                      filter: `url(#blur-${navItems[index].id})`
                    }}
                  />
                </g>
              )
            ))}
          </svg>

          {/* Navigation menu items */}
          {menuItemCoordinates.map((point, index) => (
            index < navItems.length && (
              <div
                key={navItems[index].id}
                className={`absolute transform ${index === 0 ? 'z-30' : ''}`}
                style={{
                  left: `calc(50% + ${point.x}px)`, 
                  top: `calc(50% + ${point.y}px)`,
                  // Center item doesn't rotate with the spiral
                  transform: index === 0 
                    ? 'translate(-50%, -50%)' 
                    : `translate(-50%, -50%) rotate(${-rotation}deg)`,
                  zIndex: index === 0 ? 30 : index === activeIndex ? 20 : 5,
                  transition: index === 0 ? 'none' : 'transform 1s ease-in-out'
                }}
                onClick={() => handleItemClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Inner div for text styling */}
                <div
                  className={`${
                    index === 0 
                      ? 'w-40 flex flex-col items-center justify-center text-center' // Wider and explicitly centered container for central item
                      : 'w-28 text-center'
                  } font-sans ${
                    index === 0 
                      ? 'text-2xl font-semibold' 
                      : index === activeIndex
                        ? 'text-xl font-medium'
                        : index === hoveredIndex
                          ? 'text-base font-normal'
                          : 'text-base font-light'
                  }`}
                  style={{
                    color: index === 0 
                      ? textColor.normal 
                      : index === activeIndex 
                        ? textColor.normal 
                        : index === hoveredIndex 
                          ? textColor.hover 
                          : textColor.active,
                    letterSpacing: index === 0 ? '0.07em' : index === activeIndex ? '0.05em' : '0.02em',
                    transition: 'all 0.3s ease',
                    textAlign: 'center', // Ensure text is centered
                  }}
                >
                  {/* For the center item, split the text to better center it */}
                  {index === 0 ? (
                    <>
                      <span>Realization</span>
                      <span>Toolkit</span>
                    </>
                  ) : (
                    labels[index]
                  )}
                  
                  {/* Subtle dot indicator - not showing for centered item */}
                  {index !== 0 && index === activeIndex && (
                    <div
                      className="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: textColor.normal, transform: 'translateX(-50%)'
                      }}
                    />
                  )}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Progress indicator */}
        <div
          className="absolute transform -translate-x-1/2 flex flex-col items-center pointer-events-none"
          style={{ bottom: '-80px', left: '50%' }}
        >
          <div className="w-48 h-2 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                backgroundColor: textColor.progressBarFill,
                width: `${navItems.length > 1 ? (activeIndex / (navItems.length - 1)) * 100 : 0}%`,
                transition: 'width 1s ease'
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 tracking-wider">
            {(navItems[activeIndex]?.label) || 'Explore'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CircularMenuWithGooeyText;
