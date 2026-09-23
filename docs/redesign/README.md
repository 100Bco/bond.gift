# BOND redesign: UI và visual system toàn website

Tài liệu bàn giao cho đợt redesign UI toàn bộ bond.vn và kit.bond.vn.
Phạm vi: chỉ giao diện. Sitemap, URL, navigation architecture và UX flow cốt lõi giữ nguyên.

Tham khảo Givingli: đã xem trực tiếp 7 trang (home, about, business-gifting-platform, features, solutions, gift-options, pricing) ở 1440px và 390px sau khi mở network access cho `givingli.com`. Không có layout, code, nội dung, hình ảnh hay animation nào được sao chép; ảnh chụp Givingli không được đưa vào repo.

Nguyên tắc rút ra và cách BOND chuyển hóa:

| Quan sát ở Givingli | Áp dụng cho BOND |
|---|---|
| Headline rất lớn nhưng weight thường, tracking chặt: dịu mà vẫn tự tin | Display, H1, H2 dùng Be Vietnam Pro 500; H3, H4 giữ 600 để đọc rõ ở cỡ nhỏ |
| Mỗi dòng sản phẩm là một chapter full-bleed có số thứ tự nhỏ, tiêu đề lớn, một đoạn ngắn, một CTA nhỏ, một visual | Ba service chapter trên trang chủ, chapter trên trang chi tiết mẫu, năng lực, dịch vụ |
| Nền đổi màu mạnh theo từng khối (đỏ, giấy, gần đen) tạo nhịp | Tone canvas / paper / deep / sage / ink / magenta, ink chỉ cho proof và năng lực |
| Trang gift options có hàng chip đánh số nhảy tới từng lựa chọn và link "tiếp theo" cuối mỗi chapter | `ChapterNav` (sticky) + `NextChapter` trên trang chi tiết mẫu và trang năng lực |
| Sản phẩm là nhân vật chính, chụp như vật thể thật có bóng đổ | Media frame lớn, Product Motion có bóng sàn; ảnh thật sẽ thay khi có asset |
| Trang solutions dùng nhiều card đồng kích thước | Áp dụng từ đợt 2: mọi gallery là lưới đều 3 cột (4 cột cho số liệu), card trắng có viền |

---

## 0. Đợt 2: formal, trắng + magenta, căn giữa, lưới đều

Phản hồi sau bản đầu: homepage dạng split và gallery bất đối xứng trông giống agency sáng tạo. BOND là doanh nghiệp quà tặng doanh nghiệp, người xem chính là lãnh đạo và người lớn tuổi, nên giao diện cần formal và chỉn chu. Màu nhận diện là trắng và magenta, không có be.

| Quyết định | Thực hiện |
|---|---|
| Bỏ toàn bộ tông be, kem, sage | Nền trắng, xám rất nhạt trung tính (`#F6F6F8`, `#EEEEF1`) và hồng magenta rất nhạt (`#FDF4F7`). Tên token cũ giữ nguyên để không phải sửa component, chỉ đổi giá trị |
| Hero căn giữa mọi trang | `EditorialHero` luôn căn giữa: label, headline, lead, CTA, rồi visual ngang 21:9 bên dưới. Prop `layout` còn đó nhưng không còn tạo split |
| Hero trang chủ | Headline "Relationships, compounded." căn giữa, dưới là 3 khung sản phẩm bằng nhau (quà tặng, bao bì, vật phẩm) và hàng điều kiện hợp tác |
| Gallery thẳng đều | Bộ sưu tập, dự án, showcase dịch vụ, bao bì theo ngành, gallery con người, card năng lực: lưới 3 cột bằng nhau, cùng tỷ lệ ảnh. Bỏ `grid-offset`, bỏ featured card to nhỏ lẫn lộn trong listing |
| Card dạng hộp | Card trắng, viền mảnh, bo 16px, ảnh sát mép trên, thân card có padding và link "Xem mẫu →" / "Xem dự án →" |
| Tiêu đề section căn giữa | `SectionIntro` mặc định `center` |
| Số liệu dạng ô | `MetricBand` là các ô bằng nhau: ô trắng trên nền sáng, ô magenta trên nền ink |
| Quy trình dạng card cuộn ngang | `StepCarousel`: card đều nhau, số bước dạng pill, visual trên, thân tối dưới, nút trước/sau và bộ đếm "01 / 07". Không tự chạy |
| CTA cuối trang căn giữa | `FinalCta` một cột, form bên dưới rộng tối đa 760px, nhãn field đánh số "(01) Tên người liên hệ" |
| Footer sáng | Nền xám nhạt, statement + 3 cột link, logo chính thức cỡ lớn chạy ngang container, dòng legal. Logo luôn trên nền sáng |
| Header | Từ 1280px: 3 cột logo / nav giữa / CTA |
| Nhịp chữ cho người lớn tuổi | Body 18px (17px mobile), small 16px, chữ phụ đậm hơn (độ mờ .68 / .78) |
| Hình khối điềm tĩnh | Radius nhỏ lại: 4 / 8 / 12 / 16 / 20. Container 1280px |

Ảnh chụp trong `screenshots/` là bản đợt 2.

---

## 0b. Đợt 3: thanh lịch, thoáng, một khoảnh khắc đặc trưng

| Quyết định | Thực hiện |
|---|---|
| Chữ nhẹ và nhỏ hơn | Display/H1/H2 weight 400, H3/H4 500; thang chữ giảm khoảng 35%; nhãn in hoa, giãn chữ |
| Mỗi màn một ý | Trang chủ còn 8 section: hero, tuyên ngôn, mở hộp, ba dịch vụ, hệ sinh thái, bộ sưu tập, dự án, liên hệ. Lịch ngược Tết đầy đủ ở `/qua-tang/tet`, quy trình ở `/quy-trinh`, số liệu ở `/nang-luc` |
| Hero tràn màn hình | `HomeStage`: nền trắng, chỉ có tên thương hiệu, câu phụ và đồng hồ đếm ngược Ngày : Giờ : Phút : Giây đến 0h mùng 1 Tết (6/2/2027, giờ Việt Nam). Đồng hồ tự ẩn sau Tết. Bộ sưu tập trang chủ: `Carousel rows={2}`, mỗi trang 3 cột × 2 hàng |
| Khoảnh khắc mở hộp | `UnboxingStory`: section dính, hộp mở dần theo thao tác cuộn qua 4 lớp (bao bì, thiệp, quà, giao nhiều điểm). Minh họa CSS tạm, chờ chuỗi ảnh/video mở hộp thật. Reduced motion: hiện trạng thái đã mở, không dính |
| Chi tiết chất liệu | Nhãn căn giữa có hai đường kẻ mảnh; ánh kim lướt một lần trên chữ "compounded."; card viền magenta mảnh khi hover. Không thêm hiệu ứng lên logo |
| Chuyển động chậm | Ảnh hiện dần và thu nhẹ từ 105% khi vào khung nhìn; số đếm ngược đếm lên chậm; `Carousel` dùng chung cho hàng nhiều hơn 3 card |

---

## 1. Tóm tắt audit UI trước redesign

Cấu trúc code: toàn bộ 30+ route nằm trong một file `src/App.tsx` (418 dòng) và một `src/index.css` (800 dòng). Không có component tái sử dụng ngoài `PageIntro`, `SectionHeading`, `ProductCard`.

| # | Vấn đề trong brief | Trạng thái trước | Đã xử lý |
|---|---|---|---|
| 1 | Font | `index.html` load Inter từ Google Fonts, CSS dùng Be Vietnam Pro nhưng không load → trình duyệt fallback Segoe/Arial | Tự host Be Vietnam Pro (OFL) 400/500/600/700, bộ latin + vietnamese, có preload. Bỏ Google Fonts |
| 2 | Gothic BOND | Dùng rời rạc cho hero, metric, chữ "B" placeholder | Có role rõ: chỉ cho câu tiếng Anh, số thứ tự, số liệu (`.t-brand`, `.t-numeral`). Xem mục 2.3 |
| 3 | Màu đỏ | `#d6093f`, không khớp logo | Token `--bond-magenta: #DB0D3E` |
| 4 | Màu hard-code | 30+ mã màu rải rác (`#cf4960`, `#e9c975`, `#8ea69a`, `#67847a`, `#b98369`, `#f5d9b7`, `#62584f`, `#bcb0a4`...) | 0 mã màu hard-code ngoài `tokens.css` |
| 5 | Micro label | 9–11px, mono uppercase, opacity thấp | Label tối thiểu 13px, sentence case. Chữ nhỏ nhất trên site là 12px (ghi chú asset placeholder) |
| 6 | Button | 4 kiểu (`button-primary`, `button-dark`, `button-ghost`, `nav-cta`), góc vuông, 11px | 1 hệ `.btn` pill: primary + secondary, cao 52px (44px bản nhỏ), chữ 15–16px |
| 7 | Radius, border | 11/12/14/15/16px, border và shadow khác nhau từng card | Token `--radius-xs…xl`, `--radius-pill`; shadow hạn chế, ưu tiên phân tách bằng màu nền |
| 8 | Motion | Chỉ fade-up; `Reveal` tìm node bằng `querySelector` theo className nên khối ecosystem không bao giờ hiện | Product Motion system (mục 5). `Reveal` viết lại bằng ref |
| 9 | Product visual nhỏ | Thumbnail 235px với chữ "B" khổng lồ | Media frame lớn (4/5, 5/4, 16/9, 21/9), chiếm ≥70% card |
| 10 | Service section như cột chữ | 3 cột text trên homepage và hub | 3 chapter lớn có số thứ tự, visual chính và danh sách nhóm sản phẩm |
| 11 | Collection card nhỏ | 4 card trong nửa màn hình | Card lớn, lưới bất đối xứng 7/5 |
| 12 | Project placeholder | Khối màu + chữ "B" giả làm ảnh dự án | Placeholder ảnh thật trung tính, ghi rõ asset cần thay; không dùng symbol thay ảnh |
| 13 | Logo khách hàng dạng text | "TH true MILK, VINAMILK…" gõ bằng mono để giả logo | `LogoWall` chỉ render logo thật; khi thiếu asset hiện ô chờ có ghi chú |
| 14 | `html lang` | `en` | `vi` |
| 15 | Metadata | "built on Replit. Update this description…" | Title, description, OG, Twitter, canonical, locale `vi_VN` bằng nội dung BOND |
| 16 | Layout như slide | Section căn giữa, chữ lớn, không có visual | Hệ section có nhịp: typography → visual → proof → nghỉ → CTA |
| 17 | Visual weight ngang nhau | Eyebrow, H2, đoạn văn, card, CTA cùng trọng lượng | Mỗi section một headline nổi trội, label phụ, body muted |

Lỗi khác phát hiện thêm:
- `gothicb.ttf` thực chất là **Century Gothic Bold** (tên font trong file). Cần xác nhận license webfont với Monotype trước khi go-live.
- File này **không có glyph tiếng Việt có dấu** (thiếu ơ, ư, ầ, ế, ộ, ờ, ữ, ự...). Dùng cho headline tiếng Việt sẽ trộn font giữa một từ.
- Favicon là ô vuông cam `#FF3C00`, không thuộc brand. Đã thay bằng symbol crop từ logo chính thức.
- Title Về BOND có chuỗi `<br />` hiển thị nguyên văn ("Thiết kế trước.<br />Sản xuất sau.").
- Form tài liệu không có `onSubmit` nên bấm gửi sẽ reload trang. Đã thêm trạng thái xác nhận giống form liên hệ.
- Router không cuộn về đầu trang khi chuyển route. Đã thêm `ScrollToTop`.
- Không có skip link, focus state, `aria-expanded` cho menu mobile.

---

## 2. Design tokens

Nguồn duy nhất: `src/styles/tokens.css`.

### 2.1 Màu

| Token | Giá trị | Vai trò |
|---|---|---|
| `--bond-magenta` | `#DB0D3E` | Nhận diện, hành động (primary button, số chapter, accent) |
| `--bond-magenta-dark` | `#B50934` | Hover, label trên nền sáng |
| `--bond-magenta-soft` | `#FBE8EE` | Tag ngân sách, quote/key takeaway, focus ring |
| `--bond-magenta-tint` | `#FDF4F7` | Nền section nhấn nhẹ |
| `--bond-ink` | `#16161A` | Chữ chính, section năng lực/proof |
| `--bond-black` | `#000000` | Wordmark (chỉ trong file logo) |
| `--bond-canvas` | `#FFFFFF` | Nền chủ đạo, header |
| `--bond-paper` | `#F6F6F8` | Nền section xen kẽ, footer |
| `--bond-paper-deep` | `#EEEEF1` | Nền section tạo nhịp |
| `--bond-sage` | `#FDF4F7` | Tên cũ, nay là hồng magenta rất nhạt |
| `--bond-stone` | `#E4E4E9` | Nền media |
| `--bond-white` | `#FFFFFF` | Card, input, ô số liệu |
| `--bond-border` | `rgba(22,22,26,.14)` | Đường kẻ |
| `--bond-muted-text` | `rgba(22,22,26,.68)` | Chữ phụ (≥4.5:1 trên trắng) |

Token vai trò: `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-bg`, `--color-border`, `--color-border-strong`, `--color-action`, `--color-action-hover`, `--color-focus`, `--color-on-ink*`, `--color-ink-raised`. Class `.tone-ink` và `.tone-magenta` tự đổi các token này nên component không cần biến thể riêng cho nền tối.

Artwork palette (`--art-*`, nay là bạc, than, ngọc trai, hồng nhạt, vàng trầm): **chỉ dùng bên trong minh họa sản phẩm** (màu vật liệu, màu phiên bản). Không dùng cho nền section, card hay button.

### 2.2 Typography

| Token | Giá trị | Class |
|---|---|---|
| `--fs-display-xl` | `clamp(64px, 9vw, 144px)` | `.t-display-xl` |
| `--fs-display-l` | `clamp(52px, 7vw, 112px)` | `.t-display-l` |
| `--fs-h1` | `clamp(44px, 5.5vw, 84px)` | `.t-h1` |
| `--fs-h2` | `clamp(36px, 4vw, 64px)` | `.t-h2` |
| `--fs-h3` | `clamp(26px, 2.5vw, 40px)` | `.t-h3` |
| `--fs-h4` | `clamp(20px, 1.6vw, 24px)` | `.t-h4` |
| `--fs-body-l` | `clamp(19px, 1.5vw, 22px)` | `.t-body-l` |
| `--fs-body` | 18px (17px mobile) | `.t-body` |
| `--fs-small` | 16px | `.t-small` |
| `--fs-label` | 13px | `.t-label` |

Line-height: display 0.94, heading 1.02–1.12, body 1.6. Body bài viết 18px, rộng 720px.

### 2.3 Quy tắc font

- `Be Vietnam Pro`: mọi heading, body, navigation, label, UI. Headline tiếng Việt luôn dùng font này (display, H1, H2 weight 500; H3, H4 weight 600; tracking âm).
- `Gothic BOND` (`.t-brand`, `.t-numeral`): chỉ câu tiếng Anh ("Relationships, compounded.", tên mẫu Signature như "Red Archive") và chữ số (01/03, 100B, 6—10). Lý do: file font thiếu glyph tiếng Việt.
- Nếu BOND có bản Gothic BOND đầy đủ tiếng Việt, chỉ cần thay `public/fonts/gothic-bond-latin.woff2` và có thể mở rộng role cho headline tiếng Việt.

### 2.4 Layout, spacing, shape, motion

- Grid: 12 cột desktop, 8 cột tablet (<1024px), 4 cột mobile (<768px). `--container-max: 1280px`, `--gutter: clamp(20px, 4.4vw, 72px)`, `--grid-gap: clamp(16px, 2vw, 32px)`.
- Section: `--space-section: clamp(72px, 10.5vw, 176px)`, `--space-section-tight: clamp(56px, 7vw, 112px)`.
- Spacing scale: `--space-3xs` 4 → `--space-3xl` 96.
- Radius: `--radius-xs` 4, `-s` 8, `-m` 12, `-l` 16 (media, card), `-xl` 20 (panel lớn), `-pill`.
- Control: `--control-h` 52px, `--control-h-s` 44px.
- Motion: `--ease-out`, `--ease-in-out`, `--dur-fast` 180ms, `--dur-base` 320ms, `--dur-slow` 700ms, `--loop-base` 6s, `--loop-slow` 9s.

---

## 3. Shared components

| Component | File | Ghi chú |
|---|---|---|
| Header | `components/layout/SiteChrome.tsx` | Fixed 76px (64px mobile), 3 cột logo / nav giữa / CTA từ 1280px, active dot magenta, menu toàn màn hình dưới 1280px, `aria-expanded`, Esc để đóng |
| Footer | `SiteChrome.tsx` | Nền sáng: brand statement + sitemap rút gọn 3 cột, logo chính thức cỡ lớn, © và legal links |
| SiteShell, Breadcrumbs, Logo, ScrollToTop, skip link | `SiteChrome.tsx` | |
| Primary / Secondary button | `components/bond/primitives.tsx` (`ButtonLink`, `Button`) | Pill, 52px, icon mũi tên dịch nhẹ khi hover |
| Text link | `TextLink` | Gạch chân chạy từ trái, mũi tên dịch 3px |
| Label, Tag, ChapterNumber | `primitives.tsx` | |
| Filter chip | `FilterChips` | Giữ nguyên logic lọc, thêm `aria-pressed` |
| Section intro | `SectionIntro` | Mặc định center; split / stack vẫn có |
| Step carousel | `components/bond/StepCarousel.tsx` | Card bước quy trình cuộn ngang, nút trước/sau, bộ đếm, không tự chạy |
| Engagement models | `components/bond/EngagementModels.tsx` | 3 cách hợp tác và thời gian tương ứng |
| Tết countdown | `components/bond/TetCountdown.tsx` | Trục thời gian tới Tết 2027, mốc chốt thiết kế 15/10/2026, tự ẩn sau Tết |
| Trust row | `TrustRow` | Hợp đồng, VAT, đặt cọc tối đa 50%, thanh toán sau nghiệm thu |
| Metric block | `Metric` | |
| Chapter nav, next chapter | `ChapterNav`, `NextChapter` | Chip đánh số dính dưới header để nhảy tới chapter; link sang chapter kế tiếp |
| Accordion | `Accordion` | Nút thật, `aria-expanded`, `aria-controls`, không border đậm |
| Form field | `Field` | Input 52px, label luôn hiển thị và đánh số (01), (02) bằng CSS counter, focus ring magenta-soft |
| Quote / key takeaway | `Quote` | Nền magenta-soft + dấu graphic language |
| Logo wall | `LogoWall` | Chỉ render logo thật; thiếu asset → ô chờ |
| Media frame | `components/bond/Media.tsx` | Ưu tiên video → ảnh → minh họa motion → placeholder ảnh thật; lazy-load, poster cho video, tự pause ngoài viewport và khi reduced motion |
| Product Motion | `components/bond/ProductMotion.tsx` + `styles/motion.css` | Mục 5 |
| Reveal | `components/bond/Reveal.tsx` | Dùng ref (sửa lỗi cũ) |
| BondGlyph | `components/bond/BondGlyph.tsx` | Symbol B crop trực tiếp từ logo chính thức, không vẽ lại |
| Product / Collection card | `components/bond/cards.tsx` (`CollectionCard`) | size m/l |
| Project card | `ProjectCard` | feature / wide / tall / square |
| Article card | `ArticleCard` | featured / default |
| Showcase card | `ShowcaseCard` | Nhóm giải pháp trong service hub |
| Document card | `DocumentCard` | Tài liệu, Sale Kit |
| Contact form | `components/bond/ContactForm.tsx` | light / dark, giữ hành vi cũ |

Section library (`components/bond/sections.tsx`): `Section`, `EditorialHero` (luôn căn giữa, visual bên dưới), `Chapter` (Numbered Chapter / Split Feature, wide / half, đảo trái phải), `Statement` (khoảng nghỉ typography), `MetricBand`, `MediaStage` (full-width), `FinalCta`. Các layout lặp lại khác nằm trong CSS: `item-list`, `spec-list`, `check-list`, `grid-2/3`, `grid-offset`, `h-scroll` (Horizontal Showcase kéo tay), `sticky-layout` (sticky index), `journey` (diagram quy trình).

---

## 4. Page-template matrix

| Route | Template | Section chính |
|---|---|---|
| `/` | Home | Hero căn giữa (Gothic) + 3 khung sản phẩm bằng nhau + trust row · Brand proposition (magenta) · 3 service chapter (01–03) · Ecosystem proof (ink, logo plate, logo wall) · Collection lưới đều 3 cột · Quy trình (step carousel) · Dự án lưới 3 cột · Metric tiles · Lịch ngược Tết · CTA căn giữa + form (magenta) |
| `/ve-bond` | About / Story | Hero stacked + ảnh hậu trường 21:9 · Ý nghĩa tên (symbol B) · Manifesto đối lập · BOND làm gì · Nguyên tắc (magenta, numbered) · Hệ sinh thái (role card) · Gallery con người · Statement · CTA |
| `/bo-suu-tap` | Collection listing | Hero text · Notice · Filter chip (logic giữ nguyên) · Grid 3 cột đều · Cách hợp tác · Teaser Signature · CTA |
| `/bo-suu-tap/{slug}` | Collection detail | Product hero split · Gallery 3 ảnh · Chapter 01 Điểm làm nên mẫu · 02 Cấu trúc và chất liệu · 03 Phiên bản riêng · 04 Bối cảnh sử dụng · Related · CTA |
| `/bo-suu-tap/signature` | Signature | Hero center XL · 3 mẫu, mỗi mẫu một media 16:9 + tên Gothic · Quyền độc quyền (magenta) |
| `/quy-trinh` | Process story | Hero text · Journey diagram brief → giao hàng · Sticky index + 7 step chapter (mỗi bước một visual đầu ra) · Callout gấp / chuẩn bị · Điều khoản thanh toán · FAQ · CTA |
| `/qua-tang`, `/bao-bi`, `/vat-pham` | Service hub (category world) | Category hero + motion · Statement 3 cách hợp tác · Showcase lớn (quà tặng: feature + grid; bao bì: theo loại + carousel theo ngành; vật phẩm: grid 3) · Media stage 21:9 · Dự án liên quan · Năng lực liên quan · Quy trình rút gọn · CTA. Art direction: quà tặng nền ấm magenta-soft, bao bì paper-deep/stone, vật phẩm sage |
| `/qua-tang/{slug}` (5), `/bao-bi/{slug}` (9), `/vat-pham/{slug}` (3) | Service detail | Hero · Nhu cầu / Giải pháp BOND · Nhóm sản phẩm (card bộ sưu tập, lọc theo dịp với quà tặng) · Product showcase · Khả năng tùy biến · Production proof (metric) · Dự án liên quan · Liên kết cùng nhóm · CTA |
| `/du-an` | Project listing | Hero · Filter (giữ nguyên hành vi) · Featured 16:9 · Grid 3 cột đều · CTA |
| `/du-an/{slug}` | Case study | Hero + facts · Bối cảnh · Phạm vi · Concept · Cách giải · Chi tiết sản phẩm · Sản xuất và giao nhận (ink) · Kết quả (magenta) · Gallery full-bleed · Dự án khác · CTA |
| `/nang-luc` | Capability hub | Hero XL · Metric band · 6 capability chapter (số, ảnh thật, link) · Logo wall · CTA |
| `/nang-luc/{slug}` | Capability detail | Hero · Giá trị · Hệ thống vận hành (100B: role card) · Cam kết nguồn hàng (chỉ chuỗi cung ứng, magenta, 3 cam kết) · Ảnh thật · Proof · Dự án · Cam kết hợp đồng · Năng lực khác · CTA |
| `/goc-nhin` | Editorial hub | Hero · Featured article 7/5 · Grid 3 cột |
| `/goc-nhin/{slug}` | Article | Meta · H1 · Standfirst · Cover 21:9 · Body 720px/18px · Ảnh trong bài · Key takeaway · CTA · Bài liên quan |
| `/lien-he` | Utility: Contact | Statement + symbol B · Form rộng trên panel · Thông tin cần chuẩn bị |
| `/tai-lieu` | Utility: Documents | Hero + form email + mockup bìa PDF · Nội dung bộ tài liệu (3 phần) |
| `/cau-hoi-thuong-gap` | Utility: FAQ | Hero · 3 nhóm câu hỏi, accordion · CTA |
| `/tuyen-dung` | Utility: Careers | Hero + culture visual · Cách BOND làm việc · Gallery đội ngũ · Danh sách vị trí |
| `/chinh-sach-bao-mat`, `/dieu-khoan` | Legal | Tiêu đề · Body 720px, không animation |
| `/kit`, kit.bond.vn `/` | Sale Kit gate / home | Gate: logo, trạng thái bảo mật, mật khẩu (logic `VITE_KIT_PASSWORD` + sessionStorage giữ nguyên), visual. Home: header kit, nhóm tài liệu, document card có cover |
| `/kit/{doc}` (5) | Sale Kit document | Breadcrumb · Meta (nhóm, định dạng, trạng thái) · Cover lớn · Bảng giá (chỉ `/kit/bang-gia`) · Panel quyền truy cập · Danh sách file khác |
| `*` | 404 | Symbol B + CTA về trang chủ |

---

## 5. Motion system

Minh họa sản phẩm dựng bằng CSS (`ProductMotion`), dùng tạm cho tới khi có video/ảnh thật. Mỗi loại giải thích một cơ chế sản phẩm:

| Kind | Minh họa | Dùng ở |
|---|---|---|
| `box` | Nắp hộp nhấc lên, ruột set nhô ra, đóng lại | Quà tặng, hộp thương hiệu, hero trang chủ |
| `sleeve` | Khay trượt ra khỏi sleeve | Thời trang, mỹ phẩm, Trà Viễn Đông |
| `envelope` | Thiệp kéo lên khỏi phong bì | Tri ân đối tác, thiệp và ấn phẩm |
| `bag` | Túi xoay nhẹ | Túi thương hiệu, nội bộ |
| `layers` | Nắp, thiệp, khay, đáy tách lớp rồi ghép lại | Bao bì, trang sức, kỷ niệm |
| `kit` | Vật phẩm lần lượt xuất hiện trong khay | Vật phẩm, sự kiện |
| `colorway` | Bộ quà chuyển giữa các phiên bản màu | Phiên bản riêng, FMCG, POSM |
| `journey-*` | Brief viết ra · phương án xòe ra · băng chuyền sản xuất · giao nhiều điểm | Quy trình |

Quy tắc đã áp dụng: chỉ `transform`/`opacity`; loop 6–9s, ease-in-out, không giật; chỉ chạy khi media vào viewport (≥35%), trong grid chỉ chạy khi hover để không có nhiều motion cạnh tranh; khung đứng yên là trạng thái sản phẩm hoàn chỉnh; `prefers-reduced-motion` tắt toàn bộ animation và hiển thị một tư thế tĩnh vẫn cho thấy cấu trúc (nắp hé, khay trượt ra một nửa, các lớp tách nhẹ). Video thật: `<video muted loop playsInline preload="none" poster>`, tự pause ngoài viewport, không bao giờ có âm thanh.

---

## 6. File đã thay đổi

Mới:
- `src/styles/tokens.css`, `base.css`, `components.css`, `sections.css`, `motion.css`, `pages.css`
- `src/data/content.ts`
- `src/hooks/use-in-view.ts`
- `src/components/layout/SiteChrome.tsx`
- `src/components/bond/primitives.tsx`, `cards.tsx`, `sections.tsx`, `Media.tsx`, `ProductMotion.tsx`, `Reveal.tsx`, `BondGlyph.tsx`, `ContactForm.tsx`
- `src/pages/HomePage.tsx`, `AboutPage.tsx`, `CollectionPages.tsx`, `ProcessPage.tsx`, `ServicePages.tsx`, `ProjectPages.tsx`, `CapabilityPages.tsx`, `InsightPages.tsx`, `UtilityPages.tsx`, `KitPages.tsx`
- `public/fonts/*` (Be Vietnam Pro woff2 + OFL license, `gothic-bond-latin.woff2` subset từ `gothicb.ttf`)
- `public/favicon.png`, `public/apple-touch-icon.png` (crop từ `bond-logo.png`)
- `docs/redesign/README.md`, `docs/redesign/screenshots/*`
- `.gitignore`

Sửa: `index.html`, `src/App.tsx` (chỉ còn router), `src/index.css` (chỉ còn import).

Xóa: `public/favicon.svg` (ô cam ngoài brand), `src/pages/not-found.tsx` (không được dùng).

Không đổi: `public/sitemap.xml`, `robots.txt`, `llms.txt`, `src/components/ui/*`, `error-boundary.tsx`, `main.tsx`.

Deploy: `package.json` (thay manifest workspace Replit bằng manifest của app, giữ nguyên phiên bản dependency), `pnpm-lock.yaml` (tạo lại), `vite.config.ts` (không bắt buộc `PORT`/`BASE_PATH`, build ra `dist/`), `tsconfig.json` (bỏ reference tới `lib/*` không tồn tại), `pnpm-workspace.yaml` (bỏ danh sách package workspace, giữ `minimumReleaseAge`), `vercel.json` (framework Vite, SPA rewrite, cache font). Thư mục `dist/` cũ đã gỡ khỏi git.

---

## 7. Xác nhận kiểm tra

Repo đã được chuyển thành một app Vite độc lập (`package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `vercel.json`), không còn phụ thuộc workspace Replit. Chạy local: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm typecheck`.

- **Build**: `vite build` thành công. **Typecheck**: `tsc` với `tsconfig.base.json` + `noUnusedLocals`, 0 lỗi.
- **Route**: 36 URL (toàn bộ sitemap, các slug chi tiết, slug không tồn tại, `/kit/*`, 404) đều render, mỗi trang đúng 1 `h1`, không rơi vào error boundary, 0 lỗi console, 0 ảnh thiếu `alt`, không nhảy cấp heading.
- **Responsive**: kiểm tra ở 375, 768, 1024, 1440, 1920px. Không có horizontal overflow ở bất kỳ route nào.
- **Sitemap / navigation**: không thêm hay đổi URL. Header giữ nguyên 8 link + CTA. Footer bổ sung sitemap rút gọn và link pháp lý tới các route đã có.
- **Font**: trình duyệt xác nhận đã load Be Vietnam Pro 400/500/600/700 và Gothic BOND 700 từ file local; không còn request Google Fonts.
- **Metadata**: `lang="vi"`, title, description, OG, Twitter, canonical đã cập nhật; không còn chữ "Replit".
- **Reduced motion**: chụp với `prefers-reduced-motion: reduce`, animation tắt, minh họa hiển thị tư thế tĩnh.
- **Màu**: không còn mã hex nào ngoài `tokens.css`.

Screenshot desktop 1440 và mobile 390 của các page type chính: `docs/redesign/screenshots/` (tên file theo route, `-1440` / `-390`).

---

## 8. Asset thật còn thiếu

Mọi placeholder trên site đều ghi rõ "Minh họa tạm" hoặc "Ảnh thật cần bổ sung" kèm mô tả asset cần thay. Khi có asset, truyền `src` (ảnh) hoặc `video={{ webm, mp4, poster }}` vào `Media` là placeholder tự biến mất.

Ưu tiên cao:
1. **Logo đối tác chính thức**: TH true MILK, Vinamilk, PNJ, Shopee, VNG (SVG hoặc PNG nền trong). Đặt vào `public/assets/partners/` và điền trường `logo` trong `partners` (`src/data/content.ts`). Cần xác nhận quyền sử dụng logo.
2. **Ảnh dự án thật** cho 4 case study: hero 16:9, quá trình (phác thảo, mẫu màu, mẫu vật lý), 2 ảnh cận chi tiết, ảnh tập kết/giao hàng, gallery toàn cảnh 21:9, ảnh người nhận (có đồng ý).
3. **Ảnh sản phẩm 8 mẫu bộ sưu tập**: still-life nền giấy góc 3/4, cận chất liệu, góc mở hộp thấy ruột set, ảnh bối cảnh tặng.
4. **Video loop sản phẩm** (WebM + MP4 + poster, không âm thanh, 6–10s): hộp mở/đóng, khay trượt khỏi sleeve, thiệp rút khỏi phong bì, các lớp bao bì tách/ghép, kit lắp dần, bộ quà đổi phiên bản màu.
5. **Ảnh nhà máy / xưởng** thật: in, bồi hộp, kiểm soát chất lượng, kho tập kết, kiểm đếm.
6. **Ảnh đội ngũ**: chân dung đội BOND, đội ZAD làm việc với dieline/mẫu màu, ảnh hậu trường.
7. **3 mẫu Signature** (Red Archive, Common Table, After Hours): ảnh art direction riêng.

Ưu tiên trung bình:
- Ảnh bìa và ảnh trong bài cho 7 bài Góc nhìn.
- Bìa tài liệu thật cho Sale Kit và bộ PDF.
- Logo BOND phiên bản âm bản chính thức (nếu có) để dùng trực tiếp trên nền ink/magenta. Hiện logo luôn nằm trên nền sáng.
- Gothic BOND bản đầy đủ tiếng Việt và xác nhận license webfont (file hiện tại là Century Gothic Bold).
- Ảnh OG 1200×630 cho `og:image`.

Nội dung còn thiếu (không tự viết để tránh thay đổi thông điệp):
- Story, chất liệu, kỹ thuật cho từng mẫu Signature.
- Ngành, năm, phạm vi chi tiết và kết quả riêng cho từng case study (hiện dùng chung một đoạn bối cảnh / cách giải / kết quả như bản cũ).
- Danh sách vị trí tuyển dụng (hiện hiển thị trạng thái chưa có vị trí).
- Thông tin liên hệ trực tiếp: số điện thoại, email, địa chỉ văn phòng cho footer và trang liên hệ.
- Giá, MOQ thật cho bảng giá Sale Kit (hiện là khung, cột MOQ đánh dấu "Cần xác nhận").
- Câu trả lời riêng cho từng câu hỏi FAQ (bản cũ dùng một câu trả lời chung).
- Bộ lọc dự án: bản cũ chỉ có nút giao diện, chưa có logic lọc; đã giữ nguyên hành vi.
