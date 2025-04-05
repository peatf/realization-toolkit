import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FogBackground } from '../ui/NeumorphicUI';
import GlobalBackground from './GlobalBackground';
import { initSectionObserver } from '../../utils/SectionObserver';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Main Layout component
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Realization Toolkit', 
  description = 'Discover tools for personal transformation through our immersive digital experience.' 
}) => {
  // Use browser's native scrolling and update ScrollTrigger
  useEffect(() => {
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };
    
    // Initialize section observers for animations - but don't try to use the return value
    initSectionObserver();
    
    window.addEventListener('scroll', updateScrollTrigger, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateScrollTrigger);
      // Simply remove this line that's causing the error
      // if (cleanup) cleanup(); 
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      
      <GlobalBackground />
      
      <main className="relative overflow-y-auto min-h-screen">
        {children}
      </main>
    </>
  );
};

export default Layout;
