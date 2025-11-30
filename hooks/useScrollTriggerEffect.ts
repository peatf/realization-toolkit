import { useEffect, type DependencyList } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let scrollTriggerRegistered = false;

/**
 * A hook to safely use GSAP ScrollTrigger with automatic cleanup and SSR protection.
 * 
 * @param effect A function that creates GSAP animations/triggers. Should return a cleanup function or void.
 * @param deps Dependency array for the effect.
 */
export const useScrollTriggerEffect = (
    effect: () => void | (() => void),
    deps: DependencyList = []
) => {
    useEffect(() => {
        // Guard against SSR
        if (typeof window === 'undefined') return;

        // Register plugin once
        if (!scrollTriggerRegistered) {
            gsap.registerPlugin(ScrollTrigger);
            scrollTriggerRegistered = true;
        }

        // Create a context for easy cleanup of all GSAP animations created within this effect
        const ctx = gsap.context(() => {
            const cleanup = effect();
            return cleanup; // Return cleanup to be called by ctx.revert() if needed, though ctx handles most GSAP stuff
        });

        return () => {
            ctx.revert(); // Kills all animations and triggers created in this context
        };
    }, deps);
};
