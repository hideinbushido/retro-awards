'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Music, Check } from 'lucide-react';
import { voteOpening } from '@/lib/firestore';
import { Opening } from '@/data/nominees';
import { useMusicContext } from '@/contexts/MusicContext';

type Props = { year: number; openings: Opening[]; teaser?: boolean };

const VOTED_KEY    = (year: number) => `retro_voted_opening_${year}`;
const REVEALED_KEY = (year: number) => `retro_teaser_revealed_${year}`;

export default function OpeningNominees({ year, openings, teaser = false }: Props) {
  const [votedId, setVotedId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(VOTED_KEY(year));
  });
  const [revealed, setRevealed] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(REVEALED_KEY(year));
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });
  const [glitching, setGlitching] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loading, setLoading]     = useState<string | null>(null);
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const audioMapRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const { pauseForOpening, resumeFromOpening } = useMusicContext();

  useEffect(() => {
    openings.forEach(op => {
      if (!op.audio) return;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.volume = 0.7;
      audio.src = op.audio;
      audioMapRef.current.set(op.id, audio);
    });
    return () => {
      audioMapRef.current.forEach(a => { a.pause(); a.src = ''; });
      audioMapRef.current.clear();
    };
  }, [openings]);

  const playAudio = useCallback((op: Opening) => {
    if (!op.audio) return;
    pauseForOpening();
    if (audioRef.current) audioRef.current.pause();
    const audio = audioMapRef.current.get(op.id);
    if (!audio) return;
    audio.currentTime = 0;
    audioRef.current = audio;
    audio.play().catch(() => {});
    setPlayingId(op.id);
    audio.onended = () => { setPlayingId(null); resumeFromOpening(); };
  }, [pauseForOpening, resumeFromOpening]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlayingId(null);
    resumeFromOpening();
  }, [resumeFromOpening]);

  function handleReveal(id: string) {
    if (glitching) return;
    setGlitching(id);
    setTimeout(() => {
      const next = new Set(revealed);
      next.add(id);
      setRevealed(next);
      setGlitching(null);
      try { localStorage.setItem(REVEALED_KEY(year), JSON.stringify([...next])); } catch {}
    }, 1450);
  }

  async function handleVote(id: string) {
    if (votedId || loading) return;
    setLoading(id);
    try {
      await voteOpening(year, id);
      localStorage.setItem(VOTED_KEY(year), id);
      setVotedId(id);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {openings.map((op) => {
        const isHidden  = teaser && !revealed.has(op.id);
        const isGlitch  = glitching === op.id;
        const isPlaying = playingId === op.id;
        const isMyVote  = votedId === op.id;
        const hasVoted  = !!votedId;

        /* ── MYSTERY CARD ── */
        if (isHidden) {
          return (
            <div
              key={op.id}
              className={`retro-card rounded-lg overflow-hidden flex flex-col cursor-pointer select-none${isGlitch ? ' teaser-glitch' : ''}`}
              onClick={() => handleReveal(op.id)}
            >
              <div
                className="relative aspect-[3/4] flex items-center justify-center overflow-hidden"
                style={{ background: 'var(--bg2)' }}
              >
                {/* Scanlines overlay */}
                <div className="absolute inset-0 teaser-scanlines pointer-events-none" />
                {/* Neon border pulse */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 30px rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
                />
                {/* Question mark */}
                <span
                  className="font-black select-none"
                  style={{
                    fontSize: '5rem',
                    color: 'var(--neon)',
                    textShadow: '0 0 20px var(--neon), 0 0 60px rgba(0,255,204,0.4)',
                    lineHeight: 1,
                  }}
                >
                  ?
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1 items-center justify-center text-center">
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
                  NOMINÉ
                </p>
                <p className="text-xs" style={{ color: 'var(--neon)', opacity: 0.7 }}>
                  Cliquer pour révéler
                </p>
              </div>
            </div>
          );
        }

        /* ── REVEALED / NORMAL CARD ── */
        return (
          <div
            key={op.id}
            className="retro-card rounded-lg overflow-hidden flex flex-col group cursor-pointer relative"
            onMouseEnter={() => !teaser && playAudio(op)}
            onMouseLeave={() => !teaser && stopAudio()}
            onTouchStart={() => !teaser && (isPlaying ? stopAudio() : playAudio(op))}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={op.image}
                alt={op.animeName}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,255,204,0.05) 0%, rgba(13,10,6,0.7) 100%)',
                  opacity: isPlaying ? 1 : 0,
                }}
              />
              {isPlaying && (
                <div className="absolute top-2 right-2 flex items-end gap-0.5" style={{ height: '20px' }}>
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
              {isMyVote && (
                <div
                  className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded text-xs font-bold"
                  style={{ background: 'var(--neon)', color: 'var(--bg)' }}
                >
                  <Check size={10} /> MON VOTE
                </div>
              )}
            </div>

            <div className="p-3 flex flex-col gap-2 flex-1">
              <div>
                <p className="font-black text-sm leading-tight" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--neon)' }}>
                  <Music size={10} className="inline mr-1" />{op.openingTitle}
                </p>
                {op.artist && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--sepia-dim)' }}>{op.artist}</p>
                )}
                <p className="text-xs mt-0.5" style={{ color: 'var(--sepia-dim)', opacity: 0.6 }}>
                  {op.op && op.op > 1 ? `Opening ${op.op}` : 'Opening'}
                </p>
              </div>
              {!teaser && (
                <button
                  onClick={() => handleVote(op.id)}
                  disabled={hasVoted || loading === op.id}
                  className="btn-neon text-xs py-1.5 px-3 rounded w-full mt-auto"
                  style={isMyVote ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
                >
                  {isMyVote ? '✓ Voté' : hasVoted ? 'Voté' : loading === op.id ? '...' : 'Voter'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
