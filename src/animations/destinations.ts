import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initDestinationsAnimation() {
  const section = document.getElementById('destinations');
  if (!section) return;

  const header = section.querySelector('.section-header');
  const cards = section.querySelectorAll('article');

  const isReduced = prefersReducedMotion();

  // Reveal Header
  if (header) {
    gsap.set(header, { opacity: 0, y: isReduced ? 0 : 30 });
    gsap.to(header, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONSTANTS.duration.base,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      scrollTrigger: createScrollTrigger(header)
    });
  }

  // Stagger Cards
  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: isReduced ? 0 : 40 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONSTANTS.duration.base,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      stagger: ANIMATION_CONSTANTS.stagger.base,
      scrollTrigger: createScrollTrigger(cards[0], { start: 'top 85%' })
    });
  }
}
