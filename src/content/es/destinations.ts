import type { Destination } from '@/types';

import imgJapan from '@/assets/images/story-japan-kyoto.webp'; // Reusing the Kyoto image
import imgIceland from '@/assets/images/dest-iceland-waterfall.webp';
import imgPeru from '@/assets/images/dest-peru-machu-picchu.webp';
import imgItaly from '@/assets/images/dest-italy-amalfi.png';
import imgNamibia from '@/assets/images/dest-namibia-dunes.png';
import imgNz from '@/assets/images/dest-new-zealand-lake.png';

export const destinations: Destination[] = [
  {
    id: 'dest-japan',
    country: 'Japón',
    description: 'Donde el silencio de los templos se encuentra con la energía de la metrópolis.',
    duration: '14 - 21 días',
    season: 'Marzo a Mayo / Septiembre a Noviembre',
    image: imgJapan.src,

    alt: 'Callejón tradicional en Japón'
  },
  {
    id: 'dest-iceland',
    country: 'Islandia',
    description: 'La naturaleza en su estado más puro, salvaje y sobrecogedor.',
    duration: '7 - 12 días',
    season: 'Junio a Agosto / Septiembre a Marzo (Auroras)',
    image: imgIceland.src,

    alt: 'Cascada impresionante en el paisaje de Islandia'
  },
  {
    id: 'dest-peru',
    country: 'Perú',
    description: 'Un viaje a través del tiempo entre las montañas sagradas de los Andes.',
    duration: '10 - 15 días',
    season: 'Mayo a Octubre',
    image: imgPeru.src,

    alt: 'Ruinas antiguas de Machu Picchu entre montañas verdes'
  },
  {
    id: 'dest-italy',
    country: 'Italia',
    description: 'El arte de vivir despacio, disfrutando de cada bocado y cada atardecer.',
    duration: '12 - 18 días',
    season: 'Abril a Junio / Septiembre a Octubre',
    image: imgItaly.src,

    alt: 'Pueblo costero colorido en la costa de Amalfi'
  },
  {
    id: 'dest-namibia',
    country: 'Namibia',
    description: 'Horizontes infinitos donde el desierto se encuentra con el océano.',
    duration: '10 - 14 días',
    season: 'Mayo a Octubre',
    image: imgNamibia.src,

    alt: 'Dunas de arena roja bajo un cielo despejado en Namibia'
  },
  {
    id: 'dest-new-zealand',
    country: 'Nueva Zelanda',
    description: 'El fin del mundo nunca se vio tan hermoso y lleno de aventura.',
    duration: '15 - 24 días',
    season: 'Diciembre a Marzo',
    image: imgNz.src,

    alt: 'Montañas reflejadas perfectamente en un lago tranquilo'
  }
];
