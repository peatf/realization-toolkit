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
import CircularMenuWithGooeyText from '../components/sections/CircularMenuWithGooeyText';

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
      
      {/* Circular Menu */}
      <CircularMenuWithGooeyText 
        items={[
          "Alchemical Tools",
          "Power Tools", 
          "Vision Coaching",
          "Community",
          "Resources"
        ]} 
      />
      
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
      
      <PricingSection plans={[
        {
          id: 'rtk',
          name: "Realization Toolkit ꩜", 
          hasMultipleIntervals: true,
          intervals: {
            monthly: { price: "376.00", interval: "Every month", pricingOptionId: "25c4487a-6156-469c-a69c-fe8920e9ec29" },
            weekly: { price: "188.00", interval: "Every 2 weeks", pricingOptionId: "9bed5f13-3739-4c68-946f-de79b88f46b7" }
          },
          toggleLabels: { monthly: "Monthly", weekly: "2 Weeks" },
          pricingPlanId: "fc0ee596-0820-4e2d-ae7f-8762360121ba",
          features: [ 
            "Access to Alchemical Tools", 
            "Access to Power Tools", 
            "Access to Live Vision Coaching Calls", 
            "Access to Vision Coaching Call Replays", 
            "Access to 1:1 Booking" 
          ]
        },
        {
          id: 'ap-tools', 
          name: "Alchemical + Power Tools", 
          price: "96.00", 
          interval: "Every month",
          pricingPlanId: "c8a2ed11-3bee-4456-9e25-54ace2d47267", 
          pricingOptionId: "51646566-212a-480d-83d4-fe70f664958d",
          features: [ 
            "Access to Realization: Alchemical Tools", 
            "Access to Realization: Power Tools", 
            "Access to one Monthly Vision Coaching Call recording" 
          ]
        },
        {
          id: 'refiner', 
          name: "The Refiner 𓂀", 
          hasMultipleIntervals: true,
          intervals: {
            monthly: { price: "34.00", interval: "Every month", pricingOptionId: "6e23e623-a4dd-4269-8bb9-24d79dc02da5" },
            weekly: { price: "8.50", interval: "Every week", pricingOptionId: "1dd0b7cd-69c7-4f1f-85bb-1bb347110ee8" }
          },
          toggleLabels: { monthly: "Monthly", weekly: "Weekly" },
          pricingPlanId: "6e1c0811-d0c3-4e0d-8579-bc65cc83b41f",
          features: [ 
            "Unlimited Access to the Refiner", 
            "Bonus: Access to Tension to Form Tool" 
          ]
        }
      ]} />
    </Layout>
  );
};

export default Home;
