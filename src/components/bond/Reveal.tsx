import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';

/**
 * Hiện nội dung khi vào viewport. Dùng tiết chế: cho khối nội dung chính, không cho từng dòng chữ.
 * Bản cũ tìm node qua querySelector theo className nên có khối không bao giờ hiện; bản này dùng ref.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: 0 | 1 | 2 | 3 }) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12, once: true, rootMargin: '0px 0px -8% 0px' });
  return (
    <Tag ref={ref} className={`reveal ${delay ? `reveal-d${delay}` : ''} ${inView ? 'is-visible' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
