'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Rewind, Music, Tv } from 'lucide-react';
import { nominees } from '@/data/nominees';
import type { Opening } from '@/data/nominees';

const YEARS = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005] as const;

type Phase = 'hero' | 'timetravel' | 'year';

function pickOne<T>(arr: T[]): T | null {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Shared BG grid / vignette ──
function SlideDecorations() {
  return (
    <>
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
      <video
        autoPlay muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.25, zIndex: 0 }}
        onEnded={onEnd}
      >
        <source src="/Fondaccueil2.mp4" type="video/mp4" />
      </video>
      <SlideDecorations />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(0,255,204,0.06) 0%, transparent 70%)', zIndex: 2 }}
      />

      <div className="relative text-center px-6 max-w-5xl mx-auto w-full animate-fade-up" style={{ zIndex: 3 }}>
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase rounded"
          style={{ border: '1px solid var(--border)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
        >
          <Rewind size={12} /> ZENKAI HORS-SÉRIE
        </div>

        <h1 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
          <span className="block glitch" data-text="RETRO" style={{ color: 'var(--sepia)', letterSpacing: '-0.02em' }}>RETRO</span>
          <span className="block neon-text" style={{ fontSize: '55%', letterSpacing: '0.3em', marginTop: '-0.1em' }}>AWARDS</span>
        </h1>

        <p className="text-sm md:text-base mb-4" style={{ color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}>2005 — 2019</p>
        <p className="text-xs mb-16 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
          Reviens aux sources. Vote pour les meilleurs openings et animes de chaque année, de 2019 jusqu'aux origines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <Link href="/opening" className="group retro-card rounded-xl p-8 flex flex-col items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }} />
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
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }} />
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

// ── Year timeline bar ──
function YearTimeline({
  currentYear,
  onSelect,
}: {
  currentYear: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div
      className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-0 px-4 pb-4 pt-3 overflow-x-auto"
      style={{ zIndex: 5, scrollbarWidth: 'none', borderTop: '1px solid var(--border)', background: 'rgba(13,10,6,0.6)', backdropFilter: 'blur(8px)' }}
    >
      {YEARS.map((y, idx) => {
        const active = y === currentYear;
        return (
          <button
            key={y}
            onClick={() => onSelect(idx)}
            className="flex flex-col items-center gap-1 px-3 py-1 group flex-shrink-0"
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <span
              className="text-xs font-bold tracking-widest transition-all"
              style={{
                color: active ? 'var(--neon)' : 'var(--sepia-dim)',
                textShadow: active ? '0 0 8px var(--neon)' : 'none',
              }}
            >
              {y}
            </span>
            <span
              className="block rounded-full transition-all"
              style={{
                width: active ? '8px' : '5px',
                height: active ? '8px' : '5px',
                background: active ? 'var(--neon)' : 'var(--sepia-dim)',
                boxShadow: active ? '0 0 6px var(--neon)' : 'none',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Year slide ──
function YearSlide({
  year,
  yearIndex,
  opening,
  onEnd,
  onLeft,
  onRight,
  onSelectYear,
}: {
  year: number;
  yearIndex: number;
  opening: Opening | null;
  onEnd: () => void;
  onLeft: () => void;
  onRight: () => void;
  onSelectYear: (idx: number) => void;
}) {
  const canLeft = yearIndex > 0;
  const canRight = yearIndex < YEARS.length - 1;

  return (
    <div
      className="relative w-full h-full overflow-hidden vhs-flicker"
      style={{ animation: 'slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      {/* Background video */}
      <video
        autoPlay muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.25, zIndex: 0 }}
        onEnded={onEnd}
      >
        <source src="/Fondaccueil1.mp4" type="video/mp4" />
      </video>
      <SlideDecorations />

      {/* Arrow LEFT */}
      <button
        onClick={canLeft ? onLeft : undefined}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all"
        style={{
          zIndex: 10,
          width: '48px', height: '48px',
          background: 'rgba(13,10,6,0.7)',
          border: `1px solid ${canLeft ? 'var(--neon)' : 'var(--border)'}`,
          color: canLeft ? 'var(--neon)' : 'var(--sepia-dim)',
          opacity: canLeft ? 1 : 0.3,
          cursor: canLeft ? 'pointer' : 'default',
          boxShadow: canLeft ? '0 0 12px rgba(0,255,204,0.15)' : 'none',
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Arrow RIGHT */}
      <button
        onClick={canRight ? onRight : undefined}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all"
        style={{
          zIndex: 10,
          width: '48px', height: '48px',
          background: 'rgba(13,10,6,0.7)',
          border: `1px solid ${canRight ? 'var(--neon)' : 'var(--border)'}`,
          color: canRight ? 'var(--neon)' : 'var(--sepia-dim)',
          opacity: canRight ? 1 : 0.3,
          cursor: canRight ? 'pointer' : 'default',
          boxShadow: canRight ? '0 0 12px rgba(0,255,204,0.15)' : 'none',
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Main content */}
      <div
        className="absolute inset-0 flex items-center justify-center pb-16 px-20 gap-10 animate-fade-in"
        style={{ zIndex: 3 }}
      >
        {/* Cover */}
        <div
          className="flex-shrink-0 rounded-2xl overflow-hidden"
          style={{
            width: 'clamp(160px, 22vw, 280px)',
            aspectRatio: '2/3',
            border: '2px solid var(--border)',
            boxShadow: '0 0 40px rgba(0,255,204,0.1)',
            background: 'var(--bg2)',
          }}
        >
          {opening ? (
            <img
              src={opening.image}
              alt={opening.animeName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
                À VENIR
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12" style={{ background: 'var(--neon)', opacity: 0.4 }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>
              RETRO AWARDS
            </span>
          </div>

          {/* Year */}
          <h2
            className="font-black leading-none glitch"
            data-text={String(year)}
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: 'var(--sepia)', letterSpacing: '-0.02em' }}
          >
            {year}
          </h2>

          {opening ? (
            <>
              {/* Opening title */}
              <div>
                <p className="font-black" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--sepia)' }}>
                  {opening.openingTitle}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--neon)', opacity: 0.8 }}>
                  {opening.animeName}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-32" style={{ background: 'var(--border)' }} />

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/opening/${year}`}
                  className="btn-neon px-5 py-2 rounded text-xs tracking-widest"
                >
                  VOIR NOMINÉS
                </Link>
                <Link
                  href={`/annee/${year}`}
                  className="px-5 py-2 rounded text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
                  style={{ border: '1px solid var(--sepia-dim)', color: 'var(--sepia-dim)' }}
                >
                  VOTER {year}
                </Link>
              </div>
            </>
          ) : (
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)', opacity: 0.5 }}>
              NOMINEES À VENIR
            </p>
          )}
        </div>
      </div>

      {/* Year timeline */}
      <YearTimeline currentYear={year} onSelect={onSelectYear} />
    </div>
  );
}

// ── Main carousel ──
export default function HomeCarousel() {
  const [yearIndex, setYearIndex] = useState(-1);
  const [phase, setPhase] = useState<Phase>('hero');
  const [shownOpening, setShownOpening] = useState<Opening | null>(null);
  const nextIdxRef = useRef<number>(0);

  const currentYear = yearIndex >= 0 ? YEARS[yearIndex] : null;

  const goToYear = useCallback((idx: number) => {
    nextIdxRef.current = idx;
    setPhase('timetravel');
  }, []);

  const handleVideoEnd = useCallback(() => {
    const next = yearIndex + 1;
    nextIdxRef.current = next >= YEARS.length ? -1 : next;
    setPhase('timetravel');
  }, [yearIndex]);

  const afterTimeTravel = useCallback(() => {
    const idx = nextIdxRef.current;
    if (idx < 0 || idx >= YEARS.length) {
      setYearIndex(-1);
      setPhase('hero');
    } else {
      const year = YEARS[idx];
      const data = nominees[year];
      setShownOpening(pickOne(data.openings));
      setYearIndex(idx);
      setPhase('year');
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">

      {phase === 'hero' && (
        <HeroSlide onEnd={handleVideoEnd} />
      )}

      {phase === 'year' && currentYear !== null && (
        <YearSlide
          key={currentYear}
          year={currentYear}
          yearIndex={yearIndex}
          opening={shownOpening}
          onEnd={handleVideoEnd}
          onLeft={() => goToYear(yearIndex - 1)}
          onRight={() => goToYear(yearIndex + 1)}
          onSelectYear={(idx) => idx !== yearIndex && goToYear(idx)}
        />
      )}

      {phase === 'timetravel' && (
        <div className="absolute inset-0 bg-black" style={{ zIndex: 50 }}>
          <video
            autoPlay muted playsInline
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
