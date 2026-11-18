import { useCallback, useEffect, useMemo, useState } from 'react';
import { CATEGORIES, type CategoryId } from '../data/categories';
import { REWARDS } from '../data/rewards';

export interface RecycleEntry {
  id: string;
  itemName: string;
  category: CategoryId;
  points: number;
  date: string;
}

export interface Redemption {
  id: string;
  rewardId: string;
  cost: number;
  code: string;
  date: string;
}

interface StoredState {
  history: RecycleEntry[];
  redemptions: Redemption[];
}

const STORAGE_KEY = 'bingo-state-v1';

export const LEVELS = [
  { name: 'Semilla', min: 0, emoji: '🌱' },
  { name: 'Brote', min: 50, emoji: '🌿' },
  { name: 'Árbol', min: 150, emoji: '🌳' },
  { name: 'Bosque', min: 400, emoji: '🌲' },
  { name: 'Guardián del planeta', min: 1000, emoji: '🌍' },
];

function load(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    /* ignorar datos corruptos */
  }
  return { history: [], redemptions: [] };
}

const uid = () => Math.random().toString(36).slice(2, 10);

export function useRewards() {
  const [state, setState] = useState<StoredState>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const stats = useMemo(() => {
    const earned = state.history.reduce((s, e) => s + e.points, 0);
    const spent = state.redemptions.reduce((s, r) => s + r.cost, 0);
    const co2 = state.history.reduce((s, e) => s + CATEGORIES[e.category].co2PerItem, 0);
    const byCategory = state.history.reduce<Partial<Record<CategoryId, number>>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + 1;
      return acc;
    }, {});

    const levelIndex = LEVELS.reduce((idx, lvl, i) => (earned >= lvl.min ? i : idx), 0);
    const level = LEVELS[levelIndex];
    const next = LEVELS[levelIndex + 1] ?? null;
    const progress = next ? (earned - level.min) / (next.min - level.min) : 1;

    return { earned, spent, balance: earned - spent, co2, byCategory, level, next, progress };
  }, [state]);

  const recycle = useCallback((itemName: string, category: CategoryId) => {
    const entry: RecycleEntry = {
      id: uid(),
      itemName,
      category,
      points: CATEGORIES[category].points,
      date: new Date().toISOString(),
    };
    setState((s) => ({ ...s, history: [entry, ...s.history] }));
    return entry;
  }, []);

  const redeem = useCallback(
    (rewardId: string): Redemption | null => {
      const reward = REWARDS.find((r) => r.id === rewardId);
      if (!reward || stats.balance < reward.cost) return null;
      const redemption: Redemption = {
        id: uid(),
        rewardId,
        cost: reward.cost,
        code: `BIN-${uid().toUpperCase().slice(0, 6)}`,
        date: new Date().toISOString(),
      };
      setState((s) => ({ ...s, redemptions: [redemption, ...s.redemptions] }));
      return redemption;
    },
    [stats.balance],
  );

  const reset = useCallback(() => setState({ history: [], redemptions: [] }), []);

  return { ...state, stats, recycle, redeem, reset };
}

export type RewardsApi = ReturnType<typeof useRewards>;
