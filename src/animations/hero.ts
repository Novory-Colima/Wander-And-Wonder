import { gsap, ScrollTrigger } from '@/lib/gsap';

export const initHeroAnimation = () => {
  const heroSection = document.querySelector('#hero');
  const heroCamera = document.querySelector('.hero-camera');
  const bgBlur = document.querySelector('.hero-bg-blur');
  const bgSharp = document.querySelector('.hero-bg-sharp');
  const atmosphere = document.querySelector('.hero-atmosphere');
  const title = document.querySelector('.hero-title');
  const titleSpan = document.querySelector('.hero-title span');
  const manifesto = document.querySelector('.hero-manifesto');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  const scrollParticle = document.querySelector('.hero-scroll-particle');

  if (!heroSection || !titleSpan) return;

  // 1. Intro Timeline (El Despertar)
  const introTl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // Focus Pull & Title Reveal
  introTl
    .to(bgSharp, { opacity: 1, duration: 3.5, ease: 'power2.inOut' }) // Focus Pull
    .fromTo(titleSpan, 
      { filter: 'blur(16px)', opacity: 0, scale: 0.9, y: 30 },
      { filter: 'blur(0px)', opacity: 1, scale: 1, y: 0, duration: 3, ease: 'power3.out' },
      '-=2.5'
    )
    .to(title, { filter: 'blur(0px)', opacity: 1, duration: 0.5 }, '<') // Unhide the wrapper
    .fromTo(manifesto,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
      '-=1.5'
    )
    .fromTo(scrollIndicator,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      '-=1'
    );

  // 2. Breathing Engine (La Vida Continua)
  // Continuous camera drift
  gsap.to(heroCamera, {
    x: '1.5%',
    y: '1%',
    scale: 1.05,
    rotation: 0.2,
    duration: 20,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  // Continuous subtle title drift (creates async depth)
  gsap.to(title, {
    x: '-1%',
    y: '-0.5%',
    duration: 15,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  // Scroll particle looping animation
  gsap.to(scrollParticle, {
    y: '200%',
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1
  });

  // 3. Scroll Choreography (Parallax & Scene Transition)
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1 // Smooth scrub
    }
  });

  scrollTl
    // Title sinks and blurs into the fog
    .to(title, { 
      y: '-20vh', 
      scale: 0.85, 
      opacity: 0, 
      filter: 'blur(12px)', 
      ease: 'none' 
    }, 0)
    // Manifesto follows with a delay (parallax lag)
    .to(manifesto, { 
      y: '-25vh', 
      opacity: 0, 
      ease: 'none' 
    }, 0)
    // Scroll indicator fades out fast
    .to(scrollIndicator, { 
      opacity: 0, 
      y: '5vh', 
      ease: 'power2.in' 
    }, 0)
    // Atmosphere moves up fast (negative parallax)
    .to(atmosphere, { 
      y: '-30vh', 
      ease: 'none' 
    }, 0)
    // Camera background moves slightly and fades out to create extreme depth and dark fade
    .to(heroCamera, { 
      y: '15vh', 
      opacity: 0,
      ease: 'none' 
    }, 0)
    // Transition background color of heroSection to match the next section's bg-midnight
    .to(heroSection, {
      backgroundColor: '#0D1B2A',
      ease: 'none'
    }, 0);
};
