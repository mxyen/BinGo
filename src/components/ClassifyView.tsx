import { useRef, useState } from 'react';
import { CATEGORIES, CATEGORY_LIST, type CategoryId } from '../data/categories';
import { searchItems } from '../lib/search';
import { classifyImage, type ImagePrediction } from '../lib/imageClassifier';
import type { RewardsApi } from '../hooks/useRewards';
import ResultCard from './ResultCard';

interface Props {
  rewards: RewardsApi;
  notify: (msg: string) => void;
}

export interface Selection {
  itemName: string;
  category: CategoryId;
  tip?: string;
  source: 'search' | 'photo' | 'manual';
  confidence?: number;
}

type Mode = 'buscar' | 'foto';

export default function ClassifyView({ rewards, notify }: Props) {
  const [mode, setMode] = useState<Mode>('buscar');
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState<Selection | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<ImagePrediction[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const results = searchItems(query);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setPredictions(null);
    setSelection(null);
    setError(null);
  };

  const analyze = async () => {
    if (!imgRef.current) return;
    setAnalyzing(true);
    setError(null);
    try {
      const preds = await classifyImage(imgRef.current);
      setPredictions(preds);
      const best = preds.find((p) => p.category);
      if (best && best.category) {
        setSelection({
          itemName: best.itemName ?? best.label,
          category: best.category,
          source: 'photo',
          confidence: best.probability,
        });
      }
    } catch (e) {
      console.error(e);
      setError('No se pudo analizar la imagen. Inténtalo de nuevo o elige la categoría manualmente.');
    } finally {
      setAnalyzing(false);
    }
  };

  const confirm = () => {
    if (!selection) return;
    const entry = rewards.recycle(selection.itemName, selection.category);
    notify(`¡+${entry.points} puntos! Gracias por reciclar ${CATEGORIES[selection.category].emoji}`);
    setSelection(null);
    setQuery('');
    setPredictions(null);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
  };

  return (
    <section>
      <h2 className="section-title">¿Dónde lo tiro?</h2>

      <div className="segmented">
        <button className={mode === 'buscar' ? 'active' : ''} onClick={() => setMode('buscar')}>
          ⌨️ Escribir
        </button>
        <button className={mode === 'foto' ? 'active' : ''} onClick={() => setMode('foto')}>
          📷 Foto con IA
        </button>
      </div>

      {mode === 'buscar' && (
        <div className="card">
          <input
            className="search-input"
            placeholder="Ej. botella, pila, cáscara de plátano…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelection(null);
            }}
            autoFocus
          />
          {query.length >= 2 && !selection && (
            <ul className="suggestions">
              {results.map((item) => {
                const cat = CATEGORIES[item.category];
                return (
                  <li key={item.name}>
                    <button
                      onClick={() =>
                        setSelection({ itemName: item.name, category: item.category, tip: item.tip, source: 'search' })
                      }
                    >
                      <span className="dot" style={{ background: cat.color }} />
                      <span className="sugg-name">{item.name}</span>
                      <span className="sugg-cat">{cat.name}</span>
                    </button>
                  </li>
                );
              })}
              {results.length === 0 && (
                <li className="empty">No lo encontramos 🤔. Elige la categoría manualmente abajo.</li>
              )}
            </ul>
          )}
        </div>
      )}

      {mode === 'foto' && (
        <div className="card">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {!imageUrl ? (
            <button className="dropzone" onClick={() => fileRef.current?.click()}>
              <span className="big">📷</span>
              Toma o sube una foto del residuo
            </button>
          ) : (
            <div className="photo">
              <img ref={imgRef} src={imageUrl} alt="Residuo" crossOrigin="anonymous" />
              <div className="row">
                <button className="btn secondary" onClick={() => fileRef.current?.click()}>
                  Cambiar foto
                </button>
                <button className="btn" onClick={analyze} disabled={analyzing}>
                  {analyzing ? 'Analizando…' : '🤖 Analizar'}
                </button>
              </div>
            </div>
          )}
          {analyzing && <p className="hint">Preparando el modelo de IA…</p>}
          {error && <p className="error">{error}</p>}
          {predictions && (
            <details className="predictions" open={!selection}>
              <summary>Lo que vio la IA</summary>
              <ul>
                {predictions.map((p) => (
                  <li key={p.label}>
                    <span>{p.label.split(',')[0]}</span>
                    <span className="muted">{Math.round(p.probability * 100)}%</span>
                    {p.category && <span className="tag" style={{ background: CATEGORIES[p.category].color }}>{CATEGORIES[p.category].name}</span>}
                  </li>
                ))}
              </ul>
              {!predictions.some((p) => p.category) && (
                <p className="hint">No identificamos el residuo. Elige la categoría manualmente.</p>
              )}
            </details>
          )}
        </div>
      )}

      {selection && <ResultCard selection={selection} onConfirm={confirm} onCancel={() => setSelection(null)} />}

      {!selection && (
        <div className="manual">
          <p className="muted">¿Ya sabes la categoría? Elígela directamente:</p>
          <div className="chips">
            {CATEGORY_LIST.map((c) => (
              <button
                key={c.id}
                className="chip"
                style={{ borderColor: c.color }}
                onClick={() => setSelection({ itemName: c.name, category: c.id, source: 'manual' })}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
