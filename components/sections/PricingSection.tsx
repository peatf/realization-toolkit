import React, { useState, useEffect } from 'react';

// Extend the Window interface to include UserAccountApi
declare global {
  interface Window {
    UserAccountApi?: {
      joinPricingPlan: (
        pricingPlanId: string,
        pricingOptionId: string,
        couponCode: string,
        gift: boolean,
        source: string
      ) => void;
    };
  }
}
import { motion } from 'framer-motion';
import Section from '../layout/Section';
import usePerformanceMetrics from '../../utils/usePerformanceMetrics';
import OrganicBackgroundEffect from '../animations/OrganicBackgroundEffect';

// (Keep the existing interfaces: IntervalData, Plan, PricingSectionProps, MembershipCardProps)
// ... interfaces remain the same ...
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
function computeNextBillingDateText(plan: Plan, selectedInterval?: string): string {
  try {
    const now = new Date();
    const d = new Date(now);
    if (plan.hasMultipleIntervals && plan.intervals) {
      const key = selectedInterval || Object.keys(plan.intervals)[0] || 'monthly';
      if (key.toLowerCase().includes('week')) {
        d.setDate(d.getDate() + 7);
      } else if (key.toLowerCase().includes('2 week')) {
        d.setDate(d.getDate() + 14);
      } else {
        d.setMonth(d.getMonth() + 1);
      }
    } else {
      const interval = (plan.interval || '').toLowerCase();
      if (interval.includes('week')) {
        d.setDate(d.getDate() + 7);
      } else {
        d.setMonth(d.getMonth() + 1);
      }
    }
    return d.toLocaleDateString();
  } catch {
    return '—';
  }
}

interface MembershipCardProps {
  plan: Plan;
  isActive: boolean;
  onSelect: () => void;
  index: number;
  activeIndex: number;
  totalCards: number;
  selectedInterval?: string;
  onIntervalChange: (interval: string) => void;
  onPurchase?: () => void;
  layout?: 'stacked' | 'side-by-side';
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  plan,
  isActive,
  onSelect,
  index,
  activeIndex,
  totalCards,
  selectedInterval,
  onIntervalChange,
  onPurchase,
  layout = 'stacked',
}) => {
  const [hover, setHover] = useState(false);

  const relativeIndex = index - activeIndex;
  let translateY = 0;
  let scale = 1;
  let cardZIndex = totalCards;

  // Stacked layout logic (only used for mobile/stacked view if needed, but we prefer responsive CSS)
  if (layout === 'stacked') {
    if (!isActive) {
      const distance = Math.abs(relativeIndex);
      if (relativeIndex > 0) {
        translateY = -relativeIndex * 30;
        scale = 1 - relativeIndex * 0.05;
      } else {
        translateY = relativeIndex * 30;
        scale = 1 - distance * 0.03;
      }
      cardZIndex = totalCards - distance;
      scale = Math.max(0.75, scale);
      cardZIndex = Math.max(1, cardZIndex);
    }
  }

  const transform = layout === 'stacked' ? `translateX(-50%) translateY(${translateY}px) scale(${scale})` : 'none';

  let currentPrice = plan.price || '';
  let currentIntervalText = plan.interval || '';
  let currentOptionId = plan.pricingOptionId || ''; // This preserves the pricing ID

  if (plan.hasMultipleIntervals && plan.intervals) {
    // Ensure selectedInterval has a default if undefined
    const currentIntervalKey = selectedInterval || Object.keys(plan.intervals)[0] || 'monthly';
    const intervalData = plan.intervals[currentIntervalKey];
    if (intervalData) {
      currentPrice = intervalData.price;
      currentIntervalText = intervalData.interval;
      currentOptionId = intervalData.pricingOptionId; // This preserves the pricing option ID
    }
  }

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPurchase) onPurchase();

    const pricingPlanId = plan.pricingPlanId || '';
    const pricingOptionId = currentOptionId;

    // This is what normally opens the modal
    if (typeof window !== 'undefined' && window.UserAccountApi) {
      window.UserAccountApi.joinPricingPlan(
        pricingPlanId,
        pricingOptionId,
        "", // coupon code
        false, // gift
        "MEMBER_AREA_BLOCK" // source
      );
    } else {
      // We're in an iframe - only use the postMessage approach (no redirect)
      try {
        console.log('Attempting to open membership modal via parent window...');
        window.parent.postMessage({
          type: 'JOIN_PRICING_PLAN',
          pricingPlanId: pricingPlanId,
          pricingOptionId: pricingOptionId,
          couponCode: "",
          gift: false,
          source: "MEMBER_AREA_BLOCK"
        }, '*'); // Allow any origin for testing

        console.log(`Sent membership request to parent window for plan ${pricingPlanId}`);
      } catch (err) {
        console.error('Failed to communicate with parent window:', err);
      }
    }
  };

  // Dynamic classes based on layout and state
  const containerClasses = layout === 'stacked'
    ? `absolute left-1/2 top-[50px] w-[340px] max-w-[90vw] h-auto transition-all duration-500 ease-out`
    : `relative w-full max-w-sm lg:w-[340px] h-auto transition-transform duration-300 ease-out ${index > 0 ? 'lg:-ml-5' : ''}`;

  const containerStyle = layout === 'stacked'
    ? { transform, zIndex: cardZIndex, opacity: 1, cursor: isActive ? 'default' : 'pointer' }
    : { zIndex: index + 1, opacity: 1, cursor: 'default' };

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => layout === 'stacked' && !isActive ? onSelect() : undefined}
    >
      <div
        className={`
          relative w-full rounded-[30px] overflow-hidden p-6 flex flex-col min-h-[400px]
          bg-white/5 backdrop-blur-sm border border-white/10
          transition-shadow duration-300 ease-out
          ${hover ? 'shadow-glass-card-hover' : 'shadow-glass-card'}
        `}
      >
        {/* Organic Background Effect */}
        <OrganicBackgroundEffect
          intensity={isActive ? 'medium' : 'subtle'}
          colorScheme={index % 2 === 0 ? 'contrast' : 'cool'}
          isStatic={true}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent transform rotate-3 -translate-y-1/2 -translate-x-[10%] pointer-events-none" />

        <div className="relative z-[2] text-center flex-grow flex flex-col">
          <h3 className="text-[28px] mb-3 font-sans font-light text-foreground">
            {plan.name}
          </h3>

          {plan.hasMultipleIntervals && plan.intervals && (
            <div className="flex justify-center gap-2 mx-auto mb-4 bg-black/10 p-1 rounded-[20px] w-fit">
              {Object.keys(plan.intervals).map((intervalKey) => (
                <button
                  key={intervalKey}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIntervalChange(intervalKey);
                  }}
                  className={`
                    border-none px-3 py-1.5 rounded-2xl cursor-pointer transition-all duration-300 text-[13px] font-sans font-light text-foreground
                    ${(selectedInterval || Object.keys(plan.intervals || {})[0]) === intervalKey ? 'bg-white/20' : 'bg-transparent'}
                  `}
                >
                  {plan.toggleLabels?.[intervalKey] ||
                    intervalKey.charAt(0).toUpperCase() + intervalKey.slice(1)}
                </button>
              ))}
            </div>
          )}

          <p className="text-[40px] mb-1 font-sans font-light text-foreground">
            ${currentPrice}
          </p>

          <p className="text-sm mb-5 font-sans text-text-secondary">
            {currentIntervalText}
          </p>

          {/* Billing details */}
          <p className="text-xs -mt-2.5 mb-4 font-sans text-text-secondary">
            Cancel anytime • Next billing: {computeNextBillingDateText(plan, selectedInterval)}
          </p>

          <ul className="list-none p-0 mx-auto mb-6 text-left flex-grow w-fit min-h-[50px]">
            {plan.features &&
              plan.features.map((feature, fIndex) => (
                <li
                  key={fIndex}
                  className="text-[15px] mb-2.5 flex items-center font-sans font-light text-foreground"
                >
                  <span className="mr-2.5 text-accent-green">✓</span>
                  {feature}
                </li>
              ))}
          </ul>

          <button
            data-payment-cta
            onClick={handlePurchaseClick}
            className={`
              w-[80%] py-3 rounded-lg font-medium border border-white/20 cursor-pointer text-base transition-all duration-300 mt-auto self-center
              font-sans text-foreground shadow-sm
              bg-gradient-to-b from-white/15 to-white/5
              hover:from-white/25 hover:to-white/10 hover:shadow-md hover:-translate-y-px
            `}
          >
            Choose Plan
          </button>
        </div>
      </div>

      {layout === 'stacked' && !isActive && (
        <div className={`
          absolute -bottom-6 left-1/2 -translate-x-1/2 w-[100px] text-center text-sm pointer-events-none transition-opacity duration-300 font-sans text-text-secondary
          ${hover ? 'opacity-100' : 'opacity-0'}
        `}>
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

// --- Main PricingSection component ---
const PricingSection: React.FC<PricingSectionProps> = ({ plans = [], id }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedIntervals, setSelectedIntervals] = useState<Record<number, string>>({});
  const metrics = usePerformanceMetrics();

  // Use CSS media queries instead of state for layout mode
  // Default to side-by-side on large screens, stacked on small is handled via CSS classes if we wanted, 
  // but preserving the logic: we'll render the responsive grid structure.

  // Initialize selected intervals
  useEffect(() => {
    const initialIntervals: Record<number, string> = {};
    plans.forEach((plan, index) => {
      if (plan.hasMultipleIntervals && plan.intervals) {
        initialIntervals[index] = Object.keys(plan.intervals)[0] || 'monthly';
      }
    });
    setSelectedIntervals(initialIntervals);
  }, [plans]);

  return (
    <Section id="pricing" className="pricing-section py-16" data-pricing>
      <div className="container mx-auto px-4 py-8" data-cta>
        <h2 className="font-sans text-4xl md:text-5xl text-foreground mb-6 font-light text-center">
          Membership Options
        </h2>

        {/* Responsive Container: Stacked on mobile (default), Side-by-side on LG */}
        <div className="w-full mt-10 flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:items-stretch lg:gap-0">
          {plans.map((plan, index) => (
            <MembershipCard
              key={plan.id}
              plan={plan}
              isActive={true} // Always active in the responsive grid view
              onSelect={() => { }}
              index={index}
              activeIndex={0}
              totalCards={plans.length}
              selectedInterval={selectedIntervals[index]}
              onIntervalChange={(interval) => {
                setSelectedIntervals(prev => ({
                  ...prev,
                  [index]: interval
                }));
              }}
              onPurchase={metrics.recordPaymentClick}
              layout="side-by-side"
            />
          ))}
        </div>

        {process.env.NODE_ENV !== 'production' ? (
          <div className="mt-6 text-center text-sm text-text-secondary">
            <p>Dev Metrics: TTFCTA: {metrics.timeToFirstCTA ? (metrics.timeToFirstCTA / 1000).toFixed(2) + 's' : '—'} | TTPricing: {metrics.timeToPricing ? (metrics.timeToPricing / 1000).toFixed(2) + 's' : '—'} | Clicks→Payment: {metrics.clicksToPayment ?? '—'} | Payment Attempts: {metrics.paymentAttempts}</p>
          </div>
        ) : null}
      </div>
    </Section>
  );
};

export default PricingSection;
