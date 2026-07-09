import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-nature',
    title: 'Conectar',
    description: 'Naturaleza salvaje que te recuerda lo pequeño que eres.',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1474&auto=format&fit=crop', // Nature landscape
    alt: 'Una persona observando un vasto paisaje natural',
  },
  {
    id: 'exp-culture',
    title: 'Aprender',
    description: 'Tradiciones que cambian tu forma de ver el mundo.',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=1446&auto=format&fit=crop', // Culture/Architecture
    alt: 'Arquitectura tradicional rica en detalles históricos',
  },
  {
    id: 'exp-adventure',
    title: 'Respirar',
    description: 'Adrenalina en los lugares más remotos del planeta.',
    category: 'adventure',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1467&auto=format&fit=crop', // Adventure climbing/hiking
    alt: 'Aventurero escalando una roca con vista espectacular',
  },
  {
    id: 'exp-food',
    title: 'Saborear',
    description: 'Recetas que guardan la historia de todo un país.',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop', // Food/Market
    alt: 'Comida callejera auténtica preparada al fuego',
  },
  {
    id: 'exp-luxury',
    title: 'Detenerse',
    description: 'El verdadero lujo es tener tiempo en lugares excepcionales.',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1587&auto=format&fit=crop', // Luxury resort/quiet space
    alt: 'Un espacio sereno y minimalista para descansar frente al mar',
  },
  {
    id: 'exp-roadtrip',
    title: 'Recorrer',
    description: 'Rutas donde el destino es simplemente el final del camino.',
    category: 'road-trips',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1421&auto=format&fit=crop', // Roadtrip/Van
    alt: 'Carretera serpenteante en medio de un paisaje otoñal',
  }
];
