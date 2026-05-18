import Link from 'next/link';
import { ChevronRight, Rewind } from 'lucide-react';
import Navbar from '@/components/Navbar';
import BackgroundMusic from '@/components/BackgroundMusic';
import { YEARS } from '@/lib/firestore';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BackgroundMusic src="/music/ambiance.mp3" />

      <main className="pt-16">

        {/* ════════════ HERO ════════════ */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden vhs-flicker"
          style={{ background: 'var(--bg)' }}
        >
          <div className="crt-vignette" />

          {/* Neon grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,204,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,204,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Glow center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '800px',
              height: '500px',
              background: 'radial-gradient(ellipse, rgba(0,255,204,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-up">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase rounded"
              style={{ border: '1px solid var(--border)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
            >
              <Rewind size={12} />
              ZENKAI HORS-SÉRIE
            </div>

            <h1 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
              <span
                className="block glitch"
                data-text="RETRO"
                style={{ color: 'var(--sepia)', letterSpacing: '-0.02em' }}
              >
                RETRO
              </span>
              <span
                className="block neon-text"
                style={{ fontSize: '55%', letterSpacing: '0.3em', marginTop: '-0.1em' }}
              >
                AWARDS
              </span>
            </h1>

            <p className="text-sm md:text-base mb-4" style={{ color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}>
              OPENING &nbsp;·&nbsp; ANIME DE L'ANNÉE &nbsp;·&nbsp; 2005 — 2019
            </p>
            <p className="text-xs mb-12 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
              Reviens aux sources. Vote pour les meilleurs openings et animes de chaque année,
              de 2019 jusqu'aux origines.
            </p>

            <Link
              href="#timeline"
              className="inline-flex items-center gap-2 px-8 py-4 rounded btn-neon text-sm"
            >
              Commencer le voyage
              <ChevronRight size={16} />
            </Link>
          </div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
            style={{ color: 'var(--sepia-dim)', fontSize: '0.65rem', letterSpacing: '0.15em' }}
          >
            <span>SCROLL</span>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--neon), transparent)' }} />
          </div>
        </section>

        {/* ════════════ TIMELINE ════════════ */}
        <section id="timeline" className="py-20 px-4 md:px-8" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--neon)' }}>
                — CHOISIR UNE ANNÉE —
              </p>
              <h2 className="text-2xl md:text-4xl font-black" style={{ color: 'var(--sepia)' }}>
                De 2019 à 2005
              </h2>
              <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
            </div>

            {/* PC: 5-column grid */}
            <div className="hidden md:grid grid-cols-5 gap-4">
              {YEARS.map((year, i) => (
                <YearCard key={year} year={year} index={i} />
              ))}
            </div>

            {/* Mobile: vertical list */}
            <div className="md:hidden flex flex-col gap-3">
              {YEARS.map((year, i) => (
                <YearCardMobile key={year} year={year} index={i} />
              ))}
            </div>
          </div>
        </section>

        <footer
          className="py-8 text-center text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}
        >
          <p>ZENKAI RETRO AWARDS — HORS-SÉRIE</p>
          <p className="mt-1" style={{ color: 'rgba(155,138,106,0.4)' }}>2005 — 2019</p>
        </footer>
      </main>
    </>
  );
}

function YearCard({ year, index }: { year: number; index: number }) {
  return (
    <Link
      href={`/annee/${year}`}
      className="retro-card rounded-lg p-6 flex flex-col items-center justify-center gap-3 group"
      style={{
        minHeight: '140px',
        opacity: 0,
        animation: `fadeUp 0.5s ease ${index * 60}ms forwards`,
      }}
    >
      {index === 0 && (
        <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ background: 'rgba(0,255,204,0.1)', color: 'var(--neon)', border: '1px solid var(--border)' }}
        >
          RÉCENT
        </span>
      )}
      <span
        className="font-black text-3xl group-hover:neon-text transition-all"
        style={{ color: 'var(--sepia)' }}
      >
        {year}
      </span>
      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--sepia-dim)' }}>
        <span>Opening</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span>Anime</span>
      </div>
      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity neon-text" />
    </Link>
  );
}

function YearCardMobile({ year, index }: { year: number; index: number }) {
  return (
    <Link
      href={`/annee/${year}`}
      className="retro-card rounded-lg px-5 py-4 flex items-center justify-between group"
      style={{
        opacity: 0,
        animation: `fadeUp 0.4s ease ${index * 40}ms forwards`,
      }}
    >
      <div className="flex items-center gap-4">
        <span className="font-black text-2xl" style={{ color: 'var(--sepia)', minWidth: '3.5rem' }}>
          {year}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold" style={{ color: 'var(--sepia-dim)' }}>Opening · Anime de l'Année</span>
          {index === 0 && <span className="text-xs neon-text">Année la plus récente</span>}
        </div>
      </div>
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--neon)' }} />
    </Link>
  );
}
