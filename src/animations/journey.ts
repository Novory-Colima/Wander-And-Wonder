import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initJourneyAnimation() {
  const section = document.getElementById('journey');
  if (!section) return;

  const moments = section.querySelectorAll('.flex.flex-col');
  const isReduced = prefersReducedMotion();

  moments.forEach((moment, index) => {
    const imageContainer = moment.querySelector('.w-full.md\\:w-1\\/2.overflow-hidden');
    const image = moment.querySelector('img');
    const textContainer = moment.querySelector('.flex.flex-col.justify-center');
    
    // Check if it's the right-aligned image variant
    const isReversed = index % 2 !== 0;

    // Set initial states for text
    if (textContainer) {
      gsap.set(textContainer, { 
        opacity: 0, 
        y: isReduced ? 0 : 30 
      });
    }

    // Set initial states for image mask
    if (imageContainer && image && !isReduced) {
      gsap.set(imageContainer, { clipPath: isReversed ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' });
      gsap.set(image, { scale: 1.2 }); // Scale up for the initial state
    } else if (imageContainer) {
      gsap.set(imageContainer, { opacity: 0 });
    }

    const tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(moment, { start: 'top 75%' }),
      defaults: {
        duration: ANIMATION_CONSTANTS.duration.slow, // Longer duration for elegance
        ease: ANIMATION_CONSTANTS.ease.clipPath
      }
    });

    // Animate image entrance
    if (imageContainer && image && !isReduced) {
      tl.to(imageContainer, {
        clipPath: 'inset(0% 0% 0% 0%)',
      });
      tl.to(image, {
        scale: 1, // Scale down to 1 to create depth
        ease: ANIMATION_CONSTANTS.ease.decelerate,
      }, "<");
    } else if (imageContainer) {
      tl.to(imageContainer, { opacity: 1, duration: ANIMATION_CONSTANTS.duration.base }, 0);
    }

    // Animate text entrance
    if (textContainer) {
      tl.to(textContainer, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONSTANTS.duration.base,
        ease: ANIMATION_CONSTANTS.ease.smooth,
      }, isReduced ? 0 : "-=1.2"); // Stagger slightly behind the slow image reveal
    }

    // Very subtle parallax on the image if not reduced motion
    if (image && !isReduced) {
      gsap.to(image, {
        yPercent: 12, // Deeper parallax
        ease: 'none',
        scrollTrigger: {
          trigger: moment,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // Independent parallax for text
    if (textContainer && !isReduced) {
      gsap.to(textContainer, {
        yPercent: -15, // Moves opposite to the image
        ease: 'none',
        scrollTrigger: {
          trigger: moment,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  });
}
