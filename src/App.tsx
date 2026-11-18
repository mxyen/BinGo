import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { useRewards } from './hooks/useRewards';
import ClassifyView from './components/ClassifyView';
import PointsView from './components/PointsView';
import RewardsView from './components/RewardsView';
import Toast from './components/Toast';

type Tab = 'clasificar' | 'puntos' | 'recompensas';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'clasificar', label: 'Clasificar', icon: '🔍' },
  { id: 'puntos', label: 'Mis puntos', icon: '⭐' },
  { id: 'recompensas', label: 'Recompensas', icon: '🎁' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('clasificar');
  const [toast, setToast] = useState<string | null>(null);
  const rewards = useRewards();

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    // Avisa cuando todo (incluido el modelo de IA) quedó guardado para usarse sin conexión.
    registerSW({
      immediate: true,
      onOfflineReady: () => notify('✅ BinGo ya funciona sin internet'),
    });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="logo">♻️</span>
          <div>
            <h1>BinGo</h1>
            <p className="tagline">Clasifica, recicla y gana</p>
          </div>
        </div>
        <button className="points-badge" onClick={() => setTab('puntos')} title="Ver mis puntos">
          {rewards.stats.level.emoji} <strong>{rewards.stats.balance}</strong> pts
        </button>
      </header>

      <main className="content">
        {tab === 'clasificar' && <ClassifyView rewards={rewards} notify={notify} />}
        {tab === 'puntos' && <PointsView rewards={rewards} />}
        {tab === 'recompensas' && <RewardsView rewards={rewards} notify={notify} />}
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {toast && <Toast message={toast} />}
    </div>
  );
}
