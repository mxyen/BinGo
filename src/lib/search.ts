import { WASTE_ITEMS, type WasteItem } from '../data/items';

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreTerm(term: string, query: string): number {
  if (term === query) return 100;
  if (term.startsWith(query)) return 80;
  if (term.split(' ').some((w) => w.startsWith(query))) return 60;
  if (term.includes(query)) return 40;
  if (query.includes(term) && term.length >= 3) return 30;
  return 0;
}

/** Busca residuos por nombre o alias, ordenados por relevancia. */
export function searchItems(rawQuery: string, limit = 6): WasteItem[] {
  const query = normalize(rawQuery);
  if (query.length < 2) return [];

  return WASTE_ITEMS.map((item) => {
    const terms = [item.name, ...(item.aliases ?? [])].map(normalize);
    const score = Math.max(...terms.map((t) => scoreTerm(t, query)));
    return { item, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
