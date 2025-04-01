import React from 'react';
import { motion } from 'framer-motion';
import { FloatingElement, GlassModule } from '../ui/NeumorphicUI';
import CircularMenuWithGooeyText from './CircularMenuWithGooeyText';

const OpeningSection: React.FC = () => {
  // Array of prompts for the circular menu
  const songPrompts = [
    "Make a song to be happy.",
    "Make a song for a workout.",
    "Make a song for a farewell.",
    "Make a song for my friend Earl.",
    "Make a song about the moon.",
    "Make a song about mum's cooking.",
    "Make a song for lunch.",
    "Make a song for a road trip.",
  ];

  // Custom configuration for the circular menu to match project aesthetics
  const customConfig = {
    cBg: 'rgba(240, 242, 245, 0.4)', // Mist-100 with transparency
    cAccent: 'rgba(138, 190, 255, 0.8)', // Sky-300 with transparency
    cText: '#495057', // Mist-700
    itemOpacityDefault: 0.3,
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Gradient background with foggy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-200/40 via-sage-50/30 to-mist-100/60"></div>
      
      {/* Soft blurred orbs in background */}
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
      
      {/* Main heading content */}
      <div className="container mx-auto px-4 pt-16 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <span className="font-mono text-mist-700 tracking-widest uppercase text-sm">Begin Your Journey</span>
        </motion.div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-extralight text-mist-800 mb-8 leading-tight">
          <span className="block ethereal-text">The Realization</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400/80 via-peach-300/80 to-sage-400/80">
            Toolkit
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="max-w-2xl mx-auto text-mist-700 text-lg mb-12 font-light"
        >
          Select a creative prompt from our carousel or use the arrow keys to navigate. 
          Experience our immersive interface with smooth transitions and elegant text effects.
        </motion.p>
      </div>
      
      {/* Circular Menu with Gooey Text */}
      <div className="w-full h-[60vh] mt-8 overflow-hidden">
        <CircularMenuWithGooeyText 
          items={songPrompts} 
          customConfig={customConfig}
        />
      </div>
      
      {/* Scroll indicator with ethereal animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-10 rounded-full border border-mist-400/30 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-mist-400/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default OpeningSection;
