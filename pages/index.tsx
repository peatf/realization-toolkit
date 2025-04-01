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
import { GlassModule } from '../components/ui/NeumorphicUI';
import { motion } from 'framer-motion';
import QuizSection from '../components/sections/QuizSection';

const Home: NextPage = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Use a more optimized approach with fewer animations
    const sections = document.querySelectorAll('section');
    
    // Create one timeline per section
    sections.forEach(section => {
      const elements = section.querySelectorAll('.animate-on-scroll');
      if (elements.length === 0) return;
      
      // Batch animations in a timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          // markers: true, // Enable for debugging
        }
      });
      
      // Add all animations to the timeline
      tl.fromTo(elements, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, // Faster animation
          stagger: 0.1, // Smaller stagger for more performance
          ease: "power2.out",
          clearProps: "transform" // Clean up after animation
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      <OpeningSection />
       <QuizSection />
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
