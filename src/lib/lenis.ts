/**
 * Lenis smooth scroll initialization.
 *
 * Single global instance shared with ScrollTrigger.
 * Per IMPLEMENTATION_02_ENGINEERING.md: exactly one instance, never inside components.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | undefined;

/** Initialize Lenis smooth scroll and synchronize with GSAP */
export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  lenisInstance = new Lenis({
    duration: prefersReducedMotion ? 0.5 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
  // This ensures they are perfectly synchronized
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

/** Get the current Lenis instance */
export function getLenis(): Lenis | undefined {
  return lenisInstance;
}

/** Destroy the Lenis instance */
export function destroyLenis(): void {
  if (lenisInstance) {
    gsap.ticker.remove((time) => {
      lenisInstance?.raf(time * 1000);
    });
    lenisInstance.destroy();
    lenisInstance = undefined;
  }
}
