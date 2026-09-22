import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useRoute } from 'wouter';

const queryClient = new QueryClient();

type CatalogItem = {
  slug: string;
  name: string;
  material: string;
  budget: string;
  style: string;
  occasion: string;
  art: string;
  description: string;
};

const catalog: CatalogItem[] = [
  { slug: 'hop-moc-ban', name: 'Hộp Mộc Bản', material: 'Giấy mỹ thuật · ép kim', budget: '1—2 triệu', style: 'Thủ công', occasion: 'Tết', art: 'art-one', description: 'Một cấu trúc hộp ấm, có độ chạm và đủ linh hoạt để kể câu chuyện riêng của thương hiệu.' },
  { slug: 'the-red-edit', name: 'The Red Edit', material: 'Carton bồi · nam châm', budget: '2—5 triệu', style: 'Đương đại', occasion: 'Tri ân', art: 'art-two', description: 'Ngôn ngữ đỏ mạnh mẽ cho những dịp cần sự hiện diện rõ ràng nhưng không phô trương.' },
  { slug: 'tra-vien-dong', name: 'Trà Viễn Đông', material: 'Gỗ veneer · lụa', budget: '2—5 triệu', style: 'Truyền thống', occasion: 'Tết', art: 'art-three', description: 'Lấy cảm hứng từ nếp trà và chất liệu phương Đông, cân bằng giữa di sản và sự tinh gọn.' },
  { slug: 'quiet-objects', name: 'Quiet Objects', material: 'Giấy gân · dập chìm', budget: 'Dưới 1 triệu', style: 'Tối giản', occasion: 'Nội bộ', art: 'art-four', description: 'Một lựa chọn nhẹ nhàng, tập trung vào chất liệu, tỷ lệ và cảm giác mở hộp.' },
  { slug: 'aster-archive', name: 'Aster Archive', material: 'Hộp cứng · nắp rời', budget: 'Trên 5 triệu', style: 'Sang trọng', occasion: 'Kỷ niệm', art: 'art-five', description: 'Dành cho những dịp có tính biểu tượng cao, nơi mỗi chi tiết cần được giữ lại lâu hơn một mùa.' },
  { slug: 'common-ground', name: 'Common Ground', material: 'Vải canvas · dây cotton', budget: '1—2 triệu', style: 'Tối giản', occasion: 'Sự kiện', art: 'art-six', description: 'Một set thân thiện, dễ tùy biến và phù hợp với những chương trình cần số lượng linh hoạt.' },
  { slug: 'ngu-sac', name: 'Ngũ Sắc', material: 'Tre ép · in lụa', budget: 'Dưới 1 triệu', style: 'Truyền thống', occasion: 'Tết', art: 'art-three', description: 'Chất liệu Việt được xử lý đương đại để tạo thành món quà vừa gần gũi vừa có chủ đích.' },
  { slug: 'tangent', name: 'Tangent', material: 'Bìa vân · UV định hình', budget: '2—5 triệu', style: 'Đương đại', occasion: 'Sự kiện', art: 'art-one', description: 'Một hướng đi sắc nét cho những thương hiệu muốn tạo ấn tượng từ cấu trúc và ánh sáng.' },
];

const processSteps = [
  ['01', 'Trao đổi ban đầu', 'Một buổi · dịp, số lượng, ngân sách và thời điểm cần hàng.'],
  ['02', 'Đề xuất phương án', '3—5 ngày · 2 đến 3 hướng gồm bao bì, ruột set và mức ngân sách.'],
  ['03', 'Xem mẫu vật lý và nếm thử', 'Theo lịch · mang hộp mẫu và sản phẩm đến văn phòng anh chị.'],
  ['04', 'Thiết kế và duyệt mẫu', '1—3 tuần · hai vòng chỉnh sửa tiêu chuẩn, cầm mẫu thật trước khi sản xuất.'],
  ['05', 'Duyệt mẫu sản xuất', '5—7 ngày · in thử, làm mẫu thật và ký duyệt trước sản xuất hàng loạt.'],
  ['06', 'Sản xuất và đóng gói', '2—4 tuần · sản xuất, tập kết, đóng gói và kiểm đếm.'],
  ['07', 'Giao hàng', 'Theo lịch thỏa thuận · giao một điểm hoặc nhiều điểm, có biên bản bàn giao.'],
];

const navItems = [
  ['Về BOND', '/ve-bond'],
  ['Bộ sưu tập', '/bo-suu-tap'],
  ['Quà tặng', '/qua-tang'],
  ['Bao bì', '/bao-bi'],
  ['Vật phẩm', '/vat-pham'],
  ['Năng lực', '/nang-luc'],
  ['Góc nhìn', '/goc-nhin'],
];

const giftOccasions = [
  ['tet', 'Quà Tết doanh nghiệp 2027', 'Chốt hướng thiết kế trước giữa tháng 10 để đủ thời gian làm mẫu, sản xuất và giao nhiều điểm.'],
  ['tri-an-doi-tac', 'Tri ân đối tác', 'Ít mà tinh, cá nhân hóa từng người nhận bằng khắc tên, thiệp viết tay và trải nghiệm mở hộp.'],
  ['su-kien-hoi-nghi', 'Sự kiện & hội nghị', 'Đồng bộ nhận diện sự kiện trong điều kiện thời gian gấp và số lượng còn biến động.'],
  ['noi-bo', 'Quà tặng nội bộ', 'Onboarding, kỷ niệm thâm niên, lễ Tết nội bộ — những dịp cần sự quan tâm đúng người.'],
  ['ky-niem-thanh-lap', 'Kỷ niệm thành lập', 'Ngân sách và tính biểu tượng cao, gần với thiết kế vật phẩm lưu niệm riêng.'],
];

const packagingGroups = [
  ['hop', 'Hộp thương hiệu', 'Hộp cứng, hộp nam châm, hộp nắp rời và các kết cấu phù hợp với từng trải nghiệm mở.'],
  ['tui', 'Túi thương hiệu', 'Túi giấy, túi vải và các giải pháp mang đi giữ được màu sắc nhận diện.'],
  ['thiep-an-pham', 'Thiệp & ấn phẩm', 'Thiệp cảm ơn, card hướng dẫn, tag và vật phẩm nhỏ hoàn thiện điểm chạm.'],
  ['nganh-thoi-trang', 'Thời trang', 'Kết cấu, chất liệu và hoàn thiện dành cho thương hiệu thời trang.'],
  ['nganh-trang-suc', 'Trang sức', 'Hộp, khay và túi cần giữ được cảm giác tinh tế ở kích thước nhỏ.'],
  ['nganh-fmcg', 'FMCG & CPG', 'Bao bì có khả năng mở rộng số lượng và giữ đồng nhất trên nhiều SKU.'],
  ['nganh-my-pham', 'Mỹ phẩm', 'Chất liệu và gia công phù hợp với sản phẩm cần cảm giác sạch, chỉn chu.'],
  ['nganh-tra-ca-phe', 'Trà & cà phê', 'Kết hợp câu chuyện nguồn gốc, hạn sử dụng và trải nghiệm thưởng thức.'],
  ['nganh-fnb', 'F&B', 'Giải pháp bao bì cho các dịp tặng, ra mắt và chương trình thương hiệu.'],
];

const merchandiseGroups = [
  ['su-kien', 'Vật phẩm sự kiện', 'Từ quà check-in đến bộ vật phẩm đồng bộ cho một sự kiện nhiều điểm chạm.'],
  ['thuong-hieu', 'Vật phẩm thương hiệu', 'Vật phẩm sử dụng dài hơn một chiến dịch, giữ nhận diện trong đời sống hàng ngày.'],
  ['posm', 'POSM', 'Thiết kế, sản xuất và triển khai vật phẩm tại điểm bán với một đầu mối kiểm soát.'],
];

const capabilityGroups = [
  ['he-sinh-thai-100b', 'Hệ sinh thái 100B', 'ZAD nghĩ ra. BOND làm ra. 100B đứng sau.'],
  ['thiet-ke', 'Thiết kế', 'Thiết kế riêng bắt đầu từ người nhận, dịp tặng và cảm giác muốn để lại.'],
  ['san-xuat', 'Sản xuất', 'BOND sở hữu mạng lưới và quy trình kiểm soát, không bị giới hạn bởi một nhà máy.'],
  ['chuoi-cung-ung', 'Chuỗi cung ứng', 'Nguồn hàng rõ ràng, hồ sơ đầy đủ, hạn sử dụng tính từ ngày giao.'],
  ['doi-ngu', 'Đội ngũ', 'Kinh nghiệm vận hành quà tặng và vật phẩm ở quy mô lớn cho doanh nghiệp.'],
  ['hop-tac', 'Hợp tác', 'Hợp đồng, VAT, bảo mật, độc quyền mẫu và cam kết xử lý sự cố rõ ràng.'],
];

const insightPosts = [
  ['ngan-sach-qua-tet-doanh-nghiep', 'Ngân sách quà Tết doanh nghiệp: tính thế nào cho đúng', 'Ngân sách mỗi phần quà không chỉ là giá của vỏ hộp. Đây là cách nhìn đủ cả bao bì, ruột set, thiệp và hoàn thiện.'],
  ['lich-nguoc-qua-tet-2027', 'Lịch ngược cho quà Tết 2027: chốt muộn một tuần mất gì', 'Tết 2027 rơi vào ngày 6 tháng 2. Mỗi mốc chậm lại sẽ ảnh hưởng đến mẫu, sản xuất và giao hàng như thế nào?'],
  ['hoi-nha-cung-cap-ruot-set', 'Điều cần hỏi nhà cung cấp trước khi chốt ruột set quà Tết', 'Nguồn gốc, hồ sơ, hạn sử dụng và khả năng thay thế là những câu hỏi cần có trước khi ký.'],
  ['hai-bao-gia-khong-so-sanh-duoc', 'Vì sao hai báo giá cùng một con số lại không so sánh được với nhau', 'Khác biệt nằm ở cách tính cấu phần, sản lượng, mức hoàn thiện và trách nhiệm khi có sự cố.'],
  ['nam-loi-khien-hop-qua-hong', 'Năm lỗi khiến hộp quà hỏng trước khi đến tay người nhận', 'Một thiết kế đẹp vẫn có thể thất bại nếu không tính đến vận chuyển, độ ẩm và thời gian lưu kho.'],
  ['ep-kim-dap-noi-uv', 'Ép kim, dập nổi, UV định hình: chọn cái nào cho ngân sách nào', 'Ba kỹ thuật hoàn thiện, ba sắc thái thị giác và cách chọn theo mục tiêu thương hiệu.'],
  ['han-su-dung-qua-tet', 'Hạn sử dụng và quà Tết: điều ít người tính đến khi chọn ruột set', 'Hạn dùng cần được tính tại thời điểm người nhận cầm hộp trên tay, không phải khi xuất kho.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = document.querySelector(`[data-reveal="${className}"]`);
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [className]);
  return <div className={`reveal ${delay} ${visible ? 'visible' : ''}`} data-reveal={className}>{children}</div>;
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setMenuOpen(false), [location]);
  return (
    <header className="topbar" data-testid="navigation-header">
      <Link className="brand-link" href="/" aria-label="Về trang chủ BOND">
        <img className="brand-logo" src="/assets/bond-logo.png" alt="BOND" />
      </Link>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Điều hướng chính">
        <Link href="/">Trang chủ</Link>
        {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <Link className="nav-cta" href="/lien-he">Trao đổi cùng BOND <ArrowUpRight size={14} /></Link>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <img className="brand-logo" src="/assets/bond-logo.png" alt="BOND" />
          <p className="footer-note">Quà tặng doanh nghiệp, bao bì và vật phẩm thương hiệu.</p>
        </div>
        <div className="footer-links">
          <Link href="/ve-bond">Về BOND</Link>
          <Link href="/quy-trinh">Quy trình</Link>
          <Link href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </div>
        <div className="footer-note">© BOND / Thành viên hệ sinh thái 100B</div>
      </div>
    </footer>
  );
}

function SiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bond-site ${className}`}><SiteHeader /><main>{children}</main><Footer /></div>;
}

function PageIntro({ eyebrow, title, description, dark = false }: { eyebrow: string; title: ReactNode; description: string; dark?: boolean }) {
  return (
    <section className={`page-intro ${dark ? 'page-intro-dark' : ''}`}>
      <div className="container page-intro-inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}

function Breadcrumbs({ items }: { items: string[] }) {
  return <div className="container breadcrumbs"><Link href="/">BOND</Link>{items.map((item) => <span key={item}>/ {item}</span>)}</div>;
}

function Home() {
  const services = [
    ['/qua-tang', '01', 'Quà tặng doanh nghiệp', 'Tết, tri ân đối tác, sự kiện, nội bộ. Thiết kế riêng, nguồn hàng tuyển chọn, giao đến từng điểm nhận.'],
    ['/bao-bi', '02', 'Bao bì thương hiệu', 'Hộp, túi, thiệp và ấn phẩm cho thời trang, trang sức, mỹ phẩm, FMCG.'],
    ['/vat-pham', '03', 'Vật phẩm quảng cáo', 'Vật phẩm sự kiện, vật phẩm thương hiệu, POSM. Vận hành ở quy mô lớn nhiều năm.'],
  ];
  return (
    <SiteShell>
      <section className="hero" id="top" data-testid="section-hero">
        <div className="hero-grid">
          <div>
            <div className="hero-kicker eyebrow"><span>Quà tặng · Bao bì · Vật phẩm</span><span /></div>
            <h1>Relationships,<br /><em>compounded.</em></h1>
            <p className="hero-subtitle">Mối quan hệ, được nhân lên theo thời gian.</p>
            <p className="hero-copy">BOND thiết kế và sản xuất trọn gói quà tặng doanh nghiệp, bao bì và vật phẩm quảng cáo. Thành viên hệ sinh thái 100B.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/bo-suu-tap">Xem bộ sưu tập <ArrowDownRight size={15} /></Link>
              <Link className="button-ghost" href="/lien-he">Trao đổi cùng BOND <ArrowUpRight size={15} /></Link>
            </div>
          </div>
          <aside className="hero-side"><div className="hero-seal"><div className="hero-seal-inner">Design-led<br />production<br />since 2019</div></div><div className="hero-index"><span className="eyebrow">01 / 08</span><br />Một món quà đúng lúc có thể mở ra một mùa hợp tác mới.</div></aside>
        </div>
        <div className="scroll-cue">Cuộn để đi sâu hơn ↓</div>
      </section>

      <section className="section red-band" id="meaning">
        <div className="container">
          <Reveal className="meaning-heading"><SectionHeading eyebrow="01 — Vì sao là BOND" title={<>Một món quà<br />không phải chi phí.</>} description="Trong tiếng Anh, bond là sợi dây gắn kết giữa người với người. Cũng là một khoản đầu tư sinh lời theo thời gian." /></Reveal>
          <div className="meaning-grid"><Reveal className="meaning-lead">Chúng tôi tin quà tặng doanh nghiệp vận hành như một khoản đầu tư vào mối quan hệ.</Reveal><Reveal className="meaning-copy" delay="delay-2"><div className="rule" /><p>Giá trị của nó được nhân lên qua từng mùa. Mỗi phần quà BOND làm ra đều mang một câu hỏi duy nhất: khi người nhận mở ra, họ cảm thấy mình quan trọng đến mức nào?</p><p><strong>Thiết kế để được nhớ. Sản xuất để được tin.</strong></p></Reveal></div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <SectionHeading eyebrow="02 — Chúng tôi làm gì" title={<>Từ ý tưởng<br />đến điểm giao.</>} description="Một đầu mối cho những điểm chạm thương hiệu cần được làm đến nơi đến chốn." />
          <div className="service-grid">{services.map(([href, number, title, copy], index) => <Reveal key={number} className={`service-card-${number}`} delay={`delay-${index + 1}`}><Link className="service-card" href={href}><span className="service-no">{number}</span><h3>{title}</h3><p>{copy}</p><span className="service-arrow">↗</span></Link></Reveal>)}</div>
        </div>
      </section>

      <section className="section ecosystem" id="ecosystem">
        <div className="container">
          <div className="ecosystem-grid"><Reveal className="ecosystem-copy"><div className="eyebrow">03 — Hệ sinh thái</div><h2>ZAD nghĩ ra.<br />BOND làm ra.<br /><span>100B đứng sau.</span></h2><p className="ecosystem-intro">Anh chị làm việc với một đầu mối. Phía sau là một hệ sinh thái đã vận hành nhiều năm.</p></Reveal><Reveal className="ecosystem-stack" delay="delay-1"><div className="ecosystem-stack">{[['zad-logo.png', 'ZAD', 'Thiết kế và sáng tạo, nhận diện thương hiệu, thiết kế bao bì và vật phẩm.'], ['bond-logo.png', 'BOND', 'Sản xuất và triển khai, nguồn hàng, hoàn thiện, đóng gói, giao hàng.'], ['100b-logo.png', '100B', 'Holding đứng sau toàn hệ sinh thái, pháp nhân, quản trị, cam kết.']].map(([logo, name, copy]) => <div className="eco-row" key={name}><div className="eco-logo"><img src={`/assets/${logo}`} alt={name} /></div><div><div className="eco-name">{name}</div><p>{copy}</p></div></div>)}</div><p className="eco-close">Một hợp đồng thay vì ba.<br />Một người chịu trách nhiệm khi có sự cố.</p></Reveal></div>
          <div className="partner-strip"><div className="eyebrow">Các thương hiệu đã đồng hành cùng hệ sinh thái 100B</div><div className="partner-words"><span>TH true MILK</span><span>VINAMILK</span><span>PNJ</span><span>SHOPEE</span><span>VNG</span></div></div>
        </div>
      </section>

      <section className="section collection" id="collection">
        <div className="container"><div className="collection-layout"><div className="collection-intro"><div className="eyebrow">04 — Bộ sưu tập</div><h2>Chọn một<br />hướng đi.</h2><p>Hơn 40 thiết kế, ở mọi mức ngân sách, đều có thể phát triển thành phiên bản riêng của thương hiệu anh chị.</p><Link className="text-link" href="/bo-suu-tap">Xem toàn bộ thư viện <ArrowUpRight size={14} /></Link></div><div className="collection-grid">{catalog.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></div>
      </section>

      <section className="section process" id="process"><div className="container"><SectionHeading eyebrow="05 — Quy trình" title={<>Rõ từng mốc.<br />Chắc từng bước.</>} description="Đơn thiết kế riêng thường mất 6—10 tuần từ brief đến giao hàng. Chúng tôi nói rõ ngay từ đầu." /><div className="process-line">{processSteps.slice(0, 5).map(([number, title, copy]) => <article className="process-step" key={number}><div className="step-number">{number}</div><h3>{title}</h3><p>{copy}</p></article>)}</div><Link className="button-dark" href="/quy-trinh">Xem quy trình đầy đủ <ArrowUpRight size={15} /></Link></div></section>

      <section className="section projects" id="projects"><div className="container"><SectionHeading eyebrow="06 — Dự án & quy mô" title={<>Làm thật.<br />Ở quy mô thật.</>} description="Một vài lát cắt từ những bài toán cần cả ý tưởng lẫn năng lực triển khai." /><div className="projects-grid"><Link href="/du-an/mua-tet-nhieu-tang-nguoi-nhan" className="project-card"><div className="project-tag">01 / FMCG · 2024</div><div><h3>Một mùa Tết, nhiều tầng người nhận.</h3><p>Phân tầng ngân sách, đồng bộ ngôn ngữ thiết kế, giao hàng đa điểm trong cùng một tuần.</p></div></Link><Link href="/du-an/bao-bi-mo-hop" className="project-card"><div className="project-tag">02 / F&B</div><h3>Bao bì cho một lần mở hộp đáng nhớ.</h3></Link><Link href="/du-an/goi-ten-nguoi-da-di-cung" className="project-card"><div className="project-tag">03 / Nội bộ</div><h3>Gọi tên người đã đi cùng.</h3></Link></div><div className="metrics"><div className="metric"><strong>100B</strong><span>quy mô đội ngũ từng vận hành mỗi năm</span></div><div className="metric"><strong>02</strong><span>quốc gia trong mạng lưới sản xuất</span></div><div className="metric"><strong>03</strong><span>đơn vị trong một hệ sinh thái</span></div></div></div></section>

      <section className="final-cta"><div className="container final-grid"><div><div className="eyebrow">07 — Bắt đầu từ đây</div><h2>Mùa Tết 2027<br />bắt đầu <em>từ bây giờ.</em></h2><p className="final-copy">Tết 2027 rơi vào ngày 6 tháng 2. Để kịp thiết kế riêng và sản xuất, thời điểm an toàn để bắt đầu là trước giữa tháng 10.</p></div><ContactForm /></div></section>
    </SiteShell>
  );
}

function ProductCard({ product }: { product: CatalogItem }) {
  return <Link className="product-card" href={`/bo-suu-tap/${product.slug}`}><div className={`product-art ${product.art}`}><div className="package"><span className="package-label">BOND / {product.slug.split('-')[0]}</span></div></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.material} · {product.style}</p></div><span className="budget">{product.budget}</span></div></Link>;
}

function AboutPage() {
  return <SiteShell><Breadcrumbs items={['Về BOND']} /><PageIntro eyebrow="Về BOND" title={<>Cái tên nói đúng<br />việc chúng tôi làm.</>} description="BOND thiết kế và sản xuất trọn gói quà tặng doanh nghiệp, bao bì và vật phẩm quảng cáo cho các thương hiệu lớn tại Việt Nam." /><section className="section page-copy"><div className="container narrow-copy"><p className="lede">Trong tiếng Anh, bond là sợi dây gắn kết giữa người với người. Cũng là từ chỉ một khoản đầu tư sinh lời theo thời gian.</p><p>Phần lớn quà tặng doanh nghiệp được mua như một nghĩa vụ. Chốt gấp vào tháng cuối năm, chọn mẫu có sẵn, in logo lên, gửi đi. Người nhận mở ra, quên trong một tuần.</p><p>BOND làm ngược lại. Bắt đầu từ việc người nhận là ai và anh chị muốn họ cảm thấy gì. Rồi mới đến thiết kế, chất liệu, sản phẩm bên trong và cách hộp được mở ra.</p></div></section><section className="section red-band value-band"><div className="container"><SectionHeading eyebrow="Ba điều BOND giữ" title="Thiết kế trước.<br />Sản xuất sau." description="Một đầu mối. Cam kết bằng mốc ngày. Mỗi quyết định đều quay về cảm giác của người nhận và sự yên tâm của người đặt hàng." /><div className="value-grid"><div><strong>01</strong><h3>Thiết kế trước, sản xuất sau</h3><p>Không ép thương hiệu vào mẫu có sẵn chỉ vì dễ sản xuất.</p></div><div><strong>02</strong><h3>Một đầu mối</h3><p>ZAD, BOND và 100B cùng đứng sau một cam kết rõ ràng.</p></div><div><strong>03</strong><h3>Cam kết bằng mốc ngày</h3><p>Nói rõ tiến độ trước khi bắt đầu và chủ động khi có thay đổi.</p></div></div></div></section><section className="section"><div className="container"><SectionHeading eyebrow="Hệ sinh thái" title="Ba vai trò. Một trách nhiệm." description="Anh chị không cần điều phối ba nhà cung cấp cho một món quà." /><div className="role-grid"><div><img src="/assets/zad-logo.png" alt="ZAD" /><h3>Thiết kế và sáng tạo</h3><p>Nhận diện thương hiệu, thiết kế bao bì và vật phẩm.</p></div><div><img src="/assets/bond-logo.png" alt="BOND" /><h3>Sản xuất và triển khai</h3><p>Nguồn hàng, sản xuất, hoàn thiện, đóng gói, giao hàng.</p></div><div><img src="/assets/100b-logo.png" alt="100B" /><h3>Holding đứng sau</h3><p>Pháp nhân, quản trị và cam kết của toàn hệ sinh thái.</p></div></div></div></section></SiteShell>;
}

function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const filters = ['Tất cả', 'Dưới 1 triệu', '1—2 triệu', '2—5 triệu', 'Trên 5 triệu'];
  const visibleProducts = useMemo(() => activeFilter === 'Tất cả' ? catalog : catalog.filter((product) => product.budget === activeFilter), [activeFilter]);
  return <SiteShell><Breadcrumbs items={['Bộ sưu tập']} /><PageIntro eyebrow="Thư viện mẫu" title={<>Bộ sưu tập<br />của BOND.</>} description="Hơn 40 thiết kế do ZAD thực hiện dành riêng cho BOND. Đây là các thiết kế mẫu, không phải hàng bán sẵn. Anh chị chọn một hướng, chúng tôi phát triển thành phiên bản của riêng thương hiệu anh chị." /><section className="section collection-page"><div className="container"><div className="notice-box"><strong>Thiết kế riêng ở mọi mức ngân sách.</strong><p>Khác biệt giữa các mức ngân sách nằm ở chất liệu, kỹ thuật gia công và sản phẩm bên trong, không nằm ở việc có được thiết kế riêng hay không.</p></div><div className="filter-row"><span className="eyebrow">Ngân sách mỗi phần quà</span>{filters.map((filter) => <button className={`filter-button ${activeFilter === filter ? 'active' : ''}`} key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><p className="budget-explainer"><strong>Ngân sách này gồm những gì?</strong> Con số tính cho trọn bộ: hộp, bao bì, sản phẩm bên trong, thiệp và đóng gói hoàn thiện. Sản lượng ảnh hưởng đáng kể đến con số cuối.</p><div className="catalog-grid">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div><div className="page-cta"><div><span className="eyebrow">Xem mẫu thật trước khi quyết định</span><h2>Đội ngũ BOND mang mẫu vật lý đến văn phòng anh chị.</h2></div><Link className="button-primary" href="/lien-he">Yêu cầu mang mẫu <ArrowUpRight size={15} /></Link></div></div></section></SiteShell>;
}

function CatalogDetailPage() {
  const [, params] = useRoute('/bo-suu-tap/:slug');
  const product = catalog.find((item) => item.slug === params?.slug) ?? { ...catalog[0], slug: params?.slug ?? 'mau-bond', name: 'Mẫu thiết kế riêng của BOND', description: 'Một hướng thiết kế có thể được phát triển tiếp theo nhận diện, ngân sách và người nhận của thương hiệu anh chị.' };
  return <SiteShell><Breadcrumbs items={['Bộ sưu tập', product.name]} /><PageIntro eyebrow={`Bộ sưu tập / ${product.budget}`} title={product.name} description={product.description} /><section className="section detail-page"><div className="container detail-layout"><div className={`detail-art product-art ${product.art}`}><div className="package"><span className="package-label">BOND / {product.slug}</span></div></div><div className="detail-copy"><div className="eyebrow">Câu chuyện thiết kế</div><p className="lede">Khi người nhận mở hộp, điều còn lại không chỉ là món quà mà là cảm giác được đặt vào đúng vị trí.</p><p>{product.description} BOND sẽ phát triển lại mẫu này theo nhận diện thương hiệu của anh chị — màu, chất liệu, cấu trúc và cách mở.</p><div className="spec-list"><div><span>Chất liệu</span><strong>{product.material}</strong></div><div><span>Phong cách</span><strong>{product.style}</strong></div><div><span>Khoảng ngân sách</span><strong>{product.budget}</strong></div><div><span>Khả năng tùy biến</span><strong>Màu, cấu trúc, ruột set và hoàn thiện</strong></div></div><Link className="button-primary" href="/lien-he">Yêu cầu phương án cho mẫu này <ArrowUpRight size={15} /></Link></div></div></section><section className="section related-section"><div className="container"><SectionHeading eyebrow="Phiên bản riêng" title="Mẫu sau khi hoàn thiện thuộc về riêng anh chị." description="Điều này áp dụng ở mọi mức ngân sách. Chúng tôi không dùng lại phiên bản đã phát triển cho khách hàng khác." /><div className="catalog-grid">{catalog.filter((item) => item.slug !== product.slug).slice(0, 4).map((item) => <ProductCard key={item.slug} product={item} />)}</div></div></section></SiteShell>;
}

function SignaturePage() {
  return <SiteShell><Breadcrumbs items={['Bộ sưu tập', 'Signature']} /><PageIntro eyebrow="BOND Signature" title={<>Những thiết kế<br />BOND giữ cho riêng mình.</>} description="Đây là phần quà mà BOND và hệ sinh thái 100B mang đi tặng đối tác của chính mình." /><section className="section signature-page"><div className="container"><div className="signature-grid"><div className="signature-card signature-card-red"><span className="eyebrow">Signature / 01</span><h2>Red Archive</h2><p>Hộp lưu trữ dành cho những mối quan hệ được xây dựng qua nhiều mùa.</p></div><div className="signature-card signature-card-paper"><span className="eyebrow">Signature / 02</span><h2>Common Table</h2><p>Một bộ quà đặt người nhận vào cùng một câu chuyện.</p></div><div className="signature-card signature-card-dark"><span className="eyebrow">Signature / 03</span><h2>After Hours</h2><p>Vật phẩm dành cho những cuộc gặp quan trọng sau giờ làm việc.</p></div></div><div className="exclusive-box"><h2>Một số mẫu có thể được chuyển nhượng độc quyền cho một thương hiệu duy nhất.</h2><p>Kèm cam kết sản lượng tối thiểu. Sau khi chuyển nhượng, BOND ngừng sử dụng mẫu đó cho mọi khách hàng khác.</p><Link className="button-dark" href="/lien-he">Trao đổi về quyền độc quyền <ArrowUpRight size={15} /></Link></div></div></section></SiteShell>;
}

function ProcessPage() {
  const faqs = ['Sản lượng tối thiểu là bao nhiêu?', 'Có thể thay đổi số lượng sau khi đã chốt không?', 'Thiết kế riêng có tính phí riêng không?', 'Ai giữ quyền sở hữu thiết kế?', 'Có xuất hóa đơn VAT không?', 'Giao nhiều địa chỉ có tính thêm phí không?'];
  return <SiteShell><Breadcrumbs items={['Quy trình']} /><PageIntro eyebrow="Từ brief đến giao hàng" title={<>Quy trình<br />đặt hàng.</>} description="Một đơn quà tặng doanh nghiệp thiết kế riêng thường mất 6 đến 10 tuần từ lúc chốt brief đến khi giao hàng. Đơn chọn từ mẫu có sẵn và chỉ tùy biến logo mất khoảng 3 đến 4 tuần." /><section className="section process-page"><div className="container"><div className="long-process">{processSteps.map(([number, title, copy]) => <article key={number}><div className="step-number">{number}</div><div><h2>{title}</h2><p>{copy}</p></div></article>)}</div><div className="two-column-callouts"><div className="callout"><span className="eyebrow">Nếu anh chị đang gấp</span><h3>Khoảng 3 tuần là thời gian tối thiểu khả thi.</h3><p>Chọn mẫu có sẵn trong bộ sưu tập và chỉ tùy biến phần nhận diện, với điều kiện chốt ruột set trong tuần đầu.</p></div><div className="callout"><span className="eyebrow">Anh chị cần chuẩn bị gì</span><h3>File nhận diện, danh sách người nhận và mốc duyệt.</h3><p>Thêm danh sách điểm giao và người đầu mối ký duyệt để BOND lên phương án sát thực tế.</p></div></div><div className="payment-strip"><strong>Hợp đồng mua bán · Hóa đơn VAT đầy đủ · Đặt cọc tối đa 50% khi ký · Thanh toán phần còn lại sau nghiệm thu.</strong></div><div className="faq-list"><SectionHeading eyebrow="Câu hỏi thường gặp" title="Những điều cần biết trước khi bắt đầu." />{faqs.map((question) => <details key={question}><summary>{question}</summary><p>BOND sẽ trao đổi cụ thể theo số lượng, mức tùy biến, thời điểm cần hàng và cấu phần của từng dự án. Các mốc và trách nhiệm sẽ được ghi rõ trong đề xuất và hợp đồng.</p></details>)}</div></div></section></SiteShell>;
}

function ServiceHubPage({ type }: { type: 'gift' | 'packaging' | 'merchandise' }) {
  const isGift = type === 'gift';
  const isPackaging = type === 'packaging';
  const title = isGift ? 'Quà tặng doanh nghiệp' : isPackaging ? 'Bao bì thương hiệu' : 'Vật phẩm quảng cáo';
  const description = isGift ? 'BOND làm trọn gói từ ý tưởng đến điểm giao cuối cùng. Thiết kế do ZAD thực hiện, nguồn hàng do BOND tuyển chọn, sản xuất và giao hàng do BOND kiểm soát.' : isPackaging ? 'Bao bì là điểm chạm vật lý cuối cùng giữa thương hiệu và khách hàng. BOND làm phần đó, với thiết kế từ ZAD và mạng lưới sản xuất tại Việt Nam và Trung Quốc.' : 'Mảng đội ngũ BOND đã vận hành ở quy mô lớn. Gộp về một đầu mối giúp giữ đồng nhất chất lượng và giảm chi phí quản lý.';
  const items = isGift ? giftOccasions : isPackaging ? packagingGroups : merchandiseGroups;
  const base = isGift ? '/qua-tang' : isPackaging ? '/bao-bi' : '/vat-pham';
  return <SiteShell><Breadcrumbs items={[title]} /><PageIntro eyebrow={isGift ? 'Quà tặng' : isPackaging ? 'Bao bì' : 'Vật phẩm'} title={title} description={description} /><section className="section hub-page"><div className="container"><div className="service-intro-row"><div className="lede">Ba cách hợp tác: chọn từ bộ sưu tập, thiết kế riêng trọn gói, hoặc độc quyền theo sản lượng.</div><Link className="button-primary" href="/quy-trinh">Xem quy trình <ArrowUpRight size={15} /></Link></div><div className="hub-grid">{items.map(([slug, itemTitle, copy], index) => <Link className="hub-card" href={`${base}/${slug}`} key={slug}><span className="eyebrow">0{index + 1}</span><h2>{itemTitle}</h2><p>{copy}</p><span className="service-arrow">↗</span></Link>)}</div>{isPackaging && <div className="existing-client-note"><strong>Nếu thương hiệu của anh chị đã làm việc với ZAD</strong><p>Toàn bộ file nhận diện và hệ thống thiết kế đã sẵn sàng. Không phải bắt đầu lại, không phải giải thích lại brand guideline cho một nhà cung cấp mới.</p></div>}</div></section></SiteShell>;
}

function ServiceDetailPage({ kind }: { kind: 'gift' | 'packaging' | 'merchandise' }) {
  const [location] = useLocation();
  const slug = location.split('/').pop() ?? '';
  const base = kind === 'gift' ? giftOccasions : kind === 'packaging' ? packagingGroups : merchandiseGroups;
  const item = base.find(([itemSlug]) => itemSlug === slug) ?? base[0];
  const title = item[1];
  return <SiteShell><Breadcrumbs items={[kind === 'gift' ? 'Quà tặng' : kind === 'packaging' ? 'Bao bì' : 'Vật phẩm', title]} /><PageIntro eyebrow={`${kind === 'gift' ? 'Quà tặng' : kind === 'packaging' ? 'Bao bì thương hiệu' : 'Vật phẩm quảng cáo'} / Chi tiết`} title={title} description={item[2]} /><section className="section detail-page"><div className="container detail-layout"><div className="feature-panel"><div className="eyebrow">BOND / {item[0]}</div><h2>Đúng bài toán.<br />Đúng điểm chạm.</h2><div className="feature-lines"><span>Thiết kế theo nhận diện</span><span>Sản xuất có kiểm soát</span><span>Giao hàng theo mốc</span></div></div><div className="detail-copy"><p className="lede">{item[2]}</p><p>BOND cùng anh chị xác định người nhận, dịp sử dụng, số lượng, ngân sách và mốc cần hàng trước khi đề xuất cấu trúc phù hợp. Mỗi phương án được trình bày rõ chất liệu, kỹ thuật, thời gian và trách nhiệm.</p><h3>Những điều thường được quan tâm</h3><ul className="check-list"><li>Khả năng tùy biến theo nhận diện thương hiệu.</li><li>MOQ và thời gian tham khảo theo từng nhóm.</li><li>Hồ sơ nguồn hàng và mẫu vật lý trước khi duyệt.</li><li>Giao một điểm hoặc nhiều điểm theo lịch.</li></ul><Link className="button-primary" href="/lien-he">Trao đổi bài toán này <ArrowUpRight size={15} /></Link></div></div></section></SiteShell>;
}

function ProjectsPage() {
  const projects = [['mua-tet-nhieu-tang-nguoi-nhan', 'Một mùa Tết, nhiều tầng người nhận.', 'FMCG · Quà Tết 2024'], ['bao-bi-mo-hop', 'Bao bì cho một lần mở hộp đáng nhớ.', 'F&B · Bao bì'], ['goi-ten-nguoi-da-di-cung', 'Gọi tên người đã đi cùng.', 'Nội bộ · Kỷ niệm'], ['bo-qua-doanh-nghiep-da-diem', 'Một bộ quà, nhiều điểm giao.', 'Dịch vụ · Vận hành']];
  return <SiteShell><Breadcrumbs items={['Dự án']} /><PageIntro eyebrow="Dự án" title={<>Làm thật.<br />Ở quy mô thật.</>} description="Một số dự án được trình bày ẩn danh theo thỏa thuận bảo mật với khách hàng. Thiết kế: ZAD. Sản xuất và triển khai: BOND. Thành viên hệ sinh thái 100B." /><section className="section projects-page"><div className="container"><div className="filter-row"><span className="eyebrow">Lọc dự án</span><button className="filter-button active">Tất cả</button><button className="filter-button">Ngành</button><button className="filter-button">Vật phẩm</button><button className="filter-button">Loại dự án</button></div><div className="case-grid">{projects.map(([slug, title, meta], index) => <Link className={`case-card case-${index + 1}`} href={`/du-an/${slug}`} key={slug}><span className="eyebrow">{meta}</span><h2>{title}</h2><span className="service-arrow">↗</span></Link>)}</div></div></section></SiteShell>;
}

function ProjectDetailPage() {
  const [, params] = useRoute('/du-an/:slug');
  const slug = params?.slug ?? '';
  const title = slug === 'bao-bi-mo-hop' ? 'Bao bì cho một lần mở hộp đáng nhớ.' : slug === 'goi-ten-nguoi-da-di-cung' ? 'Gọi tên người đã đi cùng.' : slug === 'bo-qua-doanh-nghiep-da-diem' ? 'Một bộ quà, nhiều điểm giao.' : 'Một mùa Tết, nhiều tầng người nhận.';
  return <SiteShell><Breadcrumbs items={['Dự án', title]} /><PageIntro eyebrow="Case study" title={title} description="Một bài toán cần được nhìn từ bối cảnh, yêu cầu, cách giải và kết quả — không chỉ từ một hình ảnh đẹp." /><section className="section case-detail"><div className="container"><div className="case-hero-panel"><span className="eyebrow">Thiết kế: ZAD · Sản xuất và triển khai: BOND · Hệ sinh thái 100B</span><h2>Để một ý tưởng đi được đến tay người nhận.</h2></div><div className="case-copy-grid"><div><span className="eyebrow">Bối cảnh</span><p>Thương hiệu cần một giải pháp đủ khác biệt để tạo cảm giác được trân trọng, nhưng vẫn cần vận hành ổn định ở quy mô lớn và nhiều mốc giao.</p></div><div><span className="eyebrow">Cách giải</span><p>BOND gom thiết kế, nguồn hàng, sản xuất, đóng gói và giao hàng về một đầu mối. Mẫu thật được duyệt trước khi đi vào sản xuất.</p></div><div><span className="eyebrow">Kết quả</span><p>Người đặt hàng có một hệ thống rõ mốc; người nhận có một món quà có lý do để nhớ.</p></div></div><Link className="button-primary" href="/lien-he">Trao đổi dự án tương tự <ArrowUpRight size={15} /></Link></div></section></SiteShell>;
}

function CapabilitiesPage() {
  return <SiteShell><Breadcrumbs items={['Năng lực']} /><PageIntro eyebrow="Năng lực BOND" title={<>Một hệ sinh thái<br />đã vận hành.</>} description="Năng lực của BOND đến từ hệ sinh thái phía sau và từ những người đã làm việc này ở quy mô lớn." /><section className="section capabilities-page"><div className="container"><div className="hub-grid">{capabilityGroups.map(([slug, title, copy], index) => <Link className="hub-card" href={`/nang-luc/${slug}`} key={slug}><span className="eyebrow">0{index + 1}</span><h2>{title}</h2><p>{copy}</p><span className="service-arrow">↗</span></Link>)}</div></div></section></SiteShell>;
}

function CapabilityDetailPage() {
  const [, params] = useRoute('/nang-luc/:slug');
  const item = capabilityGroups.find(([slug]) => slug === params?.slug) ?? capabilityGroups[0];
  return <SiteShell><Breadcrumbs items={['Năng lực', item[1]]} /><PageIntro eyebrow={`Năng lực / ${item[1]}`} title={item[1]} description={item[2]} /><section className="section detail-page"><div className="container detail-layout"><div className="feature-panel dark-panel"><div className="eyebrow">BOND / Năng lực</div><h2>{item[2]}</h2><div className="feature-lines"><span>Rõ vai trò</span><span>Rõ hồ sơ</span><span>Rõ trách nhiệm</span></div></div><div className="detail-copy"><p className="lede">Anh chị làm việc với một đầu mối. Phía sau là một hệ thống có người chịu trách nhiệm ở từng đoạn.</p><p>Chúng tôi nói rõ điều mình làm, điều mình không làm và hồ sơ cần có trước khi bắt đầu. Đây là cách giảm rủi ro cho những đơn hàng có nhiều người nhận, nhiều điểm giao và mốc thời gian cố định.</p><Link className="button-primary" href="/lien-he">Trao đổi về năng lực này <ArrowUpRight size={15} /></Link></div></div></section></SiteShell>;
}

function InsightsPage() {
  return <SiteShell><Breadcrumbs items={['Góc nhìn']} /><PageIntro eyebrow="Góc nhìn" title={<>Những điều cần biết<br />trước khi chốt.</>} description="Tiến độ, ngân sách, sai lầm thường gặp, kỹ thuật và chất liệu — viết cho những người phải ra quyết định." /><section className="section insights-page"><div className="container"><div className="insight-grid">{insightPosts.map(([slug, title, excerpt], index) => <Link className="insight-card" href={`/goc-nhin/${slug}`} key={slug}><span className="eyebrow">{index < 2 ? 'Tiến độ' : index < 4 ? 'Ngân sách' : 'Kỹ thuật và chất liệu'}</span><h2>{title}</h2><p>{excerpt}</p><span className="text-link">Đọc bài <ArrowUpRight size={14} /></span></Link>)}</div></div></section></SiteShell>;
}

function InsightDetailPage() {
  const [, params] = useRoute('/goc-nhin/:slug');
  const post = insightPosts.find(([slug]) => slug === params?.slug) ?? insightPosts[0];
  return <SiteShell><Breadcrumbs items={['Góc nhìn', post[1]]} /><PageIntro eyebrow="Góc nhìn / BOND" title={post[1]} description={post[2]} /><article className="section article-page"><div className="container article-grid"><div className="article-meta"><span className="eyebrow">BOND Journal</span><span>Đọc trong 5 phút</span><span>Thông tin tham khảo</span></div><div className="article-body"><p className="lede">{post[2]}</p><p>Đối với một đơn quà tặng doanh nghiệp, con số cuối cùng chỉ là một phần của bài toán. Người đặt hàng còn cần nhìn thấy thời gian, hồ sơ nguồn hàng, mức độ tùy biến và cách xử lý khi danh sách người nhận thay đổi.</p><h2>Bắt đầu từ người nhận và mốc cần hàng</h2><p>Khi hai yếu tố này rõ, việc chọn chất liệu, cấu phần ruột set và kỹ thuật hoàn thiện sẽ dễ so sánh hơn. BOND luôn trình bày phương án theo cùng một cấu trúc để anh chị có thể đưa ra quyết định mà không phải đọc lại nhiều báo giá rời rạc.</p><blockquote>Thiết kế riêng không phải là đặc quyền của một mức ngân sách. Nó là cách làm của BOND.</blockquote><Link className="button-primary" href="/lien-he">Trao đổi cùng BOND <ArrowUpRight size={15} /></Link></div></div></article></SiteShell>;
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) return <div className="contact-form form-success" role="status"><strong>Đã nhận lời nhắn.</strong><br />BOND sẽ liên hệ để cùng anh chị mở bài toán phù hợp.</div>;
  return <form className="contact-form" onSubmit={handleSubmit}><label htmlFor="contact-name">Tên người liên hệ</label><input id="contact-name" required placeholder="Anh chị tên là..." /><label htmlFor="contact-company">Công ty</label><input id="contact-company" required placeholder="Tên doanh nghiệp" /><label htmlFor="contact-email">Email công ty</label><input id="contact-email" type="email" required placeholder="email@congty.vn" /><label htmlFor="contact-note">Điều anh chị đang cần</label><textarea id="contact-note" required placeholder="Dịp, số lượng dự kiến, thời điểm cần hàng..." /><button type="submit" className="button-primary">Gửi brief cho BOND <ArrowUpRight size={15} /></button></form>;
}

function ContactPage() {
  return <SiteShell><Breadcrumbs items={['Liên hệ']} /><PageIntro eyebrow="Bắt đầu từ đây" title={<>Mở một bài toán<br />cùng BOND.</>} description="Anh chị cho chúng tôi biết dịp, số lượng dự kiến, ngân sách mỗi phần và thời điểm cần hàng. Nếu chưa rõ ngân sách, BOND sẽ đề xuất khoảng phù hợp với nhóm người nhận." /><section className="section contact-page"><div className="container contact-layout"><div className="contact-details"><span className="eyebrow">Thông tin cần chuẩn bị</span><h2>Không cần một brief hoàn hảo để bắt đầu.</h2><ul className="check-list"><li>File nhận diện thương hiệu</li><li>Danh sách nhóm người nhận và số lượng</li><li>Danh sách điểm giao</li><li>Người đầu mối ký duyệt</li></ul><div className="contact-note"><strong>Hợp đồng mua bán, hóa đơn VAT đầy đủ.</strong><br />Đặt cọc tối đa 50% khi ký, thanh toán phần còn lại sau nghiệm thu.</div></div><ContactForm /></div></section></SiteShell>;
}

function UtilityPage({ kind }: { kind: 'documents' | 'faq' | 'careers' | 'privacy' | 'terms' }) {
  const config = {
    documents: ['Tài liệu', 'Nhận bộ sưu tập PDF.', 'Để lại email công ty, BOND sẽ gửi bộ tài liệu phù hợp với mối quan tâm của anh chị.'],
    faq: ['Câu hỏi thường gặp', 'Những điều cần biết trước khi bắt đầu.', 'Các câu hỏi phổ biến về sản lượng, thiết kế, nguồn hàng, VAT và giao nhiều địa chỉ.'],
    careers: ['Tuyển dụng', 'Làm những điều đáng để nhớ.', 'BOND ưu tiên những vị trí vận hành, nơi sự chỉn chu được biến thành trải nghiệm cho người nhận.'],
    privacy: ['Chính sách bảo mật', 'BOND giữ thông tin của anh chị như thế nào.', 'Chúng tôi chỉ sử dụng thông tin được cung cấp để tư vấn, chuẩn bị phương án và liên hệ theo yêu cầu.'],
    terms: ['Điều khoản', 'Các nguyên tắc khi làm việc cùng BOND.', 'Nội dung dưới đây là khung thông tin tham khảo cho quá trình trao đổi và ký kết.'],
  }[kind];
  if (kind === 'documents') return <SiteShell><Breadcrumbs items={['Tài liệu']} /><PageIntro eyebrow={config[0]} title={config[1]} description={config[2]} /><section className="section utility-page"><div className="container form-page-card"><span className="eyebrow">Nhận bộ sưu tập PDF</span><h2>Để lại email công ty.</h2><form className="simple-form"><input type="email" required placeholder="email@congty.vn" /><button className="button-primary" type="submit">Nhận tài liệu <ArrowUpRight size={15} /></button></form><p>Bộ tài liệu gồm hướng thiết kế, khung ngân sách và quy trình làm việc cùng BOND.</p></div></section></SiteShell>;
  if (kind === 'faq') return <SiteShell><Breadcrumbs items={['Câu hỏi thường gặp']} /><PageIntro eyebrow={config[0]} title={config[1]} description={config[2]} /><section className="section utility-page"><div className="container faq-list">{['Sản lượng tối thiểu là bao nhiêu?', 'Thiết kế riêng có tính phí riêng không?', 'Ai giữ quyền sở hữu thiết kế?', 'Có xuất hóa đơn VAT không?', 'Giao nhiều địa chỉ có tính thêm phí không?', 'BOND có thể làm đơn gấp không?'].map((question) => <details key={question}><summary>{question}</summary><p>BOND sẽ tư vấn theo dịp, số lượng, ngân sách và thời điểm cần hàng. Các thông tin cụ thể được ghi rõ trong phương án và hợp đồng trước khi triển khai.</p></details>)}</div></section></SiteShell>;
  return <SiteShell><Breadcrumbs items={[config[0]]} /><PageIntro eyebrow={config[0]} title={config[1]} description={config[2]} /><section className="section utility-page"><div className="container narrow-copy"><p className="lede">{config[2]}</p><p>BOND tôn trọng sự riêng tư, quyền sở hữu trí tuệ và những thỏa thuận bảo mật trong quá trình làm việc. Mọi thông tin chi tiết sẽ được xác nhận trong văn bản phù hợp với từng dự án.</p><p>Để trao đổi cụ thể, anh chị có thể <Link className="text-link" href="/lien-he">liên hệ cùng BOND</Link>.</p></div></section></SiteShell>;
}

function KitGate() {
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
  if (!unlocked) return <div className="kit-gate"><img src="/assets/bond-logo.png" alt="BOND" /><span className="eyebrow">Sales Kit / Nội bộ</span><h1>Tài liệu dành cho đội ngũ và khách hàng đã gặp.</h1>{configuredPassword ? <form onSubmit={submit}><label htmlFor="kit-password">Mật khẩu truy cập</label><input id="kit-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" /><button className="button-primary" type="submit">Mở Sale Kit <ArrowUpRight size={15} /></button></form> : <p className="kit-config-note">Sale Kit đã được tạo khung. Khi đưa lên kit.bond.vn, đặt biến môi trường VITE_KIT_PASSWORD để bật lớp bảo vệ mật khẩu.</p>}</div>;
  return <div className="kit-site"><header><Link href="/kit"><img src="/assets/bond-logo.png" alt="BOND" /></Link><span className="eyebrow">Sales Kit / Nội bộ</span></header><main><PageIntro eyebrow="Sale Kit" title={<>Chọn tài liệu<br />cần dùng.</>} description="Không gian nội bộ dành cho đội ngũ BOND và khách hàng đã gặp." /><div className="kit-grid">{[['/kit/ho-so-nang-luc', 'Hồ sơ năng lực'], ['/kit/bang-gia', 'Bảng giá'], ['/kit/bo-suu-tap-day-du', 'Bộ sưu tập đầy đủ'], ['/kit/mau-hop-dong', 'Mẫu hợp đồng'], ['/kit/tai-lieu-ban-hang', 'Tài liệu bán hàng']].map(([href, title]) => <Link className="kit-card" href={href} key={href}><span className="eyebrow">Mở tài liệu</span><h2>{title}</h2><span>↗</span></Link>)}</div></main></div>;
}

function KitDocumentPage() {
  const [location] = useLocation();
  const kitLocation = location.startsWith('/kit') ? location : `/kit${location}`;
  const title = kitLocation.includes('bang-gia') ? 'Bảng giá' : kitLocation.includes('bo-suu-tap-day-du') ? 'Bộ sưu tập đầy đủ' : kitLocation.includes('mau-hop-dong') ? 'Mẫu hợp đồng' : kitLocation.includes('tai-lieu-ban-hang') ? 'Tài liệu bán hàng' : 'Hồ sơ năng lực';
  return <div className="kit-site"><header><Link href="/kit"><img src="/assets/bond-logo.png" alt="BOND" /></Link><span className="eyebrow">Sales Kit / {title}</span></header><main><Breadcrumbs items={['Sale Kit', title]} /><PageIntro eyebrow="Tài liệu nội bộ" title={title} description="Nội dung này chỉ dành cho đội ngũ BOND và khách hàng đã được xác nhận." /><section className="section kit-document"><div className="container"><div className="kit-document-panel"><span className="eyebrow">Protected document</span><h2>{title}</h2><p>Đây là khung hiển thị cho tài liệu nội bộ. Khi kết nối kho tài liệu, nội dung PDF, giá, MOQ và mẫu hợp đồng sẽ được nạp tại đây.</p><button className="button-primary">Yêu cầu quyền truy cập <ArrowUpRight size={15} /></button></div></div></section></main></div>;
}

function Router() {
  const [location] = useLocation();
  const isKitHost = window.location.hostname === 'kit.bond.vn';
  if (isKitHost && location === '/') return <KitGate />;
  if (isKitHost && location !== '/') return <KitDocumentPage />;
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/ve-bond" component={AboutPage} />
    <Route path="/bo-suu-tap" component={CollectionPage} />
    <Route path="/bo-suu-tap/signature" component={SignaturePage} />
    <Route path="/bo-suu-tap/:slug" component={CatalogDetailPage} />
    <Route path="/quy-trinh" component={ProcessPage} />
    <Route path="/qua-tang" component={() => <ServiceHubPage type="gift" />} />
    <Route path="/qua-tang/:slug" component={() => <ServiceDetailPage kind="gift" />} />
    <Route path="/bao-bi" component={() => <ServiceHubPage type="packaging" />} />
    <Route path="/bao-bi/:slug" component={() => <ServiceDetailPage kind="packaging" />} />
    <Route path="/vat-pham" component={() => <ServiceHubPage type="merchandise" />} />
    <Route path="/vat-pham/:slug" component={() => <ServiceDetailPage kind="merchandise" />} />
    <Route path="/du-an" component={ProjectsPage} />
    <Route path="/du-an/:slug" component={ProjectDetailPage} />
    <Route path="/nang-luc" component={CapabilitiesPage} />
    <Route path="/nang-luc/:slug" component={CapabilityDetailPage} />
    <Route path="/goc-nhin" component={InsightsPage} />
    <Route path="/goc-nhin/:slug" component={InsightDetailPage} />
    <Route path="/lien-he" component={ContactPage} />
    <Route path="/tai-lieu" component={() => <UtilityPage kind="documents" />} />
    <Route path="/cau-hoi-thuong-gap" component={() => <UtilityPage kind="faq" />} />
    <Route path="/tuyen-dung" component={() => <UtilityPage kind="careers" />} />
    <Route path="/chinh-sach-bao-mat" component={() => <UtilityPage kind="privacy" />} />
    <Route path="/dieu-khoan" component={() => <UtilityPage kind="terms" />} />
    <Route path="/kit" component={KitGate} />
    <Route path="/kit/ho-so-nang-luc" component={KitDocumentPage} />
    <Route path="/kit/bang-gia" component={KitDocumentPage} />
    <Route path="/kit/bo-suu-tap-day-du" component={KitDocumentPage} />
    <Route path="/kit/mau-hop-dong" component={KitDocumentPage} />
    <Route path="/kit/tai-lieu-ban-hang" component={KitDocumentPage} />
    <Route component={() => <div className="not-found-page"><h1>Trang không tồn tại.</h1><Link className="button-primary" href="/">Về trang chủ</Link></div>} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;