import { useCallback, useState, type CSSProperties } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Link, useRoute } from 'wouter';
import { bespokeTiers, pendingSpec, type BespokeCollection, type BespokeImage } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { Lightbox } from '@/components/bond/Lightbox';
import { NotFoundPage } from '@/pages/UtilityPages';

const pad = (n: number) => String(n).padStart(2, '0');

function Shot({ img, className, onOpen, i, caption, priority }: { img: BespokeImage; className: string; onOpen: () => void; i: number; caption?: boolean; priority?: boolean }) {
  return (
    <figure className={`lx-bp-fig ${className}`} style={{ '--i': i } as CSSProperties}>
      <button type="button" className="lx-bp-shot" onClick={onOpen} aria-label={`Phóng to ảnh: ${img.name}`}>
        <img src={img.src} alt={img.alt} width={img.w ?? 1024} height={img.h ?? 1024} loading={priority ? 'eager' : 'lazy'} decoding="async" style={img.pos ? { objectPosition: img.pos } : undefined} />
      </button>
      {caption && <figcaption>{img.name}</figcaption>}
    </figure>
  );
}

/**
 * Một bộ sưu tập có ảnh. Có ảnh bìa (ảnh thiết kế hộp): bìa vuông lớn bên trái, 4 phối màu 2×2 bên phải.
 * Không có ảnh bìa: 4 phối màu xếp một hàng. Ảnh đời sống (scene) là dải mỏng phía dưới. Bấm ảnh để phóng to.
 * Ảnh hiện dần một lần khi cuộn tới, lệch nhau 0,06 giây.
 */
function Collection({ col, no, unit, first }: { col: BespokeCollection; no: number; unit: string; first: boolean }) {
  const [shot, setShot] = useState<number | null>(null);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12, once: true, rootMargin: '0px 0px -8% 0px' });
  const images = [col.cover, ...col.items, col.scene].filter(Boolean) as BespokeImage[];
  const close = useCallback(() => setShot(null), []);
  const move = useCallback((step: number) => setShot((i) => (i === null ? i : (i + step + images.length) % images.length)), [images.length]);
  const at = (img: BespokeImage) => images.indexOf(img);
  return (
    <section className="lx-bp-col" aria-labelledby={`lx-bp-col-${no}`}>
      <div className="lx-bp-col-head">
        <p className="lx-eyebrow">{unit} {pad(no)}</p>
        <h2 id={`lx-bp-col-${no}`}>{col.name}</h2>
      </div>
      <div ref={ref} className={`lx-bp-reveal${inView ? ' is-in' : ''}`}>
        <div className={col.cover ? 'lx-bp-grid' : col.items.length >= 4 ? 'lx-bp-row' : `lx-bp-pair lx-bp-pair-${col.items.length}`}>
          {col.cover && <Shot img={col.cover} i={0} className="lx-bp-cover" onOpen={() => setShot(at(col.cover!))} priority={first} />}
          <div className="lx-bp-items">
            {col.items.map((img, i) => <Shot key={img.src} img={img} i={i + 1} caption className="lx-bp-item" onOpen={() => setShot(at(img))} priority={first && !col.cover} />)}
          </div>
        </div>
        {col.scene && <Shot img={col.scene} i={col.items.length + 1} caption className="lx-bp-scene" onOpen={() => setShot(at(col.scene!))} />}
      </div>
      {shot !== null && (
        <Lightbox
          slides={images.map((img) => ({ caption: img === col.cover ? `Bộ sưu tập ${col.name}` : `${img.name} · ${col.name}`, label: `Ảnh ${col.name}`, content: <img src={img.src} alt={img.alt} /> }))}
          index={shot}
          onClose={close}
          onMove={move}
        />
      )}
    </section>
  );
}

/** Trang con một mức ngân sách Set độc bản: gom mọi bộ sưu tập của mức đó vào một trang, ít chữ. */
export function BespokePage() {
  const [, params] = useRoute('/set-doc-ban/:slug');
  const tier = bespokeTiers.find((t) => t.slug === params?.slug);
  if (!tier) return <NotFoundPage />;
  const ready = tier.collections.filter((c) => c.items.length);
  const waiting = tier.collections.length - ready.length;

  return (
    <SiteShell>
      <div key={tier.slug} className="lx lx-bp">
        <section className="lx-bp-hero" aria-labelledby="lx-bp-title">
          <div className="lx-wrap lx-wrap-wide">
            <nav className="lx-sd-crumb" aria-label="Đường dẫn">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#set-doc-ban">Set độc bản</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{tier.money}</span>
            </nav>
            <div className="lx-bp-hero-in">
              <p className="lx-eyebrow">Mô hình 02</p>
              <h1 id="lx-bp-title">Set độc bản <span>ngân sách {tier.money} mỗi set</span></h1>
              <p className="lx-bp-meta">{tier.meta}</p>
              <nav className="lx-bp-tiers" aria-label="Các mức ngân sách">
                {bespokeTiers.map((t) => (
                  <Link key={t.slug} href={`/set-doc-ban/${t.slug}`} className={t.slug === tier.slug ? 'is-current' : undefined} aria-current={t.slug === tier.slug ? 'page' : undefined}>{t.money}</Link>
                ))}
              </nav>
              <p className="lx-bp-note">Ngân sách tham khảo cho trọn bộ, gồm thiết kế riêng, bao bì và sản phẩm bên trong. Sản lượng tối thiểu và báo giá chính xác theo từng dự án.</p>
              <div className="lx-sd-actions">
                <ZaloLink className="lx-btn lx-btn-red">Tư vấn qua Zalo</ZaloLink>
                <Link href="/#quy-trinh" className="lx-sd-textlink">Xem quy trình <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>

        <div className="lx-wrap lx-wrap-wide lx-bp-body">
          {ready.map((col, i) => <Collection key={col.name} col={col} no={i + 1} unit={tier.unit} first={i === 0} />)}

          {waiting > 0 && (
            <ol className="lx-bp-waiting" start={ready.length + 1} aria-label={`${tier.unit} chưa có ảnh`}>
              {Array.from({ length: waiting }, (_, i) => (
                <li key={i} className="lx-bp-wait">
                  <span className="lx-cmp-step-n">{pad(ready.length + i + 1)}</span>
                  <span>{tier.unit}</span>
                  <span className="is-pending">Ảnh {pendingSpec.toLowerCase()}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <section className="lx-cta" aria-labelledby="lx-bp-cta">
          <div className="lx-wrap">
            <Reveal><h2 id="lx-bp-cta">Chọn hướng thiết kế,<br />BOND làm riêng cho bạn.</h2></Reveal>
            <Reveal delay={1}><p>Khoảng 8 tuần từ brief đến giao hàng, có mẫu thật để duyệt và nếm thử trước khi sản xuất.</p></Reveal>
            <Reveal delay={2}><ZaloLink className="lx-btn lx-btn-white">Tư vấn qua Zalo</ZaloLink></Reveal>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
