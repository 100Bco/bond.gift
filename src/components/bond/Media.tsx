import { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { useInView, usePrefersReducedMotion } from '@/hooks/use-in-view';
import { ProductMotion, type ArtKey, type MotionKind } from './ProductMotion';
import type { Tone } from '@/data/content';

export type MediaFrameShape = 'rect' | 'lobe' | 'arch';

type MediaProps = {
  /** Ảnh thật. Khi có src, placeholder không còn hiển thị. */
  src?: string;
  alt?: string;
  /** Video loop không âm thanh. Luôn cần poster. */
  video?: { webm?: string; mp4?: string; poster: string };
  ratio?: string;
  tone?: Tone;
  motion?: MotionKind;
  art?: ArtKey;
  /** inview: chạy khi vào viewport; hover: chỉ chạy khi hover (dùng trong grid để tránh nhiều motion cùng lúc). */
  play?: 'inview' | 'hover' | 'none';
  /** Mô tả asset thật cần thay cho placeholder. */
  asset?: string;
  shape?: MediaFrameShape;
  priority?: boolean;
  className?: string;
};

/**
 * Media frame dùng chung cho mọi visual lớn.
 * Thứ tự ưu tiên: video → ảnh → minh họa motion → placeholder ảnh thật.
 * Placeholder luôn ghi rõ asset cần thay, không giả làm ảnh dự án thật.
 */
export function Media({ src, alt = '', video, ratio = '4 / 5', tone = 'paper', motion, art, play = 'inview', asset, shape = 'rect', priority = false, className = '' }: MediaProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  // Hiện dần một lần khi vào khung nhìn lần đầu (ảnh hero hiện ngay)
  const [revealed, setRevealed] = useState(priority);
  useEffect(() => { if (inView) setRevealed(true); }, [inView]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (inView && !reduced) node.play().catch(() => undefined);
    else node.pause();
  }, [inView, reduced]);

  const isPlaceholder = !src && !video;
  const classes = [
    'media',
    `media-tone-${tone}`,
    `media-shape-${shape}`,
    play === 'hover' ? 'media-hover' : '',
    play === 'inview' && inView ? 'is-playing' : '',
    isPlaceholder ? 'media-placeholder' : '',
    revealed ? 'is-revealed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} style={{ aspectRatio: ratio }} data-asset-needed={isPlaceholder ? asset ?? 'Ảnh sản phẩm' : undefined}>
      {video ? (
        <video ref={videoRef} className="media-el" muted loop playsInline preload="none" poster={video.poster} aria-label={alt}>
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      ) : src ? (
        <img className="media-el" src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      ) : motion ? (
        <>
          <ProductMotion kind={motion} art={art} />
          {alt && <span className="sr-only">{alt}</span>}
        </>
      ) : (
        <div className="media-photo-slot" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
          <span className="media-photo-geo" aria-hidden="true"><i /><i /></span>
          <Camera size={22} strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}
      {isPlaceholder && asset && (
        <span className="media-note">
          <span className="media-note-kicker">{motion ? 'Minh họa tạm' : 'Ảnh thật cần bổ sung'}</span>
          {asset}
        </span>
      )}
    </div>
  );
}
