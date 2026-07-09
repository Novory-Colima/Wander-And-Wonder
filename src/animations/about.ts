import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initAboutAnimation() {
  const section = document.getElementById('about');
  if (!section) return;

  const image = section.querySelector('.relative > div');
  const stats = section.querySelector('.relative > div + div'); // The floating stats box
  const content = section.querySelector('.flex.flex-col.justify-center');

  const isReduced = prefersReducedMotion();

  // Left Column (Image & Stats)
  if (image) {
    gsap.set(image, { opacity: 0, x: isReduced ? 0 : -30 });
    gsap.to(image, {
      opacity: 1,
      x: 0,
      duration: ANIMATION_CONSTANTS.duration.base,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      scrollTrigger: createScrollTrigger(image)
    });
  }

  if (stats) {
    gsap.set(stats, { opacity: 0 }); // Removed y transform for stability
    gsap.to(stats, {
      opacity: 1,
      duration: ANIMATION_CONSTANTS.duration.base,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      delay: 0.3, // Slightly after image
      scrollTrigger: createScrollTrigger(stats)
    });
  }

  // Right Column (Content)
  if (content) {
    gsap.set(content, { opacity: 0, x: isReduced ? 0 : 30 });
    gsap.to(content, {
      opacity: 1,
      x: 0,
      duration: ANIMATION_CONSTANTS.duration.base,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      scrollTrigger: createScrollTrigger(content)
    });
  }
}
