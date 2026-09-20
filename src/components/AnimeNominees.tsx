'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { Anime } from '@/data/nominees';
import { useVoterGate } from '@/components/VoterGate';

type Props = { year: number; animes: Anime[] };

export default function AnimeNominees({ year, animes }: Props) {
  /** Vote enregistré côté serveur pour cette année, ou null. */
  const [votedId, setVotedId] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { guard, gate, ask } = useVoterGate();

  /* Le vote fait foi côté serveur : on le relit au chargement. */
  useEffect(() => {
    let alive = true;
    fetch(`/api/vote?year=${year}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive && data?.anime) setVotedId(data.anime as string); })
      .catch(() => {});
    return () => { alive = false; };
  }, [year]);

  /** Le pseudo et le mail sont demandés d’abord, puis le vote repart tout seul. */
  function handleVote(id: string) {
    if (votedId || loading) return;
    guard(() => { void sendVote(id); });
  }

  async function cancelVote() {
    if (!votedId || loading) return;
    setLoading(votedId);
    setError(null);
    try {
      const res = await fetch('/api/vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, category: 'anime' }),
      });
      if (res.ok) setVotedId(null);
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'L’annulation a échoué.');
      }
    } catch {
      setError('Connexion impossible.');
    } finally {
      setLoading(null);
    }
  }

  async function sendVote(id: string) {
    setLoading(id);
    setError(null);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, category: 'anime', id }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || res.status === 409) setVotedId(id);
      else if (res.status === 401 && data.needIdentity) ask(() => { void sendVote(id); });
      else setError(data.error ?? 'Le vote a échoué.');
    } catch {
      setError('Connexion impossible.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      {gate}
      {error && (<p className="text-xs mb-3" style={{ color: "#ff5555" }}>{error}</p>)}
      {votedId && (
        <div className="retro-card rounded-lg p-3 mb-4 flex items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>
            Vote enregistré pour {year}. Ce n’est pas le bon ? Tu peux l’annuler.
          </p>
          <div className="flex gap-2 shrink-0">
            <button onClick={cancelVote} disabled={!!loading} className="btn-neon text-xs px-3 py-2 rounded">
              {loading ? '...' : 'Annuler'}
            </button>
            <a href="/mes-votes" className="btn-neon text-xs px-3 py-2 rounded">Mes votes</a>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animes.map((anime) => {
          const isMyVote = votedId === anime.id;
          const hasVoted = !!votedId;
          return (
            <div key={anime.id} className="retro-card rounded-lg overflow-hidden flex flex-col group">
              <div
                className="relative aspect-[2/3] overflow-hidden cursor-zoom-in"
                onClick={() => setZoomed(anime)}
              >
                {/* cadre 2:3 = le ratio de la plupart des jaquettes : remplit sans bandes, et le bas reste visible */}
                <Image src={anime.image} alt={anime.name} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover group-hover:brightness-110 transition-[filter] duration-500" style={{ objectPosition: '50% 75%' }} />
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
                <div>
                  <p className="font-black text-sm leading-tight" style={{ color: 'var(--sepia)' }}>{anime.name}</p>
                  {anime.season && (
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--neon)' }}>{anime.season}</p>
                  )}
                  {(anime.studio || anime.author) && (
                    <p className="text-[10px] leading-snug mt-1 opacity-70" style={{ color: 'var(--sepia)' }}>
                      {[anime.studio, anime.author].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => (isMyVote ? cancelVote() : handleVote(anime.id))}
                  disabled={(hasVoted && !isMyVote) || loading === anime.id}
                  className="btn-neon text-xs py-1.5 px-3 rounded w-full mt-auto"
                  style={isMyVote ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
                >
                  {loading === anime.id ? '...' : isMyVote ? '✓ Voté — annuler' : hasVoted ? 'Voté' : 'Voter'}
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
              <div className="relative" style={{ aspectRatio: '2/3' }}>
                <Image src={zoomed.image} alt={zoomed.name} fill sizes="90vw" className="object-cover" style={{ objectPosition: '50% 75%' }} />
              </div>
            </div>
            <div className="text-center mt-4">
              <h3 className="font-black text-lg" style={{ color: 'var(--sepia)' }}>{zoomed.name}</h3>
              {zoomed.season && (
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--neon)' }}>{zoomed.season}</p>
              )}
              {zoomed.studio && (
                <p className="text-xs mt-2 opacity-80" style={{ color: 'var(--sepia)' }}>Studio : {zoomed.studio}</p>
              )}
              {zoomed.author && (
                <p className="text-xs opacity-80" style={{ color: 'var(--sepia)' }}>Auteur : {zoomed.author}</p>
              )}
              <button
                onClick={() => {
                  if (votedId === zoomed.id) cancelVote();
                  else handleVote(zoomed.id);
                  setZoomed(null);
                }}
                disabled={!!votedId && votedId !== zoomed.id}
                className="btn-neon px-6 py-2 rounded text-sm mt-3"
                style={votedId === zoomed.id ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
              >
                {votedId === zoomed.id ? '✓ Voté — annuler' : votedId ? 'Déjà voté' : 'Voter pour cet anime'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
