import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { floatingVariants, fadeInUpProps } from '../animations/framerMotionUtils';
import gsap from 'gsap';

interface PricingOption {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  accent: string;
  recommended?: boolean;
}

const FloatingOrb: React.FC<{
  size: number;
  color: string;
  delay: number;
  duration: number;
  x: number;
  y: number;
}> = ({ size, color, delay, duration, x, y }) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-70 blur-md pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
      }}
      variants={floatingVariants(30, duration)}
      initial="initial"
      animate="animate"
      transition={{ delay }}
    />
  );
};

const PricingOption: React.FC<{
  option: PricingOption;
  isActive: boolean;
  onSelect: () => void;
}> = ({ option, isActive, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      
      // Glow effect on active card
      if (isActive) {
        gsap.to(card, {
          boxShadow: `0 0 30px 5px ${option.accent}40`,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        gsap.to(card, {
          boxShadow: '0 0 0 0 transparent',
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }
  }, [isActive, option.accent]);
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'bg-white/15 border-white/30 transform -translate-y-2' 
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
      onClick={onSelect}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
    >
      {option.recommended && (
        <div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium"
          style={{ backgroundColor: option.accent, color: '#fff' }}
        >
          Recommended
        </div>
      )}
      
      <h3 className="text-2xl font-serif text-white mb-2">{option.name}</h3>
      
      <div className="mb-4">
        <span className="text-4xl font-light text-white">${option.price}</span>
        <span className="text-violet-300 ml-1">/{option.interval}</span>
      </div>
      
      <p className="text-violet-200 mb-6">{option.description}</p>
      
      <ul className="space-y-3 mb-8">
        {option.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span 
              className="mr-2 mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: option.accent }}
            >
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-white">{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button
        className="w-full py-3 rounded-lg text-white font-medium"
        style={{ 
          backgroundColor: isActive ? option.accent : 'rgba(255, 255, 255, 0.1)',
          border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {isActive ? 'Select Plan' : 'Learn More'}
      </motion.button>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const [activeOption, setActiveOption] = useState('premium');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const pricingOptions: PricingOption[] = [
    {
      id: 'essential',
      name: 'Essential',
      price: 9,
      interval: 'month',
      description: 'Begin your journey with foundational tools',
      features: [
        'Basic Resonance Mapping',
        'Monthly Digital Ritual Access',
        'Community Access (Read-Only)',
        'Standard Toolkit Suite'
      ],
      accent: '#8B5CF6', // Violet-500
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19,
      interval: 'month',
      description: 'Enhanced tools and personalized experience',
      features: [
        'Advanced Resonance Mapping',
        'Unlimited Digital Rituals',
        'Full Community Participation',
        'Complete Toolkit Access',
        'Personal Frequency Analysis'
      ],
      accent: '#818CF8', // Indigo-400
      recommended: true,
    },
    {
      id: 'visionary',
      name: 'Visionary',
      price: 39,
      interval: 'month',
      description: 'Comprehensive suite for dedicated practitioners',
      features: [
        'Master Resonance Mapping',
        'Custom Digital Ritual Creation',
        'Community Leadership Access',
        'Complete Toolkit + Beta Features',
        'Personal Frequency Analysis',
        'One-on-One Guidance Session'
      ],
      accent: '#C4B5FD', // Violet-300
    }
  ];
  
  useEffect(() => {
    if (sectionRef.current) {
      // Add parallax effect to orbs on scroll
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const orbs = sectionRef.current?.querySelectorAll('.floating-orb');
        
        orbs?.forEach((orb, index) => {
          const speed = index % 2 === 0 ? 0.05 : -0.05;
          const yOffset = scrollPosition * speed;
          gsap.to(orb, {
            y: yOffset,
            duration: 0.5,
            ease: "power1.out"
          });
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden"
    >
      {/* Floating orbs background */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingOrb size={200} color="#8B5CF6" delay={0} duration={8} x={10} y={20} />
        <FloatingOrb size={300} color="#6366F1" delay={0.5} duration={10} x={80} y={60} />
        <FloatingOrb size={150} color="#A78BFA" delay={1} duration={7} x={70} y={15} />
        <FloatingOrb size={250} color="#C4B5FD" delay={1.5} duration={9} x={20} y={70} />
        <FloatingOrb size={180} color="#818CF8" delay={2} duration={8.5} x={90} y={90} />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            {...fadeInUpProps(0, 0.8)}
            className="mb-4"
          >
            <span className="font-mono text-violet-300 tracking-widest uppercase text-sm">Pricing</span>
          </motion.div>
          
          <motion.h2 
            {...fadeInUpProps(0.1, 0.8)}
            className="font-serif text-4xl md:text-5xl text-white mb-6"
          >
            Choose Your Path
          </motion.h2>
          
          <motion.p 
            {...fadeInUpProps(0.2, 0.8)}
            className="text-violet-200 text-lg max-w-2xl mx-auto"
          >
            Select the membership tier that resonates with your journey and access
            our transformative tools at your own pace.
          </motion.p>
        </div>
        
        {/* Decision portal - pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          {/* Portal light effect behind cards */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 blur-3xl -z-10"></div>
          
          {pricingOptions.map((option) => (
            <motion.div
              key={option.id}
              {...fadeInUpProps(pricingOptions.findIndex(o => o.id === option.id) * 0.1 + 0.3, 0.8)}
            >
              <PricingOption
                option={option}
                isActive={activeOption === option.id}
                onSelect={() => setActiveOption(option.id)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Satisfaction guarantee */}
        <motion.div 
          {...fadeInUpProps(0.7, 0.8)}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
            <p className="text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-violet-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              30-Day Resonance Guarantee — Begin your journey risk-free
            </p>
          </div>
          
          <p className="mt-4 text-violet-300 text-sm max-w-lg mx-auto">
            If you don't feel a shift in your personal frequency within 30 days, 
            we'll refund your membership completely.
          </p>
        </motion.div>
        
        {/* FAQ link */}
        <motion.div 
          {...fadeInUpProps(0.8, 0.8)}
          className="mt-12 text-center"
        >
          <a href="#faq" className="text-violet-300 underline hover:text-white transition-colors">
            Have questions? View our Frequently Asked Questions
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
