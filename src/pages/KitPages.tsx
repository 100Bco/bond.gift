import { type FormEvent, type ReactNode, useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { budgetFilters, kitDocuments } from '@/data/content';
import { Logo } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { Button, ButtonLink, Label } from '@/components/bond/primitives';
import { DocumentCard } from '@/components/bond/cards';

/* Sale Kit dùng chung logo, typography và token với bond.vn; mật độ thông tin cao hơn. */

function KitShell({ children, section }: { children: ReactNode; section: string }) {
  return (
    <div className="kit">
      <a className="skip-link" href="#kit-main">Bỏ qua điều hướng</a>
      <header className="kit-header">
        <div className="kit-header-inner">
          <Link href="/kit" className="kit-brand" aria-label="Sale Kit BOND"><Logo /></Link>
          <span className="kit-section">Sales Kit / {section}</span>
          <span className="kit-status"><ShieldCheck size={16} aria-hidden="true" />Tài liệu nội bộ</span>
        </div>
      </header>
      <main id="kit-main" tabIndex={-1}>{children}</main>
      <footer className="kit-footer">
        <p>© BOND / Thành viên hệ sinh thái 100B</p>
      </footer>
    </div>
  );
}

export function KitGate() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('bond-kit-access') === 'granted');
  const configuredPassword = import.meta.env.VITE_KIT_PASSWORD as string | undefined;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (configuredPassword && password === configuredPassword) {
      sessionStorage.setItem('bond-kit-access', 'granted');
      setUnlocked(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="kit-gate">
        <div className="kit-gate-panel">
          <Logo />
          <span className="kit-status"><Lock size={16} aria-hidden="true" />Sales Kit / Nội bộ</span>
          <h1 className="t-h1">Tài liệu dành cho đội ngũ và khách hàng đã gặp.</h1>
          {configuredPassword ? (
            <form className="form" onSubmit={submit}>
              <div className="field">
                <label className="field-label" htmlFor="kit-password">Mật khẩu truy cập</label>
                <input id="kit-password" className="field-control" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" autoComplete="current-password" />
              </div>
              <Button type="submit" full>Mở Sale Kit</Button>
            </form>
          ) : (
            <p className="kit-config-note">Sale Kit đã được tạo khung. Khi đưa lên kit.bond.vn, đặt biến môi trường VITE_KIT_PASSWORD để bật lớp bảo vệ mật khẩu.</p>
          )}
        </div>
        <div className="kit-gate-visual" aria-hidden="true">
          <Media ratio="4 / 5" tone="magenta" motion="layers" art="silk" alt="" />
        </div>
      </div>
    );
  }

  const groups = Array.from(new Set(kitDocuments.map((doc) => doc.group)));
  return (
    <KitShell section="Nội bộ">
      <section className="kit-hero container">
        <Label className="hero-label">Sale Kit</Label>
        <h1 className="t-display-l">Chọn tài liệu<br />cần dùng.</h1>
        <p className="t-body-l t-muted">Không gian nội bộ dành cho đội ngũ BOND và khách hàng đã gặp.</p>
      </section>
      <section className="container kit-library" aria-label="Tài liệu">
        <div className="kit-group-index">
          {groups.map((group) => <span key={group} className="tag">{group}</span>)}
        </div>
        <div className="kit-grid">
          {kitDocuments.map((doc, index) => (
            <DocumentCard
              key={doc.href}
              href={doc.href}
              title={doc.title}
              kind={doc.kind}
              group={doc.group}
              cover={<Media ratio="4 / 3" tone={index % 2 ? 'deep' : 'paper'} motion={doc.motion} art="magenta" play="hover" alt="" />}
            >
              <span className="text-link" aria-hidden="true"><span>Mở tài liệu</span></span>
            </DocumentCard>
          ))}
        </div>
      </section>
    </KitShell>
  );
}

function PriceTable() {
  const tiers = budgetFilters.slice(1);
  return (
    <div className="kit-table-wrap" role="region" aria-label="Khung bảng giá" tabIndex={0}>
      <table className="kit-table">
        <caption>Khung tham khảo theo ngân sách mỗi phần quà. Giá, MOQ cụ thể được nạp từ kho tài liệu.</caption>
        <thead>
          <tr>
            <th scope="col">Ngân sách mỗi phần</th>
            <th scope="col">Bao gồm</th>
            <th scope="col">Thời gian tham khảo</th>
            <th scope="col">MOQ</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier}>
              <th scope="row">{tier}</th>
              <td>Hộp, bao bì, sản phẩm bên trong, thiệp và đóng gói hoàn thiện</td>
              <td>3—4 tuần (mẫu có sẵn) · 6—10 tuần (thiết kế riêng)</td>
              <td><span className="kit-pending">Cần xác nhận</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KitDocumentPage() {
  const [location] = useLocation();
  const kitLocation = location.startsWith('/kit') ? location : `/kit${location}`;
  const doc = kitDocuments.find((item) => kitLocation.includes(item.href.replace('/kit/', ''))) ?? kitDocuments[0];
  const isPriceList = doc.href === '/kit/bang-gia';
  return (
    <KitShell section={doc.title}>
      <nav className="container breadcrumbs kit-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/kit">Sale Kit</Link></li>
          <li aria-current="page"><span>{doc.title}</span></li>
        </ol>
      </nav>
      <section className="container kit-doc-hero">
        <div className="kit-doc-copy">
          <Label className="hero-label">Tài liệu nội bộ</Label>
          <h1 className="t-h1">{doc.title}</h1>
          <p className="t-body-l t-muted">Nội dung này chỉ dành cho đội ngũ BOND và khách hàng đã được xác nhận.</p>
          <dl className="kit-doc-meta">
            <div><dt>Nhóm</dt><dd>{doc.group}</dd></div>
            <div><dt>Định dạng</dt><dd>{doc.kind}</dd></div>
            <div><dt>Trạng thái</dt><dd><span className="kit-status"><Lock size={14} aria-hidden="true" />Protected document</span></dd></div>
          </dl>
        </div>
        <div className="kit-doc-cover">
          <Media ratio="4 / 3" tone="magenta" motion={doc.motion} art="silk" asset={`Ảnh bìa tài liệu ${doc.title}`} alt="" />
        </div>
      </section>
      <section className="container kit-doc-body">
        {isPriceList && <PriceTable />}
        <div className="kit-doc-panel">
          <h2 className="t-h3">{doc.title}</h2>
          <p>Đây là khung hiển thị cho tài liệu nội bộ. Khi kết nối kho tài liệu, nội dung PDF, giá, MOQ và mẫu hợp đồng sẽ được nạp tại đây.</p>
          <Button>Yêu cầu quyền truy cập</Button>
        </div>
        <div className="kit-related">
          <Label>Tài liệu khác</Label>
          <ul className="kit-file-list">
            {kitDocuments.filter((item) => item.href !== doc.href).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="kit-file-kind">{item.kind}</span>
                  <span className="kit-file-title">{item.title}</span>
                  <span className="kit-file-group">{item.group}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ButtonLink href="/kit" variant="secondary">Về Sale Kit</ButtonLink>
      </section>
    </KitShell>
  );
}
