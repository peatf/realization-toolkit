import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { NeumorphicButton, GlassModule, FloatingElement } from '../ui/NeumorphicUI';

const OpeningSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rippleTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Initialize ripple text effect with more subtle, ethereal animation
    if (rippleTextRef.current) {
      const text = rippleTextRef.current;
      const words = text.innerText.split(' ');
      
      // Clear the text element
      text.innerHTML = '';
      
      // Create spans for each word
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block';
        
        // Create spans for each letter
        Array.from(word).forEach((letter) => {
          const letterSpan = document.createElement('span');
          letterSpan.className = 'inline-block transition-all duration-slower hover:text-neon-green hover:scale-110';
          letterSpan.innerText = letter;
          
          // Add event listeners for ripple effect
          letterSpan.addEventListener('mouseenter', createRippleEffect);
          
          wordSpan.appendChild(letterSpan);
        });
        
        text.appendChild(wordSpan);
        
        // Add space after each word except the last one
        if (i < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = ' ';
          text.appendChild(space);
        }
      });
    }
    
    // Initialize animation for the heading with slower, more organic motion
    if (headingRef.current) {
      gsap.from(headingRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out",
      });
    }
    
    // Cleanup function
    return () => {
      // Remove event listeners
      const letterSpans = document.querySelectorAll('.letter-span');
      letterSpans.forEach(span => {
        span.removeEventListener('mouseenter', createRippleEffect);
      });
    };
  }, []);

  const createRippleEffect = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    
    // Create ripple element with more subdued, foggy effect
    const ripple = document.createElement('span');
    ripple.className = 'absolute w-full h-full bg-white/10 rounded-full scale-0 origin-center';
    
    // Position ripple
    target.style.position = 'relative';
    target.appendChild(ripple);
    
    // Animate ripple with slower, more ethereal motion
    gsap.to(ripple, {
      scale: 4,
      opacity: 0,
      duration: 1.2,
      ease: "power1.out",
      onComplete: () => {
        ripple.remove();
      }
    });
  };

  const handleRadialMenuClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    // Handle navigation or state change based on selection
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Gradient background with foggy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-200/40 via-sage-50/30 to-mist-100/60"></div>
      
      {/* Soft blurred orbs in background */}
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
        
        <h1 
          ref={headingRef}
          className="font-serif text-5xl md:text-7xl font-extralight text-mist-800 mb-8 leading-tight"
        >
          <span className="block ethereal-text">The Realization</span>
          <span 
            ref={rippleTextRef}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400/80 via-peach-300/80 to-sage-400/80"
          >
            Toolkit
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="max-w-2xl mx-auto text-mist-700 text-lg mb-16 font-light"
        >
          Attune to your rhythm and discover tools for personal transformation. 
          Our immersive experience guides you through a digital ritual of self-discovery.
        </motion.p>
        
        {/* Radial Menu with glass morphism effect */}
        <div className="relative w-64 h-64 mx-auto mt-8">
          {/* Orbital path guide */}
          <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full border border-white/10 transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Center button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full 
                      foggy-glass border border-white/20 flex items-center justify-center z-10 pulse-soft"
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="text-mist-700 font-light">Begin</span>
          </motion.div>
          
          {/* Orbit items */}
          {['Discover', 'Learn', 'Connect', 'Transform'].map((text, index) => {
            const angle = (index * Math.PI * 2) / 4;
            const x = Math.cos(angle) * 100;
            const y = Math.sin(angle) * 100;
            
            return (
              <motion.div
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x, y }}
                transition={{ 
                  duration: 1, 
                  delay: 1 + index * 0.2,
                  type: "spring",
                  stiffness: 70,
                  damping: 15
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRadialMenuClick(text)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-14 h-14 rounded-full foggy-glass border border-white/20 
                          flex items-center justify-center cursor-pointer"
                style={{ 
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` 
                }}
              >
                <span className="text-mist-700 text-sm font-light">{text}</span>
              </motion.div>
            );
          })}
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
