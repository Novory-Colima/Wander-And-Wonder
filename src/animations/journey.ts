import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initJourneyAnimation() {
  const section = document.getElementById('journey');
  if (!section) return;

  const pinContainer = section.querySelector('.journey-pin-container');
  const track = section.querySelector('.journey-track');
  const moments = section.querySelectorAll('.journey-moment');
  const isReduced = prefersReducedMotion();

  if (pinContainer && track && !isReduced) {
    // 1. Horizontal Scroll Pinning
    const scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: pinContainer,
        start: 'top top',
        end: () => `+=${track.scrollWidth}`, // Creates enough scroll distance
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    // 2. Individual Item Animations triggered horizontally
    moments.forEach((moment, index) => {
      const imageWrapper = moment.querySelector('.journey-image-wrapper');
      const image = moment.querySelector('img');
      const textWrapper = moment.querySelector('.journey-text-wrapper');

      // Setup initial clip path (reveal from left to right as we scroll horizontally)
      if (imageWrapper && image) {
        gsap.set(imageWrapper, { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set(image, { scale: 1.15 });

        gsap.to(imageWrapper, {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: moment,
            containerAnimation: scrollTween,
            start: 'left center+=20%',
            end: 'left center-=20%',
            scrub: true,
          }
        });

        gsap.to(image, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: moment,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        });
      }

      if (textWrapper) {
        gsap.set(textWrapper, { opacity: 0, x: 50 });
        gsap.to(textWrapper, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: moment,
            containerAnimation: scrollTween,
            start: 'left center+=30%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });
  } else if (moments.length > 0) {
    // Fallback for reduced motion or missing elements (vertical standard scroll)
    moments.forEach((moment) => {
      gsap.from(moment, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: moment,
          start: 'top 80%'
        }
      });
    });
  }
}
