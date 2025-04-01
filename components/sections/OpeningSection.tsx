import React from 'react';
import { motion } from 'framer-motion';
import { FloatingElement } from '../ui/NeumorphicUI';
import CircularMenuWithGooeyText from './CircularMenuWithGooeyText';

const OpeningSection: React.FC = () => {
  // Menu items for the Realization Toolkit
  const menuItems = [
    '🌀Realization Toolkit', 
    'Find Your Tools', 
    'The Toolkit', 
    'Enroll Now', 
    'Testimonials', 
    '🌀Realization Toolkit', 
    'Find Your Tools', 
    'Realization by Pea'
  ];

  // Configuration for the circular menu with your theme colors
  const menuConfig = {
    degPerRotation: 10,
    animationDuration: 600,
    gooeyAnimationDuration: 1.2,
    accentColor: '#8abeff', // Sky-300 from your theme
    textColor: '#6c757d', // Mist-600 from your theme
    activeTextColor: '#db2777', // Pink-600
    indicatorSize: 16
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-200/40 via-sage-50/30 to-mist-100/60"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <FloatingElement 
          className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-peach-100/30 blur-3xl"
          amplitude={20}
          duration={15}
        >
          <div className="w-full h-full"></div>
        </FloatingElement>
        
        <FloatingElement 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-sky-100/20 blur-3xl"
          amplitude={15}
          duration={18}
        >
          <div className="w-full h-full"></div>
        </FloatingElement>
        
        <FloatingElement 
          className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-sage-100/30 blur-3xl"
          amplitude={25}
          duration={20}
        >
          <div className="w-full h-full"></div>
        </FloatingElement>
      </div>
      
      {/* Circular Menu Component */}
      <div className="w-full h-screen flex items-center justify-center">
        <CircularMenuWithGooeyText 
          items={menuItems} 
          customConfig={menuConfig}
        />
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-10 rounded-full border border-mist-400/30 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-mist-400/50 rounded-full"></div>
        </div>
      </motion.div>
      
      {/* Instructions panel */}
      <div className="absolute bottom-6 right-6 text-sm text-mist-600 bg-white/70 p-3 rounded-lg shadow-sm backdrop-blur-sm">
        <p>Use arrow keys, mouse wheel, or click to navigate</p>
      </div>
    </section>
  );
};

export default OpeningSection;
