import type { MobileNet } from '@tensorflow-models/mobilenet';
import type { CategoryId } from '../data/categories';

/**
 * Relación entre etiquetas de ImageNet (las que reconoce MobileNet)
 * y nuestras categorías de residuos. Es una heurística para la demo.
 */
const LABEL_RULES: { keywords: string[]; category: CategoryId; name: string }[] = [
  { keywords: ['beer bottle', 'wine bottle', 'red wine', 'whiskey jug'], category: 'vidrio', name: 'Botella de vidrio' },
  { keywords: ['pill bottle'], category: 'especial', name: 'Frasco de medicamento' },
  { keywords: ['water bottle', 'pop bottle', 'soda bottle', 'water jug', 'plastic bag', 'lotion', 'soap dispenser', 'beer can', 'tin can', 'can', 'milk can'], category: 'envases', name: 'Envase de plástico o lata' },
  { keywords: ['carton', 'envelope', 'notebook', 'comic book', 'book jacket', 'menu', 'crossword', 'packet', 'paper towel', 'binder'], category: 'papel', name: 'Papel o cartón' },
  { keywords: ['banana', 'orange', 'lemon', 'granny smith', 'pineapple', 'strawberry', 'fig', 'pomegranate', 'broccoli', 'cauliflower', 'cucumber', 'bell pepper', 'corn', 'ear', 'mushroom', 'zucchini', 'head cabbage', 'artichoke', 'custard apple', 'jackfruit', 'acorn squash', 'butternut squash', 'spaghetti squash', 'bagel', 'french loaf', 'pretzel', 'guacamole', 'burrito'], category: 'organico', name: 'Residuo orgánico' },
  { keywords: ['cellular telephone', 'cell phone', 'dial telephone', 'laptop', 'notebook computer', 'desktop computer', 'computer keyboard', 'mouse', 'remote control', 'ipod', 'modem', 'monitor', 'screen', 'hand-held computer', 'joystick', 'hard disc', 'calculator', 'loudspeaker', 'radio', 'television'], category: 'electronico', name: 'Aparato electrónico' },
  { keywords: ['lighter', 'syringe', 'spray'], category: 'especial', name: 'Residuo de manejo especial' },
  { keywords: ['diaper', 'toilet tissue', 'band aid', 'cup', 'plate', 'pizza', 'cigarette'], category: 'general', name: 'Residuo no reciclable' },
];

export interface ImagePrediction {
  label: string;
  probability: number;
  category: CategoryId | null;
  itemName: string | null;
}

function mapLabel(label: string): { category: CategoryId; name: string } | null {
  const lower = label.toLowerCase();
  const parts = lower.split(',').map((p) => p.trim());
  for (const rule of LABEL_RULES) {
    if (rule.keywords.some((k) => parts.includes(k) || lower.includes(k))) {
      return { category: rule.category, name: rule.name };
    }
  }
  return null;
}

let modelPromise: Promise<MobileNet> | null = null;

/** Carga MobileNet una sola vez (se descarga ~16 MB la primera vez). */
export function loadModel(): Promise<MobileNet> {
  if (!modelPromise) {
    modelPromise = (async () => {
      await import('@tensorflow/tfjs');
      const mobilenet = await import('@tensorflow-models/mobilenet');
      return mobilenet.load({ version: 2, alpha: 1.0 });
    })();
    modelPromise.catch(() => {
      modelPromise = null;
    });
  }
  return modelPromise;
}

export async function classifyImage(img: HTMLImageElement): Promise<ImagePrediction[]> {
  const model = await loadModel();
  const predictions = await model.classify(img, 5);
  return predictions.map((p) => {
    const mapped = mapLabel(p.className);
    return {
      label: p.className,
      probability: p.probability,
      category: mapped?.category ?? null,
      itemName: mapped?.name ?? null,
    };
  });
}
