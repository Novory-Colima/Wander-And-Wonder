import type { Story } from '@/types';

import img1 from '@/assets/images/story-iceland-aurora.webp';
import img2 from '@/assets/images/story-japan-kyoto.webp';
import img3 from '@/assets/images/story-peru-andes.webp';
import img4 from '@/assets/images/story-morocco-market.png';
import img5 from '@/assets/images/story-thailand-temple.webp';

export const stories: Story[] = [
  {
    id: 'story-1',
    location: 'Islandia',
    quote: 'Jamás había visto un cielo que pareciera respirar.',
    author: 'Elena V.',
    date: 'Octubre 2024',
    image: img1.src,

    alt: 'Auroras boreales bailando en el cielo oscuro de Islandia',
  },
  {
    id: 'story-2',
    location: 'Japón',
    quote: 'Nos perdimos buscando el hotel... y encontramos nuestro lugar favorito.',
    author: 'Mateo & Sofia',
    date: 'Primavera 2023',
    image: img2.src,

    alt: 'Callejón tradicional de Kioto iluminado por farolillos al atardecer',
  },
  {
    id: 'story-3',
    location: 'Perú',
    quote: 'El silencio de aquella montaña decía más que cualquier palabra.',
    author: 'David L.',
    date: 'Septiembre 2025',
    image: img3.src,

    alt: 'Vista majestuosa de las montañas de los Andes bajo un cielo despejado',
  },
  {
    id: 'story-4',
    location: 'Marruecos',
    quote: 'Descubrimos las conversaciones que se esconden entre cada puesto del mercado.',
    author: 'Ana P.',
    date: 'Otoño 2024',
    image: img4.src,

    alt: 'Especias coloridas y alfombras en un mercado tradicional en Marrakech',
  },
  {
    id: 'story-5',
    location: 'Tailandia',
    quote: 'La lluvia nos obligó a detenernos. Fue el mejor momento del día.',
    author: 'Carlos & Elena',
    date: 'Verano 2023',
    image: img5.src,

    alt: 'Templo en Tailandia rodeado de naturaleza verde después de una lluvia tropical',
  }
];
