import { useId } from 'react';

/*
 * Hình hộp quà vector cho trang chủ editorial (minh họa, chờ ảnh thật).
 * Màu lấy từ token: ngà, mực đen nhám, đỏ magenta BOND.
 */
const RED = '#DB0D3E';
const RED_DEEP = '#A80A30';
const INK = '#0B0B0C';
const IVORY = '#FAF8F5';

type BoxTone = 'ivory' | 'obsidian' | 'crimson' | 'black' | 'raw';

const tones: Record<BoxTone, { from: string; to: string; lid: string; ribbon: string }> = {
  ivory: { from: '#FFFFFF', to: '#E8E4DD', lid: '#DCD5CB', ribbon: INK },
  obsidian: { from: '#242220', to: INK, lid: '#2E2C29', ribbon: RED },
  crimson: { from: '#EC1A4A', to: RED_DEEP, lid: '#BC0B36', ribbon: INK },
  black: { from: '#141312', to: '#141312', lid: '#201F1E', ribbon: IVORY },
  raw: { from: '#EAE5DC', to: '#EAE5DC', lid: '#DDD8CE', ribbon: RED },
};

/** Hộp quà có nơ, dùng ở hero. `big` cho hộp trung tâm có dấu dập chìm. */
export function GiftBox({ tone, big = false }: { tone: BoxTone; big?: boolean }) {
  const id = useId().replace(/:/g, '');
  const t = tones[tone];
  if (big) {
    return (
      <svg viewBox="0 0 180 220" fill="none" aria-hidden="true">
        <defs><linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={t.from} /><stop offset="100%" stopColor={t.to} /></linearGradient></defs>
        <rect x="10" y="42" width="160" height="170" fill={`url(#g${id})`} />
        <rect x="10" y="42" width="160" height="22" fill={t.lid} />
        <rect x="79" y="42" width="22" height="170" fill={t.ribbon} />
        <path d="M90 42C72 6 38 14 48 42M90 42C108 6 142 14 132 42" stroke={t.ribbon} strokeWidth="10" strokeLinecap="round" />
        <circle cx="90" cy="120" r="16" fill={INK} fillOpacity="0.2" />
        <path d="M86 114h8v12h-8z" fill="#FFFFFF" />
      </svg>
    );
  }
  const top = tone === 'ivory' || tone === 'raw' ? 44 : 38;
  return (
    <svg viewBox="0 0 160 200" fill="none" aria-hidden="true">
      <defs><linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={t.from} /><stop offset="100%" stopColor={t.to} /></linearGradient></defs>
      <rect x="10" y={top} width="140" height={194 - top} fill={`url(#g${id})`} />
      <rect x="10" y={top} width="140" height="18" fill={t.lid} />
      <rect x="71" y={top} width="18" height={194 - top} fill={t.ribbon} />
      <path d={`M80 ${top}C65 ${top - 30} 36 ${top - 24} 44 ${top}M80 ${top}C95 ${top - 30} 124 ${top - 24} 116 ${top}`} stroke={t.ribbon} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

/** Đôi tay đỡ hộp (tay áo tuxedo). */
export function Arm({ side }: { side: 'l' | 'r' }) {
  return side === 'l' ? (
    <svg viewBox="0 0 240 340" fill="none" aria-hidden="true">
      <path d="M100 340V160c0-32-16-46-32-60-16-14-22-34-10-50 12-16 36-14 50 4l58 74c14 18 22 36 22 60v152z" fill="#D1AC90" />
      <path d="M100 340V220h90v120z" fill={INK} />
      <path d="M100 220h90v12H100z" fill="#FFFFFF" />
    </svg>
  ) : (
    <svg viewBox="0 0 240 340" fill="none" aria-hidden="true">
      <path d="M140 340V160c0-32 16-46 32-60 16-14 22-34 10-50-12-16-36-14-50 4l-58 74c-14 18-22 36-22 60v152z" fill="#D1AC90" />
      <path d="M50 340V220h90v120z" fill={INK} />
      <path d="M50 220h90v12H50z" fill="#FFFFFF" />
    </svg>
  );
}

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
