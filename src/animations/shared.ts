export const ANIMATION_CONSTANTS = {
  duration: {
    base: 1.2,
    fast: 0.6,
    slow: 2.0,
    verySlow: 4.0,
  },
  ease: {
    smooth: 'power2.out',
    decelerate: 'power3.out',
    cinematic: 'expo.out',
    linear: 'none',
    clipPath: 'power4.inOut',
  },
  stagger: {
    base: 0.1,
    slow: 0.2,
  },
  parallax: {
    subtle: 30,
    base: 60,
    large: 120,
  }
};

/**
 * Helper to check if reduced motion is requested
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
