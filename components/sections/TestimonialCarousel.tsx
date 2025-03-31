import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { GlassModule } from '../ui/NeumorphicUI';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const TestimonialCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Creative Director",
      quote: "The Realization Toolkit brought a new dimension to my creative process. The personalized resonance mapping helped me tap into inspiration I didn't know existed.",
      avatar: "/placeholder-avatar-1.jpg"
    },
    {
      id: 2,
      name: "Samantha Chen",
      role: "Wellness Coach",
      quote: "I've incorporated the digital rituals into my client sessions with remarkable results. The structured approach to mindfulness is exactly what my practice needed.",
      avatar: "/placeholder-avatar-2.jpg"
    },
    {
      id: 3,
      name: "Jordan Taylor",
      role: "Entrepreneur",
      quote: "The community constellation feature connected me with like-minded individuals who've become invaluable collaborators. This platform goes beyond tools to create genuine connection.",
      avatar: "/placeholder-avatar-3.jpg"
    },
    {
      id: 4,
      name: "Mia Johnson",
      role: "Author & Speaker",
      quote: "I was skeptical at first, but the toolkit access has transformed how I approach my writing and speaking engagements. The pattern recognition software is particularly insightful.",
      avatar: "/placeholder-avatar-4.jpg"
    },
    {
      id: 5,
      name: "Elijah Washington",
      role: "Mindfulness Practitioner",
      quote: "The frequency generators have become an essential part of my daily practice. I've experienced notable shifts in my focus and creative output since joining.",
      avatar: "/placeholder-avatar-5.jpg"
    }
  ];
  
  useEffect(() => {
    if (!orbitRef.current) return;
    
    // Set up the 3D orbit animation with more ethereal, smooth movement
    const cards = orbitRef.current.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    const radius = 250; // Orbit radius
    
    // Initial setup - position cards in a circle with smoother animation
    positionCards(activeIndex);
    
    // Add mousemove effect for subtle movement - even more subtle and dreamy
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isAnimating) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate mouse position relative to center - reduce effect for subtlety
        const mouseX = (e.clientX - centerX) / 80; // More subtle
        const mouseY = (e.clientY - centerY) / 80; // More subtle
        
        // Apply gentle tilt to the orbit with slower animation
        gsap.to(orbitRef.current, {
          rotationX: -mouseY,
          rotationY: mouseX,
          duration: 1.8, // Slower, more dreamlike
          ease: "power1.out" // Gentler easing
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Function to position cards in 3D space with smoother transitions
    function positionCards(centerIndex: number) {
      cards.forEach((card, index) => {
        // Calculate angle based on position relative to center
        const angleOffset = ((index - centerIndex) / totalCards) * Math.PI * 2;
        
        // Calculate 3D position
        const x = Math.sin(angleOffset) * radius;
        const z = Math.cos(angleOffset) * radius;
        const scale = index === centerIndex ? 1 : 0.85; // Less dramatic scaling
        const opacity = index === centerIndex ? 1 : 0.7; // Higher minimum opacity
        
        // Apply position with GSAP - slower, more ethereal
        gsap.to(card, {
          x,
          z,
          scale,
          opacity,
          duration: 1.5, // Slower transition
          ease: "power2.out"
        });
        
        // Set z-index based on z position for proper layering
        (card as HTMLElement).style.zIndex = z < 0 ? '1' : '10';
      });
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeIndex, isAnimating]);
  
  const rotateCarousel = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % testimonials.length
      : (activeIndex - 1 + testimonials.length) % testimonials.length;
    
    setActiveIndex(newIndex);
    
    // Animation completes after transition
    setTimeout(() => setIsAnimating(false), 1500); // Longer timeout to match slower animation
  };
  
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-mist-100/70"></div>
      
      {/* Background elements - subtle, foggy circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-peach-200/30 blur-3xl"></div>
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <GlassModule
          className="max-w-3xl mx-auto text-center mb-24 p-10 rounded-3xl"
          blur="md"
          opacity="low"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-4"
          >
            <span className="font-mono text-mist-600 tracking-widest uppercase text-sm">Testimonials</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-mist-800 mb-6 font-extralight">
            Transformative Experiences
          </h2>
          
          <p className="text-mist-700 text-lg max-w-2xl mx-auto font-light">
            Hear from our members about their journey with the Realization Toolkit
            and the impact it's had on their personal and professional lives.
          </p>
        </GlassModule>
        
        {/* 3D Carousel with more ethereal styling */}
        <div className="relative h-[500px] perspective-1000 mb-16">
          {/* Orbit container */}
          <div 
            ref={orbitRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card absolute w-80 h-auto foggy-glass 
                           rounded-3xl p-8 border border-white/20 transform 
                           -translate-x-1/2 -translate-y-1/2 transition-all 
                           duration-slower ${index === activeIndex ? 'z-10' : 'z-0'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100/50 to-peach-100/50 
                               flex items-center justify-center text-xl text-mist-800 font-light backdrop-blur-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-5">
                    <h4 className="text-mist-800 font-light text-lg">{testimonial.name}</h4>
                    <p className="text-mist-600 text-sm font-light">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-mist-700 italic mb-4 font-light leading-relaxed">"{testimonial.quote}"</p>
                
                {/* Decorative elements - more subtle */}
                <div className="absolute top-4 right-4 text-mist-500/20 text-3xl font-serif">❝</div>
                <div className="absolute bottom-4 right-6 text-mist-500/20 text-3xl font-serif">❞</div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons - more neumorphic, subtle */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => rotateCarousel('prev')}
              className="w-14 h-14 rounded-full foggy-glass border border-white/20 
                       flex items-center justify-center text-mist-700 shadow-neu-sm"
              disabled={isAnimating}
            >
              <span className="text-xl">←</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => rotateCarousel('next')}
              className="w-14 h-14 rounded-full foggy-glass border border-white/20 
                       flex items-center justify-center text-mist-700 shadow-neu-sm"
              disabled={isAnimating}
            >
              <span className="text-xl">→</span>
            </motion.button>
          </div>
        </div>
        
        {/* Indicator dots - more subtle styling */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== activeIndex) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 1500);
                }
              }}
              className={`transition-all duration-slower ${
                index === activeIndex 
                  ? 'w-10 h-2 bg-sky-300/50 rounded-full' 
                  : 'w-2 h-2 bg-mist-400/30 rounded-full'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
