import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
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
    
    window.addEventListener('scroll', updateScrollTrigger, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateScrollTrigger);
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
