import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Lenis from '@studio-freight/lenis';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-indigo-900/80 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-white font-serif text-xl">
          Realization Toolkit
        </a>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#quiz" className="text-white/80 hover:text-white transition-colors">Quiz</a>
          <a href="#tools" className="text-white/80 hover:text-white transition-colors">Tools</a>
          <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#login" 
            className="text-white/80 hover:text-white transition-colors"
          >
            Login
          </a>
          
          <motion.a
            href="#signup"
            className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.a>
          
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-serif text-xl mb-4">Realization Toolkit</h3>
            <p className="text-violet-300 mb-6">Transform your experience through digital rituals and personalized tools.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Tools</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-violet-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Subscribe</h4>
            <p className="text-violet-300 mb-4">Join our newsletter to receive updates and exclusive offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-violet-300 mb-4 md:mb-0">© 2025 Realization Toolkit. All rights reserved.</p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-violet-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-violet-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-violet-300 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

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
  orientation: 'vertical',  // Changed from 'direction' to 'orientation'
  wheelMultiplier: 1,       // Added instead of gestureDirection
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});
    
    // Integrate with GSAP
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
      
      <Header />
      
      <main>{children}</main>
      
      <Footer />
    </>
  );
};

export default Layout;
