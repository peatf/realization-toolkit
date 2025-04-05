import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export function initSectionObserver() {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  // Register GSAP plugins
  if (gsap) {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn("GSAP not available");
    return;
  }
  
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    // Get all sections that should be animated on scroll
    const sections = document.querySelectorAll('.section-animated');
    
    if (!sections.length) {
      console.log("No animated sections found");
      return;
    }
    
    sections.forEach((section, index) => {
      // Initial state - slightly transparent but VISIBLE
      gsap.set(section, { 
        opacity: 0.85, // Start mostly visible!
        y: 15
      });
      
      // Create scroll trigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => {
          // Animate to fully visible
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        once: true
      });
    });
  }, 100); // Short delay to ensure DOM is ready
}