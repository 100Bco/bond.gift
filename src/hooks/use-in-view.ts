import { useEffect, useRef, useState } from 'react';

/** Theo dõi phần tử có đang nằm trong viewport hay không. `once` giữ trạng thái true sau lần đầu. */
export function useInView<T extends Element>({ threshold = 0.3, once = false, rootMargin = '0px' } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { threshold, rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);
  return [ref, inView] as const;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return;
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

/**
 * Như useInView nhưng chạy lại được: bật khi phần tử vào đủ sâu trong màn hình,
 * chỉ tắt khi đã ra hẳn khỏi màn hình để lần cuộn quay lại chuyển động chạy lại từ đầu.
 */
export function useReplayInView<T extends Element>({ threshold = 0.12, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const enter = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold, rootMargin });
    const exit = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setInView(false); }, { threshold: 0 });
    enter.observe(node);
    exit.observe(node);
    return () => { enter.disconnect(); exit.disconnect(); };
  }, [threshold, rootMargin]);
  return [ref, inView] as const;
}
