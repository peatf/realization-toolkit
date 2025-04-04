import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
// Assuming Testimonial type is defined correctly elsewhere or uncomment below
// interface Testimonial {
//   text?: string;
//   name: string;
//   title?: string;
//   imageUrl?: string;
// }
import { Testimonial } from '../../data/testimonialData'; // Adjust path as needed
import OrganicBackgroundEffect from '../animations/OrganicBackgroundEffect'; // Adjust path as needed

// --- Testimonial Card (Memoized, Refactored for Shadow) ---
// Define the TestimonialCardProps interface
interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = React.memo(({ testimonial }) => {
  const [hover, setHover] = useState(false);

  // Calculate font size based on text length
  const textFontSize = useMemo(() => {
    if (!testimonial.text) return '';
    
    const length = testimonial.text.length;
    // For mobile screens
    if (length > 300) return 'text-sm md:text-base';
    if (length > 200) return 'text-base md:text-lg';
    return 'text-lg md:text-xl';
  }, [testimonial.text]);

  const colorScheme = useMemo(() => {
    const schemes = ['default', 'cool', 'warm', 'contrast'] as const;
    const hash = testimonial.name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return schemes[hash % schemes.length];
  }, [testimonial.name]);

  const defaultShadow = '0 4px 15px rgba(0, 0, 0, 0.06)';
  const hoverShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';

  return (
    <div
      className="relative w-full"
      style={{
        transition: 'box-shadow 0.3s ease',
        boxShadow: hover ? hoverShadow : defaultShadow,
        borderRadius: '30px',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        position: 'relative',
        borderRadius: '30px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(1px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: '280px', // Slightly reduced minimum height
        maxHeight: '600px', // Added maximum height to prevent extremely tall cards
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <OrganicBackgroundEffect
          intensity="subtle"
          colorScheme={colorScheme}
          isStatic={true}
        />
        <div className="relative z-10 flex flex-col justify-between flex-grow p-6">
          {testimonial.imageUrl ? (
            <div className="flex justify-center items-center flex-grow">
              <img
                src={testimonial.imageUrl}
                alt={`${testimonial.name}'s testimonial`}
                className="rounded-lg max-w-full max-h-64 object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <>
              <div className="mb-4 flex-grow flex items-center">
                <p className={`text-[var(--color-foreground)] font-light text-center leading-relaxed ${textFontSize}`}>
                  {testimonial.text}
                </p>
              </div>
              <div className="flex items-center justify-center pt-4">
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
});


// --- Arrow Button (Memoized) ---
interface ArrowButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = React.memo(({ direction, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-12 h-12 rounded-full
               border border-[var(--color-foreground-muted)] text-[var(--color-foreground)]
               hover:bg-[var(--color-foreground-muted)] transition-colors
               disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm bg-white/10
               flex items-center justify-center
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:ring-[var(--color-accent-blue)]"
      aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
});


// --- Carousel Indicators (Memoized) ---
interface IndicatorProps {
  count: number;
  current: number;
  setCurrent: (index: number) => void;
}
const CarouselIndicators: React.FC<IndicatorProps> = React.memo(({ count, current, setCurrent }) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i)}
          className="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-[var(--color-background)] focus:ring-[var(--color-accent-blue)]"
          style={{
            background: i === current ? 'var(--color-accent-blue)' : 'rgba(255,255,255,0.3)'
          }}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current ? "true" : "false"}
        />
      ))}
    </div>
  );
});


// --- Main Testimonial Carousel Component ---
interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
    { text: "The toolkit has given me precise clarity. I'm now able to make better decisions with confidence.", name: "Sarah Johnson", title: "Entrepreneur" },
    { text: "No testimonial provided.", name: "Example Inc.", imageUrl: "https://via.placeholder.com/300x150?text=Client+Logo+1" }, // Added default text
    { text: "A fantastic resource that streamlined my entire workflow. It helped me save hours each week and focus on what truly matters for my business growth. Highly recommended for anyone looking to boost productivity!", name: "Michael Chen", title: "Project Manager" }, // Slightly longer text again
    { text: "Short and sweet.", name: "Alex Lee"}
];


const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials = defaultTestimonials }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | 'none'>('none');
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // --- Effects and Handlers (Keep from previous version) ---
  // Autoplay effect
  useEffect(() => {
    if (autoplayPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setDirection('right');
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [testimonials.length, autoplayPaused]);

  // Optimized touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
    setAutoplayPaused(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    touchEndRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartRef.current === null || touchEndRef.current === null) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Memoized navigation functions
  const nextSlide = useCallback(() => {
    if (testimonials.length <= 1) return;
    setDirection('right');
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);
  const prevSlide = useCallback(() => {
    if (testimonials.length <= 1) return;
    setDirection('left');
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);
  const goToSlide = useCallback((index: number) => {
    if (index === current) return;
    setDirection(index > current ? 'right' : 'left');
    setCurrent(index);
  }, [current]);

  // Pause on hover
  const handleMouseEnter = () => setAutoplayPaused(true);
  const handleMouseLeave = () => {
    if (touchStartRef.current === null) setAutoplayPaused(false);
  };
  // ---------------------------------------------------------

  // Animation variants
  const slideVariants = {
      enter: (direction: 'left' | 'right' | 'none') => ({ x: direction === 'right' ? '100%' : direction === 'left' ? '-100%' : '0%', opacity: 0 }),
      center: { zIndex: 1, x: 0, opacity: 1 },
      exit: (direction: 'left' | 'right' | 'none') => ({ zIndex: 0, x: direction === 'left' ? '100%' : '-100%', opacity: 0 })
  };

  return (
    <Section id="testimonials" className="overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-12 font-light text-center">
          Subscriber Celebrations
        </h2>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {/* Card Animation Area */}
          <div
            className="relative mb-0"
            aria-live="polite"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 35 },
                  opacity: { duration: 0.3 }
                }}
                className="w-full p-1 md:p-2"
                role="group"
                aria-roledescription="slide"
                aria-label={`${current + 1} of ${testimonials.length}`}
              >
                {testimonials.length > 0 && <TestimonialCard testimonial={testimonials[current]} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Area - Moved closer to card */}
          <div className="relative z-20 mt-4"> 
            {/* Indicators */}
            {testimonials.length > 1 && (
              <CarouselIndicators
                count={testimonials.length}
                current={current}
                setCurrent={goToSlide}
              />
            )}

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <ArrowButton direction="prev" onClick={prevSlide} disabled={testimonials.length <= 1} />
                <ArrowButton direction="next" onClick={nextSlide} disabled={testimonials.length <= 1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TestimonialCarousel;
