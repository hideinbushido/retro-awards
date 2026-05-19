'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Music, Tv, ChevronRight, Rewind } from 'lucide-react';
import { nominees } from '@/data/nominees';
import type { Opening, Anime } from '@/data/nominees';

const YEARS = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005] as const;

type Phase = 'hero' | 'timetravel' | 'year';

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// ── BG overlay shared by both slides ──
function SlideBackground({ src, onEnded }: { src: string; onEnded: () => void }) {
  return (
    <>
      <video
        key={src}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.25, zIndex: 0 }}
        onEnded={onEnded}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="crt-vignette" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,204,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,204,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 1,
        }}
      />
    </>
  );
}

// ── Hero slide ──
function HeroSlide({ onEnd }: { onEnd: () => void }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden vhs-flicker">
      <SlideBackground src="/Fondaccueil2.mp4" onEnded={onEnd} />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,255,204,0.06) 0%, transparent 70%)',
          zIndex: 2,
        }}
      />

      <div className="relative text-center px-6 max-w-5xl mx-auto w-full animate-fade-up" style={{ zIndex: 3 }}>
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase rounded"
          style={{ border: '1px solid var(--border)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
        >
          <Rewind size={12} />
          ZENKAI HORS-SÉRIE
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <Link href="/opening" className="group retro-card rounded-xl p-8 flex flex-col items-center gap-4 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }}
            />
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}>
              <Music size={28} style={{ color: 'var(--neon)' }} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--sepia-dim)' }}>Catégorie 01</p>
              <h2 className="text-2xl font-black group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>Opening</h2>
            </div>
            <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>15 années · meilleur opening</p>
            <div className="flex items-center gap-1 text-xs font-bold tracking-widest neon-text opacity-0 group-hover:opacity-100 transition-opacity">
              CHOISIR UNE ANNÉE <ChevronRight size={12} />
            </div>
          </Link>

          <Link href="/anime" className="group retro-card rounded-xl p-8 flex flex-col items-center gap-4 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }}
            />
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}>
              <Tv size={28} style={{ color: 'var(--neon)' }} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--sepia-dim)' }}>Catégorie 02</p>
              <h2 className="text-2xl font-black group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>Anime de l'Année</h2>
            </div>
            <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>15 années · meilleur anime</p>
            <div className="flex items-center gap-1 text-xs font-bold tracking-widest neon-text opacity-0 group-hover:opacity-100 transition-opacity">
              CHOISIR UNE ANNÉE <ChevronRight size={12} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Nominee cards ──
function OpeningCard({ op, year }: { op: Opening; year: number }) {
  return (
    <Link href={`/opening/${year}`} className="group retro-card rounded-lg overflow-hidden flex-shrink-0 w-36 sm:w-44">
      <div className="relative w-full aspect-square bg-black/60">
        <img
          src={op.image}
          alt={op.animeName}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
      </div>
      <div className="p-2">
        <p className="text-xs font-bold truncate" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
        <p className="text-xs truncate" style={{ color: 'var(--neon)', opacity: 0.8 }}>{op.openingTitle}</p>
      </div>
    </Link>
  );
}

function AnimeCard({ an, year }: { an: Anime; year: number }) {
  return (
    <Link href={`/anime/${year}`} className="group retro-card rounded-lg overflow-hidden flex-shrink-0 w-36 sm:w-44">
      <div className="relative w-full aspect-square bg-black/60">
        <img
          src={an.image}
          alt={an.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
      </div>
      <div className="p-2">
        <p className="text-xs font-bold truncate" style={{ color: 'var(--sepia)' }}>{an.name}</p>
      </div>
    </Link>
  );
}

// ── Year slide ──
function YearSlide({
  year, openings, animes, onEnd,
}: {
  year: number;
  openings: Opening[];
  animes: Anime[];
  onEnd: () => void;
}) {
  const hasNominees = openings.length > 0 || animes.length > 0;

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden vhs-flicker"
      style={{ animation: 'slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <SlideBackground src="/Fondaccueil1.mp4" onEnded={onEnd} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: '900px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(0,255,204,0.05) 0%, transparent 70%)',
        zIndex: 2,
      }} />

      <div className="relative w-full max-w-6xl mx-auto px-6 flex flex-col items-center" style={{ zIndex: 3 }}>

        {/* Separator line + label */}
        <div className="flex items-center gap-4 mb-4 animate-fade-in">
          <div className="h-px flex-1 max-w-20" style={{ background: 'var(--neon)', opacity: 0.35 }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>
            RETRO AWARDS
          </span>
          <div className="h-px flex-1 max-w-20" style={{ background: 'var(--neon)', opacity: 0.35 }} />
        </div>

        {/* Big year */}
        <h2
          className="font-black leading-none glitch"
          data-text={String(year)}
          style={{
            fontSize: 'clamp(5rem, 18vw, 13rem)',
            color: 'var(--sepia)',
            letterSpacing: '-0.02em',
            animation: 'fadeUp 0.4s ease forwards',
          }}
        >
          {year}
        </h2>

        {hasNominees ? (
          <>
            <p className="text-xs font-bold tracking-widest uppercase mt-2 mb-6" style={{ color: 'var(--sepia-dim)' }}>
              QUELQUES NOMINÉS
            </p>

            {/* Horizontal nominees */}
            <div className="flex items-start gap-8 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', maxWidth: '100%' }}>
              {openings.length > 0 && (
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <p className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--neon)' }}>
                    <Music size={10} /> Openings
                  </p>
                  <div className="flex gap-3">
                    {openings.map(op => <OpeningCard key={op.id} op={op} year={year} />)}
                  </div>
                </div>
              )}

              {openings.length > 0 && animes.length > 0 && (
                <div className="self-stretch w-px mx-1 flex-shrink-0" style={{ background: 'var(--border)' }} />
              )}

              {animes.length > 0 && (
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <p className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--neon)' }}>
                    <Tv size={10} /> Animes
                  </p>
                  <div className="flex gap-3">
                    {animes.map(an => <AnimeCard key={an.id} an={an} year={year} />)}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-xs tracking-widest uppercase mt-4 mb-6" style={{ color: 'var(--sepia-dim)', opacity: 0.5 }}>
            NOMINEES À VENIR
          </p>
        )}

        <Link
          href={`/annee/${year}`}
          className="mt-8 inline-flex items-center gap-2 px-6 py-2 text-xs font-bold tracking-widest uppercase rounded transition-all hover:scale-105 animate-fade-in"
          style={{ border: '1px solid var(--neon)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
        >
          VOTER POUR {year} <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

// ── Main carousel ──
export default function HomeCarousel() {
  const [yearIndex, setYearIndex] = useState(-1);
  const [phase, setPhase] = useState<Phase>('hero');
  const [shownOpenings, setShownOpenings] = useState<Opening[]>([]);
  const [shownAnimes, setShownAnimes] = useState<Anime[]>([]);

  const currentYear = yearIndex >= 0 ? YEARS[yearIndex] : null;

  const startTimeTravel = useCallback(() => {
    setPhase('timetravel');
  }, []);

  const afterTimeTravel = useCallback(() => {
    const next = yearIndex + 1;
    if (next >= YEARS.length) {
      setYearIndex(-1);
      setPhase('hero');
    } else {
      const year = YEARS[next];
      const data = nominees[year];
      setShownOpenings(pickRandom(data.openings, 3));
      setShownAnimes(pickRandom(data.animes, 3));
      setYearIndex(next);
      setPhase('year');
    }
  }, [yearIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">

      {phase === 'hero' && (
        <HeroSlide onEnd={startTimeTravel} />
      )}

      {phase === 'year' && currentYear !== null && (
        <YearSlide
          key={currentYear}
          year={currentYear}
          openings={shownOpenings}
          animes={shownAnimes}
          onEnd={startTimeTravel}
        />
      )}

      {phase === 'timetravel' && (
        <div className="absolute inset-0 bg-black" style={{ zIndex: 50 }}>
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            onEnded={afterTimeTravel}
          >
            <source src="/timetravel.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
