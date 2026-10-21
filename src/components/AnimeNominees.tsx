'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Anime } from '@/data/nominees';
import { useVoterGate } from '@/components/VoterGate';
import { useVotesClos } from '@/hooks/useVotesClos';
import { FIN_DES_VOTES_TEXTE, LIVES } from '@/lib/event';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';

type Props = { year: number; animes: Anime[] };

export default function AnimeNominees({ year, animes }: Props) {
  /** Vote enregistré côté serveur pour cette année, ou null. */
  const [votedId, setVotedId] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { guard, gate, ask } = useVoterGate();
  const clos = useVotesClos();

  /* Le vote fait foi côté serveur : on le relit au chargement. */
  useEffect(() => {
    let alive = true;
    fetch(`/api/vote?year=${year}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive && data?.anime) setVotedId(data.anime as string); })
      .catch(() => {});
    return () => { alive = false; };
  }, [year]);

  /* Échap ferme l'affiche agrandie */
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomed(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed]);

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
      {clos && (
        <div className={t.notice} data-tone="rec">
          <p className={`${s.display} ${t.noticeTitle}`}>Les votes sont clos</p>
          <p className={t.noticeText}>
            Ils ont fermé le {FIN_DES_VOTES_TEXTE}. Résultats des animés en live le {LIVES[1].date}.
          </p>
        </div>
      )}
      {!clos && !votedId && (
        <div className={t.notice}>
          <p className={`${s.display} ${t.noticeTitle}`}>Un seul animé pour {year}</p>
          <p className={t.noticeText}>
            Touche une affiche pour l’agrandir. Ton vote reste annulable jusqu’au {FIN_DES_VOTES_TEXTE} inclus.
          </p>
        </div>
      )}
      {votedId && (
        <div className={t.notice}>
          <p className={`${s.display} ${t.noticeTitle}`}>Vote enregistré pour {year}</p>
          {!clos && <p className={t.noticeText}>Ce n’est pas le bon ? Tu peux l’annuler, puis revoter.</p>}
          <div className={t.keys}>
            {!clos && (
              <button onClick={cancelVote} disabled={!!loading} className={t.key}>
                {loading ? 'Annulation…' : 'Annuler mon vote'}
              </button>
            )}
            <Link href="/mes-votes" className={t.key}>Mes votes</Link>
          </div>
        </div>
      )}
      {error && <p className={`${s.osd} ${t.error}`} style={{ marginBottom: 20 }}>{error}</p>}

      <div className={s.posters} style={{ marginTop: 0 }}>
        {animes.map((anime) => {
          const isMyVote = votedId === anime.id;
          const hasVoted = !!votedId;
          return (
            <article
              key={anime.id}
              className={t.pick}
              data-on={isMyVote ? '1' : undefined}
              data-dim={hasVoted && !isMyVote ? '1' : undefined}
            >
              <button type="button" className={t.pickZoom} onClick={() => setZoomed(anime)} aria-label={`Agrandir ${anime.name}`}>
                {/* cadre 2:3 = le ratio de la plupart des jaquettes : remplit sans bandes, et le bas reste visible */}
                <span className={`${t.thumb} ${t.coverBox} ${t.coverAnime}`} style={{ display: 'block' }}>
                  <Image
                    src={anime.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1000px) 30vw, 260px"
                    style={{ objectPosition: '50% 75%' }}
                  />
                  {isMyVote && <span className={t.badge}>✓ Mon vote</span>}
                </span>
              </button>
              <h3 className={`${s.display} ${s.tapeName}`}>{anime.name}</h3>
              {anime.season && <p className={`${s.osd} ${s.tapeTitle}`}>{anime.season}</p>}
              {(anime.studio || anime.author) && (
                <p className={`${s.osd} ${s.tapeMeta}`}>{[anime.studio, anime.author].filter(Boolean).join(' · ')}</p>
              )}
              {!clos && (
                <button
                  onClick={() => (isMyVote ? cancelVote() : handleVote(anime.id))}
                  disabled={(hasVoted && !isMyVote) || loading === anime.id}
                  className={t.key}
                  data-on={isMyVote ? '1' : undefined}
                >
                  {loading === anime.id ? '…' : isMyVote ? '✓ Voté · annuler' : hasVoted ? 'Déjà voté' : 'Voter'}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* L'affiche en grand */}
      {zoomed && (
        <div className={t.overlay} onClick={() => setZoomed(null)}>
          <div className={t.zoom} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={zoomed.name}>
            <div className={t.zoomImg}>
              <Image src={zoomed.image} alt={zoomed.name} fill sizes="90vw" style={{ objectPosition: '50% 75%' }} />
              <button onClick={() => setZoomed(null)} className={t.close} aria-label="Fermer" style={{ zIndex: 2, background: 'rgba(8,6,3,0.85)' }}>
                <X size={18} />
              </button>
            </div>
            <h3 className={`${s.display} ${t.sheetTitle}`}>{zoomed.name}</h3>
            {zoomed.season && <p className={`${s.osd} ${s.tapeTitle}`}>{zoomed.season}</p>}
            {(zoomed.studio || zoomed.author) && (
              <p className={`${s.osd} ${s.tapeMeta}`}>
                {[zoomed.studio && `Studio : ${zoomed.studio}`, zoomed.author && `Auteur : ${zoomed.author}`].filter(Boolean).join(' · ')}
              </p>
            )}
            {!clos && (
              <button
                onClick={() => {
                  if (votedId === zoomed.id) cancelVote();
                  else handleVote(zoomed.id);
                  setZoomed(null);
                }}
                disabled={!!votedId && votedId !== zoomed.id}
                className={t.key}
                data-on={votedId === zoomed.id ? '1' : undefined}
              >
                {votedId === zoomed.id ? '✓ Voté · annuler' : votedId ? 'Déjà voté' : 'Voter pour cet animé'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
