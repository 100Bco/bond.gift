import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { clientLogos, giftModels, giftProcesses } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { TetPetals } from '@/components/bond/TetPetals';
import { TET, TetCta } from '@/components/bond/TetCta';
import { useInView, usePrefersReducedMotion } from '@/hooks/use-in-view';

/* Trang chủ: hero, logo đối tác, so sánh hai mô hình, khoảnh khắc trao quà, khối Tết cuối trang. Sẵn Trao, Độc Bản, Quy trình là trang riêng. */

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');
const ArrowDown = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 3v10M8 13l-4.5-4.5M8 13l4.5-4.5" /></svg>;

function useTetCountdown() {
  const calc = () => {
    const now = new Date();
    if (now >= TET) return null;
    let months = (TET.getFullYear() - now.getFullYear()) * 12 + (TET.getMonth() - now.getMonth());
    let anchor = new Date(now.getTime());
    anchor.setMonth(anchor.getMonth() + months);
    if (anchor > TET) { months -= 1; anchor = new Date(now.getTime()); anchor.setMonth(anchor.getMonth() + months); }
    const diff = TET.getTime() - anchor.getTime();
    return { m: months, d: Math.floor(diff / 86_400_000), h: Math.floor(diff / 3_600_000) % 24, min: Math.floor(diff / 60_000) % 60, s: Math.floor(diff / 1000) % 60 };
  };
  const [value, setValue] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setValue(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return value;
}

/** Đồng hồ đếm ngược đến Tết, tách riêng để mỗi giây chỉ vẽ lại phần này, không vẽ lại cả hero. */
function Countdown() {
  const cd = useTetCountdown();
  if (!cd) return null;
  return (
    <>
    <div className="lx-cd" role="timer" aria-label={`Còn ${cd.m} tháng ${cd.d} ngày đến Tết Đinh Mùi 2027`}>
      {([[cd.m, 'Tháng'], [cd.d, 'Ngày'], [cd.h, 'Giờ'], [cd.min, 'Phút'], [cd.s, 'Giây']] as [number, string][]).map(([v, label], i) => (
        <div key={label} className="lx-cd-group" aria-hidden="true">
          {i > 0 && <span className="lx-cd-sep" />}
          <span className="lx-cd-unit"><span className="lx-cd-num">{pad(v)}</span><span className="lx-cd-lab">{label}</span></span>
        </div>
      ))}
    </div>
    <p className="lx-cd-cap" aria-hidden="true">tới Tết Đinh Mùi 2027</p>
    </>
  );
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const norm = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
/** Đường cong êm: tăng tốc rồi giảm tốc đều (sine in-out). */
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [phase2, setPhase2] = useState(false);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const set = (k: string, v: string) => hero.style.setProperty(k, v);

    // Vẽ cảnh theo tiến độ p (0 đến 1). Mọi pha dùng đường cong êm, không nảy.
    const render = (p: number) => {
      set('--hintOp', (1 - ease(norm(p, 0, 0.08))).toFixed(3));
      // 1. Các món còn lại mờ dần và lùi rất nhẹ (bỏ hiệu ứng nhòe để khung hình mượt)
      const pRest = ease(norm(p, 0.08, 0.4));
      set('--restOp', (1 - pRest).toFixed(3));
      set('--restScale', lerp(1, 0.97, pRest).toFixed(4));
      // 2. Chữ pha 1 lui ra
      const pOut = ease(norm(p, 0.22, 0.42));
      set('--p1op', (1 - pOut).toFixed(3));
      set('--p1y', `${lerp(0, -36, pOut).toFixed(1)}px`);
      // 3. Hộp bên phải trượt vào giữa theo đường cong, xoay khớp góc hộp trong ảnh tay ôm
      const pMove = ease(norm(p, 0.26, 0.62));
      const arc = Math.sin(pMove * Math.PI) * -8;
      set('--boxX', lerp(0, -36, pMove).toFixed(3));
      set('--boxY', (lerp(0, -14, pMove) + arc).toFixed(3));
      set('--boxRot', lerp(0, 6, pMove).toFixed(2));
      set('--boxScale', lerp(1, 1.15, pMove).toFixed(4));
      // Máy quay tiến lại gần: cả cảnh phóng to từ từ trong lúc hộp bay vào
      set('--zoom', ease(norm(p, 0.28, 0.7)).toFixed(4));
      // 4. Tay không đưa lên lệch nhịp, cổ tay xoay dần về thẳng
      const pHandR = ease(norm(p, 0.34, 0.64));
      const pHandL = ease(norm(p, 0.38, 0.68));
      set('--handRY', lerp(100, 0, pHandR).toFixed(2));
      set('--handLY', lerp(100, 0, pHandL).toFixed(2));
      set('--handRRot', lerp(8, 0, pHandR).toFixed(2));
      set('--handLRot', lerp(-8, 0, pHandL).toFixed(2));
      // 5. Hòa từ từ sang ảnh tay đang ôm hộp; hộp lún nhẹ rồi dừng hẳn
      set('--heldOp', ease(norm(p, 0.6, 0.68)).toFixed(3));
      set('--emptyOp', (1 - ease(norm(p, 0.645, 0.7))).toFixed(3));
      set('--heldY', lerp(-1.2, 0, ease(norm(p, 0.6, 0.76))).toFixed(3));
      // 6. Chữ pha 2 hiện ra
      const pIn = ease(norm(p, 0.74, 0.94));
      set('--p2op', pIn.toFixed(3));
      set('--p2y', `${lerp(24, 0, pIn).toFixed(1)}px`);
      setPhase2(pIn > 0.5);
    };

    // Đo đáy khối chữ để bộ quà lấp đúng phần còn lại của màn hình (phương án A: không cắt món nào)
    const p1 = hero.querySelector<HTMLElement>('.lx-hero-p1');
    const p2 = hero.querySelector<HTMLElement>('.lx-hero-p2');
    const stage = hero.querySelector<HTMLElement>('.lx-stage');
    const measure = () => {
      if (p1) set('--stage-top', `${Math.round(p1.offsetTop + p1.offsetHeight)}px`);
      // Khung cuối: đặt cụm "Brands, in hand." sao cho đáy nút cách đầu ngón tay ít nhất 64px.
      // Tính từ bố cục chưa biến đổi của sân khấu, rồi áp lại phép phóng to quanh tâm transform-origin.
      requestAnimationFrame(() => {
        if (!stage || !p2) return;
        const cs = getComputedStyle(stage);
        const zoom = parseFloat(cs.getPropertyValue('--zoom-max')) || 1;
        const originY = parseFloat(cs.transformOrigin.split(' ')[1] ?? '0');
        const w = stage.offsetWidth;
        const h = stage.offsetHeight;
        const handsH = 0.62 * w * (1045 / 1400);
        const fingertip = h * 1.04 - handsH + 0.049 * handsH; // đầu ngón tay cao nhất trong ảnh tay ôm hộp
        const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--lx-nav-h')) || 82;
        // Màn thấp: phóng to ít hơn để vẫn đủ chỗ cho chữ phía trên và khoảng cách 64px
        const minTip = navH + 24 + p2.offsetHeight + 64;
        const fit = (stage.offsetTop + originY - minTip) / (originY - fingertip);
        const z = Math.max(1, Math.min(zoom, fit));
        stage.style.setProperty('--zoom-fit', z.toFixed(4));
        const fingertipOnScreen = stage.offsetTop + originY + (fingertip - originY) * z;
        const top = Math.max(navH + 24, fingertipOnScreen - 64 - p2.offsetHeight);
        set('--p2-top', `${Math.round(top)}px`);
      });
    };
    measure();
    window.addEventListener('resize', measure);
    if (reduced) return () => window.removeEventListener('resize', measure);
    // Quán tính: tiến độ hiển thị đuổi theo vị trí cuộn, nên mỗi nấc lăn chuột trôi mượt thay vì nhảy.
    // Chỉ làm mượt chuyển động trong trang, không can thiệp thao tác cuộn của người xem.
    const target = () => {
      const total = hero.offsetHeight - window.innerHeight;
      return clamp((window.scrollY - hero.offsetTop) / (total || 1));
    };
    let current = target();
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const goal = target();
      const k = 1 - Math.exp(-dt / 180); // hằng số thời gian khoảng 0,18 giây
      current += (goal - current) * k;
      if (Math.abs(goal - current) < 0.0004) current = goal;
      render(current);
      frame = current === goal ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); } };
    render(current);
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    return () => { window.removeEventListener('scroll', wake); window.removeEventListener('resize', wake); window.removeEventListener('resize', measure); cancelAnimationFrame(frame); };
  }, [reduced]);

  return (
    <section ref={ref} className={`lx-hero ${reduced ? 'is-static' : ''}`} aria-labelledby="lx-hero-title">
      <div className="lx-hero-sticky">
        {/* Trang trí Tết: cành mai, đào ở hai góc trên và hoa rơi chậm phía sau nội dung */}
        <TetPetals />
        {/* Mũi tên cuộn: nét 1px ở khoảng trống góc dưới bên trái, nổi trên ảnh */}
        <span className="lx-scroll-cue" aria-hidden="true"><i /><span className="lx-scroll-cue-t">Cuộn xuống</span></span>
        <div className="lx-hero-in">
          <div className="lx-hero-p1" style={{ pointerEvents: phase2 ? 'none' : undefined }}>
            <h1 id="lx-hero-title" className="lx-hero-title">Quà Tết doanh nghiệp</h1>
            <Countdown />
          </div>

          {/* Bộ quà BOND (ảnh tách nền): các món khác mờ dần, hộp bên phải trượt vào giữa, hai tay đưa lên đỡ */}
          <div className="lx-stage" role="img" aria-label="Bộ quà Tết BOND: hộp, hũ hạt, rượu vang và tượng dê; một hộp quà được đôi tay nâng lên">
            <img className="lx-stage-layer lx-stage-rest" src="/assets/hero/collection-rest.webp" alt="" width={1600} height={757} fetchPriority="high" decoding="async" />
            {/* Đôi tay (ảnh tạo bằng Higgsfield từ hộp thật): tay không đưa lên đón, rồi hòa sang ảnh tay đang ôm hộp */}
            <div className="lx-stage-hands">
              <img className="lx-hands-layer lx-hands-l" src="/assets/hero/hands-empty-left.webp" alt="" width={1400} height={1045} decoding="async" />
              <img className="lx-hands-layer lx-hands-r" src="/assets/hero/hands-empty-right.webp" alt="" width={1400} height={1045} decoding="async" />
              <img className="lx-hands-layer lx-hands-held" src="/assets/hero/hands-held.webp" alt="" width={1400} height={1045} decoding="async" />
            </div>
            <img className="lx-stage-layer lx-stage-box" src="/assets/hero/collection-box.webp" alt="" width={1600} height={757} fetchPriority="high" decoding="async" />
          </div>

          {/* Khung cuối: đáy cảnh tan dần vào nền thay vì bị cắt ngang */}
          <div className="lx-hero-fade" aria-hidden="true" />

          <div className={`lx-hero-p2 ${phase2 ? 'is-live' : ''}`}>
            <p className="lx-hero-line2">Brands, <span className="lx-serif">in hand.</span></p>
            <p className="lx-hero-line2sub">Đưa dấu ấn thương hiệu vào từng món quà trao tay.</p>
            <Link href="/set-san" className="lx-btn lx-btn-red" tabIndex={phase2 ? undefined : -1}><span>Khám phá bộ sưu tập</span><ArrowDown /></Link>
          </div>

        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const reduced = usePrefersReducedMotion();
  const row = reduced ? clientLogos : [...clientLogos, ...clientLogos];
  return (
    <section className="lx-logos" aria-label="Khách hàng đã đồng hành">
      <div className="lx-logos-in">
        <p className="lx-logos-lab">Đã đồng hành cùng hệ sinh thái 100B</p>
        <div className="lx-logos-track">
          <ul className={`lx-logos-row ${reduced ? 'is-static' : ''}`}>
            {row.map((c, i) => (
              <li key={`${c.name}-${i}`} aria-hidden={i >= clientLogos.length ? true : undefined}>
                <img src={c.logo} alt={i >= clientLogos.length ? '' : c.name} loading="lazy" style={{ height: c.h }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Một ô giá trị trong bảng so sánh: một dòng, cùng cỡ chữ. short là bản rút gọn hiện dưới 480px. */
type CmpCell = { full: string; short?: string };
const cmpRows: [string, CmpCell, CmpCell][] = [
  ['Thời gian hoàn thành', { full: 'Thời hạn 1 - 2 tuần' }, { full: 'Thời hạn 8 tuần' }],
  ['Số lượng tối thiểu', { full: 'Tối thiểu 10 set' }, { full: 'Tối thiểu 300 set' }],
  ['Hạn chốt đơn', { full: 'Chốt trước 15 tháng 12', short: 'Trước 15/12' }, { full: 'Chốt trước 15 tháng 11', short: 'Trước 15/11' }],
];

function CmpValue({ cell }: { cell: CmpCell }) {
  return (
    <span className="lx-cmpt-val">
      {cell.short ? <><span className="lx-cmpt-lg">{cell.full}</span><span className="lx-cmpt-sm">{cell.short}</span></> : cell.full}
    </span>
  );
}

/** Một dòng so sánh: hai giá trị thẳng hàng, nhãn chỉ dành cho trình đọc màn hình. Hiện dần một lần khi cuộn tới. */
function CmpRow({ label, id, children }: { label: string; id?: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2, once: true, rootMargin: '0px 0px -6% 0px' });
  return (
    <div ref={ref} id={id} role="row" className={`lx-cmpt-row${inView ? ' is-in' : ''}`}>
      <div role="rowheader" className="sr-only">{label}</div>
      {children}
    </div>
  );
}

/**
 * Hai cách đặt quà, trình bày kiểu bảng so sánh của Apple: không card, không nền, chỉ đường kẻ ngang 1px.
 * Tên hai cột dính trên đầu khi cuộn; chỗ không có ghi dấu "—".
 */
function Models() {
  const [open, setOpen] = useState({ ready: false, bespoke: false });
  const cols = [
    { kind: 'ready' as const, img: '/assets/models/so-sanh-set-san.webp', w: 1264, h: 848, alt: 'Sẵn Trao: hộp quà hai cánh đóng kín, nền xanh ngọc và đỏ, họa tiết hoa cúc và ngựa, có quai xách' },
    { kind: 'bespoke' as const, img: '/assets/models/so-sanh-set-doc-ban.webp', w: 1264, h: 848, alt: 'Hộp quà Độc Bản hình hoa màu trắng, viền vàng và huy hiệu hoa vàng ở giữa' },
  ];
  return (
    <section className="lx-sec lx-cmp" id="so-sanh" aria-labelledby="lx-cmp-title">
      <div className="lx-wrap">
        <Reveal className="lx-cmp-head">
          <h2 id="lx-cmp-title">Hai cách để BOND làm quà cho thương hiệu của anh chị</h2>
        </Reveal>
        <div className="lx-cmpt" role="table" aria-label="So sánh Sẵn Trao và Độc Bản">
          <div className="lx-cmpt-head" role="row">
            {cols.map((c) => <h3 key={c.kind} role="columnheader" className="lx-cmpt-name"><Link href={c.kind === 'ready' ? '/set-san' : '/set-doc-ban'} className="lx-cmpt-name-a">{giftModels[c.kind].name} <span aria-hidden="true">→</span></Link></h3>)}
          </div>
          <div className="lx-cmpt-top">
            {cols.map((c) => (
              <div key={c.kind} className="lx-cmpt-intro">
                <div className="lx-cmpt-img"><img src={c.img} alt={c.alt} width={c.w} height={c.h} loading="lazy" decoding="async" /></div>
                {/* Nút là tín hiệu ưu tiên duy nhất còn lại: Độc Bản dùng nút đỏ đặc, Sẵn Trao nút viền */}
                {c.kind === 'ready'
                  ? <Link href="/set-san" className="lx-btn lx-btn-line">Xem Sẵn Trao</Link>
                  : <ZaloLink className="lx-btn lx-btn-red"><span className="lx-cmpt-lg">Nhận tư vấn thiết kế</span><span className="lx-cmpt-sm">Nhận tư vấn</span></ZaloLink>}
              </div>
            ))}
          </div>
          {cmpRows.map(([label, a, b]) => (
            <CmpRow key={label} label={label}>
              <div role="cell" className="lx-cmpt-cell"><CmpValue cell={a} /></div>
              <div role="cell" className="lx-cmpt-cell"><CmpValue cell={b} /></div>
            </CmpRow>
          ))}
          <CmpRow label="Quy trình">
            {cols.map((c) => (
              <div key={c.kind} role="cell" className="lx-cmpt-cell">
                {/* Bấm "N bước +" để xổ quy trình của riêng bên đó */}
                <button type="button" className="lx-cmpt-more" aria-expanded={open[c.kind]} aria-controls={`lx-cmpt-steps-${c.kind}`} onClick={() => setOpen((o) => ({ ...o, [c.kind]: !o[c.kind] }))}>
                  <span className="lx-cmpt-val">{giftProcesses[c.kind].steps.length} bước</span>
                  <span className="lx-cmpt-pm" aria-hidden="true">{open[c.kind] ? '−' : '+'}</span>
                  <span className="sr-only">{open[c.kind] ? 'Thu gọn quy trình' : 'Xem quy trình'} {giftModels[c.kind].name}</span>
                </button>
              </div>
            ))}
            {/* Các bước hai bên nằm chung một lưới: bước 1 cùng hàng bước 1, bước 2 cùng hàng bước 2 */}
            <div className="lx-cmpt-flow">
              {cols.map((c, col) => (
                <ol key={c.kind} id={`lx-cmpt-steps-${c.kind}`} aria-label={`Quy trình ${giftModels[c.kind].name}`}>
                  {giftProcesses[c.kind].steps.map(([t, d], i) => (
                    <li key={t} className="lx-cmpt-li" data-open={open[c.kind]} style={{ gridColumn: col + 1, gridRow: i + 1 }}>
                      <div className="lx-cmpt-li-in" inert={!open[c.kind] || undefined}>
                        <div className="lx-cmp-step">
                          <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                          <div><p className="lx-cmp-step-t">{t}</p><p className="lx-cmp-step-d">{d}</p></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ))}
            </div>
          </CmpRow>
        </div>
      </div>
    </section>
  );
}

function Moment() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const shift = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        node.style.transform = `translateY(${((shift - 0.5) * -30).toFixed(1)}px)`;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [reduced]);
  return (
    <section className="lx-moment" id="khoanh-khac" aria-labelledby="lx-moment-title">
      <div className="lx-wrap lx-moment-grid">
        <div className="lx-moment-img"><div ref={ref} className="lx-moment-art">{/* Video lặp không tiếng (bản 2, làm chậm cho mượt, nối vòng bằng mờ chuyển): hai tay trao và hai tay nhận hộp quà BOND */}<video poster="/assets/moment/trao-qua-poster.jpg" width={1280} height={956} autoPlay muted loop playsInline disablePictureInPicture disableRemotePlayback preload="metadata" aria-label="Hai tay trao hộp quà BOND, hai tay khác đón nhận"><source src="/assets/moment/trao-qua.webm" type="video/webm" /><source src="/assets/moment/trao-qua.mp4" type="video/mp4" /></video></div></div>
        <Reveal className="lx-moment-txt">
          <p className="lx-eyebrow">Khoảnh khắc trao quà</p>
          <h2 id="lx-moment-title"><span className="lx-l">Món quà Tết không được nhớ vì giá.</span> <span className="lx-l">Nó được nhớ vì người nhận</span> <em className="lx-serif lx-l">cảm thấy mình được trân quý.</em></h2>
          <p>Đó là lý do BOND bắt đầu từ câu hỏi người nhận là ai, rồi mới đến chất liệu, cách hộp mở ra và những gì đặt bên trong.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    // Link cũ dạng /#set-san, /#set-doc-ban, /#quy-trinh: chuyển sang trang riêng
    const moved: Record<string, string> = { 'set-san': '/set-san', 'set-doc-ban': '/set-doc-ban', 'quy-trinh': '/quy-trinh', 'quy-trinh-buoc': '/quy-trinh' };
    if (moved[id]) { window.location.replace(moved[id]); return; }
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <SiteShell>
      <div className="lx">
        <Hero />
        <LogoStrip />
        <Models />
        <Moment />
        <TetCta />
      </div>
    </SiteShell>
  );
}
