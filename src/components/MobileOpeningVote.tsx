'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, Music, Play, Square, Undo2, X } from 'lucide-react';
import { Opening } from '@/data/nominees';
import { PODIUM_POINTS, PODIUM_SIZE } from '@/lib/votes';
import { useMusicContext } from '@/contexts/MusicContext';
import { useVoterGate } from '@/components/VoterGate';

type Props = {
  year: number;
  openings: Opening[];
  onVoted: (podium: string[]) => void;
};

const MEDALS = ['🥇', '🥈', '🥉'];
const HINT_KEY = 'retro_hint_appui_long';
/** Distance au-delà de laquelle un appui long devient un scroll. */
const MOVE_TOLERANCE = 12;
/** Part de la largeur à franchir pour qu’un swipe compte. */
const SWIPE_RATIO = 0.25;

type RoundEnd =
  | { type: 'next'; kept: string[] }
  | { type: 'blocked' }
  | { type: 'empty' }
  | { type: 'rescue'; kept: string[]; rescuable: string[] };

/**
 * Vote des openings sur mobile.
 *
 * Le glisser-déposer du PC ne fonctionne pas au doigt : ici on sélectionne une
 * cover (appui long, ou tap si elle est déjà classée) puis on choisit son rang,
 * soit dans la bulle qui apparaît sous le doigt, soit dans les trois cases du
 * bas. Un mode « Tu hésites ? » propose un tri par swipe avant de classer.
 */
export default function MobileOpeningVote({ year, openings, onVoted }: Props) {
  const [mode, setMode] = useState<'grid' | 'swipe' | 'final'>('grid');
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [selected, setSelected] = useState<string | null>(null);
  const [bubble, setBubble] = useState<{ id: string; x: number; y: number } | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Ce composant n’est monté qu’une fois le navigateur là : lire localStorage
  // à l’initialisation ne risque pas d’écart avec le rendu serveur.
  const [showHint, setShowHint] = useState(() => {
    try { return !localStorage.getItem(HINT_KEY); } catch { return true; }
  });

  /* Mode swipe */
  const [pool, setPool] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [kept, setKept] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [roundEnd, setRoundEnd] = useState<RoundEnd | null>(null);
  const [dx, setDx] = useState(0);
  const [finalPool, setFinalPool] = useState<string[] | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStart = useRef<{ x: number; y: number } | null>(null);
  const swipeStart = useRef<number | null>(null);
  const { pauseForOpening, resumeFromOpening } = useMusicContext();
  const { guard, gate } = useVoterGate();

  const byId = useCallback((id: string | null) => openings.find((o) => o.id === id), [openings]);
  /** Nombre de rangs réellement attribuables : 3, ou moins s’il y a peu de nominés. */
  const ranks = Math.min(PODIUM_SIZE, openings.length);

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlayingId(null);
    resumeFromOpening();
  }, [resumeFromOpening]);

  /** Un seul extrait à la fois : toute nouvelle lecture coupe la précédente. */
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

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); }, []);

  function buzz() {
    try { navigator.vibrate?.(12); } catch {}
  }

  function dismissHint() {
    setShowHint(false);
    try { localStorage.setItem(HINT_KEY, '1'); } catch {}
  }

  /* ── Sélection et rangs ── */

  function select(id: string, at?: { x: number; y: number }) {
    setError(null);
    setSelected(id);
    if (at) setBubble({ id, x: at.x, y: at.y });
    buzz();
  }

  function deselect() {
    setSelected(null);
    setBubble(null);
  }

  /** Place la cover au rang demandé. Si la case est prise, on échange. */
  function assignRank(id: string, rank: number) {
    setSlots((prev) => {
      const next = [...prev];
      const from = next.indexOf(id);
      const occupant = next[rank];
      next[rank] = id;
      if (from >= 0 && from !== rank) next[from] = occupant ?? null;
      return next;
    });
    buzz();
    deselect();
  }

  function removeFromPodium(id: string) {
    setSlots((prev) => prev.map((x) => (x === id ? null : x)));
    deselect();
  }

  function clearSlot(rank: number) {
    setSlots((prev) => prev.map((x, i) => (i === rank ? null : x)));
  }

  /* ── Appui long sur la grille ── */

  function onCardTouchStart(op: Opening, e: React.TouchEvent) {
    const t = e.touches[0];
    pressStart.current = { x: t.clientX, y: t.clientY };
    pressTimer.current = setTimeout(() => {
      pressTimer.current = null;
      dismissHint();
      select(op.id, { x: t.clientX, y: t.clientY });
    }, 450);
  }

  function onCardTouchMove(e: React.TouchEvent) {
    if (!pressTimer.current || !pressStart.current) return;
    const t = e.touches[0];
    const moved = Math.hypot(t.clientX - pressStart.current.x, t.clientY - pressStart.current.y);
    // L’utilisateur fait défiler la grille : on annule l’appui long.
    if (moved > MOVE_TOLERANCE) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }

  function onCardTouchEnd(op: Opening) {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
      // Appui court : pendant le choix d’un rang, il re-cible la cover ;
      // sinon il écoute l’extrait, ou reprend une cover déjà classée.
      if (selected === op.id) deselect();
      else if (selected) select(op.id);
      else if (slots.includes(op.id)) select(op.id);
      else if (playingId === op.id) stopAudio();
      else playAudio(op);
    }
  }

  /* ── Mode swipe ── */

  function startSwipe() {
    stopAudio();
    const base = openings.map((o) => o.id);
    setPool(base);
    setIndex(0);
    setKept([]);
    setRejected([]);
    setRound(1);
    setRoundEnd(null);
    setDx(0);
    setMode('swipe');
  }

  function decide(keep: boolean) {
    const id = pool[index];
    if (!id) return;
    stopAudio();
    buzz();
    if (keep) setKept((k) => [...k, id]);
    else setRejected((r) => [...r, id]);
    setDx(0);
    if (index + 1 >= pool.length) finishRound(keep ? [...kept, id] : kept, keep ? rejected : [...rejected, id]);
    else setIndex(index + 1);
  }

  function undo() {
    if (index === 0) return;
    const previous = pool[index - 1];
    setKept((k) => k.filter((x) => x !== previous));
    setRejected((r) => r.filter((x) => x !== previous));
    setIndex(index - 1);
    setDx(0);
  }

  function finishRound(finalKept: string[], finalRejected: string[]) {
    if (finalKept.length === pool.length) { setRoundEnd({ type: 'blocked' }); return; }
    if (finalKept.length === 0) { setRoundEnd({ type: 'empty' }); return; }
    if (finalKept.length < ranks) {
      // Il en reste moins que de rangs à attribuer : on propose un repêchage
      // des dernières écartées, de quoi revenir à un podium complet.
      const manquantes = ranks + 1 - finalKept.length;
      setRoundEnd({ type: 'rescue', kept: finalKept, rescuable: finalRejected.slice(-manquantes) });
      return;
    }
    if (finalKept.length <= ranks + 1) { goToFinal(finalKept); return; }
    setRoundEnd({ type: 'next', kept: finalKept });
  }

  function nextRound(nextPool: string[]) {
    setPool(nextPool);
    setIndex(0);
    setKept([]);
    setRejected([]);
    setRound((r) => r + 1);
    setRoundEnd(null);
    setDx(0);
  }

  function replayRound() {
    setIndex(0);
    setKept([]);
    setRejected([]);
    setRoundEnd(null);
    setDx(0);
  }

  function goToFinal(ids: string[]) {
    stopAudio();
    setFinalPool(ids);
    setRoundEnd(null);
    setSlots((prev) => prev.map((x) => (x && ids.includes(x) ? x : null)));
    setMode('final');
  }

  function backToGrid() {
    stopAudio();
    setRoundEnd(null);
    setMode('grid');
  }

  /* ── Envoi ── */

  /** Le pseudo et le mail sont demandés d’abord, puis le vote repart tout seul. */
  function submit() {
    if (slots.filter(Boolean).length !== ranks || sending) return;
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
        stopAudio();
        onVoted(podium);
      } else {
        setError(data.error ?? 'Le vote n’a pas pu être enregistré.');
        setConfirming(false);
      }
    } catch {
      setError('Connexion impossible. Réessaie dans un instant.');
      setConfirming(false);
    } finally {
      setSending(false);
    }
  }

  const filled = slots.filter(Boolean).length;
  const ready = filled === ranks;
  const visible = mode === 'final' && finalPool ? openings.filter((o) => finalPool.includes(o.id)) : openings;

  /* ── Écran de swipe ── */
  if (mode === 'swipe') {
    const current = byId(pool[index]);
    const tilt = Math.max(-1, Math.min(1, dx / 160));

    if (roundEnd) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 px-6 text-center" style={{ background: 'var(--bg)' }}>
          {roundEnd.type === 'blocked' && (
            <>
              <p className="font-black text-xl" style={{ color: 'var(--sepia)' }}>Tu as tout gardé</p>
              <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>Écarte-en au moins une pour avancer.</p>
              <button onClick={replayRound} className="btn-neon px-6 py-3 rounded text-sm">Refaire ce tour</button>
            </>
          )}
          {roundEnd.type === 'empty' && (
            <>
              <p className="font-black text-xl" style={{ color: 'var(--sepia)' }}>Tu n’en as gardé aucune</p>
              <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>On refait le tour, ou tu classes à la main ?</p>
              <div className="flex gap-3">
                <button onClick={replayRound} className="btn-neon px-5 py-3 rounded text-sm">Refaire</button>
                <button onClick={backToGrid} className="btn-neon px-5 py-3 rounded text-sm">Classer à la main</button>
              </div>
            </>
          )}
          {roundEnd.type === 'rescue' && (
            <>
              <p className="font-black text-xl" style={{ color: 'var(--sepia)' }}>
                Il ne t’en reste que {roundEnd.kept.length}
              </p>
              <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>
                Veux-tu repêcher les dernières écartées ?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => goToFinal([...roundEnd.kept, ...roundEnd.rescuable])}
                  className="btn-neon px-5 py-3 rounded text-sm"
                >
                  Repêcher
                </button>
                <button onClick={backToGrid} className="btn-neon px-5 py-3 rounded text-sm">
                  Classer à la main
                </button>
              </div>
            </>
          )}
          {roundEnd.type === 'next' && (
            <>
              <p className="font-black text-xl" style={{ color: 'var(--sepia)' }}>Encore un effort !</p>
              <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>
                Il en reste {roundEnd.kept.length}. On refait un tour sur celles-ci.
              </p>
              <button onClick={() => nextRound(roundEnd.kept)} className="btn-neon px-6 py-3 rounded text-sm">
                Tour {round + 1}
              </button>
            </>
          )}
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'var(--bg)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={backToGrid} className="text-xs" style={{ color: 'var(--sepia-dim)' }}>← Classer à la main</button>
          <span className="text-xs font-black tracking-widest" style={{ color: 'var(--neon)' }}>
            TOUR {round} · {index + 1}/{pool.length}
          </span>
          <button onClick={undo} disabled={index === 0} className="text-xs flex items-center gap-1" style={{ color: index === 0 ? 'var(--border)' : 'var(--sepia-dim)' }}>
            <Undo2 size={12} /> Annuler
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          {current && (
            <div
              className="relative w-full max-w-xs rounded-xl overflow-hidden"
              style={{
                touchAction: 'none',
                transform: `translateX(${dx}px) rotate(${tilt * 8}deg)`,
                transition: dx === 0 ? 'transform 0.25s ease' : 'none',
                border: `2px solid ${dx > 40 ? '#3ddc84' : dx < -40 ? '#ff5555' : 'var(--border)'}`,
                boxShadow: dx > 40 ? '0 0 30px rgba(61,220,132,0.35)' : dx < -40 ? '0 0 30px rgba(255,85,85,0.35)' : 'none',
              }}
              onTouchStart={(e) => { swipeStart.current = e.touches[0].clientX; }}
              onTouchMove={(e) => { if (swipeStart.current !== null) setDx(e.touches[0].clientX - swipeStart.current); }}
              onTouchEnd={() => {
                const threshold = window.innerWidth * SWIPE_RATIO;
                if (dx > threshold) decide(true);
                else if (dx < -threshold) decide(false);
                else setDx(0);
                swipeStart.current = null;
              }}
            >
              <div className="relative aspect-[3/4]">
                <Image src={current.image} alt={current.animeName} fill sizes="80vw" className="object-cover" priority />
              </div>
              <div className="p-3 text-center" style={{ background: 'var(--bg2)' }}>
                <p className="font-black text-sm" style={{ color: 'var(--sepia)' }}>{current.animeName}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--neon)' }}>{current.openingTitle}</p>
                <button
                  onClick={() => (playingId === current.id ? stopAudio() : playAudio(current))}
                  className="btn-neon text-xs px-4 py-2 rounded mt-2 inline-flex items-center gap-1"
                >
                  {playingId === current.id ? <Square size={11} /> : <Play size={11} />}
                  {playingId === current.id ? 'Stop' : 'Écouter'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-8 pb-10 pt-4">
          <button
            onClick={() => decide(false)}
            className="rounded-full flex items-center justify-center"
            style={{ width: '4rem', height: '4rem', border: '2px solid #ff5555', color: '#ff5555', fontSize: '1.5rem' }}
            aria-label="Écarter"
          >
            ✕
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-full flex items-center justify-center"
            style={{ width: '4rem', height: '4rem', border: '2px solid #3ddc84', color: '#3ddc84', fontSize: '1.5rem' }}
            aria-label="Garder"
          >
            ✓
          </button>
        </div>
      </div>
    );
  }

  /* ── Grille et écran final ── */
  return (
    <>
      {gate}
      {mode === 'final' && (
        <div className="retro-card rounded-lg p-4 mb-4 text-center">
          <p className="font-black text-sm" style={{ color: 'var(--sepia)' }}>Plus que {visible.length} !</p>
          <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)' }}>
            Appuie longuement sur une cover pour lui donner son rang.
          </p>
        </div>
      )}

      {mode === 'grid' && showHint && (
        <div className="retro-card rounded-lg p-4 mb-4 flex items-start gap-3">
          <span style={{ fontSize: '1.4rem' }}>👆</span>
          <div className="flex-1">
            <p className="text-xs font-black" style={{ color: 'var(--sepia)' }}>Appui long pour classer</p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
              Un tap écoute l’extrait. Reste appuyé sur une cover pour choisir son rang, ou utilise les cases du bas.
            </p>
          </div>
          <button onClick={dismissHint} className="p-1" style={{ color: 'var(--sepia-dim)' }} aria-label="Compris"><X size={14} /></button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pb-56" onClick={() => selected && deselect()}>
        {visible.map((op) => {
          const rank = slots.indexOf(op.id);
          const isPicked = rank >= 0;
          const isSelected = selected === op.id;
          return (
            <div
              key={op.id}
              className="retro-card rounded-lg overflow-hidden flex flex-col relative select-none"
              style={{
                borderColor: isSelected ? 'var(--neon)' : isPicked ? 'var(--neon)' : undefined,
                boxShadow: isSelected ? '0 0 0 2px var(--neon), 0 0 22px rgba(0,255,204,0.3)' : undefined,
                opacity: selected && !isSelected ? 0.55 : 1,
                transition: 'opacity .2s, box-shadow .2s',
              }}
              onTouchStart={(e) => onCardTouchStart(op, e)}
              onTouchMove={onCardTouchMove}
              onTouchEnd={(e) => { e.stopPropagation(); onCardTouchEnd(op); }}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="relative aspect-[3/4]">
                <Image src={op.image} alt={op.animeName} fill sizes="50vw" className="object-cover" />
                {isPicked && (
                  <div className="absolute top-1.5 left-1.5 px-2 py-1 rounded text-xs font-black" style={{ background: 'var(--neon)', color: 'var(--bg)' }}>
                    {MEDALS[rank]} {PODIUM_POINTS[rank]} pts
                  </div>
                )}
                {playingId === op.id && (
                  <div className="absolute top-1.5 right-1.5 flex items-end gap-0.5" style={{ height: '16px' }}>
                    {[0,1,2,3].map((i) => (<div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.15}s` }} />))}
                  </div>
                )}
                <button
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => { e.stopPropagation(); if (playingId === op.id) stopAudio(); else playAudio(op); }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-1.5 right-1.5 rounded-full flex items-center justify-center"
                  style={{ width: '2.1rem', height: '2.1rem', background: 'rgba(13,10,6,0.85)', border: '1px solid var(--neon)', color: 'var(--neon)' }}
                  aria-label={playingId === op.id ? 'Arrêter' : 'Écouter'}
                >
                  {playingId === op.id ? <Square size={12} /> : <Play size={12} />}
                </button>
              </div>
              <div className="p-2">
                <p className="font-black text-xs leading-tight" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--neon)' }}>
                  <Music size={9} className="inline mr-1" />{op.openingTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulle de rang, sous le doigt */}
      {bubble && (
        <div
          className="fixed z-50 flex gap-2 px-2 py-2 rounded-xl"
          style={{
            left: Math.min(Math.max(bubble.x - 90, 8), (typeof window !== 'undefined' ? window.innerWidth : 360) - 188),
            top: Math.max(bubble.y - 90, 8),
            background: 'rgba(13,10,6,0.97)',
            border: '1px solid var(--neon)',
            boxShadow: '0 0 24px rgba(0,255,204,0.3)',
          }}
        >
          {Array.from({ length: ranks }, (_, i) => {
            const taken = slots[i];
            return (
              <button
                key={i}
                onClick={() => assignRank(bubble.id, i)}
                className="rounded-lg px-3 py-2 text-center"
                style={{
                  border: `1px solid ${taken ? 'var(--border)' : 'var(--neon)'}`,
                  background: taken ? 'transparent' : 'rgba(0,255,204,0.12)',
                  minWidth: '3.2rem',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{MEDALS[i]}</span>
                <span className="block text-xs" style={{ color: taken ? 'var(--sepia-dim)' : 'var(--neon)' }}>
                  {taken ? 'échanger' : `${PODIUM_POINTS[i]} pts`}
                </span>
              </button>
            );
          })}
          {slots.includes(bubble.id) && (
            <button onClick={() => removeFromPodium(bubble.id)} className="rounded-lg px-3 py-2 text-xs" style={{ border: '1px solid var(--border)', color: 'var(--sepia-dim)' }}>
              Retirer
            </button>
          )}
        </div>
      )}

      {/* Cases de rang, zone du pouce */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-3 pt-3 pb-4"
        style={{ background: 'rgba(13,10,6,0.97)', borderTop: '1px solid var(--border)', backdropFilter: 'blur(8px)' }}
      >
        {selected && (
          <p className="text-center text-xs font-black mb-2" style={{ color: 'var(--neon)' }}>
            Quel rang pour cette cover ?
          </p>
        )}
        <div className="flex items-stretch gap-2 mb-3">
          {Array.from({ length: ranks }, (_, i) => {
            const op = byId(slots[i]);
            return (
              <button
                key={i}
                onClick={() => (selected ? assignRank(selected, i) : op ? clearSlot(i) : undefined)}
                className="flex-1 rounded-lg p-2 flex flex-col items-center gap-1 transition-all"
                style={{
                  border: `1px ${selected ? 'solid' : 'dashed'} ${selected ? 'var(--neon)' : op ? 'var(--neon)' : 'var(--border)'}`,
                  background: selected ? 'rgba(0,255,204,0.12)' : 'transparent',
                  opacity: selected || op ? 1 : 0.6,
                  minHeight: '4.2rem',
                }}
              >
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{MEDALS[i]}</span>
                {op ? (
                  <div className="relative rounded overflow-hidden" style={{ width: '1.9rem', height: '2.5rem' }}>
                    <Image src={op.image} alt={op.animeName} fill sizes="30px" className="object-cover" />
                  </div>
                ) : (
                  <span className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{PODIUM_POINTS[i]} pts</span>
                )}
              </button>
            );
          })}
        </div>

        {error && <p className="text-xs mb-2 text-center" style={{ color: '#ff5555' }}>{error}</p>}

        <div className="flex gap-2">
          {mode === 'grid' && (
            <button onClick={startSwipe} className="btn-neon text-xs py-3 px-4 rounded flex-1">
              Tu hésites ?
            </button>
          )}
          <button
            onClick={() => setConfirming(true)}
            disabled={!ready}
            className="btn-neon text-xs py-3 px-4 rounded flex-1"
            style={ready ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
          >
            Valider mon vote ({filled}/{ranks})
          </button>
        </div>
      </div>

      {/* Confirmation avant envoi définitif */}
      {confirming && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="retro-card rounded-xl p-5 w-full max-w-sm">
            <p className="font-black text-base mb-1" style={{ color: 'var(--sepia)' }}>Confirmer ton podium {year}</p>
            <p className="text-xs mb-4" style={{ color: 'var(--sepia-dim)' }}>Le vote est définitif, tu ne pourras plus le modifier.</p>
            <div className="flex flex-col gap-2 mb-5">
              {slots.map((id, i) => {
                const op = byId(id);
                if (!op) return null;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span style={{ fontSize: '1.1rem' }}>{MEDALS[i]}</span>
                    <div className="relative rounded overflow-hidden shrink-0" style={{ width: '1.9rem', height: '2.5rem' }}>
                      <Image src={op.image} alt={op.animeName} fill sizes="30px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black truncate" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--neon)' }}>{op.openingTitle}</p>
                    </div>
                    <span className="text-xs font-black shrink-0" style={{ color: 'var(--sepia-dim)' }}>{PODIUM_POINTS[i]} pts</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setConfirming(false)} className="btn-neon text-xs py-3 px-4 rounded flex-1">
                Modifier
              </button>
              <button
                onClick={submit}
                disabled={sending}
                className="btn-neon text-xs py-3 px-4 rounded flex-1"
                style={{ background: 'var(--neon)', color: 'var(--bg)' }}
              >
                {sending ? '...' : <><Check size={12} className="inline mr-1" />Envoyer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
