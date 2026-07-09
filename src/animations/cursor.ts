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
}
