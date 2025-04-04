import { useEffect } from 'react';

export function initSectionObserver() {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  const sections = document.querySelectorAll('.section-animated');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        // Optional: remove class when section is not visible
        // entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });
  
  sections.forEach(section => observer.observe(section));
  
  // Handle the gooey menu sticky behavior
  const menuSection = document.getElementById('gooey-menu-section');
  const contentSections = document.querySelectorAll('section:not(#gooey-menu-section):not(#opening)');
  
  // Create observer for sections following the menu
  const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight / 2) {
        // Content section is entering viewport, hide menu
        if (menuSection) menuSection.classList.add('section-hidden');
      } else if (!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight) {
        // Content section is leaving viewport upward, show menu again
        if (menuSection) menuSection.classList.remove('section-hidden');
      }
    });
  }, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '0px'
  });
  
  // Observe first content section after menu
  if (contentSections.length > 0) {
    menuObserver.observe(contentSections[0]);
  }
  
  return () => {
    sections.forEach(section => observer.unobserve(section));
    if (contentSections.length > 0) {
      menuObserver.unobserve(contentSections[0]);
    }
  };
}