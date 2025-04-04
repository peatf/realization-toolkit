import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

// Define the structure for navigation items
interface NavItem {
  id: string;
  label: string;
  target: string; // Used for scrolling to the target section ID
}

// Define structure for calculated coordinates
interface Point {
    x: number;
    y: number;
    rotationOffset?: number; // Keep for potential future use
}

// Define props for the component
interface CircularMenuProps {
  items?: NavItem[];
}

// --- CSS Keyframes for Breathing Animation ---
// Define the animation outside the component for clarity,
// or embed it in a <style> tag within the JSX if needed for self-containment.
const breatheAnimation = `
  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02); /* Adjust scale factor for desired subtlety */
    }
  }
`;


const CircularMenuWithGooeyText: React.FC<CircularMenuProps> = (props) => {
  // --- Navigation Items ---
  const navItems: NavItem[] = [
    { id: 'membership-benefits', label: 'Realization Toolkit', target: 'membership-benefits' }, // Index 0
    { id: 'quiz', label: 'Find Your Tools', target: 'quiz' }, // Index 1
    { id: 'product-carousels', label: 'Learn About the Tools', target: 'product-carousels' }, // Index 2
    { id: 'pricing', label: 'Enroll Now', target: 'pricing' }, // Index 3
    { id: 'toolkit-exclusives', label: 'Realization Toolkit Exclusives', target: 'toolkit-exclusives' }, // Index 4
    { id: 'testimonials', label: 'Testimonials', target: 'testimonials' } // Index 5
  ];

  // --- State Variables ---
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);

  // --- Define colors ---
  const textColor = {
    active: '#60a5fa', // Blue-400
    hover: '#3b82f6', // Blue-500
    normal: '#2563eb', // Blue-600
    progressBarBg: '#93c5fd', // Blue-300
    progressBarFill: '#1d4ed8', // Blue-700
  };

  // --- Spiral Parameters (Unchanged) ---
  const spiralParams = {
    startAngle: Math.PI * 5,
    endAngle: Math.PI * 0.1,
    minRadiusPath: 120,
    maxRadiusPath: 700,
    svgViewBox: "-750 -750 1500 1500",
    containerSize: "h-screen w-full max-w-[1800px]",
  };

  // --- Calculate Menu Item Coordinates Dynamically (Includes targeted adjustments) ---
  const menuItemCoordinates = useMemo((): Point[] => {
    const points: Point[] = [{ x: 0, y: 0 }]; // Center point (index 0)
    const numOuterItems = navItems.length - 1;
    if (numOuterItems <= 0) return points;

    const { startAngle, endAngle, minRadiusPath, maxRadiusPath } = spiralParams;
    const totalAngleRange = startAngle - endAngle;
    const placementAngleRange = totalAngleRange * 0.57; // Use 57% of the angular range
    const b = Math.log(maxRadiusPath / minRadiusPath) / totalAngleRange;

    for (let i = 1; i <= numOuterItems; i++) {
      const t = numOuterItems > 1 ? (i - 1) / (numOuterItems - 1) : 0;
      const angle = startAngle - t * placementAngleRange;
      const radius = minRadiusPath * Math.exp(b * (startAngle - angle));
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
    }

    // TARGETED ADJUSTMENTS
    const adjustmentOffset1 = { x: -40, y: -40 }; // Offset for item 1 (UP/LEFT)
    const adjustmentOffset4 = { x: 15, y: 15 };  // Offset for item 4 (DOWN/RIGHT)
    const adjustmentOffset5 = { x: -25, y: 0 };  // Offset for testimonials (LEFT)

    if (points[1]) { points[1].x += adjustmentOffset1.x; points[1].y += adjustmentOffset1.y; }
    if (points[4]) { points[4].x += adjustmentOffset4.x; points[4].y += adjustmentOffset4.y; }
    if (points[5]) { points[5].x += adjustmentOffset5.x; points[5].y += adjustmentOffset5.y; }

    points.forEach(p => {
        p.x = parseFloat(p.x.toFixed(2));
        p.y = parseFloat(p.y.toFixed(2));
    });

    return points;
  }, [navItems.length, spiralParams]);


  // --- Generate Spiral Path (Unchanged logic) ---
  const generateSpiralPath = (steps = 450): string => {
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

  const spiralPath = generateSpiralPath();

  // --- Calculate Rotation (Unchanged) ---
  const calculateRotation = useCallback((index: number): number => {
    if (index === 0) return 0;
    const coords = menuItemCoordinates[index];
    if (!coords || (coords.x === 0 && coords.y === 0)) return 0;
    const angle = Math.atan2(coords.y, coords.x);
    return (-angle * (180 / Math.PI)) + 90 + (coords.rotationOffset || 0);
  }, [menuItemCoordinates]);

  // --- Navigation Function (Unchanged) ---
  const navigateToSection = useCallback((targetId: string): void => {
    try {
      const targetElement = document.getElementById(targetId);
      const menuSection = document.getElementById('gooey-menu-section');
      if (targetElement) {
        if (menuSection) menuSection.classList.add('section-hidden');
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // --- useEffect Hook for Rotation ---
  useEffect(() => {
    const targetRotation = calculateRotation(activeIndex);
    setRotation(targetRotation);
  }, [activeIndex, calculateRotation]);

  // --- useEffect Hook for Scroll-based Menu Expansion (Unchanged) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const menuSection = document.getElementById('gooey-menu-section');
    if (!menuSection) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const openingHeight = window.innerHeight;
      if (scrollY > openingHeight * 0.5) {
        menuSection.classList.add('expanded');
      } else {
        menuSection.classList.remove('expanded');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- useEffect Hook for Scale Factor ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const calculateScale = () => {
      // Base scale on viewport width
      const viewportWidth = window.innerWidth;
      const baseWidth = 1200; // Desktop reference width
      const newScale = viewportWidth < 768 ? Math.max(0.5, viewportWidth / baseWidth) : 1;
      setScaleFactor(newScale);
    };
    
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // --- Handle Item Click (Unchanged) ---
  const handleItemClick = useCallback((index: number): void => {
    if (index >= 0 && index < navItems.length) {
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
      navigateToSection(navItems[index].target);
    }
  }, [activeIndex, navItems, navigateToSection]);

  // --- Render JSX (Added breathing animation) ---
  return (
    <>
      {/* Inject the CSS animation keyframes */}
      <style>{breatheAnimation}</style>

      <div className="flex items-center justify-center w-full h-screen bg-transparent font-sans overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/assets/realizationtk3d4.png" /* Replace with your actual image path */
              alt="Realization Toolkit Background"
              fill
              priority
              style={{ 
                objectFit: 'contain',
                objectPosition: 'center',
                opacity: 0.12 // Adjust opacity to taste
              }}
            />
          </div>
        </div>

        {/* Apply the animation to this container */}
        <div
          className={`relative ${spiralParams.containerSize} flex items-center justify-center overflow-visible z-10`}
          style={{
             // Apply animation: name duration timing-function iteration-count
             animation: 'breathe 4s ease-in-out infinite',
             // Ensure transform-origin is center for scaling
             transformOrigin: 'center center'
          }}
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
              {/* Visual spiral path - FINAL STYLING */}
              <path
                d={spiralPath}
                fill="none"
                stroke={textColor.active}
                strokeWidth="4" // Increased thickness
                strokeLinecap="round" // Rounded ends
                strokeLinejoin="round" // Rounded corners/joins
                style={{ opacity: 0.85 }}
              />
              {/* Points representing menu item locations */}
              {menuItemCoordinates.map((point, index) => (
                index < navItems.length && index > 0 && (
                  <g key={`point-${navItems[index].id}`}>
                    <defs>
                      <filter id={`blur-${navItems[index].id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                      </filter>
                    </defs>
                    <circle
                      cx={point.x} cy={point.y} // Use final adjusted coords
                      r={index === activeIndex ? 4 : 2}
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
              <div
                key={navItems[index].id}
                className={`absolute transform ${index === 0 ? 'z-30' : ''}`}
                style={{
                  left: `calc(50% + ${point.x * scaleFactor}px)`, // Scale by factor
                  top: `calc(50% + ${point.y * scaleFactor}px)`,  // Scale by factor
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
                      ? 'w-20 xs:w-24 sm:w-28 md:w-40 flex flex-col items-center justify-center text-center'
                      : index === 1 
                        ? 'w-12 xs:w-16 sm:w-20 md:w-28 text-center flex flex-col' // Narrower for "Find Your Tools"
                        : 'w-16 xs:w-20 sm:w-24 md:w-36 text-center' // Wider for other items
                  } font-mono ${
                    index === 0
                      ? 'text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight'
                      : index === activeIndex
                        ? 'text-sm xs:text-base sm:text-lg md:text-2xl font-medium tracking-tight'
                        : index === hoveredIndex
                          ? 'text-xs xs:text-sm sm:text-base md:text-xl font-normal tracking-tight'
                          : 'text-[0.65rem] xs:text-xs sm:text-sm md:text-lg font-light tracking-tight'
                  }`}
                  style={{
                    color: index === 0
                      ? textColor.normal
                      : index === activeIndex
                        ? textColor.normal
                        : index === hoveredIndex
                          ? textColor.hover
                          : textColor.active,
                    letterSpacing: index === 0 ? '0.02em' : index === activeIndex ? '0.02em' : '0.01em',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                  }}
                >
                  {/* Text content - with special handling for "Find Your Tools" */}
                  {index === 0 ? (
                    <div className="text-center">
                      ꩜
                    </div>
                  ) : index === 1 ? (
                    <div>
                      <div>Find</div>
                      <div>Your Tools</div>
                    </div>
                  ) : (
                    navItems[index].label // Use original label directly
                  )}

                  {/* Active item indicator dot */}
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
            ))}
          </div> {/* End Rotating Container */}

          {/* Progress indicator (Unchanged) */}
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
        </div> {/* End Relative Container (Animated) */}
      </div> 
    </> // Use Fragment to wrap style and main div
  );
};

export default CircularMenuWithGooeyText;
