import { useEffect, useMemo, useRef, useState } from 'react';

export interface PerformanceMetrics {
  timeToFirstCTA: number | null;
  timeToPricing: number | null;
  paymentAttempts: number;
  clicksToPayment: number | null;
  startedAt: number;
}

export interface MetricsTracker extends PerformanceMetrics {
  recordPaymentClick: () => void;
}

function now(): number {
  if (typeof performance !== 'undefined' && performance.now) return performance.now();
  return Date.now();
}

export function usePerformanceMetrics(): MetricsTracker {
  const [timeToFirstCTA, setTimeToFirstCTA] = useState<number | null>(null);
  const [timeToPricing, setTimeToPricing] = useState<number | null>(null);
  const [paymentAttempts, setPaymentAttempts] = useState<number>(0);
  const [clicksToPayment, setClicksToPayment] = useState<number | null>(null);
  const startedAtRef = useRef<number>(now());
  const clickCountRef = useRef<number>(0);
  const ctaObservedRef = useRef<boolean>(false);
  const pricingObservedRef = useRef<boolean>(false);

  // Observe CTA visibility
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleEntries = (entries: IntersectionObserverEntry[]) => {
      if (ctaObservedRef.current) return;
      const visible = entries.some(e => e.isIntersecting && e.intersectionRatio > 0);
      if (visible) {
        ctaObservedRef.current = true;
        setTimeToFirstCTA(Math.max(0, now() - startedAtRef.current));
      }
    };

    const observer = new IntersectionObserver(handleEntries, {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.25, 0.5],
    });

    const observeCtas = () => {
      const ctas = Array.from(document.querySelectorAll('[data-cta]')) as Element[];
      ctas.forEach(el => observer.observe(el));
    };

    observeCtas();

    // Re-scan in case CTAs mount late
    const rescanTimeouts = [500, 1500, 3000];
    const timers = rescanTimeouts.map(t => setTimeout(observeCtas, t));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // Observe Pricing visibility
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleEntries = (entries: IntersectionObserverEntry[]) => {
      if (pricingObservedRef.current) return;
      const visible = entries.some(e => e.isIntersecting && e.intersectionRatio > 0);
      if (visible) {
        pricingObservedRef.current = true;
        setTimeToPricing(Math.max(0, now() - startedAtRef.current));
      }
    };

    const observer = new IntersectionObserver(handleEntries, {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.25, 0.5],
    });

    const observePricing = () => {
      const el = (document.querySelector('[data-pricing]') || document.querySelector('#pricing')) as Element | null;
      if (el) observer.observe(el);
    };

    observePricing();
    const timers = [500, 1500, 3000].map(t => setTimeout(observePricing, t));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // Click path to payment: count clicks and detect payment cta
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const handleClick = (e: MouseEvent) => {
      clickCountRef.current += 1;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const paymentCta = target.closest('[data-payment-cta]');
      if (paymentCta && clicksToPayment === null) {
        setClicksToPayment(clickCountRef.current);
      }
    };
    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick as EventListener);
  }, [clicksToPayment]);

  const recordPaymentClick = () => {
    setPaymentAttempts(prev => prev + 1);
    if (clicksToPayment === null) {
      setClicksToPayment(clickCountRef.current + 1);
    }
  };

  return useMemo(() => ({
    timeToFirstCTA,
    timeToPricing,
    paymentAttempts,
    clicksToPayment,
    startedAt: startedAtRef.current,
    recordPaymentClick,
  }), [timeToFirstCTA, timeToPricing, paymentAttempts, clicksToPayment]);
}

export default usePerformanceMetrics;


