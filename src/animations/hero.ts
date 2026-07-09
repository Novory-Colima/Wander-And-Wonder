import { gsap } from 'gsap';

export function initHeroAnimation() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const bgBase = heroSection.querySelector('.hero-bg-base');
  const spotlightLayer = heroSection.querySelector('.hero-spotlight-layer') as HTMLElement;
  const title = heroSection.querySelector('.hero-title');
  const metaContainer = heroSection.querySelector('.hero-meta');

  // We are removing the reducedMotion check temporarily because it was disabling
  // the entire interactive experience for users on power-saving modes or touch laptops.

  // 1. Initial Setup
  gsap.set(metaContainer, { opacity: 0, y: 20 });
  
  // Hide and scale up images for the initial "developing" reveal
  if (bgBase) {
    gsap.set(bgBase, { scale: 1.15, opacity: 0, filter: 'blur(10px)' });
  }

  if (title) {
    const words = title.querySelectorAll('span');
    gsap.set(words, { opacity: 0, y: 50, rotateX: 20 });
  }

  // 2. The Grand Reveal Sequence
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // Reveal the image beautifully (Cinematic "Darkroom" Entrance)
  if (bgBase) {
    tl.to(bgBase, {
      scale: 1.02,
      opacity: 0.8,
      filter: 'blur(0px)',
      duration: 3.5,
      ease: 'power2.out'
    }, 0);
  }

  // Fade in the massive typography with an elegant lift
  if (title) {
    tl.to(title.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 2.5,
      stagger: 0.2,
      ease: 'expo.out'
    }, 0.5);
  }

  // Fade in the metadata (subtitle, indicator)
  tl.to(metaContainer, {
    opacity: 1,
    y: 0,
    duration: 1.5,
  }, 1.5);

  // 3. The Interactive Spotlight Logic
  if (spotlightLayer) {
    // Reveal the spotlight gently
    gsap.to(spotlightLayer, {
      opacity: 0.7,
      duration: 3,
      ease: 'power2.inOut',
      delay: 1.0
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Set immediate initial position
    gsap.set(spotlightLayer, { x: mouseX, y: mouseY });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
      
      // Buttery smooth GSAP tracking
      gsap.to(spotlightLayer, {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });

    // 4. Scroll Transition Setup
    // Expand the light drastically on scroll down
    gsap.to(spotlightLayer, {
      scale: 4,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Ambient extremely slow zoom on the photography
  if (bgBase) {
    gsap.to(bgBase, {
      scale: 1,
      duration: 40,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }

  return tl;
}
