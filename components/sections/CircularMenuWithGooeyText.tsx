import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
  target: string;
}

interface Point {
  x: number;
  y: number;
  pathOffset: number; 
}

interface CircularMenuProps {
  items?: NavItem[];
}

const breatheAnimation = `
  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }
`;

const CircularMenuWithGooeyText: React.FC<CircularMenuProps> = () => {
  const navItems: NavItem[] = [
    { id: 'membership-benefits', label: 'Realization Toolkit', target: 'membership-benefits' },
    { id: 'quiz', label: 'Find Your Tools', target: 'membership-benefits' }, // Changed from 'quiz' to 'membership-benefits'
    { id: 'product-carousels', label: 'Learn About the Tools', target: 'product-carousels' },
    { id: 'pricing', label: 'Enroll Now', target: 'pricing' },
    { id: 'toolkit-exclusives', label: 'Realization Toolkit Exclusives', target: 'toolkit-exclusives' },
    { id: 'testimonials', label: 'Testimonials', target: 'testimonials' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuItemPositions, setMenuItemPositions] = useState<Point[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const textColor = {
    active: '#60a5fa',
    hover: '#3b82f6',
    normal: '#2563eb',
    progressBarBg: '#93c5fd',
    progressBarFill: '#1d4ed8',
  };

  const svgViewBox = "0 0 720.37 604.94";
  const centerX = 360;
  const centerY = 250;

  const spiralPath = "M718.87,411.62c-124.67,201.4-392.55,253.22-593.85,112.3C-2.71,434.49-51.42,237.99,76.49,95.04,178.82-19.32,352.1-27.79,479.64,63.97c102.03,73.41,118.37,207.08,36.5,298.57-65.49,73.19-184.75,84.91-266.37,26.19-65.3-46.98-75.76-132.53-23.36-191.08,41.92-46.84,118.24-54.34,170.48-16.76,41.79,30.07,48.48,84.82,14.95,122.29-26.83,29.98-75.67,34.78-109.11,10.73-26.75-19.24-31.03-54.29-9.57-78.27";

  const validSpiralPath = spiralPath || "M0,0"; // Fallback to empty path if undefined

  // Calculate positions along the path
  useEffect(() => {
    if (svgRef.current && navItems.length > 0) {
      try {
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', spiralPath);
        const pathLength = pathElement.getTotalLength();
        const points: Point[] = [];

        // Center symbol at the beginning
        points.push({
          x: 0,
          y: 0,
          pathOffset: 0,
        });

        const itemCount = navItems.length - 1;
        if (itemCount > 0) {
          // Adjust these percentages for spacing along the spiral
          const positionPercentages = [0.15, 0.32, 0.49, 0.66, 0.83];
          for (let i = 0; i < itemCount; i++) {
            const percentage = positionPercentages[i] || i / (itemCount - 1);
            const distance = pathLength * percentage;
            const point = pathElement.getPointAtLength(distance);
            points.push({
              x: point.x - centerX,
              y: point.y - centerY,
              pathOffset: percentage * 100,
            });
          }
        }
        setMenuItemPositions(points);
      } catch (error) {
        console.error("Error calculating menu points:", error);
      }
    }
  }, [navItems.length]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigateToSection = useCallback((targetId: string): void => {
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
  }, []);

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

  const handleItemClick = useCallback((index: number): void => {
    if (index >= 0 && index < navItems.length) {
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
      navigateToSection(navItems[index].target);
    }
  }, [activeIndex, navItems, navigateToSection]);

  // New text offset value using tspan (adjust as needed)
  const textDy = "-30"; // Adjust this value until you see the desired space

  return (
    <>
      <style>{breatheAnimation}</style>

      <div
        className="flex items-center justify-center w-full h-screen bg-transparent font-sans overflow-hidden"
        id="gooey-menu-section"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/assets/realizationtk3d4.png"
              alt="Realization Toolkit Background"
              fill
              priority
              style={{ 
                objectFit: 'contain',
                objectPosition: 'center',
                opacity: 0.12
              }}
            />
          </div>
        </div>

        {/* Animated container */}
        <div
          className="relative h-screen w-full max-w-[1800px] flex items-center justify-center overflow-visible z-10"
          style={{
            animation: 'breathe 4s ease-in-out infinite',
            transformOrigin: 'center center'
          }}
        >
          <svg
            ref={svgRef}
            className="w-[80%] h-[80%]"
            viewBox={svgViewBox}
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Spiral path for text */}
              <path id="spiralPathId" d={spiralPath} fill="none" stroke="none" />
              
              {/* Add checks for undefined spiralPath */}
              <path
                id="upperPathId"
                d={validSpiralPath} // Add fallback value
                fill="none"
                stroke="none"
                transform="translate(0, -25)"
              />
              
              <path
                id="lowerPathId"
                d={validSpiralPath} // Add fallback value
                fill="none" 
                stroke="none"
                transform="translate(0, 25)"
              />
              
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="activeTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={textColor.hover} />
                <stop offset="100%" stopColor={textColor.normal} />
              </linearGradient>
            </defs>

            {/* Visible spiral stroke */}
            <path
              d={validSpiralPath}
              fill="none"
              stroke={textColor.active}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.85 }}
            />

            {/* Center symbol */}
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={textColor.normal}
              fontSize="40"
              fontWeight="600"
              style={{ 
                cursor: 'pointer',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
              }}
              onClick={() => handleItemClick(0)}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              ꩜
            </text>

            {/* Menu items on the spiral path */}
            {menuItemPositions.map((position, index) => {
              if (index === 0) return null;
              
              const isActive = index === activeIndex;
              const isHovered = index === hoveredIndex;
              const fontSize = isMobile
                ? (isActive ? 28 : isHovered ? 26 : 24) // Larger sizes for mobile
                : (isActive ? 24 : isHovered ? 22 : 20); // Original sizes for desktop;
              const fontWeight = isActive ? 600 : isHovered ? 500 : 400;
              const fill = isActive 
                ? 'url(#activeTextGradient)' 
                : isHovered 
                  ? textColor.hover 
                  : textColor.active;

              return (
                <g
                  key={`text-${navItems[index].id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleItemClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Main text */}
                  <text
                    fill={fill}
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                      filter: isActive ? 'url(#glow)' : 'none',
                      transition: 'font-size 0.3s ease, font-weight 0.3s ease, fill 0.3s ease'
                    }}
                  >
                    <textPath
                      href="#spiralPathId"
                      startOffset={`${position.pathOffset}%`}
                      fontSize={fontSize}
                      fontWeight={fontWeight}
                      textAnchor="middle"
                    >
                      <tspan dy={textDy}>{navItems[index].label}</tspan>
                    </textPath>
                  </text>
                </g>
              );
            })}

            {/* Clickable hotspots */}
            {menuItemPositions.map((position, index) => {
              if (index === 0) return null;
              return (
                <circle
                  key={`hotspot-${navItems[index].id}`}
                  cx={centerX + position.x}
                  cy={centerY + position.y}
                  r="30"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleItemClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

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
                  width: `${
                    navItems.length > 1
                      ? (activeIndex / (navItems.length - 1)) * 100
                      : 0
                  }%`,
                  transition: 'width 1s ease'
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 tracking-wider">
              {navItems[activeIndex]?.label || 'Explore'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircularMenuWithGooeyText;
