import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { catalog, ecosystem, giftOccasions, merchandiseGroups, packagingGroups, partners, processSteps, projects } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { ButtonLink, Label, LogoWall, SectionIntro, TextLink } from '@/components/bond/primitives';
import { Chapter, EditorialHero, FinalCta, MetricBand, Section } from '@/components/bond/sections';
import { CollectionCard, ProjectCard } from '@/components/bond/cards';
import { ContactForm } from '@/components/bond/ContactForm';

const serviceChapters = [
  {
    href: '/qua-tang',
    title: 'Quà tặng doanh nghiệp',
    copy: 'Tết, tri ân đối tác, sự kiện, nội bộ. Thiết kế riêng, nguồn hàng tuyển chọn, giao đến từng điểm nhận.',
    groups: giftOccasions.slice(0, 4).map((item): [string, string] => [item.title, `/qua-tang/${item.slug}`]),
    media: <Media ratio="5 / 4" tone="magenta" motion="box" art="silk" asset="Video loop bộ quà Tết mở nắp, ánh sáng ấm" alt="Minh họa hộp quà mở nắp" />,
    tone: 'canvas' as const,
  },
  {
    href: '/bao-bi',
    title: 'Bao bì thương hiệu',
    copy: 'Hộp, túi, thiệp và ấn phẩm cho thời trang, trang sức, mỹ phẩm, FMCG.',
    groups: [...packagingGroups.slice(0, 3).map((item): [string, string] => [item.title, `/bao-bi/${item.slug}`]), ['Bao bì theo ngành', '/bao-bi'] as [string, string]],
    media: <Media ratio="5 / 4" tone="paper" motion="layers" art="tea" asset="Video các lớp bao bì tách ra rồi ghép lại" alt="Minh họa các lớp bao bì" />,
    tone: 'deep' as const,
  },
  {
    href: '/vat-pham',
    title: 'Vật phẩm quảng cáo',
    copy: 'Vật phẩm sự kiện, vật phẩm thương hiệu, POSM. Vận hành ở quy mô lớn nhiều năm.',
    groups: merchandiseGroups.map((item): [string, string] => [item.title, `/vat-pham/${item.slug}`]),
    media: <Media ratio="5 / 4" tone="canvas" motion="kit" art="slate" asset="Video bộ vật phẩm lần lượt xuất hiện trong kit" alt="Minh họa bộ vật phẩm" />,
    tone: 'sage' as const,
  },
];

export function HomePage() {
  return (
    <SiteShell>
      {/* 1. Hero statement */}
      <EditorialHero
        className="home-hero"
        layout="split"
        size="xl"
        brandTitle
        label="Quà tặng · Bao bì · Vật phẩm"
        title={<>Relationships,<br /><span className="accent">compounded.</span></>}
        lead={<><p className="home-hero-sub">Mối quan hệ, được nhân lên theo thời gian.</p><p>BOND thiết kế và sản xuất trọn gói quà tặng doanh nghiệp, bao bì và vật phẩm quảng cáo. Thành viên hệ sinh thái 100B.</p></>}
        actions={<><ButtonLink href="/bo-suu-tap">Xem bộ sưu tập</ButtonLink><ButtonLink href="/lien-he" variant="secondary">Trao đổi cùng BOND</ButtonLink></>}
        aside={<p className="home-hero-aside"><span className="t-label">Design-led production since 2019</span><br />Một món quà đúng lúc có thể mở ra một mùa hợp tác mới.</p>}
        media={<Media ratio="4 / 5" tone="deep" motion="box" art="magenta" priority asset="Ảnh hero: bộ quà BOND đã sản xuất, still-life trên nền giấy" alt="Minh họa hộp quà BOND mở nắp" />}
      />

      {/* 2. Brand proposition */}
      <Section tone="magenta" className="home-meaning">
        <div className="home-meaning-grid">
          <Reveal className="home-meaning-head">
            <Label>01 — Vì sao là BOND</Label>
            <h2 className="t-display-l">Một món quà<br />không phải chi phí.</h2>
          </Reveal>
          <Reveal className="home-meaning-body" delay={1}>
            <p className="t-h3">Chúng tôi tin quà tặng doanh nghiệp vận hành như một khoản đầu tư vào mối quan hệ.</p>
            <p className="t-body-l">Trong tiếng Anh, bond là sợi dây gắn kết giữa người với người. Cũng là một khoản đầu tư sinh lời theo thời gian.</p>
            <p className="t-body-l">Giá trị của nó được nhân lên qua từng mùa. Mỗi phần quà BOND làm ra đều mang một câu hỏi duy nhất: khi người nhận mở ra, họ cảm thấy mình quan trọng đến mức nào?</p>
            <p className="t-h4 home-meaning-sign">Thiết kế để được nhớ. Sản xuất để được tin.</p>
          </Reveal>
        </div>
      </Section>

      {/* 3. Ba dòng dịch vụ: ba chapter lớn */}
      <Section tone="canvas" spacing="top">
        <SectionIntro label="02 — Chúng tôi làm gì" title={<>Từ ý tưởng<br />đến điểm giao.</>}>
          Một đầu mối cho những điểm chạm thương hiệu cần được làm đến nơi đến chốn.
        </SectionIntro>
      </Section>
      {serviceChapters.map((chapter, index) => (
        <Chapter
          key={chapter.href}
          number={index + 1}
          total={3}
          tone={chapter.tone}
          reverse={index % 2 === 1}
          spacing={index === 0 ? 'tight' : 'default'}
          title={chapter.title}
          media={chapter.media}
          footer={<TextLink href={chapter.href}>Xem {chapter.title.toLowerCase()}</TextLink>}
        >
          <p className="t-body-l">{chapter.copy}</p>
          <ul className="item-list">
            {chapter.groups.map(([label, href]) => (
              <li key={label}><Link href={href}><span>{label}</span><ArrowUpRight size={18} aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </Chapter>
      ))}

      {/* 4. Ecosystem proof */}
      <Section tone="ink" className="home-ecosystem">
        <div className="eco-grid">
          <Reveal className="eco-head">
            <Label>03 — Hệ sinh thái</Label>
            <h2 className="t-h1">ZAD nghĩ ra.<br />BOND làm ra.<br /><span className="eco-muted">100B đứng sau.</span></h2>
            <p className="t-body-l eco-intro">Anh chị làm việc với một đầu mối. Phía sau là một hệ sinh thái đã vận hành nhiều năm.</p>
          </Reveal>
          <div className="eco-stack">
            {ecosystem.map((unit, index) => (
              <Reveal className="eco-row" key={unit.name} delay={(index + 1) as 1 | 2 | 3}>
                <div className={`eco-plate eco-plate-${unit.name.toLowerCase()}`}><img src={unit.logo} alt={unit.name} loading="lazy" /></div>
                <div>
                  <h3 className="t-h4">{unit.role}</h3>
                  <p>{unit.copy}</p>
                </div>
              </Reveal>
            ))}
            <p className="t-h4 eco-close">Một hợp đồng thay vì ba.<br />Một người chịu trách nhiệm khi có sự cố.</p>
          </div>
        </div>
        <div className="eco-partners">
          <LogoWall title="Các thương hiệu đã đồng hành cùng hệ sinh thái 100B" items={partners} />
        </div>
      </Section>

      {/* 5. Bộ sưu tập nổi bật: card lớn */}
      <Section tone="paper">
        <SectionIntro label="04 — Bộ sưu tập" title={<>Chọn một<br />hướng đi.</>}>
          <p>Hơn 40 thiết kế, ở mọi mức ngân sách, đều có thể phát triển thành phiên bản riêng của thương hiệu anh chị.</p>
          <p><TextLink href="/bo-suu-tap">Xem toàn bộ thư viện</TextLink></p>
        </SectionIntro>
        <div className="home-collection-grid">
          {catalog.slice(0, 4).map((product) => <CollectionCard key={product.slug} product={product} />)}
        </div>
      </Section>

      {/* 6. Quy trình */}
      <Section tone="canvas" className="home-process">
        <div className="home-process-grid">
          <div className="home-process-copy">
            <SectionIntro align="stack" label="05 — Quy trình" title={<>Rõ từng mốc.<br />Chắc từng bước.</>}>
              Đơn thiết kế riêng thường mất 6—10 tuần từ brief đến giao hàng. Chúng tôi nói rõ ngay từ đầu.
            </SectionIntro>
            <ol className="step-list">
              {processSteps.slice(0, 5).map((step) => (
                <li key={step.number}>
                  <span className="t-numeral step-list-no">{step.number}</span>
                  <div>
                    <h3 className="t-h4">{step.title}</h3>
                    <p className="t-small t-muted">{step.duration} · {step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink href="/quy-trinh" variant="secondary">Xem quy trình đầy đủ</ButtonLink>
          </div>
          <div className="home-process-media">
            <Media ratio="4 / 5" tone="sage" motion="journey-production" art="magenta" asset="Video hậu trường sản xuất và đóng gói (ảnh thật)" alt="Minh họa dây chuyền sản xuất và đóng gói" />
          </div>
        </div>
      </Section>

      {/* 7. Dự án tiêu biểu */}
      <Section tone="deep" spacing="top">
        <SectionIntro label="06 — Dự án & quy mô" title={<>Làm thật.<br />Ở quy mô thật.</>}>
          <p>Một vài lát cắt từ những bài toán cần cả ý tưởng lẫn năng lực triển khai.</p>
          <p><TextLink href="/du-an">Xem tất cả dự án</TextLink></p>
        </SectionIntro>
        <div className="home-projects-grid">
          <ProjectCard project={projects[0]} variant="feature" index={0} />
          <ProjectCard project={projects[1]} variant="tall" index={1} />
          <ProjectCard project={projects[2]} variant="tall" index={2} />
        </div>
      </Section>
      <MetricBand
        tone="deep"
        items={[
          { value: '100B', label: 'quy mô đội ngũ từng vận hành mỗi năm' },
          { value: '02', label: 'quốc gia trong mạng lưới sản xuất' },
          { value: '03', label: 'đơn vị trong một hệ sinh thái' },
        ]}
      />

      {/* 8. CTA liên hệ */}
      <FinalCta
        label="07 — Bắt đầu từ đây"
        title={<>Mùa Tết 2027 bắt đầu <em>từ bây giờ.</em></>}
        copy="Tết 2027 rơi vào ngày 6 tháng 2. Để kịp thiết kế riêng và sản xuất, thời điểm an toàn để bắt đầu là trước giữa tháng 10."
        aside={<div className="final-cta-form"><ContactForm surface="dark" /></div>}
      />
    </SiteShell>
  );
}
