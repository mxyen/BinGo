import type { CategoryId } from './categories';

export interface WasteItem {
  name: string;
  category: CategoryId;
  aliases?: string[];
  tip?: string;
}

export const WASTE_ITEMS: WasteItem[] = [
  // Orgánico
  { name: 'Cáscara de plátano', category: 'organico', aliases: ['platano', 'banana'] },
  { name: 'Restos de fruta', category: 'organico', aliases: ['manzana', 'naranja', 'fruta', 'mango', 'sandia', 'limon'] },
  { name: 'Restos de verdura', category: 'organico', aliases: ['verdura', 'lechuga', 'zanahoria', 'jitomate', 'tomate', 'papa', 'cebolla'] },
  { name: 'Cáscaras de huevo', category: 'organico', aliases: ['huevo', 'cascarón'] },
  { name: 'Posos de café', category: 'organico', aliases: ['cafe', 'borra de cafe'] },
  { name: 'Bolsita de té', category: 'organico', aliases: ['te', 'infusion'] },
  { name: 'Restos de comida', category: 'organico', aliases: ['comida', 'sobras', 'tortilla', 'pan', 'arroz', 'frijoles'] },
  { name: 'Hojas y pasto', category: 'organico', aliases: ['hojas', 'pasto', 'jardin', 'flores', 'ramas'] },
  { name: 'Servilleta usada', category: 'organico', aliases: ['servilleta'], tip: 'Las servilletas con comida no se reciclan como papel, pero sí se compostan.' },

  // Papel y cartón
  { name: 'Hoja de papel', category: 'papel', aliases: ['papel', 'hoja', 'impresion', 'apuntes'] },
  { name: 'Caja de cartón', category: 'papel', aliases: ['carton', 'caja', 'paquete amazon'] },
  { name: 'Periódico', category: 'papel', aliases: ['periodico', 'diario'] },
  { name: 'Revista', category: 'papel', aliases: ['revistas', 'folleto'] },
  { name: 'Cuaderno', category: 'papel', aliases: ['libreta', 'cuadernos'], tip: 'Quita el espiral metálico antes.' },
  { name: 'Sobre de papel', category: 'papel', aliases: ['sobre', 'carta'] },
  { name: 'Tubo de papel higiénico', category: 'papel', aliases: ['rollo', 'tubo de carton'] },
  { name: 'Caja de cereal', category: 'papel', aliases: ['cereal'] },
  { name: 'Bolsa de papel', category: 'papel', aliases: ['bolsa de papel'] },
  { name: 'Caja de pizza', category: 'general', aliases: ['pizza'], tip: 'Si está muy grasosa ya no se recicla. Las partes limpias sí van a papel.' },

  // Plásticos y latas
  { name: 'Botella de plástico (PET)', category: 'envases', aliases: ['botella', 'pet', 'botella de agua', 'refresco', 'plastico'] },
  { name: 'Lata de refresco', category: 'envases', aliases: ['lata', 'aluminio', 'lata de cerveza'] },
  { name: 'Lata de conserva', category: 'envases', aliases: ['atun', 'lata de comida', 'conserva'] },
  { name: 'Envase de yogur', category: 'envases', aliases: ['yogur', 'yogurt'] },
  { name: 'Envase de leche (Tetra Pak)', category: 'envases', aliases: ['tetra pak', 'tetrapak', 'leche', 'jugo', 'carton de leche'] },
  { name: 'Bolsa de plástico', category: 'envases', aliases: ['bolsa', 'bolsa del super'] },
  { name: 'Envase de shampoo', category: 'envases', aliases: ['shampoo', 'champu', 'jabon liquido', 'detergente'] },
  { name: 'Tapa de botella', category: 'envases', aliases: ['tapa', 'tapita', 'taparrosca'] },
  { name: 'Papel aluminio', category: 'envases', aliases: ['aluminio', 'papel aluminio'], tip: 'Hazlo bolita y que esté limpio.' },
  { name: 'Charola de unicel', category: 'general', aliases: ['unicel', 'poliestireno', 'vaso de unicel'], tip: 'El unicel casi no se recicla. ¡Evítalo!' },
  { name: 'Popote', category: 'general', aliases: ['popote', 'pajilla', 'sorbete'] },
  { name: 'Envoltura de frituras', category: 'general', aliases: ['papitas', 'sabritas', 'frituras', 'envoltura', 'chocolate', 'dulce'] },
  { name: 'Cubiertos desechables', category: 'general', aliases: ['tenedor', 'cuchara', 'cubiertos'] },

  // Vidrio
  { name: 'Botella de vidrio', category: 'vidrio', aliases: ['botella de vidrio', 'cerveza', 'vino', 'vidrio'] },
  { name: 'Frasco de vidrio', category: 'vidrio', aliases: ['frasco', 'mermelada', 'salsa'] },
  { name: 'Espejo roto', category: 'general', aliases: ['espejo'], tip: 'Los espejos no se reciclan con el vidrio. Envuélvelo bien.' },
  { name: 'Foco', category: 'especial', aliases: ['foco', 'bombilla', 'lampara', 'foco ahorrador'] },

  // Electrónicos
  { name: 'Celular', category: 'electronico', aliases: ['telefono', 'movil', 'smartphone', 'celular'] },
  { name: 'Cargador', category: 'electronico', aliases: ['cargador', 'cable', 'usb'] },
  { name: 'Audífonos', category: 'electronico', aliases: ['audifonos', 'auriculares'] },
  { name: 'Laptop', category: 'electronico', aliases: ['computadora', 'portatil', 'laptop'] },
  { name: 'Teclado o mouse', category: 'electronico', aliases: ['teclado', 'mouse', 'raton'] },
  { name: 'Control remoto', category: 'electronico', aliases: ['control', 'control remoto'] },
  { name: 'Calculadora', category: 'electronico', aliases: ['calculadora'] },

  // Manejo especial
  { name: 'Pilas', category: 'especial', aliases: ['pila', 'bateria', 'baterias'] },
  { name: 'Medicamentos caducos', category: 'especial', aliases: ['medicina', 'pastillas', 'medicamento', 'jarabe'] },
  { name: 'Aceite de cocina usado', category: 'especial', aliases: ['aceite'], tip: 'Guárdalo en una botella cerrada. ¡Nunca lo tires al drenaje!' },
  { name: 'Pintura o solventes', category: 'especial', aliases: ['pintura', 'thinner', 'solvente'] },
  { name: 'Termómetro de mercurio', category: 'especial', aliases: ['termometro', 'mercurio'] },
  { name: 'Aerosol', category: 'especial', aliases: ['spray', 'aerosol', 'desodorante en aerosol'] },

  // No reciclable
  { name: 'Pañal', category: 'general', aliases: ['panal', 'toallita humeda', 'toalla femenina'] },
  { name: 'Colilla de cigarro', category: 'general', aliases: ['cigarro', 'colilla'] },
  { name: 'Chicle', category: 'general', aliases: ['goma de mascar'] },
  { name: 'Papel higiénico usado', category: 'general', aliases: ['papel de baño', 'kleenex', 'panuelo'] },
  { name: 'Vaso de café desechable', category: 'general', aliases: ['vaso de cafe', 'vaso desechable'], tip: 'Tiene una capa plástica que impide reciclarlo. ¡Usa tu termo!' },
  { name: 'Ticket de compra', category: 'general', aliases: ['ticket', 'recibo'], tip: 'El papel térmico no se recicla.' },
];
