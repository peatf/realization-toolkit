import React, { useEffect, useState, useRef } from 'react';
import Section from '../layout/Section';

// ---------- Star Component ----------
interface StarProps {
  isGlowing: boolean;
  delay: number;
}
const Star: React.FC<StarProps> = ({ isGlowing, delay }) => {
  return (
    <div
      style={{
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        background: isGlowing ? '#fff' : '#666',
        transition: `all 2s ease-in-out ${delay}s`,
        position: 'relative',
        zIndex: 1,
      }}
    ></div>
  );
};

// ---------- StarsBackground Component ----------
const StarsBackground: React.FC = () => {
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const stars = 50;
  useEffect(() => {
    const interval = setInterval(() => {
      const newGlowingStars = Array.from({ length: 5 }, () => Math.floor(Math.random() * stars));
      setGlowingStars(newGlowingStars);
    }, 2000);
    return () => clearInterval(interval);
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
      {Array.from({ length: stars }).map((_, index) => {
        const isGlowing = glowingStars.includes(index);
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = (index % 10) * 0.1;
        return (
          <div
            key={`star-${index}`}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              opacity: isGlowing ? 1 : 0.5,
              transform: `scale(${isGlowing ? 1.5 : 1})`,
              transition: `all 2s ease-in-out ${delay}s`,
            }}
          >
            <Star isGlowing={isGlowing} delay={delay} />
            {isGlowing && (
              <div
                style={{
                  position: 'absolute',
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
            )}
          </div>
        );
      })}
    </div>
  );
};

// ---------- Product Data ----------
const products = [
  {
    id: 'rtk',
    title: "Realization Toolkit ꩜",
    hasMultipleIntervals: true,
    intervals: {
      monthly: {
        price: "376.00",
        interval: "Every month",
        pricingOptionId: "25c4487a-6156-469c-a69c-fe8920e9ec29",
      },
      weekly: {
        price: "188.00",
        interval: "Every 2 weeks",
        pricingOptionId: "9bed5f13-3739-4c68-946f-de79b88f46b7",
      },
    },
    toggleLabels: { monthly: "Monthly", weekly: "2 Weeks" },
    pricingPlanId: "fc0ee596-0820-4e2d-ae7f-8762360121ba",
    features: [
      "Access to Alchemical Tools",
      "Access to Power Tools",
      "Access to Live Vision Coaching Calls",
      "Access to Vision Coaching Call Replays",
      "Access to 1:1 Booking",
    ],
  },
  {
    id: 'ap-tools',
    title: "Alchemical + Power Tools",
    price: "96.00",
    interval: "Every month",
    pricingPlanId: "c8a2ed11-3bee-4456-9e25-54ace2d47267",
    pricingOptionId: "51646566-212a-480d-83d4-fe70f664958d",
    features: [
      "Access to Realization: Alchemical Tools",
      "Access to Realization: Power Tools",
      "Access to one Monthly Vision Coaching Call recording",
    ],
  },
  {
    id: 'refiner',
    title: "The Refiner 𓂀",
    hasMultipleIntervals: true,
    intervals: {
      monthly: {
        price: "34.00",
        interval: "Every month",
        pricingOptionId: "6e23e623-a4dd-4269-8bb9-24d79dc02da5",
      },
      weekly: {
        price: "8.50",
        interval: "Every week",
        pricingOptionId: "1dd0b7cd-69c7-4f1f-85bb-1bb347110ee8",
      },
    },
    toggleLabels: { monthly: "Monthly", weekly: "Weekly" },
    pricingPlanId: "6e1c0811-d0c3-4e0d-8579-bc65cc83b41f",
    features: [
      "Unlimited Access to the Refiner",
      "Bonus: Access to Tension to Form Tool",
    ],
  },
];

// ---------- UserAccountApi (Safe Access) ----------
const getUserAccountApi = () => {
  if (typeof window !== 'undefined' && (window as any).UserAccountApi) {
    return (window as any).UserAccountApi;
  }
  return {
    joinPricingPlan: (planId: string, optionId: string) => {
      console.warn('UserAccountApi.joinPricingPlan called (mocked):', { planId, optionId });
      alert(`Simulating signup for plan ${planId}, option ${optionId}`);
    },
  };
};

// ---------- MembershipCard Component ----------
interface MembershipCardProps {
  product: any;
  isActive: boolean;
  onSelect: (index: number) => void;
  index: number;
  activeIndex: number;
  totalCards: number;
  selectedInterval?: string;
  onIntervalChange: (intervalKey: string) => void;
}
const MembershipCard: React.FC<MembershipCardProps> = ({
  product,
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

  // Stacking Logic
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
  let currentPrice = product.price;
  let currentIntervalText = product.interval;
  let currentOptionId = product.pricingOptionId;
  if (product.hasMultipleIntervals) {
    const intervalData = product.intervals[selectedInterval || 'monthly'];
    currentPrice = intervalData?.price;
    currentIntervalText = intervalData?.interval;
    currentOptionId = intervalData?.pricingOptionId;
  }

  const handleSignUpClick = () => {
    const api = getUserAccountApi();
    if (api && typeof api.joinPricingPlan === 'function') {
      api.joinPricingPlan(product.pricingPlanId, currentOptionId);
    } else {
      console.error("UserAccountApi not found or joinPricingPlan is not a function.");
      alert("Signup API is not available.");
    }
  };

  const choosePlanBaseStyle = {
    width: '80%',
    padding: '12px 0',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    marginTop: 'auto',
    alignSelf: 'center',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const choosePlanHoverStyle = {
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    transform: 'translateY(-1px)',
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
      onClick={() => !isActive && onSelect(index)}
    >
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'var(--color-card)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}
      >
        <div className="p-6">
          <h3 className="font-sans text-xl font-medium text-[var(--color-foreground)]">
            {product.title}
          </h3>
          <div className="text-[var(--color-secondary)] mt-2">
            {product.features.join(', ')}
          </div>
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
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          Click to view
        </div>
      )}
    </div>
  );
};

// ---------- Main PricingSection Component ----------
const PricingSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedIntervals, setSelectedIntervals] = useState(
    products.reduce((acc, product, index) => {
      if (product.hasMultipleIntervals) acc[index] = 'monthly';
      return acc;
    }, {} as { [key: number]: string })
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectCard = (index: number) => setActiveCardIndex(index);
  const handleIntervalChange = (productIndex: number, intervalKey: string) => {
    setSelectedIntervals((prev) => ({ ...prev, [productIndex]: intervalKey }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && activeCardIndex > 0) {
        setActiveCardIndex(activeCardIndex - 1);
      } else if (e.key === 'ArrowDown' && activeCardIndex < products.length - 1) {
        setActiveCardIndex(activeCardIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex]);

  return (
    <Section id="pricing-section" className="overflow-hidden">
      <div
        ref={containerRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <h1 style={{ color: 'white', marginBottom: '80px', textAlign: 'center', fontSize: '32px' }}>
          Membership Options
        </h1>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {products.map((plan, index) => (
            <MembershipCard
              key={plan.id || index}
              product={plan}
              isActive={index === activeCardIndex}
              onSelect={handleSelectCard}
              index={index}
              activeIndex={activeCardIndex}
              totalCards={products.length}
              selectedInterval={selectedIntervals[index]}
              onIntervalChange={(intervalKey) => handleIntervalChange(index, intervalKey)}
            />
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: '30px', gap: '10px', justifyContent: 'center' }}>
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCardIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: index === activeCardIndex ? '#3b82f6' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`View ${products[index].title} plan`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: '20px', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => activeCardIndex > 0 && setActiveCardIndex(activeCardIndex - 1)}
            disabled={activeCardIndex === 0}
            style={{
              padding: '10px 18px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)',
              fontSize: '14px',
              opacity: activeCardIndex === 0 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={() => activeCardIndex < products.length - 1 && setActiveCardIndex(activeCardIndex + 1)}
            disabled={activeCardIndex === products.length - 1}
            style={{
              padding: '10px 18px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(4px)',
              fontSize: '14px',
              opacity: activeCardIndex === products.length - 1 ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Section>
  );
};

export default PricingSection;
