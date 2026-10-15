import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Lightbox } from '@/components/bond/Lightbox';

const LABELS = ['Hộp mở', 'Các món bày ra ngoài', 'Hộp đóng'];

/**
 * Ảnh lớn đầu trang Set sẵn: nhiều ảnh xếp chồng, chuyển bằng mũi tên, chấm hoặc vuốt ngang; ảnh hiện dần.
 * Bấm vào ảnh mở popup phóng to, trong popup vẫn chuyển ảnh được.
 */
export function SetGallery({ name, images, labels = LABELS, positions, onChange }: { name: string; images: string[]; labels?: string[]; positions?: (string | undefined)[]; onChange?: (i: number) => void }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const n = images.length;
  const go = useCallback((step: number) => setI((v) => (v + step + n) % n), [n]);
  useEffect(() => { onChange?.(i); }, [i, onChange]);
  const close = useCallback(() => setZoom(false), []);
  const start = useRef<number | null>(null);
  const swiped = useRef(false);
  const label = (k: number) => labels[k] ?? `Ảnh ${k + 1}`;

  const down = (e: PointerEvent) => { start.current = e.clientX; swiped.current = false; };
  const up = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) > 40) { swiped.current = true; go(dx < 0 ? 1 : -1); }
  };

  return (
    <div className="lx-gal" role="region" aria-roledescription="carousel" aria-label={`Ảnh set ${name}`}>
      <button type="button" className="lx-gal-stage" onPointerDown={down} onPointerUp={up} onClick={() => { if (!swiped.current) setZoom(true); }} aria-label={`Phóng to ảnh: ${label(i)}`}>
        {images.map((src, k) => (
          <img key={src} src={src} alt={`${name}: ${label(k)}`} width={1086} height={1448} loading={k === 0 ? 'eager' : 'lazy'} decoding="async" className={k === i ? 'is-on' : undefined} aria-hidden={k !== i || undefined} draggable={false} style={positions?.[k] ? { objectPosition: positions[k] } : undefined} />
        ))}
      </button>
      {n > 1 && (
        <>
          <button type="button" className="lx-gal-btn lx-gal-prev" onClick={() => go(-1)} aria-label="Ảnh trước">←</button>
          <button type="button" className="lx-gal-btn lx-gal-next" onClick={() => go(1)} aria-label="Ảnh sau">→</button>
          <div className="lx-gal-dots">
            {images.map((src, k) => (
              <button key={src} type="button" className={k === i ? 'is-on' : undefined} onClick={() => setI(k)} aria-label={`Xem ảnh ${k + 1}: ${label(k)}`} aria-current={k === i || undefined} />
            ))}
          </div>
        </>
      )}
      {zoom && (
        <Lightbox
          slides={images.map((src, k) => ({ caption: `${label(k)} · ${name}`, label: `Ảnh set ${name}`, content: <img src={src} alt={`${name}: ${label(k)}`} /> }))}
          index={i}
          onClose={close}
          onMove={go}
        />
      )}
    </div>
  );
}
