'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Rewind, Music, Tv } from 'lucide-react';
import { nominees } from '@/data/nominees';
import type { Opening, Anime } from '@/data/nominees';
import { useMusicContext } from '@/contexts/MusicContext';

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

const YEARS = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005] as const;

type Phase = 'hero' | 'timetravel' | 'year';
type DisplayNominee =
  | { type: 'opening'; data: Opening }
  | { type: 'anime'; data: Anime }
  | null;

function pickNominee(year: number): DisplayNominee {
  const data = nominees[year];
  const pool: DisplayNominee[] = [
    ...data.openings.map(d => ({ type: 'opening' as const, data: d })),
    ...data.animes.map(d => ({ type: 'anime' as const, data: d })),
  ];
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Shared decorations ──
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
        autoPlay muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35, zIndex: 0 }}
        onEnded={onEnd}
      >
        <source src="/Fondaccueil2.mp4" type="video/mp4" />
      </video>
      <SlideDecorations />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(0,255,204,0.08) 0%, transparent 70%)', zIndex: 2 }}
      />

      <div className="relative text-center px-4 md:px-6 max-w-5xl mx-auto w-full animate-fade-up" style={{ zIndex: 3 }}>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 md:mb-8 text-xs font-bold tracking-widest uppercase rounded"
          style={{ border: '1px solid var(--border)', color: 'var(--neon)', background: 'rgba(0,255,204,0.05)' }}
        >
          <Rewind size={10} /> ZENKAI HORS-SÉRIE
        </div>

        {/* Title */}
        <h1 className="font-black leading-none mb-3 md:mb-6" style={{ fontSize: 'clamp(2.8rem, 16vw, 9rem)' }}>
          <span className="block glitch" data-text="RETRO" style={{ color: 'var(--sepia)', letterSpacing: '-0.02em' }}>RETRO</span>
          <span className="block neon-text" style={{ fontSize: '55%', letterSpacing: '0.3em', marginTop: '-0.1em' }}>AWARDS</span>
        </h1>

        {/* Year range */}
        <p className="text-xs md:text-sm mb-2 md:mb-4" style={{ color: 'var(--sepia-dim)', letterSpacing: '0.1em' }}>2005 — 2019</p>

        {/* Description — masquée sur mobile */}
        <p className="hidden md:block text-xs mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
          Reviens aux sources. Vote pour les meilleurs openings et animes de chaque année, de 2019 jusqu'aux origines.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-5 max-w-2xl mx-auto mt-4 md:mt-0">

          <Link href="/opening" className="group retro-card rounded-xl p-4 md:p-8 flex flex-col items-center gap-2 md:gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }} />
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}>
              <Music size={18} className="md:hidden" style={{ color: 'var(--neon)' }} />
              <Music size={28} className="hidden md:block" style={{ color: 'var(--neon)' }} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-0.5 hidden md:block" style={{ color: 'var(--sepia-dim)' }}>Catégorie 01</p>
              <h2 className="text-base md:text-2xl font-black" style={{ color: 'var(--sepia)' }}>Opening</h2>
            </div>
            <p className="text-xs hidden md:block" style={{ color: 'var(--sepia-dim)' }}>15 années · meilleur opening</p>
            <div className="flex items-center gap-1 text-xs font-bold tracking-widest neon-text opacity-0 group-hover:opacity-100 transition-opacity">
              VOTER <ChevronRight size={10} />
            </div>
          </Link>

          <Link href="/anime" className="group retro-card rounded-xl p-4 md:p-8 flex flex-col items-center gap-2 md:gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.06) 0%, transparent 70%)' }} />
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}>
              <Tv size={18} className="md:hidden" style={{ color: 'var(--neon)' }} />
              <Tv size={28} className="hidden md:block" style={{ color: 'var(--neon)' }} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-0.5 hidden md:block" style={{ color: 'var(--sepia-dim)' }}>Catégorie 02</p>
              <h2 className="text-base md:text-2xl font-black" style={{ color: 'var(--sepia)' }}>Anime</h2>
            </div>
            <p className="text-xs hidden md:block" style={{ color: 'var(--sepia-dim)' }}>15 années · meilleur anime</p>
            <div className="flex items-center gap-1 text-xs font-bold tracking-widest neon-text opacity-0 group-hover:opacity-100 transition-opacity">
              VOTER <ChevronRight size={10} />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

// ── Year timeline bar ──
function YearTimeline({ currentYear, onSelect }: { currentYear: number | null; onSelect: (idx: number) => void }) {
  return (
    <div className="year-timeline">
      {YEARS.map((y, idx) => {
        const active = currentYear !== null && y === currentYear;
        return (
          <button
            key={y}
            onClick={() => onSelect(idx)}
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
            className="flex flex-col items-center gap-1 px-3 py-1 flex-shrink-0"
          >
            <span className="text-xs font-bold tracking-widest transition-all" style={{
              color: active ? 'var(--neon)' : 'var(--sepia-dim)',
              textShadow: active ? '0 0 8px var(--neon)' : 'none',
            }}>
              {y}
            </span>
            <span className="block rounded-full transition-all" style={{
              width: active ? '8px' : '5px',
              height: active ? '8px' : '5px',
              background: active ? 'var(--neon)' : 'var(--sepia-dim)',
              boxShadow: active ? '0 0 6px var(--neon)' : 'none',
            }} />
          </button>
        );
      })}
    </div>
  );
}

// ── Year slide ──
function YearSlide({
  year, nominee, onEnd,
}: {
  year: number;
  nominee: DisplayNominee;
  onEnd: () => void;
}) {
  const isOpening = nominee?.type === 'opening';
  const isAnime = nominee?.type === 'anime';

  // Auto-play audio for openings
  useEffect(() => {
    if (!isOpening) return;
    const opening = (nominee as { type: 'opening'; data: Opening }).data;
    const audio = new Audio(opening.audio);
    audio.volume = 0.5;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.src = ''; };
  }, [isOpening, nominee]);

  const coverSrc = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.image
    : isAnime
      ? (nominee as { type: 'anime'; data: Anime }).data.image
      : null;

  const silhouetteSrc = isAnime
    ? (nominee as { type: 'anime'; data: Anime }).data.silhouette ?? null
    : null;

  const titleLine = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.openingTitle
    : isAnime
      ? (nominee as { type: 'anime'; data: Anime }).data.name
      : null;

  const subLine = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.animeName
    : null;

  const artistLine = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.artist ?? null
    : null;

  const opNum = isOpening ? (nominee as { type: 'opening'; data: Opening }).data.op : undefined;
  const categoryLabel = isOpening
    ? (opNum && opNum > 1 ? `Opening ${opNum}` : 'Opening')
    : isAnime ? 'Anime de l\'année' : null;
  const voteHref = isOpening ? `/opening/${year}` : `/anime/${year}`;
  const nomineesHref = isOpening ? `/opening/${year}` : `/anime/${year}`;

  return (
    <div
      className="relative w-full h-full overflow-hidden vhs-flicker"
      style={{ animation: 'slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <video
        autoPlay muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.25, zIndex: 0 }}
        onEnded={onEnd}
      >
        <source src="/Fondaccueil1.mp4" type="video/mp4" />
      </video>
      <SlideDecorations />

      {/* Main layout — responsive via CSS classes */}
      <div className="year-layout animate-fade-in">

        {/* Cover */}
        <div className="year-cover">
          {coverSrc ? (
            <img src={coverSrc} alt={titleLine ?? ''} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>À VENIR</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="year-info">
          <div className="flex items-center gap-3">
            <div className="h-px w-10" style={{ background: 'var(--neon)', opacity: 0.5 }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>RETRO AWARDS</span>
            <div className="h-px w-10 md:hidden" style={{ background: 'var(--neon)', opacity: 0.5 }} />
          </div>

          <h2 className="year-number glitch" data-text={String(year)}>{year}</h2>

          {nominee ? (
            <>
              {categoryLabel && (
                <span className="text-xs font-bold tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5" style={{ color: 'var(--neon)', opacity: 0.8 }}>
                  {isOpening ? <Music size={12} /> : <Tv size={12} />}
                  {categoryLabel}
                </span>
              )}
              <div>
                <p className="year-title">{titleLine}</p>
                {artistLine && <p className="year-subtitle mt-1">{artistLine}</p>}
                {subLine && <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>{subLine}</p>}
              </div>
              <div className="h-px w-32 hidden md:block" style={{ background: 'var(--border)' }} />
              <div className="year-buttons">
                <Link href={nomineesHref} className="btn-neon px-5 py-2 rounded text-xs tracking-widest">
                  VOIR NOMINÉS
                </Link>
                <Link
                  href={`/annee/${year}`}
                  className="px-5 py-2 rounded text-xs font-bold tracking-widest uppercase"
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

        {/* Silhouette (anime, desktop only) */}
        {isAnime && silhouetteSrc && (
          <div className="flex-shrink-0 self-end animate-fade-in hidden md:block" style={{ height: '85%' }}>
            <img
              src={silhouetteSrc}
              alt=""
              style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 24px rgba(0,255,204,0.3))' }}
            />
          </div>
        )}
      </div>

    </div>
  );
}

// ── Main carousel ──
export default function HomeCarousel() {
  const [yearIndex, setYearIndex] = useState(-1);
  const [phase, setPhase] = useState<Phase>('hero');
  const [nominee, setNominee] = useState<DisplayNominee>(null);
  const nextIdxRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const { pauseForOpening, resumeFromOpening } = useMusicContext();

  // Pause musique quand un opening est affiché, reprend sinon
  useEffect(() => {
    if (phase === 'year' && nominee?.type === 'opening') {
      pauseForOpening();
    } else {
      resumeFromOpening();
    }
  }, [phase, nominee, pauseForOpening, resumeFromOpening]);

  const currentYear = yearIndex >= 0 ? YEARS[yearIndex] : null;

  const goToYear = useCallback((idx: number) => {
    nextIdxRef.current = idx;
    setPhase('timetravel');
  }, []);

  // Sur mobile : pas d'avancement automatique à la fin de la vidéo
  const handleVideoEnd = useCallback(() => {
    if (isMobile) return;
    const next = yearIndex + 1;
    nextIdxRef.current = next >= YEARS.length ? -1 : next;
    setPhase('timetravel');
  }, [yearIndex, isMobile]);

  const afterTimeTravel = useCallback(() => {
    const idx = nextIdxRef.current;
    if (idx < 0 || idx >= YEARS.length) {
      setYearIndex(-1);
      setPhase('hero');
    } else {
      setNominee(pickNominee(YEARS[idx]));
      setYearIndex(idx);
      setPhase('year');
    }
  }, []);

  const isTransitioning = phase === 'timetravel';
  const canLeft = !isTransitioning && yearIndex > 0;
  const canRight = !isTransitioning && yearIndex < YEARS.length - 1;

  const handleLeft = () => { if (canLeft) goToYear(yearIndex - 1); };
  const handleRight = () => {
    if (!isTransitioning) goToYear(yearIndex === -1 ? 0 : yearIndex + 1);
  };

  // Fallback timetravel uniquement sur desktop (si vidéo bloque)
  useEffect(() => {
    if (phase !== 'timetravel' || isMobile) return;
    const t = setTimeout(afterTimeTravel, 6000);
    return () => clearTimeout(t);
  }, [phase, afterTimeTravel, isMobile]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {phase === 'hero' && <HeroSlide onEnd={handleVideoEnd} />}

      {phase === 'year' && currentYear !== null && (
        <YearSlide
          key={currentYear}
          year={currentYear}
          nominee={nominee}
          onEnd={handleVideoEnd}
        />
      )}

      {/* ── ARROWS (toujours présentes) ── */}
      <button
        onClick={handleLeft}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all"
        style={{
          zIndex: 20, width: '48px', height: '48px',
          background: 'rgba(13,10,6,0.85)',
          border: `1px solid ${canLeft ? 'var(--neon)' : 'var(--border)'}`,
          color: canLeft ? 'var(--neon)' : 'var(--sepia-dim)',
          opacity: canLeft ? 1 : 0.2,
          cursor: canLeft ? 'pointer' : 'default',
          boxShadow: canLeft ? '0 0 14px rgba(0,255,204,0.2)' : 'none',
          touchAction: 'manipulation',
        }}
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={handleRight}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all"
        style={{
          zIndex: 20, width: '48px', height: '48px',
          background: 'rgba(13,10,6,0.85)',
          border: `1px solid ${canRight ? 'var(--neon)' : 'var(--border)'}`,
          color: canRight ? 'var(--neon)' : 'var(--sepia-dim)',
          opacity: canRight ? 1 : 0.2,
          cursor: canRight ? 'pointer' : 'default',
          boxShadow: canRight ? '0 0 14px rgba(0,255,204,0.2)' : 'none',
          touchAction: 'manipulation',
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* ── YEAR TIMELINE (toujours présente) ── */}
      <YearTimeline
        currentYear={currentYear}
        onSelect={(idx) => !isTransitioning && idx !== yearIndex && goToYear(idx)}
      />

      {phase === 'timetravel' && (
        <div className="absolute inset-0 bg-black" style={{ zIndex: 50 }}>
          <video
            autoPlay muted playsInline preload="auto"
            className="w-full h-full object-cover"
            onEnded={afterTimeTravel}
            style={{ display: 'block' }}
          >
            <source src="/timetravel.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
