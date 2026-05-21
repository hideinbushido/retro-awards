'use client';

import { useState, useRef, useCallback } from 'react';
import { Music, Volume2, Check } from 'lucide-react';
import { voteOpening } from '@/lib/firestore';
import { Opening } from '@/data/nominees';
import { useMusicContext } from '@/contexts/MusicContext';

type Props = { year: number; openings: Opening[] };

const VOTED_KEY = (year: number) => `retro_voted_opening_${year}`;

export default function OpeningNominees({ year, openings }: Props) {
  const [votedId, setVotedId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(VOTED_KEY(year));
  });
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { pauseForOpening, resumeFromOpening } = useMusicContext();

  const playAudio = useCallback((op: Opening) => {
    if (!op.audio) return;
    pauseForOpening();
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(op.audio);
    audio.volume = 0.7;
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
        const isPlaying = playingId === op.id;
        const isMyVote = votedId === op.id;
        const hasVoted = !!votedId;

        return (
          <div
            key={op.id}
            className="retro-card rounded-lg overflow-hidden flex flex-col group cursor-pointer relative"
            onMouseEnter={() => playAudio(op)}
            onMouseLeave={stopAudio}
            onTouchStart={() => isPlaying ? stopAudio() : playAudio(op)}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={op.image}
                alt={op.animeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,255,204,0.05) 0%, rgba(13,10,6,0.7) 100%)',
                  opacity: isPlaying ? 1 : 0,
                }}
              />
              {/* Playing bars */}
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

            {/* Info */}
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
              <button
                onClick={() => handleVote(op.id)}
                disabled={hasVoted || loading === op.id}
                className="btn-neon text-xs py-1.5 px-3 rounded w-full mt-auto"
                style={isMyVote ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
              >
                {isMyVote ? '✓ Voté' : hasVoted ? 'Voté' : loading === op.id ? '...' : 'Voter'}
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}
