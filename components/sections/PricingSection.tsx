import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingElement, GlassModule, NeumorphicButton } from '../ui/NeumorphicUI';
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
  blur: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  x: number;
  y: number;
  amplitude?: number;
  duration?: number;
}> = ({ size, color, blur, x, y, amplitude = 20, duration = 8 }) => {
  return (
    <FloatingElement
      className={`absolute rounded-full opacity-60 pointer-events-none blur-${blur}`}
      amplitude={amplitude}
      duration={duration}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div className="w-full h-full"></div>
    </FloatingElement>
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
      
      // Very subtle glow effect on active card
      if (isActive) {
        gsap.to(card, {
          boxShadow: `0 0 40px 2px ${option.accent}20`,
          duration: 1.2,
          ease: "power2.out"
        });
      } else {
        gsap.to(card, {
          boxShadow: '0 0 0 0 transparent',
          duration: 1.2,
          ease: "power2.out"
        });
      }
    }
  }, [isActive, option.accent]);
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative p-8 rounded-3xl backdrop-blur-md border transition-all duration-slower 
                cursor-pointer ${isActive 
        ? 'foggy-glass border-white/30 transform -translate-y-3' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
      onClick={onSelect}
      whileHover={{ y: -8 }}
      whileTap={{ y: -2 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {option.recommended && (
        <div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-5 py-1 rounded-full 
                   text-xs uppercase tracking-wider font-light backdrop-blur-sm"
          style={{ 
            backgroundColor: `${option.accent}30`, 
            color: option.accent 
          }}
        >
          Recommended
        </div>
      )}
      
      <h3 className="text-2xl font-serif text-mist-800 mb-3 font-light">{option.name}</h3>
      
      <div className="mb-5">
        <span className="text-4xl font-extralight text-mist-800">${option.price}</span>
        <span className="text-mist-600 ml-1 font-light">/{option.interval}</span>
      </div>
      
      <p className="text-mist-700 mb-7 font-light">{option.description}</p>
      
      <ul className="space-y-4 mb-10">
        {option.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span 
              className="mr-3 mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center opacity-70"
              style={{ backgroundColor: option.accent }}
            >
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-mist-700 font-light">{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button
        className="w-full py-4 rounded-full text-mist-100 font-light transition-all duration-slower"
        style={{ 
          backgroundColor: isActive ? `${option.accent}90` : 'rgba(255, 255, 255, 0.1)',
          border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
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
      accent: '#90ae98', // sage-400
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
      accent: '#8abeff', // sky-300
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
      accent: '#ffb08d', // peach-300
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-100/70 to-mist-100/40"></div>
      
      {/* Floating orbs background - more subtle, foggy */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingOrb size={220} color="rgba(144, 174, 152, 0.15)" blur="3xl" x={15} y={25} amplitude={15} duration={15} />
        <FloatingOrb size={320} color="rgba(138, 190, 255, 0.12)" blur="3xl" x={75} y={60} amplitude={18} duration={18} />
        <FloatingOrb size={180} color="rgba(255, 176, 141, 0.1)" blur="2xl" x={65} y={20} amplitude={12} duration={12} />
        <FloatingOrb size={280} color="rgba(196, 181, 253, 0.08)" blur="3xl" x={25} y={70} amplitude={20} duration={20} />
        <FloatingOrb size={200} color="rgba(222, 226, 230, 0.15)" blur="2xl" x={85} y={85} amplitude={14} duration={14} />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
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
            <span className="font-mono text-mist-600 tracking-widest uppercase text-sm">Pricing</span>
          </motion.div>
          
          <h2  
            className="font-serif text-4xl md:text-5xl text-mist-800 mb-6 font-extralight"
          >
            Choose Your Path
          </h2>
          
          <p  
            className="text-mist-700 text-lg max-w-2xl mx-auto font-light"
          >
            Select the membership tier that resonates with your journey and access
            our transformative tools at your own pace.
          </p>
        </GlassModule>
        
        {/* Decision portal - pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Portal light effect behind cards - more subtle fog */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-full h-full rounded-full bg-gradient-to-r from-sage-100/5 via-sky-100/10 
                        to-peach-100/5 blur-3xl -z-10"></div>
          
          {pricingOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: pricingOptions.findIndex(o => o.id === option.id) * 0.2 + 0.3, 
                ease: "power2.out" 
              }}
            >
              <PricingOption
                option={option}
                isActive={activeOption === option.id}
                onSelect={() => setActiveOption(option.id)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Satisfaction guarantee - more neumorphic, minimal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "power2.out" }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-full foggy-glass border border-white/20">
            <p className="text-mist-700 flex items-center font-light">
              <svg className="w-5 h-5 mr-3 text-sky-400/70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              30-Day Resonance Guarantee — Begin your journey risk-free
            </p>
          </div>
          
          <p className="mt-5 text-mist-600 text-sm font-light max-w-lg mx-auto">
            If you don't feel a shift in your personal frequency within 30 days, 
            we'll refund your membership completely.
          </p>
        </motion.div>
        
        {/* FAQ link - minimal styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "power2.out" }}
          className="mt-12 text-center"
        >
          <a href="#faq" className="text-mist-600 hover:text-sky-400 transition-colors duration-slower">
            Have questions? View our Frequently Asked Questions
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
