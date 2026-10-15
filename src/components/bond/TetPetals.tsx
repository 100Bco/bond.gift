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

/* Số ngẫu nhiên cố định để vị trí hoa giống nhau mỗi lần tải trang. */
const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
const PETALS = Array.from({ length: 14 }, (_, i) => {
  const mai = i % 2 === 0;
  // Mai rơi phía trái, đào phía phải, vài bông lạc vào giữa.
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

/** Trang trí Tết cho hero: hoa mai, đào rơi chậm phía sau nội dung. */
export function TetPetals() {
  return (
    <div className="lx-tet" aria-hidden="true">
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
