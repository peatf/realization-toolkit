import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { NeumorphicCard, GlassModule, FloatingElement } from '../ui/NeumorphicUI';

// Make sure to register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BenefitProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const Benefit: React.FC<BenefitProps> = ({ title, description, icon, index }) => {
  const benefitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (benefitRef.current) {
      // More subtle entrance animation
      gsap.fromTo(
        benefitRef.current,
        { 
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }
    
    if (titleRef.current) {
      // Very subtle text reveal animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 15,
        duration: 1.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true
        }
      });
    }
  }, []);
  
  return (
    <motion.div
      ref={benefitRef}
      className="mb-20 md:mb-24"
      initial={{ opacity: 0 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        {/* Left column - Icon with floating effect */}
        <div className="md:col-span-3 flex justify-start md:justify-end">
          <FloatingElement 
            className="w-16 h-16 rounded-full foggy-glass flex items-center justify-center"
            amplitude={5}
            duration={8}
          >
            <span className="text-2xl text-sky-400/80">{icon}</span>
          </FloatingElement>
        </div>
        
        {/* Right column - Content with neumorphic card */}
        <div className="md:col-span-9">
          <NeumorphicCard isFoggy={true} className="p-8 backdrop-blur-sm">
            <h3 
              ref={titleRef}
              className="font-serif text-2xl md:text-3xl mb-4 text-mist-800 font-light"
            >
              {title}
            </h3>
            <p className="text-mist-700 leading-relaxed font-light">{description}</p>
            
            {/* Subtle decorative line */}
            <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent"></div>
          </NeumorphicCard>
        </div>
      </div>
    </motion.div>
  );
};

const MembershipBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (headingRef.current) {
      // Soft, subtle heading entrance
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true
        }
      });
    }
    
    if (subheadingRef.current) {
      gsap.from(subheadingRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 85%",
          once: true
        }
      });
    }
    
    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const benefits = [
    {
      title: "Personalized Resonance Mapping",
      description: "Access to custom frequency analysis that identifies your unique resonance pattern, helping you align with your authentic self and purpose.",
      icon: "✧",
      index: 0
    },
    {
      title: "Exclusive Digital Rituals",
      description: "Monthly guided experiences designed to attune your mindset and energy to specific intentions, conducted through our immersive digital interface.",
      icon: "○",
      index: 1
    },
    {
      title: "Community Constellation",
      description: "Join our network of like-minded individuals for collaborative growth, shared insights, and meaningful connections that transcend geographical boundaries.",
      icon: "⟡",
      index: 2
    },
    {
      title: "Toolkit Access",
      description: "Unlimited use of our proprietary set of digital tools for personal transformation, including meditation guides, frequency generators, and pattern recognition software.",
      icon: "⌘",
      index: 3
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
    >
      {/* Soft gradient background with fog effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-100/70 to-sage-50/50"></div>
      
      {/* Decorative elements - soft, blurred circular shapes */}
      <FloatingElement
        className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-sky-200/10 blur-3xl"
        amplitude={15}
        duration={12}
      />
      <FloatingElement
        className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-peach-200/10 blur-3xl"
        amplitude={20}
        duration={15}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with glass effect */}
        <GlassModule
          className="max-w-3xl mx-auto text-center mb-24 md:mb-32 p-10 rounded-3xl"
          blur="md"
          opacity="low"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-4"
          >
            <span className="font-mono text-mist-600 tracking-widest uppercase text-sm">Membership Benefits</span>
          </motion.div>
          
          <h2 
            ref={headingRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-mist-800 leading-tight font-extralight"
          >
            Transform Your Experience
          </h2>
          
          <p 
            ref={subheadingRef}
            className="text-mist-700 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Our membership unlocks a suite of tools and experiences designed to guide your journey 
            toward self-discovery and personal transformation.
          </p>
        </GlassModule>
        
        {/* Benefits list */}
        <div className="max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <Benefit 
              key={benefit.index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              index={benefit.index}
            />
          ))}
        </div>
        
        {/* CTA with glass effect */}
        <div className="mt-24 text-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="px-10 py-5 foggy-glass rounded-full text-mist-800 font-light 
                     tracking-wide border border-white/20 shadow-neu-md"
          >
            Become a Member
          </motion.button>
          
          <p className="mt-5 text-mist-600 text-sm font-light">
            Begin your journey today and unlock your full potential
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
