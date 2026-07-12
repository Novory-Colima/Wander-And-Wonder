import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from './shared';

export function initExperiencesAnimation() {
  const section = document.getElementById('experiences');
  if (!section) return;

  const items = section.querySelectorAll('.exp-item');
  const imageWrappers = section.querySelectorAll('.exp-image-wrapper');
  const isReduced = prefersReducedMotion();

  if (!items.length || !imageWrappers.length) return;

  // Track the currently active index
  let activeIndex = -1;

  // Function to activate a specific experience index
  const activateExperience = (index: number) => {
    if (index === activeIndex) return; // Do nothing if already active
    activeIndex = index;

    // 1. Crossfade Background Images
    imageWrappers.forEach((wrapper, imgIndex) => {
      const img = wrapper.querySelector('img');
      
      if (index === imgIndex) {
        // Fade in active wrapper
        gsap.to(wrapper, { opacity: 1, duration: 1.5, ease: 'power2.inOut', overwrite: 'auto' });
        
        // Start continuous Ken Burns effect on the image
        if (!isReduced && img) {
          // Reset scale then animate to slightly zoomed over a long time
          gsap.fromTo(img, 
            { scale: 1 }, 
            { scale: 1.08, duration: 20, ease: 'none', overwrite: 'auto' }
          );
        }
      } else {
        // Fade out inactive wrapper
        gsap.to(wrapper, { opacity: 0, duration: 1.5, ease: 'power2.inOut', overwrite: 'auto' });
        
        // Stop scaling inactive image (by letting overwrite handle it or just leave it)
        if (img) {
          gsap.killTweensOf(img);
        }
      }
    });

    // 2. Animate Typography Menu
    items.forEach((item, itemIndex) => {
      const title = item.querySelector('.exp-title');
      const desc = item.querySelector('.exp-desc');
      
      if (index === itemIndex) {
        // Active Text Styling
        gsap.to(title, { 
          color: '#FFFFFF', // Pure white
          x: 20, 
          fontStyle: 'italic',
          opacity: 1,
          duration: 0.6, 
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (desc) {
          gsap.to(desc, { 
            opacity: 1, 
            x: 0, 
            duration: 0.6, 
            delay: 0.1,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      } else {
        // Inactive Text Styling
        gsap.to(title, { 
          color: 'rgba(255, 255, 255, 0.45)', // Translucent white
          x: 0, 
          fontStyle: 'normal',
          duration: 0.6, 
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (desc) {
          gsap.to(desc, { 
            opacity: 0, 
            x: 16, 
            duration: 0.4, 
            ease: 'power3.in',
            overwrite: 'auto'
          });
        }
      }
    });
  };

  // Attach interactive events (hover, click, and keyboard)
  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => activateExperience(index));
    item.addEventListener('click', () => activateExperience(index));
    item.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
        e.preventDefault();
        activateExperience(index);
      }
    });
  });

  // Initialize the first item as active
  activateExperience(0);

  // Optional: Scroll entry animation for the menu itself
  if (!isReduced) {
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );
  }
}
