import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { Testimonial } from '../../data/testimonialData';

// Star component (same as in PricingSection)
interface StarProps {
  isGlowing: boolean;
  delay: number;
}

const Star: React.FC<StarProps> = ({ isGlowing, delay }) => {
  return (
    <div
      style={{
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        background: isGlowing ? '#fff' : '#666',
        transition: `all 2s ease-in-out ${delay}s`,
        position: 'relative',
        zIndex: 1,
      }}
    />
  );
};

// StarsBackground component
const StarsBackground: React.FC = () => {
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const stars = 50;
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newGlowingStars = Array.from({ length: 5 }, () => Math.floor(Math.random() * stars));
      setGlowingStars(newGlowingStars);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="stars-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: stars }).map((_, index) => {
        const isGlowing = glowingStars.includes(index);
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = (index % 10) * 0.1;
        
        return (
          <div
            key={`star-${index}`}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              opacity: isGlowing ? 1 : 0.5,
              transform: `scale(${isGlowing ? 1.5 : 1})`,
              transition: `all 2s ease-in-out ${delay}s`,
            }}
          >
            <Star isGlowing={isGlowing} delay={delay} />
            {isGlowing && (
              <div
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.6)',
                  filter: 'blur(2px)',
                  top: '-2px',
                  left: '-2px',
                  boxShadow:
                    '0 0 8px 2px rgba(59, 130, 246, 0.6), 0 0 12px 4px rgba(59, 130, 246, 0.4)',
                  zIndex: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Testimonial Card
interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [hover, setHover] = useState(false);
  
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
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Background elements */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '60%', 
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)', 
          transform: 'rotate(5deg) translateY(-50%) translateX(-10%)', 
          pointerEvents: 'none' 
        }} />
        <StarsBackground />
        
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
      className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'prev' ? 'left-2 md:left-6' : 'right-2 md:right-6'} 
                z-10 p-2 md:p-3 rounded-full bg-transparent border border-[var(--color-foreground-muted)] 
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  
  // Autoplay functionality
  useEffect(() => {
    if (autoplayPaused) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 8 seconds per slide
    
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
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setAutoplayPaused(true);
  };
  
  const handleMouseLeave = () => {
    setAutoplayPaused(false);
  };

  return (
    <Section id="testimonials" className="overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-12 font-light text-center">
          Transformational Results
        </h2>
        
        <div 
          className="relative max-w-4xl mx-auto px-12"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ArrowButton direction="prev" onClick={prevSlide} />
          
          <div className="overflow-hidden">
            <div className="relative" style={{ height: '400px' }}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full"
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
            setCurrent={setCurrent}
          />
        </div>
      </div>
    </Section>
  );
};

export default TestimonialCarousel;