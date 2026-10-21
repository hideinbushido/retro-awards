'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Opening } from '@/data/nominees';
import { PODIUM_POINTS, PODIUM_SIZE } from '@/lib/votes';
import { useMusicContext } from '@/contexts/MusicContext';
import { useIsTouch } from '@/hooks/useIsTouch';
import { PodiumTriangle } from '@/components/PodiumTriangle';
import MobileOpeningVote from '@/components/MobileOpeningVote';
import { useVoterGate } from '@/components/VoterGate';
import { useVotesClos } from '@/hooks/useVotesClos';
import { FIN_DES_VOTES_TEXTE, LIVES } from '@/lib/event';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';

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
      <div className={t.notice} data-tone="rec">
        <p className={`${s.display} ${t.noticeTitle}`}>Les votes sont clos</p>
        <p className={t.noticeText}>
          Ils ont fermé le {FIN_DES_VOTES_TEXTE}. Résultats des openings en live le {LIVES[0].date}.
        </p>
      </div>
    )}
    {readOnly && locked && (
      <>
        <PodiumTriangle year={year} podium={locked.map((id) => byId(id))} animeVote={animeVote} />
        <div className={t.sectionHead}>
          <div>
            <h3 className={`${s.display} ${t.sectionTitle}`}>Tous les nominés {year}</h3>
            <p className={s.faceHint}>Ton podium est enregistré. Réécoute les openings quand tu veux.</p>
          </div>
        </div>
      </>
    )}
    {teaser && revealed.size > 0 && (
      <div className={t.keys} style={{ justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={handleResetAll} className={t.key}>? Tout masquer</button>
      </div>
    )}

    {!teaser && !readOnly && (
      <div className={t.notice}>
        <p className={`${s.display} ${t.noticeTitle}`}>Ton podium de 3 openings</p>
        <p className={t.noticeText}>
          Survole une jaquette pour écouter. Glisse-la dans une des trois places du bas, ou touche « Choisir ».{' '}
          1er = <b>{PODIUM_POINTS[0]} pts</b>, 2e = <b>{PODIUM_POINTS[1]}</b>, 3e = <b>{PODIUM_POINTS[2]}</b>.
          Votes ouverts jusqu’au {FIN_DES_VOTES_TEXTE} inclus.
        </p>
      </div>
    )}

    <div className={s.tapes} style={{ marginTop: 0, paddingBottom: readOnly ? 0 : 160 }}>
      {openings.map((op) => {
        const isHidden  = teaser && !revealed.has(op.id);
        const isGlitch  = glitching === op.id;
        const isPlaying = playingId === op.id;
        const rank      = rankOf(op.id);
        const isPicked  = rank >= 0;

        /* ── CARTE MYSTÈRE (mode teaser) ── */
        if (isHidden) {
          return (
            <button
              key={op.id}
              type="button"
              className={`${t.pick}${isGlitch ? ' teaser-glitch' : ''}`}
              onClick={() => handleReveal(op.id)}
            >
              <span className={`${s.display} ${t.mystery}`}>?</span>
              <span className={`${s.osd} ${s.tapeTitle}`}>Nominé · toucher pour révéler</span>
            </button>
          );
        }

        /* ── CARTE NORMALE ── */
        return (
          <div
            key={op.id}
            draggable={!teaser && !readOnly}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', op.id); e.dataTransfer.effectAllowed = 'move'; }}
            className={t.pick}
            data-on={isPicked ? '1' : undefined}
            style={{ cursor: readOnly ? 'default' : teaser ? 'pointer' : 'grab' }}
            onMouseEnter={() => !teaser && playAudio(op)}
            onMouseLeave={() => !teaser && stopAudio()}
            onTouchStart={() => !teaser && (isPlaying ? stopAudio() : playAudio(op))}
          >
            <div className={`${t.thumb} ${t.coverBox} ${t.coverOpening}`}>
              <Image
                src={op.image}
                alt=""
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1000px) 30vw, 260px"
              />
              {isPlaying && (
                <span className={`${s.eq} ${t.eqCorner}`} aria-hidden="true"><i /><i /><i /><i /></span>
              )}
              {isPicked && (
                <span className={t.badge}>{RANK_LABEL[rank]} · {PODIUM_POINTS[rank]} pts</span>
              )}
            </div>

            <h3 className={`${s.display} ${s.tapeName}`}>{op.animeName}</h3>
            <p className={`${s.osd} ${s.tapeTitle}`}>♪ {op.openingTitle}</p>
            <p className={`${s.osd} ${s.tapeMeta}`}>
              {[op.artist, op.op && op.op > 1 ? `Opening ${op.op}` : 'Opening'].filter(Boolean).join(' · ')}
            </p>
            {!teaser && !readOnly && (
              <button
                onClick={(e) => { e.stopPropagation(); pickNextSlot(op.id); }}
                disabled={!isPicked && filled >= PODIUM_SIZE}
                className={t.key}
                data-on={isPicked ? '1' : undefined}
              >
                {isPicked ? `Retirer (${RANK_LABEL[rank]})` : filled >= PODIUM_SIZE ? 'Places prises' : 'Choisir'}
              </button>
            )}
          </div>
        );
      })}
    </div>

    {/* ── LES TROIS PLACES, FIXÉES EN BAS ── */}
    {!teaser && !readOnly && (
      <div className={t.rack}>
        <div className={t.rackInner}>
          {[0, 1, 2].map((i) => {
            const op = byId(slots[i]);
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
                className={t.slot}
                data-full={op ? '1' : undefined}
                data-target={dragOver === i ? '1' : undefined}
              >
                <span className={t.slotRank}>
                  <span className={`${s.display} ${t.slotRankNum}`}>{RANK_LABEL[i]}</span>
                  <span className={`${s.osd} ${t.slotPts}`}>{PODIUM_POINTS[i]} pts</span>
                </span>
                {op ? (
                  <>
                    <span className={t.slotThumb}>
                      <Image src={op.image} alt="" fill sizes="42px" />
                    </span>
                    <span className={`${s.display} ${t.slotName}`}>{op.animeName}</span>
                    <button onClick={() => clearSlot(i)} className={t.slotClear} aria-label={`Retirer le ${RANK_LABEL[i]}`}>
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <span className={`${s.osd} ${t.slotHint}`}>Glisse une jaquette ici</span>
                )}
              </div>
            );
          })}

          <button
            onClick={submitPodium}
            disabled={filled !== PODIUM_SIZE || sending}
            className={`${t.key} ${t.rackSend}`}
            data-on={filled === PODIUM_SIZE ? '1' : undefined}
          >
            {sending ? 'Envoi…' : `Valider ${filled}/${PODIUM_SIZE}`}
          </button>
        </div>
        {error && (<p className={`${s.osd} ${t.error}`} style={{ textAlign: 'center' }}>{error}</p>)}
      </div>
    )}
    </>
  );
}
