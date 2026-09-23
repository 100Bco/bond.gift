import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { capabilityGroups, catalog, giftOccasions, merchandiseGroups, packagingGroups, processSteps, projects, type ServiceItem } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { ButtonLink, Label, SectionIntro, TextLink } from '@/components/bond/primitives';
import { Chapter, EditorialHero, FinalCta, MediaStage, MetricBand, Section, Statement } from '@/components/bond/sections';
import { CollectionCard, ProjectCard, ShowcaseCard } from '@/components/bond/cards';

export type ServiceKind = 'gift' | 'packaging' | 'merchandise';

const serviceConfig = {
  gift: {
    label: 'Quà tặng',
    title: 'Quà tặng doanh nghiệp',
    description: 'BOND làm trọn gói từ ý tưởng đến điểm giao cuối cùng. Thiết kế do ZAD thực hiện, nguồn hàng do BOND tuyển chọn, sản xuất và giao hàng do BOND kiểm soát.',
    items: giftOccasions,
    base: '/qua-tang',
    theme: 'gift' as const,
    heroMedia: { tone: 'magenta' as const, motion: 'box' as const, art: 'silk' as const, asset: 'Video người nhận mở bộ quà, khoảnh khắc thật' },
    stage: { tone: 'paper' as const, motion: 'envelope' as const, art: 'magenta' as const, asset: 'Ảnh still-life lớn: bộ quà Tết, thiệp và ruột set' },
    projects: [projects[0], projects[2]],
    capabilities: ['thiet-ke', 'chuoi-cung-ung', 'hop-tac'],
  },
  packaging: {
    label: 'Bao bì',
    title: 'Bao bì thương hiệu',
    description: 'Bao bì là điểm chạm vật lý cuối cùng giữa thương hiệu và khách hàng. BOND làm phần đó, với thiết kế từ ZAD và mạng lưới sản xuất tại Việt Nam và Trung Quốc.',
    items: packagingGroups,
    base: '/bao-bi',
    theme: 'packaging' as const,
    heroMedia: { tone: 'stone' as const, motion: 'layers' as const, art: 'kraft' as const, asset: 'Video bóc tách các lớp bao bì, cận chất liệu' },
    stage: { tone: 'deep' as const, motion: 'sleeve' as const, art: 'tea' as const, asset: 'Ảnh macro: vân giấy, ép kim, dập nổi' },
    projects: [projects[1], projects[0]],
    capabilities: ['thiet-ke', 'san-xuat', 'chuoi-cung-ung'],
  },
  merchandise: {
    label: 'Vật phẩm',
    title: 'Vật phẩm quảng cáo',
    description: 'Mảng đội ngũ BOND đã vận hành ở quy mô lớn. Gộp về một đầu mối giúp giữ đồng nhất chất lượng và giảm chi phí quản lý.',
    items: merchandiseGroups,
    base: '/vat-pham',
    theme: 'merchandise' as const,
    heroMedia: { tone: 'sage' as const, motion: 'kit' as const, art: 'slate' as const, asset: 'Video bộ vật phẩm xếp theo hệ thống, số lượng lớn' },
    stage: { tone: 'paper' as const, motion: 'journey-production' as const, art: 'slate' as const, asset: 'Ảnh kho tập kết vật phẩm theo lô' },
    projects: [projects[3], projects[0]],
    capabilities: ['san-xuat', 'doi-ngu', 'chuoi-cung-ung'],
  },
};

function RelatedCapabilities({ slugs, tone = 'sage' }: { slugs: string[]; tone?: 'sage' | 'paper' }) {
  const items = capabilityGroups.filter((item) => slugs.includes(item.slug));
  return (
    <Chapter
      tone={tone}
      mediaSize="half"
      label="Năng lực liên quan"
      title={<>Một hệ sinh thái<br />đã vận hành.</>}
      media={<Media ratio="4 / 5" tone="canvas" asset={items[0]?.asset ?? 'Ảnh xưởng sản xuất thật'} alt="Năng lực sản xuất của BOND" />}
    >
      <p className="t-body-l">Năng lực của BOND đến từ hệ sinh thái phía sau và từ những người đã làm việc này ở quy mô lớn.</p>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.slug}><Link href={`/nang-luc/${item.slug}`}><span>{item.title}</span><ArrowUpRight size={18} aria-hidden="true" /></Link></li>
        ))}
      </ul>
    </Chapter>
  );
}

function ProcessStrip() {
  return (
    <Section tone="canvas" className="process-strip">
      <SectionIntro label="Quy trình phù hợp" title={<>Rõ từng mốc.<br />Chắc từng bước.</>}>
        <p>Đơn thiết kế riêng thường mất 6—10 tuần từ brief đến giao hàng. Chúng tôi nói rõ ngay từ đầu.</p>
        <p><TextLink href="/quy-trinh">Xem quy trình đầy đủ</TextLink></p>
      </SectionIntro>
      <ol className="process-strip-list">
        {processSteps.map((step) => (
          <li key={step.number}>
            <span className="t-numeral">{step.number}</span>
            <h3 className="t-h4">{step.title}</h3>
            <p className="t-small t-muted">{step.duration}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------- Service hub: category world ---------- */

export function ServiceHubPage({ type }: { type: ServiceKind }) {
  const config = serviceConfig[type];
  const items = config.items;
  return (
    <SiteShell theme={config.theme}>
      <Breadcrumbs items={[{ label: config.title }]} />
      {/* 1–2. Category hero + visual đại diện */}
      <EditorialHero
        layout="split"
        size="l"
        label={config.label}
        title={config.title}
        lead={config.description}
        actions={<><ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink><ButtonLink href="/quy-trinh" variant="secondary">Xem quy trình</ButtonLink></>}
        media={<Media ratio="4 / 5" priority tone={config.heroMedia.tone} motion={config.heroMedia.motion} art={config.heroMedia.art} asset={config.heroMedia.asset} alt={`Minh họa ${config.title.toLowerCase()}`} />}
      />

      <Statement tone="paper" label="Ba cách hợp tác">
        Chọn từ bộ sưu tập, thiết kế riêng trọn gói, hoặc độc quyền theo sản lượng.
      </Statement>

      {/* 3. Nhóm giải pháp: large showcase */}
      {type === 'gift' && <GiftShowcase items={items} base={config.base} />}
      {type === 'packaging' && <PackagingShowcase items={items} base={config.base} />}
      {type === 'merchandise' && (
        <Section tone="canvas">
          <SectionIntro label="Nhóm giải pháp" title="Vật phẩm sự kiện, vật phẩm thương hiệu, POSM." />
          <div className="grid-3 showcase-grid">
            {items.map((item, index) => <ShowcaseCard key={item.slug} item={item} href={`${config.base}/${item.slug}`} index={index} total={items.length} tone={index === 1 ? 'sage' : 'paper'} />)}
          </div>
        </Section>
      )}

      <MediaStage tone="canvas" media={<Media ratio="21 / 9" tone={config.stage.tone} motion={config.stage.motion} art={config.stage.art} asset={config.stage.asset} alt="" />} />

      {type === 'packaging' && (
        <Section tone="deep" spacing="tight">
          <div className="note-band">
            <h2 className="t-h3">Nếu thương hiệu của anh chị đã làm việc với ZAD</h2>
            <p className="t-body-l">Toàn bộ file nhận diện và hệ thống thiết kế đã sẵn sàng. Không phải bắt đầu lại, không phải giải thích lại brand guideline cho một nhà cung cấp mới.</p>
          </div>
        </Section>
      )}

      {/* 4. Dự án liên quan */}
      <Section tone="canvas">
        <SectionIntro label="Dự án liên quan" title={<>Làm thật.<br />Ở quy mô thật.</>}>
          <TextLink href="/du-an">Xem tất cả dự án</TextLink>
        </SectionIntro>
        <div className="grid-2">
          {config.projects.map((project, index) => <ProjectCard key={project.slug} project={project} variant="wide" index={index} />)}
        </div>
      </Section>

      {/* 5. Năng lực liên quan */}
      <RelatedCapabilities slugs={config.capabilities} />

      {/* 6. Quy trình phù hợp */}
      <ProcessStrip />

      {/* 7. CTA */}
      <FinalCta
        label="Bắt đầu từ đây"
        title="Mở một bài toán cùng BOND."
        copy="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng. Nếu chưa rõ ngân sách, BOND sẽ đề xuất khoảng phù hợp với nhóm người nhận."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}

function GiftShowcase({ items, base }: { items: ServiceItem[]; base: string }) {
  const [lead, ...rest] = items;
  return (
    <Section tone="canvas">
      <SectionIntro label="Theo dịp tặng" title="Tết, tri ân đối tác, sự kiện, nội bộ." />
      <div className="showcase-feature">
        <ShowcaseCard item={lead} href={`${base}/${lead.slug}`} index={0} total={items.length} tone="magenta" size="l" />
      </div>
      <div className="grid-2 showcase-grid">
        {rest.map((item, index) => <ShowcaseCard key={item.slug} item={item} href={`${base}/${item.slug}`} index={index + 1} total={items.length} tone={index % 3 === 0 ? 'sage' : 'paper'} />)}
      </div>
    </Section>
  );
}

function PackagingShowcase({ items, base }: { items: ServiceItem[]; base: string }) {
  const byType = items.slice(0, 3);
  const byIndustry = items.slice(3);
  return (
    <>
      <Section tone="canvas">
        <SectionIntro label="Theo loại bao bì" title="Hộp, túi, thiệp và ấn phẩm." />
        <div className="grid-3 showcase-grid">
          {byType.map((item, index) => <ShowcaseCard key={item.slug} item={item} href={`${base}/${item.slug}`} index={index} total={byType.length} tone={index === 1 ? 'stone' : 'paper'} />)}
        </div>
      </Section>
      <Section tone="paper">
        <SectionIntro label="Theo ngành" title="Cho thời trang, trang sức, mỹ phẩm, FMCG." />
        <div className="h-scroll" tabIndex={0} aria-label="Bao bì theo ngành">
          {byIndustry.map((item, index) => <ShowcaseCard key={item.slug} item={item} href={`${base}/${item.slug}`} index={index} total={byIndustry.length} tone={index % 2 ? 'canvas' : 'deep'} />)}
        </div>
      </Section>
    </>
  );
}

/* ---------- Service detail ---------- */

const occasionFilter: Record<string, string> = { tet: 'Tết', 'tri-an-doi-tac': 'Tri ân', 'su-kien-hoi-nghi': 'Sự kiện', 'noi-bo': 'Nội bộ', 'ky-niem-thanh-lap': 'Kỷ niệm' };

export function ServiceDetailPage({ kind }: { kind: ServiceKind }) {
  const [location] = useLocation();
  const slug = location.split('/').pop() ?? '';
  const config = serviceConfig[kind];
  const item = config.items.find((entry) => entry.slug === slug) ?? config.items[0];
  const siblings = config.items.filter((entry) => entry.slug !== item.slug);
  const occasion = kind === 'gift' ? occasionFilter[item.slug] : undefined;
  const matching = occasion ? catalog.filter((product) => product.occasion === occasion) : [];
  const products = (matching.length >= 2 ? matching : catalog).slice(0, 3);
  const heroTitleLabel = kind === 'gift' ? 'Quà tặng' : kind === 'packaging' ? 'Bao bì thương hiệu' : 'Vật phẩm quảng cáo';

  return (
    <SiteShell theme={config.theme}>
      <Breadcrumbs items={[{ label: config.label, href: config.base }, { label: item.title }]} />
      {/* 1. Hero */}
      <EditorialHero
        layout="split"
        size="l"
        label={`${heroTitleLabel} / Chi tiết`}
        title={item.title}
        lead={item.copy}
        actions={<ButtonLink href="/lien-he">Trao đổi bài toán này</ButtonLink>}
        media={<Media ratio="4 / 5" priority tone={config.heroMedia.tone} motion={item.motion} art={config.heroMedia.art} asset={item.asset} alt={`Minh họa ${item.title.toLowerCase()}`} />}
      />

      {/* 2–3. Nhu cầu và giải pháp BOND */}
      <Section tone="paper">
        <div className="need-solution">
          <Reveal className="need">
            <Label>Nhu cầu</Label>
            <p className="t-h2">{item.copy}</p>
          </Reveal>
          <Reveal className="solution" delay={1}>
            <Label>Giải pháp BOND</Label>
            <h2 className="t-h3">Đúng bài toán. Đúng điểm chạm.</h2>
            <p className="t-body-l">BOND cùng anh chị xác định người nhận, dịp sử dụng, số lượng, ngân sách và mốc cần hàng trước khi đề xuất cấu trúc phù hợp. Mỗi phương án được trình bày rõ chất liệu, kỹ thuật, thời gian và trách nhiệm.</p>
            <ul className="pillars">
              <li>Thiết kế theo nhận diện</li>
              <li>Sản xuất có kiểm soát</li>
              <li>Giao hàng theo mốc</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 4. Nhóm sản phẩm */}
      <Section tone="canvas">
        <SectionIntro label="Nhóm sản phẩm" title="Chọn một hướng đi.">
          <p>Hơn 40 thiết kế, ở mọi mức ngân sách, đều có thể phát triển thành phiên bản riêng của thương hiệu anh chị.</p>
          <p><TextLink href="/bo-suu-tap">Xem toàn bộ thư viện</TextLink></p>
        </SectionIntro>
        <div className="collection-grid">
          {products.map((product) => <CollectionCard key={product.slug} product={product} />)}
        </div>
      </Section>

      {/* 5. Product showcase */}
      <MediaStage tone="canvas" media={<Media ratio="21 / 9" tone={config.stage.tone} motion={config.stage.motion} art={config.stage.art} asset={config.stage.asset} alt="" />} />

      {/* 6. Khả năng tùy biến */}
      <Chapter
        tone="sage"
        mediaSize="half"
        reverse
        label="Khả năng tùy biến"
        title="Những điều thường được quan tâm."
        media={<Media ratio="1 / 1" tone="canvas" motion="colorway" art={config.heroMedia.art} asset="Ảnh các phương án tùy biến màu, chất liệu" alt="Minh họa các phương án tùy biến" />}
      >
        <ul className="check-list">
          <li>Khả năng tùy biến theo nhận diện thương hiệu.</li>
          <li>MOQ và thời gian tham khảo theo từng nhóm.</li>
          <li>Hồ sơ nguồn hàng và mẫu vật lý trước khi duyệt.</li>
          <li>Giao một điểm hoặc nhiều điểm theo lịch.</li>
        </ul>
      </Chapter>

      {/* 7. Production proof */}
      <MetricBand
        tone="ink"
        label="Năng lực triển khai"
        items={[
          { value: '6—10', label: 'tuần cho đơn thiết kế riêng, từ brief đến giao hàng' },
          { value: '3—4', label: 'tuần cho đơn chọn từ mẫu có sẵn, tùy biến logo' },
          { value: '07', label: 'bước, mỗi bước có mốc và người chịu trách nhiệm' },
          { value: '02', label: 'quốc gia trong mạng lưới sản xuất' },
        ]}
      />

      {/* 8. Dự án liên quan */}
      <Section tone="canvas">
        <SectionIntro label="Dự án liên quan" title={<>Làm thật.<br />Ở quy mô thật.</>}>
          <TextLink href="/du-an">Xem tất cả dự án</TextLink>
        </SectionIntro>
        <div className="grid-2">
          {config.projects.map((project, index) => <ProjectCard key={project.slug} project={project} variant="wide" index={index} />)}
        </div>
      </Section>

      <Section tone="deep" spacing="tight">
        <div className="sibling-links">
          <Label>{config.title}</Label>
          <ul className="item-list">
            {siblings.map((entry) => (
              <li key={entry.slug}><Link href={`${config.base}/${entry.slug}`}><span>{entry.title}</span><ArrowUpRight size={18} aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 9. CTA */}
      <FinalCta
        label="Bắt đầu từ đây"
        title="Trao đổi bài toán này."
        copy="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}
