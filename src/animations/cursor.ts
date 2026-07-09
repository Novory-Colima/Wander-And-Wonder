import { gsap } from '@/lib/gsap';

export function initCursorAnimation() {
  // Removed prefersReducedMotion and hover checks as they falsely disabled
  // the cursor on many Windows laptops and power-saving modes.
  
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;

  // Make cursor visible
  gsap.set([cursor, cursorDot], { opacity: 1 });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instantly move the inner dot
    gsap.set(cursorDot, {
      x: mouseX,
      y: mouseY,
      xPercent: -50,
      yPercent: -50
    });
  });

  // Animate the outer ring smoothly
  gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio()); 
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;
    
    gsap.set(cursor, {
      x: cursorX,
      y: cursorY,
      xPercent: -50,
      yPercent: -50
    });
  });

  // Handle hover states on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
  
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'white',
        borderColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'white',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Magnetic Buttons
  const magneticElements = document.querySelectorAll('.magnetic-button');
  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = ((e as MouseEvent).clientX - rect.left - h) * 0.3;
      const y = ((e as MouseEvent).clientY - rect.top - v) * 0.3;

      gsap.to(target, {
        x: x,
        y: y,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });

    el.addEventListener('mouseleave', (e) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      });
    });
  });

  // Image Pan (Cinematic feel on large images)
  const panImages = document.querySelectorAll('.editorial-image-wrapper');
  panImages.forEach((wrapper) => {
    const img = wrapper.querySelector('img');
    if (!img) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      // Calculate normalized mouse position (-1 to 1)
      const x = ((e as MouseEvent).clientX - rect.left) / rect.width - 0.5;
      const y = ((e as MouseEvent).clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        xPercent: x * -5, // move opposite to mouse
        yPercent: y * -5,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(img, {
        xPercent: 0,
        yPercent: 0,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  });
}
