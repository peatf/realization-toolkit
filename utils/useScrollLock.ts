/*
 * Hook: useScrollLock
 * Manages locking and unlocking body scroll while preserving scroll position and avoiding layout shift.
 * Handles iOS Safari quirks by fixing the body and restoring scroll on unlock.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ScrollLockManager {
  lock: () => void;
  unlock: () => void;
  isLocked: boolean;
}

function getScrollbarWidth(): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
  return window.innerWidth - document.documentElement.clientWidth;
}

function isIosSafari(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /iP(hone|ad|od)/.test(ua) && /Safari/.test(ua) && !/Chrome/.test(ua);
}

export function useScrollLock(initialLocked: boolean = false): ScrollLockManager {
  const [isLocked, setIsLocked] = useState<boolean>(initialLocked);
  const scrollTopRef = useRef<number>(0);
  const prevPaddingRightRef = useRef<string | null>(null);
  const lockCountRef = useRef<number>(0);

  const applyLock = useCallback(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (!body) return;

    lockCountRef.current += 1;
    if (lockCountRef.current > 1) return; // reference-counted; only apply on first lock

    // prevent layout shift by compensating for scrollbar
    const scrollbarWidth = getScrollbarWidth();
    prevPaddingRightRef.current = body.style.paddingRight || null;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // store scroll position and lock
    scrollTopRef.current = window.scrollY || window.pageYOffset || 0;
    body.classList.add('scroll-locked');

    if (isIosSafari()) {
      // iOS Safari requires position fixed to truly lock body scroll
      body.style.position = 'fixed';
      body.style.top = `-${scrollTopRef.current}px`;
      body.style.width = '100%';
    } else {
      body.style.overflow = 'hidden';
    }
  }, []);

  const removeLock = useCallback(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (!body) return;

    if (lockCountRef.current === 0) return;
    lockCountRef.current -= 1;
    if (lockCountRef.current > 0) return; // still locked by another consumer

    body.classList.remove('scroll-locked');
    body.style.overflow = '';

    if (isIosSafari()) {
      // restore scroll for iOS
      const scrollTop = Math.abs(parseInt(body.style.top || '0', 10)) || 0;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, scrollTop);
    }

    if (prevPaddingRightRef.current !== null) {
      body.style.paddingRight = prevPaddingRightRef.current;
      prevPaddingRightRef.current = null;
    } else {
      body.style.paddingRight = '';
    }
  }, []);

  const lock = useCallback(() => setIsLocked(true), []);
  const unlock = useCallback(() => setIsLocked(false), []);

  useEffect(() => {
    if (isLocked) {
      applyLock();
      return () => removeLock();
    } else {
      removeLock();
    }
  }, [isLocked, applyLock, removeLock]);

  // apply based on initial
  useEffect(() => {
    if (initialLocked) {
      setIsLocked(true);
    }
    // cleanup on unmount
    return () => {
      // ensure unlock on unmount
      lockCountRef.current = 1; // force removal
      removeLock();
    };
  }, []);

  return { lock, unlock, isLocked };
}

export default useScrollLock;


