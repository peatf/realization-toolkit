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
import QuizSectionMock from '../components/sections/QuizSectionMock';

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
