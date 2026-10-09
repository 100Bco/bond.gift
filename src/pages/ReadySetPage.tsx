import { Link, useRoute } from 'wouter';
import { giftModels, giftProcesses, pendingSpec, readySets } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { SetArt } from '@/components/bond/GiftArt';
import { NotFoundPage } from '@/pages/UtilityPages';

const pad = (n: number) => String(n).padStart(2, '0');

/* Ảnh thật chưa có: mỗi ô giữ chỗ ghi rõ cần chụp gì. */
const galleryShots = ['Hộp đóng, góc 3/4', 'Hộp mở, thấy ruột set', 'Cận chất liệu hộp', 'Cận logo ép kim'];

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

/** Trang chi tiết một set sẵn: /set-san/:slug. Thông số chưa có số liệu thật hiển thị "Đang cập nhật". */
export function ReadySetPage() {
  const [, params] = useRoute('/set-san/:slug');
  const set = readySets.find((s) => s.slug === params?.slug);
  if (!set) return <NotFoundPage />;
  const items = set.contents.split(' + ');
  const others = readySets.filter((s) => s.slug !== set.slug);
  const steps = giftProcesses.ready.steps;
  const [time, moq] = giftModels.ready.specs;

  return (
    <SiteShell>
      <div className="lx lx-sd">
        {/* 1. Phần đầu trang: ảnh, tên, giá, thông số nhanh */}
        <section className="lx-sd-hero" aria-labelledby="lx-sd-title">
          <div className="lx-wrap">
            <nav className="lx-sd-crumb" aria-label="Đường dẫn">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#set-san">Set Sẵn</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{set.name}</span>
            </nav>
            <div className="lx-sd-hero-grid">
              <Reveal className="lx-sd-media">
                <span className="lx-card-tag">{set.tier}</span>
                <SetArt look={set.look} />
              </Reveal>
              <Reveal className="lx-sd-intro" delay={1}>
                <p className="lx-eyebrow">Set Sẵn · {set.tier}</p>
                <h1 id="lx-sd-title">{set.name}</h1>
                <p className="lx-sd-price">{set.price}</p>
                <p className="lx-lead">{set.contents}.</p>
                <SpecList rows={[time, moq, ['Tùy biến', 'Gắn logo lên hộp và thiệp']]} />
                <div className="lx-sd-actions">
                  <ZaloLink className="lx-btn lx-btn-red">Tư vấn qua Zalo</ZaloLink>
                  <Link href="/#quy-trinh" className="lx-btn lx-btn-line">Xem quy trình</Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2. Bộ ảnh */}
        <section className="lx-sd-gallery" aria-label={`Hình ảnh ${set.name}`}>
          <div className="lx-wrap">
            <div className="lx-sd-shots">
              {galleryShots.map((label) => (
                <figure key={label} className="lx-sd-shot">
                  <SetArt look={set.look} />
                  <figcaption>{label} · ảnh {pendingSpec.toLowerCase()}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Trong hộp có gì */}
        <section className="lx-sec lx-sd-sec" aria-labelledby="lx-sd-in">
          <div className="lx-wrap lx-sd-split">
            <Reveal className="lx-sd-side">
              <p className="lx-eyebrow">Thành phần</p>
              <h2 id="lx-sd-in">Trong hộp có gì</h2>
              <p className="lx-sd-note">Có thể đổi món theo menu sẵn có của BOND.</p>
            </Reveal>
            <Reveal className="lx-sd-main" delay={1}>
              <ol className="lx-sd-items">
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
            </Reveal>
          </div>
        </section>

        {/* 4–5. Thông số hộp và tùy biến thương hiệu */}
        <section className="lx-sec lx-sd-sec lx-sd-soft" aria-label="Thông số hộp và tùy biến thương hiệu">
          <div className="lx-wrap lx-sd-pair">
            <Reveal>
              <h2 className="lx-sd-h">Thông số hộp</h2>
              <SpecList rows={[['Kích thước', pendingSpec], ['Chất liệu', pendingSpec], ['Màu sắc', pendingSpec], ['Trọng lượng cả set', pendingSpec]]} />
            </Reveal>
            <Reveal delay={1}>
              <h2 className="lx-sd-h">Tùy biến thương hiệu</h2>
              <SpecList rows={[['Vị trí logo', pendingSpec], ['Kỹ thuật', 'In hoặc ép kim logo'], ['Thiệp', 'Thiệp kèm theo, gắn logo thương hiệu'], ['Duyệt mẫu', 'Khách duyệt mẫu in logo trước khi sản xuất']]} />
            </Reveal>
          </div>
        </section>

        {/* 6–7. Thông tin đặt hàng và quy trình */}
        <section className="lx-sec lx-sd-sec" aria-label="Thông tin đặt hàng và quy trình">
          <div className="lx-wrap lx-sd-pair">
            <Reveal>
              <h2 className="lx-sd-h">Thông tin đặt hàng</h2>
              <SpecList rows={[['Giá', set.price], ['VAT', pendingSpec], moq, time, ['Giao hàng', 'Một điểm hoặc nhiều điểm theo danh sách người nhận']]} />
            </Reveal>
            <Reveal delay={1}>
              <h2 className="lx-sd-h">Quy trình {steps.length} bước</h2>
              <ol className="lx-sd-steps">
                {steps.map(([t, d], i) => (
                  <li key={t} className="lx-sd-item">
                    <span className="lx-cmp-step-n">{pad(i + 1)}</span>
                    <div><p className="lx-sd-item-t">{t}</p><p className="lx-sd-item-d">{d}</p></div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* 8. Các set còn lại */}
        <section className="lx-sec lx-sd-sec lx-sd-soft" aria-labelledby="lx-sd-more">
          <div className="lx-wrap">
            <Reveal className="lx-sec-head">
              <div>
                <p className="lx-eyebrow">So sánh</p>
                <h2 id="lx-sd-more">Các set sẵn khác</h2>
              </div>
            </Reveal>
            <div className="lx-cards lx-sd-others">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={(i % 3) as 0 | 1 | 2}>
                  <Link href={`/set-san/${o.slug}`} className="lx-card">
                    <div className="lx-card-img">
                      <span className="lx-card-tag">{o.tier}</span>
                      <SetArt look={o.look} />
                    </div>
                    <h3 className="lx-card-name">{o.name}</h3>
                    <p className="lx-card-price">{o.price}</p>
                    <span className="lx-card-more">Xem chi tiết <span aria-hidden="true">→</span></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Liên hệ */}
        <section className="lx-cta" aria-labelledby="lx-sd-cta">
          <div className="lx-wrap">
            <Reveal><h2 id="lx-sd-cta">Đặt set {set.name}<br />cho doanh nghiệp của bạn.</h2></Reveal>
            <Reveal delay={1}><p>Từ 10 set, khoảng 2 tuần từ khi chốt đến khi giao. BOND gửi mẫu in logo để bạn duyệt trước khi sản xuất.</p></Reveal>
            <Reveal delay={2}><ZaloLink className="lx-btn lx-btn-white">Tư vấn qua Zalo</ZaloLink></Reveal>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
