import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OpeningSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rippleTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Initialize ripple text effect
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
          letterSpan.className = 'inline-block transition-transform duration-300 hover:scale-110';
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
    
    // Initialize animation for the heading
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true
        }
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
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'absolute w-full h-full bg-white/20 rounded-full scale-0 origin-center';
    
    // Position ripple
    target.style.position = 'relative';
    target.appendChild(ripple);
    
    // Animate ripple
    gsap.to(ripple, {
      scale: 3,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
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
      className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-indigo-900 via-purple-900 to-violet-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500 blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 rounded-full bg-purple-500 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-pink-500 blur-xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <span className="font-mono text-violet-300 tracking-widest uppercase text-sm">Begin Your Journey</span>
        </motion.div>
        
        <h1 
          ref={headingRef}
          className="font-serif text-5xl md:text-7xl font-light text-white mb-8 leading-tight"
        >
          <span className="block">The Realization</span>
          <span 
            ref={rippleTextRef}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
          >
            Toolkit
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-violet-100 text-lg mb-12"
        >
          Attune to your rhythm and discover tools for personal transformation. 
          Our immersive experience guides you through a digital ritual of self-discovery.
        </motion.p>
        
        {/* Radial Menu */}
        <div className="relative w-64 h-64 mx-auto mt-12">
          {/* Center button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center z-10"
          >
            Begin
          </motion.button>
          
          {/* Orbit items */}
          {['Discover', 'Learn', 'Connect', 'Transform'].map((text, index) => {
            const angle = (index * Math.PI * 2) / 4;
            const x = Math.cos(angle) * 100;
            const y = Math.sin(angle) * 100;
            
            return (
              <motion.button
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x, y }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + index * 0.1,
                  type: "spring"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRadialMenuClick(text)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 text-sm flex items-center justify-center"
                style={{ 
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` 
                }}
              >
                {text}
              </motion.button>
            );
          })}
          
          {/* Connecting lines */}
          <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full border border-white/10 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-10 rounded-full border border-white/30 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default OpeningSection;
