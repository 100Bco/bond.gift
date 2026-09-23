import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useCountUp } from '@/hooks/use-count-up';
import { tetSchedule } from './TetCountdown';
import { Label } from './primitives';

/*
 * Hero trang chủ tràn màn hình: chữ ở trên, visual lớn tràn hai mép bên dưới,
 * dải đếm ngược Tết đặt trên visual. Sau Tết dải đếm ngược tự ẩn.
 */
export function HomeStage({ label, title, sub, actions, media, now = Date.now() }: { label: ReactNode; title: ReactNode; sub: ReactNode; actions: ReactNode; media: ReactNode; now?: number }) {
  const schedule = tetSchedule(now);
  return (
    <section className="home-stage" aria-labelledby="home-title">
      <div className="container home-stage-copy">
        <Label className="hero-label">{label}</Label>
        <h1 id="home-title" className="t-brand home-stage-title">{title}</h1>
        <p className="home-stage-sub">{sub}</p>
        <div className="hero-actions">{actions}</div>
      </div>
      <div className="home-stage-visual">
        {media}
        {schedule && <TetStrip {...schedule} />}
      </div>
    </section>
  );
}

function TetStrip({ weeksToTet, weeksToDeadline, beforeDeadline }: { weeksToTet: number; weeksToDeadline: number; beforeDeadline: boolean }) {
  const tet = useCountUp(weeksToTet);
  const deadline = useCountUp(weeksToDeadline);
  return (
    <div className="container tet-strip-wrap">
      <div className="tet-strip" role="group" aria-label="Lịch ngược Tết 2027">
        <div className="tet-strip-cell">
          <span className="tet-strip-no" aria-hidden="true">{tet}</span>
          <span className="tet-strip-text"><span className="sr-only">{weeksToTet} </span>tuần đến Tết 2027<br /><span className="tet-strip-muted">Mùng 1 Tết: 6/2/2027</span></span>
        </div>
        <div className="tet-strip-cell">
          {beforeDeadline ? (
            <>
              <span className="tet-strip-no is-urgent" aria-hidden="true">{deadline}</span>
              <span className="tet-strip-text"><span className="sr-only">{weeksToDeadline} </span>tuần đến mốc chốt thiết kế<br /><span className="tet-strip-muted">Trước giữa tháng 10</span></span>
            </>
          ) : (
            <span className="tet-strip-text">Đang gấp: chọn mẫu có sẵn, chỉ tùy biến nhận diện.<br /><span className="tet-strip-muted">Khoảng 3 tuần là tối thiểu khả thi.</span></span>
          )}
        </div>
        <Link href="/qua-tang/tet" className="tet-strip-link">Quà Tết doanh nghiệp 2027<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
