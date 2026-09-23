import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { catalog, ecosystem, partners, projects } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { ButtonLink, Label, LogoWall, SectionIntro, TextLink, TrustRow } from '@/components/bond/primitives';
import { HomeStage } from '@/components/bond/HomeStage';
import { UnboxingStory } from '@/components/bond/UnboxingStory';
import { FinalCta, Section } from '@/components/bond/sections';
import { CollectionCard, ProjectCard } from '@/components/bond/cards';
import { ContactForm } from '@/components/bond/ContactForm';
import { Carousel } from '@/components/bond/Carousel';

const serviceChapters = [
  {
    href: '/qua-tang',
    title: 'Quà tặng doanh nghiệp',
    copy: 'Tết, tri ân đối tác, sự kiện, nội bộ.',
    media: <Media ratio="4 / 3" tone="magenta" motion="box" art="silk" asset="Video loop bộ quà Tết mở nắp, ánh sáng ấm" alt="Minh họa hộp quà mở nắp" />,
  },
  {
    href: '/bao-bi',
    title: 'Bao bì thương hiệu',
    copy: 'Hộp, túi, thiệp và ấn phẩm cho thời trang, trang sức, mỹ phẩm, FMCG.',
    media: <Media ratio="4 / 3" tone="paper" motion="layers" art="tea" asset="Video các lớp bao bì tách ra rồi ghép lại" alt="Minh họa các lớp bao bì" />,
  },
  {
    href: '/vat-pham',
    title: 'Vật phẩm quảng cáo',
    copy: 'Vật phẩm sự kiện, vật phẩm thương hiệu, POSM.',
    media: <Media ratio="4 / 3" tone="canvas" motion="kit" art="slate" asset="Video bộ vật phẩm lần lượt xuất hiện trong kit" alt="Minh họa bộ vật phẩm" />,
  },
];

export function HomePage() {
  return (
    <SiteShell>
      {/* 1. Hero tràn màn hình + dải đếm ngược Tết */}
      <HomeStage
        label="Quà tặng · Bao bì · Vật phẩm"
        title={<>Relationships, <span className="foil">compounded.</span></>}
        sub="Mối quan hệ, được nhân lên theo thời gian."
        actions={<><ButtonLink href="/bo-suu-tap">Xem bộ sưu tập</ButtonLink><ButtonLink href="/lien-he" variant="secondary">Trao đổi cùng BOND</ButtonLink></>}
        media={<Media ratio="auto" tone="paper" motion="box" art="magenta" priority asset="Ảnh / video hero toàn màn hình: bộ quà BOND trên nền sáng, nhiều khoảng trống phía trên" alt="Minh họa hộp quà BOND" />}
      />

      {/* 2. Tuyên ngôn: một ý, nhiều khoảng trống */}
      <Section tone="magenta" className="home-meaning">
        <Reveal className="home-meaning-inner">
          <Label>Vì sao là BOND</Label>
          <h2 className="t-display-l">Một món quà không phải chi phí.</h2>
          <p className="t-body-l">Chúng tôi tin quà tặng doanh nghiệp vận hành như một khoản đầu tư vào mối quan hệ.</p>
          <p className="home-meaning-sign">Thiết kế để được nhớ. Sản xuất để được tin.</p>
        </Reveal>
      </Section>

      {/* 3. Khoảnh khắc mở hộp theo thao tác cuộn */}
      <UnboxingStory />

      {/* 4. Ba dòng dịch vụ: ba card bằng nhau */}
      <Section tone="paper">
        <SectionIntro label="Dịch vụ" title="Ba dòng dịch vụ." />
        <div className="grid-3">
          {serviceChapters.map((chapter) => (
            <Link key={chapter.href} href={chapter.href} className="card card-service">
              {chapter.media}
              <div className="card-body">
                <h3 className="t-h3">{chapter.title}</h3>
                <p className="card-copy">{chapter.copy}</p>
                <span className="card-more" aria-hidden="true">Xem chi tiết<ArrowRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5. Hệ sinh thái */}
      <Section tone="ink" className="home-ecosystem">
        <div className="eco-grid">
          <Reveal className="eco-head">
            <Label>Hệ sinh thái</Label>
            <h2 className="t-h1">ZAD nghĩ ra.<br />BOND làm ra.<br /><span className="eco-muted">100B đứng sau.</span></h2>
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
          </div>
        </div>
        <div className="eco-partners">
          <LogoWall title="Các thương hiệu đã đồng hành cùng hệ sinh thái 100B" items={partners} />
        </div>
      </Section>

      {/* 6. Bộ sưu tập */}
      <Section tone="canvas">
        <SectionIntro label="Bộ sưu tập" title="Chọn một hướng đi.">
          <p><TextLink href="/bo-suu-tap">Xem toàn bộ thư viện</TextLink></p>
        </SectionIntro>
        <Carousel label="Bộ sưu tập nổi bật">
          {catalog.slice(0, 6).map((product) => <CollectionCard key={product.slug} product={product} />)}
        </Carousel>
      </Section>

      {/* 7. Dự án */}
      <Section tone="paper">
        <SectionIntro label="Dự án" title="Làm thật. Ở quy mô thật.">
          <p><TextLink href="/du-an">Xem tất cả dự án</TextLink></p>
        </SectionIntro>
        <div className="grid-3">
          {projects.slice(0, 3).map((project, index) => <ProjectCard key={project.slug} project={project} variant="square" index={index} />)}
        </div>
      </Section>

      {/* 8. CTA liên hệ */}
      <FinalCta
        label="Bắt đầu từ đây"
        title={<>Mùa Tết 2027 bắt đầu <em>từ bây giờ.</em></>}
        copy="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng."
        actions={<TrustRow />}
        aside={<div className="final-cta-form"><ContactForm surface="dark" /></div>}
      />
    </SiteShell>
  );
}
