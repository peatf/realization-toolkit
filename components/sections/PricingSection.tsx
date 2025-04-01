import React, { useEffect, useState, useRef } from 'react';

// Star component (no changes)
const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number; }) => {
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

// StarsBackground component (no changes)
const StarsBackground = () => {
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

// Product Data (using full data as provided)
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

// Use a type cast here so TypeScript knows we may have a UserAccountApi on the window object.
const UserAccountApi = (window as any).UserAccountApi || {
  joinPricingPlan: (planId: string, optionId: string) => {
    console.warn('UserAccountApi.joinPricingPlan called (mocked):', { planId, optionId });
    alert(`Simulating signup for plan ${planId}, option ${optionId}`);
  },
};

const PricingSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedIntervals, setSelectedIntervals] = useState(
    products.reduce((acc, product, index) => {
      if (product.hasMultipleIntervals) acc[index] = 'monthly';
      return acc;
    }, {} as { [key: number]: string })
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

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
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0f172a, #1e293b)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        overflow: 'hidden',
        position: 'relative',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <h1
        style={{
          color: 'white',
          marginBottom: '80px',
          textAlign: 'center',
          fontSize: '32px',
        }}
      >
        Membership Options
      </h1>

      {/* Card container - You would replace the placeholder with your full MembershipCard implementation */}
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
          <div key={plan.id || index}>{plan.title}</div> // Placeholder content
        ))}
      </div>

      {/* Indicator dots */}
      <div
        style={{
          display: 'flex',
          marginTop: '30px',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCardIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background:
                index === activeCardIndex ? '#3b82f6' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            aria-label={`View ${products[index].title} plan`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
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
  );
};

export default PricingSection;
