import { useRef } from 'react';
import { Link, useRoute } from 'wouter';
import { giftModels, orderTerms, pendingSpec, readySets } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { usePrefersReducedMotion } from '@/hooks/use-in-view';
import { useScrollFx } from '@/hooks/use-scroll-fx';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { NotFoundPage } from '@/pages/UtilityPages';
import { ProcessLink, ProcessSteps } from '@/components/bond/ProcessSteps';
import { SetGallery } from '@/components/bond/SetGallery';

const pad = (n: number) => String(n).padStart(2, '0');

export function SpecList({ rows }: { rows: [string, string][] }) {
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

/** Trang chi tiết một set sẵn: /set-san/:slug. Thông số chưa có số liệu thật hiển thị "Đang cập nhật". */
export function ReadySetPage() {
  const [, params] = useRoute('/set-san/:slug');
  const set = readySets.find((s) => s.slug === params?.slug);
  const reduced = usePrefersReducedMotion();
  const itemsRef = useRef<HTMLOListElement>(null);

  // Chuyển động bám theo thanh cuộn: cuộn ngược thì chạy ngược, không lặp lại kiểu "hiện dần".
  useScrollFx(() => {
    const vh = window.innerHeight;
    // Trong hộp có gì: số thứ tự đổi từ xám sang đỏ lần lượt khi món cuộn qua 70% chiều cao màn hình.
    const list = itemsRef.current;
    if (list) for (const li of list.children) li.classList.toggle('is-lit', li.getBoundingClientRect().top + 28 < vh * 0.7);
  }, !reduced, [params?.slug]);

  if (!set) return <NotFoundPage />;
  const others = readySets.filter((s) => s.slug !== set.slug);
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
              <Link href="/set-san">Sẵn Trao</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{set.name}</span>
            </nav>
            <div className="lx-sd-hero-grid">
              <div className="lx-sd-media">
                <SetGallery key={set.slug} name={set.name} images={[1, 2, 3].map((k) => `/assets/set-san/gallery/${set.slug}-${k}.webp`)} />
              </div>
              <div className="lx-sd-intro">
                <p className="lx-eyebrow">Sẵn Trao</p>
                <h1 id="lx-sd-title">{set.name}</h1>
                <p className="lx-sd-price">{set.price}</p>
                <p className="lx-lead">{set.desc}</p>
                <SpecList rows={[['Kích thước hộp', set.boxSize], moq, time]} />
                <div className="lx-sd-logo">
                  <p>Logo được in UV ở giữa nắp hộp.</p>
                  <p className="lx-sd-logo-gift">{orderTerms.readyGift}</p>
                </div>
                <div className="lx-sd-actions">
                  <ZaloLink className="lx-btn lx-btn-red">Tư vấn qua Zalo</ZaloLink>
                  <ProcessLink />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trong hộp có gì */}
        <section className="lx-sec lx-sd-sec" aria-labelledby="lx-sd-in">
          <div className="lx-wrap lx-sd-split">
            <div className="lx-sd-side">
              <p className="lx-eyebrow">Thành phần</p>
              <h2 id="lx-sd-in">Trong hộp có gì</h2>
              <p className="lx-sd-note">Có thể đổi món theo danh sách món sẵn có của BOND.</p>
            </div>
            <ol ref={itemsRef} className="lx-sd-items">
              {set.items.map((item, i) => (
                <li key={item.name} className="lx-sd-item">
                  <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                  <img className="lx-sd-item-img" src={`/assets/set-san/items/${set.slug}-${i + 1}.webp`} alt="" width={160} height={160} loading="lazy" decoding="async" />
                  <div>
                    <p className="lx-sd-item-t">{item.name}</p>
                    <p className="lx-sd-item-d">{item.qty.endsWith('ml') ? 'Dung tích' : 'Khối lượng'}: {item.qty}</p>
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
              <SpecList rows={[['Loại hộp', set.boxType], ['Túi', orderTerms.bag], ['Màu sắc', pendingSpec]]} />
            </div>
            <div>
              <h2 className="lx-sd-h">Thông tin đặt hàng</h2>
              <SpecList rows={[['Giá', set.price], ['VAT và vận chuyển', orderTerms.vat], ['Thanh toán', orderTerms.pay], ['Giao hàng', 'Một điểm hoặc nhiều điểm theo danh sách người nhận']]} />
            </div>
          </div>
        </section>

        {/* 5. Quy trình */}
        <ProcessSteps kind="ready" eyebrow="1-2 tuần" />

        {/* 6. Các set còn lại */}
        <section className="lx-sec lx-sd-sec lx-sd-soft lx-sd-more" aria-labelledby="lx-sd-more">
          <div className="lx-wrap">
            <h2 id="lx-sd-more" className="lx-sd-h">Các set khác</h2>
            <div className="lx-sd-others">
              {others.map((o) => (
                <Link key={o.slug} href={`/set-san/${o.slug}`} className="lx-card">
                  <div className="lx-card-img">
                    <span className="lx-card-box"><img src={o.photo} alt={`Sẵn Trao ${o.name}`} width={1200} height={1500} loading="lazy" decoding="async" /></span>
                    <span className="lx-peek" aria-hidden="true">→</span>
                  </div>
                  <h3 className="lx-card-name">{o.name}</h3>
                  <p className="lx-card-price">{o.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Liên hệ */}
        <section className="lx-cta" aria-labelledby="lx-sd-cta">
          <div className="lx-wrap">
            <h2 id="lx-sd-cta">Đặt set {set.name}<br />cho doanh nghiệp của anh chị.</h2>
            <p>Từ 10 set, 1-2 tuần từ khi chốt đến khi giao. BOND gửi maket in logo để anh chị duyệt trước khi sản xuất.</p>
            <div><ZaloLink className="lx-btn lx-btn-white">Tư vấn qua Zalo</ZaloLink></div>
          </div>
        </section>

      </div>
    </SiteShell>
  );
}
