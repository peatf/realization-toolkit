declare global {
  interface Window {
    UserAccountApi?: {
      joinPricingPlan: (
        planId: string, 
        optionId: string, 
        couponCode: string, 
        isGift: boolean, 
        source: string
      ) => void;
    }
  }
}

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Section from '../layout/Section';
import OrganicBackgroundEffect from '../animations/OrganicBackgroundEffect';

// Define proper TypeScript interfaces
interface IntervalData {
  price: string;
  interval: string;
  pricingOptionId: string;
}

interface Plan {
  id: string;
  name: string;
  price?: string;
  interval?: string;
  pricingOptionId?: string;
  pricingPlanId?: string;
  hasMultipleIntervals?: boolean;
  intervals?: Record<string, IntervalData>;
  toggleLabels?: Record<string, string>;
  features: string[];
}

interface PricingSectionProps {
  plans: Plan[];
  id?: string;
}

// Render pricing card function
const renderPricingCard = (plan: Plan, isPrimary: boolean, interval: string) => {
  const price = plan.hasMultipleIntervals ? plan.intervals[interval].price : plan.price;
  const intervalText = plan.hasMultipleIntervals ? plan.intervals[interval].interval : plan.interval;

  return (
    <motion.div
      key={plan.id}
      className={`pricing-card relative rounded-xl overflow-hidden ${
        isPrimary ? 'transform hover:-translate-y-2' : 'hover:bg-opacity-10'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <OrganicBackgroundEffect
        intensity={isPrimary ? 'medium' : 'subtle'}
        colorScheme={isPrimary ? 'contrast' : 'cool'}
      />

      <div className="relative z-10 p-6">
        <div className="mb-4">
          <h3 className="text-xl font-medium">{plan.name}</h3>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-sm ml-2 opacity-70">{intervalText}</span>
          </div>
        </div>

        <ul className="mb-6 space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-emerald-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3 rounded-lg font-medium ${
            isPrimary
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
              : 'bg-white bg-opacity-10 hover:bg-opacity-20'
          }`}
        >
          Choose Plan
        </button>
      </div>
    </motion.div>
  );
};

interface MembershipCardProps {
  plan: Plan;
  isActive: boolean;
  onSelect: () => void;
  index: number;
  activeIndex: number;
  totalCards: number;
  selectedInterval?: string;
  onIntervalChange: (interval: string) => void;
}

// MembershipCard component
const MembershipCard: React.FC<MembershipCardProps> = ({
  plan,
  isActive,
  onSelect,
  index,
  activeIndex,
  totalCards,
  selectedInterval,
  onIntervalChange,
}) => {
  const [hover, setHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const relativeIndex = index - activeIndex;
  let translateY = 0;
  let scale = 1;
  let cardZIndex = totalCards;

  if (!isActive) {
    const distance = Math.abs(relativeIndex);
    if (relativeIndex > 0) {
      // Change from pushing cards down to moving them up
      translateY = -relativeIndex * 30; // Negative value moves cards up
      scale = 1 - relativeIndex * 0.05;
    } else {
      // Cards before the active one also move up
      translateY = relativeIndex * 30; // This will be negative since relativeIndex is negative
      scale = 1 - distance * 0.03;
    }
    cardZIndex = totalCards - distance;
    scale = Math.max(0.75, scale);
    cardZIndex = Math.max(1, cardZIndex);
  }

  const transform = `translateX(-50%) translateY(${translateY}px) scale(${scale})`;

  let currentPrice = plan.price || '';
  let currentIntervalText = plan.interval || '';
  let currentOptionId = plan.pricingOptionId || ''; // This preserves the pricing ID

  if (plan.hasMultipleIntervals && plan.intervals) {
    const intervalData = plan.intervals[selectedInterval || 'monthly'];
    if (intervalData) {
      currentPrice = intervalData.price;
      currentIntervalText = intervalData.interval;
      currentOptionId = intervalData.pricingOptionId; // This preserves the pricing option ID
    }
  }

  const choosePlanBaseStyle = {
    width: '80%',
    padding: '12px 0',
    borderRadius: '8px',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    marginTop: 'auto',
    alignSelf: 'center',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-foreground)',
  };

  const choosePlanHoverStyle = {
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    transform: 'translateY(-1px)',
  };

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // This is what connects to Squarespace's membership system
    if (typeof window !== 'undefined' && window.UserAccountApi) {
      window.UserAccountApi.joinPricingPlan(
        plan.pricingPlanId || '',
        currentOptionId,
        "", // coupon code (empty)
        false, // gift (false)
        "MEMBER_AREA_BLOCK" // source 
      );
    } else {
      console.error('UserAccountApi not found - are you running outside of Squarespace?');
      console.log(`Plan ID: ${plan.pricingPlanId}, Option ID: ${currentOptionId}`);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50px', // Add some top margin so cards have room to peek above
        width: '340px',
        maxWidth: '90vw',
        height: 'auto',
        transform: transform,
        zIndex: cardZIndex,
        opacity: 1,
        cursor: isActive ? 'default' : 'pointer',
        transition: 'transform 0.5s ease, z-index 0.5s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => !isActive && onSelect()}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: hover
            ? '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
            : '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'box-shadow 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '400px',
        }}
      >
        {/* Add OrganicBackgroundEffect here */}
        <OrganicBackgroundEffect
          intensity={isActive ? 'medium' : 'subtle'}
          colorScheme={index % 2 === 0 ? 'contrast' : 'cool'}
        />

        {/* The existing gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
            transform: 'rotate(5deg) translateY(-50%) translateX(-10%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: '28px',
              marginBottom: '12px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '300',
              color: 'var(--color-foreground)',
            }}
          >
            {plan.name}
          </h3>

          {plan.hasMultipleIntervals && plan.intervals && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto 15px auto',
                background: 'rgba(0,0,0,0.1)',
                padding: '4px',
                borderRadius: '20px',
                width: 'fit-content',
              }}
            >
              {Object.keys(plan.intervals).map((intervalKey) => (
                <button
                  key={intervalKey}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIntervalChange(intervalKey);
                  }}
                  style={{
                    background: selectedInterval === intervalKey ? 'rgba(255,255,255,0.2)' : 'none',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '300',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {plan.toggleLabels?.[intervalKey] ||
                    intervalKey.charAt(0).toUpperCase() + intervalKey.slice(1)}
                </button>
              ))}
            </div>
          )}

          <p
            style={{
              fontSize: '40px',
              marginBottom: '4px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '300',
              color: 'var(--color-foreground)',
            }}
          >
            ${currentPrice}
          </p>

          <p
            style={{
              fontSize: '14px',
              marginBottom: '20px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-secondary)',
            }}
          >
            {currentIntervalText}
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 auto 24px auto',
              textAlign: 'left',
              flexGrow: 1,
              width: 'fit-content',
            }}
          >
            {plan.features &&
              plan.features.map((feature, fIndex) => (
                <li
                  key={fIndex}
                  style={{
                    fontSize: '15px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '300',
                    color: 'var(--color-foreground)',
                  }}
                >
                  <span style={{ marginRight: '10px', color: 'var(--color-accent-green)' }}>✓</span>
                  {feature}
                </li>
              ))}
          </ul>

          <button
            style={{
              ...choosePlanBaseStyle,
              ...(buttonHover ? choosePlanHoverStyle : {}),
            }}
            onClick={handlePurchaseClick}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Choose Plan
          </button>
        </div>
      </div>

      {!isActive && (
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            textAlign: 'center',
            fontSize: '14px',
            pointerEvents: 'none',
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.3s ease',
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-secondary)',
          }}
        >
          Click to view
        </div>
      )}
    </div>
  );
};

interface PricingSectionProps {
  plans: Plan[];
  id?: string;
}

// Main PricingSection component
const PricingSection: React.FC<PricingSectionProps> = ({ plans = [], id }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedIntervals, setSelectedIntervals] = useState<Record<number, string>>({});

  return (
    <Section id="signup-section" className="pricing-section py-16">
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-6 font-light text-center">
          Membership Options
        </h2>

        <div className="relative w-full h-[550px] mt-16 flex justify-center items-start">
          {/* Previous button */}
          <button
            onClick={() => activeCardIndex > 0 && setActiveCardIndex(activeCardIndex - 1)}
            disabled={activeCardIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                     border border-[var(--color-foreground-muted)] text-[var(--color-foreground)]
                     hover:bg-[var(--color-foreground-muted)] transition-colors
                     disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm bg-white/10
                     flex items-center justify-center md:left-8 lg:left-12"
            aria-label="Previous plan"
          >
            ←
          </button>

          {/* Card stack - unchanged */}
          {plans.map((plan, index) => (
            <MembershipCard
              key={plan.id}
              plan={plan}
              isActive={index === activeCardIndex}
              onSelect={() => setActiveCardIndex(index)}
              index={index}
              activeIndex={activeCardIndex}
              totalCards={plans.length}
              selectedInterval={selectedIntervals[index] || 'monthly'}
              onIntervalChange={(interval) => {
                setSelectedIntervals({
                  ...selectedIntervals,
                  [index]: interval
                });
              }}
            />
          ))}

          {/* Next button */}
          <button
            onClick={() => activeCardIndex < plans.length - 1 && setActiveCardIndex(activeCardIndex + 1)}
            disabled={activeCardIndex === plans.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full
                     border border-[var(--color-foreground-muted)] text-[var(--color-foreground)]
                     hover:bg-[var(--color-foreground-muted)] transition-colors
                     disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm bg-white/10
                     flex items-center justify-center md:right-8 lg:right-12"
            aria-label="Next plan"
          >
            →
          </button>
        </div>
      </div>
    </Section>
  );
};

export default PricingSection;