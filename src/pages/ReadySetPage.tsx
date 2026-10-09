import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { giftModels, giftProcesses, pendingSpec, readySets, type ReadySet } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { usePrefersReducedMotion } from '@/hooks/use-in-view';
import { clamp01, useScrollFx } from '@/hooks/use-scroll-fx';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { SetArt } from '@/components/bond/GiftArt';
import { NotFoundPage } from '@/pages/UtilityPages';

const pad = (n: number) => String(n).padStart(2, '0');

/* Ảnh thật chưa có: mỗi ô giữ chỗ ghi rõ cần chụp gì. */
const galleryShots = ['Hộp đóng, góc 3/4', 'Hộp mở, thấy toàn bộ ruột', 'Cận vị trí logo trên nắp'];

function SpecList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="lx-sd-specs">
      {rows.map(([k, v]) => (
        <div key={k} className="lx-cmp-row">
          <dt>{k}</dt>
          <dd className={v === pendingSpec ? 'is-pending' : undefined}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Popup phóng to ảnh: Esc hoặc bấm nền để đóng, phím trái phải để chuyển ảnh. */
function Lightbox({ set, index, onClose, onMove }: { set: ReadySet; index: number; onClose: () => void; onMove: (step: number) => void }) {
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
  return (
    <div className="lx-lb" role="dialog" aria-modal="true" aria-label={`Ảnh ${set.name}`} onClick={onClose}>
      <figure className="lx-lb-fig" onClick={(e) => e.stopPropagation()}>
        <div className="lx-lb-img"><SetArt look={set.look} /></div>
        <figcaption>{pad(index + 1)} / {pad(galleryShots.length)} · {galleryShots[index]} · ảnh {pendingSpec.toLowerCase()}</figcaption>
      </figure>
      <button ref={closeRef} type="button" className="lx-lb-btn lx-lb-close" onClick={onClose} aria-label="Đóng">×</button>
      <button type="button" className="lx-lb-btn lx-lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label="Ảnh trước">←</button>
      <button type="button" className="lx-lb-btn lx-lb-next" onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label="Ảnh sau">→</button>
    </div>
  );
}

/** Trang chi tiết một set sẵn: /set-san/:slug. Thông số chưa có số liệu thật hiển thị "Đang cập nhật". */
export function ReadySetPage() {
  const [, params] = useRoute('/set-san/:slug');
  const [shot, setShot] = useState<number | null>(null);
  const set = readySets.find((s) => s.slug === params?.slug);
  const reduced = usePrefersReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLOListElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  // Chuyển động bám theo thanh cuộn: cuộn ngược thì chạy ngược, không lặp lại kiểu "hiện dần".
  useScrollFx(() => {
    const vh = window.innerHeight;
    // Ảnh đứng yên bên trái (máy tính); đọc tới khối logo thì ảnh chuyển sang cận logo trên nắp.
    const logo = logoRef.current;
    if (logo && mediaRef.current) mediaRef.current.classList.toggle('is-alt', window.innerWidth > 1024 && logo.getBoundingClientRect().top < vh * 0.75);
    // Bộ 3 ảnh trôi ngang: hai ảnh bên ngược chiều nhau, ảnh giữa chậm hơn.
    const shots = shotsRef.current;
    if (shots) {
      const r = shots.getBoundingClientRect();
      const t = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      shots.querySelectorAll<HTMLElement>('.lx-sd-shot-layer').forEach((el, i) => {
        el.style.transform = `translate3d(${([-1, 0.35, 1][i] * t * 26).toFixed(1)}px, 0, 0)`;
      });
    }
    // Trong hộp có gì: món nằm gần giữa màn hình nhất được làm nổi, các món khác nhạt đi.
    const list = itemsRef.current;
    if (list) {
      const r = list.getBoundingClientRect();
      const active = r.top < vh * 0.5 && r.bottom > vh * 0.5;
      list.classList.toggle('is-active', active);
      let best: Element | null = null;
      let bestD = Infinity;
      for (const li of list.children) {
        const b = li.getBoundingClientRect();
        const dist = Math.abs(b.top + b.height / 2 - vh * 0.5);
        if (dist < bestD) { bestD = dist; best = li; }
      }
      for (const li of list.children) li.classList.toggle('is-focus', active && li === best);
    }
    // Quy trình: đường dọc đổ đỏ theo thanh cuộn, chạm bước nào thì bước đó sáng lên.
    const steps = stepsRef.current;
    if (steps) {
      const r = steps.getBoundingClientRect();
      const p = clamp01((vh * 0.6 - r.top) / r.height);
      steps.style.setProperty('--p', p.toFixed(4));
      for (const li of steps.querySelectorAll<HTMLElement>('.lx-sd-item')) li.classList.toggle('is-lit', li.offsetTop + 28 <= p * r.height);
    }
  }, !reduced, [params?.slug]);

  const close = useCallback(() => setShot(null), []);
  const move = useCallback((step: number) => setShot((i) => (i === null ? i : (i + step + galleryShots.length) % galleryShots.length)), []);
  if (!set) return <NotFoundPage />;
  // Mỗi món một dòng nên viết hoa chữ đầu dòng; trong câu mô tả vẫn giữ chữ thường.
  const items = set.contents.split(' + ').map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  const others = readySets.filter((s) => s.slug !== set.slug);
  const steps = giftProcesses.ready.steps;
  const [time, moq] = giftModels.ready.specs;

  return (
    <SiteShell>
      <div key={set.slug} className="lx lx-sd">
        {/* 1. Phần đầu trang: ảnh, tên, giá, thông số, logo, nút chính */}
        <section className="lx-sd-hero" aria-labelledby="lx-sd-title">
          <div className="lx-wrap">
            <nav className="lx-sd-crumb" aria-label="Đường dẫn">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#set-san">Set sẵn</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{set.name}</span>
            </nav>
            <div className="lx-sd-hero-grid">
              <div ref={mediaRef} className="lx-sd-media">
                <span className="lx-sd-media-main"><SetArt look={set.look} /></span>
                <span className="lx-sd-media-alt" aria-hidden="true"><SetArt look={set.look} /></span>
                <span className="lx-sd-media-cap" aria-hidden="true">Cận logo trên nắp</span>
              </div>
              <div className="lx-sd-intro">
                <p className="lx-eyebrow">Set sẵn</p>
                <h1 id="lx-sd-title">{set.name}</h1>
                <p className="lx-sd-price">{set.price}</p>
                <p className="lx-lead">{set.contents}</p>
                <SpecList rows={[time, moq, ['Kích thước hộp', pendingSpec], ['Trọng lượng', pendingSpec], ['Hạn sử dụng', pendingSpec]]} />
                <div ref={logoRef} className="lx-sd-logo">
                  <h2 className="lx-sd-logo-t">Logo của anh chị</h2>
                  <p>Logo được ép kim ở giữa nắp hộp và mặt trước thiệp. Anh chị gửi file logo dạng vector (AI, PDF hoặc SVG). BOND gửi maket để anh chị duyệt trước khi sản xuất.</p>
                </div>
                <div className="lx-sd-actions">
                  <ZaloLink className="lx-btn lx-btn-red">Tư vấn qua Zalo</ZaloLink>
                  <Link href="/#quy-trinh" className="lx-sd-textlink">Xem quy trình <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Bộ ảnh, bấm để phóng to */}
        <section className="lx-sd-gallery" aria-label={`Hình ảnh ${set.name}`}>
          <div ref={shotsRef} className="lx-wrap lx-sd-shots">
            {galleryShots.map((label, i) => (
              <button key={label} type="button" className="lx-sd-shot" onClick={() => setShot(i)} aria-label={`Phóng to ảnh: ${label}`}>
                <span className="lx-sd-shot-img"><span className="lx-sd-shot-layer"><SetArt look={set.look} /></span></span>
                <span className="lx-sd-shot-cap">{label} · ảnh {pendingSpec.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Trong hộp có gì */}
        <section className="lx-sec lx-sd-sec" aria-labelledby="lx-sd-in">
          <div className="lx-wrap lx-sd-split">
            <div className="lx-sd-side">
              <p className="lx-eyebrow">Thành phần</p>
              <h2 id="lx-sd-in">Trong hộp có gì</h2>
              <p className="lx-sd-note">Có thể đổi món theo menu sẵn có của BOND.</p>
            </div>
            <ol ref={itemsRef} className="lx-sd-items">
              {items.map((item, i) => (
                <li key={item} className="lx-sd-item">
                  <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                  <div>
                    <p className="lx-sd-item-t">{item}</p>
                    <p className="lx-sd-item-d">Dung tích / khối lượng: <span className="is-pending">{pendingSpec}</span> · Xuất xứ: <span className="is-pending">{pendingSpec}</span></p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Thông số hộp và thông tin đặt hàng */}
        <section className="lx-sec lx-sd-sec lx-sd-soft" aria-label="Thông số hộp và thông tin đặt hàng">
          <div className="lx-wrap lx-sd-pair">
            <div>
              <h2 className="lx-sd-h">Thông số hộp</h2>
              <SpecList rows={[['Kích thước', pendingSpec], ['Trọng lượng cả set', pendingSpec], ['Chất liệu', pendingSpec], ['Màu sắc', pendingSpec]]} />
            </div>
            <div>
              <h2 className="lx-sd-h">Thông tin đặt hàng</h2>
              <SpecList rows={[['Giá', set.price], ['VAT', pendingSpec], moq, time, ['Giao hàng', 'Một điểm hoặc nhiều điểm theo danh sách người nhận']]} />
            </div>
          </div>
        </section>

        {/* 5. Quy trình */}
        <section className="lx-sec lx-sd-sec" aria-labelledby="lx-sd-steps">
          <div className="lx-wrap lx-sd-split">
            <div className="lx-sd-side">
              <p className="lx-eyebrow">Khoảng 2 tuần</p>
              <h2 id="lx-sd-steps">Quy trình {steps.length} bước</h2>
            </div>
            <ol ref={stepsRef} className="lx-sd-steps">
              {steps.map(([t, desc], i) => (
                <li key={t} className="lx-sd-item">
                  <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                  <div><p className="lx-sd-item-t">{t}</p><p className="lx-sd-item-d">{desc}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Các set còn lại */}
        <section className="lx-sec lx-sd-sec lx-sd-soft lx-sd-more" aria-labelledby="lx-sd-more">
          <div className="lx-wrap">
            <h2 id="lx-sd-more" className="lx-sd-h">Các set khác</h2>
            <div className="lx-sd-others">
              {others.map((o, i) => (
                <Link key={o.slug} href={`/set-san/${o.slug}`} className="lx-sd-other">
                  <span className="lx-sd-other-img"><SetArt look={o.look} /></span>
                  <span className="lx-sd-other-txt">
                    <span className="lx-sd-other-name">{o.name}</span>
                    <span className="lx-sd-other-price">{o.price}</span>
                  </span>
                  <span className="lx-sd-other-go" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Liên hệ */}
        <section className="lx-cta" aria-labelledby="lx-sd-cta">
          <div className="lx-wrap">
            <h2 id="lx-sd-cta">Đặt set {set.name}<br />cho doanh nghiệp của bạn.</h2>
            <p>Từ 10 set, khoảng 2 tuần từ khi chốt đến khi giao. BOND gửi maket in logo để anh chị duyệt trước khi sản xuất.</p>
            <div><ZaloLink className="lx-btn lx-btn-white">Tư vấn qua Zalo</ZaloLink></div>
          </div>
        </section>

        {shot !== null && <Lightbox set={set} index={shot} onClose={close} onMove={move} />}
      </div>
    </SiteShell>
  );
}
