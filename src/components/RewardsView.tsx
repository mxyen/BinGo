import { REWARDS } from '../data/rewards';
import type { RewardsApi } from '../hooks/useRewards';

interface Props {
  rewards: RewardsApi;
  notify: (msg: string) => void;
}

export default function RewardsView({ rewards, notify }: Props) {
  const { stats, redemptions, redeem } = rewards;
  const sorted = [...REWARDS].sort((a, b) => a.cost - b.cost);

  return (
    <section>
      <h2 className="section-title">Recompensas</h2>
      <p className="muted">
        Tienes <strong>{stats.balance} pts</strong> para canjear.
      </p>

      <div className="rewards-grid">
        {sorted.map((r) => {
          const canAfford = stats.balance >= r.cost;
          return (
            <div key={r.id} className={`reward ${canAfford ? '' : 'locked'}`}>
              <span className="reward-emoji">{r.emoji}</span>
              <p className="reward-name">{r.name}</p>
              <p className="muted small">{r.description}</p>
              <button
                className="btn"
                disabled={!canAfford}
                onClick={() => {
                  const res = redeem(r.id);
                  if (res) notify(`🎉 Canjeaste “${r.name}”. Código: ${res.code}`);
                }}
              >
                {canAfford ? `Canjear · ${r.cost} pts` : `Faltan ${r.cost - stats.balance} pts`}
              </button>
            </div>
          );
        })}
      </div>

      {redemptions.length > 0 && (
        <div className="card">
          <h3>Mis canjes</h3>
          <ul className="history">
            {redemptions.map((red) => {
              const reward = REWARDS.find((r) => r.id === red.rewardId);
              return (
                <li key={red.id}>
                  <span>{reward?.emoji}</span>
                  <span className="history-name">{reward?.name}</span>
                  <code className="code">{red.code}</code>
                  <span className="minus">-{red.cost}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
