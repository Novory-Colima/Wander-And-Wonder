import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initExperiencesAnimation() {
  const section = document.getElementById('experiences');
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

  // Stagger Cards (with a bit of extra margin to avoid overlapping the pinned header initially)
  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: isReduced ? 0 : 60 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONSTANTS.duration.slow, // Slower reveal
      ease: ANIMATION_CONSTANTS.ease.smooth,
      stagger: 0.2, // Slower stagger
      scrollTrigger: createScrollTrigger(cards[0], { start: 'top 75%' })
    });
    
    // Subtle float as they scroll
    if (!isReduced) {
      cards.forEach((card, index) => {
        gsap.to(card, {
          yPercent: index % 2 === 0 ? -10 : -15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }
  }
}
