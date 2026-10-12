import type { CSSProperties } from 'react';

/* Màu hoa: mai vàng và đào hồng, độ đậm vừa phải để không lấn ảnh sản phẩm. */
const MAI = { petal: '#E9B83A', heart: '#B7791F' };
const DAO = { petal: '#F0A3B4', heart: '#C95A73' };

/** Một bông 5 cánh, tâm tại (0,0), bán kính khoảng 10. */
function Blossom({ c, x = 0, y = 0, s = 1, r = 0 }: { c: typeof MAI; x?: number; y?: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-5.2" rx="3.6" ry="5.2" fill={c.petal} transform={`rotate(${a})`} />)}
      <circle r="2" fill={c.heart} />
    </g>
  );
}

/** Cành hoa nét mảnh ở góc trên. flip để đặt cành đào bên phải. */
function Branch({ c, flip }: { c: typeof MAI; flip?: boolean }) {
  return (
    <svg className={`lx-tet-branch ${flip ? 'is-right' : 'is-left'}`} viewBox="0 0 240 150" aria-hidden="true">
      <g transform={flip ? 'translate(240 0) scale(-1 1)' : undefined}>
        <g fill="none" stroke="#6B4A3A" strokeLinecap="round">
          <path d="M-4 18 C 40 26, 82 44, 128 70 S 196 112, 226 130" strokeWidth="2.2" />
          <path d="M70 40 C 84 22, 100 14, 120 10" strokeWidth="1.4" />
          <path d="M128 70 C 140 92, 146 110, 148 132" strokeWidth="1.3" />
          <path d="M176 98 C 192 86, 206 80, 222 78" strokeWidth="1.1" />
        </g>
        <Blossom c={c} x={52} y={30} s={1.05} r={10} />
        <Blossom c={c} x={118} y={11} s={0.8} r={40} />
        <Blossom c={c} x={100} y={56} s={0.95} r={-12} />
        <Blossom c={c} x={146} y={124} s={0.75} r={24} />
        <Blossom c={c} x={160} y={88} s={1.1} r={6} />
        <Blossom c={c} x={214} y={80} s={0.7} r={-30} />
        <Blossom c={c} x={226} y={130} s={0.85} r={18} />
        <circle cx="84" cy="34" r="2.4" fill={c.petal} />
        <circle cx="136" cy="78" r="2.2" fill={c.petal} />
        <circle cx="196" cy="114" r="2.4" fill={c.petal} />
      </g>
    </svg>
  );
}

/* Số ngẫu nhiên cố định để vị trí hoa giống nhau mỗi lần tải trang. */
const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
const PETALS = Array.from({ length: 14 }, (_, i) => {
  const mai = i % 2 === 0;
  // Hoa rụng từ hai cành: mai phía trái, đào phía phải, vài bông lạc vào giữa.
  const zone = i % 7 === 3 ? [35, 65] : mai ? [2, 34] : [66, 98];
  return {
    mai,
    whole: i % 3 !== 1,
    left: zone[0] + rand() * (zone[1] - zone[0]),
    top: rand() * 100,
    size: 8 + rand() * 8,
    dur: 10 + rand() * 8,
    delay: -rand() * 18,
    sway: 14 + rand() * 22,
    spin: (rand() > 0.5 ? 1 : -1) * (180 + rand() * 360),
  };
});

/** Trang trí Tết cho hero: hai cành mai, đào ở góc trên và hoa rơi chậm phía sau nội dung. */
export function TetPetals() {
  return (
    <div className="lx-tet" aria-hidden="true">
      <Branch c={MAI} />
      <Branch c={DAO} flip />
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="lx-petal"
          style={{ left: `${p.left}%`, '--top': `${p.top}%`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--sway': `${p.sway}px`, '--spin': `${p.spin}deg`, width: p.size, height: p.size } as CSSProperties}
        >
          <i>
            <svg viewBox="-11 -11 22 22">
              {p.whole ? <Blossom c={p.mai ? MAI : DAO} /> : <ellipse cx="0" cy="0" rx="5" ry="8.5" fill={(p.mai ? MAI : DAO).petal} />}
            </svg>
          </i>
        </span>
      ))}
    </div>
  );
}
