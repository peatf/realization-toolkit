import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../layout/Section';

interface OpeningSectionProps {
  id?: string;
}

const OpeningSection: React.FC<OpeningSectionProps> = ({ id }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Calculate opacity based on scroll position
  const opacity = useTransform(
    scrollY, 
    [0, viewportHeight * 0.4], 
    [1, 0]
  );
  
  const textY = useTransform(
    scrollY,
    [0, viewportHeight * 0.4],
    [0, -50]
  );
  
  // Set viewport height on component mount
  useEffect(() => {
    setViewportHeight(window.innerHeight);
    
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      id={id} 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Animated content container */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10"
        style={{ opacity, y: textY }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4 md:mb-6 text-foreground">
          REALIZATION
        </h1>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-6 md:mb-8 text-foreground">
          Spiritual Technologies for Innovators
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl max-w-lg mx-auto font-light text-secondary">
          A collection of living tools to create beautiful things.
        </p>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        style={{ opacity: useTransform(scrollY, [0, viewportHeight * 0.2], [0.8, 0]) }}
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80 text-secondary"
        >
          <path 
            d="M12 5L12 19M12 19L18 13M12 19L6 13" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      {/* Subtle radial gradient background */}
      <div 
        className="absolute inset-0 -z-10" 
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)'
        }}
      ></div>
    </div>
  );
};

export default OpeningSection;