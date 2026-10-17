/*
 * Nội dung của website BOND.
 * Toàn bộ copy dưới đây được giữ nguyên từ phiên bản trước; phần redesign chỉ
 * tách dữ liệu ra khỏi App.tsx và bổ sung trường mô tả asset cần thay.
 */
import type { MotionKind } from '@/components/bond/ProductMotion';

export type Tone = 'canvas' | 'paper' | 'deep' | 'sage' | 'stone' | 'ink' | 'magenta';

export type CatalogItem = {
  slug: string;
  name: string;
  material: string;
  budget: string;
  style: string;
  occasion: string;
  description: string;
  motion: MotionKind;
  /** Màu artwork của mẫu, chỉ dùng bên trong visual sản phẩm. */
  art: 'magenta' | 'gold' | 'tea' | 'clay' | 'silk' | 'slate' | 'kraft';
};

export const catalog: CatalogItem[] = [
  { slug: 'hop-moc-ban', name: 'Hộp Mộc Bản', material: 'Giấy mỹ thuật · ép kim', budget: '1—2 triệu', style: 'Thủ công', occasion: 'Tết', art: 'magenta', motion: 'box', description: 'Một cấu trúc hộp ấm, có độ chạm và đủ linh hoạt để kể câu chuyện riêng của thương hiệu.' },
  { slug: 'the-red-edit', name: 'The Red Edit', material: 'Carton bồi · nam châm', budget: '2—5 triệu', style: 'Đương đại', occasion: 'Tri ân', art: 'gold', motion: 'colorway', description: 'Ngôn ngữ đỏ mạnh mẽ cho những dịp cần sự hiện diện rõ ràng nhưng không phô trương.' },
  { slug: 'tra-vien-dong', name: 'Trà Viễn Đông', material: 'Gỗ veneer · lụa', budget: '2—5 triệu', style: 'Truyền thống', occasion: 'Tết', art: 'tea', motion: 'sleeve', description: 'Lấy cảm hứng từ nếp trà và chất liệu phương Đông, cân bằng giữa di sản và sự tinh gọn.' },
  { slug: 'quiet-objects', name: 'Quiet Objects', material: 'Giấy gân · dập chìm', budget: 'Dưới 1 triệu', style: 'Tối giản', occasion: 'Nội bộ', art: 'clay', motion: 'envelope', description: 'Một lựa chọn nhẹ nhàng, tập trung vào chất liệu, tỷ lệ và cảm giác mở hộp.' },
  { slug: 'aster-archive', name: 'Aster Archive', material: 'Hộp cứng · nắp rời', budget: 'Trên 5 triệu', style: 'Sang trọng', occasion: 'Kỷ niệm', art: 'silk', motion: 'layers', description: 'Dành cho những dịp có tính biểu tượng cao, nơi mỗi chi tiết cần được giữ lại lâu hơn một mùa.' },
  { slug: 'common-ground', name: 'Common Ground', material: 'Vải canvas · dây cotton', budget: '1—2 triệu', style: 'Tối giản', occasion: 'Sự kiện', art: 'slate', motion: 'bag', description: 'Một set thân thiện, dễ tùy biến và phù hợp với những chương trình cần số lượng linh hoạt.' },
  { slug: 'ngu-sac', name: 'Ngũ Sắc', material: 'Tre ép · in lụa', budget: 'Dưới 1 triệu', style: 'Truyền thống', occasion: 'Tết', art: 'kraft', motion: 'kit', description: 'Chất liệu Việt được xử lý đương đại để tạo thành món quà vừa gần gũi vừa có chủ đích.' },
  { slug: 'tangent', name: 'Tangent', material: 'Bìa vân · UV định hình', budget: '2—5 triệu', style: 'Đương đại', occasion: 'Sự kiện', art: 'magenta', motion: 'layers', description: 'Một hướng đi sắc nét cho những thương hiệu muốn tạo ấn tượng từ cấu trúc và ánh sáng.' },
];

export const budgetFilters = ['Tất cả', 'Dưới 1 triệu', '1—2 triệu', '2—5 triệu', 'Trên 5 triệu'];

export type ProcessStep = { number: string; title: string; duration: string; copy: string; output: string; motion: MotionKind };

/* Tách "thời lượng · mô tả" từ copy gốc để hiển thị thời lượng thành thông tin phụ. */
export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Tiếp nhận brief', duration: 'Một buổi', copy: 'Dịp tặng, số lượng, ngân sách mỗi phần, chân dung người nhận và thời điểm cần hàng.', output: 'Brief', motion: 'journey-brief' },
  { number: '02', title: 'Đề xuất phương án', duration: '3—5 ngày', copy: '2 đến 3 hướng thiết kế cùng cấu phần quà tương ứng.', output: 'Concept', motion: 'journey-concept' },
  { number: '03', title: 'Duyệt mẫu vật lý & nếm thử', duration: 'Theo lịch', copy: 'Gửi hộp mẫu tận nơi, nếm thử các thức quà trước khi chốt.', output: 'Mẫu vật lý', motion: 'kit' },
  { number: '04', title: 'Thiết kế hoàn thiện', duration: '1—3 tuần', copy: 'Đội ngũ ZAD hoàn thiện đồ họa độc quyền, in thử màu và làm mockup.', output: 'Mẫu duyệt', motion: 'colorway' },
  { number: '05', title: 'Duyệt mẫu sản xuất', duration: '5—7 ngày', copy: 'Mẫu đầu chuyền được anh chị ký duyệt trước khi sản xuất hàng loạt.', output: 'Mẫu sản xuất', motion: 'layers' },
  { number: '06', title: 'Sản xuất & đóng gói', duration: '2—4 tuần', copy: 'Sản xuất hàng loạt, gia công thủ công chi tiết phức tạp, kiểm tra và niêm phong từng hộp.', output: 'Lô hàng', motion: 'journey-production' },
  { number: '07', title: 'Giao hàng', duration: 'Theo lịch thỏa thuận', copy: 'Giao một điểm hoặc nhiều điểm theo danh sách người nhận, đúng mốc đã cam kết.', output: 'Biên bản bàn giao', motion: 'journey-delivery' },
];

export const navItems: [string, string][] = [
  ['Về BOND', '/ve-bond'],
  ['Bộ sưu tập', '/bo-suu-tap'],
  ['Quà tặng', '/qua-tang'],
  ['Bao bì', '/bao-bi'],
  ['Vật phẩm', '/vat-pham'],
  ['Năng lực', '/nang-luc'],
  ['Góc nhìn', '/goc-nhin'],
];

export type ServiceItem = { slug: string; title: string; copy: string; motion: MotionKind; asset: string };

export const giftOccasions: ServiceItem[] = [
  { slug: 'tet', title: 'Quà Tết doanh nghiệp 2027', copy: 'Chốt hướng thiết kế trước giữa tháng 10 để đủ thời gian làm mẫu, sản xuất và giao nhiều điểm.', motion: 'box', asset: 'Ảnh bộ quà Tết đã sản xuất, góc 3/4, ánh sáng ấm' },
  { slug: 'tri-an-doi-tac', title: 'Tri ân đối tác', copy: 'Ít mà tinh, cá nhân hóa từng người nhận bằng khắc tên, thiệp viết tay và trải nghiệm mở hộp.', motion: 'envelope', asset: 'Cận cảnh thiệp viết tay và chi tiết khắc tên' },
  { slug: 'su-kien-hoi-nghi', title: 'Sự kiện & hội nghị', copy: 'Đồng bộ nhận diện sự kiện trong điều kiện thời gian gấp và số lượng còn biến động.', motion: 'kit', asset: 'Bộ vật phẩm sự kiện xếp theo hàng loạt' },
  { slug: 'noi-bo', title: 'Quà tặng nội bộ', copy: 'Onboarding, kỷ niệm thâm niên, lễ Tết nội bộ — những dịp cần sự quan tâm đúng người.', motion: 'bag', asset: 'Nhân viên nhận quà tại văn phòng (ảnh thật)' },
  { slug: 'ky-niem-thanh-lap', title: 'Kỷ niệm thành lập', copy: 'Ngân sách và tính biểu tượng cao, gần với thiết kế vật phẩm lưu niệm riêng.', motion: 'layers', asset: 'Vật phẩm lưu niệm kỷ niệm thành lập, chụp still-life' },
];

export const packagingGroups: ServiceItem[] = [
  { slug: 'hop', title: 'Hộp thương hiệu', copy: 'Hộp cứng, hộp nam châm, hộp nắp rời và các kết cấu phù hợp với từng trải nghiệm mở.', motion: 'box', asset: 'Video hộp nam châm mở và đóng' },
  { slug: 'tui', title: 'Túi thương hiệu', copy: 'Túi giấy, túi vải và các giải pháp mang đi giữ được màu sắc nhận diện.', motion: 'bag', asset: 'Túi giấy thương hiệu xoay nhẹ trên nền giấy' },
  { slug: 'thiep-an-pham', title: 'Thiệp & ấn phẩm', copy: 'Thiệp cảm ơn, card hướng dẫn, tag và vật phẩm nhỏ hoàn thiện điểm chạm.', motion: 'envelope', asset: 'Thiệp kéo khỏi phong bì, cận chất giấy' },
  { slug: 'nganh-thoi-trang', title: 'Thời trang', copy: 'Kết cấu, chất liệu và hoàn thiện dành cho thương hiệu thời trang.', motion: 'sleeve', asset: 'Hộp sleeve cho sản phẩm thời trang' },
  { slug: 'nganh-trang-suc', title: 'Trang sức', copy: 'Hộp, khay và túi cần giữ được cảm giác tinh tế ở kích thước nhỏ.', motion: 'layers', asset: 'Hộp trang sức, khay lót, cận chi tiết' },
  { slug: 'nganh-fmcg', title: 'FMCG & CPG', copy: 'Bao bì có khả năng mở rộng số lượng và giữ đồng nhất trên nhiều SKU.', motion: 'colorway', asset: 'Dải bao bì nhiều SKU cùng hệ thiết kế' },
  { slug: 'nganh-my-pham', title: 'Mỹ phẩm', copy: 'Chất liệu và gia công phù hợp với sản phẩm cần cảm giác sạch, chỉn chu.', motion: 'sleeve', asset: 'Bao bì mỹ phẩm, nền sáng, bóng đổ mềm' },
  { slug: 'nganh-tra-ca-phe', title: 'Trà & cà phê', copy: 'Kết hợp câu chuyện nguồn gốc, hạn sử dụng và trải nghiệm thưởng thức.', motion: 'kit', asset: 'Hộp trà / cà phê đã hoàn thiện kèm ruột' },
  { slug: 'nganh-fnb', title: 'F&B', copy: 'Giải pháp bao bì cho các dịp tặng, ra mắt và chương trình thương hiệu.', motion: 'box', asset: 'Bao bì F&B cho dịp ra mắt' },
];

export const merchandiseGroups: ServiceItem[] = [
  { slug: 'su-kien', title: 'Vật phẩm sự kiện', copy: 'Từ quà check-in đến bộ vật phẩm đồng bộ cho một sự kiện nhiều điểm chạm.', motion: 'kit', asset: 'Bộ vật phẩm sự kiện tại quầy check-in' },
  { slug: 'thuong-hieu', title: 'Vật phẩm thương hiệu', copy: 'Vật phẩm sử dụng dài hơn một chiến dịch, giữ nhận diện trong đời sống hàng ngày.', motion: 'bag', asset: 'Vật phẩm thương hiệu trong bối cảnh sử dụng' },
  { slug: 'posm', title: 'POSM', copy: 'Thiết kế, sản xuất và triển khai vật phẩm tại điểm bán với một đầu mối kiểm soát.', motion: 'colorway', asset: 'POSM lắp đặt tại điểm bán' },
];

export type CapabilityItem = { slug: string; title: string; copy: string; asset: string };

export const capabilityGroups: CapabilityItem[] = [
  { slug: 'he-sinh-thai-100b', title: 'Hệ sinh thái 100B', copy: 'ZAD nghĩ ra. BOND làm ra. 100B đứng sau.', asset: 'Ảnh đội ngũ ZAD và BOND làm việc cùng nhau' },
  { slug: 'thiet-ke', title: 'Thiết kế', copy: 'Thiết kế riêng bắt đầu từ người nhận, dịp tặng và cảm giác muốn để lại.', asset: 'Ảnh bàn thiết kế: bản vẽ dieline, mẫu màu, mẫu giấy' },
  { slug: 'san-xuat', title: 'Sản xuất', copy: 'BOND sở hữu mạng lưới và quy trình kiểm soát, không bị giới hạn bởi một nhà máy.', asset: 'Ảnh xưởng sản xuất thật, dây chuyền in / bồi hộp' },
  { slug: 'chuoi-cung-ung', title: 'Chuỗi cung ứng', copy: 'Nguồn hàng rõ ràng, hồ sơ đầy đủ, hạn sử dụng tính từ ngày giao.', asset: 'Ảnh kho tập kết và kiểm đếm hàng' },
  { slug: 'doi-ngu', title: 'Đội ngũ', copy: 'Kinh nghiệm vận hành quà tặng và vật phẩm ở quy mô lớn cho doanh nghiệp.', asset: 'Chân dung đội ngũ BOND (ảnh thật)' },
  { slug: 'hop-tac', title: 'Hợp tác', copy: 'Hợp đồng, VAT, bảo mật, độc quyền mẫu và cam kết xử lý sự cố rõ ràng.', asset: 'Ảnh buổi làm việc / ký duyệt mẫu với khách hàng' },
];

export type Post = { slug: string; title: string; excerpt: string; category: 'Tiến độ' | 'Ngân sách' | 'Kỹ thuật và chất liệu'; motion: MotionKind };

export const insightPosts: Post[] = [
  { slug: 'ngan-sach-qua-tet-doanh-nghiep', title: 'Ngân sách quà Tết doanh nghiệp: tính thế nào cho đúng', excerpt: 'Ngân sách mỗi phần quà không chỉ là giá của vỏ hộp. Đây là cách nhìn đủ cả bao bì, ruột set, thiệp và hoàn thiện.', category: 'Tiến độ', motion: 'layers' },
  { slug: 'lich-nguoc-qua-tet-2027', title: 'Lịch ngược cho quà Tết 2027: chốt muộn một tuần mất gì', excerpt: 'Tết 2027 rơi vào ngày 6 tháng 2. Mỗi mốc chậm lại sẽ ảnh hưởng đến mẫu, sản xuất và giao hàng như thế nào?', category: 'Tiến độ', motion: 'journey-delivery' },
  { slug: 'hoi-nha-cung-cap-ruot-set', title: 'Điều cần hỏi nhà cung cấp trước khi chốt ruột set quà Tết', excerpt: 'Nguồn gốc, hồ sơ, hạn sử dụng và khả năng thay thế là những câu hỏi cần có trước khi ký.', category: 'Ngân sách', motion: 'kit' },
  { slug: 'hai-bao-gia-khong-so-sanh-duoc', title: 'Vì sao hai báo giá cùng một con số lại không so sánh được với nhau', excerpt: 'Khác biệt nằm ở cách tính cấu phần, sản lượng, mức hoàn thiện và trách nhiệm khi có sự cố.', category: 'Ngân sách', motion: 'colorway' },
  { slug: 'nam-loi-khien-hop-qua-hong', title: 'Năm lỗi khiến hộp quà hỏng trước khi đến tay người nhận', excerpt: 'Một thiết kế đẹp vẫn có thể thất bại nếu không tính đến vận chuyển, độ ẩm và thời gian lưu kho.', category: 'Kỹ thuật và chất liệu', motion: 'box' },
  { slug: 'ep-kim-dap-noi-uv', title: 'Ép kim, dập nổi, UV định hình: chọn cái nào cho ngân sách nào', excerpt: 'Ba kỹ thuật hoàn thiện, ba sắc thái thị giác và cách chọn theo mục tiêu thương hiệu.', category: 'Kỹ thuật và chất liệu', motion: 'sleeve' },
  { slug: 'han-su-dung-qua-tet', title: 'Hạn sử dụng và quà Tết: điều ít người tính đến khi chọn ruột set', excerpt: 'Hạn dùng cần được tính tại thời điểm người nhận cầm hộp trên tay, không phải khi xuất kho.', category: 'Kỹ thuật và chất liệu', motion: 'envelope' },
];

export type Project = {
  slug: string;
  title: string;
  industry: string;
  scope: string;
  year?: string;
  summary?: string;
  asset: string;
};

export const projects: Project[] = [
  { slug: 'mua-tet-nhieu-tang-nguoi-nhan', title: 'Một mùa Tết, nhiều tầng người nhận.', industry: 'FMCG', scope: 'Quà Tết', year: '2024', summary: 'Phân tầng ngân sách, đồng bộ ngôn ngữ thiết kế, giao hàng đa điểm trong cùng một tuần.', asset: 'Ảnh bộ quà Tết đã giao, nhiều tầng ngân sách đặt cạnh nhau' },
  { slug: 'bao-bi-mo-hop', title: 'Bao bì cho một lần mở hộp đáng nhớ.', industry: 'F&B', scope: 'Bao bì', asset: 'Ảnh / video khoảnh khắc mở hộp của dự án thật' },
  { slug: 'goi-ten-nguoi-da-di-cung', title: 'Gọi tên người đã đi cùng.', industry: 'Nội bộ', scope: 'Kỷ niệm', asset: 'Ảnh vật phẩm khắc tên người nhận của dự án thật' },
  { slug: 'bo-qua-doanh-nghiep-da-diem', title: 'Một bộ quà, nhiều điểm giao.', industry: 'Dịch vụ', scope: 'Vận hành', asset: 'Ảnh tập kết và giao hàng đa điểm của dự án thật' },
];

export type Partner = { name: string; logo?: string };

/* Logo đối tác: cần asset chính thức. Khi có file, đặt vào /public/assets/partners và điền trường logo. */
export const partners: Partner[] = [
  { name: 'TH true MILK' },
  { name: 'Vinamilk' },
  { name: 'PNJ' },
  { name: 'Shopee' },
  { name: 'VNG' },
];

export const ecosystem = [
  { logo: '/assets/zad-logo.png', name: 'ZAD', role: 'Thiết kế và sáng tạo', copy: 'Thiết kế và sáng tạo, nhận diện thương hiệu, thiết kế bao bì và vật phẩm.' },
  { logo: '/assets/bond-logo.png', name: 'BOND', role: 'Sản xuất và triển khai', copy: 'Sản xuất và triển khai, nguồn hàng, hoàn thiện, đóng gói, giao hàng.' },
  { logo: '/assets/100b-logo.png', name: '100B', role: 'Holding đứng sau', copy: 'Holding đứng sau toàn hệ sinh thái, pháp nhân, quản trị, cam kết.' },
];

export const faqQuestions = ['Sản lượng tối thiểu là bao nhiêu?', 'Có thể thay đổi số lượng sau khi đã chốt không?', 'Thiết kế riêng có tính phí riêng không?', 'Ai giữ quyền sở hữu thiết kế?', 'Có xuất hóa đơn VAT không?', 'Giao nhiều địa chỉ có tính thêm phí không?'];

export const kitDocuments = [
  { href: '/kit/ho-so-nang-luc', title: 'Hồ sơ năng lực', kind: 'Tài liệu', group: 'Giới thiệu', motion: 'layers' as MotionKind },
  { href: '/kit/bang-gia', title: 'Bảng giá', kind: 'Tài liệu', group: 'Thương mại', motion: 'colorway' as MotionKind },
  { href: '/kit/bo-suu-tap-day-du', title: 'Bộ sưu tập đầy đủ', kind: 'Tài liệu', group: 'Sản phẩm', motion: 'kit' as MotionKind },
  { href: '/kit/mau-hop-dong', title: 'Mẫu hợp đồng', kind: 'Tài liệu', group: 'Pháp lý', motion: 'envelope' as MotionKind },
  { href: '/kit/tai-lieu-ban-hang', title: 'Tài liệu bán hàng', kind: 'Tài liệu', group: 'Bán hàng', motion: 'box' as MotionKind },
];

/* ---------- Trang chủ editorial: số liệu đã được BOND chốt (có thể đổi sau) ---------- */

/** Link Zalo OA chính thức (BOND). Để trống thì mọi nút Zalo dẫn về trang liên hệ. */
export const zaloUrl = 'https://zalo.me/2039510427284124793';

/**
 * Logo khách hàng đã đồng hành cùng hệ sinh thái 100B (file gốc trong /public/Logo Client).
 * `h` là chiều cao hiển thị (px) đã cân quang học: tính từ lượng nét mực thật và tỷ lệ của từng logo,
 * để logo đặc (MAGONN, Nuclean) nhỏ lại, logo mảnh (Viettel Academy, Calista) to lên, nhìn nặng ngang nhau.
 */
export const clientLogos: { name: string; logo: string; h: number }[] = ([
  ['Viettel Academy', 'viettel-academy', 54], ['Google', 'google', 46], ['VAECO', 'vaeco', 44], ['Cốc Cốc', 'coc-coc', 45], ['SIG', 'sig', 38],
  ['Hagoo', 'hagoo', 35], ['Atera Central', 'atera-central', 46], ['Eva de Eva', 'eva-de-eva', 38], ['Tracy Couture', 'tracy-couture', 46], ['Haviet', 'haviet', 30],
  ['Calista', 'calista', 50], ['Rubies', 'rubies', 38], ['Magonn', 'magonn', 28], ['Sypik Australia', 'sypik-australia', 40], ['Nuclean', 'nuclean', 26],
] as [string, string, number][]).map(([name, slug, h]) => ({ name, logo: `/assets/clients/${slug}.webp`, h }));

/** Một món trong set: qty là khối lượng hoặc dung tích theo catalog. Ảnh nhỏ ở /assets/set-san/items/<slug>-<thứ tự>.webp, cắt từ catalog. */
export type SetItem = { name: string; qty: string };
export type ReadySet = { slug: string; code: string; name: string; price: string; contents: string; desc: string; photo: string; items: SetItem[]; boxType: string; boxSize: string; look: 'ivory' | 'ink' | 'red' | 'black' };
/** Thông số chưa có số liệu thật thì hiển thị dòng này, không tự đặt số. */
export const pendingSpec = 'Đang cập nhật';
/** Điều khoản chung theo catalog, dùng cho cả Sẵn Trao và Độc Bản. */
export const orderTerms = {
  vat: 'Giá chưa bao gồm VAT và phí vận chuyển',
  pay: 'Đặt cọc 50% khi chốt đơn, thanh toán 50% còn lại trước khi giao',
  bag: 'Túi giấy đi kèm',
  readyGift: 'Tặng in logo UV khi đặt từ 10 set và đặt cọc trước 15/11/2026.',
};
/** Bốn set sẵn theo catalog (mã SS01 đến SS04). Đổi slug thì thêm redirect slug cũ trong vercel.json. */
export const readySets: ReadySet[] = [
  {
    slug: 'huong-sac-xuan', code: 'SS01', name: 'Hương Sắc Xuân', price: '499.000đ / set', look: 'ivory', photo: '/assets/set-san/huong-sac-xuan.webp',
    desc: 'Lấy cảm hứng từ sắc đỏ may mắn và hương vị Tết cổ truyền. Rượu vang, trà sen và bánh mứt gửi lời chúc an khang, sung túc đầu năm.',
    contents: 'Mứt gừng hoặc táo đỏ + trà sen sấy thăng hoa + bánh quy nhập khẩu + kẹo dẻo trái cây + rượu vang',
    items: [
      { name: 'Mứt gừng hoặc táo đỏ', qty: '150g' },
      { name: 'Trà sen sấy thăng hoa (nguyên bông)', qty: '180g' },
      { name: 'Bánh quy nhập khẩu', qty: '100g' },
      { name: 'Kẹo dẻo trái cây', qty: '120g' },
      { name: 'Rượu vang', qty: '750ml' },
    ],
    boxType: 'Hộp cứng', boxSize: '28 × 36 × 10 cm',
  },
  {
    slug: 'xuan-cat-tuong', code: 'SS02', name: 'Xuân Cát Tường', price: '799.000đ / set', look: 'ink', photo: '/assets/set-san/xuan-cat-tuong.webp',
    desc: 'Lấy cảm hứng từ lời chúc cát tường, may mắn ngày đầu năm. Rượu vang, trà sen và bánh xốp Nga phủ sôcôla gửi mong ước một năm hanh thông, tài lộc.',
    contents: 'Mứt gừng hoặc táo đỏ + trà sen sấy thăng hoa + bánh xốp Nga phủ sôcôla + kẹo dẻo trái cây + rượu vang',
    items: [
      { name: 'Mứt gừng hoặc táo đỏ', qty: '150g' },
      { name: 'Trà sen sấy thăng hoa (nguyên bông)', qty: '180g' },
      { name: 'Bánh xốp Nga phủ sôcôla', qty: '100g' },
      { name: 'Kẹo dẻo trái cây', qty: '120g' },
      { name: 'Rượu vang', qty: '750ml' },
    ],
    boxType: 'Hộp cứng', boxSize: '36 × 36 × 10 cm',
  },
  {
    slug: 'xuan-phu-quy', code: 'SS03', name: 'Xuân Phú Quý', price: '1.299.000đ / set', look: 'red', photo: '/assets/set-san/xuan-phu-quy.webp',
    desc: 'Lấy cảm hứng từ mùa xuân sung túc và lời chúc phú quý. Hộp hai tầng sắc đỏ họa tiết hoa xuân, gửi lời chúc tài lộc, vạn sự viên mãn.',
    contents: 'Sôcôla + ô mai + trà Basilur hoặc trà Phúc Kiến + rượu vang',
    items: [
      { name: 'Sôcôla', qty: '150g' },
      { name: 'Ô mai mận dẻo hoặc ô mai sấu, khế', qty: '150g hoặc 180g' },
      { name: 'Trà Basilur hoặc trà Phúc Kiến', qty: '100g hoặc 120g' },
      { name: 'Rượu vang', qty: '750ml' },
    ],
    boxType: 'Hộp 2 tầng', boxSize: '37,5 × 15,5 × 21,5 cm',
  },
  {
    slug: 'van-loc-vinh-hoa', code: 'SS04', name: 'Vạn Lộc Vinh Hoa', price: '2.899.000đ / set', look: 'black', photo: '/assets/set-san/gallery/van-loc-vinh-hoa-1.webp',
    desc: 'Lấy cảm hứng từ lời chúc tài lộc viên mãn, phú quý trường tồn. Hộp cánh mở có tay xách, rượu mạnh, trà Ahmad và bánh kẹo nhập khẩu, gửi lời chúc vạn sự hanh thông.',
    contents: 'Rượu mạnh + sôcôla Nga + bánh Nga + kẹo Đức + trà Ahmad + mứt Tết',
    items: [
      { name: 'Rượu mạnh cao cấp', qty: '750ml' },
      { name: 'Sôcôla Nga', qty: '150g' },
      { name: 'Bánh Nga', qty: '150g' },
      { name: 'Kẹo Đức', qty: '180g' },
      { name: 'Trà Ahmad', qty: '100g' },
      { name: 'Mứt Tết', qty: '120g' },
    ],
    boxType: 'Hộp cứng cánh mở, có tay xách', boxSize: '36 × 36 × 15 cm',
  },
];

/**
 * Bốn thiết kế Độc Bản (hộp BIDV) theo bốn mức giá; mỗi thiết kế có trang con /set-doc-ban/:slug trình bày như trang Sẵn Trao.
 * cover: ảnh vuông 1:1 ở trang danh sách. gallery: ảnh 4:5 ở khung ảnh đầu trang con, không nhãn (mỗi thiết kế tối đa 4 ảnh).
 * Thiết kế chưa có ảnh thì để trống (cover rỗng, gallery rỗng).
 */
export type BespokeTier = { slug: string; name: string; money: string; cover: string; coverPos?: string; desc?: string; contents: string; box: string; gallery: string[]; items?: BespokeItem[] };
/** Một món trong hộp Độc Bản; img là ảnh tròn nhỏ (dùng lại ảnh món của Sẵn Trao khi cùng món). */
export type BespokeItem = SetItem & { img: string };
const it = (name: string, qty: string, img: string): BespokeItem => ({ name, qty, img: `/assets/set-san/items/${img}.webp` });

const dz = '/assets/bespoke/designs';

export const bespokeTiers: BespokeTier[] = [
  { slug: '499', name: 'Kim Mai Tài Lộc', money: '499.000đ', cover: `${dz}/kim-mai-vuong.webp`,
    desc: 'Lấy cảm hứng từ hoạ tiết cổ điển trong mỹ thuật cung đình Huế, hộp phủ giấy vàng hoa mai với lưới lục giác như song cửa cung đình, mỗi nhịp lưới điểm một bông mai ánh ngọc trai viền ép kim. Dải đai giấy nhũ vàng ôm ngang thân hộp, khoét ô tròn để lộ logo doanh nghiệp ép kim. Bên trong là chai vang đỏ cùng ba hộp quà nhỏ: mứt gừng, trà sen sấy thăng hoa và bánh quy nhập khẩu.', contents: '1 chai rượu vang và 3 hoặc 4 hộp quà nhỏ', box: 'Hộp âm dương 28 × 36 cm', gallery: [`${dz}/kim-mai-1.webp`],
    items: [it('Mứt gừng', '150g', 'huong-sac-xuan-1'), it('Trà sen sấy thăng hoa (nguyên bông)', '180g', 'huong-sac-xuan-2'), it('Bánh quy nhập khẩu', '100g', 'huong-sac-xuan-3'), it('Rượu vang đỏ', '750ml', 'huong-sac-xuan-5')] },
  { slug: '799', name: 'Đan Môn Khải Lộc', money: '799.000đ', cover: `${dz}/dan-mon-vuong.webp`,
    desc: 'Đan Môn Khải Lộc lấy cảm hứng từ cánh cửa gỗ sơn son của những nếp nhà xưa ngày Tết. Cánh ngoài màu đỏ đô được đục 25 khe như song cửa, để lớp kim vàng phía sau ánh lên qua từng khe như nắng xuân lọt qua song gỗ. Chiếc tag tròn ép kim logo doanh nghiệp đóng vai trò then cài. Người nhận mở cánh son trước, rồi mới mở cánh vàng, chậm rãi qua từng lớp trước khi gặp món quà bên trong.',
    contents: '1 chai rượu vang và 4 hộp quà nhỏ', box: 'Hộp âm dương 36 × 36 × 10 cm', gallery: [1, 2, 3, 4].map((k) => `${dz}/dan-mon-${k}.webp`),
    items: [it('Mứt gừng', '150g', 'xuan-cat-tuong-1'), it('Táo đỏ', '150g', 'tao-do'), it('Bánh xốp Nga phủ sôcôla', '100g', 'xuan-cat-tuong-3'), it('Kẹo dẻo trái cây', '120g', 'xuan-cat-tuong-4'), it('Rượu vang', '750ml', 'doc-ban-799-vang')] },
  { slug: '1299', name: 'Xuân Khai Bảo Hạp', money: '1.299.000đ', cover: `${dz}/bao-hap-vuong.webp`,
    desc: 'Xuân Khai Bảo Hạp lấy cảm hứng từ chiếc hộp báu, nơi người xưa cất giữ những gì quý giá nhất. Thân hộp bọc giấy chất liệu đặc biệt màu ngọc bích, lớp nắp dưới ép kim hoạ tiết đặc trưng cung đình Huế, chính giữa nắp trên là ô khai quang hình bông hoa nhìn vào logo doanh nghiệp. Quai da và khoá cài mạ vàng cho món quà dáng vẻ trang trọng của một chiếc rương mang trao tận tay. Khi khoá được mở, mùa xuân cũng mở ra cùng những món quà tuyển chọn bên trong. Thiết kế được may đo theo nhận diện riêng của thương hiệu.',
    contents: '1 chai rượu vang và 3 hộp quà nhỏ', box: 'Hộp 2 tầng 37,5 × 15,5 × 21,5 cm', gallery: [1, 2, 3].map((k) => `${dz}/bao-hap-${k}.webp`),
    items: [it('Sôcôla', '150g', 'xuan-phu-quy-1'), it('Ô mai mận dẻo', '150g', 'xuan-phu-quy-2'), it('Trà Basilur hoặc trà Phúc Kiến', '100g hoặc 120g', 'xuan-phu-quy-3'), it('Rượu vang', '750ml', 'xuan-phu-quy-4')] },
  { slug: '2899', name: 'Ngũ Phúc Khai Xuân', money: '2.899.000đ',
    desc: 'Ngũ Phúc Khai Xuân là thiết kế độc bản, làm riêng cho thương hiệu của bạn. Chiếc hộp mang dáng bông hoa năm cánh, như năm điều phúc gửi đến người nhận. Mặt nắp dập chìm những nét cong như cánh hoa đang xòe, viền nhũ vàng, giữa nắp là logo doanh nghiệp ép kim nổi. Nhấc nắp ra, khay vàng đựng phong bao lì xì hiện lên trước, bên dưới là chai rượu mạnh cao cấp cùng sôcôla, bánh Nga, kẹo Đức và trà Ahmad. Màu sắc, chất liệu và hoa văn đều may đo theo bộ nhận diện riêng của từng doanh nghiệp.', cover: `${dz}/hop-hoa-trang-vuong.webp`, contents: '1 chai rượu mạnh cao cấp và 5 hộp quà nhỏ', box: 'Hộp cánh mở có tay xách 36 × 36 cm', gallery: [1, 2, 3, 4].map((k) => `${dz}/hop-hoa-trang-${k}.webp`),
    items: [it('Rượu mạnh cao cấp', '750ml', 'doc-ban-2899-ruou'), it('Sôcôla Nga', '150g', 'van-loc-vinh-hoa-2'), it('Bánh Nga', '150g', 'van-loc-vinh-hoa-3'), it('Kẹo Đức', '180g', 'van-loc-vinh-hoa-4'), it('Trà Ahmad', '100g', 'van-loc-vinh-hoa-5'), it('Mứt Tết', '120g', 'van-loc-vinh-hoa-6')] },
];

export const giftModels = {
  ready: {
    name: 'Sẵn Trao',
    say: 'Chọn mẫu có sẵn, thêm dấu ấn thương hiệu.',
    specs: [['Thời gian hoàn thành', '1-2 tuần'], ['Số lượng tối thiểu', 'Từ 10 set'], ['Mức độ tùy biến', 'In logo UV lên nắp hộp']] as [string, string][],
  },
  bespoke: {
    name: 'Độc Bản',
    say: 'Thiết kế riêng 100% theo thương hiệu của anh chị.',
    specs: [['Thời gian hoàn thành', '8 tuần'], ['Số lượng tối thiểu', 'Từ 300 set'], ['Mức độ tùy biến', 'Thiết kế toàn bộ theo nhận diện riêng']] as [string, string][],
  },
};

/** Quy trình theo từng mô hình, hiển thị ngay trong khối "Hai cách để BOND làm quà" trên trang chủ. */
export const giftProcesses: Record<'ready' | 'bespoke', { note?: string; steps: [string, string][] }> = {
  ready: {
    steps: [
      ['Tiếp nhận yêu cầu', 'Dịp tặng, số lượng, ngân sách mỗi phần và thời điểm cần hàng.'],
      ['Chốt ruột quà', 'Chốt thành phần trong set; vẫn có thể đổi món theo danh sách món sẵn có.'],
      ['Duyệt mẫu sản xuất', 'In logo của anh chị lên mẫu Sẵn Trao để duyệt; anh chị đồng ý mới sản xuất.'],
      ['Sản xuất & đóng gói', 'In UV logo lên hộp, đóng gói và kiểm tra chất lượng từng hộp.'],
      ['Giao hàng', 'Giao một điểm hoặc nhiều điểm theo danh sách người nhận.'],
    ],
  },
  bespoke: {
    steps: [
      ['Tiếp nhận yêu cầu', 'Dịp tặng, số lượng, ngân sách mỗi phần, chân dung người nhận và thời điểm cần hàng.'],
      ['Đề xuất phương án', '2 đến 3 hướng thiết kế cùng cấu phần quà tương ứng.'],
      ['Duyệt mẫu vật lý & nếm thử', 'Gửi hộp mẫu tận nơi, nếm thử các thức quà trước khi chốt.'],
      ['Thiết kế hoàn thiện', 'Đội ngũ ZAD hoàn thiện đồ họa độc quyền, in thử màu và làm mockup.'],
      ['Duyệt mẫu sản xuất', 'Mẫu đầu chuyền được anh chị ký duyệt trước khi sản xuất hàng loạt.'],
      ['Sản xuất & đóng gói', 'Sản xuất hàng loạt, gia công thủ công chi tiết phức tạp, kiểm tra và niêm phong từng hộp.'],
      ['Giao hàng', 'Giao một điểm hoặc nhiều điểm theo danh sách người nhận, đúng mốc đã cam kết.'],
    ],
  },
};

export const officeLines = ['Số 15A ngõ 192 Lê Trọng Tấn, P. Phương Liệt, TP Hà Nội'];
/** Hotline hiển thị và số gọi (tel:). */
export const hotline = { label: '085.285.9595', tel: '+84852859595' };
