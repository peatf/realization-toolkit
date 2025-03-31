import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Ensure GSAP plugins are registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Try to register SplitText if it's available
  try {
    // @ts-ignore - This will be ignored if SplitText doesn't exist
    const { SplitText } = require('gsap/dist/SplitText');
    gsap.registerPlugin(SplitText);
  } catch (e) {
    console.warn('SplitText plugin not available. Using fallback implementation.');
  }
}

/**
 * Creates a ripple text effect for a given element
 * @param element The text element to apply the ripple effect to
 */
export const createRippleTextEffect = (element: HTMLElement) => {
  if (!element) return;
  
  const text = element.innerText;
  element.innerHTML = '';
  
  // Create spans for each character
  Array.from(text).forEach((char) => {
    const charSpan = document.createElement('span');
    charSpan.className = 'inline-block transition-all duration-300 hover:scale-110';
    charSpan.innerText = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
    
    // Add event listener for ripple effect
    charSpan.addEventListener('mouseenter', (e) => {
      const target = e.currentTarget as HTMLElement;
      createRippleOnElement(target);
    });
    
    element.appendChild(charSpan);
  });
};

/**
 * Creates a ripple animation on a specified element
 * @param element The element to apply the ripple to
 */
export const createRippleOnElement = (element: HTMLElement) => {
  // Create ripple element
  const ripple = document.createElement('span');
  ripple.className = 'absolute w-full h-full bg-white/20 rounded-full scale-0 origin-center';
  
  // Position ripple
  const elementPosition = window.getComputedStyle(element).position;
  if (elementPosition !== 'relative' && elementPosition !== 'absolute') {
    element.style.position = 'relative';
  }
  element.appendChild(ripple);
  
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

/**
 * Creates a screen fracture transition effect
 * @param container The container element to fracture
 * @param onComplete Callback function to execute after the transition
 */
export const createScreenFractureEffect = (container: HTMLElement, onComplete?: () => void) => {
  // Number of fracture pieces
  const numPieces = 12;
  const fractureContainer = document.createElement('div');
  fractureContainer.className = 'absolute inset-0 z-50 pointer-events-none';
  document.body.appendChild(fractureContainer);
  
  // Take a "screenshot" of the current page
  html2canvas(container).then(canvas => {
    const width = canvas.width;
    const height = canvas.height;
    
    // Create fracture pieces
    for (let i = 0; i < numPieces; i++) {
      const piece = document.createElement('div');
      piece.className = 'absolute';
      
      // Randomly position and size each piece
      const randomX = Math.floor(Math.random() * width);
      const randomY = Math.floor(Math.random() * height);
      const randomWidth = Math.floor(Math.random() * (width / 3) + 100);
      const randomHeight = Math.floor(Math.random() * (height / 3) + 100);
      
      // Create a clipped version of the screenshot
      const pieceCanvas = document.createElement('canvas');
      const context = pieceCanvas.getContext('2d');
      pieceCanvas.width = randomWidth;
      pieceCanvas.height = randomHeight;
      
      // Draw a portion of the screenshot onto this piece
      context?.drawImage(
        canvas,
        randomX, randomY, randomWidth, randomHeight,
        0, 0, randomWidth, randomHeight
      );
      
      piece.style.left = `${randomX}px`;
      piece.style.top = `${randomY}px`;
      piece.style.width = `${randomWidth}px`;
      piece.style.height = `${randomHeight}px`;
      piece.style.backgroundImage = `url(${pieceCanvas.toDataURL()})`;
      piece.style.backgroundSize = 'cover';
      
      fractureContainer.appendChild(piece);
      
      // Animate each piece flying off
      gsap.to(piece, {
        x: gsap.utils.random(-500, 500),
        y: gsap.utils.random(-500, 500),
        rotation: gsap.utils.random(-180, 180),
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: i * 0.05
      });
    }
    
    // Remove the fracture container after animation
    gsap.delayedCall(2, () => {
      fractureContainer.remove();
      if (onComplete) onComplete();
    });
  });
};

/**
 * Creates a scroll-triggered animation for an element
 * @param element The element to animate
 * @param animation Animation configuration
 */
export const createScrollAnimation = (element: HTMLElement, animation: {
  from: gsap.TweenVars,
  to?: gsap.TweenVars,
  scrub?: boolean,
  start?: string,
  end?: string,
  markers?: boolean
}) => {
  if (!element) return;
  
  const { from, to, scrub = false, start = "top bottom", end = "bottom center", markers = false } = animation;
  
  // Create the initial state
  gsap.set(element, from);
  
  // Create the scroll-triggered animation
  ScrollTrigger.create({
    trigger: element,
    start,
    end,
    scrub,
    markers,
    onEnter: () => {
      gsap.to(element, to || { ...from, opacity: 1, y: 0, x: 0, scale: 1 });
    },
    onLeave: scrub ? undefined : () => {},
    onEnterBack: scrub ? undefined : () => {
      gsap.to(element, to || { ...from, opacity: 1, y: 0, x: 0, scale: 1 });
    },
    onLeaveBack: scrub ? undefined : () => {}
  });
};

/**
 * Fallback implementation for SplitText
 * @param element The element to split
 * @param type The type of split ('chars', 'words', or 'lines')
 * @returns An object with keys for the split types
 */
const fallbackSplitText = (element: HTMLElement, type: string | string[]) => {
  const types = Array.isArray(type) ? type : [type];
  const result: any = {};
  
  if (types.includes('chars')) {
    const chars: HTMLElement[] = [];
    const text = element.innerText;
    element.innerHTML = '';
    
    Array.from(text).forEach(char => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.innerText = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
      chars.push(span);
    });
    
    result.chars = chars;
  }
  
  if (types.includes('words')) {
    const words: HTMLElement[] = [];
    if (!types.includes('chars')) {
      const text = element.innerText;
      element.innerHTML = '';
      
      text.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.innerText = word;
        element.appendChild(span);
        
        // Add space after word except for the last one
        if (word !== text.split(' ').pop()) {
          element.appendChild(document.createTextNode(' '));
        }
        
        words.push(span);
      });
    } else {
      // If chars are already split, group them into words
      const wordElements = element.querySelectorAll('.split-word');
      wordElements.forEach(word => words.push(word as HTMLElement));
    }
    
    result.words = words;
  }
  
  if (types.includes('lines')) {
    // This is a simplified implementation that may not be accurate for all cases
    // A proper line splitting would require more complex layout calculations
    const lineElements = element.querySelectorAll('.split-line');
    const lines: HTMLElement[] = [];
    
    lineElements.forEach(line => lines.push(line as HTMLElement));
    result.lines = lines;
  }
  
  return result;
};

/**
 * Creates a split text animation for headings and paragraphs
 * @param element The text element to animate
 * @param type The type of split ('chars', 'words', or 'lines')
 * @param staggerAmount The amount of stagger between animations
 */
export const createSplitTextAnimation = (element: HTMLElement, type: 'chars' | 'words' | 'lines' = 'words', staggerAmount: number = 0.03) => {
  if (!element || typeof window === 'undefined') return;
  
  let splitElements;
  
  try {
    // Try to use GSAP SplitText if available
    if (typeof window !== 'undefined' && (window as any).SplitText) {
      const SplitText = (window as any).SplitText;
      const splitText = new SplitText(element, { type });
      splitElements = splitText[type];
    } else {
      // Use fallback implementation
      const splitText = fallbackSplitText(element, type);
      splitElements = splitText[type];
    }
  } catch (e) {
    // If SplitText fails, use fallback
    const splitText = fallbackSplitText(element, type);
    splitElements = splitText[type];
  }
  
  if (!splitElements || splitElements.length === 0) return;
  
  // Set initial state
  gsap.set(splitElements, { opacity: 0, y: 20 });
  
  // Create scroll trigger
  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      gsap.to(splitElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerAmount,
        ease: "power3.out"
      });
    },
    once: true
  });
};

/**
 * Creates a parallax scroll effect for an element
 * @param element The element to apply parallax to
 * @param speed The speed of the parallax effect (negative values move opposite to scroll)
 */
export const createParallaxEffect = (element: HTMLElement, speed: number = -0.5) => {
  if (!element) return;
  
  gsap.to(element, {
    y: () => speed * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: true
    }
  });
};

/**
 * Initializes smooth scrolling with Lenis
 * @param options Lenis configuration options
 */
export const initSmoothScroll = (options?: any) => {
  // This would use @studio-freight/lenis
  // Implementation would depend on how you want to integrate it
  // with your existing scroll triggers
};

// Helper function to simulate html2canvas for the fracture effect
// In a real implementation, you would import the actual html2canvas library
const html2canvas = (element: HTMLElement): Promise<HTMLCanvasElement> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    const ctx = canvas.getContext('2d');
    
    // In a real implementation, html2canvas would capture the actual content
    // This is just a placeholder
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    resolve(canvas);
  });
};
