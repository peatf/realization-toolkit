import React, { useRef } from 'react';

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
  animated = false // Change default to false!
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