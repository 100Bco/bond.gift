import { useRoute } from 'wouter';
import { projects } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { ButtonLink, ChapterNumber, FilterChips, Label, SectionIntro, TextLink } from '@/components/bond/primitives';
import { EditorialHero, FinalCta, Section, Statement } from '@/components/bond/sections';
import { ProjectCard } from '@/components/bond/cards';

/* ---------- /du-an ---------- */

export function ProjectsPage() {
  const [featured, ...rest] = projects;
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Dự án' }]} />
      <EditorialHero
        layout="text"
        size="l"
        label="Dự án"
        title={<>Làm thật.<br />Ở quy mô thật.</>}
        lead="Một số dự án được trình bày ẩn danh theo thỏa thuận bảo mật với khách hàng. Thiết kế: ZAD. Sản xuất và triển khai: BOND. Thành viên hệ sinh thái 100B."
      />
      <Section tone="canvas" spacing="bottom">
        {/* Bộ lọc giữ nguyên hành vi của phiên bản trước: hiện chỉ có trạng thái "Tất cả". */}
        <div className="projects-toolbar">
          <FilterChips label="Lọc dự án" options={['Tất cả', 'Ngành', 'Vật phẩm', 'Loại dự án']} value="Tất cả" onChange={() => undefined} />
        </div>
        <h2 className="sr-only">Danh sách dự án</h2>
        <div className="projects-featured">
          <ProjectCard project={featured} variant="feature" index={0} />
        </div>
        <div className="grid-3">
          {rest.map((project, index) => <ProjectCard key={project.slug} project={project} variant="square" index={index + 1} />)}
        </div>
      </Section>
      <FinalCta
        label="Dự án tiếp theo"
        title="Trao đổi dự án tương tự."
        copy="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}

/* ---------- /du-an/:slug ---------- */

export function ProjectDetailPage() {
  const [, params] = useRoute('/du-an/:slug');
  const project = projects.find((item) => item.slug === params?.slug) ?? projects[0];
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2);
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Dự án', href: '/du-an' }, { label: project.title }]} />

      {/* 1. Project hero */}
      <EditorialHero
        layout="stacked"
        size="l"
        label="Case study"
        title={project.title}
        lead="Một bài toán cần được nhìn từ bối cảnh, yêu cầu, cách giải và kết quả — không chỉ từ một hình ảnh đẹp."
        aside={
          <dl className="case-facts">
            <div><dt>Ngành</dt><dd>{project.industry}</dd></div>
            <div><dt>Phạm vi</dt><dd>{project.scope}</dd></div>
            {project.year && <div><dt>Năm</dt><dd>{project.year}</dd></div>}
          </dl>
        }
        media={<Media ratio="16 / 9" tone="deep" priority asset={`Ảnh hero dự án thật: ${project.asset.toLowerCase()}`} alt={project.title} />}
      />

      {/* 2. Tóm tắt brief */}
      <Section tone="canvas" spacing="tight">
        <div className="case-row">
          <Label>01 · Bối cảnh</Label>
          <p className="t-h3">Thương hiệu cần một giải pháp đủ khác biệt để tạo cảm giác được trân trọng, nhưng vẫn cần vận hành ổn định ở quy mô lớn và nhiều mốc giao.</p>
        </div>
      </Section>

      {/* 3. Phạm vi triển khai */}
      <Section tone="canvas" spacing="tight">
        <div className="case-row">
          <Label>02 · Phạm vi triển khai</Label>
          <dl className="spec-list case-scope">
            <div><dt>Thiết kế</dt><dd>ZAD</dd></div>
            <div><dt>Sản xuất và triển khai</dt><dd>BOND</dd></div>
            <div><dt>Đứng sau</dt><dd>Hệ sinh thái 100B</dd></div>
            {project.summary && <div><dt>Hạng mục</dt><dd>{project.summary}</dd></div>}
          </dl>
        </div>
      </Section>

      {/* 4. Concept */}
      <Statement tone="paper" label="03 · Concept">
        Để một ý tưởng đi được đến tay người nhận.
      </Statement>

      {/* 5. Quá trình phát triển */}
      <Section tone="canvas">
        <div className="case-split">
          <Media ratio="4 / 5" tone="sage" asset="Ảnh quá trình: phác thảo, mẫu màu, mẫu vật lý" alt="Quá trình phát triển mẫu" />
          <Reveal className="case-split-copy">
            <ChapterNumber n={4} />
            <h2 className="t-h2">Cách giải</h2>
            <p className="t-body-l">BOND gom thiết kế, nguồn hàng, sản xuất, đóng gói và giao hàng về một đầu mối. Mẫu thật được duyệt trước khi đi vào sản xuất.</p>
          </Reveal>
        </div>
      </Section>

      {/* 6. Chi tiết sản phẩm */}
      <Section tone="canvas" spacing="bottom">
        <SectionIntro label="05" title="Chi tiết sản phẩm." align="stack" />
        <div className="grid-2">
          <Media ratio="1 / 1" tone="paper" asset="Cận chi tiết hoàn thiện: ép kim, dập nổi, đường bồi" alt="Chi tiết hoàn thiện sản phẩm" />
          <Media ratio="1 / 1" tone="deep" asset="Ruột set và cách sắp xếp bên trong hộp" alt="Ruột set bên trong hộp" />
        </div>
      </Section>

      {/* 7. Production / delivery proof */}
      <Section tone="ink">
        <div className="case-split case-split-reverse">
          <Media ratio="3 / 2" tone="ink" asset="Ảnh thật: tập kết, kiểm đếm và giao hàng" alt="Tập kết, kiểm đếm và giao hàng" />
          <Reveal className="case-split-copy">
            <ChapterNumber n={6} />
            <h2 className="t-h2">Sản xuất và giao nhận</h2>
            <ul className="check-list">
              <li>Mẫu thật được duyệt trước khi đi vào sản xuất.</li>
              <li>Sản xuất, tập kết, đóng gói và kiểm đếm.</li>
              <li>Giao một điểm hoặc nhiều điểm, có biên bản bàn giao.</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 8. Kết quả */}
      <Statement tone="magenta" label="07 · Kết quả">
        Người đặt hàng có một hệ thống rõ mốc; người nhận có một món quà có lý do để nhớ.
      </Statement>

      {/* 9. Full-bleed gallery */}
      <section className="case-gallery tone-canvas">
        <Media ratio="21 / 9" tone="deep" shape="rect" className="case-gallery-wide" asset="Ảnh toàn cảnh bộ sản phẩm hoàn thiện" alt="Toàn cảnh bộ sản phẩm" />
        <div className="container case-gallery-pair">
          <Media ratio="4 / 5" tone="sage" asset="Ảnh người nhận mở quà (có đồng ý)" alt="Người nhận mở quà" />
          <Media ratio="4 / 5" tone="paper" asset="Ảnh chi tiết thiệp hoặc vật phẩm cá nhân hóa" alt="Chi tiết cá nhân hóa" />
        </div>
      </section>

      {/* 10. Dự án liên quan */}
      <Section tone="deep">
        <SectionIntro label="Dự án khác" title={<>Làm thật.<br />Ở quy mô thật.</>}>
          <TextLink href="/du-an">Xem tất cả dự án</TextLink>
        </SectionIntro>
        <div className="grid-2">
          {related.map((item, index) => <ProjectCard key={item.slug} project={item} variant="wide" index={index} />)}
        </div>
      </Section>

      <FinalCta
        title="Trao đổi dự án tương tự."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}
