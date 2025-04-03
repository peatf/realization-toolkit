import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { Testimonial } from '../../data/testimonialData';

// Improved Star component with individual lifecycle
interface StarProps {
  id: number;
  left: number; 
  top: number;
}

const Star: React.FC<StarProps> = ({ id, left, top }) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [intensity, setIntensity] = useState(0);
  
  // Random duration between 4-8 seconds for each star's lifecycle
  const duration = useMemo(() => 4000 + Math.random() * 4000, []);
  
  // Random delay for staggered animation starts (0-10 seconds)
  const initialDelay = useMemo(() => Math.random() * 10000, []);
  
  // Control the star's glow cycle
  useEffect(() => {
    // Initial delay before starting the animation cycle
    const startTimeout = setTimeout(() => {
      const glowCycle = () => {
        // Glow up
        setIsGlowing(true);
        
        // Randomly vary the intensity for each cycle
        setIntensity(0.6 + Math.random() * 0.4); // between 0.6-1.0
        
        // Schedule glow down
        const glowDuration = duration * (0.3 + Math.random() * 0.4); // 30-70% of total duration
        const dimTimeout = setTimeout(() => {
          setIsGlowing(false);
          
          // Schedule next glow with a small pause
          const pauseDuration = duration * (0.2 + Math.random() * 0.3); // 20-50% of total duration
          const pauseTimeout = setTimeout(glowCycle, pauseDuration);
          
          return () => clearTimeout(pauseTimeout);
        }, glowDuration);
        
        return () => clearTimeout(dimTimeout);
      };
      
      glowCycle();
    }, initialDelay);
    
    return () => clearTimeout(startTimeout);
  }, [duration, initialDelay]);
  
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
    >
      {/* Base star dot - always visible */}
      <div
        className="absolute"
        style={{
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: isGlowing ? '#fff' : '#666',
          opacity: isGlowing ? 1 : 0.5,
          transform: `scale(${isGlowing ? 1.2 : 1})`,
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1,
        }}
      />
      
      {/* Glow effect with smooth transitions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isGlowing ? intensity : 0,
          scale: isGlowing ? 1 + intensity : 0.5
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
        className="absolute"
        style={{
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
    </div>
  );
};

// Improved StarsBackground component
const StarsBackground: React.FC = () => {
  // Generate fixed star positions once
  const starPositions = useMemo(() => {
    const totalStars = 50;
    return Array.from({ length: totalStars }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
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
      {starPositions.map((star) => (
        <Star
          key={`star-${star.id}`}
          id={star.id}
          left={star.left}
          top={star.top}
        />
      ))}
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
        minHeight: '320px',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
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
          className="relative max-w-3xl mx-auto px-12"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ArrowButton direction="prev" onClick={prevSlide} />
          
          <div className="overflow-hidden">
            <div className="relative overflow-hidden" style={{ height: '420px' }}>
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
                  className="absolute top-0 left-0 w-full px-4"
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