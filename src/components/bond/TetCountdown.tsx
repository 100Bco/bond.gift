import { ButtonLink, Label } from './primitives';

/*
 * Lịch ngược Tết 2027: một dải thời gian tháng 9/2026 → tháng 2/2027 với vị trí "hôm nay".
 * Chỉ dùng các mốc đã có trong nội dung BOND:
 * - Tết 2027 rơi vào ngày 6 tháng 2.
 * - Thời điểm an toàn để chốt hướng thiết kế là trước giữa tháng 10.
 * - Đơn thiết kế riêng mất 6—10 tuần; chọn mẫu có sẵn mất khoảng 3—4 tuần, tối thiểu khoảng 3 tuần.
 * Tự ẩn sau Tết.
 */
const DAY = 86_400_000;
const START = Date.UTC(2026, 8, 1); // 1/9/2026
const DEADLINE = Date.UTC(2026, 9, 15); // giữa tháng 10/2026
const TET = Date.UTC(2027, 1, 6); // 6/2/2027
const END = Date.UTC(2027, 1, 20);

const months = [
  ['T9', Date.UTC(2026, 8, 1)],
  ['T10', Date.UTC(2026, 9, 1)],
  ['T11', Date.UTC(2026, 10, 1)],
  ['T12', Date.UTC(2026, 11, 1)],
  ['T1', Date.UTC(2027, 0, 1)],
  ['T2', Date.UTC(2027, 1, 1)],
] as const;

const pos = (time: number) => `${Math.min(100, Math.max(0, ((time - START) / (END - START)) * 100)).toFixed(2)}%`;

export function TetCountdown({ tone = 'deep', now = Date.now() }: { tone?: 'deep' | 'paper' | 'canvas'; now?: number }) {
  if (now >= TET) return null;
  const weeksToTet = Math.ceil((TET - now) / (7 * DAY));
  const beforeDeadline = now < DEADLINE;
  const weeksToDeadline = Math.max(0, Math.ceil((DEADLINE - now) / (7 * DAY)));

  return (
    <section className={`section tone-${tone} section-space-default tet`} aria-labelledby="tet-title">
      <div className="container">
        <div className="tet-head">
          <div>
            <Label>Lịch ngược Tết 2027</Label>
            <h2 id="tet-title" className="t-h2">Tết 2027 rơi vào ngày 6 tháng 2.</h2>
          </div>
          <dl className="tet-figures">
            <div>
              <dt>Đến Tết còn</dt>
              <dd><span className="t-numeral">{weeksToTet}</span> tuần</dd>
            </div>
            <div className={beforeDeadline ? 'is-urgent' : ''}>
              <dt>Đến mốc chốt thiết kế an toàn</dt>
              <dd>{beforeDeadline ? <><span className="t-numeral">{weeksToDeadline}</span> tuần</> : 'Đã qua'}</dd>
            </div>
          </dl>
        </div>

        <div className="tet-track" role="img" aria-label={`Hôm nay còn ${weeksToTet} tuần đến Tết. Mốc chốt thiết kế an toàn là giữa tháng 10.`}>
          <div className="tet-rail">
            <span className="tet-span tet-span-custom" style={{ left: pos(DEADLINE), width: `calc(${pos(TET)} - ${pos(DEADLINE)})` }}>
              <span>Thiết kế riêng · 6—10 tuần: mẫu, sản xuất, giao nhiều điểm</span>
            </span>
            <span className="tet-marker tet-marker-deadline" style={{ left: pos(DEADLINE) }}><span>Chốt hướng thiết kế<br />trước giữa tháng 10</span></span>
            <span className="tet-marker tet-marker-tet" style={{ left: pos(TET) }}><span>Tết<br />6/2/2027</span></span>
            <span className="tet-marker tet-marker-today" style={{ left: pos(now) }}><span>Hôm nay</span></span>
          </div>
          <ol className="tet-months" aria-hidden="true">
            {months.map(([label, time]) => <li key={label} style={{ left: pos(time) }}>{label}</li>)}
          </ol>
        </div>

        <div className="tet-foot">
          <p className="t-body-l">
            {beforeDeadline
              ? 'Để kịp thiết kế riêng và sản xuất, thời điểm an toàn để bắt đầu là trước giữa tháng 10.'
              : 'Nếu anh chị đang gấp: chọn mẫu có sẵn trong bộ sưu tập và chỉ tùy biến phần nhận diện. Khoảng 3 tuần là thời gian tối thiểu khả thi.'}
          </p>
          <ButtonLink href={beforeDeadline ? '/lien-he' : '/bo-suu-tap'}>{beforeDeadline ? 'Trao đổi cùng BOND' : 'Xem bộ sưu tập'}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
