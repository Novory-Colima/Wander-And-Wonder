import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initAroundWorldAnimation() {
  const section = document.getElementById('around-the-world');
  if (!section) return;

  const globeContainer = section.querySelector('.globe-container');
  const globeGrid = section.querySelector('.globe-container svg');
  const storyCards = section.querySelectorAll('.story-card-float');

  const isReduced = prefersReducedMotion();

  // 1. Setup Initial States
  gsap.set(storyCards, {
    opacity: 0,
    y: isReduced ? 0 : 40,
    scale: isReduced ? 1 : 0.95,
  });

  // 2. Scroll Scrubbed Globe Rotation & Ambient Float
  if (!isReduced) {
    if (globeContainer) {
      // Gentle floating effect for the whole globe
      gsap.to(globeContainer, {
        y: -15,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    if (globeGrid) {
      // Scroll scrubbed rotation
      gsap.to(globeGrid, {
        rotation: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Individual subtle floating for story cards to make them feel organic
    storyCards.forEach((card, index) => {
      gsap.to(card, {
        y: `+=${10 + index * 2}`,
        duration: 4 + index,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.5
      });
    });

    // Interactive Mouse Tracking Parallax
    section.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (globeContainer) {
        gsap.to(globeContainer, {
          x: x * -20,
          y: y * -20,
          duration: 1,
          ease: 'power2.out'
        });
      }

      storyCards.forEach((card, index) => {
        const depth = (index + 1) * 15;
        gsap.to(card, {
          x: x * depth,
          y: y * depth,
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    });
  }

  // 3. Scroll-Triggered Sequence
  const tl = gsap.timeline({
    scrollTrigger: createScrollTrigger(section, {
      start: 'top 60%',
    }),
    defaults: {
      ease: ANIMATION_CONSTANTS.ease.smooth,
      duration: ANIMATION_CONSTANTS.duration.base,
    }
  });

  tl.to(storyCards, {
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: ANIMATION_CONSTANTS.stagger.slow,
    onComplete: function () {
      if (!isReduced) gsap.set(storyCards, { clearProps: 'transform' });
    }
  });

  return tl;
}
