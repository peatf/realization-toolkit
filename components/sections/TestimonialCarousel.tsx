import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { Testimonial } from '../../data/testimonialData';
import OrganicBackgroundEffect from '../animations/OrganicBackgroundEffect';

// Testimonial Card
interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [hover, setHover] = useState(false);
  
  // Assign a consistent color scheme based on name to ensure testimonials keep the same colors
  const getColorScheme = () => {
    const schemes = ['default', 'cool', 'warm', 'contrast'];
    const hash = testimonial.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return schemes[hash % schemes.length] as 'default' | 'cool' | 'warm' | 'contrast';
  };
  
  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: hover ? '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'box-shadow 0.3s ease',
        minHeight: '320px',
        height: 'auto', // Allow it to grow with content
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Replace StarsBackground with OrganicBackgroundEffect */}
        <OrganicBackgroundEffect 
          intensity="subtle"
          colorScheme={getColorScheme()}
        />
        
        <div className="relative z-10">
          {testimonial.imageUrl ? (
            <div className="flex justify-center">
              <img 
                src={testimonial.imageUrl} 
                alt="Testimonial" 
                className="rounded-lg max-w-full max-h-64 object-contain"
              />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-[var(--color-foreground)] font-light mb-4 text-center">
                  {testimonial.text}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[var(--color-foreground)] font-medium">{testimonial.name}</p>
                  {testimonial.title && (
                    <p className="text-[var(--color-secondary)] text-sm">{testimonial.title}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Arrow Button
interface ArrowButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'prev' ? 'left-0 md:left-2' : 'right-0 md:right-2'} 
                z-20 p-2 md:p-3 rounded-full bg-transparent border border-[var(--color-foreground-muted)] 
                text-[var(--color-foreground)] hover:bg-[var(--color-foreground-muted)] 
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-blue)] 
                disabled:opacity-30 disabled:cursor-not-allowed`}
      aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
};

// Carousel Indicators
interface IndicatorProps {
  count: number;
  current: number;
  setCurrent: (index: number) => void;
}

const CarouselIndicators: React.FC<IndicatorProps> = ({ count, current, setCurrent }) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i)}
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{ 
            background: i === current ? 'var(--color-accent-blue)' : 'rgba(255,255,255,0.3)' 
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

// Main Testimonial Carousel Component
interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    text: "The toolkit has given me precise clarity. I'm now able to make better decisions with confidence.",
    name: "Sarah Johnson",
    title: "Entrepreneur"
  }
];

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials = defaultTestimonials }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  
  // Autoplay functionality with longer intervals
  useEffect(() => {
    if (autoplayPaused) return;
    
    const interval = setInterval(() => {
      setDirection('right');
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 12000); // 12 seconds per slide to allow for slower transitions
    
    return () => clearInterval(interval);
  }, [testimonials.length, autoplayPaused]);
  
  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide();
    }
  };
  
  const nextSlide = () => {
    setDirection('right');
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setDirection('left');
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setAutoplayPaused(true);
  };
  
  const handleMouseLeave = () => {
    setAutoplayPaused(false);
  };

  // Simpler slide animation that matches the arrow click direction
  const slideVariants = {
    // When clicking "next", current slide exits left, new slide enters from right
    next: {
      enter: { x: "100%" },
      center: { x: 0 },
      exit: { x: "-100%" }
    },
    // When clicking "prev", current slide exits right, new slide enters from left
    prev: {
      enter: { x: "-100%" },
      center: { x: 0 },
      exit: { x: "100%" }
    }
  };

  return (
    <Section id="testimonials" className="overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-12 font-light text-center">
          Transformational Results
        </h2>
        
        <div 
          className="relative max-w-3xl mx-auto px-16 pb-12" // Increased horizontal padding and added bottom padding
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ArrowButton direction="prev" onClick={prevSlide} />
          
          <div className="overflow-visible"> {/* Changed from overflow-hidden to visible */}
            <div 
              className="relative overflow-visible" // Changed from overflow-hidden to visible
              style={{ minHeight: '420px' }} // Changed from fixed height to minHeight
            >
              <AnimatePresence custom={direction} initial={false} mode="popLayout">
                <motion.div 
                  key={current}
                  custom={direction}
                  variants={slideVariants[direction === 'right' ? 'next' : 'prev']}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 w-full px-8" // Increased horizontal padding
                >
                  <TestimonialCard testimonial={testimonials[current]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <ArrowButton direction="next" onClick={nextSlide} />
          
          <CarouselIndicators 
            count={testimonials.length} 
            current={current}
            setCurrent={(index) => {
              // Set direction based on which indicator was clicked
              setDirection(index > current ? 'right' : 'left');
              setCurrent(index);
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export default TestimonialCarousel;