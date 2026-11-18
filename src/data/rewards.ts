export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  emoji: string;
}

export const REWARDS: Reward[] = [
  { id: 'cafe', name: 'Café gratis', description: 'Un café en la cafetería de la escuela.', cost: 50, emoji: '☕' },
  { id: 'snack', name: 'Snack saludable', description: 'Una fruta o barrita en tiendas aliadas.', cost: 80, emoji: '🍎' },
  { id: 'termo', name: '10% en termo reutilizable', description: 'Descuento en tiendas eco aliadas.', cost: 120, emoji: '🥤' },
  { id: 'cine', name: 'Boleto de cine 2x1', description: 'Válido de lunes a jueves.', cost: 200, emoji: '🎬' },
  { id: 'arbol', name: 'Plantar un árbol', description: 'Donamos un árbol a nombre tuyo.', cost: 300, emoji: '🌳' },
  { id: 'bici', name: 'Día de bici compartida', description: 'Pase de 24 h en bicis públicas.', cost: 150, emoji: '🚲' },
];
