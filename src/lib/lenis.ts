/**
 * Lenis smooth scroll initialization.
 *
 * Single global instance shared with ScrollTrigger.
 * Per IMPLEMENTATION_02_ENGINEERING.md: exactly one instance, never inside components.
 */
import Lenis from 'lenis';

let lenisInstance: Lenis | undefined;

/** Initialize Lenis smooth scroll */
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

  function raf(time: number): void {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenisInstance;
}

/** Get the current Lenis instance */
export function getLenis(): Lenis | undefined {
  return lenisInstance;
}

/** Destroy the Lenis instance */
export function destroyLenis(): void {
  lenisInstance?.destroy();
  lenisInstance = undefined;
}
