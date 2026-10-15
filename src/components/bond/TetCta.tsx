import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';

export const TET = new Date('2027-02-06T00:00:00+07:00');
const ArrowUp = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" /></svg>;

/** Khối đỏ cuối trang: đếm ngày tới Tết, hai hạn chốt đơn, nút Zalo. Dùng ở trang chủ và các trang danh sách. */
export function TetCta() {
  // Số ngày còn lại tới Tết, tự đếm lùi theo ngày; qua Tết thì ẩn dòng này.
  const days = Math.ceil((TET.getTime() - Date.now()) / 86400000);
  return (
    <section className="lx-cta" aria-labelledby="lx-cta-title">
      <div className="lx-wrap">
        {days > 0 && <Reveal><p className="lx-cta-days">Còn <strong>{days}</strong> ngày tới Tết<span className="lx-cta-lg"> Đinh Mùi</span></p></Reveal>}
        <Reveal><h2 id="lx-cta-title">Bây giờ là lúc bắt đầu.</h2></Reveal>
        <Reveal delay={1}><p>Tết Đinh Mùi rơi vào ngày <span className="lx-nowrap">6 tháng 2 năm 2027.</span></p></Reveal>
        <Reveal delay={1}>
          <dl className="lx-cta-dl">
            <div><dt>Set độc bản</dt><dd><span className="lx-cta-lg">Chốt đơn trước</span><span className="lx-cta-sm">Trước</span> 15 tháng 12</dd></div>
            <div><dt>Set sẵn</dt><dd><span className="lx-cta-lg">Chốt đơn trước</span><span className="lx-cta-sm">Trước</span> 15 tháng 1</dd></div>
          </dl>
        </Reveal>
        <Reveal delay={2}><ZaloLink className="lx-btn lx-btn-white"><span>Tư vấn qua Zalo</span><ArrowUp /></ZaloLink></Reveal>
      </div>
    </section>
  );
}

