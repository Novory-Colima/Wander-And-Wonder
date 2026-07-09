import { gsap } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';
import { splitText } from '@/utils/text';

export function initMemoriesAnimation() {
  const section = document.getElementById('memories');
  if (!section) return;

  const images = section.querySelectorAll('.rounded-sm');
  const quotes = section.querySelectorAll('blockquote p');
  const finalTitle = section.querySelector('h2');

  const isReduced = prefersReducedMotion();

  // 1. Slow Image Reveals & Subtle Parallax
  images.forEach(imageContainer => {
    const img = imageContainer.querySelector('img');
    
    gsap.set(imageContainer, { 
      opacity: 0, 
      y: isReduced ? 0 : 30,
      filter: isReduced ? 'none' : 'blur(10px)' 
    });
    
    gsap.to(imageContainer, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: ANIMATION_CONSTANTS.duration.verySlow, // Extended fade for nostalgia
      ease: 'sine.out',
      scrollTrigger: createScrollTrigger(imageContainer, { start: 'top 80%' })
    });

    if (img && !isReduced) {
      gsap.set(img, { scale: 1.05 });
      gsap.to(img, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: imageContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  });

  // 2. Quote text splitting
  quotes.forEach(quote => {
    if (!isReduced) {
      splitText(quote as HTMLElement, { type: 'lines', wrapClass: 'split-lines' });
      
      const lines = quote.querySelectorAll('.split-lines');
      lines.forEach(line => {
        const innerHtml = line.innerHTML;
        line.innerHTML = `<span style="display:inline-block; transform:translateY(100%); opacity:0;" class="line-inner">${innerHtml}</span>`;
        (line as HTMLElement).style.overflow = 'hidden';
      });

      const lineInners = quote.querySelectorAll('.line-inner');
      
      gsap.to(lineInners, {
        y: '0%',
        opacity: 1,
        duration: ANIMATION_CONSTANTS.duration.base,
        stagger: ANIMATION_CONSTANTS.stagger.slow,
        ease: ANIMATION_CONSTANTS.ease.smooth,
        scrollTrigger: createScrollTrigger(quote, { start: 'top 80%' })
      });
    } else {
      gsap.set(quote, { opacity: 0 });
      gsap.to(quote, {
        opacity: 1,
        duration: ANIMATION_CONSTANTS.duration.slow,
        scrollTrigger: createScrollTrigger(quote, { start: 'top 80%' })
      });
    }
  });

  // 3. Final Title Reveal
  if (finalTitle) {
    gsap.set(finalTitle, { opacity: 0, y: isReduced ? 0 : 20 });
    gsap.to(finalTitle, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONSTANTS.duration.slow,
      ease: ANIMATION_CONSTANTS.ease.smooth,
      scrollTrigger: createScrollTrigger(finalTitle, { start: 'top 80%' })
    });
  }
}
