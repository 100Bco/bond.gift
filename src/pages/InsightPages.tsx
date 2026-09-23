import { useRoute } from 'wouter';
import { insightPosts } from '@/data/content';
import { Breadcrumbs, SiteShell } from '@/components/layout/SiteChrome';
import { Media } from '@/components/bond/Media';
import { ButtonLink, Quote, SectionIntro, TextLink } from '@/components/bond/primitives';
import { EditorialHero, Section } from '@/components/bond/sections';
import { ArticleCard } from '@/components/bond/cards';

/* ---------- /goc-nhin ---------- */

export function InsightsPage() {
  const [featured, ...rest] = insightPosts;
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Góc nhìn' }]} />
      <EditorialHero
        layout="text"
        size="l"
        label="Góc nhìn"
        title={<>Những điều cần biết<br />trước khi chốt.</>}
        lead="Tiến độ, ngân sách, sai lầm thường gặp, kỹ thuật và chất liệu — viết cho những người phải ra quyết định."
      />
      <Section tone="canvas" spacing="bottom">
        <h2 className="sr-only">Bài viết</h2>
        <div className="insight-featured">
          <ArticleCard post={featured} featured />
        </div>
        <div className="insight-grid">
          {rest.map((post) => <ArticleCard key={post.slug} post={post} />)}
        </div>
      </Section>
    </SiteShell>
  );
}

/* ---------- /goc-nhin/:slug ---------- */

export function InsightDetailPage() {
  const [, params] = useRoute('/goc-nhin/:slug');
  const post = insightPosts.find((item) => item.slug === params?.slug) ?? insightPosts[0];
  const related = insightPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: 'Góc nhìn', href: '/goc-nhin' }, { label: post.title }]} />
      <article className="article">
        <header className="article-hero container">
          <p className="article-meta"><span>{post.category}</span><span>Đọc trong 5 phút</span><span>Thông tin tham khảo</span></p>
          <h1 className="t-h1 article-title">{post.title}</h1>
          <p className="t-body-l article-standfirst">{post.excerpt}</p>
        </header>
        <div className="container article-cover">
          <Media ratio="21 / 9" tone="deep" motion={post.motion} art="magenta" priority asset="Ảnh bìa bài viết theo art direction BOND" alt="" />
        </div>
        <div className="container">
          <div className="article-body">
            <p>Đối với một đơn quà tặng doanh nghiệp, con số cuối cùng chỉ là một phần của bài toán. Người đặt hàng còn cần nhìn thấy thời gian, hồ sơ nguồn hàng, mức độ tùy biến và cách xử lý khi danh sách người nhận thay đổi.</p>
            <h2>Bắt đầu từ người nhận và mốc cần hàng</h2>
            <p>Khi hai yếu tố này rõ, việc chọn chất liệu, cấu phần ruột set và kỹ thuật hoàn thiện sẽ dễ so sánh hơn. BOND luôn trình bày phương án theo cùng một cấu trúc để anh chị có thể đưa ra quyết định mà không phải đọc lại nhiều báo giá rời rạc.</p>
            <figure className="article-figure">
              <Media ratio="3 / 2" tone="deep" asset="Ảnh minh họa trong bài: so sánh cấu phần hộp, ruột set, thiệp" alt="So sánh cấu phần của một phần quà" />
            </figure>
            <Quote>Thiết kế riêng không phải là đặc quyền của một mức ngân sách. Nó là cách làm của BOND.</Quote>
            <div className="article-cta">
              <ButtonLink href="/lien-he">Trao đổi cùng BOND</ButtonLink>
            </div>
          </div>
        </div>
      </article>
      <Section tone="paper">
        <SectionIntro label="Đọc tiếp" title="Những điều cần biết trước khi chốt.">
          <TextLink href="/goc-nhin">Xem tất cả bài viết</TextLink>
        </SectionIntro>
        <div className="insight-grid">
          {related.map((item) => <ArticleCard key={item.slug} post={item} />)}
        </div>
      </Section>
    </SiteShell>
  );
}
