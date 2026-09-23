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
