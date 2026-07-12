import * as THREE from 'three';
import { gsap } from '@/lib/gsap';

export const initAroundWorld = () => {
  const container = document.getElementById('globe-container');
  const section = document.getElementById('around-the-world');
  if (!container || !section) return;

  const rawData = section.getAttribute('data-stories');
  const stories = rawData ? JSON.parse(rawData) : [];

  // DOM Elements
  const connectionLine = document.getElementById('connection-line');
  const connectionDot = document.getElementById('connection-dot');
  const card = document.getElementById('dynamic-story-card');
  const cardImg = document.getElementById('story-img') as HTMLImageElement;
  const cardCountry = document.getElementById('story-country');
  const cardPlaceDate = document.getElementById('story-place-date');
  const cardQuote = document.getElementById('story-quote');

  // --- SETUP 3D GLOBE ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  const radius = window.innerWidth < 768 ? 4 : 5.5;
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // Wireframe Globe
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0xFAFAF8, // Ivory
    wireframe: true,
    transparent: true,
    opacity: 0.05
  });
  const globe = new THREE.Mesh(geometry, material);
  globeGroup.add(globe);
  
  // Inner core for depth
  const innerGeo = new THREE.SphereGeometry(radius * 0.98, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({ 
    color: 0x070F18, // Midnight Dark
    transparent: true,
    opacity: 0.95
  });
  const innerGlobe = new THREE.Mesh(innerGeo, innerMat);
  globeGroup.add(innerGlobe);

  // Atmosphere / Halo
  const haloGeo = new THREE.SphereGeometry(radius * 1.15, 32, 32);
  // Custom shader-like material using additive blending and opacity gradient
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x4A6B8C, // Subtle blue
    transparent: true,
    opacity: 0.03,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  scene.add(halo);

  // Pulse Mesh for "Wow" moment
  const pulseGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const pulseMat = new THREE.MeshBasicMaterial({
    color: 0xFFF5E1,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });
  const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
  scene.add(pulseMesh); // Add to scene, not globeGroup, so it can be positioned globally

  camera.position.z = 16;

  // --- MARKERS ---
  const markers: THREE.Mesh[] = [];
  const markerMat = new THREE.MeshBasicMaterial({ color: 0xFFF5E1 });
  
  stories.forEach((story: any) => {
    const phi = (90 - story.lat) * (Math.PI / 180);
    const theta = (story.lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    const mGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const marker = new THREE.Mesh(mGeo, markerMat);
    marker.position.set(x, y, z);
    marker.userData = story;
    
    globeGroup.add(marker);
    markers.push(marker);
  });

  // --- INTERACTION & INERTIA ---
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let velocity = { x: 0, y: 0 };
  let activeStory: any = null;
  let activeMarker: THREE.Mesh | null = null;
  let isSwitching = false;

  // Reveal globe on scroll
  gsap.to(container, {
    opacity: 1,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: section,
      start: 'top 60%'
    }
  });

  // Breathing animation
  gsap.to(globeGroup.scale, {
    x: 1.02, y: 1.02, z: 1.02,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  const onPointerDown = (e: MouseEvent | TouchEvent) => {
    isDragging = true;
    const touch = ('touches' in e && e.touches && e.touches.length > 0) ? e.touches[0] : null;
    const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
    const clientY = touch ? touch.clientY : (e as MouseEvent).clientY;
    previousMousePosition = { x: clientX, y: clientY };
    velocity = { x: 0, y: 0 };
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  // Card Magnetism setup
  let magnetX = gsap.quickTo(card, "x", {duration: 0.4, ease: "power3.out"});
  let magnetY = gsap.quickTo(card, "y", {duration: 0.4, ease: "power3.out"});
  let imgParallaxX = gsap.quickTo(cardImg, "x", {duration: 0.6, ease: "power2.out"});
  let imgParallaxY = gsap.quickTo(cardImg, "y", {duration: 0.6, ease: "power2.out"});

  const onPointerMove = (e: MouseEvent | TouchEvent) => {
    const touch = ('touches' in e && e.touches && e.touches.length > 0) ? e.touches[0] : null;
    const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
    const clientY = touch ? touch.clientY : (e as MouseEvent).clientY;

    if (isDragging) {
      const deltaMove = {
        x: clientX - previousMousePosition.x,
        y: clientY - previousMousePosition.y
      };
      
      velocity.x = deltaMove.x * 0.002;
      velocity.y = deltaMove.y * 0.002;
      
      globeGroup.rotation.y += velocity.x;
      globeGroup.rotation.x += velocity.y;
      
      previousMousePosition = { x: clientX, y: clientY };
    }

    // Magnetism Effect
    if (activeMarker && card && !isDragging) {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const distanceX = clientX - cardCenterX;
      const distanceY = clientY - cardCenterY;
      
      const maxDistance = 400; // Activation radius
      const dist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (dist < maxDistance) {
        const intensity = 1 - (dist / maxDistance);
        magnetX(distanceX * 0.1 * intensity);
        magnetY(distanceY * 0.1 * intensity);
        imgParallaxX(distanceX * -0.05 * intensity);
        imgParallaxY(distanceY * -0.05 * intensity);
      } else {
        magnetX(0);
        magnetY(0);
        imgParallaxX(0);
        imgParallaxY(0);
      }
    }
  };

  const closeActiveCard = () => {
    if (!activeStory || !card) return;
    isSwitching = true;
    gsap.to(card, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.in', onComplete: () => { isSwitching = false; } });
    gsap.to([connectionLine, connectionDot], { opacity: 0, duration: 0.3 });
    activeStory = null;
    activeMarker = null;
    magnetX(0);
    magnetY(0);
    imgParallaxX(0);
    imgParallaxY(0);
  };

  const openCard = (story: any, marker: THREE.Mesh) => {
    if (!card || isSwitching) return;
    
    if (activeStory) {
      if (activeStory.id === story.id) return;
      closeActiveCard();
      setTimeout(() => openCard(story, marker), 600);
      return;
    }

    activeStory = story;
    activeMarker = marker;

    // Populate data
    if (cardImg) cardImg.src = story.img;
    if (cardCountry) cardCountry.textContent = story.country;
    if (cardPlaceDate) cardPlaceDate.textContent = `${story.place} — ${story.date}`;
    if (cardQuote) cardQuote.textContent = story.quote;

    // Wow Moment: Pulse from marker
    const globalPos = new THREE.Vector3();
    marker.getWorldPosition(globalPos);
    pulseMesh.position.copy(globalPos);
    
    const pulseTl = gsap.timeline();
    pulseTl.fromTo(pulseMesh.scale, { x: 1, y: 1, z: 1 }, { x: 12, y: 12, z: 12, duration: 1.5, ease: 'power2.out' })
           .fromTo(pulseMat, { opacity: 0.8 }, { opacity: 0, duration: 1.5, ease: 'power2.out' }, 0);

    // Card Entrance Microanimations
    const cardTl = gsap.timeline();
    cardTl.fromTo(card, 
      { opacity: 0, y: 30, filter: 'blur(5px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(cardImg, 
      { scale: 1.2 }, 
      { scale: 1, duration: 1.5, ease: 'power2.out' }, 
      '-=0.6'
    )
    .fromTo(cardQuote,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=1.2'
    );

    // Show line
    gsap.to([connectionLine, connectionDot], { opacity: 1, duration: 0.5, delay: 0.3 });
  };

  container.addEventListener('mousedown', onPointerDown);
  container.addEventListener('touchstart', onPointerDown, { passive: true });
  
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
  
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  
  // Auto-Discovery Engine
  const evaluateProximity = () => {
    if (isSwitching) return;

    let closestMarker: THREE.Mesh | null = null;
    let maxZ = -Infinity;
    
    markers.forEach(marker => {
      const globalPos = new THREE.Vector3();
      marker.getWorldPosition(globalPos);
      
      // We want the marker that is closest to the camera (highest Z)
      if (globalPos.z > maxZ) {
        maxZ = globalPos.z;
        closestMarker = marker;
      }
    });

    // Threshold: Only open if the marker is clearly in the front half of the globe (e.g. Z > radius * 0.6)
    if (closestMarker && maxZ > (radius * 0.6)) {
      if (closestMarker !== activeMarker) {
        openCard((closestMarker as any).userData, closestMarker);
      }
    } else {
      if (activeMarker) closeActiveCard();
    }
  };

  // Update SVG connection line continuously
  const updateConnection = () => {
    if (!activeMarker || !activeStory || !card || !connectionLine || !connectionDot || isSwitching) return;
    
    const vector = new THREE.Vector3();
    activeMarker.getWorldPosition(vector);
    
    // Safety check: hide if it rotates behind
    if (vector.z < 0) {
      connectionLine.style.opacity = '0';
      connectionDot.style.opacity = '0';
      return;
    }

    vector.project(camera);
    
    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;
    
    const x3D = (vector.x * widthHalf) + widthHalf;
    const y3D = -(vector.y * heightHalf) + heightHalf;
    
    const cardRect = card.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    
    // Calculate the dynamic position including the magnetic offset
    // Since card has transform: translate() from GSAP, getBoundingClientRect accounts for it
    const xCard = cardRect.right - 20;
    const yCard = (cardRect.top - sectionRect.top) + (cardRect.height / 3);

    connectionLine.setAttribute('x1', x3D.toString());
    connectionLine.setAttribute('y1', y3D.toString());
    connectionLine.setAttribute('x2', xCard.toString());
    connectionLine.setAttribute('y2', yCard.toString());

    connectionDot.setAttribute('cx', x3D.toString());
    connectionDot.setAttribute('cy', y3D.toString());
    
    if (gsap.getProperty(connectionLine, 'opacity') !== 0) {
      connectionLine.style.opacity = '1';
      connectionDot.style.opacity = '1';
    }
  };

  // Render Loop
  let reqId: number;
  const animate = () => {
    reqId = requestAnimationFrame(animate);
    
    // Inertia & Auto-rotation
    if (!isDragging) {
      velocity.x *= 0.92;
      velocity.y *= 0.92;
      
      globeGroup.rotation.y += velocity.x;
      globeGroup.rotation.x += velocity.y;
      
      // Base auto-rotation for continuous documentary feel
      if (Math.abs(velocity.x) < 0.002) {
        globeGroup.rotation.y += 0.002; 
      }
    }
    
    evaluateProximity();
    updateConnection();
    renderer.render(scene, camera);
  };
  animate();

  // Resize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  // Cleanup
  document.addEventListener('astro:before-preparation', () => {
    cancelAnimationFrame(reqId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    innerGeo.dispose();
    innerMat.dispose();
    haloGeo.dispose();
    haloMat.dispose();
    pulseGeo.dispose();
    pulseMat.dispose();
    markerMat.dispose();
    container.removeEventListener('mousedown', onPointerDown);
    container.removeEventListener('touchstart', onPointerDown);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('resize', onResize);
  }, { once: true });
};

