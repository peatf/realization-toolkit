import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let scrollTriggerRegistered = false;

export function initSectionObserver() {
  // Only run on client side
  if (typeof window === 'undefined') return () => { };

  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }

  // Get all sections that should be animated on scroll
  const sections = document.querySelectorAll('.section-animated');

  if (!sections.length) {
    return () => { };
  }

  const triggers: ScrollTrigger[] = [];

  sections.forEach((section) => {
    // Initial state
    gsap.set(section, {
      opacity: 0.85,
      y: 15
    });

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    triggers.push(trigger);
  });

  // Return cleanup function
  return () => {
    triggers.forEach(t => t.kill());
  };
}
