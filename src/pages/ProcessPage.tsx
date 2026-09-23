import { useEffect, useState } from 'react';
import { faqQuestions, processSteps } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Accordion, ButtonLink, ChapterNumber, Label, SectionIntro } from '@/components/bond/primitives';
import { EditorialHero, FinalCta, Section } from '@/components/bond/sections';

const stepTones = ['deep', 'sage', 'paper', 'deep', 'sage', 'paper', 'deep'] as const;
const stepArt = ['magenta', 'kraft', 'tea', 'magenta', 'silk', 'slate', 'magenta'] as const;

/** Sơ đồ tiết chế: brief → concept → mẫu → sản xuất → giao hàng. */
export function JourneyDiagram() {
  const stages = ['Brief', 'Concept', 'Mẫu', 'Sản xuất', 'Giao hàng'];
  return (
    <ol className="journey" aria-label="Hành trình từ brief đến giao hàng">
      {stages.map((stage, index) => (
        <li key={stage} className="journey-stage">
          <span className="journey-node" aria-hidden="true" />
          <span className="t-numeral journey-no">{String(index + 1).padStart(2, '0')}</span>
          <span className="journey-name">{stage}</span>
        </li>
      ))}
    </ol>
  );
}

export function ProcessPage() {
  const [active, setActive] = useState(processSteps[0].number);
  useEffect(() => {
    const nodes = processSteps.map((step) => document.getElementById(`buoc-${step.number}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id.replace('buoc-', ''));
    }, { rootMargin: '-40% 0px -50% 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Quy trình' }]} />
      <EditorialHero
        layout="text"
        size="l"
        label="Từ brief đến giao hàng"
        title={<>Quy trình<br />đặt hàng.</>}
        lead="Một đơn quà tặng doanh nghiệp thiết kế riêng thường mất 6 đến 10 tuần từ lúc chốt brief đến khi giao hàng. Đơn chọn từ mẫu có sẵn và chỉ tùy biến logo mất khoảng 3 đến 4 tuần."
      />
      <Section tone="canvas" spacing="bottom">
        <JourneyDiagram />
      </Section>

      <section className="section tone-canvas section-space-bottom process-steps">
        <div className="container sticky-layout">
          <nav className="sticky-index" aria-label="Các bước quy trình">
            {processSteps.map((step) => (
              <a key={step.number} href={`#buoc-${step.number}`} className={active === step.number ? 'is-active' : ''} aria-current={active === step.number ? 'step' : undefined}>
                <span className="t-numeral">{step.number}</span>{step.title}
              </a>
            ))}
          </nav>
          <div className="sticky-content">
            {processSteps.map((step, index) => (
              <article key={step.number} id={`buoc-${step.number}`} className={`step-chapter tone-${stepTones[index]}`}>
                <div className="step-chapter-copy">
                  <ChapterNumber n={step.number} total={processSteps.length} />
                  <h2 className="t-h2">{step.title}</h2>
                  <p className="t-body-l">{step.copy}</p>
                  <dl className="step-facts">
                    <div><dt>Thời gian</dt><dd>{step.duration}</dd></div>
                    <div><dt>Đầu ra</dt><dd>{step.output}</dd></div>
                  </dl>
                </div>
                <div className="step-chapter-media">
                  <Media ratio="1 / 1" tone="canvas" motion={step.motion} art={stepArt[index]} asset={`Ảnh đầu ra thật của bước: ${step.output.toLowerCase()}`} alt={`Minh họa đầu ra: ${step.output}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section tone="deep">
        <div className="callout-grid">
          <article className="callout">
            <Label>Nếu anh chị đang gấp</Label>
            <h2 className="t-h3">Khoảng 3 tuần là thời gian tối thiểu khả thi.</h2>
            <p className="t-muted">Chọn mẫu có sẵn trong bộ sưu tập và chỉ tùy biến phần nhận diện, với điều kiện chốt ruột set trong tuần đầu.</p>
          </article>
          <article className="callout">
            <Label>Anh chị cần chuẩn bị gì</Label>
            <h2 className="t-h3">File nhận diện, danh sách người nhận và mốc duyệt.</h2>
            <p className="t-muted">Thêm danh sách điểm giao và người đầu mối ký duyệt để BOND lên phương án sát thực tế.</p>
          </article>
        </div>
        <ul className="terms-strip">
          <li>Hợp đồng mua bán</li>
          <li>Hóa đơn VAT đầy đủ</li>
          <li>Đặt cọc tối đa 50% khi ký</li>
          <li>Thanh toán phần còn lại sau nghiệm thu</li>
        </ul>
      </Section>

      <Section tone="canvas">
        <div className="faq-layout">
          <SectionIntro align="stack" label="Câu hỏi thường gặp" title="Những điều cần biết trước khi bắt đầu." />
          <Accordion items={faqQuestions.map((question) => ({ question, answer: 'BOND sẽ trao đổi cụ thể theo số lượng, mức tùy biến, thời điểm cần hàng và cấu phần của từng dự án. Các mốc và trách nhiệm sẽ được ghi rõ trong đề xuất và hợp đồng.' }))} />
        </div>
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
