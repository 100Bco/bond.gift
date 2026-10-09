import { useEffect } from 'react';

/**
 * Chạy fn mỗi khung hình khi trang cuộn hoặc đổi kích thước (gộp qua requestAnimationFrame).
 * Dùng cho chuyển động bám theo thanh cuộn: cuộn ngược thì chạy ngược. Tắt khi enabled = false.
 */
export function useScrollFx(fn: () => void, enabled: boolean, deps: unknown[] = []) {
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const run = () => { raf = 0; fn(); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => { window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const easeInOut = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;
