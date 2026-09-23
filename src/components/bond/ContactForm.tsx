import { type FormEvent, useState } from 'react';
import { Button, Field } from './primitives';

/** Form brief. Giữ nguyên hành vi cũ: gửi thành công hiển thị trạng thái xác nhận tại chỗ. */
export function ContactForm({ surface = 'light' }: { surface?: 'light' | 'dark' }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className={`form form-${surface} form-success`} role="status">
        <p className="t-h3">Đã nhận lời nhắn.</p>
        <p className="t-body-l">BOND sẽ liên hệ để cùng anh chị mở bài toán phù hợp.</p>
      </div>
    );
  }
  return (
    <form className={`form form-${surface}`} onSubmit={handleSubmit}>
      <div className="form-row">
        <Field id="contact-name" label="Tên người liên hệ" placeholder="Anh chị tên là..." />
        <Field id="contact-company" label="Công ty" placeholder="Tên doanh nghiệp" />
      </div>
      <Field id="contact-email" label="Email công ty" type="email" placeholder="email@congty.vn" />
      <Field id="contact-note" label="Điều anh chị đang cần" placeholder="Dịp, số lượng dự kiến, thời điểm cần hàng..." multiline />
      <Button type="submit" full>Gửi brief cho BOND</Button>
    </form>
  );
}
