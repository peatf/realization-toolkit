import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FloatingElement, GlassModule } from '.../components/ui/NeumorphicUI';
import CircularMenuWithGooeyText from '../components/CircularMenuWithGooeyText';

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

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
      
      {/* Main content with glass effect */}
      <GlassModule className="container mx-auto px-4 py-16 text-center z-10 max-w-4xl">
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
          className="max-w-2xl mx-auto text-mist-700 text-lg mb-16 font-light"
        >
          Select a creative prompt from our circular menu or use the arrow keys to navigate. 
          Experience our immersive interface with smooth transitions and gooey text effects.
        </motion.p>
        
        {/* Circular Menu with Gooey Text Effect */}
        <div className="relative w-full h-64 mx-auto mt-8">
          <CircularMenuWithGooeyText 
            items={songPrompts}
            config={{
              cText: "#495057", // Matching your mist-700 color
              cAccent: "#8abeff", // Matching your sky color
              cBg: "transparent", // Transparent to work with your gradient bg
              gooeyTransitionDuration: 400, // Slightly longer for a more visible effect
              radius: "10vw",
              invisRadius: "40vw", // Slightly smaller than original
              itemOpacityDefault: 0.2,
              snapHeight: "40vh",
              snapCount: songPrompts.length,
              degPerRotation: 15, // Slightly larger rotation angle
            }}
          />
        </div>
      </GlassModule>
      
      {/* Scroll indicator with more ethereal animation */}
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
