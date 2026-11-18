export type CategoryId =
  | 'organico'
  | 'papel'
  | 'envases'
  | 'vidrio'
  | 'electronico'
  | 'especial'
  | 'general';

export interface Category {
  id: CategoryId;
  name: string;
  bin: string;
  color: string;
  emoji: string;
  /** Puntos que gana el usuario al depositar un residuo de esta categoría. */
  points: number;
  /** Estimación aproximada de kg de CO₂ evitados por pieza (solo para la demo). */
  co2PerItem: number;
  tips: string[];
}

export const CATEGORIES: Record<CategoryId, Category> = {
  organico: {
    id: 'organico',
    name: 'Orgánico',
    bin: 'Contenedor verde',
    color: '#2e9d4f',
    emoji: '🍌',
    points: 5,
    co2PerItem: 0.05,
    tips: ['Sin bolsas de plástico.', 'Ideal para composta.'],
  },
  papel: {
    id: 'papel',
    name: 'Papel y cartón',
    bin: 'Contenedor azul',
    color: '#2f6fd6',
    emoji: '📦',
    points: 10,
    co2PerItem: 0.1,
    tips: ['Debe estar limpio y seco.', 'Aplana las cajas para ahorrar espacio.'],
  },
  envases: {
    id: 'envases',
    name: 'Plásticos y latas',
    bin: 'Contenedor amarillo',
    color: '#e0a800',
    emoji: '🥤',
    points: 10,
    co2PerItem: 0.08,
    tips: ['Enjuágalos antes de tirarlos.', 'Aplasta botellas y latas.'],
  },
  vidrio: {
    id: 'vidrio',
    name: 'Vidrio',
    bin: 'Contenedor blanco',
    color: '#17a2b8',
    emoji: '🍾',
    points: 15,
    co2PerItem: 0.3,
    tips: ['Retira tapas y corchos.', 'Los espejos y focos NO van aquí.'],
  },
  electronico: {
    id: 'electronico',
    name: 'Electrónicos',
    bin: 'Punto de acopio electrónico',
    color: '#7b4fd6',
    emoji: '🔌',
    points: 30,
    co2PerItem: 1.5,
    tips: ['Llévalo a un reciclatrón o punto limpio.', 'Borra tus datos personales antes.'],
  },
  especial: {
    id: 'especial',
    name: 'Manejo especial',
    bin: 'Punto de acopio especial',
    color: '#d64545',
    emoji: '🔋',
    points: 25,
    co2PerItem: 0.5,
    tips: ['Nunca lo tires a la basura común.', 'Farmacias y tiendas suelen recibirlos.'],
  },
  general: {
    id: 'general',
    name: 'No reciclable',
    bin: 'Contenedor gris',
    color: '#6c757d',
    emoji: '🗑️',
    points: 2,
    co2PerItem: 0,
    tips: ['Intenta reducir este tipo de residuos.', 'Busca alternativas reutilizables.'],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
