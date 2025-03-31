import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { FogBackground } from '../ui/NeumorphicUI';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Enhanced minimal custom cursor
const CustomCursor: React.FC = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const cursorOuter = cursorOuterRef.current;
    const cursorInner = cursorInnerRef.current;
    
    if (!cursorOuter || !cursorInner) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Outer cursor follows with delay for ethereal effect
      gsap.to(cursorOuter, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out"
      });
      
      // Inner dot follows exactly with slight delay
      gsap.to(cursorInner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseEnter = () => {
      cursorOuter.classList.remove('opacity-0');
      cursorInner.classList.remove('opacity-0');
    };
    
    const handleMouseLeave = () => {
      cursorOuter.classList.add('opacity-0');
      cursorInner.classList.add('opacity-0');
    };
    
    // Track interactive elements to modify cursor appearance
    const handleLinkEnter = () => {
      setIsHovering(true);
      cursorOuter.classList.add('scale-150', 'backdrop-blur-sm', 'bg-white/5');
      cursorInner.classList.add('bg-neon-green', 'scale-150');
    };
    
    const handleLinkLeave = () => {
      setIsHovering(false);
      cursorOuter.classList.remove('scale-150', 'backdrop-blur-sm', 'bg-white/5');
      cursorInner.classList.remove('bg-neon-green', 'scale-150');
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Find all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/30 
                  pointer-events-none z-50 opacity-0 mix-blend-difference
                  transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-slow"
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />
      <div 
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white/60 rounded-full 
                  pointer-events-none z-50 opacity-0 mix-blend-difference
                  transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
      />
    </>
  );
};

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Realization Toolkit', 
  description = 'Discover tools for personal transformation through our immersive digital experience.' 
}) => {
  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Slower, more ethereal scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      smoothTouch: true,
      wheelMultiplier: 0.8, // Gentler wheel scrolling
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Add Inter font for the light weight typography */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      {/* Background fog effect */}
      <FogBackground intensity="medium" />
      
      {/* Minimal custom cursor */}
      <CustomCursor />
      
      {/* Main content */}
      <main className="relative z-10">{children}</main>
    </>
  );
};

export default Layout;
