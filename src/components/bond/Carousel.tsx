import { Children, type ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/*
 * Hàng card đều nhau cuộn ngang, giữ mỗi section gọn trong một màn hình.
 * Không tự chạy; người xem bấm mũi tên hoặc kéo. Có bộ đếm "01 / 06".
 * perView: số card thấy cùng lúc trên desktop (tablet 2, mobile ~1).
 */
export function Carousel({ label, children, perView = 3, className = '' }: { label: string; children: ReactNode; perView?: 3 | 4; className?: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setIndex(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
      setScrollable(track.scrollWidth > track.clientWidth + 2);
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { track.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [items.length]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <div className={`carousel carousel-${perView} ${className}`.trim()}>
      <ul ref={trackRef} className="carousel-track" tabIndex={0} aria-label={label}>
        {items.map((child, i) => <li key={i} className="carousel-item">{child}</li>)}
      </ul>
      {scrollable && (
        <div className="carousel-controls">
          <button type="button" className="carousel-btn" onClick={() => go(-1)} disabled={index === 0} aria-label="Xem trước">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span className="carousel-count" aria-live="polite"><span className="t-numeral">{pad(index + 1)}</span> / {pad(items.length)}</span>
          <button type="button" className="carousel-btn" onClick={() => go(1)} disabled={atEnd} aria-label="Xem tiếp">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
