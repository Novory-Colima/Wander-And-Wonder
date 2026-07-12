import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from './shared';

export function initCTAAnimation() {
  const section = document.getElementById('contact');
  if (!section) return;

  const isReduced = prefersReducedMotion();
  const textWrapper = section.querySelector('.cta-text-wrapper');
  const formWrapper = section.querySelector('.cta-form-wrapper');
  
  if (!isReduced) {
    // Parallax background image
    const bgImage = section.querySelector('.cta-bg-image');
    if (bgImage) {
      gsap.to(bgImage, {
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

    // Act 1: Text entrance
    if (textWrapper) {
      const title = textWrapper.querySelector('.cta-title');
      const paragraph = textWrapper.querySelector('.cta-description');
      
      gsap.fromTo([title, paragraph].filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textWrapper,
            start: 'top 85%',
          }
        }
      );
    }

    // Act 2: Form entrance
    if (formWrapper) {
      const inputGroups = formWrapper.querySelectorAll('.cta-input-group');
      const submitBtn = formWrapper.querySelector('.cta-submit-group');
      
      const formElements = [...inputGroups, submitBtn].filter(Boolean);
      
      gsap.fromTo(formElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formWrapper,
            start: 'top 75%',
          }
        }
      );
    }
  }
}
