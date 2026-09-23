import { useRoute } from 'wouter';
import { capabilityGroups, ecosystem, partners, projects } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { ButtonLink, ChapterNav, ChapterNumber, Label, LogoWall, NextChapter, SectionIntro, TextLink } from '@/components/bond/primitives';
import { Chapter, EditorialHero, FinalCta, MetricBand, Section, Statement } from '@/components/bond/sections';
import { ProjectCard } from '@/components/bond/cards';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

const scaleMetrics = [
  { value: '100B', label: 'quy mô đội ngũ từng vận hành mỗi năm' },
  { value: '02', label: 'quốc gia trong mạng lưới sản xuất' },
  { value: '03', label: 'đơn vị trong một hệ sinh thái' },
];

/* ---------- /nang-luc ---------- */

export function CapabilitiesPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Năng lực' }]} />
      <EditorialHero
        layout="stacked"
        size="xl"
        label="Năng lực BOND"
        title={<>Một hệ sinh thái<br />đã vận hành.</>}
        lead="Năng lực của BOND đến từ hệ sinh thái phía sau và từ những người đã làm việc này ở quy mô lớn."
      />
      <MetricBand tone="ink" items={scaleMetrics} />

      <div className="chapter-group">
      <ChapterNav label="Các năng lực" items={capabilityGroups.map((item) => ({ id: `nl-${item.slug}`, title: item.title }))} />
      {capabilityGroups.map((item, index) => (
        <Chapter
          key={item.slug}
          id={`nl-${item.slug}`}
          number={index + 1}
          total={capabilityGroups.length}
          tone={(['canvas', 'paper', 'sage', 'canvas', 'deep', 'paper'] as const)[index]}
          reverse={index % 2 === 1}
          mediaSize={index % 3 === 0 ? 'wide' : 'half'}
          spacing="tight"
          title={item.title}
          media={<Media ratio={index % 3 === 0 ? '3 / 2' : '4 / 5'} tone={index % 2 ? 'canvas' : 'deep'} asset={item.asset} alt={item.title} />}
          footer={<>
            <TextLink href={`/nang-luc/${item.slug}`}>Xem năng lực {item.title.toLowerCase()}</TextLink>
            {capabilityGroups[index + 1] && <NextChapter id={`nl-${capabilityGroups[index + 1].slug}`} title={capabilityGroups[index + 1].title} />}
          </>}
        >
          <p className="t-body-l">{item.copy}</p>
        </Chapter>
      ))}
      </div>

      <Section tone="canvas">
        <LogoWall title="Các thương hiệu đã đồng hành cùng hệ sinh thái 100B" items={partners} />
      </Section>

      <FinalCta
        label="Bắt đầu từ đây"
        title="Mở một bài toán cùng BOND."
        copy="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}

/* ---------- /nang-luc/:slug ---------- */

const sourcingCommitments = [
  ['Nguồn hàng rõ ràng', 'Nguồn gốc và khả năng thay thế là những câu hỏi cần có trước khi ký.'],
  ['Hồ sơ đầy đủ', 'Hồ sơ nguồn hàng và mẫu vật lý trước khi duyệt.'],
  ['Hạn sử dụng tính từ ngày giao', 'Hạn dùng được tính tại thời điểm người nhận cầm hộp trên tay, không phải khi xuất kho.'],
];

export function CapabilityDetailPage() {
  const [, params] = useRoute('/nang-luc/:slug');
  const item = capabilityGroups.find((entry) => entry.slug === params?.slug) ?? capabilityGroups[0];
  const others = capabilityGroups.filter((entry) => entry.slug !== item.slug);
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Năng lực', href: '/nang-luc' }, { label: item.title }]} />
      {/* 1. Capability hero */}
      <EditorialHero
        layout="split"
        size="l"
        label={`Năng lực / ${item.title}`}
        title={item.title}
        lead={item.copy}
        actions={<ButtonLink href="/lien-he">Trao đổi về năng lực này</ButtonLink>}
        media={<Media ratio="4 / 5" tone="deep" priority asset={item.asset} alt={item.title} />}
      />

      {/* 2. Giá trị */}
      <Statement tone="paper" label="Giá trị với anh chị">
        Anh chị làm việc với một đầu mối. Phía sau là một hệ thống có người chịu trách nhiệm ở từng đoạn.
      </Statement>

      {/* 3. Hệ thống vận hành */}
      {item.slug === 'he-sinh-thai-100b' ? (
        <Section tone="ink">
          <SectionIntro label="Hệ thống vận hành" title="Ba vai trò. Một trách nhiệm.">Anh chị không cần điều phối ba nhà cung cấp cho một món quà.</SectionIntro>
          <div className="role-grid">
            {ecosystem.map((unit) => (
              <article key={unit.name} className="role-card">
                <div className={`eco-plate eco-plate-${unit.name.toLowerCase()}`}><img src={unit.logo} alt={unit.name} loading="lazy" /></div>
                <h3 className="t-h3">{unit.role}</h3>
                <p className="t-muted">{unit.copy}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : (
        <Chapter
          tone="canvas"
          label="Hệ thống vận hành"
          title={<>Rõ vai trò.<br />Rõ hồ sơ.<br />Rõ trách nhiệm.</>}
          media={<Media ratio="3 / 2" tone="sage" asset={`Ảnh thật về ${item.title.toLowerCase()}: con người và công đoạn`} alt={item.title} />}
        >
          <p className="t-body-l">Chúng tôi nói rõ điều mình làm, điều mình không làm và hồ sơ cần có trước khi bắt đầu. Đây là cách giảm rủi ro cho những đơn hàng có nhiều người nhận, nhiều điểm giao và mốc thời gian cố định.</p>
        </Chapter>
      )}

      {/* Cam kết nguồn hàng: nổi bật cho chuỗi cung ứng */}
      {item.slug === 'chuoi-cung-ung' && (
        <Section tone="magenta" className="commitments">
          <SectionIntro label="Cam kết nguồn hàng" title="Nguồn hàng rõ ràng, hồ sơ đầy đủ, hạn sử dụng tính từ ngày giao." />
          <ol className="commitment-list">
            {sourcingCommitments.map(([title, copy], index) => (
              <Reveal as="li" key={title} delay={(index + 1) as 1 | 2 | 3}>
                <ChapterNumber n={index + 1} />
                <h3 className="t-h3">{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {/* 4. Hình ảnh thật */}
      <Section tone="canvas" spacing={item.slug === 'chuoi-cung-ung' ? 'default' : 'bottom'}>
        <div className="people-gallery">
          <Media ratio="4 / 5" tone="paper" asset={`Ảnh thật: ${item.asset.toLowerCase()}`} alt={item.title} />
          <Media ratio="4 / 3" tone="deep" asset="Ảnh thật: công đoạn kiểm soát chất lượng" alt="Kiểm soát chất lượng" />
          <Media ratio="1 / 1" tone="sage" asset="Ảnh thật: hồ sơ, biên bản bàn giao" alt="Hồ sơ và biên bản bàn giao" />
        </div>
      </Section>

      {/* 5. Proof */}
      <MetricBand tone="deep" items={scaleMetrics} />

      {/* 6. Dự án liên quan */}
      <Section tone="canvas">
        <SectionIntro label="Dự án liên quan" title={<>Làm thật.<br />Ở quy mô thật.</>}>
          <TextLink href="/du-an">Xem tất cả dự án</TextLink>
        </SectionIntro>
        <div className="grid-2">
          {projects.slice(0, 2).map((project, index) => <ProjectCard key={project.slug} project={project} variant="wide" index={index} />)}
        </div>
      </Section>

      {/* 7. Cam kết */}
      <Section tone="paper" spacing="tight">
        <div className="pledge">
          <Label>Cam kết</Label>
          <ul className="pledge-list">
            <li>Hợp đồng mua bán</li>
            <li>Hóa đơn VAT đầy đủ</li>
            <li>Đặt cọc tối đa 50% khi ký</li>
            <li>Thanh toán phần còn lại sau nghiệm thu</li>
          </ul>
        </div>
      </Section>

      <Section tone="canvas" spacing="tight">
        <div className="sibling-links">
          <Label>Năng lực khác</Label>
          <ul className="item-list">
            {others.map((entry) => (
              <li key={entry.slug}><Link href={`/nang-luc/${entry.slug}`}><span>{entry.title}</span><ArrowUpRight size={18} aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 8. CTA */}
      <FinalCta
        title="Trao đổi về năng lực này."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}
