import { useRef, type MouseEvent } from 'react';
import { giftProcesses } from '@/data/content';
import { usePrefersReducedMotion } from '@/hooks/use-in-view';
import { clamp01, useScrollFx } from '@/hooks/use-scroll-fx';

const pad = (n: number) => String(n).padStart(2, '0');
const SECTION_ID = 'quy-trinh';
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Link "Xem quy trình": cuộn mượt xuống khối quy trình ngay trong trang con, không đổi trang. */
export function ProcessLink() {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(SECTION_ID);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
  };
  return <a href={`#${SECTION_ID}`} onClick={go} className="lx-sd-textlink">Xem quy trình <span aria-hidden="true">→</span></a>;
}

/** Khối "Quy trình N bước" ở trang con: đường dọc đổ đỏ theo thanh cuộn, chạm bước nào thì bước đó sáng lên. */
export function ProcessSteps({ kind, eyebrow }: { kind: 'ready' | 'bespoke'; eyebrow: string }) {
  const steps = giftProcesses[kind].steps;
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  useScrollFx(() => {
    const list = ref.current;
    if (!list) return;
    const r = list.getBoundingClientRect();
    const p = clamp01((window.innerHeight * 0.6 - r.top) / r.height);
    list.style.setProperty('--p', p.toFixed(4));
    for (const li of list.querySelectorAll<HTMLElement>('.lx-sd-item')) li.classList.toggle('is-lit', li.offsetTop + 28 <= p * r.height);
  }, !reduced, [kind]);

  return (
    <section id={SECTION_ID} className="lx-sec lx-sd-sec lx-sd-process" aria-labelledby="lx-sd-steps">
      <div className="lx-wrap lx-sd-split">
        <div className="lx-sd-side">
          <p className="lx-eyebrow">{eyebrow}</p>
          <h2 id="lx-sd-steps">Quy trình {steps.length} bước</h2>
        </div>
        <ol ref={ref} className="lx-sd-steps">
          {steps.map(([t, desc], i) => (
            <li key={t} className="lx-sd-item">
              <span className="lx-cmp-step-n">{pad(i + 1)}</span>
              <div><p className="lx-sd-item-t">{t}</p><p className="lx-sd-item-d">{desc}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
