import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from './shared';

export function initDreamAnimation() {
  const section = document.getElementById('dream');
  const pinContainer = document.getElementById('dream-pin-container');
  const textCenter = document.getElementById('dream-text-center');
  const title = textCenter?.querySelector('h2');
  const paragraph = textCenter?.querySelector('p');
  const collageItems = document.querySelectorAll('.collage-item');

  if (!section || !pinContainer || prefersReducedMotion()) return;

  // Force initial colors so GSAP can interpolate them correctly
  gsap.set(section, { backgroundColor: '#070F18' }); // Midnight
  if (title) gsap.set(title, { color: '#FAFAF8' }); // Ivory
  if (paragraph) gsap.set(paragraph, { color: 'rgba(250, 250, 248, 0.7)' });

  // Setup GSAP Timeline with ScrollTrigger
  const isMobile = window.innerWidth < 768;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => isMobile ? '+=140%' : '+=260%', // Lower scroll friction on mobile
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  // 1. Text reveals
  const textElements = [title, paragraph].filter((el): el is HTMLHeadingElement | HTMLParagraphElement => !!el);
  if (textElements.length > 0) {
    tl.fromTo(textElements, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out' }
    );
  }

  // 2. Background color transitions (Midnight -> Ivory Warm) 
  // and Text/Card color transitions (Ivory -> Midnight)
  tl.to(section, { backgroundColor: '#F5F3EF', duration: 2, ease: 'power1.inOut' }, '+=0.5');

  if (title) {
    tl.to(title, { color: '#070F18', duration: 2, ease: 'power1.inOut' }, '<');
  }
  if (paragraph) {
    tl.to(paragraph, { color: 'rgba(7, 15, 24, 0.7)', duration: 2, ease: 'power1.inOut' }, '<');
  }

  // Also transition the collage cards' labels and backgrounds so they are readable against the light background!
  const collageInners = section.querySelectorAll('.collage-item div.relative');
  const collageLabels = section.querySelectorAll('.collage-item span');
  
  if (collageInners.length > 0) {
    tl.to(collageInners, {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(13, 27, 42, 0.1)',
      duration: 2,
      ease: 'power1.inOut'
    }, '<');
  }
  if (collageLabels.length > 0) {
    tl.to(collageLabels, {
      color: '#070F18',
      duration: 2,
      ease: 'power1.inOut'
    }, '<');
  }

  // 3. Collage items fly in overlapping
  collageItems.forEach((item, index) => {
    // Determine starting positions based on screen corners to create a converging effect
    const offsetMult = isMobile ? 0.4 : 1;
    let xOffset = 0;
    let yOffset = 0;
    
    if (index === 0) { xOffset = -window.innerWidth * offsetMult; yOffset = -window.innerHeight * offsetMult; }
    else if (index === 1) { xOffset = window.innerWidth * offsetMult; yOffset = -window.innerHeight * offsetMult; }
    else if (index === 2) { xOffset = -window.innerWidth * offsetMult; yOffset = window.innerHeight * offsetMult; }
    else { xOffset = window.innerWidth * offsetMult; yOffset = window.innerHeight * offsetMult; }

    tl.fromTo(item, 
      { opacity: 0, x: xOffset, y: yOffset, rotation: (Math.random() - 0.5) * (isMobile ? 30 : 60), scale: isMobile ? 1.2 : 1.5 },
      { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
      `-=${index === 0 ? 0.5 : 1}` // Overlap entrances significantly
    );
  });

  // Hold at the end before unpinning to let the user appreciate the collage
  tl.to({}, { duration: 1 });

  // 4. Magnetism for collage items
  collageItems.forEach((item) => {
    const el = item as HTMLElement;
    const inner = el.querySelector('div.relative') as HTMLElement;
    if (!inner) return;

    let magnetX = gsap.quickTo(inner, "x", {duration: 0.4, ease: "power3.out"});
    let magnetY = gsap.quickTo(inner, "y", {duration: 0.4, ease: "power3.out"});
    let magnetRotation = gsap.quickTo(inner, "rotation", {duration: 0.6, ease: "power2.out"});

    // Extract the original inline rotation from the style attribute
    const styleTransform = inner.style.transform || '';
    const match = styleTransform.match(/rotate\(([-\d.]+)deg\)/);
    const baseRotation = (match && match[1]) ? parseFloat(match[1]) : 0;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      magnetX(distanceX * 0.15);
      magnetY(distanceY * 0.15);
      magnetRotation(baseRotation + (distanceX * 0.02)); // Slight twist
    });

    el.addEventListener('mouseleave', () => {
      magnetX(0);
      magnetY(0);
      magnetRotation(baseRotation);
    });
  });
}
