import type { Experience } from '@/types';

import imgNature from '@/assets/images/exp-nature-landscape.webp';
import imgCulture from '@/assets/images/exp-culture-architecture.webp';
import imgAdventure from '@/assets/images/exp-adventure-climbing.webp';
import imgFood from '@/assets/images/exp-food-market.webp';
import imgLuxury from '@/assets/images/exp-luxury-resort.webp';
import imgRoadtrip from '@/assets/images/exp-roadtrip-van.webp';

export const experiences: Experience[] = [
  {
    id: 'exp-roadtrip',
    title: 'Recorrer',
    description: 'Rutas donde el destino es simplemente el final del camino.',
    category: 'road-trips',
    image: imgRoadtrip.src, // Roadtrip/Van

    alt: 'Carretera serpenteante en medio de un paisaje otoñal',
  },
  {
    id: 'exp-luxury',
    title: 'Detenerse',
    description: 'El verdadero lujo es tener tiempo en lugares excepcionales.',
    category: 'luxury',
    image: imgLuxury.src, // Luxury resort/quiet space

    alt: 'Un espacio sereno y minimalista para descansar frente al mar',
  },
  {
    id: 'exp-adventure',
    title: 'Respirar',
    description: 'Adrenalina en los lugares más remotos del planeta.',
    category: 'adventure',
    image: imgAdventure.src, // Adventure climbing/hiking

    alt: 'Aventurero escalando una roca con vista espectacular',
  },
  {
    id: 'exp-nature',
    title: 'Conectar',
    description: 'Naturaleza salvaje que te recuerda lo pequeño que eres.',
    category: 'nature',
    image: imgNature.src, // Nature landscape

    alt: 'Una persona observando un vasto paisaje natural',
  },
  {
    id: 'exp-food',
    title: 'Saborear',
    description: 'Recetas que guardan la historia de todo un país.',
    category: 'food',
    image: imgFood.src, // Food/Market

    alt: 'Comida callejera auténtica preparada al fuego',
  },
  {
    id: 'exp-culture',
    title: 'Aprender',
    description: 'Tradiciones que cambian tu forma de ver el mundo.',
    category: 'culture',
    image: imgCulture.src, // Culture/Architecture

    alt: 'Arquitectura tradicional rica en detalles históricos',
  }
];
