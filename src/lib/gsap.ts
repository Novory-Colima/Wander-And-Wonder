/**
 * GSAP initialization and registration.
 *
 * Central registration point for all GSAP plugins.
 * Per PROJECT_RULES.md: animation logic lives in src/animations/.
 * This file only handles setup.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

/** Register GSAP plugins */
export function registerGSAP(): void {
  if (isRegistered) return;

  gsap.registerPlugin(ScrollTrigger);

  // Default easing per DESIGN_SPEC: prefer Power2, Power3, Expo.out, Sine
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  });

  isRegistered = true;
}

/** Get the ScrollTrigger instance */
export function getScrollTrigger(): typeof ScrollTrigger {
  return ScrollTrigger;
}

export { gsap, ScrollTrigger };
