import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initDreamAnimation() {
  const section = document.getElementById('dream');
  if (!section) return;

  const mainImage = section.querySelector('.w-full > figure > div > img');
  const title = section.querySelector('h2');
  const paragraph = section.querySelector('h2 + p');
  const smallMoments = section.querySelectorAll('.grid > div');

  const isReduced = prefersReducedMotion();

  // 1. Subtle Parallax for the main image
  if (mainImage && !isReduced) {
    // Zoom the image in slightly so we have room to parallax it
    gsap.set(mainImage, { scale: 1.1 });
    
    gsap.to(mainImage, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  // 2. Sequential Entrance for text
  if (title && paragraph) {
    gsap.set([title, paragraph], { opacity: 0, y: isReduced ? 0 : 30 });
    
    gsap.to([title, paragraph], {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONSTANTS.duration.slow, // Slower for dream state
      ease: ANIMATION_CONSTANTS.ease.smooth,
      stagger: 0.3, // More pause between title and paragraph
      scrollTrigger: createScrollTrigger(title, { start: 'top 80%' }) // Trigger later
    });
  }

  // 3. Staggered reveal for the small moments
  if (smallMoments.length > 0) {
    gsap.set(smallMoments, { opacity: 0, y: isReduced ? 0 : 40 });
    
    gsap.to(smallMoments, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONSTANTS.duration.slow,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      stagger: 0.25, // More pause between images
      scrollTrigger: createScrollTrigger(smallMoments[0], { start: 'top 85%' }) // Trigger later
    });
  }
}
