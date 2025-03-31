/**
 * CSS Animation utilities for simple transitions and effects
 */

/**
 * Sets up an Intersection Observer to trigger animations when elements enter the viewport
 * @param selector The CSS selector for elements to observe
 * @param className The class name to add when elements enter the viewport
 * @param threshold The visibility threshold (0-1) to trigger the animation
 * @param rootMargin Optional root margin value (default: "0px")
 */
export const setupScrollAnimations = (
  selector: string,
  className: string,
  threshold: number = 0.1,
  rootMargin: string = "0px"
): IntersectionObserver | null => {
  if (typeof window === 'undefined') return null;
  
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return null;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          // Optionally unobserve after triggering the animation
          // observer.unobserve(entry.target);
        } else {
          // Optionally remove the class when element leaves viewport
          // entry.target.classList.remove(className);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );
  
  elements.forEach((element) => observer.observe(element));
  
  return observer;
};

/**
 * Adds animation classes to elements using data attributes
 * Usage: Add data-animation="fade-in" data-delay="0.2" to elements
 */
export const initializeAnimations = (): void => {
  if (typeof window === 'undefined') return;
  
  const animatedElements = document.querySelectorAll('[data-animation]');
  
  animatedElements.forEach((element) => {
    const animationClass = element.getAttribute('data-animation');
    const delay = element.getAttribute('data-delay') || '0';
    const duration = element.getAttribute('data-duration') || '0.5';
    
    if (animationClass) {
      element.classList.add(animationClass);
      (element as HTMLElement).style.animationDelay = `${delay}s`;
      (element as HTMLElement).style.animationDuration = `${duration}s`;
    }
  });
};

/**
 * Debounces scroll events for better performance
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 */
export const debounce = (func: Function, wait: number = 20): (...args: any[]) => void => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: any[]): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Creates a parallax scroll effect using CSS transform
 * @param selector The CSS selector for elements to apply parallax to
 * @param speedFactor The speed factor for the parallax effect (negative moves opposite to scroll)
 */
export const setupParallaxScroll = (selector: string, speedFactor: number = 0.5): void => {
  if (typeof window === 'undefined') return;
  
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (elements.length === 0) return;
  
  const handleScroll = debounce(() => {
    const scrollPosition = window.pageYOffset;
    
    elements.forEach((element) => {
      const elementOffset = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if element is in view
      if (
        scrollPosition + windowHeight > elementOffset &&
        scrollPosition < elementOffset + elementHeight
      ) {
        const yOffset = (scrollPosition - elementOffset) * speedFactor;
        element.style.transform = `translateY(${yOffset}px)`;
      }
    });
  }, 10);
  
  window.addEventListener('scroll', handleScroll);
  
  // Call once to set initial position
  handleScroll();
};

/**
 * Checks if reduced motion is preferred and disables animations accordingly
 * @returns boolean indicating if reduced motion is preferred
 */
export const respectReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Add a class to the document to disable animations
    document.documentElement.classList.add('reduced-motion');
  }
  
  return prefersReducedMotion;
};

// Common animation classes that can be used with the utility functions
export const animationClasses = {
  fadeIn: 'fade-in',
  fadeInUp: 'fade-in-up',
  fadeInDown: 'fade-in-down',
  fadeInLeft: 'fade-in-left',
  fadeInRight: 'fade-in-right',
  scaleIn: 'scale-in',
  rotateIn: 'rotate-in',
  slideInUp: 'slide-in-up',
  slideInDown: 'slide-in-down',
  slideInLeft: 'slide-in-left',
  slideInRight: 'slide-in-right',
  blurIn: 'blur-in',
};

// Export default for convenience
export default {
  setupScrollAnimations,
  initializeAnimations,
  debounce,
  setupParallaxScroll,
  respectReducedMotion,
  animationClasses,
};
