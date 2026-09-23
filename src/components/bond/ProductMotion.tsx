import type { CSSProperties } from 'react';

export type MotionKind =
  | 'box'
  | 'sleeve'
  | 'envelope'
  | 'bag'
  | 'layers'
  | 'kit'
  | 'colorway'
  | 'journey-brief'
  | 'journey-concept'
  | 'journey-production'
  | 'journey-delivery';

export type ArtKey = 'magenta' | 'gold' | 'tea' | 'clay' | 'silk' | 'slate' | 'kraft';

const artVars: Record<ArtKey, [string, string, string]> = {
  magenta: ['var(--bond-magenta)', 'var(--bond-paper)', 'var(--art-gold)'],
  gold: ['var(--art-gold)', 'var(--bond-ink)', 'var(--bond-magenta)'],
  tea: ['var(--art-tea)', 'var(--art-silk)', 'var(--art-wood)'],
  clay: ['var(--art-clay)', 'var(--bond-paper)', 'var(--bond-ink)'],
  silk: ['var(--art-silk)', 'var(--bond-magenta)', 'var(--art-gold)'],
  slate: ['var(--art-slate)', 'var(--bond-paper)', 'var(--art-kraft)'],
  kraft: ['var(--art-kraft)', 'var(--bond-magenta)', 'var(--art-tea)'],
};

export function artStyle(art: ArtKey): CSSProperties {
  const [a, b, c] = artVars[art];
  return { '--art-a': a, '--art-b': b, '--art-c': c } as CSSProperties;
}

/**
 * Minh họa chuyển động cho sản phẩm và quy trình, dựng hoàn toàn bằng CSS.
 * Đây là placeholder có chủ đích cho đến khi có video/ảnh sản phẩm thật;
 * chỉ dùng transform và opacity, tạm dừng ngoài viewport, đứng yên khi reduced motion.
 */
export function ProductMotion({ kind, art = 'magenta' }: { kind: MotionKind; art?: ArtKey }) {
  return (
    <div className={`pm pm-${kind}`} style={artStyle(art)} aria-hidden="true">
      <div className="pm-floor" />
      {renderKind(kind)}
    </div>
  );
}

function renderKind(kind: MotionKind) {
  switch (kind) {
    case 'box':
      return (
        <div className="pm-obj">
          <div className="pm-box-insert"><span /><span /></div>
          <div className="pm-box-base"><i className="pm-ribbon" /></div>
          <div className="pm-box-lid"><i className="pm-ribbon" /></div>
        </div>
      );
    case 'sleeve':
      return (
        <div className="pm-obj">
          <div className="pm-sleeve-tray"><span /><span /><span /></div>
          <div className="pm-sleeve-outer"><i className="pm-mark" /></div>
        </div>
      );
    case 'envelope':
      return (
        <div className="pm-obj">
          <div className="pm-env-back" />
          <div className="pm-env-card"><span /><span /><span /></div>
          <div className="pm-env-front" />
          <div className="pm-env-seal" />
        </div>
      );
    case 'bag':
      return (
        <div className="pm-obj">
          <div className="pm-bag">
            <div className="pm-bag-handle" />
            <div className="pm-bag-body"><i className="pm-mark" /></div>
          </div>
        </div>
      );
    case 'layers':
      return (
        <div className="pm-obj">
          <div className="pm-iso">
            <div className="pm-layer pm-layer-base" />
            <div className="pm-layer pm-layer-insert"><span /><span /><span /><span /></div>
            <div className="pm-layer pm-layer-card" />
            <div className="pm-layer pm-layer-lid"><i className="pm-mark" /></div>
          </div>
        </div>
      );
    case 'kit':
      return (
        <div className="pm-obj">
          <div className="pm-kit-tray">
            <span className="pm-kit-item pm-kit-1" />
            <span className="pm-kit-item pm-kit-2" />
            <span className="pm-kit-item pm-kit-3" />
            <span className="pm-kit-item pm-kit-4" />
          </div>
        </div>
      );
    case 'colorway':
      return (
        <div className="pm-obj">
          <div className="pm-cw">
            <div className="pm-cw-box pm-cw-1"><i className="pm-mark" /></div>
            <div className="pm-cw-box pm-cw-2"><i className="pm-mark" /></div>
            <div className="pm-cw-box pm-cw-3"><i className="pm-mark" /></div>
          </div>
          <div className="pm-cw-dots"><span /><span /><span /></div>
        </div>
      );
    case 'journey-brief':
      return (
        <div className="pm-obj">
          <div className="pm-sheet">
            <span className="pm-sheet-title" />
            <span className="pm-line pm-line-1" />
            <span className="pm-line pm-line-2" />
            <span className="pm-line pm-line-3" />
            <span className="pm-line pm-line-4" />
            <span className="pm-sheet-mark" />
          </div>
        </div>
      );
    case 'journey-concept':
      return (
        <div className="pm-obj">
          <div className="pm-fan">
            <div className="pm-fan-card pm-fan-1"><i /></div>
            <div className="pm-fan-card pm-fan-2"><i /></div>
            <div className="pm-fan-card pm-fan-3"><i /></div>
          </div>
        </div>
      );
    case 'journey-production':
      return (
        <div className="pm-obj">
          <div className="pm-belt">
            <div className="pm-belt-track">
              <span /><span /><span /><span /><span /><span />
            </div>
            <div className="pm-belt-line" />
          </div>
        </div>
      );
    case 'journey-delivery':
      return (
        <div className="pm-obj">
          <div className="pm-route">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="pm-route-path">
              <path d="M10 90 C 80 90, 90 30, 150 30 S 230 90, 290 60" fill="none" />
            </svg>
            <span className="pm-pin pm-pin-1" />
            <span className="pm-pin pm-pin-2" />
            <span className="pm-pin pm-pin-3" />
            <span className="pm-parcel-x"><span className="pm-parcel-y"><span className="pm-parcel" /></span></span>
          </div>
        </div>
      );
  }
}
