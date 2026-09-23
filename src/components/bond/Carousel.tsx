import { Children, type ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/*
 * Hàng card đều nhau cuộn ngang, giữ mỗi section gọn trong một màn hình.
 * Không tự chạy; người xem bấm mũi tên hoặc kéo. Có bộ đếm "01 / 06".
 * perView: số card thấy cùng lúc trên desktop (tablet 2, mobile ~1).
 * rows: 2 thì mỗi trang là lưới perView cột × 2 hàng; trên mobile trải lại thành một hàng.
 */
export function Carousel({ label, children, perView = 3, rows = 1, className = '' }: { label: string; children: ReactNode; perView?: 3 | 4; rows?: 1 | 2; className?: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const cards = Children.toArray(children);
  const pageSize = perView * rows;
  const items = rows === 1 ? cards : Array.from({ length: Math.ceil(cards.length / pageSize) }, (_, i) => cards.slice(i * pageSize, (i + 1) * pageSize));
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(true);
  const [count, setCount] = useState(items.length);

  // Đơn vị cuộn: trang (desktop) hoặc từng card khi trang dùng display: contents (mobile)
  const unit = (track: HTMLElement) => {
    const first = track.firstElementChild as HTMLElement | null;
    if (first && first.offsetWidth > 0) return { el: first, n: items.length };
    return { el: track.querySelector('.carousel-item') as HTMLElement | null, n: cards.length };
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const { el: card, n } = unit(track);
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setCount(n);
      setIndex(Math.min(n - 1, Math.round(track.scrollLeft / step)));
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
      setScrollable(track.scrollWidth > track.clientWidth + 2);
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { track.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [items.length, cards.length]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = unit(track).el;
    if (!card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <div className={`carousel carousel-${perView} ${rows === 2 ? 'carousel-paged' : ''} ${className}`.trim()}>
      <ul ref={trackRef} className="carousel-track" tabIndex={0} aria-label={label}>
        {rows === 1
          ? cards.map((child, i) => <li key={i} className="carousel-item">{child}</li>)
          : (items as ReactNode[][]).map((page, i) => (
            <li key={i} className="carousel-page">
              {page.map((child, j) => <div key={j} className="carousel-item">{child}</div>)}
            </li>
          ))}
      </ul>
      {scrollable && (
        <div className="carousel-controls">
          <button type="button" className="carousel-btn" onClick={() => go(-1)} disabled={index === 0} aria-label="Xem trước">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span className="carousel-count" aria-live="polite"><span className="t-numeral">{pad(index + 1)}</span> / {pad(count)}</span>
          <button type="button" className="carousel-btn" onClick={() => go(1)} disabled={atEnd} aria-label="Xem tiếp">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
