import { type ReactNode, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { navItems } from '@/data/content';
import { ButtonLink } from '@/components/bond/primitives';

/** Logo chính thức. Không vẽ lại, không kéo giãn, chỉ đặt trên nền sáng để giữ tương phản của wordmark. */
export function Logo({ className = '' }: { className?: string }) {
  return <img className={`logo ${className}`.trim()} src="/assets/bond-logo.png" alt="BOND" width={5956} height={1524} />;
}

function isActive(location: string, href: string) {
  if (href === '/') return location === '/';
  return location === href || location.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const links: [string, string][] = [['Trang chủ', '/'], ...navItems];

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`} data-testid="navigation-header">
      <div className="site-header-inner">
        <Link className="site-header-brand" href="/" aria-label="Về trang chủ BOND">
          <Logo />
        </Link>
        <nav id="site-nav" className="site-nav" aria-label="Điều hướng chính">
          <ul className="site-nav-list">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className={`site-nav-link ${isActive(location, href) ? 'is-active' : ''}`} aria-current={isActive(location, href) ? 'page' : undefined}>{label}</Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/lien-he" size="s" className="site-nav-cta">Trao đổi cùng BOND</ButtonLink>
        </nav>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

const footerColumns: { title: string; links: [string, string][] }[] = [
  { title: 'Dịch vụ', links: [['Quà tặng doanh nghiệp', '/qua-tang'], ['Bao bì thương hiệu', '/bao-bi'], ['Vật phẩm quảng cáo', '/vat-pham'], ['Bộ sưu tập', '/bo-suu-tap']] },
  { title: 'BOND', links: [['Về BOND', '/ve-bond'], ['Dự án', '/du-an'], ['Năng lực', '/nang-luc'], ['Góc nhìn', '/goc-nhin'], ['Tuyển dụng', '/tuyen-dung']] },
  { title: 'Làm việc cùng BOND', links: [['Quy trình', '/quy-trinh'], ['Câu hỏi thường gặp', '/cau-hoi-thuong-gap'], ['Tài liệu', '/tai-lieu'], ['Liên hệ', '/lien-he']] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="container site-footer-grid">
          <div className="site-footer-statement">
            <p className="t-brand site-footer-claim">Relationships,<br /><span>compounded.</span></p>
            <p className="t-body-l site-footer-sub">Mối quan hệ, được nhân lên theo thời gian.</p>
            <ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>
          </div>
          <nav className="site-footer-nav" aria-label="Sơ đồ trang rút gọn">
            {footerColumns.map((column) => (
              <div key={column.title} className="site-footer-col">
                <h2 className="site-footer-col-title">{column.title}</h2>
                <ul>
                  {column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="site-footer-base">
        <div className="container site-footer-base-inner">
          <Link href="/" aria-label="Về trang chủ BOND" className="site-footer-logo"><Logo /></Link>
          <p className="site-footer-note">Quà tặng doanh nghiệp, bao bì và vật phẩm thương hiệu.<br />© BOND / Thành viên hệ sinh thái 100B</p>
          <ul className="site-footer-legal">
            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
            <li><Link href="/dieu-khoan">Điều khoản</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

export function SiteShell({ children, theme }: { children: ReactNode; theme?: 'gift' | 'packaging' | 'merchandise' | 'signature' }) {
  return (
    <div className={`bond-site ${theme ? `theme-${theme}` : ''}`}>
      <a className="skip-link" href="#main">Bỏ qua điều hướng</a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="container breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">BOND</Link></li>
        {items.map((item, index) => (
          <li key={item.label} aria-current={index === items.length - 1 ? 'page' : undefined}>
            {item.href && index < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
