'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { voteAnime } from '@/lib/firestore';
import { Anime } from '@/data/nominees';

type Props = { year: number; animes: Anime[] };

const VOTED_KEY = (year: number) => `retro_voted_anime_${year}`;

export default function AnimeNominees({ year, animes }: Props) {
  const [votedId, setVotedId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(VOTED_KEY(year));
  });
  const [zoomed, setZoomed] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function handleVote(id: string) {
    if (votedId || loading) return;
    setLoading(id);
    try {
      await voteAnime(year, id);
      localStorage.setItem(VOTED_KEY(year), id);
      setVotedId(id);
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animes.map((anime) => {
          const isMyVote = votedId === anime.id;
          const hasVoted = !!votedId;
          return (
            <div key={anime.id} className="retro-card rounded-lg overflow-hidden flex flex-col group">
              <div
                className="relative aspect-[3/4] overflow-hidden cursor-zoom-in"
                onClick={() => setZoomed(anime)}
              >
                <Image src={anime.image} alt={anime.name} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {isMyVote && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded text-xs font-bold"
                    style={{ background: 'var(--neon)', color: 'var(--bg)' }}
                  >
                    <Check size={10} /> MON VOTE
                  </div>
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(0,255,204,0.08)' }}
                >
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>Agrandir</span>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2 flex-1">
                <p className="font-black text-sm leading-tight" style={{ color: 'var(--sepia)' }}>{anime.name}</p>
                <button
                  onClick={() => handleVote(anime.id)}
                  disabled={hasVoted || loading === anime.id}
                  className="btn-neon text-xs py-1.5 px-3 rounded w-full mt-auto"
                  style={isMyVote ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
                >
                  {isMyVote ? '✓ Voté' : hasVoted ? 'Voté' : loading === anime.id ? '...' : 'Voter'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ZOOM MODAL */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setZoomed(null)}
        >
          <div className="relative max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoomed(null)} className="absolute -top-10 right-0 btn-neon p-1.5 rounded z-10">
              <X size={16} />
            </button>
            <div className="rounded-xl overflow-hidden neon-border">
              <div className="relative" style={{ aspectRatio: '3/4' }}>
                <Image src={zoomed.image} alt={zoomed.name} fill sizes="90vw" className="object-cover" />
              </div>
            </div>
            <div className="text-center mt-4">
              <h3 className="font-black text-lg" style={{ color: 'var(--sepia)' }}>{zoomed.name}</h3>
              <button
                onClick={() => { handleVote(zoomed.id); setZoomed(null); }}
                disabled={!!votedId}
                className="btn-neon px-6 py-2 rounded text-sm mt-3"
                style={votedId === zoomed.id ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
              >
                {votedId === zoomed.id ? '✓ Voté' : votedId ? 'Déjà voté' : 'Voter pour cet anime'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
