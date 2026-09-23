import { type ReactNode, useId, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'wouter';

/* ---------- Buttons & links ---------- */

type ButtonVariant = 'primary' | 'secondary';

export function ButtonLink({ href, children, variant = 'primary', size = 'm', className = '' }: { href: string; children: ReactNode; variant?: ButtonVariant; size?: 'm' | 's'; className?: string }) {
  return (
    <Link href={href} className={`btn btn-${variant} btn-${size} ${className}`.trim()}>
      <span>{children}</span>
      <ArrowUpRight className="btn-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
    </Link>
  );
}

export function Button({ children, variant = 'primary', type = 'button', onClick, className = '', full = false }: { children: ReactNode; variant?: ButtonVariant; type?: 'button' | 'submit'; onClick?: () => void; className?: string; full?: boolean }) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant} btn-m ${full ? 'btn-full' : ''} ${className}`.trim()}>
      <span>{children}</span>
      <ArrowUpRight className="btn-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

export function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`text-link ${className}`.trim()}>
      <span>{children}</span>
      <ArrowRight className="text-link-icon" size={16} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

/* ---------- Labels & tags ---------- */

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`t-label ${className}`.trim()}>{children}</span>;
}

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

export function ChapterNumber({ n, total }: { n: string | number; total?: number }) {
  const value = typeof n === 'number' ? String(n).padStart(2, '0') : n;
  return (
    <span className="chapter-no" aria-hidden="true">
      <span className="t-numeral">{value}</span>
      {total ? <span className="chapter-no-total">/ {String(total).padStart(2, '0')}</span> : null}
    </span>
  );
}

/* ---------- Filter chips (giữ nguyên logic lọc, chỉ đổi giao diện) ---------- */

export function FilterChips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  const id = useId();
  return (
    <div className="filter" role="group" aria-labelledby={id}>
      <span id={id} className="t-label filter-label">{label}</span>
      <div className="filter-options">
        {options.map((option) => (
          <button key={option} type="button" className={`chip ${value === option ? 'is-active' : ''}`} aria-pressed={value === option} onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section intro ---------- */

export function SectionIntro({ label, title, children, align = 'split', level = 2, className = '' }: { label?: ReactNode; title: ReactNode; children?: ReactNode; align?: 'split' | 'stack' | 'center'; level?: 2 | 3; className?: string }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <header className={`section-intro section-intro-${align} ${className}`.trim()}>
      <div className="section-intro-head">
        {label && <Label className="section-intro-label">{label}</Label>}
        <Heading className={level === 2 ? 't-h2' : 't-h3'}>{title}</Heading>
      </div>
      {children && <div className="section-intro-body t-body-l">{children}</div>}
    </header>
  );
}

/* ---------- Metric ---------- */

export function Metric({ value, label, brand = true }: { value: string; label: string; brand?: boolean }) {
  return (
    <div className="metric">
      <strong className={brand ? 't-numeral metric-value' : 'metric-value metric-value-sans'}>{value}</strong>
      <span className="metric-label">{label}</span>
    </div>
  );
}

/* ---------- Accordion (nút bấm có aria-expanded, không dùng border đậm) ---------- */

export function Accordion({ items }: { items: { question: string; answer: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
            <h3 className="accordion-heading">
              <button type="button" className="accordion-trigger" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : index)}>
                <span>{item.question}</span>
                <Plus className="accordion-icon" size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className="accordion-panel" role="region" hidden={!isOpen}>
              <div className="accordion-panel-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Form field ---------- */

export function Field({ id, label, type = 'text', placeholder, required = true, multiline = false, value, onChange }: { id: string; label: string; type?: string; placeholder?: string; required?: boolean; multiline?: boolean; value?: string; onChange?: (value: string) => void }) {
  const controlled = value !== undefined ? { value, onChange: (event: { target: { value: string } }) => onChange?.(event.target.value) } : {};
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea id={id} className="field-control field-textarea" required={required} placeholder={placeholder} {...controlled} />
      ) : (
        <input id={id} className="field-control" type={type} required={required} placeholder={placeholder} {...controlled} />
      )}
    </div>
  );
}

/* ---------- Quote ---------- */

export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="quote">
      <span className="quote-mark" aria-hidden="true"><i /><i /></span>
      <blockquote className="t-h3">{children}</blockquote>
      {cite && <figcaption className="t-small">{cite}</figcaption>}
    </figure>
  );
}

/* ---------- Logo wall: chỉ hiển thị logo thật; nếu thiếu asset thì hiện ô chờ có ghi chú ---------- */

export function LogoWall({ title, items }: { title: string; items: { name: string; logo?: string }[] }) {
  const missing = items.filter((item) => !item.logo).length;
  return (
    <div className="logo-wall">
      <Label className="logo-wall-title">{title}</Label>
      <ul className="logo-wall-list">
        {items.map((item) => (
          <li key={item.name} className={`logo-slot ${item.logo ? '' : 'logo-slot-missing'}`}>
            {item.logo ? <img src={item.logo} alt={item.name} loading="lazy" /> : <span className="logo-slot-name">{item.name}</span>}
          </li>
        ))}
      </ul>
      {missing > 0 && <p className="logo-wall-note">Logo chính thức đang được bổ sung.</p>}
    </div>
  );
}

/* ---------- Chapter nav: chip đánh số nhảy tới từng chapter trong trang ---------- */

export function ChapterNav({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  return (
    <nav className="chapter-nav" aria-label={label}>
      <ol className="chapter-nav-list">
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="chapter-nav-link">
              <span className="t-numeral">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Link sang chapter kế tiếp, đặt ở cuối mỗi chapter. */
export function NextChapter({ id, title }: { id: string; title: string }) {
  return (
    <a href={`#${id}`} className="next-chapter">
      <span className="next-chapter-label">Tiếp theo</span>
      <span>{title}</span>
      <ArrowDown size={16} aria-hidden="true" />
    </a>
  );
}
