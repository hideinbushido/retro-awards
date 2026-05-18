import Link from 'next/link';
import { ChevronRight, Rewind, Music, Tv } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BackgroundMusic src="/music/ambiance.mp3" />

      <main className="pt-16 min-h-screen flex flex-col">

        {/* ════════════ HERO ════════════ */}
        <section
          className="relative flex-1 flex flex-col items-center justify-center overflow-hidden vhs-flicker"
          style={{ background: 'var(--bg)' }}
        >
          <div className="crt-vignette" />

          {/* Neon grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,204,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,204,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
            width: '800px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(0,255,204,0.06) 0%, transparent 70%)',
          }} />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full animate-fade-up">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase rounded"
              style={{ border: '1px solid var(--border)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
            >
              <Rewind size={12} />
              ZENKAI HORS-SÉRIE
            </div>

            {/* Title */}
            <h1 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
              <span className="block glitch" data-text="RETRO" style={{ color: 'var(--sepia)', letterSpacing: '-0.02em' }}>
                RETRO
              </span>
              <span className="block neon-text" style={{ fontSize: '55%', letterSpacing: '0.3em', marginTop: '-0.1em' }}>
                AWARDS
              </span>
            </h1>

            <p className="text-sm md:text-base mb-4" style={{ color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}>
              2005 — 2019
            </p>
            <p className="text-xs mb-16 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
              Reviens aux sources. Vote pour les meilleurs openings et animes de chaque année,
              de 2019 jusqu'aux origines.
            </p>

            {/* ── CATEGORY BUTTONS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">

              {/* OPENING */}
              <Link
                href="/opening"
                className="group retro-card rounded-xl p-8 flex flex-col items-center gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }}
                />
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
                >
                  <Music size={28} style={{ color: 'var(--neon)' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--sepia-dim)' }}>
                    Catégorie 01
                  </p>
                  <h2 className="text-2xl font-black group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>
                    Opening
                  </h2>
                </div>
                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>
                  15 années · meilleur opening
                </p>
                <div className="flex items-center gap-1 text-xs font-bold tracking-widest neon-text opacity-0 group-hover:opacity-100 transition-opacity">
                  CHOISIR UNE ANNÉE <ChevronRight size={12} />
                </div>
              </Link>

              {/* ANIME DE L'ANNÉE */}
              <Link
                href="/anime"
                className="group retro-card rounded-xl p-8 flex flex-col items-center gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }}
                />
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
                >
                  <Tv size={28} style={{ color: 'var(--neon)' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--sepia-dim)' }}>
                    Catégorie 02
                  </p>
                  <h2 className="text-2xl font-black group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>
                    Anime de l'Année
                  </h2>
                </div>
                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>
                  15 années · meilleur anime
                </p>
                <div className="flex items-center gap-1 text-xs font-bold tracking-widest neon-text opacity-0 group-hover:opacity-100 transition-opacity">
                  CHOISIR UNE ANNÉE <ChevronRight size={12} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-6 text-center text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}
        >
          <p>ZENKAI RETRO AWARDS — HORS-SÉRIE &nbsp;·&nbsp; 2005 — 2019</p>
        </footer>
      </main>
    </>
  );
}
