import Link from 'next/link';
import { ChevronDown, Music, Tv, Rewind } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="hero-retro-bg" />
      <div className="hero-grid" />
      <div className="crt-vignette" />

      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto w-full py-16 animate-fade-up">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-5 md:mb-8 text-xs font-bold tracking-widest uppercase rounded"
          style={{ border: '1px solid var(--border)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
        >
          <Rewind size={10} /> ZENKAI HORS-SÉRIE
        </div>

        {/* Title */}
        <h1 className="font-black leading-none mb-4 md:mb-6" style={{ fontSize: 'clamp(2.8rem, 16vw, 9rem)' }}>
          <span className="block glitch" data-text="RETRO" style={{ color: 'var(--sepia)', letterSpacing: '-0.02em' }}>RETRO</span>
          <span className="block neon-text" style={{ fontSize: '55%', letterSpacing: '0.3em', marginTop: '-0.1em' }}>AWARDS</span>
        </h1>

        {/* Year range */}
        <p className="text-xs md:text-sm mb-3 md:mb-5" style={{ color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}>2005 — 2019</p>

        {/* Description */}
        <p className="text-xs md:text-sm mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
          Reviens aux sources. Vote pour les meilleurs openings et animes de chaque année, de 2019 jusqu&apos;aux origines.
        </p>

        {/* Catégories — pills compacts */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          <Link href="/opening" className="pill-neon">
            <Music size={12} /> Opening
          </Link>
          <Link href="/anime" className="pill-neon">
            <Tv size={12} /> Anime
          </Link>
        </div>

        {/* CTA vers le carrousel */}
        <a href="#editions" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded text-xs tracking-widest">
          Explorer les éditions <ChevronDown size={14} />
        </a>
      </div>

      <a
        href="#comment-ca-marche"
        aria-label="Défiler vers le bas"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-cue"
      >
        <ChevronDown size={22} style={{ color: 'var(--neon)' }} />
      </a>
    </section>
  );
}
