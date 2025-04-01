import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id, 
  fullHeight = false 
}) => {
  return (
    <section 
      id={id}
      className={`
        relative z-0 px-4 md:px-8
        ${fullHeight ? 'min-h-screen' : 'py-16 md:py-24'} 
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default Section;