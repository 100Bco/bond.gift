import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { zaloUrl } from '@/data/content';

/** Nút Zalo: mở Zalo OA khi đã có link, chưa có thì dẫn về trang liên hệ. */
export function ZaloLink({ children, className = '', ariaLabel }: { children: ReactNode; className?: string; ariaLabel?: string }) {
  if (zaloUrl) {
    return <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>{children}</a>;
  }
  return <Link href="/lien-he" className={className} aria-label={ariaLabel}>{children}</Link>;
}
