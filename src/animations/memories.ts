import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';

export function initMemoriesAnimation() {
  const section = document.getElementById('memories');
  if (!section) return;

  const transitionScreen = document.getElementById('memory-transition-screen');
  const introText = document.getElementById('memory-intro-text');
  const fragments = document.querySelectorAll('.memory-fragment');
  const outroText = document.getElementById('memory-outro-text');
  const isReduced = prefersReducedMotion();

  // 1. The Fade to Black (Cierre de Ojos) with pinning for contrast and reading time
  if (transitionScreen && introText) {
    const title = introText.querySelector('h2');
    const subtitle = introText.querySelector('span');

    // Force initial styles for clean interpolation
    gsap.set(transitionScreen, { backgroundColor: '#F5F3EF' }); // bg-ivory hex
    if (title) gsap.set(title, { color: '#070F18' }); // text-midnight hex
    if (subtitle) gsap.set(subtitle, { color: 'rgba(7, 15, 24, 0.6)' }); // text-midnight/60 hex

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: transitionScreen,
        start: 'top top',
        end: '+=120%', // Pin for 1.2 screen heights
        pin: true,
        scrub: true,
      }
    });

    // 0 -> 40%: Fade background to midnight, fade text opacity to 1, and fade text color to white
    tl.to(transitionScreen, { backgroundColor: '#070F18', duration: 1 }, 0)
      .to(introText, { opacity: 1, duration: 1 }, 0)
      .to(title, { color: '#FAFAF8', duration: 1 }, 0)
      .to(subtitle, { color: 'rgba(250, 250, 248, 0.6)', duration: 1 }, 0);

    // 40% -> 70%: Hold (let user read text fully white on midnight background)
    tl.to({}, { duration: 0.8 });

    // 70% -> 100%: Fade text out to absolute darkness
    tl.to(introText, { opacity: 0, duration: 0.8 });
  }

  // 2. The Memory Void (Parallax, Drift & Focus Entrance)
  if (!isReduced) {
    fragments.forEach((fragment) => {
      const speed = parseFloat((fragment as HTMLElement).dataset.speed || '1');
      const img = fragment.querySelector('.memory-image');
      const quoteWrapper = fragment.querySelector('.memory-quote-wrapper');

      // Determine horizontal drift direction based on alignment class
      const className = fragment.className;
      const isLeft = className.includes('left-');
      const driftAmount = isLeft ? 100 : -100; // Drift towards the center/opposite side

      // Vertical parallax offset
      const movementY = (1 - speed) * 500;

      // Master timeline for this fragment scrubbing over its entire lifecycle in the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fragment,
          start: 'top bottom', // Starts entering viewport
          end: 'bottom top',   // Leaves viewport
          scrub: true,
        }
      });

      // Continuous movement (Vertical Parallax & Horizontal Drift)
      tl.to(fragment, {
        y: movementY,
        x: driftAmount,
        ease: 'none',
        duration: 1
      }, 0);

      // Entrance focus and fade-in (completes early, around 40% of the viewport scroll)
      if (img) {
        gsap.set(img, { filter: 'blur(20px) grayscale(100%)', scale: 1.25 });
        tl.to(img, {
          filter: 'blur(0px) grayscale(0%)',
          scale: 1,
          ease: 'power1.out',
          duration: 0.4
        }, 0);
      }

      if (quoteWrapper) {
        gsap.set(quoteWrapper, { opacity: 0, y: 30 });
        tl.to(quoteWrapper, {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.4
        }, 0);
      }
    });
  }

  // 3. Final Anchor
  if (outroText) {
    gsap.fromTo(outroText,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: outroText,
          start: 'top 80%'
        }
      }
    );
  }
}
