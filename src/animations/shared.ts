/**
 * Shared animation utilities.
 *
 * Contains reusable animation patterns used across multiple scenes.
 * Per IMPLEMENTATION_02_ENGINEERING.md: CSS transitions for simple interactions,
 * GSAP reserved for timelines, sequencing, parallax, reveal effects.
 */

/** Check if reduced motion is preferred */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Standard animation durations (seconds) */
export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  reveal: 1.2,
  cinematic: 1.8,
} as const;

/** Standard easing curves for GSAP */
export const EASINGS = {
  standard: 'power2.out',
  smooth: 'power3.out',
  emphasis: 'expo.out',
  decelerate: 'sine.out',
  entrance: 'power2.inOut',
} as const;
