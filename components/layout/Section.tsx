import React, { useRef, useEffect } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  animated?: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id, 
  fullHeight = false,
  animated = true
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      id={id}
      ref={sectionRef}
      className={`
        relative 
        ${fullHeight ? 'min-h-screen' : 'py-16 md:py-24'} 
        ${animated ? 'section-animated' : ''}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default Section;