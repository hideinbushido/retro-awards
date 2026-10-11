'use client';

import { useEffect, useRef } from 'react';

/**
 * Vidéo muette en boucle. Elle ne tourne que lorsqu'elle est à l'écran, et
 * reste sur son image fixe si le visiteur a demandé moins d'animations.
 */
export default function LoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" />
  );
}
