import type { Statistic } from '@/types';
import imgAbout from '@/assets/images/about-snowy-mountain.webp';

export const aboutData = {
  philosophy: 'Nuestra filosofía',
  title: 'Cada itinerario comienza escuchando.',
  paragraphs: [
    'Creemos que un viaje no debe sentirse como una lista de tareas pendientes. No vendemos destinos; diseñamos momentos.',
    'Nuestro enfoque se basa en entender qué te emociona, qué te inspira y qué ritmo prefieres.'
  ],
  image: imgAbout.src,
  alt: 'Una persona caminando por un paisaje de montaña nevado'
};

export const statistics: Statistic[] = [
  {
    value: '15 +',
    label: 'Años viajando',
    description: 'Explorando el mundo para ti.'
  },
  {
    value: '40 +',
    label: 'Países conocidos',
    description: 'De primera mano, sin intermediarios.'
  },
  {
    value: '100%',
    label: 'Diseño a medida',
    description: 'Ningún viaje es igual a otro.'
  }
];

export const philosophyReasons = [
  {
    title: 'Experiencias Personalizadas',
    description: 'Ningún viajero es igual. Por eso, diseñamos cada viaje desde cero, asegurándonos de que cada día refleje tus intereses y tu ritmo ideal.'
  },
  {
    title: 'Atención al Detalle',
    description: 'Desde el asiento del tren hasta el restaurante escondido, cuidamos cada elemento para que tú solo tengas que preocuparte por disfrutar.'
  },
  {
    title: 'Planeación Experta',
    description: 'Conocemos los destinos de primera mano y eso nos permite evitar las multitudes y descubrir la esencia real de cada lugar.'
  },
  {
    title: 'Cercanía Permanente',
    description: 'Estamos contigo antes, durante y después de tu viaje. Un soporte discreto pero siempre disponible cuando lo necesites.'
  }
];
