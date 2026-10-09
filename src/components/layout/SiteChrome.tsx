import { type ReactNode, useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { officeLines } from '@/data/content';
import { ZaloLink } from '@/components/bond/ZaloLink';

/** Logo chính thức. Không vẽ lại, không kéo giãn, chỉ đặt trên nền sáng để giữ tương phản của wordmark. */
export function Logo({ className = '' }: { className?: string }) {
  return <img className={`logo ${className}`.trim()} src="/assets/bond-logo.png" alt="BOND" width={5956} height={1524} />;
}

/* Menu theo bản thiết kế editorial: ba điểm đến trên trang chủ + tư vấn Zalo */
const navLinks: [string, string][] = [
  ['Set sẵn', '/#set-san'],
  ['Set độc bản', '/#set-doc-ban'],
  ['Quy trình', '/#quy-trinh'],
];

const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" /></svg>
);

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [location] = useLocation();

  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
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

  return (
    <>
      <header className={`lx-nav ${solid || menuOpen ? 'is-solid' : ''}`} data-testid="navigation-header">
        <div className="lx-nav-in">
          <Link className="lx-brand" href="/" aria-label="Về trang chủ BOND"><Logo /></Link>
          <nav className="lx-nav-links" aria-label="Điều hướng chính">
            {navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <ZaloLink className="lx-nav-cta"><span>Tư vấn qua Zalo</span><ArrowUp /></ZaloLink>
          <button type="button" className="lx-burger" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-controls="lx-mobile-nav" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}>
            <span />
          </button>
        </div>
      </header>
      <div id="lx-mobile-nav" className={`lx-mobile ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <ZaloLink className="lx-mobile-zalo">Tư vấn qua Zalo</ZaloLink>
      </div>
    </>
  );
}

const footerSitemap: [string, string][] = [
  ['Về BOND', '/ve-bond'], ['Bộ sưu tập', '/bo-suu-tap'], ['Quà tặng doanh nghiệp', '/qua-tang'], ['Bao bì thương hiệu', '/bao-bi'],
  ['Vật phẩm quảng cáo', '/vat-pham'], ['Dự án', '/du-an'], ['Năng lực', '/nang-luc'], ['Góc nhìn', '/goc-nhin'],
  ['Câu hỏi thường gặp', '/cau-hoi-thuong-gap'], ['Tài liệu', '/tai-lieu'], ['Tuyển dụng', '/tuyen-dung'], ['Liên hệ', '/lien-he'],
];

export function SiteFooter() {
  return (
    <footer className="lx-foot">
      <div className="lx-wrap">
        <div className="lx-foot-grid">
          <div>
            {/* Logo chính thức đặt trên tấm nền ngà để giữ tương phản trên nền mực */}
            <Link href="/" className="lx-foot-plate" aria-label="Về trang chủ BOND"><Logo /></Link>
            <p className="lx-foot-tag">Quà tặng doanh nghiệp, giải pháp bao bì và trải nghiệm thương hiệu. Thành viên hệ sinh thái 100B.</p>
          </div>
          <div>
            <p className="lx-foot-h">Danh mục quà Tết</p>
            <div className="lx-foot-l">
              <a href="/#set-san">Set quà sẵn</a>
              <a href="/#set-doc-ban">Set quà độc bản</a>
              <a href="/#quy-trinh">Quy trình triển khai</a>
            </div>
          </div>
          <div>
            <p className="lx-foot-h">BOND</p>
            <div className="lx-foot-l lx-foot-l-cols">
              {footerSitemap.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          </div>
          <div>
            <p className="lx-foot-h">Văn phòng tư vấn</p>
            <div className="lx-foot-l">
              <ZaloLink>Trò chuyện qua Zalo doanh nghiệp</ZaloLink>
              {officeLines.map((line) => <span key={line}>{line}</span>)}
            </div>
          </div>
        </div>
        <div className="lx-foot-bot">
          <span>© 2026-2027 BOND. Tất cả quyền được bảo lưu.</span>
          <span className="lx-foot-legal"><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link><Link href="/dieu-khoan">Điều khoản</Link></span>
          <span className="lx-foot-eco">ZAD <i /> BOND <i /> 100B ECOSYSTEM</span>
        </div>
      </div>
    </footer>
  );
}

function ZaloFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <ZaloLink className={`lx-fab ${show ? 'is-shown' : ''}`} ariaLabel="Tư vấn trực tiếp qua Zalo"><MessageCircle size={24} strokeWidth={1.75} aria-hidden="true" /></ZaloLink>;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

export function SiteShell({ children, theme }: { children: ReactNode; theme?: 'gift' | 'packaging' | 'merchandise' | 'signature' }) {
  return (
    <div className={`bond-site ${theme ? `theme-${theme}` : ''}`}>
      <div className="lx-grain" aria-hidden="true" />
      <a className="skip-link" href="#main">Bỏ qua điều hướng</a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
      <ZaloFab />
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
