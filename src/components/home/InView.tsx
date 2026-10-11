'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Marque son contenu `data-in="1"` la première fois qu'il entre à l'écran.
 * Les animations d'apparition (CSS) s'y accrochent ; elles ne rejouent jamais.
 */
export default function InView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.in = '1';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
