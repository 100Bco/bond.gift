import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { processSteps } from '@/data/content';
import { Media } from './Media';

/*
 * Các bước quy trình dạng card đều nhau, cuộn ngang có điều khiển tay.
 * Không tự chạy; người xem bấm mũi tên hoặc kéo. Có bộ đếm "01 / 07".
 */
export function StepCarousel({ steps = processSteps }: { steps?: typeof processSteps }) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setIndex(Math.min(steps.length - 1, Math.round(track.scrollLeft / step)));
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
    };
    onScroll();
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [steps.length]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="step-carousel">
      <ol ref={trackRef} className="step-carousel-track" tabIndex={0} aria-label="Các bước quy trình">
        {steps.map((step) => (
          <li key={step.number} className="step-card">
            <span className="step-card-no t-numeral">{step.number}</span>
            <Media ratio="4 / 3" tone="paper" motion={step.motion} art="magenta" play="hover" alt="" className="step-card-media" />
            <div className="step-card-body">
              <h3 className="t-h4">{step.title}</h3>
              <p className="step-card-duration">{step.duration}</p>
              <p className="step-card-copy">{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="step-carousel-controls">
        <button type="button" className="step-carousel-btn" onClick={() => go(-1)} disabled={index === 0} aria-label="Bước trước">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span className="step-carousel-count" aria-live="polite"><span className="t-numeral">{pad(index + 1)}</span> / {pad(steps.length)}</span>
        <button type="button" className="step-carousel-btn" onClick={() => go(1)} disabled={atEnd} aria-label="Bước tiếp theo">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
