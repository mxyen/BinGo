import { CATEGORIES } from '../data/categories';
import type { Selection } from './ClassifyView';

interface Props {
  selection: Selection;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ResultCard({ selection, onConfirm, onCancel }: Props) {
  const cat = CATEGORIES[selection.category];

  return (
    <div className="result" style={{ borderColor: cat.color }}>
      <div className="result-head" style={{ background: cat.color }}>
        <span className="result-emoji">{cat.emoji}</span>
        <div>
          <p className="result-item">{selection.itemName}</p>
          <p className="result-bin">→ {cat.bin}</p>
        </div>
      </div>
      <div className="result-body">
        <p>
          Categoría: <strong>{cat.name}</strong>
          {selection.confidence !== undefined && (
            <span className="muted"> · confianza IA {Math.round(selection.confidence * 100)}%</span>
          )}
        </p>
        <ul className="tips">
          {selection.tip && <li>💡 {selection.tip}</li>}
          {cat.tips.map((t) => (
            <li key={t}>✔️ {t}</li>
          ))}
        </ul>
        <div className="row">
          <button className="btn secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn" style={{ background: cat.color }} onClick={onConfirm}>
            ¡Ya lo tiré! +{cat.points} pts
          </button>
        </div>
      </div>
    </div>
  );
}
