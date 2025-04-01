import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CircularMenuProps {
  items: string[];
}

const SimplifiedCircularMenu: React.FC<CircularMenuProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setCurrentIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]);

  // Create an orbital layout of items
  const renderMenuItems = () => {
    const radius = 180; // Radius of the circle in pixels
    return items.map((item, index) => {
      const angle = (index * 2 * Math.PI) / items.length;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const isActive = index === currentIndex;

      return (
        <motion.div
          key={index}
          className={`absolute cursor-pointer transition-all duration-500 text-center
                     ${isActive ? 'text-sky-400 scale-110 font-medium' : 'text-mist-600 font-light'}`}
          style={{
            transform: `translate(${x}px, ${y}px)`,
            transformOrigin: 'center center',
          }}
          onClick={() => setCurrentIndex(index)}
          whileHover={{ scale: 1.1 }}
        >
          <div className="min-w-48 max-w-60 px-4 py-2 foggy-glass rounded-full border border-white/10">
            {item}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="min-h-[500px] w-full flex items-center justify-center relative overflow-hidden">
      {/* Centered dot */}
      <div className="absolute z-10 w-5 h-5 bg-sky-400 rounded-full shadow-lg"></div>
      
      {/* Center text with current selection */}
      <motion.div 
        key={currentIndex} // Key change forces animation
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="absolute z-0 text-center max-w-md font-sans text-xl font-light text-mist-700"
      >
        {items[currentIndex]}
      </motion.div>

      {/* Orbital items */}
      <div ref={containerRef} className="relative w-[500px] h-[500px]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {renderMenuItems()}
        </div>
      </div>
    </div>
  );
};

export default SimplifiedCircularMenu;
