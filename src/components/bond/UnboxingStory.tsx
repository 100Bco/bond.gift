import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-in-view';
import { Label, TextLink } from './primitives';

/*
 * Khoảnh khắc đặc trưng của trang chủ: hộp quà BOND mở dần theo thao tác cuộn.
 * Mỗi lớp ứng với một phần việc BOND làm trọn gói: bao bì, thiệp, quà, giao nhận.
 * Minh họa bằng khối CSS, chờ thay bằng chuỗi ảnh/video mở hộp thật.
 * Reduced motion: không sticky, hiện trạng thái đã mở và đủ bốn chú thích.
 */
const steps = [
  { title: 'Bao bì thương hiệu', copy: 'Hộp cứng, hộp nam châm, hộp nắp rời và các kết cấu phù hợp với từng trải nghiệm mở.' },
  { title: 'Thiệp & ấn phẩm', copy: 'Thiệp cảm ơn, card hướng dẫn, tag và vật phẩm nhỏ hoàn thiện điểm chạm.' },
  { title: 'Quà tặng doanh nghiệp', copy: 'Thiết kế riêng, nguồn hàng tuyển chọn.' },
  { title: 'Giao đến từng điểm nhận', copy: 'Một đầu mối cho những điểm chạm thương hiệu cần được làm đến nơi đến chốn.' },
];

export function UnboxingStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      [1, 2, 3, 4].forEach((i) => node.style.setProperty(`--p${i}`, '1'));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      // Mỗi lớp chiếm một phần tư quãng cuộn, có chút chồng lấn cho mềm
      [0, 1, 2, 3].forEach((i) => {
        const local = Math.min(1, Math.max(0, (p - i * 0.22) / 0.3));
        node.style.setProperty(`--p${i + 1}`, local.toFixed(3));
      });
      setActive(Math.min(3, Math.floor(p * 4)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, [reduced]);

  return (
    <section ref={ref} className={`unbox ${reduced ? 'is-static' : ''}`} aria-labelledby="unbox-title">
      <div className="unbox-sticky">
        <div className="container unbox-inner">
          <header className="unbox-head">
            <Label className="section-intro-label">Chúng tôi làm gì</Label>
            <h2 id="unbox-title" className="t-h2">Từ ý tưởng đến điểm giao.</h2>
          </header>

          <div className="unbox-stage" role="img" aria-label="Minh họa tạm: hộp quà mở ra từng lớp gồm hộp, thiệp, quà và nhiều hộp giao đi các điểm nhận. Cần thay bằng chuỗi ảnh hoặc video mở hộp thật.">
            <div className="ub-floor" />
            <div className="ub-side ub-side-l"><i /></div>
            <div className="ub-side ub-side-r"><i /></div>
            <div className="ub-box">
              <div className="ub-product"><i /></div>
              <div className="ub-tissue ub-tissue-l" />
              <div className="ub-tissue ub-tissue-r" />
              <div className="ub-body"><span className="ub-ribbon" /></div>
            </div>
            <div className="ub-card"><span /><span /><span /></div>
            <div className="ub-lid"><span className="ub-ribbon" /></div>
            <span className="unbox-note"><span className="media-note-kicker">Minh họa tạm</span>Chuỗi ảnh / video mở hộp quà thật theo từng lớp</span>
          </div>

          <ol className="unbox-steps">
            {steps.map((step, index) => (
              <li key={step.title} className={index === active || reduced ? 'is-active' : ''}>
                <span className="unbox-no t-numeral">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="unbox-title">{step.title}</h3>
                <p className="unbox-copy">{step.copy}</p>
              </li>
            ))}
          </ol>
          <div className="unbox-link"><TextLink href="/quy-trinh">Xem quy trình 7 bước</TextLink></div>
        </div>
      </div>
    </section>
  );
}
