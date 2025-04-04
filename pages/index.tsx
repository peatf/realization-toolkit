import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import OpeningSection from '../components/sections/OpeningSection';
import MembershipBenefits from '../components/sections/MembershipBenefits';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import PricingSection from '../components/sections/PricingSection';
import ProductCarousel from '../components/sections/ProductCarousel';
import QuizWithPreview from '../components/QuizWithPreview';
import CircularMenuWithGooeyText from '../components/sections/CircularMenuWithGooeyText';
import GlassBowlIconsSection from '../components/sections/GlassBowlIconsSection';
import { personalToolsProducts, communityToolsProducts } from '../data/productData';
import { testimonials } from '../data/testimonialData';

const Home: NextPage = () => {
  useEffect(() => {
    // You can keep your GSAP ScrollTrigger setup if needed.
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.1; // 10% of viewport height
      
      if (scrollY > threshold) {
        document.body.classList.add('scroll-active');
        document.body.classList.remove('scroll-inactive');
      } else {
        document.body.classList.add('scroll-inactive');
        document.body.classList.remove('scroll-active');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const menuSection = document.getElementById('gooey-menu-section');
    const heroSection = document.getElementById('opening');
    
    if (!menuSection || !heroSection) return;
    
    // Create intersection observer to detect when sections enter viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When menu section enters viewport
          if (entry.target.id === 'gooey-menu-section') {
            // Add entrance animation class
            entry.target.classList.add('entering');
            
            // Add visual indicator that we're in a new section
            document.body.classList.add('viewing-menu');
            document.body.classList.remove('viewing-hero');
          }
          
          // When hero section enters viewport
          if (entry.target.id === 'opening') {
            document.body.classList.add('viewing-hero');
            document.body.classList.remove('viewing-menu');
            
            // Reset menu animation for next entrance
            menuSection.classList.remove('entering');
          }
        }
      });
    }, { threshold: 0.4 }); // Trigger when 40% of section is visible
    
    // Observe both sections
    observer.observe(menuSection);
    observer.observe(heroSection);
    
    // Advanced scroll control for better UX
    const handleWheel = (e) => {
      const heroRect = heroSection.getBoundingClientRect();
      
      // If at the bottom of hero section and scrolling down, snap to menu section
      if (heroRect.bottom <= window.innerHeight && heroRect.bottom > window.innerHeight/2 && e.deltaY > 0) {
        e.preventDefault();
        menuSection.scrollIntoView({ behavior: 'smooth' });
        menuSection.classList.add('entering');
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  return (
    <Layout>
      {/* Opening / Hero Section - with scroll snap */}
      <section id="opening" className="scroll-snap-align-start">
        <OpeningSection />
        <div className="scroll-transition-space"></div> {/* Add transition space */}
      </section>

      {/* Circular Menu Section - adjusted positioning */}
      <section 
        id="gooey-menu-section" 
        className="relative min-h-screen sticky top-0 z-50 flex items-center justify-center scroll-snap-align-start"
      >
        <CircularMenuWithGooeyText 
          items={[
            { id: 'membership-benefits', label: 'Realization Toolkit', target: 'membership-benefits' },
            { id: 'quiz', label: 'Find Your Tools', target: 'quiz' },
            { id: 'product-carousels', label: 'Learn About the Tools', target: 'product-carousels' },
            { id: 'pricing', label: 'Enroll Now', target: 'pricing' },
            { id: 'toolkit-exclusives', label: 'Realization Toolkit Exclusives', target: 'toolkit-exclusives' },
            { id: 'testimonials', label: 'Testimonials', target: 'testimonials' }
          ]}
        />
      </section>
      
      {/* Membership Benefits & Quiz Section - MOVE BOTH DOWN TOGETHER ON DESKTOP */}
      <section 
        id="membership-benefits" 
        className="relative lg:mt-72 pt-12 pb-0" // Added lg:mt-32 to push BOTH sections down on desktop
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Membership Benefits Section */}
            <div className="w-full lg:w-1/2">
              <h3 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-8 font-light text-center">
                About Realization Toolkit
              </h3>
              <MembershipBenefits />
            </div>

            {/* Quiz Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <h3 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-8 font-light text-center">
                Find Your Tools
              </h3>
              <QuizWithPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Product Carousels Section - REDUCE TOP PADDING */}
      <section 
        id="product-carousels" 
        className="relative pt-0 pb-20 section-animated"
      >
        <ProductCarousel 
          products={personalToolsProducts}
          title="The Power Tools" 
          subtitle="Learn the Tools"
        />
        <ProductCarousel 
          products={communityToolsProducts}
          title="The Alchemical Tools" 
          subtitle="Learn the Tools"
        />
      </section>
      
      {/* Testimonial Section */}
      <section id="testimonials" className="py-16">
        <TestimonialCarousel testimonials={testimonials} />
      </section>
      
      {/* Glass Bowl and Pricing Section - Side-by-side on desktop */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-baseline gap-12">
            <div className="w-full lg:w-1/2">
              <GlassBowlIconsSection id="toolkit-exclusives" />
            </div>
            <div className="w-full lg:w-1/2">
              <PricingSection id="pricing" plans={[
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

