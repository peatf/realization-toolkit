import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import OpeningSection from '../components/sections/OpeningSection';
import QuizSection from '../components/sections/QuizSection';
import MembershipBenefits from '../components/sections/MembershipBenefits';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import ToolShowcases from '../components/sections/ToolShowcases';
import PricingSection from '../components/sections/PricingSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Mock component for Quiz Section since we didn't implement it fully
const QuizSectionMock: React.FC = () => {
  return (
    <section id="quiz" className="py-20 md:py-32 bg-gradient-to-b from-violet-900 to-indigo-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-violet-300 tracking-widest uppercase text-sm block mb-4">
            Attune to Your Rhythm
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Frequency Discovery Console
          </h2>
          <p className="text-violet-200 text-lg">
            Take our interactive quiz to discover your unique resonance pattern
            and receive personalized recommendations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
            <div className="w-full h-full bg-indigo-800/50 flex items-center justify-center">
              <p className="text-white text-lg">Interactive Quiz Interface</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full text-white font-medium tracking-wide shadow-lg shadow-indigo-500/30">
              Begin Your Assessment
            </button>
            <p className="mt-4 text-violet-300 text-sm">
              Approximately 5 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mock component for Tool Showcases since we didn't implement it fully
const ToolShowcasesMock: React.FC = () => {
  return (
    <section id="tools" className="py-20 md:py-32 bg-gradient-to-b from-indigo-900 to-violet-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-violet-300 tracking-widest uppercase text-sm block mb-4">
            Toolkit Index
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Transformative Tools
          </h2>
          <p className="text-violet-200 text-lg">
            Explore our suite of digital tools designed to enhance your journey
            toward self-discovery and personal transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['Frequency Generator', 'Meditation Guide', 'Pattern Recognition', 'Resonance Mapper', 'Constellation Viewer', 'Ritual Builder'].map((tool, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white mb-4">
                {['✧', '○', '⟡', '⌘', '◇', '□'][index]}
              </div>
              <h3 className="text-white text-xl font-serif mb-2">{tool}</h3>
              <p className="text-violet-200">
                {`Experience the transformative power of our ${tool.toLowerCase()} tool, designed to enhance your personal journey.`}
              </p>
              <a href="#" className="inline-block mt-4 text-violet-300 hover:text-white transition-colors">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: NextPage = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Global scroll animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
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
      <ToolShowcasesMock />
      <PricingSection />
    </Layout>
  );
};

export default Home;
