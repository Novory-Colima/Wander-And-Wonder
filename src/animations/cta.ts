import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initCTAAnimation() {
  const section = document.getElementById('start');
  if (!section) return;

  const bgImage = section.querySelector('img');
  const content = section.querySelector('.relative.z-10');

  const isReduced = prefersReducedMotion();

  // 1. Ambient Background Motion (Scale up slowly to suggest an ongoing journey)
  if (bgImage && !isReduced) {
    gsap.set(bgImage, { scale: 1 });
    gsap.to(bgImage, {
      scale: 1.05,
      duration: 30,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }

  // 2. Form/Content Reveal
  if (content) {
    gsap.set(content, { 
      opacity: 0, 
      y: isReduced ? 0 : 40,
      clipPath: isReduced ? 'none' : 'inset(10% 0% 10% 0%)' 
    });
    
    gsap.to(content, {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: ANIMATION_CONSTANTS.duration.slow,
      ease: ANIMATION_CONSTANTS.ease.clipPath,
      scrollTrigger: createScrollTrigger(content, { start: 'top 85%' })
    });
  }
}
