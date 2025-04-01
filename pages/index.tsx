import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import OpeningSection from '../components/sections/OpeningSection';
import MembershipBenefits from '../components/sections/MembershipBenefits';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import PricingSection from '../components/sections/PricingSection';
import ProductCarousel from '../components/sections/ProductCarousel';
import { personalToolsProducts, communityToolsProducts } from '../data/productData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Mock component for Quiz Section with updated aesthetic
const QuizSectionMock: React.FC = () => {
  return (
    <section id="quiz" className="py-24 md:py-36 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-50/60 to-mist-100/70"></div>
      
      {/* Soft blurred orbs in background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-sky-200/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-peach-200/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <GlassModule
          className="max-w-3xl mx-auto text-center mb-16 p-10 rounded-3xl"
          blur="md"
          opacity="low"
        >
          <span className="font-mono text-mist-600 tracking-widest uppercase text-sm block mb-4">
            Attune to Your Rhythm
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-mist-800 mb-6 font-extralight">
            Frequency Discovery Console
          </h2>
          <p className="text-mist-700 text-lg font-light">
            Take our interactive quiz to discover your unique resonance pattern
            and receive personalized recommendations.
          </p>
        </GlassModule>
        
        <div className="max-w-4xl mx-auto foggy-glass rounded-3xl p-10 border border-white/20">
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden mb-10 bg-mist-200/20 backdrop-blur-md">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-mist-700 text-lg font-light">Interactive Quiz Interface</p>
            </div>
          </div>
          
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="px-10 py-4 foggy-glass rounded-full text-mist-800 font-light border border-white/20"
            >
              Begin Your Assessment
            </motion.button>
            <p className="mt-5 text-mist-600 text-sm font-light">
              Approximately 5 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: NextPage = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Global scroll animations with more gentle, subtle effects
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { y: 30, opacity: 0 }, // Smaller y offset for subtlety
        {
          y: 0,
          opacity: 1,
          duration: 1.5, // Slower animation
          ease: 'power2.out', // Gentler easing
          stagger: 0.3, // More spacing between elements
          scrollTrigger: {
            trigger: section,
            start: 'top 85%', // Start earlier
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    return () => {
      // Clean up scroll triggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      <OpeningSection />
      <QuizSectionMock />
      <MembershipBenefits />
      <TestimonialCarousel />
      
      {/* First Tool Carousel */}
      <ProductCarousel 
        products={personalToolsProducts} 
        title="Personal Transformation Tools" 
        subtitle="Inner Journey Toolkit"
      />
      
      {/* Second Tool Carousel */}
      <ProductCarousel 
        products={communityToolsProducts} 
        title="Community Connection Tools" 
        subtitle="Collective Consciousness Toolkit"
      />
      
      <PricingSection />
    </Layout>
  );
};

export default Home;
