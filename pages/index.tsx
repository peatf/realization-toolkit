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
import { initSectionObserver } from '../utils/SectionObserver';

const Home: NextPage = () => {
  useEffect(() => {
    // Initialize scroll animations
    initSectionObserver();

    // Improve scroll performance with passive events
    const wheelOpts = { passive: true };
    const wheelHandler = (e) => {
      // You can add custom wheel behavior here if needed
      // But keep it simple and don't interfere with natural scrolling
    };

    window.addEventListener('wheel', wheelHandler, wheelOpts);

    return () => {
      window.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <Layout>
      {/* Opening section */}
      <section id="opening" className="relative">
        <OpeningSection />
      </section>

      {/* Circular Menu Section */}
      <section 
        id="gooey-menu-section" 
        className="relative min-h-screen z-50 flex items-center justify-center"
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

      {/* Membership Benefits & Quiz Section */}
      <section 
        id="membership-benefits" 
        className="relative lg:mt-32 pt-12 pb-6 section-animated"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Membership Benefits Section */}
            <div className="w-full lg:w-1/2">
              <h3 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-8 font-light text-center">
                About Realization Toolkit
              </h3>
              <div className="h-full"> {/* Wrapper to match heights if needed */}
                <MembershipBenefits />
              </div>
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

      {/* Product Carousels Section */}
      <section 
        id="product-carousels" 
        className="relative pt-0 pb-16"
      >
        <ProductCarousel 
          products={personalToolsProducts}
          title="The Power Tools" 
          subtitle="Learn the Tools"
          // animated={true} // Removed as ProductCarousel does not accept it
        />
        <ProductCarousel 
          products={communityToolsProducts}
          title="The Alchemical Tools" 
          subtitle="Learn the Tools"
        />
      </section>
      
      {/* Testimonial Section */}
      <section id="testimonials" className="relative">
        <TestimonialCarousel testimonials={testimonials} />
      </section>
      
      {/* Glass Bowl and Pricing Section */}
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

