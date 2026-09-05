'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { ChevronLeft, ChevronRight, Music, Tv } from 'lucide-react';
import { nominees } from '@/data/nominees';
import type { Opening, Anime } from '@/data/nominees';
import { useMusicContext } from '@/contexts/MusicContext';

const YEARS = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005] as const;

type Phase = 'timetravel' | 'year';
type DisplayNominee =
  | { type: 'opening'; data: Opening; alsoAnime?: Anime }
  | { type: 'anime'; data: Anime; alsoOpening?: Opening }
  | null;

const normTitle = (s: string) => s.trim().toLowerCase();

function pickNominee(year: number): DisplayNominee {
  const data = nominees[year];
  const hasOpenings = data.openings.length > 0;
  const hasAnimes = data.animes.length > 0;
  if (!hasOpenings && !hasAnimes) return null;

  // Tirage 50/50 par catégorie (pas par item) pour que "anime" ressorte aussi
  // souvent que "opening" même quand il y a beaucoup moins de nominés animes.
  const useAnime = hasAnimes && (!hasOpenings || Math.random() < 0.5);

  if (useAnime) {
    const anime = data.animes[Math.floor(Math.random() * data.animes.length)];
    // Même titre nominé aussi en Opening cette année-là → petit lien en plus, layout inchangé.
    const alsoOpening = data.openings.find(o => normTitle(o.animeName) === normTitle(anime.name));
    return { type: 'anime', data: anime, alsoOpening };
  }
  const opening = data.openings[Math.floor(Math.random() * data.openings.length)];
  const alsoAnime = data.animes.find(a => normTitle(a.name) === normTitle(opening.animeName));
  return { type: 'opening', data: opening, alsoAnime };
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
  year, nominee,
}: {
  year: number;
  nominee: DisplayNominee;
}) {
  const isOpening = nominee?.type === 'opening';
  const isAnime = nominee?.type === 'anime';

  // Même titre nominé aussi dans l'autre catégorie cette année-là → slide fusionné
  const alsoAnime = nominee?.type === 'opening' ? nominee.alsoAnime ?? null : null;
  const alsoOpening = nominee?.type === 'anime' ? nominee.alsoOpening ?? null : null;
  const pairOpening = isOpening ? (nominee as { type: 'opening'; data: Opening }).data : alsoOpening;
  const pairAnime = isAnime ? (nominee as { type: 'anime'; data: Anime }).data : alsoAnime;
  const isCombined = !!(pairOpening && pairAnime);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Auto-play audio dès qu'un opening est impliqué (seul ou dans un slide fusionné)
  useEffect(() => {
    if (!pairOpening) return;
    const audio = new Audio(pairOpening.audio);
    audio.volume = 0.5;
    audioRef.current = audio;
    audio.play().then(() => setAudioPlaying(true)).catch(() => setAudioPlaying(false));
    audio.onended = () => setAudioPlaying(false);
    return () => { audio.pause(); audio.src = ''; audioRef.current = null; setAudioPlaying(false); };
  }, [pairOpening]);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      audio.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
  }

  const coverSrc = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.image
    : isAnime
      ? (nominee as { type: 'anime'; data: Anime }).data.image
      : null;

  function pickSilhouette(s: Anime['silhouette'] | undefined, exclude?: string | null): string | null {
    if (!s) return null;
    if (!Array.isArray(s)) return s;
    if (s.length === 1) return s[0];
    let next = s[Math.floor(Math.random() * s.length)];
    while (next === exclude) next = s[Math.floor(Math.random() * s.length)];
    return next;
  }

  const [silhouetteSrc, setSilhouetteSrc] = useState<string | null>(() => pickSilhouette(pairAnime?.silhouette));

  // Change de personnage toutes les 10s tant que le slide est affiché
  useEffect(() => {
    const pool = pairAnime?.silhouette;
    if (!Array.isArray(pool) || pool.length < 2) return;
    const t = setInterval(() => {
      setSilhouetteSrc(prev => pickSilhouette(pool, prev));
    }, 10000);
    return () => clearInterval(t);
  }, [pairAnime]);

  const titleLine = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.openingTitle
    : isAnime
      ? (nominee as { type: 'anime'; data: Anime }).data.name
      : null;

  const subLine = isOpening
    ? (nominee as { type: 'opening'; data: Opening }).data.animeName
    : null;

  const animeSeason = isAnime
    ? (nominee as { type: 'anime'; data: Anime }).data.season ?? null
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
      className="relative w-full h-full overflow-hidden slide-flicker"
      style={{ animation: 'slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <video
        autoPlay muted playsInline loop
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.25, zIndex: 0 }}
      >
        <source src="/Fondaccueil1.mp4" type="video/mp4" />
      </video>
      <SlideDecorations />

      {isCombined && pairOpening && pairAnime ? (
        <div className="year-layout-combined animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: 'var(--neon)', opacity: 0.5 }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>RETRO AWARDS</span>
            <span className="font-black neon-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{year}</span>
          </div>

          <div className="combined-row">
            {/* Gauche — Opening */}
            <div className="combined-side">
              <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--neon)', opacity: 0.8 }}>
                <Music size={12} /> {pairOpening.op && pairOpening.op > 1 ? `Opening ${pairOpening.op}` : 'Opening'}
              </span>
              <div className="year-cover">
                <NextImage src={pairOpening.image} alt={pairOpening.openingTitle} fill sizes="(max-width: 768px) 40vw, 22vw" style={{ objectFit: 'cover' }} />
              </div>
              <p className="year-title" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}>{pairOpening.openingTitle}</p>
              {pairOpening.artist && <p className="year-subtitle" style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}>{pairOpening.artist}</p>}
              <div className="year-buttons">
                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    border: '1px solid var(--neon)',
                    color: 'var(--neon)',
                    background: audioPlaying ? 'rgba(0,255,204,0.12)' : 'transparent',
                    touchAction: 'manipulation',
                  }}
                >
                  {audioPlaying ? (
                    <><span style={{ fontSize: '14px' }}>⏸</span> PAUSE</>
                  ) : (
                    <><span style={{ fontSize: '14px' }}>▶</span> ÉCOUTER</>
                  )}
                </button>
                <Link href={`/opening/${year}`} className="btn-neon px-3 py-1.5 md:px-4 md:py-2 rounded text-xs tracking-widest">
                  VOIR
                </Link>
              </div>
            </div>

            {/* Centre — Silhouette, bien visible, desktop only */}
            {silhouetteSrc && (
              <div key={silhouetteSrc} className="combined-silhouette hidden md:flex silhouette-drift animate-fade-in">
                <img
                  src={silhouetteSrc}
                  alt=""
                  style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 28px rgba(0,255,204,0.35))' }}
                />
              </div>
            )}

            {/* Droite — Anime */}
            <div className="combined-side combined-side-right">
              <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--neon)', opacity: 0.8 }}>
                <Tv size={12} /> Anime de l&apos;année
              </span>
              <div className="year-cover">
                <NextImage src={pairAnime.image} alt={pairAnime.name} fill sizes="(max-width: 768px) 40vw, 22vw" style={{ objectFit: 'cover' }} />
              </div>
              <p className="year-title" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}>{pairAnime.name}</p>
              {pairAnime.season && (
                <p className="text-[11px] md:text-xs font-bold tracking-wider uppercase mt-1 leading-snug" style={{ color: 'var(--neon)', opacity: 0.85 }}>
                  {pairAnime.season}
                </p>
              )}
              <div className="year-buttons">
                <Link href={`/anime/${year}`} className="btn-neon px-3 py-1.5 md:px-4 md:py-2 rounded text-xs tracking-widest">
                  VOIR
                </Link>
              </div>
            </div>
          </div>

          <Link
            href={`/annee/${year}`}
            className="px-3 py-1.5 md:px-5 md:py-2 rounded text-xs font-bold tracking-widest uppercase"
            style={{ border: '1px solid var(--sepia-dim)', color: 'var(--sepia-dim)' }}
          >
            VOTER {year}
          </Link>
        </div>
      ) : (
      <div className="year-layout animate-fade-in">

        {/* Cover */}
        <div className="year-cover" style={{ position: 'relative' }}>
          {coverSrc ? (
            <NextImage
              src={coverSrc}
              alt={titleLine ?? ''}
              fill
              priority
              sizes="(max-width: 768px) 40vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>À VENIR</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="year-info">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: 'var(--neon)', opacity: 0.5 }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>RETRO AWARDS</span>
          </div>

          <h2 className="year-number glitch" data-text={String(year)}>{year}</h2>

          {/* Badge nominé */}
          <div
            className="inline-flex items-center px-3 py-1 rounded self-center md:self-start"
            style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
          >
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
              ✦ NOMINÉ
            </span>
          </div>

          {nominee ? (
            <>
              {categoryLabel && (
                <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--neon)', opacity: 0.8 }}>
                  {isOpening ? <Music size={12} /> : <Tv size={12} />}
                  {categoryLabel}
                </span>
              )}
              <div>
                <p className="year-title">{titleLine}</p>
                {animeSeason && (
                  <p className="text-xs md:text-sm font-bold tracking-wider uppercase mt-1 leading-snug" style={{ color: 'var(--neon)', opacity: 0.85 }}>
                    {animeSeason}
                  </p>
                )}
                {artistLine && <p className="year-subtitle mt-1">{artistLine}</p>}
                {subLine && <p className="text-sm md:text-base font-bold mt-1" style={{ color: 'var(--sepia-dim)', opacity: 0.9 }}>{subLine}</p>}
              </div>
              <div className="h-px w-32 hidden md:block" style={{ background: 'var(--border)' }} />
              <div className="year-buttons">
                {isOpening && (
                  <button
                    onClick={toggleAudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2 rounded text-xs font-bold tracking-widest uppercase transition-all"
                    style={{
                      border: '1px solid var(--neon)',
                      color: 'var(--neon)',
                      background: audioPlaying ? 'rgba(0,255,204,0.12)' : 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    {audioPlaying ? (
                      <><span style={{ fontSize: '14px' }}>⏸</span> PAUSE</>
                    ) : (
                      <><span style={{ fontSize: '14px' }}>▶</span> ÉCOUTER</>
                    )}
                  </button>
                )}
                <Link href={nomineesHref} className="btn-neon px-3 py-1.5 md:px-5 md:py-2 rounded text-xs tracking-widest">
                  VOIR NOMINÉS
                </Link>
                <Link
                  href={`/annee/${year}`}
                  className="px-3 py-1.5 md:px-5 md:py-2 rounded text-xs font-bold tracking-widest uppercase"
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
          <div key={silhouetteSrc} className="flex-shrink-0 self-end animate-fade-in silhouette-drift hidden md:block" style={{ height: '85%' }}>
            <img
              src={silhouetteSrc}
              alt=""
              style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 24px rgba(0,255,204,0.3))' }}
            />
          </div>
        )}

      </div>
      )}

    </div>
  );
}

// ── Main carousel ──
export default function HomeCarousel() {
  const [yearIndex, setYearIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('timetravel');
  const [nominee, setNominee] = useState<DisplayNominee>(null);
  const nextIdxRef = useRef<number>(0);
  const { pauseForOpening, resumeFromOpening } = useMusicContext();

  // Pause musique quand un opening est affiché, reprend sinon
  useEffect(() => {
    if (nominee?.type === 'opening') {
      pauseForOpening();
    } else {
      resumeFromOpening();
    }
  }, [nominee, pauseForOpening, resumeFromOpening]);

  const currentYear = YEARS[yearIndex];

  const goToYear = useCallback((idx: number) => {
    nextIdxRef.current = idx;
    setPhase('timetravel');
  }, []);

  const afterTimeTravel = useCallback(() => {
    const idx = nextIdxRef.current;
    setNominee(pickNominee(YEARS[idx]));
    setYearIndex(idx);
    setPhase('year');
  }, []);

  const isTransitioning = phase === 'timetravel';
  const canLeft = !isTransitioning && yearIndex > 0;
  const canRight = !isTransitioning && yearIndex < YEARS.length - 1;

  const handleLeft = () => { if (canLeft) goToYear(yearIndex - 1); };
  const handleRight = () => { if (canRight) goToYear(yearIndex + 1); };

  // Fallback timetravel si la vidéo ne se déclenche pas
  useEffect(() => {
    if (phase !== 'timetravel') return;
    const t = setTimeout(afterTimeTravel, 6000);
    return () => clearTimeout(t);
  }, [phase, afterTimeTravel]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {phase === 'year' && (
        <YearSlide
          key={currentYear}
          year={currentYear}
          nominee={nominee}
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
