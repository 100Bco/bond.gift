import { ecosystem } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Reveal } from '@/components/bond/Reveal';
import { BondGlyph } from '@/components/bond/BondGlyph';
import { ButtonLink, ChapterNumber, Label, SectionIntro, TextLink } from '@/components/bond/primitives';
import { EditorialHero, FinalCta, Section, Statement } from '@/components/bond/sections';

const principles = [
  ['Thiết kế trước, sản xuất sau', 'Không ép thương hiệu vào mẫu có sẵn chỉ vì dễ sản xuất.'],
  ['Một đầu mối', 'ZAD, BOND và 100B cùng đứng sau một cam kết rõ ràng.'],
  ['Cam kết bằng mốc ngày', 'Nói rõ tiến độ trước khi bắt đầu và chủ động khi có thay đổi.'],
];

export function AboutPage() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Về BOND' }]} />
      {/* 1. Emotional brand hero */}
      <EditorialHero
        layout="stacked"
        size="l"
        label="Về BOND"
        title={<>Cái tên nói đúng<br />việc chúng tôi làm.</>}
        lead="BOND thiết kế và sản xuất trọn gói quà tặng doanh nghiệp, bao bì và vật phẩm quảng cáo cho các thương hiệu lớn tại Việt Nam."
        media={<Media ratio="21 / 9" tone="deep" priority asset="Ảnh hậu trường thật: đội ngũ BOND kiểm mẫu tại xưởng" alt="Đội ngũ BOND kiểm mẫu tại xưởng" />}
      />

      {/* 2. Ý nghĩa tên BOND */}
      <Section tone="paper" className="about-name">
        <div className="about-name-grid">
          <BondGlyph className="about-name-glyph" />
          <Reveal className="about-name-copy">
            <Label>Ý nghĩa tên gọi</Label>
            <p className="t-h1">Trong tiếng Anh, bond là sợi dây gắn kết giữa người với người.</p>
            <p className="t-h3 t-muted">Cũng là từ chỉ một khoản đầu tư sinh lời theo thời gian.</p>
          </Reveal>
        </div>
      </Section>

      {/* 3. Manifesto: một đối lập rõ ràng */}
      <Section tone="canvas" className="about-manifesto">
        <div className="manifesto-grid">
          <Reveal className="manifesto-before">
            <Label>Phần lớn quà tặng doanh nghiệp</Label>
            <p className="t-h3">Được mua như một nghĩa vụ. Chốt gấp vào tháng cuối năm, chọn mẫu có sẵn, in logo lên, gửi đi. Người nhận mở ra, quên trong một tuần.</p>
          </Reveal>
          <Reveal className="manifesto-after" delay={1}>
            <Label>BOND làm ngược lại</Label>
            <p className="t-h2">Bắt đầu từ việc người nhận là ai và anh chị muốn họ cảm thấy gì.</p>
            <p className="t-body-l">Rồi mới đến thiết kế, chất liệu, sản phẩm bên trong và cách hộp được mở ra.</p>
          </Reveal>
        </div>
      </Section>

      {/* 4. BOND làm gì */}
      <Section tone="sage" className="about-what">
        <SectionIntro label="BOND làm gì" title={<>Từ ý tưởng<br />đến điểm giao.</>}>
          Thiết kế do ZAD thực hiện, nguồn hàng do BOND tuyển chọn, sản xuất và giao hàng do BOND kiểm soát.
        </SectionIntro>
        <div className="grid-3 about-what-grid">
          {[
            ['/qua-tang', 'Quà tặng doanh nghiệp', 'box', 'magenta'],
            ['/bao-bi', 'Bao bì thương hiệu', 'layers', 'tea'],
            ['/vat-pham', 'Vật phẩm quảng cáo', 'kit', 'slate'],
          ].map(([href, title, motion, art]) => (
            <div key={href} className="about-what-item">
              <Media ratio="1 / 1" tone="canvas" motion={motion as 'box'} art={art as 'magenta'} play="hover" alt="" />
              <h3 className="t-h3">{title}</h3>
              <TextLink href={href}>Xem {title.toLowerCase()}</TextLink>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Nguyên tắc làm việc */}
      <Section tone="magenta" className="about-principles">
        <SectionIntro label="Ba điều BOND giữ" title={<>Thiết kế trước.<br />Sản xuất sau.</>}>
          Một đầu mối. Cam kết bằng mốc ngày. Mỗi quyết định đều quay về cảm giác của người nhận và sự yên tâm của người đặt hàng.
        </SectionIntro>
        <ol className="principle-list">
          {principles.map(([title, copy], index) => (
            <Reveal as="li" key={title} delay={(index + 1) as 1 | 2 | 3}>
              <ChapterNumber n={index + 1} />
              <h3 className="t-h2">{title}</h3>
              <p className="t-body-l">{copy}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 5. Hệ sinh thái 100B */}
      <Section tone="canvas">
        <SectionIntro label="Hệ sinh thái" title="Ba vai trò. Một trách nhiệm.">
          Anh chị không cần điều phối ba nhà cung cấp cho một món quà.
        </SectionIntro>
        <div className="role-grid">
          {ecosystem.map((unit) => (
            <article key={unit.name} className="role-card">
              <div className={`eco-plate eco-plate-${unit.name.toLowerCase()}`}><img src={unit.logo} alt={unit.name} loading="lazy" /></div>
              <h3 className="t-h3">{unit.role}</h3>
              <p className="t-muted">{unit.copy}</p>
            </article>
          ))}
        </div>
        <div className="about-eco-link"><TextLink href="/nang-luc/he-sinh-thai-100b">Xem năng lực hệ sinh thái 100B</TextLink></div>
      </Section>

      {/* 7. Con người và hậu trường */}
      <Section tone="deep" className="about-people">
        <SectionIntro label="Hậu trường" title="Những người làm ra từng phần quà." align="stack" />
        <div className="people-gallery">
          <Media ratio="4 / 5" tone="paper" asset="Chân dung đội ngũ BOND tại văn phòng" alt="Đội ngũ BOND" />
          <Media ratio="4 / 3" tone="sage" asset="Ảnh đội ZAD làm việc với mẫu màu và dieline" alt="Đội ZAD làm việc với mẫu màu" />
          <Media ratio="1 / 1" tone="paper" asset="Ảnh kiểm đếm, đóng gói tại kho" alt="Kiểm đếm và đóng gói tại kho" />
        </div>
      </Section>

      {/* 8. Brand statement */}
      <Statement tone="canvas" align="center" after={<ButtonLink href="/du-an" variant="secondary">Xem dự án đã làm</ButtonLink>}>
        Thiết kế để được nhớ.<br /><span className="accent">Sản xuất để được tin.</span>
      </Statement>

      {/* 9. CTA */}
      <FinalCta
        label="Bắt đầu từ đây"
        title="Mở một bài toán cùng BOND."
        copy="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng."
        actions={<ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>}
      />
    </SiteShell>
  );
}
