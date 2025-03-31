import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { createScrollAnimation, createSplitTextAnimation } from '../animations/gsapUtils';

gsap.registerPlugin(ScrollTrigger);

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
      createScrollAnimation(benefitRef.current, {
        from: { opacity: 0, y: 50 },
        scrub: false,
        start: "top 85%",
      });
    }
    
    if (titleRef.current) {
      createSplitTextAnimation(titleRef.current, 'words', 0.03);
    }
  }, []);
  
  return (
    <motion.div
      ref={benefitRef}
      className="mb-16 md:mb-24"
      initial={{ opacity: 0 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
        {/* Left column - Icon */}
        <div className="md:col-span-3 flex justify-start md:justify-end">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        
        {/* Right column - Content */}
        <div className="md:col-span-9">
          <h3 
            ref={titleRef}
            className="font-serif text-2xl md:text-3xl mb-4 text-white"
          >
            {title}
          </h3>
          <p className="text-violet-200 leading-relaxed">{description}</p>
          
          {/* Decorative line */}
          <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
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
      createSplitTextAnimation(headingRef.current, 'words', 0.05);
    }
    
    if (subheadingRef.current) {
      createScrollAnimation(subheadingRef.current, {
        from: { opacity: 0, y: 30 },
        start: "top 85%",
      });
    }
    
    // Create a timeline for section reveal
    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl.from(".benefit-decorative-circle", {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
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
      className="py-20 md:py-32 bg-gradient-to-b from-indigo-900 to-violet-900 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl benefit-decorative-circle"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl benefit-decorative-circle"></div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="font-mono text-violet-300 tracking-widest uppercase text-sm">Membership Benefits</span>
          </motion.div>
          
          <h2 
            ref={headingRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight"
          >
            Transform Your Experience
          </h2>
          
          <p 
            ref={subheadingRef}
            className="text-violet-200 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Our membership unlocks a suite of tools and experiences designed to guide your journey 
            toward self-discovery and personal transformation.
          </p>
        </div>
        
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
        
        {/* CTA */}
        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full text-white font-medium tracking-wide shadow-lg shadow-indigo-500/30"
          >
            Become a Member
          </motion.button>
          
          <p className="mt-4 text-violet-300 text-sm">
            Begin your journey today and unlock your full potential
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
