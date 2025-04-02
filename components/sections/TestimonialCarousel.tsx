import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Section from '../layout/Section';

// Placeholder image URL - replace if needed
const PLACEHOLDER_IMAGE = 'https://placehold.co/300x200/e2e8f0/64748b?text=Image';

// ---------- Star Component ----------
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
    ></div>
  );
};

// ---------- StarsBackground Component ----------
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

  const starPositions = useMemo(() => {
    return Array.from({ length: stars }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
  }, [stars]);

  return (
    <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none">
      {starPositions.map((pos, index) => {
        const isGlowing = glowingStars.includes(index);
        return (
          <div
            key={`star-${index}`}
            className="absolute"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              opacity: isGlowing ? 1 : 0.5,
              transform: `scale(${isGlowing ? 1.5 : 1})`,
              transition: `all 2s ease-in-out ${pos.delay}s`,
              willChange: 'transform, opacity'
            }}
          >
            <Star isGlowing={isGlowing} delay={pos.delay} />
          </div>
        );
      })}
    </div>
  );
};

// ---------- TestimonialCard Component ----------
interface TestimonialCardProps {
  testimonial: {
    text: string;
    name: string;
    title?: string;
  };
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div 
      className="relative"
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
          <div className="mb-6">
            <p className="text-[var(--color-foreground)] font-light mb-4">
              "{testimonial.text}"
            </p>
          </div>
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-[var(--color-foreground)] font-medium">{testimonial.name}</p>
              <p className="text-[var(--color-secondary)] text-sm">{testimonial.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- CarouselIndicators Component ----------
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

// ---------- ArrowButton Component ----------
interface ArrowButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}
const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'prev' ? 'left-2' : 'right-2'} 
                z-10 p-2 rounded-full bg-transparent border border-[var(--color-foreground-muted)] 
                text-[var(--color-foreground)] hover:bg-[var(--color-foreground-muted)] 
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-blue)] 
                disabled:opacity-30 disabled:cursor-not-allowed`}
      aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
};

// ---------- TestimonialCarousel Component ----------
const TestimonialCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = pearTestimonials;
  const totalTestimonials = testimonials.length;

  const rotateCarousel = (direction: 'next' | 'prev') => {
    if (isAnimating || totalTestimonials === 0) return;
    setIsAnimating(true);
    const newIndex =
      direction === 'next'
        ? (activeIndex + 1) % totalTestimonials
        : (activeIndex - 1 + totalTestimonials) % totalTestimonials;
    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== activeIndex && totalTestimonials > 0) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <Section id="testimonials-section">
      <div className="container mx-auto px-4" style={{ position: 'relative' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', maxWidth: '800px', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ marginBottom: '16px' }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '14px',
              }}
            >
              Testimonials
            </span>
          </motion.div>
          <h2 style={{ fontFamily: 'serif', fontSize: '36px', color: 'white', marginBottom: '24px', fontWeight: '200' }}>
            Transformative Experiences
          </h2>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: '300',
            }}
          >
            Hear from our members about their journey and the impact it's had.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            height: '500px',
            perspective: '1200px',
            marginBottom: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Navigation buttons */}
          <ArrowButton direction="prev" onClick={() => rotateCarousel('prev')} disabled={isAnimating} />
          <ArrowButton direction="next" onClick={() => rotateCarousel('next')} disabled={isAnimating} />

          {/* Central orbit display */}
          <div
            ref={orbitRef}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Indicator dots */}
        <CarouselIndicators count={totalTestimonials} current={activeIndex} setCurrent={goToSlide} />
      </div>
    </Section>
  );
};

export default TestimonialCarousel;
