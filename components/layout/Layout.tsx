import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FogBackground } from '../ui/NeumorphicUI';
import GlobalBackground from './GlobalBackground';

gsap.registerPlugin(ScrollTrigger);

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
  const [isVisible, setIsVisible] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;
    
    const cursorOuter = cursorOuterRef.current;
    const cursorInner = cursorInnerRef.current;
    
    if (!cursorOuter || !cursorInner) return;
    
    // Throttle mouse movement using requestAnimationFrame instead of GSAP
    const handleMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      
      // Show cursor if hidden
      if (!isVisible) {
        setIsVisible(true);
        cursorOuter.classList.remove('opacity-0');
        cursorInner.classList.remove('opacity-0');
      }
    };
    
    // Update positions only in animation frame
    const updateCursorPosition = () => {
      const { x, y } = lastMousePos.current;
      
      // Direct style manipulation instead of GSAP
      if (cursorOuter) {
        cursorOuter.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      
      if (cursorInner) {
        cursorInner.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      
      frameRef.current = requestAnimationFrame(updateCursorPosition);
    };
    
    frameRef.current = requestAnimationFrame(updateCursorPosition);
    
    const handleMouseEnter = () => {
      cursorOuter?.classList.remove('opacity-0');
      cursorInner?.classList.remove('opacity-0');
    };
    
    const handleMouseLeave = () => {
      cursorOuter?.classList.add('opacity-0');
      cursorInner?.classList.add('opacity-0');
    };
    
    // Track interactive elements to modify cursor appearance
    const handleLinkEnter = () => {
      setIsHovering(true);
      cursorOuter?.classList.add('scale-150');
      cursorInner?.classList.add('bg-neon-green', 'scale-150');
    };
    
    const handleLinkLeave = () => {
      setIsHovering(false);
      cursorOuter?.classList.remove('scale-150');
      cursorInner?.classList.remove('bg-neon-green', 'scale-150');
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
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
      
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [isVisible]);
  
  // Don't render cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }
  
  return (
    <>
      <div 
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/30 
                  pointer-events-none z-50 opacity-0 mix-blend-difference
                  transform -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white/60 rounded-full 
                  pointer-events-none z-50 opacity-0 mix-blend-difference
                  transform -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

// Main Layout component
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Realization Toolkit', 
  description = 'Discover tools for personal transformation through our immersive digital experience.' 
}) => {
  // Setup Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      wheelMultiplier: 0.8,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Link with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Other head elements */}
      </Head>
      
      <GlobalBackground />
      
      <main className="relative z-0">
        {children}
      </main>
    </>
  );
};

export default Layout;
