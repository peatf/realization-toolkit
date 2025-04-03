import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  target: string;
}

interface CircularMenuProps {
  items?: NavItem[];
}

const CircularMenuWithGooeyText: React.FC<CircularMenuProps> = (props) => {
  // Default navigation items
  const defaultItems = [
    { id: 'membership-benefits', label: 'Realization Toolkit', target: 'membership-benefits' },
    { id: 'quiz', label: 'Find Your Tools', target: 'quiz' },
    { id: 'product-carousels', label: 'Learn About the Tools', target: 'product-carousels' },
    { id: 'pricing', label: 'Enroll Now', target: 'pricing' },
    { id: 'toolkit-exclusives', label: 'Realization Toolkit Exclusives', target: 'toolkit-exclusives' },
    { id: 'testimonials', label: 'Testimonials', target: 'testimonials' }
  ];
  
  // Use passed items if available, otherwise use default items
  const items = props.items || defaultItems;
  
  // Prevent hooks from being conditional - move these outside any conditional logic
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize motion values properly
  const spiralRotation = useMotionValue(0);
  const orbitProgress = useMotionValue(0);
  
  // Safely use useEffect for animations rather than direct calls
  useEffect(() => {
    // Animation code here
    // Using animate() from framer-motion only if browser is available
    if (typeof window !== 'undefined') {
      animate(spiralRotation, activeIndex * 60, { 
        type: 'spring', 
        damping: 25, 
        stiffness: 100
      });
    }
  }, [activeIndex, spiralRotation]);

  // Calculate spiral points for positioning nav items
  const spiralPoints = useMemo(() => {
    const points = [];
    const numPoints = items.length;
    const radius = 260; // Base radius
    const radiusIncrement = 0;
    const angleIncrement = (2 * Math.PI) / numPoints;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleIncrement;
      const currentRadius = radius + i * radiusIncrement;
      const x = currentRadius * Math.cos(angle);
      const y = currentRadius * Math.sin(angle);
      points.push({ x, y });
    }
    
    return points;
  }, [items.length]);
  
  // Generate SVG spiral path for visualization
  const spiralPath = useMemo(() => {
    const numPoints = 200;
    const maxRadius = 300;
    const radiusIncrement = maxRadius / numPoints;
    const angleIncrement = (2 * Math.PI * 2) / numPoints;
    let path = "M 0 0";
    
    for (let i = 1; i < numPoints; i++) {
      const angle = i * angleIncrement;
      const radius = i * radiusIncrement;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      path += ` L ${x} ${y}`;
    }
    
    return path;
  }, []);

  // Navigation function - smooth scroll to section
  const navigateToSection = useCallback((targetId: string) => {
    try {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.error("Error navigating to section:", error);
    }
  }, []);

  // Handle clicks on menu items - SIMPLIFIED
  const handleItemClick = useCallback((index: number) => {
    // Set the active index
    setActiveIndex(index);
    
    // Navigate to target section
    navigateToSection(items[index].target);
  }, [items, navigateToSection]);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Ambient background elements */}
        <div className="absolute w-full h-full opacity-40">
          <div className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-teal-100 filter blur-3xl opacity-20 transform -translate-x-1/2"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-blue-100 filter blur-3xl opacity-20"></div>
        </div>
        
        {/* Central node with pulsating animation */}
        <motion.div
          className="absolute z-10 w-4 h-4 rounded-full bg-gradient-to-br from-teal-300 to-emerald-400 shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Spiral visualization */}
        <motion.div
          className="absolute w-[700px] h-[700px]"
          style={{
            rotate: spiralRotation,
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%'
          }}
          transition={{
            type: "spring",
            stiffness: 45,
            damping: 25
          }}
        >
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="-350 -350 700 700"
            style={{ overflow: 'visible' }}
          >
            <rect x="-350" y="-350" width="700" height="700" fill="url(#grid)" />
            
            {/* Decorative spiral paths */}
            <motion.path
              d={spiralPath}
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
              strokeDasharray="1 2"
              style={{ opacity: 0.08 }}
            />
            
            <motion.path
              d={spiralPath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.4"
              strokeDasharray="1 6"
              style={{ opacity: 0.1 }}
              transform="scale(0.92) rotate(5)"
            />
            
            <motion.path
              d={spiralPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="0.4"
              strokeDasharray="1 6"
              style={{ opacity: 0.1 }}
              transform="scale(1.08) rotate(-5)"
            />
            
            <motion.path
              d={spiralPath}
              fill="none"
              stroke="#6ce4a6"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{
                opacity: 0.3
              }}
              filter="drop-shadow(0 0 2px rgba(108, 228, 166, 0.5))"
            />
          </svg>
          
          {/* Navigation items - USING PURE FRAMER MOTION */}
          <AnimatePresence>
            {spiralPoints.map((point, index) => {
              const isActive = index === activeIndex;
              const isHovered = index === hoveredIndex;
              const itemCounterRotate = useTransform(spiralRotation, value => -value);
              
              return (
                <motion.div
                  key={items[index].id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `calc(50% + ${point.x}px)`,
                    top: `calc(50% + ${point.y}px)`,
                    zIndex: isActive ? 20 : 5
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    scale: isActive ? 1.2 : isHovered ? 1.1 : 1,
                    opacity: 1,
                    y: isActive ? -5 : 0
                  }}
                  whileHover={{ y: -2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => handleItemClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div 
                    className="relative"
                    style={{ rotate: itemCounterRotate }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={items[index].label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`whitespace-nowrap font-sans ${
                          isActive 
                            ? 'text-lg font-medium text-emerald-800' 
                            : isHovered 
                              ? 'text-sm font-normal text-gray-700' 
                              : 'text-sm font-light text-gray-600'
                        }`}
                      >
                        {items[index].label}
                        {isActive && (
                          <motion.div 
                            className="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-emerald-400"
                            layoutId="activeIndicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ transform: 'translateX(-50%)' }}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* Progress indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-300 to-emerald-400"
              style={{ 
                width: useTransform(
                  orbitProgress, 
                  [0, 1], 
                  ['0%', '100%']
                )
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 tracking-wider">
            {items[activeIndex]?.label || 'Explore'} 
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CircularMenuWithGooeyText;
