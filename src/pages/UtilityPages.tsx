import { type FormEvent, useState } from 'react';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { BondGlyph } from '@/components/bond/BondGlyph';
import { ContactForm } from '@/components/bond/ContactForm';
import { Accordion, Button, ButtonLink, ChapterNumber, Field, Label, SectionIntro, TextLink, TrustRow } from '@/components/bond/primitives';
import { EditorialHero, FinalCta, Section } from '@/components/bond/sections';

/* ---------- /lien-he ---------- */

export function ContactPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Liên hệ' }]} />
      <section className="section tone-canvas contact">
        <div className="container contact-grid">
          <div className="contact-intro">
            <Label className="hero-label">Bắt đầu từ đây</Label>
            <h1 className="t-display-l">Mở một bài toán cùng BOND.</h1>
            <p className="t-body-l t-muted">Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng. Nếu chưa rõ ngân sách, BOND sẽ đề xuất khoảng phù hợp với nhóm người nhận.</p>
            <BondGlyph className="contact-glyph" />
          </div>
          <div className="contact-panel">
            <ContactForm />
            <TrustRow />
          </div>
        </div>
      </section>
      <Section tone="paper">
        <div className="contact-prep">
          <div>
            <Label>Thông tin cần chuẩn bị</Label>
            <h2 className="t-h2">Không cần một brief hoàn hảo để bắt đầu.</h2>
          </div>
          <ul className="check-list t-body-l">
            <li>File nhận diện thương hiệu</li>
            <li>Danh sách nhóm người nhận và số lượng</li>
            <li>Danh sách điểm giao</li>
            <li>Người đầu mối ký duyệt</li>
          </ul>
          <p className="contact-terms"><strong>Hợp đồng mua bán, hóa đơn VAT đầy đủ.</strong><br />Đặt cọc tối đa 50% khi ký, thanh toán phần còn lại sau nghiệm thu.</p>
        </div>
      </Section>
    </SiteShell>
  );
}

/* ---------- /tai-lieu ---------- */

function DocumentMockup() {
  return (
    <div className="doc-mockup" aria-hidden="true">
      <div className="doc-page doc-page-3" />
      <div className="doc-page doc-page-2" />
      <div className="doc-cover">
        <img src="/assets/bond-logo.png" alt="" className="doc-cover-logo" />
        <div className="doc-cover-art"><span className="doc-cover-mark" /></div>
        <p className="doc-cover-title">Bộ sưu tập BOND</p>
        <p className="doc-cover-sub">PDF · Hướng thiết kế · Khung ngân sách · Quy trình</p>
      </div>
    </div>
  );
}

export function DocumentsPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Tài liệu' }]} />
      <section className="section tone-canvas documents-hero">
        <div className="container documents-grid">
          <div className="documents-copy">
            <Label className="hero-label">Tài liệu</Label>
            <h1 className="t-display-l">Nhận bộ sưu tập PDF.</h1>
            <p className="t-body-l t-muted">Để lại email công ty, BOND sẽ gửi bộ tài liệu phù hợp với mối quan tâm của anh chị.</p>
            {sent ? (
              <div className="form form-light form-success" role="status">
                <p className="t-h4">Đã nhận email của anh chị.</p>
                <p>BOND sẽ gửi bộ tài liệu phù hợp với mối quan tâm của anh chị.</p>
              </div>
            ) : (
              <form className="form documents-form" onSubmit={submit}>
                <Field id="documents-email" label="Email công ty" type="email" placeholder="email@congty.vn" />
                <Button type="submit">Nhận tài liệu</Button>
              </form>
            )}
          </div>
          <div className="documents-visual tone-deep">
            <DocumentMockup />
          </div>
        </div>
      </section>
      <Section tone="paper">
        <SectionIntro label="Anh chị sẽ nhận được gì" title="Bộ tài liệu gồm hướng thiết kế, khung ngân sách và quy trình làm việc cùng BOND." align="stack" />
        <ol className="doc-contents">
          {[
            ['Hướng thiết kế', 'Hơn 40 thiết kế do ZAD thực hiện dành riêng cho BOND.', 'colorway'],
            ['Khung ngân sách', 'Dưới 1 triệu, 1—2 triệu, 2—5 triệu và trên 5 triệu mỗi phần quà.', 'layers'],
            ['Quy trình làm việc cùng BOND', 'Bảy bước từ trao đổi ban đầu đến giao hàng.', 'journey-delivery'],
          ].map(([title, copy, motion], index) => (
            <li key={title}>
              <Media ratio="4 / 3" tone="canvas" motion={motion as 'layers'} art="magenta" play="hover" alt="" />
              <ChapterNumber n={index + 1} total={3} />
              <h3 className="t-h3">{title}</h3>
              <p className="t-muted">{copy}</p>
            </li>
          ))}
        </ol>
      </Section>
    </SiteShell>
  );
}

/* ---------- /cau-hoi-thuong-gap ---------- */

const faqGroups = [
  { title: 'Sản lượng và thời gian', questions: ['Sản lượng tối thiểu là bao nhiêu?', 'BOND có thể làm đơn gấp không?'] },
  { title: 'Thiết kế và quyền sở hữu', questions: ['Thiết kế riêng có tính phí riêng không?', 'Ai giữ quyền sở hữu thiết kế?'] },
  { title: 'Hợp đồng và giao hàng', questions: ['Có xuất hóa đơn VAT không?', 'Giao nhiều địa chỉ có tính thêm phí không?'] },
];
const faqAnswer = 'BOND sẽ tư vấn theo dịp, số lượng, ngân sách và thời điểm cần hàng. Các thông tin cụ thể được ghi rõ trong phương án và hợp đồng trước khi triển khai.';

export function FaqPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Câu hỏi thường gặp' }]} />
      <EditorialHero layout="text" size="l" label="Câu hỏi thường gặp" title="Những điều cần biết trước khi bắt đầu." lead="Các câu hỏi phổ biến về sản lượng, thiết kế, nguồn hàng, VAT và giao nhiều địa chỉ." />
      <Section tone="canvas" spacing="bottom">
        <div className="faq-groups">
          {faqGroups.map((group) => (
            <div key={group.title} className="faq-group">
              <h2 className="t-h3 faq-group-title">{group.title}</h2>
              <Accordion items={group.questions.map((question) => ({ question, answer: faqAnswer }))} />
            </div>
          ))}
        </div>
      </Section>
      <FinalCta tone="deep" title="Mở một bài toán cùng BOND." actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>} />
    </SiteShell>
  );
}

/* ---------- /tuyen-dung ---------- */

export function CareersPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Tuyển dụng' }]} />
      <EditorialHero
        layout="stacked"
        size="l"
        label="Tuyển dụng"
        title="Làm những điều đáng để nhớ."
        lead="BOND ưu tiên những vị trí vận hành, nơi sự chỉn chu được biến thành trải nghiệm cho người nhận."
        media={<Media ratio="21 / 9" tone="sage" priority asset="Ảnh văn hóa làm việc thật của đội ngũ BOND" alt="Đội ngũ BOND làm việc" />}
      />
      <Section tone="paper">
        <SectionIntro label="Cách BOND làm việc" title={<>Thiết kế trước.<br />Sản xuất sau.</>} />
        <ol className="principle-list principle-list-light">
          {[
            ['Thiết kế trước, sản xuất sau', 'Không ép thương hiệu vào mẫu có sẵn chỉ vì dễ sản xuất.'],
            ['Một đầu mối', 'ZAD, BOND và 100B cùng đứng sau một cam kết rõ ràng.'],
            ['Cam kết bằng mốc ngày', 'Nói rõ tiến độ trước khi bắt đầu và chủ động khi có thay đổi.'],
          ].map(([title, copy], index) => (
            <li key={title}>
              <ChapterNumber n={index + 1} />
              <h3 className="t-h2">{title}</h3>
              <p className="t-body-l">{copy}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="canvas">
        <div className="people-gallery">
          <Media ratio="4 / 5" tone="deep" asset="Ảnh đội ngũ vận hành tại kho" alt="Đội ngũ vận hành" />
          <Media ratio="4 / 3" tone="paper" asset="Ảnh buổi duyệt mẫu nội bộ" alt="Buổi duyệt mẫu nội bộ" />
          <Media ratio="1 / 1" tone="sage" asset="Ảnh đội ngũ trong ngày giao hàng" alt="Đội ngũ trong ngày giao hàng" />
        </div>
      </Section>
      <Section tone="deep">
        <div className="jobs">
          <SectionIntro label="Vị trí đang tuyển" title="Danh sách vị trí." align="stack" />
          <div className="jobs-empty">
            <p className="t-body-l">Hiện chưa có vị trí được đăng tại đây.</p>
            <TextLink href="/lien-he">Liên hệ cùng BOND</TextLink>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

/* ---------- Chính sách, điều khoản ---------- */

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const config = {
    privacy: ['Chính sách bảo mật', 'BOND giữ thông tin của anh chị như thế nào.', 'Chúng tôi chỉ sử dụng thông tin được cung cấp để tư vấn, chuẩn bị phương án và liên hệ theo yêu cầu.'],
    terms: ['Điều khoản', 'Các nguyên tắc khi làm việc cùng BOND.', 'Nội dung dưới đây là khung thông tin tham khảo cho quá trình trao đổi và ký kết.'],
  }[kind];
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: config[0] }]} />
      <article className="legal">
        <header className="container legal-head">
          <Label className="hero-label">{config[0]}</Label>
          <h1 className="t-h1">{config[1]}</h1>
        </header>
        <div className="container">
          <div className="legal-body">
            <p className="legal-lede">{config[2]}</p>
            <p>BOND tôn trọng sự riêng tư, quyền sở hữu trí tuệ và những thỏa thuận bảo mật trong quá trình làm việc. Mọi thông tin chi tiết sẽ được xác nhận trong văn bản phù hợp với từng dự án.</p>
            <p>Để trao đổi cụ thể, anh chị có thể <TextLink href="/lien-he">liên hệ cùng BOND</TextLink>.</p>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}

/* ---------- 404 ---------- */

export function NotFoundPage() {
  return (
    <SiteShell>
      <section className="section tone-canvas not-found">
        <div className="container not-found-inner">
          <BondGlyph className="not-found-glyph" />
          <h1 className="t-h1">Trang không tồn tại.</h1>
          <ButtonLink href="/">Về trang chủ</ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}

