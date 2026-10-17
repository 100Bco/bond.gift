import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { bespokeTiers, readySets } from '@/data/content';
import { Reveal } from '@/components/bond/Reveal';
import { usePrefersReducedMotion } from '@/hooks/use-in-view';

/* Lưới 4 set sẵn và lưới 2×2 các mức Độc Bản, dùng cho trang /set-san và /set-doc-ban. */

export function ReadySets() {
  const reduced = usePrefersReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  // Bậc thang giá trị: bốn thẻ đứng so le (set rẻ nhất thấp nhất) rồi về thẳng hàng khi khối tới giữa màn hình.
  // Bám theo thanh cuộn, có quán tính nhẹ cho mượt; cuộn ngược thì so le trở lại.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduced) return;
    const cards = [...grid.querySelectorAll<HTMLElement>('.lx-card')];
    let target = 0;
    let cur = 0;
    let raf = 0;
    let last = 0;
    const measure = () => {
      const r = grid.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.max(0, Math.min(1, (vh - r.top) / (vh / 2 + Math.min(r.height, vh) / 2)));
    };
    const apply = () => {
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const step = Math.min(56, window.innerWidth * 0.035);
      const e = 0.5 - Math.cos(Math.PI * cur) / 2;
      cards.forEach((c, i) => {
        c.style.setProperty('--lift', `${((cols - 1 - (i % cols)) * step * (1 - e)).toFixed(1)}px`);
        c.style.setProperty('--sc', (1 + 0.06 * (1 - e)).toFixed(4));
      });
    };
    const tick = (t: number) => {
      const dt = last ? Math.min(64, t - last) : 16;
      last = t;
      cur += (target - cur) * (1 - Math.exp(-dt / 160));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      apply();
      raf = cur === target ? 0 : requestAnimationFrame(tick);
      if (!raf) last = 0;
    };
    const kick = () => { measure(); if (!raf) raf = requestAnimationFrame(tick); };
    measure();
    cur = target;
    apply();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => { window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <section className="lx-sec lx-ready" id="set-san" aria-labelledby="lx-ready-title">
      <div className="lx-wrap lx-wrap-wide">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">Mô hình 01</p>
            <h1 id="lx-ready-title">Sẵn Trao</h1>
            <p className="lx-sec-meta"><span>Từ 10 set</span><i aria-hidden="true">·</i><span>1-2 tuần</span><i aria-hidden="true">·</i><span>In logo UV lên nắp hộp</span></p>
          </div>
        </Reveal>
        <div ref={gridRef} className="lx-cards lx-stair">
          {readySets.map((set) => (
            <Link key={set.slug} href={`/set-san/${set.slug}`} className="lx-card">
              <div className="lx-card-img">
                <span className="lx-card-box"><img src={set.photo} alt={`Sẵn Trao ${set.name}`} width={1200} height={1500} loading="lazy" decoding="async" /></span>
                <span className="lx-peek" aria-hidden="true">→</span>
              </div>
              <h3 className="lx-card-name">{set.name}</h3>
              <p className="lx-card-price">{set.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Bespoke() {
  return (
    <section className="lx-sec lx-custom" id="set-doc-ban" aria-labelledby="lx-custom-title">
      <div className="lx-wrap">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">Mô hình 02</p>
            <h1 id="lx-custom-title">Độc Bản</h1>
            <p className="lx-sec-meta"><span>Từ 300 set</span><i aria-hidden="true">·</i><span>8 tuần</span><i aria-hidden="true">·</i><span>Thiết kế riêng theo thương hiệu</span></p>
            <div className="lx-disc">
              <p>Mỗi mẫu dưới đây là một hướng thiết kế để bắt đầu. BOND và ZAD sẽ phát triển kết cấu hộp và trải nghiệm mở hộp riêng cho thương hiệu của anh chị, không dùng lại cho bất kỳ doanh nghiệp nào khác.</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="lx-bud">
          {bespokeTiers.map((b) => (
            <Link key={b.slug} href={`/set-doc-ban/${b.slug}`} className="lx-bud-card">
              <span className="lx-bud-img"><img src={b.cover} alt={`${b.name}, ngân sách ${b.money} mỗi set`} width={800} height={800} loading="lazy" decoding="async" style={b.coverPos ? { objectPosition: b.coverPos } : undefined} /><span className="lx-peek" aria-hidden="true">→</span></span>
              <span className="lx-bud-name">{b.name}</span>
              <span className="lx-bud-money">{b.money} <small>/ set</small></span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

