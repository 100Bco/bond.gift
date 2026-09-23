import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './use-in-view';

/** Đếm chậm từ 0 lên `target` khi `start` bật. Reduced motion: hiện số cuối ngay. */
export function useCountUp(target: number, start = true, duration = 1600) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced || !start) { if (reduced) setValue(target); return; }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setValue(Math.round(target * eased));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration, reduced]);
  return value;
}
