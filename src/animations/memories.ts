import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIMATION_CONSTANTS, prefersReducedMotion, createScrollTrigger } from './shared';
import { splitText } from '@/utils/text';

export function initMemoriesAnimation() {
  const section = document.getElementById('memories');
  if (!section) return;

  const images = section.querySelectorAll('.rounded-none');
  const quotes = section.querySelectorAll('blockquote p');
  const finalTitle = section.querySelector('h2');
  const isReduced = prefersReducedMotion();

  // 1. Background Color Transition (Sunset to Night)
  // The section starts as 'bg-ivory' from HTML. We transition to midnight when it enters the viewport.
  gsap.to(section, {
    backgroundColor: '#070F18', // Midnight
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 60%',
      end: 'top 20%',
      scrub: true,
    }
  });

  // 2. Focus Pulling (Blur/Grayscale to Full Focus) for Memories
  images.forEach(imageContainer => {
    const img = imageContainer.querySelector('img');
    if (!img || isReduced) return;

    // Start with blurred and grayscale
    gsap.set(img, { filter: 'blur(15px) grayscale(100%)', scale: 1.1 });
    
    // Animate to full color and sharp focus exactly at the center of the viewport
    gsap.to(img, {
      filter: 'blur(0px) grayscale(0%)',
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: imageContainer,
        start: 'top 90%',
        end: 'center center',
        scrub: true,
      }
    });

    // Animate back to blur as it leaves the top
    gsap.to(img, {
      filter: 'blur(15px) grayscale(100%)',
      ease: 'power2.in',
      scrollTrigger: {
        trigger: imageContainer,
        start: 'center center',
        end: 'bottom 10%',
        scrub: true,
      }
    });
  });

  // 3. Asynchronous Floating for Quotes (Parallax)
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
      
      // Reveal
      gsap.to(lineInners, {
        y: '0%',
        opacity: 1,
        duration: ANIMATION_CONSTANTS.duration.base,
        stagger: ANIMATION_CONSTANTS.stagger.slow,
        ease: ANIMATION_CONSTANTS.ease.smooth,
        scrollTrigger: createScrollTrigger(quote, { start: 'top 80%' })
      });

      // Float Parallax
      gsap.to(quote, {
        y: -100, // Moves up faster than the background
        ease: 'none',
        scrollTrigger: {
          trigger: quote,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
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

  // 4. Final Title Reveal
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
