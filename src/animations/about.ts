import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from './shared';

export function initAboutAnimation() {
  const section = document.getElementById('about');
  if (!section) return;

  const isReduced = prefersReducedMotion();

  // 1. Right Column Staggered Reveal
  const contentCol = section.querySelector('.about-content-col');
  if (contentCol && !isReduced) {
    const elementsToAnimate = [
      ...contentCol.querySelectorAll('h2, .eyebrow'), // Title and eyebrow
      ...contentCol.querySelectorAll('p'), // Paragraphs
      ...contentCol.querySelectorAll('.about-reason-item') // Feature cards
    ];

    gsap.fromTo(elementsToAnimate,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentCol,
          start: 'top 80%',
        }
      }
    );
  }

  // 2. Statistics Counter Animation
  const statsBox = section.querySelector('.about-stats');
  const counters = section.querySelectorAll('.stat-counter');
  
  if (statsBox && counters.length > 0) {
    gsap.fromTo(statsBox,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsBox,
          start: 'top 90%',
        },
        onStart: () => {
          if (!isReduced) {
            counters.forEach(counter => {
              const target = parseFloat(counter.getAttribute('data-target') || '0');
              gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: 1 }, // Snap to whole numbers
                onUpdate: function() {
                  // Ensure it stays an integer during update
                  counter.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
                }
              });
            });
          } else {
            counters.forEach(counter => {
              counter.innerHTML = counter.getAttribute('data-target') || '0';
            });
          }
        }
      }
    );
  }

  // 3. Subtle Image Parallax/Zoom inside Sticky container
  const imageCol = section.querySelector('.about-sticky-col');
  const image = section.querySelector('.about-image');
  
  if (imageCol && image && !isReduced) {
    gsap.to(image, {
      scale: 1, // scales down from 1.05 to 1
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }
}
