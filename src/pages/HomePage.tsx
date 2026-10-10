import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { Link } from 'wouter';
import { bespokeTiers, clientLogos, giftModels, giftProcesses, readySets } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { MomentArt, SetArt } from '@/components/bond/GiftArt';
import { useInView, usePrefersReducedMotion } from '@/hooks/use-in-view';

/* Trang chủ editorial: hero hai pha, hai mô hình quà, set sẵn, set độc bản, khoảnh khắc Tết, quy trình. */

const TET = new Date('2027-02-06T00:00:00+07:00');
const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');
const ArrowUp = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" /></svg>;
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
    <div className="lx-cd" role="timer" aria-label={`Còn ${cd.m} tháng ${cd.d} ngày đến Tết Đinh Mùi 2027`}>
      {([[cd.m, 'Tháng'], [cd.d, 'Ngày'], [cd.h, 'Giờ'], [cd.min, 'Phút'], [cd.s, 'Giây']] as [number, string][]).map(([v, label], i) => (
        <div key={label} className="lx-cd-group" aria-hidden="true">
          {i > 0 && <span className="lx-cd-sep" />}
          <span className="lx-cd-unit"><span className="lx-cd-num">{pad(v)}</span><span className="lx-cd-lab">{label}</span></span>
        </div>
      ))}
    </div>
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
        {/* Khung lưới lấy từ logo: đường kẻ dưới menu, hai đường dọc ở mép khung nội dung, dấu chữ thập tại điểm giao */}
        <div className="lx-frame" aria-hidden="true">
          <span className="lx-frame-rule" />
          <span className="lx-frame-col"><i className="lx-cross lx-frame-cross lx-frame-cross-l" /><i className="lx-cross lx-frame-cross lx-frame-cross-r" /></span>
        </div>
        {/* Mũi tên cuộn: nét 1px ở khoảng trống góc dưới bên trái, nổi trên ảnh */}
        <span className="lx-scroll-cue" aria-hidden="true"><i /></span>
        <div className="lx-hero-in">
          <div className="lx-hero-p1" style={{ pointerEvents: phase2 ? 'none' : undefined }}>
            <p className="lx-eyebrow">Quà Tết doanh nghiệp · Đinh Mùi 2027</p>
            <h1 id="lx-hero-title" className="lx-hero-title">Relationships, <em className="lx-serif">compounded.</em></h1>
            <p className="lx-hero-sub">Mối quan hệ, được nhân lên theo thời gian.</p>
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
            <a href="#set-san" className="lx-btn lx-btn-red" tabIndex={phase2 ? undefined : -1}><span>Khám phá bộ sưu tập</span><ArrowDown /></a>
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
      <div className="lx-logos-frame" aria-hidden="true"><i className="lx-cross" /><i className="lx-cross" /><i className="lx-cross" /><i className="lx-cross" /></div>
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
      <p className="lx-logos-note">Bao gồm dự án nhận diện thương hiệu bởi ZAD và sản xuất quà tặng độc bản bởi BOND.</p>
    </section>
  );
}

/** Một ô giá trị trong bảng so sánh: full là chữ đầy đủ, short là bản rút gọn hiện dưới 480px. null là "không có". */
type CmpCell = { full: string; short?: string; big?: boolean; sub?: string } | null;
const cmpRows: [string, CmpCell, CmpCell][] = [
  ['Thời gian hoàn thành', { full: '2 tuần', big: true, sub: 'từ lúc chốt mẫu' }, { full: '8 tuần', big: true, sub: 'từ brief đến giao hàng' }],
  ['Số lượng tối thiểu', { full: '10 set', big: true }, { full: 'Theo dự án' }],
  ['Kịp đặt sau 15 tháng 12', { full: 'Có' }, null],
  ['Xem mẫu trước khi đặt', { full: 'Mẫu thật, xem ngay' }, { full: 'Sau khi duyệt thiết kế' }],
  ['Thiết kế bao bì', { full: 'Gắn logo lên mẫu có sẵn' }, { full: 'Thiết kế từ đầu theo nhận diện', short: 'Thiết kế từ đầu' }],
  ['Kết cấu hộp riêng', null, { full: 'Thiết kế theo yêu cầu' }],
  ['Chọn chất liệu và gia công', { full: 'Theo mẫu' }, { full: 'Tự chọn' }],
  ['Ruột quà', { full: 'Theo cấu hình có sẵn', short: 'Cấu hình sẵn' }, { full: 'Tuyển chọn theo yêu cầu' }],
  ['Nếm thử trước khi chốt', null, { full: 'Có' }],
  ['Độc quyền thiết kế', null, { full: 'Mẫu không dùng cho khách khác', short: 'Độc quyền' }],
];

function CmpValue({ cell }: { cell: CmpCell }) {
  if (!cell) return <span className="lx-cmpt-none" aria-label="Không có">—</span>;
  const text = cell.short
    ? <><span className="lx-cmpt-lg">{cell.full}</span><span className="lx-cmpt-sm">{cell.short}</span></>
    : cell.full;
  return (
    <>
      <span className={cell.big ? 'lx-cmpt-big' : 'lx-cmpt-val'}>{text}</span>
      {cell.sub && <span className="lx-cmpt-sub">{cell.sub}</span>}
    </>
  );
}

/** Một dòng so sánh: nhãn chiếm cả hàng, hai giá trị bên dưới luôn thẳng hàng. Hiện dần một lần khi cuộn tới. */
function CmpRow({ label, children }: { label: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2, once: true, rootMargin: '0px 0px -6% 0px' });
  return (
    <div ref={ref} role="row" className={`lx-cmpt-row${inView ? ' is-in' : ''}`}>
      <div role="rowheader" className="lx-cmpt-label">{label}</div>
      {children}
    </div>
  );
}

/**
 * Hai cách đặt quà, trình bày kiểu bảng so sánh của Apple: không card, không nền, chỉ đường kẻ ngang 1px.
 * Tên hai cột dính trên đầu khi cuộn; chỗ không có ghi dấu "—".
 */
function Models() {
  const [open, setOpen] = useState(false);
  const cols = [
    { kind: 'ready' as const, img: '/assets/models/set-san.webp', alt: 'Set quà Tết hộp đỏ họa tiết tùng bày trên bàn tiệc', href: '#set-san', cta: 'Xem Set sẵn', btn: 'lx-btn-red' },
    { kind: 'bespoke' as const, img: '/assets/models/set-doc-ban.webp', alt: 'Hộp quà độc bản họa tiết hoa xanh ngọc in logo doanh nghiệp', href: '#set-doc-ban', cta: 'Xem hướng thiết kế', btn: 'lx-btn-line' },
  ];
  return (
    <section className="lx-sec lx-cmp" id="quy-trinh" aria-labelledby="lx-cmp-title">
      <div className="lx-wrap">
        <Reveal className="lx-cmp-head">
          <p className="lx-eyebrow">Hai cách đặt quà</p>
          <h2 id="lx-cmp-title">Hai cách để BOND làm quà<br />cho thương hiệu của bạn</h2>
          <p className="lx-lead">Cùng một đội ngũ, cùng một chuẩn hoàn thiện. Khác nhau ở mức độ bạn muốn món quà mang dấu ấn riêng đến đâu.</p>
        </Reveal>
        <div className="lx-cmpt" role="table" aria-label="So sánh Set sẵn và Set độc bản">
          <div className="lx-cmpt-head" role="row">
            {cols.map((c) => <h3 key={c.kind} role="columnheader" className="lx-cmpt-name">{giftModels[c.kind].name}</h3>)}
          </div>
          <div className="lx-cmpt-top">
            {cols.map((c) => (
              <div key={c.kind} className="lx-cmpt-intro">
                <div className="lx-cmpt-img"><img src={c.img} alt={c.alt} width={1200} height={805} loading="lazy" decoding="async" /></div>
                <p className="lx-cmpt-say">{giftModels[c.kind].say}</p>
                <a href={c.href} className={`lx-btn ${c.btn}`}>{c.cta}</a>
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
            {cols.map((c) => {
              const proc = giftProcesses[c.kind];
              return (
                <div key={c.kind} role="cell" className="lx-cmpt-cell">
                  <span className="lx-cmpt-val">{proc.steps.length} bước</span>
                  <div className="lx-cmpt-steps" id={`lx-cmpt-steps-${c.kind}`} data-open={open}>
                    <div className="lx-cmpt-steps-in" inert={!open || undefined}>
                      {proc.note && <p className="lx-cmpt-note">{proc.note}</p>}
                      <ol>
                        {proc.steps.map(([t, d], i) => (
                          <li key={t} className="lx-cmp-step">
                            <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                            <div><p className="lx-cmp-step-t">{t}</p><p className="lx-cmp-step-d">{d}</p></div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              );
            })}
            <button type="button" className="lx-cmpt-toggle" aria-expanded={open} aria-controls="lx-cmpt-steps-ready lx-cmpt-steps-bespoke" onClick={() => setOpen(!open)}>
              {open ? 'Thu gọn các bước' : 'Xem các bước'} <span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
          </CmpRow>
        </div>
      </div>
    </section>
  );
}

function ReadySets() {
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

  // Rê chuột: hộp quà nghiêng nhẹ theo con trỏ, tối đa khoảng 4 độ.
  const tilt = (e: RPointerEvent<HTMLAnchorElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
  };
  const untilt = (e: RPointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  return (
    <section className="lx-sec lx-ready" id="set-san" aria-labelledby="lx-ready-title">
      <div className="lx-wrap lx-wrap-wide">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">Mô hình 01</p>
            <h2 id="lx-ready-title">Set sẵn</h2>
          </div>
          <p className="lx-lead">Giao trong hai tuần. Logo thương hiệu của anh chị được ép kim lên hộp và thiệp. Không cần thiết kế lại từ đầu.</p>
        </Reveal>
        <div ref={gridRef} className="lx-cards lx-stair">
          {readySets.map((set) => (
            <Link key={set.slug} href={`/set-san/${set.slug}`} className="lx-card" onPointerMove={tilt} onPointerLeave={untilt}>
              <div className="lx-card-img">
                <span className="lx-card-box"><SetArt look={set.look} /></span>
              </div>
              <h3 className="lx-card-name">{set.name}</h3>
              <p className="lx-card-price">{set.price}</p>
              <p className="lx-card-in">{set.contents}</p>
              <span className="lx-card-more">Xem chi tiết <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bespoke() {
  return (
    <section className="lx-sec lx-custom" id="set-doc-ban" aria-labelledby="lx-custom-title">
      <div className="lx-wrap">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">Mô hình 02</p>
            <h2 id="lx-custom-title">Set độc bản</h2>
            <div className="lx-disc">
              <span className="lx-cross" aria-hidden="true" />
              <p>Mỗi mẫu dưới đây là một hướng thiết kế để bắt đầu. BOND và ZAD sẽ phát triển kết cấu hộp và trải nghiệm mở hộp riêng cho thương hiệu của anh chị, không dùng lại cho bất kỳ khách nào khác.</p>
            </div>
          </div>
          <p className="lx-lead">Chọn mức ngân sách của anh chị để xem các hướng thiết kế tương ứng.</p>
        </Reveal>
        <Reveal className="lx-bud">
          {bespokeTiers.map((b, i) => (
            <Link key={b.slug} href={`/set-doc-ban/${b.slug}`} className="lx-bud-row">
              <span className="lx-bud-no">{pad(i + 1)}</span>
              <span className="lx-bud-thumb" aria-hidden="true">{b.thumb && <img src={b.thumb} alt="" width={120} height={150} loading="lazy" decoding="async" />}</span>
              <span className="lx-bud-money">{b.money} <small>ngân sách / set</small></span>
              <span className="lx-bud-meta">{b.meta}</span>
              <span className="lx-bud-go">Xem mẫu <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </Reveal>
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
        <div className="lx-moment-img"><div ref={ref} className="lx-moment-art"><MomentArt /></div></div>
        <Reveal className="lx-moment-txt">
          <p className="lx-eyebrow">Khoảnh khắc trao quà</p>
          <h2 id="lx-moment-title">Món quà Tết không được nhớ vì giá.<br />Nó được nhớ vì người nhận<br /><em className="lx-serif">cảm thấy mình được trân quý.</em></h2>
          <p>Đó là lý do BOND bắt đầu từ câu hỏi người nhận là ai, rồi mới đến chất liệu, cách hộp mở ra và những gì đặt bên trong.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="lx-cta" aria-labelledby="lx-cta-title">
      <div className="lx-wrap">
        <Reveal><h2 id="lx-cta-title">Bây giờ là lúc bắt đầu.</h2></Reveal>
        <Reveal delay={1}><p>Tết Đinh Mùi rơi vào ngày 6 tháng 2 năm 2027. Set độc bản cần khoảng 8 tuần, trong đó anh chị được duyệt mẫu thật và nếm thử trước khi sản xuất.</p></Reveal>
        <Reveal delay={2}><ZaloLink className="lx-btn lx-btn-white"><span>Tư vấn qua Zalo</span><ArrowUp /></ZaloLink></Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <SiteShell>
      <div className="lx">
        <Hero />
        <LogoStrip />
        <Models />
        <ReadySets />
        <Bespoke />
        <Moment />
        <Cta />
      </div>
    </SiteShell>
  );
}
