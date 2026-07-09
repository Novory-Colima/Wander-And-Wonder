import { gsap } from 'gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion } from './shared';
import { splitText } from '@/utils/text';

export function initHeroAnimation() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const bgImage = heroSection.querySelector('.hero-bg-image');
  const title = heroSection.querySelector('.hero-title h1');
  const subtitleContainer = heroSection.querySelector('.hero-subtitle');
  const tagline = heroSection.querySelector('.hero-tagline');
  const scrollIndicator = heroSection.querySelector('.hero-scroll');

  const tl = gsap.timeline({
    defaults: { ease: ANIMATION_CONSTANTS.ease.decelerate },
  });

  const isReduced = prefersReducedMotion();

  // 1. Split Text Preparation
  if (title && !isReduced) {
    // We split into words for the cinematic reveal
    splitText(title as HTMLElement, { type: 'words', wrapClass: 'split-words' });
    
    const words = title.querySelectorAll('.split-words');
    words.forEach(word => {
      const innerHtml = word.innerHTML;
      word.innerHTML = `<span style="display:inline-block; transform:translateY(100%); opacity:0;" class="word-inner">${innerHtml}</span>`;
      (word as HTMLElement).style.overflow = 'hidden';
      (word as HTMLElement).style.verticalAlign = 'top';
    });
  }

  // Set initial states
  gsap.set([subtitleContainer, tagline, scrollIndicator], { 
    opacity: 0, 
    y: isReduced ? 0 : 20 
  });
  
  if (bgImage && !isReduced) {
    // Initial clip-path for dramatic reveal
    gsap.set(bgImage, { 
      scale: 1.1,
      clipPath: 'inset(10% 10% 10% 10%)'
    });
  } else if (bgImage) {
    gsap.set(bgImage, { scale: 1 });
  }

  // 2. Animation Sequence
  // Very slow continuous zoom for ambient motion + clip path reveal
  if (bgImage && !isReduced) {
    tl.to(bgImage, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2.0, // Long majestic reveal
      ease: ANIMATION_CONSTANTS.ease.clipPath,
    }, 0.2);

    // After the clip-path finishes, start the ambient scale
    gsap.to(bgImage, {
      scale: 1.15,
      duration: 40, // Even slower than before
      ease: ANIMATION_CONSTANTS.ease.linear,
      repeat: -1,
      yoyo: true,
      delay: 2.2
    });
  }

  // Reveal title words
  if (title && !isReduced) {
    gsap.set(title.parentElement, { opacity: 1 });
    
    const wordInners = title.querySelectorAll('.word-inner');
    tl.to(wordInners, {
      y: '0%',
      opacity: 1,
      duration: 1.8, // Slower
      stagger: 0.15, // Longer pause between words
      ease: ANIMATION_CONSTANTS.ease.cinematic
    }, bgImage ? 0.8 : 0.2); // Start while image is still revealing
  } else if (title) {
    gsap.to(title.parentElement, { opacity: 1, duration: ANIMATION_CONSTANTS.duration.fast }, 0.2);
  }

  // Reveal subtitle
  tl.to(subtitleContainer, {
    opacity: 1,
    y: 0,
    duration: ANIMATION_CONSTANTS.duration.base,
  }, "-=1.0");

  // Reveal tagline
  tl.to(tagline, {
    opacity: 1,
    y: 0,
    duration: ANIMATION_CONSTANTS.duration.base,
  }, "-=0.8");

  // Reveal scroll indicator
  tl.to(scrollIndicator, {
    opacity: 1,
    y: 0,
    duration: ANIMATION_CONSTANTS.duration.base,
  }, "-=0.6");
  
  // 3. Scroll-driven handoff to Scene 2
  if (bgImage && !isReduced) {
    gsap.to(bgImage, {
      scale: 1, // Scale down from the ambient 1.15
      clipPath: 'inset(5% 5% 20% 5% round 12px)', // Mask into a frame
      yPercent: 15, // Subtle parallax
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Fade out title faster than the image
    if (title) {
      gsap.to(title.parentElement, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'center top',
          scrub: true
        }
      });
    }
  }

  return tl;
}
