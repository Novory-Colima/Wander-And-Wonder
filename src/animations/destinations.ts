import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from './shared';

export function initDestinationsAnimation() {
  const section = document.getElementById('destinations');
  if (!section) return;

  const bgTransition = section.querySelector('.dest-bg-transition');
  const header = section.querySelector('.dest-header');
  const items = section.querySelectorAll('.dest-item');
  const isReduced = prefersReducedMotion();

  if (isReduced) {
    if (bgTransition) {
      gsap.set(bgTransition, { opacity: 0 }); // Hide immediately for reduced motion
    }
    return;
  }

  // 1. Background Transition: Fade out the midnight overlay as you scroll in
  if (bgTransition) {
    gsap.to(bgTransition, {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom', // Start fading as soon as top of section hits bottom of viewport
        end: 'top 20%',      // Finish fading when top of section is 20% down from top
        scrub: true,
      }
    });
  }

  // 2. Header Entry
  if (header) {
    gsap.fromTo(header,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1, // Smooth scrub
        }
      }
    );
  }

  // 3. Editorial Parallax per Item
  items.forEach((item) => {
    const imageCol = item.querySelector('.dest-image-col');
    const image = item.querySelector('.dest-image');
    const textCol = item.querySelector('.dest-text-col');

    // Entry fade in for the whole item
    gsap.fromTo(item,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      }
    );

    // Parallax on the image (moves down inside its container as you scroll down)
    if (imageCol && image) {
      gsap.fromTo(image,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: imageCol,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }

    // Floating text block (moves up faster than standard scroll)
    if (textCol) {
      gsap.fromTo(textCol,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }
  });
}
