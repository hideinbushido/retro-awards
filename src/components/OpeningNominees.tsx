'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Music, Trophy, X } from 'lucide-react';
import { Opening } from '@/data/nominees';
import { PODIUM_POINTS, PODIUM_SIZE } from '@/lib/votes';
import { useMusicContext } from '@/contexts/MusicContext';
import { useIsTouch } from '@/hooks/useIsTouch';
import { PodiumTriangle } from '@/components/PodiumTriangle';
import MobileOpeningVote from '@/components/MobileOpeningVote';
import { useVoterGate } from '@/components/VoterGate';
import { useVotesClos } from '@/hooks/useVotesClos';
import { FIN_DES_VOTES_TEXTE, LIVES } from '@/lib/event';

type Props = { year: number; openings: Opening[]; teaser?: boolean };

const REVEALED_KEY = (year: number) => `retro_teaser_revealed_${year}`;
/** Podium en cours de composition, pour ne rien perdre en rechargeant la page. */
const DRAFT_KEY = (year: number) => `retro_draft_${year}`;

/** Relit un brouillon, en écartant les openings qui n’existent plus. */
export function loadDraft(year: number, openings: Opening[]): (string | null)[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(DRAFT_KEY(year));
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return null;
    const known = new Set(openings.map((o) => o.id));
    const slots = [0, 1, 2].map((i) => (typeof parsed[i] === 'string' && known.has(parsed[i]) ? parsed[i] : null));
    return slots.some(Boolean) ? slots : null;
  } catch {
    return null;
  }
}

export function saveDraft(year: number, slots: (string | null)[]) {
  try { localStorage.setItem(DRAFT_KEY(year), JSON.stringify(slots)); } catch {}
}

export function clearDraft(year: number) {
  try { localStorage.removeItem(DRAFT_KEY(year)); } catch {}
}
const RANK_LABEL = ['1er', '2e', '3e'];
/** Une place par panier : index 0 = 1re place. */
const EMPTY_SLOTS: (string | null)[] = [null, null, null];

export default function OpeningNominees({ year, openings, teaser = false }: Props) {
  /** Paniers en cours de remplissage : un opening par place, ou null. */
  const [slots, setSlots] = useState<(string | null)[]>(() => loadDraft(year, openings) ?? EMPTY_SLOTS);
  /** Podium déjà enregistré côté serveur, ou null tant que rien n’a été voté. */
  const [locked, setLocked] = useState<string[] | null>(null);
  /** L'animé de l'année, pour rappeler qu'il reste à voter. */
  const [animeVote, setAnimeVote] = useState<boolean | undefined>(undefined);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const [revealed, setRevealed] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(REVEALED_KEY(year));
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });
  const [glitching, setGlitching] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const audioMapRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const { pauseForOpening, resumeFromOpening } = useMusicContext();
  const isTouch = useIsTouch();
  const { guard, gate, ask } = useVoterGate();

  /* Le podium en cours survit à un rechargement, tant qu’il n’est pas envoyé. */
  useEffect(() => {
    if (!locked) saveDraft(year, slots);
  }, [slots, year, locked]);

  /* Le bulletin déjà enregistré fait autorité : il vient du serveur. */
  useEffect(() => {
    let alive = true;
    fetch(`/api/vote?year=${year}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        if (data.podium) setLocked(data.podium as string[]);
        setAnimeVote(Boolean(data.anime));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [year]);

  useEffect(() => {
    openings.forEach(op => {
      if (!op.audio) return;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.volume = 0.7;
      audio.src = op.audio;
      audioMapRef.current.set(op.id, audio);
    });
    const map = audioMapRef.current;
    return () => {
      map.forEach(a => { a.pause(); a.src = ''; });
      map.clear();
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

  function handleResetAll() {
    setRevealed(new Set());
    try { localStorage.removeItem(REVEALED_KEY(year)); } catch {}
  }

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

  /** Place un opening dans un panier précis, en le retirant de son ancien. */
  function placeInSlot(id: string, slot: number) {
    if (locked) return;
    setError(null);
    setSlots((prev) => {
      const next = prev.map((x) => (x === id ? null : x));
      next[slot] = id;
      return next;
    });
  }

  /** Bouton mobile : envoie vers le premier panier libre. */
  function pickNextSlot(id: string) {
    if (locked) return;
    const already = slots.indexOf(id);
    if (already >= 0) {
      setSlots((prev) => prev.map((x) => (x === id ? null : x)));
      return;
    }
    const free = slots.indexOf(null);
    if (free >= 0) placeInSlot(id, free);
  }

  function clearSlot(slot: number) {
    if (locked) return;
    setSlots((prev) => prev.map((x, i) => (i === slot ? null : x)));
  }

  /** Le pseudo et le mail sont demandés d’abord, puis le vote repart tout seul. */
  function submitPodium() {
    if (locked || slots.filter(Boolean).length !== PODIUM_SIZE || sending) return;
    guard(() => { void sendPodium(); });
  }

  async function sendPodium() {
    const podium = slots.filter(Boolean) as string[];
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, category: 'opening', podium }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok || res.status === 409) {
        clearDraft(year);
        setLocked(podium);
      } else if (res.status === 401 && data.needIdentity) {
        // Le serveur ne nous reconnaît plus : on redemande, puis on renvoie le vote.
        ask(() => { void sendPodium(); });
      } else {
        setError(data.error ?? 'Le vote n’a pas pu être enregistré.');
      }
    } catch {
      setError('Connexion impossible. Réessaie dans un instant.');
    } finally {
      setSending(false);
    }
  }

  const shown = locked ?? slots;
  const rankOf = (id: string) => shown.indexOf(id);
  const filled = slots.filter(Boolean).length;
  const byId = (id: string | null | undefined) => openings.find((o) => o.id === id);

  /*
   * Vote validé : le podium s'affiche en tête, et les nominés restent visibles
   * dessous, en lecture seule — on doit pouvoir réécouter un opening ou revoir
   * qui était en lice après avoir voté.
   */
  const clos = useVotesClos();
  const readOnly = (Boolean(locked) || clos) && !teaser;

  /* ── VERSION TACTILE : le glisser-déposer ne se fait pas au doigt ── */
  if (isTouch && !teaser && !locked && !clos) {
    return <MobileOpeningVote year={year} openings={openings} onVoted={setLocked} />;
  }

  return (
    <>
    {gate}
    {readOnly && !locked && (
      <div className="retro-card rounded-lg p-4 mb-6 text-center">
        <p className="font-black text-sm" style={{ color: 'var(--sepia)' }}>Les votes sont clos</p>
        <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)' }}>
          Ils ont fermé le {FIN_DES_VOTES_TEXTE}. Résultats des openings en live le {LIVES[0].date}.
        </p>
      </div>
    )}
    {readOnly && locked && (
      <>
        <PodiumTriangle year={year} podium={locked.map((id) => byId(id))} animeVote={animeVote} />
        <div className="text-center mt-4 mb-8">
          <h3 className="font-black text-lg" style={{ color: 'var(--sepia)' }}>Tous les nominés {year}</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)' }}>
            Ton podium est enregistré. Réécoute les openings quand tu veux.
          </p>
        </div>
      </>
    )}
    {teaser && revealed.size > 0 && (
      <div className="flex justify-end mb-4">
        <button onClick={handleResetAll} className="btn-neon text-xs px-4 py-2 rounded flex items-center gap-2">
          <span style={{ fontSize: '1rem' }}>?</span> Tout masquer
        </button>
      </div>
    )}

    {!teaser && !readOnly && (
      <div className="retro-card rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <Trophy size={18} style={{ color: 'var(--neon)' }} className="shrink-0" />
        <p className="text-xs leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
          <span className="hidden sm:inline">
            Glisse tes openings préférés dans les paniers du bas, à la place que tu veux.{' '}
          </span>
          <span className="sm:hidden">
            Appuie sur « Choisir » pour remplir les paniers du bas.{' '}
          </span>
          1er = {PODIUM_POINTS[0]} points, 2e = {PODIUM_POINTS[1]}, 3e = {PODIUM_POINTS[2]}.
          {' '}Votes ouverts jusqu’au {FIN_DES_VOTES_TEXTE} inclus.
        </p>
      </div>
    )}

    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${readOnly ? 'pb-8' : 'pb-40'}`}>
      {openings.map((op) => {
        const isHidden  = teaser && !revealed.has(op.id);
        const isGlitch  = glitching === op.id;
        const isPlaying = playingId === op.id;
        const rank      = rankOf(op.id);
        const isPicked  = rank >= 0;

        /* ── CARTE MYSTÈRE (mode teaser) ── */
        if (isHidden) {
          return (
            <div
              key={op.id}
              className={`retro-card rounded-lg overflow-hidden flex flex-col cursor-pointer select-none${isGlitch ? ' teaser-glitch' : ''}`}
              onClick={() => handleReveal(op.id)}
            >
              <div className="relative aspect-[3/4] flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg2)' }}>
                <div className="absolute inset-0 teaser-scanlines pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0,255,204,0.08)', border: '1px solid var(--border)' }} />
                <span className="font-black select-none" style={{ fontSize: '5rem', color: 'var(--neon)', textShadow: '0 0 20px var(--neon), 0 0 60px rgba(0,255,204,0.4)', lineHeight: 1 }}>?</span>
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1 items-center justify-center text-center">
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>NOMINÉ</p>
                <p className="text-xs" style={{ color: 'var(--neon)', opacity: 0.7 }}>Cliquer pour révéler</p>
              </div>
            </div>
          );
        }

        /* ── CARTE NORMALE ── */
        return (
          <div
            key={op.id}
            draggable={!teaser && !readOnly}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', op.id); e.dataTransfer.effectAllowed = 'move'; }}
            className="retro-card rounded-lg overflow-hidden flex flex-col group relative"
            style={isPicked
              ? { borderColor: 'var(--neon)', boxShadow: '0 0 0 1px var(--neon)', cursor: readOnly ? 'default' : 'grab' }
              : { cursor: teaser ? 'pointer' : readOnly ? 'default' : 'grab' }}
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
                style={{ background: 'linear-gradient(to bottom, rgba(0,255,204,0.05) 0%, rgba(13,10,6,0.7) 100%)', opacity: isPlaying ? 1 : 0 }}
              />
              {isPlaying && (
                <div className="absolute top-2 right-2 flex items-end gap-0.5" style={{ height: '20px' }}>
                  {[0,1,2,3].map((i) => (<div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.15}s` }} />))}
                </div>
              )}
              {isPicked && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded text-xs font-black" style={{ background: 'var(--neon)', color: 'var(--bg)' }}>
                  {RANK_LABEL[rank]} · {PODIUM_POINTS[rank]} pts
                </div>
              )}
            </div>

            <div className="p-3 flex flex-col gap-2 flex-1">
              <div>
                <p className="font-black text-sm leading-tight" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--neon)' }}>
                  <Music size={10} className="inline mr-1" />{op.openingTitle}
                </p>
                {op.artist && (<p className="text-xs mt-0.5" style={{ color: 'var(--sepia-dim)' }}>{op.artist}</p>)}
                <p className="text-xs mt-0.5" style={{ color: 'var(--sepia-dim)', opacity: 0.6 }}>
                  {op.op && op.op > 1 ? `Opening ${op.op}` : 'Opening'}
                </p>
              </div>
              {!teaser && !readOnly && (
                <button
                  onClick={(e) => { e.stopPropagation(); pickNextSlot(op.id); }}
                  disabled={!isPicked && filled >= PODIUM_SIZE}
                  className="btn-neon text-xs py-1.5 px-3 rounded w-full mt-auto"
                  style={isPicked ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
                >
                  {isPicked ? `Retirer (${RANK_LABEL[rank]})` : filled >= PODIUM_SIZE ? 'Paniers pleins' : 'Choisir'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {/* ── LES TROIS PANIERS, FIXÉS EN BAS ── */}
    {!teaser && !readOnly && (
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-3 py-3"
        style={{ background: 'rgba(13,10,6,0.96)', borderTop: '1px solid var(--border)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-4xl mx-auto flex items-end gap-2 sm:gap-3">
          {[0, 1, 2].map((i) => {
            const op = byId(slots[i]);
            const active = dragOver === i;
            return (
              <div
                key={i}
                onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
                onDragLeave={() => setDragOver((d) => (d === i ? null : d))}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(null);
                  const id = e.dataTransfer.getData('text/plain');
                  if (id) placeInSlot(id, i);
                }}
                className="flex-1 rounded-lg p-2 flex items-center gap-2 transition-all"
                style={{
                  border: `1px dashed ${active ? 'var(--neon)' : op ? 'var(--neon)' : 'var(--border)'}`,
                  background: active ? 'rgba(0,255,204,0.12)' : 'transparent',
                  minHeight: '4.25rem',
                }}
              >
                <div className="text-center shrink-0" style={{ width: '2.4rem' }}>
                  <p className="font-black text-sm" style={{ color: 'var(--neon)' }}>{RANK_LABEL[i]}</p>
                  <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{PODIUM_POINTS[i]} pts</p>
                </div>
                {op ? (
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="relative shrink-0 rounded overflow-hidden" style={{ width: '2.4rem', height: '3.2rem' }}>
                      <Image src={op.image} alt={op.animeName} fill sizes="40px" className="object-cover" />
                    </div>
                    <p className="text-xs truncate flex-1" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
                    <button onClick={() => clearSlot(i)} className="shrink-0 p-1 rounded" style={{ color: 'var(--sepia-dim)' }} aria-label={`Retirer le ${RANK_LABEL[i]}`}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs flex-1" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>
                    <span className="hidden sm:inline">Glisse une cover ici</span>
                    <span className="sm:hidden">Vide</span>
                  </p>
                )}
              </div>
            );
          })}

          <button
            onClick={submitPodium}
            disabled={filled !== PODIUM_SIZE || sending}
            className="btn-neon text-xs py-3 px-4 rounded shrink-0 self-stretch"
            style={filled === PODIUM_SIZE ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
          >
            {sending ? '...' : `Valider (${filled}/${PODIUM_SIZE})`}
          </button>
        </div>
        {error && (<p className="max-w-4xl mx-auto text-xs mt-2" style={{ color: '#ff5555' }}>{error}</p>)}
      </div>
    )}
    </>
  );
}

