import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Custom cursor component
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Main cursor follows mouse with a slight delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Dot follows mouse exactly
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };
    
    const handleMouseEnter = () => {
      cursor.classList.remove('opacity-0');
      cursorDot.classList.remove('opacity-0');
    };
    
    const handleMouseLeave = () => {
      cursor.classList.add('opacity-0');
      cursorDot.classList.add('opacity-0');
    };
    
    // Track interactive elements to modify cursor appearance
    const handleLinkEnter = () => {
      cursor.classList.add('scale-150');
      cursorDot.classList.add('opacity-0');
    };
    
    const handleLinkLeave = () => {
      cursor.classList.remove('scale-150');
      cursorDot.classList.remove('opacity-0');
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
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/70 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-transform duration-200"
      ></div>
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
      ></div>
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
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
      </Head>
      
      <CustomCursor />
      
      <main>{children}</main>
    </>
  );
};

export default Layout;
