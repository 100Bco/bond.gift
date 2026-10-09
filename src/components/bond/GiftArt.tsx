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

/**
 * Đôi tay đỡ hộp: ống tay vest len may đo, viền sơ mi trắng, khuy măng-sét đỏ BOND,
 * bốn ngón khum đỡ đáy hộp, ngón cái ôm góc hộp.
 */
export function Arm({ side }: { side: 'l' | 'r' }) {
  const id = useId().replace(/:/g, '');
  const suit = `suit${id}`;
  const skin = `skin${id}`;
  const cuff = `cuff${id}`;
  const left = side === 'l';
  return (
    <svg viewBox="0 0 280 360" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={suit} x1={left ? 0 : 1} y1="1" x2={left ? 1 : 0} y2="0">
          <stop offset="0%" stopColor="#080809" />
          <stop offset="100%" stopColor="#1C1B1A" />
        </linearGradient>
        <linearGradient id={skin} x1={left ? 0 : 1} y1="1" x2={left ? 1 : 0} y2="0">
          <stop offset="0%" stopColor="#C59B7E" />
          <stop offset="50%" stopColor="#D9B499" />
          <stop offset="100%" stopColor="#E5C7B0" />
        </linearGradient>
        <filter id={cuff} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      {left ? (
        <>
          <path d="M50 360 L140 230 L225 290 L135 360 Z" fill={`url(#${suit})`} />
          <path d="M140 230 L225 290" stroke="#2B2927" strokeWidth="3" />
          <circle cx="178" cy="285" r="5" fill={RED} />
          <path d="M176 285h4M178 283v4" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M136 226 L146 214 L232 274 L222 286 Z" fill={IVORY} filter={`url(#${cuff})`} />
          <path d="M146 214 C158 198 170 178 184 152 C194 134 206 112 216 94 C224 80 234 84 238 98 C242 112 232 136 222 156 L206 186 L232 274 Z" fill={`url(#${skin})`} />
          <path d="M184 152 C178 138 174 126 168 120 C162 114 154 116 150 124 C146 132 154 146 162 160 Z" fill="#D0A88B" />
          <path d="M216 112 C222 96 230 84 238 88 C244 92 240 106 234 122 Z" fill="#C59B7E" />
          <path d="M208 100 C216 82 226 70 234 74 C240 78 236 94 228 112 Z" fill="#CE9F82" />
          <path d="M198 90 C208 70 220 54 228 58 C236 62 230 80 220 102 Z" fill="#D9B499" />
          <path d="M188 98 C198 80 208 66 216 70 C222 74 218 90 208 108 Z" fill="#E2BEA5" />
        </>
      ) : (
        <>
          <path d="M230 360 L140 230 L55 290 L145 360 Z" fill={`url(#${suit})`} />
          <path d="M140 230 L55 290" stroke="#2B2927" strokeWidth="3" />
          <circle cx="102" cy="285" r="5" fill={RED} />
          <path d="M100 285h4M102 283v4" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M144 226 L134 214 L48 274 L58 286 Z" fill={IVORY} filter={`url(#${cuff})`} />
          <path d="M134 214 C122 198 110 178 96 152 C86 134 74 112 64 94 C56 80 46 84 42 98 C38 112 48 136 58 156 L74 186 L48 274 Z" fill={`url(#${skin})`} />
          <path d="M96 152 C102 138 106 126 112 120 C118 114 126 116 130 124 C134 132 126 146 118 160 Z" fill="#D0A88B" />
          <path d="M64 112 C58 96 50 84 42 88 C36 92 40 106 46 122 Z" fill="#C59B7E" />
          <path d="M72 100 C64 82 54 70 46 74 C40 78 44 94 52 112 Z" fill="#CE9F82" />
          <path d="M82 90 C72 70 60 54 52 58 C44 62 50 80 60 102 Z" fill="#D9B499" />
          <path d="M92 98 C82 80 72 66 64 70 C58 74 62 90 72 108 Z" fill="#E2BEA5" />
        </>
      )}
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
