import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import type { CatalogItem, Post, Project, ServiceItem, Tone } from '@/data/content';
import { Media } from './Media';
import { ChapterNumber, Tag } from './primitives';

/* ---------- Collection card: ảnh chiếm phần lớn card, thông tin nằm dưới ảnh ---------- */

export function CollectionCard({ product, size = 'm', headingLevel = 3 }: { product: CatalogItem; size?: 'm' | 'l'; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link className={`card card-collection card-collection-${size}`} href={`/bo-suu-tap/${product.slug}`}>
      <Media ratio={size === 'l' ? '16 / 10' : '4 / 5'} tone="paper" motion={product.motion} art={product.art} play="hover" asset={`Ảnh ${product.name}, still-life trên nền giấy`} alt={`Minh họa ${product.name}`} />
      <div className="card-body">
        <div className="card-title-row">
          <Heading className={size === 'l' ? 't-h3' : 't-h4'}>{product.name}</Heading>
          <Tag tone="accent">{product.budget}</Tag>
        </div>
        <p className="card-meta">{product.material} · {product.style} · {product.occasion}</p>
      </div>
    </Link>
  );
}

/* ---------- Project card: luôn dùng ảnh dự án thật; thiếu ảnh thì placeholder có ghi chú ---------- */

export function ProjectCard({ project, variant = 'square', index }: { project: Project; variant?: 'feature' | 'wide' | 'tall' | 'square'; index?: number }) {
  const ratio = { feature: '16 / 9', wide: '3 / 2', tall: '4 / 5', square: '1 / 1' }[variant];
  const tone: Tone = index !== undefined && index % 2 ? 'sage' : 'deep';
  return (
    <Link className={`card card-project card-project-${variant}`} href={`/du-an/${project.slug}`}>
      <Media ratio={ratio} tone={tone} asset={project.asset} alt={project.title} />
      <div className="card-body">
        <dl className="card-facts">
          <div><dt>Ngành</dt><dd>{project.industry}</dd></div>
          <div><dt>Phạm vi</dt><dd>{project.scope}</dd></div>
          {project.year && <div><dt>Năm</dt><dd>{project.year}</dd></div>}
        </dl>
        <h3 className={variant === 'feature' ? 't-h2' : 't-h3'}>{project.title}</h3>
        {variant === 'feature' && project.summary && <p className="t-body-l card-summary">{project.summary}</p>}
      </div>
    </Link>
  );
}

/* ---------- Article card ---------- */

export function ArticleCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link className={`card card-article ${featured ? 'card-article-featured' : ''}`} href={`/goc-nhin/${post.slug}`}>
      <Media ratio={featured ? '4 / 3' : '3 / 2'} tone={featured ? 'magenta' : 'deep'} motion={post.motion} art={featured ? 'silk' : 'magenta'} play={featured ? 'inview' : 'hover'} asset="Ảnh minh họa bài viết theo art direction BOND" alt="" />
      <div className="card-body">
        <p className="card-meta">{post.category} · Đọc trong 5 phút</p>
        <h3 className={featured ? 't-h2' : 't-h4'}>{post.title}</h3>
        {featured && <p className="t-body-l card-summary">{post.excerpt}</p>}
      </div>
    </Link>
  );
}

/* ---------- Showcase card: nhóm giải pháp trong service hub ---------- */

export function ShowcaseCard({ item, href, index, total, tone = 'paper', size = 'm' }: { item: ServiceItem; href: string; index: number; total: number; tone?: Tone; size?: 'm' | 'l' }) {
  return (
    <Link className={`card card-showcase card-showcase-${size}`} href={href}>
      <Media ratio={size === 'l' ? '16 / 10' : '5 / 4'} tone={tone} motion={item.motion} art="magenta" play="hover" asset={item.asset} alt="" />
      <div className="card-body">
        <ChapterNumber n={index + 1} total={total} />
        <h3 className={size === 'l' ? 't-h2' : 't-h3'}>{item.title}</h3>
        <p className="card-copy">{item.copy}</p>
        <span className="text-link" aria-hidden="true"><span>Xem giải pháp</span><ArrowUpRight size={16} /></span>
      </div>
    </Link>
  );
}

/* ---------- Document card (tài liệu, Sale Kit) ---------- */

export function DocumentCard({ href, title, kind, group, children, cover }: { href: string; title: string; kind: string; group: string; children?: ReactNode; cover: ReactNode }) {
  return (
    <Link className="card card-document" href={href}>
      <div className="card-document-cover">{cover}</div>
      <div className="card-body">
        <p className="card-meta">{group} · {kind}</p>
        <h3 className="t-h4">{title}</h3>
        {children}
      </div>
    </Link>
  );
}
