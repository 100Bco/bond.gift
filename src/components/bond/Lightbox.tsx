import { useEffect, useRef, type ReactNode } from 'react';

export type LightboxSlide = { caption: string; label: string; content: ReactNode };

/** Popup phóng to ảnh: Esc hoặc bấm nền để đóng, phím trái phải hoặc nút để chuyển ảnh. */
export function Lightbox({ slides, index, onClose, onMove }: { slides: LightboxSlide[]; index: number; onClose: () => void; onMove: (step: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; prev?.focus(); };
  }, [onClose, onMove]);
  const slide = slides[index];
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="lx-lb" role="dialog" aria-modal="true" aria-label={slide.label} onClick={onClose}>
      <figure className="lx-lb-fig" onClick={(e) => e.stopPropagation()}>
        <div className="lx-lb-img">{slide.content}</div>
        <figcaption>{pad(index + 1)} / {pad(slides.length)} · {slide.caption}</figcaption>
      </figure>
      <button ref={closeRef} type="button" className="lx-lb-btn lx-lb-close" onClick={onClose} aria-label="Đóng">×</button>
      {slides.length > 1 && (
        <>
          <button type="button" className="lx-lb-btn lx-lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label="Ảnh trước">←</button>
          <button type="button" className="lx-lb-btn lx-lb-next" onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label="Ảnh sau">→</button>
        </>
      )}
    </div>
  );
}
