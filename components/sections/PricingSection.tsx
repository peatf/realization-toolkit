import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Section from '../layout/Section';

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

// Improved Star component with individual lifecycle
interface StarProps {
  id: number;
  left: number; 
  top: number;
}

const Star: React.FC<StarProps> = ({ id, left, top }) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [intensity, setIntensity] = useState(0);
  
  // Random duration between 5-10 seconds for each star's lifecycle
  const duration = useMemo(() => 5000 + Math.random() * 5000, []);
  
  // Random delay for staggered animation starts (0-15 seconds)
  const initialDelay = useMemo(() => Math.random() * 15000, []);
  
  // Control the star's glow cycle
  useEffect(() => {
    // Initial delay before starting the animation cycle
    const startTimeout = setTimeout(() => {
      const glowCycle = () => {
        // Glow up
        setIsGlowing(true);
        
        // Randomly vary the intensity for each cycle
        setIntensity(0.6 + Math.random() * 0.4); // between 0.6-1.0
        
        // Schedule glow down
        const glowDuration = duration * (0.3 + Math.random() * 0.4); // 30-70% of total duration
        const dimTimeout = setTimeout(() => {
          setIsGlowing(false);
          
          // Schedule next glow with a small pause
          const pauseDuration = duration * (0.5 + Math.random() * 0.3); // Increased pause between glows
          const pauseTimeout = setTimeout(glowCycle, pauseDuration);
          
          return () => clearTimeout(pauseTimeout);
        }, glowDuration);
        
        return () => clearTimeout(dimTimeout);
      };
      
      glowCycle();
    }, initialDelay);
    
    return () => clearTimeout(startTimeout);
  }, [duration, initialDelay]);
  
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
    >
      {/* Base star dot - always visible */}
      <div
        className="absolute"
        style={{
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: isGlowing ? '#fff' : '#666',
          opacity: isGlowing ? 1 : 0.5,
          transform: `scale(${isGlowing ? 1.2 : 1})`,
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1,
        }}
      />
      
      {/* Glow effect with smooth transitions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isGlowing ? intensity : 0,
          scale: isGlowing ? 1 + intensity : 0.5
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
        className="absolute"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.6)',
          filter: 'blur(2px)',
          top: '-2px',
          left: '-2px',
          boxShadow:
            '0 0 8px 2px rgba(59, 130, 246, 0.6), 0 0 12px 4px rgba(59, 130, 246, 0.4)',
          zIndex: 0,
        }}
      />
    </div>
  );
};

// Improved StarsBackground component
const StarsBackground: React.FC = () => {
  // Generate fixed star positions once
  const starPositions = useMemo(() => {
    const totalStars = 15; // Significantly reduced for better performance
    return Array.from({ length: totalStars }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
  }, []);

  return (
    <div
      className="stars-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {starPositions.map((star) => (
        <Star
          key={`star-${star.id}`}
          id={star.id}
          left={star.left}
          top={star.top}
        />
      ))}
    </div>
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

  // Rest of the component stays the same
  // ...

  // Rest of your existing MembershipCard component code
  const relativeIndex = index - activeIndex;
  let translateY = 0;
  let scale = 1;
  let cardZIndex = totalCards;
  
  if (!isActive) {
    const distance = Math.abs(relativeIndex);
    if (relativeIndex > 0) {
      translateY = relativeIndex * 30;
      scale = 1 - relativeIndex * 0.05;
    } else {
      translateY = 0;
      scale = 1 - distance * 0.03;
    }
    cardZIndex = totalCards - distance;
    scale = Math.max(0.75, scale);
    cardZIndex = Math.max(1, cardZIndex);
  }
  
  const transform = `translateX(-50%) translateY(${translateY}px) scale(${scale})`;

  // Determine current price, interval text, and option ID
  let currentPrice = plan.price || '';
  let currentIntervalText = plan.interval || '';
  let currentOptionId = plan.pricingOptionId || '';
  
  if (plan.hasMultipleIntervals && plan.intervals) {
    const intervalData = plan.intervals[selectedInterval || 'monthly'];
    if (intervalData) {
      currentPrice = intervalData.price;
      currentIntervalText = intervalData.interval;
      currentOptionId = intervalData.pricingOptionId;
    }
  }

  // Button styles
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
    // Handle purchase logic here
    console.log(`Purchase plan: ${plan.name}, option: ${currentOptionId}`);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
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
        {/* Background effect */}
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '60%', 
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)', 
            transform: 'rotate(5deg) translateY(-50%) translateX(-10%)', 
            pointerEvents: 'none' 
          }} 
        />
        
        <StarsBackground />
        
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
            {plan.features && plan.features.map((feature, fIndex) => (
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
    <Section id={id} className="pricing-section py-16">
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mb-6 font-light text-center">
          Membership Options
        </h2>

        <div className="relative w-full h-[500px] mt-16 flex justify-center items-start">
          {plans.map((plan, index) => (
            <MembershipCard
              key={plan.id || index}
              plan={plan}
              isActive={index === activeCardIndex}
              onSelect={() => setActiveCardIndex(index)}
              index={index}
              activeIndex={activeCardIndex}
              totalCards={plans.length}
              selectedInterval={selectedIntervals[index]}
              onIntervalChange={(intervalKey) => {
                setSelectedIntervals((prev) => ({ ...prev, [index]: intervalKey }));
              }}
            />
          ))}
        </div>

        <div className="flex mt-8 gap-2 justify-center">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCardIndex(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: index === activeCardIndex ? '#3b82f6' : 'rgba(255,255,255,0.3)',
              }}
              aria-label={`View ${plans[index].name} plan`}
            />
          ))}
        </div>

        <div className="flex mt-4 gap-4 justify-center">
          <button
            onClick={() => activeCardIndex > 0 && setActiveCardIndex(activeCardIndex - 1)}
            disabled={activeCardIndex === 0}
            className="px-4 py-2 rounded-lg border border-[var(--color-foreground-muted)] 
                       text-[var(--color-foreground)] hover:bg-[var(--color-foreground-muted)]
                       transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                       backdrop-blur-sm bg-transparent"
            aria-label="Previous plan"
          >
            Previous
          </button>
          <button
            onClick={() => activeCardIndex < plans.length - 1 && setActiveCardIndex(activeCardIndex + 1)}
            disabled={activeCardIndex === plans.length - 1}
            className="px-4 py-2 rounded-lg border border-[var(--color-foreground-muted)] 
                       text-[var(--color-foreground)] hover:bg-[var(--color-foreground-muted)]
                       transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                       backdrop-blur-sm bg-transparent"
            aria-label="Next plan"
          >
            Next
          </button>
        </div>
      </div>
    </Section>
  );
};

export default PricingSection;