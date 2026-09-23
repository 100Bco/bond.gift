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
  { number: '01', title: 'Trao đổi ban đầu', duration: 'Một buổi', copy: 'Dịp, số lượng, ngân sách và thời điểm cần hàng.', output: 'Brief', motion: 'journey-brief' },
  { number: '02', title: 'Đề xuất phương án', duration: '3—5 ngày', copy: '2 đến 3 hướng gồm bao bì, ruột set và mức ngân sách.', output: 'Concept', motion: 'journey-concept' },
  { number: '03', title: 'Xem mẫu vật lý và nếm thử', duration: 'Theo lịch', copy: 'Mang hộp mẫu và sản phẩm đến văn phòng anh chị.', output: 'Mẫu vật lý', motion: 'kit' },
  { number: '04', title: 'Thiết kế và duyệt mẫu', duration: '1—3 tuần', copy: 'Hai vòng chỉnh sửa tiêu chuẩn, cầm mẫu thật trước khi sản xuất.', output: 'Mẫu duyệt', motion: 'colorway' },
  { number: '05', title: 'Duyệt mẫu sản xuất', duration: '5—7 ngày', copy: 'In thử, làm mẫu thật và ký duyệt trước sản xuất hàng loạt.', output: 'Mẫu sản xuất', motion: 'layers' },
  { number: '06', title: 'Sản xuất và đóng gói', duration: '2—4 tuần', copy: 'Sản xuất, tập kết, đóng gói và kiểm đếm.', output: 'Lô hàng', motion: 'journey-production' },
  { number: '07', title: 'Giao hàng', duration: 'Theo lịch thỏa thuận', copy: 'Giao một điểm hoặc nhiều điểm, có biên bản bàn giao.', output: 'Biên bản bàn giao', motion: 'journey-delivery' },
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
