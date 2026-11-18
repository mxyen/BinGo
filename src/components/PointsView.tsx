import { CATEGORIES, CATEGORY_LIST } from '../data/categories';
import type { RewardsApi } from '../hooks/useRewards';

export default function PointsView({ rewards }: { rewards: RewardsApi }) {
  const { stats, history } = rewards;
  const totalItems = history.length;

  return (
    <section>
      <h2 className="section-title">Mi impacto</h2>

      <div className="card level-card">
        <div className="level-emoji">{stats.level.emoji}</div>
        <div className="level-info">
          <p className="level-name">Nivel: {stats.level.name}</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${Math.min(100, stats.progress * 100)}%` }} />
          </div>
          <p className="muted small">
            {stats.next
              ? `${stats.next.min - stats.earned} pts para ${stats.next.emoji} ${stats.next.name}`
              : '¡Nivel máximo alcanzado!'}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-value">{stats.balance}</span>
          <span className="stat-label">Puntos disponibles</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalItems}</span>
          <span className="stat-label">Residuos reciclados</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.co2.toFixed(1)} kg</span>
          <span className="stat-label">CO₂ evitado (aprox.)</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.earned}</span>
          <span className="stat-label">Puntos totales</span>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="card">
          <h3>Por categoría</h3>
          {CATEGORY_LIST.filter((c) => stats.byCategory[c.id]).map((c) => {
            const count = stats.byCategory[c.id] ?? 0;
            return (
              <div key={c.id} className="bar-row">
                <span className="bar-label">
                  {c.emoji} {c.name}
                </span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(count / totalItems) * 100}%`, background: c.color }} />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="card">
        <h3>Historial</h3>
        {history.length === 0 ? (
          <p className="muted">Aún no reciclas nada. ¡Ve a “Clasificar” y gana tus primeros puntos! 🌱</p>
        ) : (
          <ul className="history">
            {history.slice(0, 20).map((e) => (
              <li key={e.id}>
                <span className="dot" style={{ background: CATEGORIES[e.category].color }} />
                <span className="history-name">{e.itemName}</span>
                <span className="muted small">{new Date(e.date).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })}</span>
                <span className="plus">+{e.points}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(history.length > 0 || rewards.redemptions.length > 0) && (
        <button
          className="link-btn"
          onClick={() => {
            if (confirm('¿Borrar todo tu progreso? (útil para reiniciar la demo)')) rewards.reset();
          }}
        >
          Reiniciar demo
        </button>
      )}
    </section>
  );
}
