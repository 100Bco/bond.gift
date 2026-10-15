import { useCallback, useState, type CSSProperties, type MouseEvent } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Link, useRoute } from 'wouter';
import { bespokeTiers, giftModels, orderTerms, pendingSpec, type BespokeCollection, type BespokeImage } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { Lightbox } from '@/components/bond/Lightbox';
import { NotFoundPage } from '@/pages/UtilityPages';
import { SpecList } from '@/pages/ReadySetPage';
import { ProcessLink, ProcessSteps } from '@/components/bond/ProcessSteps';
import { SetGallery } from '@/components/bond/SetGallery';

const pad = (n: number) => String(n).padStart(2, '0');
/** Cuộn mượt tới bộ sưu tập trong cùng trang, không thêm # vào đường dẫn. */
const jump = (e: MouseEvent<HTMLAnchorElement>) => {
  const el = document.getElementById(e.currentTarget.hash.slice(1));
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
};

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
    <section id={`bst-${no}`} className="lx-bp-col" aria-labelledby={`lx-bp-col-${no}`}>
      <div className="lx-bp-col-head">
        <p className="lx-eyebrow">{unit} {pad(no)}</p>
        <h2 id={`lx-bp-col-${no}`}>{col.name}</h2>
      </div>
      <div ref={ref} className={`lx-bp-reveal${inView ? ' is-in' : ''}`}>
        <div className={col.colorways ? 'lx-bp-solo' : undefined}>
          <div className={col.cover ? 'lx-bp-grid' : col.items.length >= 4 ? 'lx-bp-row' : `lx-bp-pair lx-bp-pair-${col.items.length}`}>
            {col.cover && <Shot img={col.cover} i={0} className="lx-bp-cover" onOpen={() => setShot(at(col.cover!))} priority={first} />}
            <div className="lx-bp-items">
              {col.items.map((img, i) => <Shot key={img.src} img={img} i={i + 1} caption className="lx-bp-item" onOpen={() => setShot(at(img))} priority={first && !col.cover} />)}
            </div>
          </div>
          {/* Mẫu riêng chưa đủ ảnh: cột phải liệt kê đủ các phối màu, phối màu chưa có ảnh ghi rõ */}
          {col.colorways && (
            <aside className="lx-bp-swatches" aria-label={`Các phối màu của ${col.name}`}>
              <p className="lx-bp-sw-h">{col.colorways} phối màu</p>
              <ol>
                {Array.from({ length: col.colorways }, (_, i) => col.items[i]).map((img, i) => (
                  <li key={i}>
                    <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                    {img
                      ? <button type="button" onClick={() => setShot(at(img))}>{img.name}</button>
                      : <span className="is-pending">Ảnh {pendingSpec.toLowerCase()}</span>}
                  </li>
                ))}
              </ol>
            </aside>
          )}
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
  const [show, setShow] = useState(0);
  const [, params] = useRoute('/set-doc-ban/:slug');
  const tier = bespokeTiers.find((t) => t.slug === params?.slug);
  if (!tier) return <NotFoundPage />;
  const ready = tier.collections.filter((c) => c.items.length);
  const waiting = tier.collections.filter((c) => !c.items.length);
  const [, moq] = giftModels.bespoke.specs;
  const slides = ready.map((col) => ({ col, img: col.cover ?? col.items[0] }));
  const others = bespokeTiers.filter((t) => t.slug !== tier.slug);

  return (
    <SiteShell>
      <div key={tier.slug} className="lx lx-bp">
        <section className="lx-bp-hero" aria-labelledby="lx-bp-title">
          <div className="lx-wrap lx-wrap-wide">
            <nav className="lx-sd-crumb" aria-label="Đường dẫn">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/set-doc-ban">Set độc bản</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{tier.name}</span>
            </nav>
            <div className="lx-bp-hero-grid">
            <div className="lx-bp-hero-in">
              <p className="lx-eyebrow">Set độc bản</p>
              <h1 id="lx-bp-title">{tier.name} <span>{tier.money} / set</span></h1>
              <p className="lx-bp-meta">{tier.meta}</p>
              <SpecList rows={[['Thành phần', tier.contents], ['Hộp', tier.box], ['Túi', orderTerms.bag], moq, ['VAT và vận chuyển', orderTerms.vat], ['Thanh toán', orderTerms.pay]]} />
              <p className="lx-bp-note">Ngân sách tham khảo cho trọn bộ, gồm thiết kế riêng, bao bì và sản phẩm bên trong. Báo giá chính xác theo từng dự án.</p>
              <div className="lx-sd-actions">
                <ZaloLink className="lx-btn lx-btn-red">Tư vấn qua Zalo</ZaloLink>
                <ProcessLink />
              </div>
            </div>

            {/* Khung ảnh đầu trang: mỗi ảnh là ảnh bìa một bộ đã có ảnh; dưới ảnh là tên bộ và link cuộn xuống bộ đó */}
            <div className="lx-bp-show">
              <div className="lx-bp-show-media">
                <SetGallery key={tier.slug} name={tier.name} images={slides.length ? slides.map((c) => c.img.src) : [tier.cover]} labels={slides.length ? slides.map((c) => c.col.name ?? tier.unit) : ['Ảnh tạm']} positions={slides.length ? slides.map((c) => c.img.pos) : [tier.coverPos]} onChange={setShow} />
              </div>
              {slides[show] ? (
                <div className="lx-bp-show-cap">
                  <span className="lx-cmp-step-n">{pad(show + 1)}</span>
                  <span className="lx-bp-show-name">{slides[show].col.name}</span>
                  <span className="lx-bp-show-d">{slides[show].col.colorways ?? slides[show].col.items.length} phối màu</span>
                  <a href={`#bst-${show + 1}`} onClick={jump} className="lx-sd-textlink">Xem bộ này <span aria-hidden="true">↓</span></a>
                </div>
              ) : <p className="lx-bp-show-cap is-pending">Ảnh các {tier.unit.toLowerCase()} đang cập nhật</p>}
            </div>
            </div>
          </div>
        </section>

        <div className="lx-wrap lx-wrap-wide lx-bp-body">
          {ready.map((col, i) => <Collection key={col.name} col={col} no={i + 1} unit={tier.unit} first={i === 0} />)}

          {waiting.length > 0 && (
            <ol className="lx-bp-waiting" start={ready.length + 1} aria-label={`${tier.unit} chưa có ảnh`}>
              {waiting.map((col, i) => (
                <li key={i} id={`bst-${ready.length + i + 1}`} className="lx-bp-wait">
                  <span className="lx-cmp-step-n">{pad(ready.length + i + 1)}</span>
                  <span>{col.name ? `${tier.unit} ${col.name}` : tier.unit}</span>
                  <span className="is-pending">Ảnh {pendingSpec.toLowerCase()}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <ProcessSteps kind="bespoke" eyebrow="Khoảng 8 tuần" />

        {/* Các mức khác: thẻ ảnh giống "Các set khác" bên trang Set sẵn */}
        <section className="lx-sec lx-sd-sec lx-sd-soft lx-sd-more" aria-labelledby="lx-bp-more">
          <div className="lx-wrap">
            <h2 id="lx-bp-more" className="lx-sd-h">Các mức khác</h2>
            <div className="lx-sd-others">
              {others.map((o) => (
                <Link key={o.slug} href={`/set-doc-ban/${o.slug}`} className="lx-card">
                  <div className="lx-card-img">
                    <span className="lx-card-box"><img src={o.cover} alt={`${o.name}, ${o.money} mỗi set`} width={800} height={1000} loading="lazy" decoding="async" style={o.coverPos ? { objectPosition: o.coverPos } : undefined} /></span>
                    <span className="lx-peek" aria-hidden="true">→</span>
                  </div>
                  <h3 className="lx-card-name">{o.name}</h3>
                  <p className="lx-card-price">{o.money} / set</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="lx-cta" aria-labelledby="lx-bp-cta">
          <div className="lx-wrap">
            <Reveal><h2 id="lx-bp-cta">Chọn hướng thiết kế,<br />BOND làm riêng cho anh chị.</h2></Reveal>
            <Reveal delay={1}><p>Khoảng 8 tuần từ khi nhận yêu cầu đến giao hàng, có mẫu thật để duyệt và nếm thử trước khi sản xuất.</p></Reveal>
            <Reveal delay={2}><ZaloLink className="lx-btn lx-btn-white">Tư vấn qua Zalo</ZaloLink></Reveal>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
