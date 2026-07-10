import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initJourneyAnimation() {
  const section = document.getElementById('journey');
  if (!section) return;

  const pinContainer = section.querySelector('.journey-pin-container');
  const track = section.querySelector('.journey-track');
  const moments = section.querySelectorAll('.journey-moment');
  const progressBar = document.getElementById('journey-progress');
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

    // 2. Progress Bar
    if (progressBar) {
      gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainer,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 0.1,
        }
      });
    }

    // 3. Skew Inertia (Velocity based)
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter('.journey-image-wrapper', 'skewX', 'deg'); 
    const clamp = gsap.utils.clamp(-8, 8); 

    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = clamp(self.getVelocity() / -150);
        
        if (Math.abs(velocity) > Math.abs(proxy.skew)) {
          proxy.skew = velocity;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    // 4. Individual Item Animations triggered horizontally
    moments.forEach((moment) => {
      const imageWrapper = moment.querySelector('.journey-image-wrapper');
      const image = moment.querySelector('.journey-image-inner');
      const textWrapper = moment.querySelector('.journey-text-wrapper');

      if (imageWrapper && image) {
        // Subtle Parallax inside the window as you scroll
        gsap.fromTo(image, 
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: moment,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          }
        );
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
