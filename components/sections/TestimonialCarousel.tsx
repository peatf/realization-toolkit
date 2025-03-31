import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

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
    
    // Set up the 3D orbit animation
    const cards = orbitRef.current.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    const radius = 250; // Orbit radius
    
    // Initial setup - position cards in a circle
    positionCards(activeIndex);
    
    // Add mousemove effect for subtle movement
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isAnimating) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate mouse position relative to center
        const mouseX = (e.clientX - centerX) / 50;
        const mouseY = (e.clientY - centerY) / 50;
        
        // Apply subtle tilt to the orbit
        gsap.to(orbitRef.current, {
          rotationX: -mouseY,
          rotationY: mouseX,
          duration: 1,
          ease: "power2.out"
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Function to position cards in 3D space
    function positionCards(centerIndex: number) {
      cards.forEach((card, index) => {
        // Calculate angle based on position relative to center
        const angleOffset = ((index - centerIndex) / totalCards) * Math.PI * 2;
        
        // Calculate 3D position
        const x = Math.sin(angleOffset) * radius;
        const z = Math.cos(angleOffset) * radius;
        const scale = index === centerIndex ? 1 : 0.7;
        const opacity = index === centerIndex ? 1 : 0.6;
        
        // Apply position with GSAP
        gsap.to(card, {
          x,
          z,
          scale,
          opacity,
          duration: 0.8,
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
    setTimeout(() => setIsAnimating(false), 800);
  };
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-violet-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/30 blur-3xl"></div>
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="font-mono text-violet-300 tracking-widest uppercase text-sm">Testimonials</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Transformative Experiences
          </h2>
          
          <p className="text-violet-200 text-lg max-w-2xl mx-auto">
            Hear from our members about their journey with the Realization Toolkit
            and the impact it's had on their personal and professional lives.
          </p>
        </div>
        
        {/* 3D Carousel */}
        <div className="relative h-[500px] perspective-1000 mb-12">
          {/* Orbit container */}
          <div 
            ref={orbitRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card absolute w-80 h-auto bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-800 ${
                  index === activeIndex ? 'z-10' : 'z-0'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-xl text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-violet-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/90 italic mb-4">"{testimonial.quote}"</p>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 text-white/20 text-2xl">❝</div>
                <div className="absolute bottom-2 right-4 text-white/20 text-2xl">❞</div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => rotateCarousel('prev')}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
              disabled={isAnimating}
            >
              ←
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => rotateCarousel('next')}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
              disabled={isAnimating}
            >
              →
            </motion.button>
          </div>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== activeIndex) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 800);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-white w-6' : 'bg-white/40'
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
