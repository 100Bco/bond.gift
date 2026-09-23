import type { ReactNode } from 'react';
import type { Tone } from '@/data/content';
import { ChapterNumber, Label, Metric } from './primitives';
import { Reveal } from './Reveal';

/* ---------- Section wrapper: nền theo tone, khoảng cách từ token ---------- */

export function Section({ children, tone = 'canvas', spacing = 'default', id, className = '', container = true, labelledBy }: { children: ReactNode; tone?: Tone; spacing?: 'default' | 'tight' | 'none' | 'top' | 'bottom'; id?: string; className?: string; container?: boolean; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`section tone-${tone} section-space-${spacing} ${className}`.trim()}>
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
}

/* ---------- Editorial Hero ---------- */

type HeroProps = {
  label?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  aside?: ReactNode;
  layout?: 'split' | 'stacked' | 'center' | 'text';
  size?: 'xl' | 'l' | 'h1';
  tone?: Tone;
  brandTitle?: boolean;
  className?: string;
};

export function EditorialHero({ label, title, lead, actions, media, aside, layout = 'split', size = 'l', tone = 'canvas', brandTitle = false, className = '' }: HeroProps) {
  const titleClass = `${size === 'xl' ? 't-display-xl' : size === 'l' ? 't-display-l' : 't-h1'} ${brandTitle ? 't-brand' : ''}`;
  return (
    <section className={`hero hero-${layout} tone-${tone} ${className}`.trim()}>
      <div className="container hero-grid">
        <div className="hero-copy">
          {label && <Label className="hero-label">{label}</Label>}
          <h1 className={`hero-title ${titleClass}`}>{title}</h1>
          {lead && <div className="hero-lead t-body-l">{lead}</div>}
          {actions && <div className="hero-actions">{actions}</div>}
          {aside && <div className="hero-aside">{aside}</div>}
        </div>
        {media && <div className="hero-media">{media}</div>}
      </div>
    </section>
  );
}

/* ---------- Chapter: một ý chính + một visual chính (Numbered Chapter / Split Feature) ---------- */

type ChapterProps = {
  number?: number | string;
  total?: number;
  label?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  media: ReactNode;
  reverse?: boolean;
  tone?: Tone;
  mediaSize?: 'half' | 'wide';
  footer?: ReactNode;
  id?: string;
  headingLevel?: 2 | 3;
  spacing?: 'default' | 'tight';
};

export function Chapter({ number, total, label, title, children, media, reverse = false, tone = 'canvas', mediaSize = 'wide', footer, id, headingLevel = 2, spacing = 'default' }: ChapterProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section id={id} className={`section chapter tone-${tone} section-space-${spacing} ${reverse ? 'chapter-reverse' : ''} chapter-media-${mediaSize}`}>
      <div className="container chapter-grid">
        <div className="chapter-media">{media}</div>
        <Reveal className="chapter-copy">
          {(number !== undefined || label) && (
            <div className="chapter-kicker">
              {number !== undefined && <ChapterNumber n={number} total={total} />}
              {label && <Label>{label}</Label>}
            </div>
          )}
          <Heading className="t-h2 chapter-title">{title}</Heading>
          {children && <div className="chapter-body">{children}</div>}
          {footer && <div className="chapter-footer">{footer}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Statement: khoảng nghỉ typography lớn ---------- */

export function Statement({ children, label, tone = 'paper', brand = false, align = 'left', after }: { children: ReactNode; label?: ReactNode; tone?: Tone; brand?: boolean; align?: 'left' | 'center'; after?: ReactNode }) {
  return (
    <section className={`section statement statement-${align} tone-${tone} section-space-default`}>
      <div className="container">
        <Reveal>
          {label && <Label className="statement-label">{label}</Label>}
          <p className={`statement-text ${brand ? 't-brand t-display-l' : 't-h1'}`}>{children}</p>
          {after && <div className="statement-after t-body-l">{after}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Metric band ---------- */

export function MetricBand({ items, tone = 'ink', label, note }: { items: { value: string; label: string; brand?: boolean }[]; tone?: Tone; label?: ReactNode; note?: ReactNode }) {
  return (
    <section className={`section metric-band tone-${tone} section-space-tight`}>
      <div className="container">
        {label && <Label className="metric-band-label">{label}</Label>}
        <div className={`metric-band-grid metric-band-${items.length}`}>
          {items.map((item) => <Metric key={item.label} value={item.value} label={item.label} brand={item.brand} />)}
        </div>
        {note && <p className="metric-band-note t-small">{note}</p>}
      </div>
    </section>
  );
}

/* ---------- Full-width media stage ---------- */

export function MediaStage({ media, caption, tone = 'canvas' }: { media: ReactNode; caption?: ReactNode; tone?: Tone }) {
  return (
    <section className={`section media-stage tone-${tone} section-space-tight`}>
      <div className="container">
        <figure className="media-stage-figure">
          {media}
          {caption && <figcaption className="media-stage-caption t-small">{caption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

export function FinalCta({ label, title, copy, actions, aside, tone = 'magenta' }: { label?: ReactNode; title: ReactNode; copy?: ReactNode; actions?: ReactNode; aside?: ReactNode; tone?: Tone }) {
  return (
    <section className={`section final-cta tone-${tone} section-space-default`}>
      <div className={`container final-cta-grid ${aside ? 'has-aside' : ''}`}>
        <Reveal className="final-cta-copy">
          {label && <Label className="final-cta-label">{label}</Label>}
          <h2 className="t-display-l final-cta-title">{title}</h2>
          {copy && <p className="t-body-l final-cta-text">{copy}</p>}
          {actions && <div className="final-cta-actions">{actions}</div>}
        </Reveal>
        {aside && <div className="final-cta-aside">{aside}</div>}
      </div>
    </section>
  );
}
