import { useMemo, useState } from 'react';
import { useRoute } from 'wouter';
import { budgetFilters, catalog, type CatalogItem } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { ButtonLink, ChapterNav, ChapterNumber, FilterChips, Label, NextChapter, SectionIntro, Tag, TextLink } from '@/components/bond/primitives';
import { Chapter, EditorialHero, FinalCta, Section } from '@/components/bond/sections';
import { CollectionCard } from '@/components/bond/cards';
import { EngagementModels } from '@/components/bond/EngagementModels';

const occasionToGift: Record<string, [string, string]> = {
  'Tết': ['/qua-tang/tet', 'Quà Tết doanh nghiệp'],
  'Tri ân': ['/qua-tang/tri-an-doi-tac', 'Tri ân đối tác'],
  'Sự kiện': ['/qua-tang/su-kien-hoi-nghi', 'Sự kiện & hội nghị'],
  'Nội bộ': ['/qua-tang/noi-bo', 'Quà tặng nội bộ'],
  'Kỷ niệm': ['/qua-tang/ky-niem-thanh-lap', 'Kỷ niệm thành lập'],
};

/* ---------- /bo-suu-tap ---------- */

export function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const visibleProducts = useMemo(() => activeFilter === 'Tất cả' ? catalog : catalog.filter((product) => product.budget === activeFilter), [activeFilter]);
  const [featured, ...rest] = visibleProducts;
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Bộ sưu tập' }]} />
      <EditorialHero
        layout="text"
        size="l"
        label="Thư viện mẫu"
        title={<>Bộ sưu tập<br />của BOND.</>}
        lead="Hơn 40 thiết kế do ZAD thực hiện dành riêng cho BOND. Đây là các thiết kế mẫu, không phải hàng bán sẵn. Anh chị chọn một hướng, chúng tôi phát triển thành phiên bản của riêng thương hiệu anh chị."
      />

      <Section tone="canvas" spacing="none" className="collection-notice">
        <div className="notice">
          <p className="t-h3">Thiết kế riêng ở mọi mức ngân sách.</p>
          <p className="t-body-l t-muted">Khác biệt giữa các mức ngân sách nằm ở chất liệu, kỹ thuật gia công và sản phẩm bên trong, không nằm ở việc có được thiết kế riêng hay không.</p>
        </div>
      </Section>

      <Section tone="canvas" spacing="tight" className="collection-library">
        <div className="collection-toolbar">
          <FilterChips label="Ngân sách mỗi phần quà" options={budgetFilters} value={activeFilter} onChange={setActiveFilter} />
          <p className="t-small t-muted collection-explainer"><strong>Ngân sách này gồm những gì?</strong> Con số tính cho trọn bộ: hộp, bao bì, sản phẩm bên trong, thiệp và đóng gói hoàn thiện. Sản lượng ảnh hưởng đáng kể đến con số cuối.</p>
        </div>
        <p className="sr-only" aria-live="polite">{visibleProducts.length} mẫu</p>
        {featured && (
          <div className="collection-featured">
            <CollectionCard product={featured} size="l" headingLevel={2} />
          </div>
        )}
        {rest.length > 0 && (
          <div className="collection-grid">
            {rest.map((product) => <CollectionCard key={product.slug} product={product} headingLevel={2} />)}
          </div>
        )}
      </Section>

      <EngagementModels />

      <Section tone="ink" spacing="tight" className="signature-teaser">
        <div className="signature-teaser-grid">
          <div>
            <Label>BOND Signature</Label>
            <p className="t-h2">Những thiết kế BOND giữ cho riêng mình.</p>
          </div>
          <TextLink href="/bo-suu-tap/signature">Xem BOND Signature</TextLink>
        </div>
      </Section>

      <FinalCta
        tone="deep"
        label="Xem mẫu thật trước khi quyết định"
        title="Đội ngũ BOND mang mẫu vật lý đến văn phòng anh chị."
        actions={<ButtonLink href="/lien-he">Yêu cầu mang mẫu</ButtonLink>}
      />
    </SiteShell>
  );
}

/* ---------- /bo-suu-tap/:slug ---------- */

export function CatalogDetailPage() {
  const [, params] = useRoute('/bo-suu-tap/:slug');
  const product: CatalogItem = catalog.find((item) => item.slug === params?.slug) ?? { ...catalog[0], slug: params?.slug ?? 'mau-bond', name: 'Mẫu thiết kế riêng của BOND', description: 'Một hướng thiết kế có thể được phát triển tiếp theo nhận diện, ngân sách và người nhận của thương hiệu anh chị.' };
  const occasion = occasionToGift[product.occasion];
  const related = catalog.filter((item) => item.slug !== product.slug).slice(0, 3);
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Bộ sưu tập', href: '/bo-suu-tap' }, { label: product.name }]} />

      {/* 1–2. Product hero + concept */}
      <EditorialHero
        layout="split"
        size="l"
        className="product-hero"
        label={`Bộ sưu tập / ${product.budget}`}
        title={product.name}
        lead={product.description}
        actions={<ButtonLink href="/lien-he">Yêu cầu phương án cho mẫu này</ButtonLink>}
        aside={<div className="tag-row"><Tag tone="accent">{product.budget}</Tag><Tag>{product.occasion}</Tag><Tag>{product.style}</Tag></div>}
        media={<Media ratio="4 / 5" tone="deep" motion={product.motion} art={product.art} priority asset={`Ảnh hero ${product.name}, góc 3/4, nền giấy`} alt={`Minh họa ${product.name}`} />}
      />

      {/* 3. Gallery */}
      <Section tone="canvas" spacing="tight" className="product-gallery">
        <div className="product-gallery-grid">
          <Media ratio="3 / 2" tone="paper" asset="Cận cảnh chất liệu và kỹ thuật hoàn thiện" alt={`Chi tiết chất liệu ${product.name}`} />
          <Media ratio="4 / 5" tone="sage" asset="Góc mở hộp, thấy ruột set" alt={`${product.name} khi mở hộp`} />
          <Media ratio="4 / 5" tone="paper" asset="Video loop trải nghiệm mở hộp (WebM, có poster)" alt={`Trải nghiệm mở ${product.name}`} />
        </div>
      </Section>

      <div className="chapter-group">
      <ChapterNav label="Các phần của mẫu" items={[
        { id: 'diem-noi-bat', title: 'Điểm làm nên mẫu này' },
        { id: 'cau-truc', title: 'Cấu trúc và chất liệu' },
        { id: 'phien-ban', title: 'Phiên bản riêng' },
        { id: 'boi-canh', title: 'Bối cảnh sử dụng' },
      ]} />
      {/* 4. Điểm làm nên mẫu này */}
      <Chapter
        id="diem-noi-bat"
        number={1}
        total={4}
        tone="paper"
        footer={<NextChapter id="cau-truc" title="Cấu trúc và chất liệu" />}
        title="Điểm làm nên mẫu này"
        media={<Media ratio="1 / 1" tone="canvas" motion={product.motion} art={product.art} alt="" />}
      >
        <p className="t-h4">Khi người nhận mở hộp, điều còn lại không chỉ là món quà mà là cảm giác được đặt vào đúng vị trí.</p>
        <p className="t-body-l">{product.description} BOND sẽ phát triển lại mẫu này theo nhận diện thương hiệu của anh chị — màu, chất liệu, cấu trúc và cách mở.</p>
      </Chapter>

      {/* 5. Cấu trúc, chất liệu, kỹ thuật */}
      <Chapter
        id="cau-truc"
        number={2}
        total={4}
        tone="canvas"
        footer={<NextChapter id="phien-ban" title="Phiên bản riêng" />}
        reverse
        mediaSize="half"
        label="Cấu trúc và chất liệu"
        title={product.material}
        media={<Media ratio="1 / 1" tone="deep" motion="layers" art={product.art} asset="Ảnh bóc tách các lớp: hộp, khay, thiệp" alt="Minh họa các lớp cấu trúc hộp" />}
      >
        <dl className="spec-list">
          <div><dt>Chất liệu</dt><dd>{product.material}</dd></div>
          <div><dt>Phong cách</dt><dd>{product.style}</dd></div>
          <div><dt>Khoảng ngân sách</dt><dd>{product.budget}</dd></div>
        </dl>
      </Chapter>

      {/* 6. Phiên bản và tùy biến */}
      <Chapter
        id="phien-ban"
        number={3}
        total={4}
        tone="sage"
        footer={<NextChapter id="boi-canh" title="Bối cảnh sử dụng" />}
        label="Phiên bản riêng"
        title="Mẫu sau khi hoàn thiện thuộc về riêng anh chị."
        media={<Media ratio="5 / 4" tone="canvas" motion="colorway" art={product.art} asset="Ảnh các phiên bản màu đặt cạnh nhau" alt="Minh họa các phiên bản màu" />}
      >
        <p className="t-body-l">Điều này áp dụng ở mọi mức ngân sách. Chúng tôi không dùng lại phiên bản đã phát triển cho khách hàng khác.</p>
        <dl className="spec-list">
          <div><dt>Khả năng tùy biến</dt><dd>Màu, cấu trúc, ruột set và hoàn thiện</dd></div>
        </dl>
      </Chapter>

      {/* 7. Bối cảnh sử dụng */}
      <Chapter
        id="boi-canh"
        number={4}
        total={4}
        tone="canvas"
        reverse
        label="Bối cảnh sử dụng"
        title={`Phù hợp cho dịp ${product.occasion.toLowerCase()}.`}
        media={<Media ratio="3 / 2" tone="paper" asset={`Ảnh ${product.name} trong bối cảnh tặng thực tế`} alt={`${product.name} trong bối cảnh tặng`} />}
        footer={occasion && <TextLink href={occasion[0]}>{occasion[1]}</TextLink>}
      />

      </div>

      {/* 8. Sản phẩm liên quan */}
      <Section tone="deep">
        <SectionIntro label="Bộ sưu tập" title="Các hướng thiết kế khác.">
          <TextLink href="/bo-suu-tap">Xem toàn bộ thư viện</TextLink>
        </SectionIntro>
        <div className="collection-grid">
          {related.map((item) => <CollectionCard key={item.slug} product={item} />)}
        </div>
      </Section>

      {/* 9. CTA */}
      <FinalCta
        label="Xem mẫu thật trước khi quyết định"
        title="Yêu cầu phương án cho mẫu này."
        copy="Đội ngũ BOND mang mẫu vật lý đến văn phòng anh chị."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}

/* ---------- /bo-suu-tap/signature ---------- */

const signatureItems = [
  { name: 'Red Archive', copy: 'Hộp lưu trữ dành cho những mối quan hệ được xây dựng qua nhiều mùa.', motion: 'box' as const, art: 'magenta' as const, tone: 'magenta' as const },
  { name: 'Common Table', copy: 'Một bộ quà đặt người nhận vào cùng một câu chuyện.', motion: 'kit' as const, art: 'kraft' as const, tone: 'paper' as const },
  { name: 'After Hours', copy: 'Vật phẩm dành cho những cuộc gặp quan trọng sau giờ làm việc.', motion: 'sleeve' as const, art: 'slate' as const, tone: 'ink' as const },
];

export function SignaturePage() {
  return (
    <SiteShell theme="signature">
      <Breadcrumbs items={[{ label: 'Bộ sưu tập', href: '/bo-suu-tap' }, { label: 'Signature' }]} />
      <EditorialHero
        layout="center"
        size="xl"
        label="BOND Signature"
        title={<>Những thiết kế BOND giữ cho riêng mình.</>}
        lead="Đây là phần quà mà BOND và hệ sinh thái 100B mang đi tặng đối tác của chính mình."
      />

      {signatureItems.map((item, index) => (
        <section key={item.name} className={`section signature-item section-space-default ${index % 2 ? 'signature-item-reverse' : ''}`}>
          <div className="container">
            <Media ratio="16 / 9" tone={item.tone} motion={item.motion} art={item.art} asset={`Ảnh art direction ${item.name}: still-life, ánh sáng có chủ đích`} alt={`Minh họa ${item.name}`} />
            <Reveal className="signature-item-copy">
              <ChapterNumber n={index + 1} total={signatureItems.length} />
              <h2 className="t-brand t-display-l">{item.name}</h2>
              <p className="t-h3">{item.copy}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <Section tone="magenta" className="exclusive">
        <div className="exclusive-grid">
          <Label>Quyền độc quyền</Label>
          <h2 className="t-h1">Một số mẫu có thể được chuyển nhượng độc quyền cho một thương hiệu duy nhất.</h2>
          <p className="t-body-l">Kèm cam kết sản lượng tối thiểu. Sau khi chuyển nhượng, BOND ngừng sử dụng mẫu đó cho mọi khách hàng khác.</p>
          <ButtonLink href="/lien-he">Trao đổi về quyền độc quyền</ButtonLink>
        </div>
      </Section>
    </SiteShell>
  );
}
