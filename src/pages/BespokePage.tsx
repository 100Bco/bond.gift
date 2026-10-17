import { Link, useRoute } from 'wouter';
import { bespokeTiers, giftModels, orderTerms } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { NotFoundPage } from '@/pages/UtilityPages';
import { SpecList } from '@/pages/ReadySetPage';
import { ProcessLink, ProcessSteps } from '@/components/bond/ProcessSteps';
import { SetGallery } from '@/components/bond/SetGallery';

/** Trang con một thiết kế Độc Bản: /set-doc-ban/:slug, trình bày như trang chi tiết Sẵn Trao. */
export function BespokePage() {
  const [, params] = useRoute('/set-doc-ban/:slug');
  const tier = bespokeTiers.find((t) => t.slug === params?.slug);
  if (!tier) return <NotFoundPage />;
  const [time, moq] = giftModels.bespoke.specs;
  const others = bespokeTiers.filter((t) => t.slug !== tier.slug);

  return (
    <SiteShell>
      <div key={tier.slug} className="lx lx-sd">
        {/* 1. Phần đầu trang: 4 ảnh (không nhãn), tên, giá, thông số, nút chính */}
        <section className="lx-sd-hero" aria-labelledby="lx-sd-title">
          <div className="lx-wrap">
            <nav className="lx-sd-crumb" aria-label="Đường dẫn">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/set-doc-ban">Độc Bản</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{tier.name}</span>
            </nav>
            <div className="lx-sd-hero-grid">
              <div className="lx-sd-media">
                {tier.gallery.length > 0 && <SetGallery key={tier.slug} name={tier.name} images={tier.gallery} labels={tier.gallery.map((_, i) => `Ảnh ${i + 1}`)} />}
              </div>
              <div className="lx-sd-intro">
                <p className="lx-eyebrow">Độc Bản</p>
                <h1 id="lx-sd-title">{tier.name}</h1>
                <p className="lx-sd-price">{tier.money}</p>
                <SpecList rows={[['Thành phần', tier.contents], ['Kích thước hộp', tier.box], moq, time]} />
                <p className="lx-bp-note">Ngân sách tham khảo cho trọn bộ, gồm thiết kế riêng, bao bì và sản phẩm bên trong. Báo giá chính xác theo từng dự án.</p>
                <div className="lx-sd-actions">
                  <ZaloLink className="lx-btn lx-btn-red">Tư vấn qua Zalo</ZaloLink>
                  <ProcessLink />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Thông số hộp và thông tin đặt hàng */}
        <section className="lx-sec lx-sd-sec lx-sd-soft" aria-label="Thông số hộp và thông tin đặt hàng">
          <div className="lx-wrap lx-sd-pair">
            <div>
              <h2 className="lx-sd-h">Thông số hộp</h2>
              <SpecList rows={[['Loại hộp', tier.box], ['Túi', orderTerms.bag], ['Mức độ tùy biến', giftModels.bespoke.specs[2][1]]]} />
            </div>
            <div>
              <h2 className="lx-sd-h">Thông tin đặt hàng</h2>
              <SpecList rows={[['Giá', `${tier.money} / set`], ['VAT và vận chuyển', orderTerms.vat], ['Thanh toán', orderTerms.pay], ['Giao hàng', 'Một điểm hoặc nhiều điểm theo danh sách người nhận']]} />
            </div>
          </div>
        </section>

        {/* 3. Quy trình */}
        <ProcessSteps kind="bespoke" eyebrow="8 tuần" />

        {/* 4. Các thiết kế khác */}
        <section className="lx-sec lx-sd-sec lx-sd-soft lx-sd-more" aria-labelledby="lx-sd-more">
          <div className="lx-wrap">
            <h2 id="lx-sd-more" className="lx-sd-h">Các thiết kế khác</h2>
            <div className="lx-sd-others">
              {others.map((o) => (
                <Link key={o.slug} href={`/set-doc-ban/${o.slug}`} className="lx-card">
                  <div className="lx-card-img">
                    <span className="lx-card-box">{(o.gallery[0] ?? o.cover) && <img src={o.gallery[0] ?? o.cover} alt={`${o.name}, ${o.money} mỗi set`} width={800} height={1000} loading="lazy" decoding="async" />}</span>
                    <span className="lx-peek" aria-hidden="true">→</span>
                  </div>
                  <h3 className="lx-card-name">{o.name}</h3>
                  <p className="lx-card-price">{o.money} / set</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Liên hệ */}
        <section className="lx-cta" aria-labelledby="lx-sd-cta">
          <div className="lx-wrap">
            <h2 id="lx-sd-cta">Đặt {tier.name.toLowerCase()}<br />cho doanh nghiệp của anh chị.</h2>
            <p>Từ 300 set, 8 tuần từ khi nhận yêu cầu đến giao hàng, có mẫu thật để duyệt và nếm thử trước khi sản xuất.</p>
            <div><ZaloLink className="lx-btn lx-btn-white">Tư vấn qua Zalo</ZaloLink></div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
