import { useEffect, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { usePrefersReducedMotion, useReplayInView } from '@/hooks/use-in-view';

/**
 * Khối chuyển động khi cuộn tới, chạy lại mỗi khi khối ra hẳn khỏi màn hình rồi quay lại.
 * Con bên trong tự chọn kiểu bằng class: lx-rv-up (trượt lên, rõ dần), lx-rv-img (ảnh mở từ dưới lên),
 * lx-rv-line (đường kẻ dưới chạy trái sang phải). Độ trễ từng con đặt qua biến --d.
 * Máy bật giảm chuyển động thì hiện ngay, không chạy gì.
 */
export function ReplayReveal({ children, as: Tag = 'div', className = '', style }: { children: ReactNode; as?: ElementType; className?: string; style?: CSSProperties }) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useReplayInView<HTMLElement>();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) { setDone(false); return; }
    const t = window.setTimeout(() => setDone(true), 2900);
    return () => window.clearTimeout(t);
  }, [inView]);
  const cls = ['lx-rv', reduced ? '' : 'lx-rv-on', inView ? 'is-in' : '', done ? 'is-done' : '', className].filter(Boolean).join(' ');
  return <Tag ref={ref} className={cls} style={style}>{children}</Tag>;
}

/** Biến --d cho từng phần tử con, tính bằng giây. */
export const d = (seconds: number) => ({ '--d': `${seconds.toFixed(2)}s` }) as CSSProperties;
