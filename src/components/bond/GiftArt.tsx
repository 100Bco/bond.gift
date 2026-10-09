/*
 * Hình hộp quà vector cho trang chủ editorial (minh họa, chờ ảnh thật).
 * Màu lấy từ token: ngà, mực đen nhám, đỏ magenta BOND.
 */
const RED = '#DB0D3E';
const INK = '#0B0B0C';
const IVORY = '#FAF8F5';

/** Minh họa khối so sánh hai mô hình. */
export function ModelArt({ kind }: { kind: 'ready' | 'bespoke' }) {
  return kind === 'ready' ? (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true">
      <rect x="40" y="30" width="160" height="100" fill={IVORY} stroke="#E3DFD9" strokeWidth="2" />
      <rect x="110" y="30" width="20" height="100" fill={RED} />
      <circle cx="120" cy="80" r="14" fill={INK} />
    </svg>
  ) : (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true">
      <rect x="35" y="25" width="170" height="110" fill="#1C1A18" stroke={RED} strokeWidth="1.5" />
      <rect x="112" y="25" width="16" height="110" fill={RED} />
      <rect x="35" y="75" width="170" height="10" fill={INK} />
      <circle cx="120" cy="80" r="16" fill={IVORY} />
    </svg>
  );
}

/** Minh họa thẻ set sẵn. */
export function SetArt({ look }: { look: 'ivory' | 'ink' | 'red' | 'black' }) {
  const map = {
    ivory: { x: 30, y: 50, w: 140, h: 150, fill: '#F2EFEB', stroke: '#D8D4CC', band: INK, dot: RED, r: 18 },
    ink: { x: 30, y: 45, w: 140, h: 160, fill: '#1C1A18', stroke: undefined, band: RED, dot: IVORY, r: 18 },
    red: { x: 25, y: 40, w: 150, h: 170, fill: RED, stroke: undefined, band: INK, dot: IVORY, r: 22 },
    black: { x: 20, y: 35, w: 160, h: 180, fill: INK, stroke: undefined, band: RED, dot: '#E8E4DD', r: 24 },
  }[look];
  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <rect x={map.x} y={map.y} width={map.w} height={map.h} fill={map.fill} stroke={map.stroke} strokeWidth={map.stroke ? 2 : undefined} />
      <rect x="90" y={map.y} width="20" height={map.h} fill={map.band} />
      <circle cx="100" cy="125" r={map.r} fill={map.dot} />
    </svg>
  );
}

/** Minh họa section "Khoảnh khắc Tết". */
export function MomentArt() {
  return (
    <svg viewBox="0 0 320 400" fill="none" aria-hidden="true">
      <rect x="40" y="60" width="240" height="280" fill="#1C1A18" stroke="#333" strokeWidth="2" />
      <rect x="145" y="60" width="30" height="280" fill={RED} />
      <circle cx="160" cy="200" r="40" fill={IVORY} />
      <path d="M152 188h16v24h-16z" fill={RED} />
    </svg>
  );
}
