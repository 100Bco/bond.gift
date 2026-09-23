import { type ReactNode, useEffect, useState } from 'react';

/*
 * Hero trang chủ tràn màn hình, nền trắng: tên thương hiệu và đồng hồ đếm ngược
 * đến giao thừa Tết 2027 (0h ngày 6/2/2027 giờ Việt Nam). Sau Tết đồng hồ tự ẩn.
 */
const TET_VN = Date.UTC(2027, 1, 5, 17, 0, 0); // 0h 6/2/2027, UTC+7

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function HomeStage({ title, sub }: { title: ReactNode; sub: ReactNode }) {
  const now = useNow();
  const left = TET_VN - now;
  return (
    <section className="home-stage" aria-labelledby="home-title">
      <div className="container home-stage-copy">
        <h1 id="home-title" className="t-brand home-stage-title">{title}</h1>
        <p className="home-stage-sub">{sub}</p>
      </div>
      {left > 0 && <Countdown left={left} />}
      <a href="#home-meaning" className="home-stage-cue">Cuộn để khám phá<span aria-hidden="true" /></a>
    </section>
  );
}

function Countdown({ left }: { left: number }) {
  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor(left / 3_600_000) % 24;
  const mins = Math.floor(left / 60_000) % 60;
  const secs = Math.floor(left / 1000) % 60;
  const units: [number, string][] = [[days, 'Ngày'], [hours, 'Giờ'], [mins, 'Phút'], [secs, 'Giây']];
  return (
    <div className="container tet-clock-wrap">
      <p className="tet-clock-label">Đếm ngược đến Tết 2027</p>
      <div className="tet-clock" role="timer" aria-label={`Còn ${days} ngày đến Tết 2027`}>
        {units.map(([value, unit], index) => (
          <div key={unit} className="tet-clock-unit" aria-hidden="true">
            {index > 0 && <span className="tet-clock-sep"><i /><i /></span>}
            <span className="tet-clock-cell">
              <span className="tet-clock-no t-numeral">{String(value).padStart(2, '0')}</span>
              <span className="tet-clock-name">{unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
