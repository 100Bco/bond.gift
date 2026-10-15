import { Check } from 'lucide-react';
import { ButtonLink, Label } from './primitives';

/*
 * Ba cách hợp tác đặt cạnh nhau để người ra quyết định so sánh trong một lần nhìn.
 * Không dùng tab hay carousel: mọi thông tin hiển thị cùng lúc.
 * Toàn bộ dữ kiện lấy từ nội dung hiện có của BOND.
 */
const models = [
  {
    no: '01',
    title: 'Chọn từ bộ sưu tập',
    timing: '3—4',
    unit: 'tuần',
    timingNote: 'chọn mẫu có sẵn, tùy biến logo',
    points: ['Chọn một trong hơn 40 thiết kế mẫu', 'Tùy biến phần nhận diện thương hiệu', 'Phù hợp khi anh chị đang gấp'],
    cta: ['/bo-suu-tap', 'Xem bộ sưu tập'],
    featured: false,
  },
  {
    no: '02',
    title: 'Thiết kế riêng trọn gói',
    timing: '6—10',
    unit: 'tuần',
    timingNote: 'từ brief đến giao hàng',
    points: ['Thiết kế do ZAD thực hiện riêng cho thương hiệu', 'Hai vòng chỉnh sửa, cầm mẫu thật trước khi sản xuất', 'Mẫu hoàn thiện thuộc về riêng anh chị'],
    cta: ['/quy-trinh', 'Xem quy trình'],
    featured: true,
  },
  {
    no: '03',
    title: 'Độc quyền theo sản lượng',
    timing: 'Signature',
    unit: '',
    timingNote: 'mẫu BOND giữ cho riêng mình',
    points: ['Một số mẫu có thể chuyển nhượng độc quyền', 'BOND ngừng sử dụng mẫu đó cho mọi khách hàng khác', 'Kèm cam kết sản lượng tối thiểu'],
    cta: ['/bo-suu-tap/signature', 'Xem BOND Signature'],
    featured: false,
  },
] as const;

export function EngagementModels({ title = 'Ba cách hợp tác' }: { title?: string }) {
  return (
    <section className="section tone-paper section-space-default engagement">
      <div className="container">
        <header className="engagement-head">
          <Label>{title}</Label>
          <h2 className="t-h2">Chọn từ bộ sưu tập, thiết kế riêng trọn gói, hoặc độc quyền theo sản lượng.</h2>
          <p className="t-body-l t-muted">Thiết kế riêng ở mọi mức ngân sách. Khác biệt nằm ở chất liệu, kỹ thuật gia công và sản phẩm bên trong.</p>
        </header>
        <ol className="engagement-grid">
          {models.map((model) => (
            <li key={model.no} className={`engagement-card ${model.featured ? 'is-featured tone-ink' : ''}`}>
              <div className="engagement-top">
                <span className="t-numeral engagement-no">{model.no}</span>
                {model.featured && <span className="engagement-badge">Cách làm của BOND</span>}
              </div>
              <h3 className="t-h3">{model.title}</h3>
              <p className="engagement-timing">
                <span><span className="t-numeral">{model.timing}</span>{model.unit && <span className="engagement-unit"> {model.unit}</span>}</span>
                <span>{model.timingNote}</span>
              </p>
              <ul className="engagement-points">
                {model.points.map((point) => (
                  <li key={point}><Check size={18} aria-hidden="true" />{point}</li>
                ))}
              </ul>
              <ButtonLink href={model.cta[0]} variant={model.featured ? 'primary' : 'secondary'} className="engagement-cta">{model.cta[1]}</ButtonLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
