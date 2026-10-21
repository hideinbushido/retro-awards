'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, Play, Square, Undo2, X } from 'lucide-react';
import { Opening } from '@/data/nominees';
import { PODIUM_POINTS, PODIUM_SIZE } from '@/lib/votes';
import { useMusicContext } from '@/contexts/MusicContext';
import { useVoterGate } from '@/components/VoterGate';
import { clearDraft, loadDraft, saveDraft } from '@/components/OpeningNominees';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';

type Props = {
  year: number;
  openings: Opening[];
  onVoted: (podium: string[]) => void;
};

const RANG = ['1er', '2e', '3e'];
const HINT_KEY = 'retro_hint_toucher';
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
  const [slots, setSlots] = useState<(string | null)[]>(
    () => loadDraft(year, openings) ?? [null, null, null],
  );
  const [selected, setSelected] = useState<string | null>(null);
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
  const swipeStart = useRef<number | null>(null);
  const { pauseForOpening, resumeFromOpening } = useMusicContext();
  const { guard, gate, ask } = useVoterGate();

  /* Le podium en cours survit à un rechargement, tant qu’il n’est pas envoyé. */
  useEffect(() => { saveDraft(year, slots); }, [slots, year]);

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

  function select(id: string) {
    setError(null);
    setSelected(id);
    buzz();
  }

  function deselect() {
    setSelected(null);
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

  /* ── Toucher une cover ── */

  /**
   * Un simple toucher choisit la cover, un deuxième l’abandonne.
   *
   * L’appui long a été retiré : il déclenchait la loupe et le menu du
   * téléphone, et il fallait revenir en arrière à chaque fois. L’extrait reste
   * accessible par le bouton d’écoute posé sur chaque cover.
   */
  function toggleSelect(op: Opening) {
    dismissHint();
    if (selected === op.id) deselect();
    else select(op.id);
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
        clearDraft(year);
        stopAudio();
        onVoted(podium);
      } else if (res.status === 401 && data.needIdentity) {
        // Le serveur ne nous reconnaît plus : on redemande, puis on renvoie le vote.
        setConfirming(false);
        ask(() => { void sendPodium(); });
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
        <div className={`${t.overlay} ${t.swipeScreen}`} style={{ background: 'var(--bg)' }}>
          <div className={t.swipeEnd}>
            {roundEnd.type === 'blocked' && (
              <>
                <p className={`${s.display} ${t.sheetTitle}`}>Tu as tout gardé</p>
                <p className={t.sheetText}>Écarte-en au moins une pour avancer.</p>
                <button onClick={replayRound} className={t.key} data-on="1">Refaire ce tour</button>
              </>
            )}
            {roundEnd.type === 'empty' && (
              <>
                <p className={`${s.display} ${t.sheetTitle}`}>Tu n’en as gardé aucune</p>
                <p className={t.sheetText}>On refait le tour, ou tu classes à la main ?</p>
                <div className={t.keys}>
                  <button onClick={replayRound} className={t.key} data-on="1">Refaire</button>
                  <button onClick={backToGrid} className={t.key}>Classer à la main</button>
                </div>
              </>
            )}
            {roundEnd.type === 'rescue' && (
              <>
                <p className={`${s.display} ${t.sheetTitle}`}>Il ne t’en reste que {roundEnd.kept.length}</p>
                <p className={t.sheetText}>Veux-tu repêcher les dernières écartées ?</p>
                <div className={t.keys}>
                  <button onClick={() => goToFinal([...roundEnd.kept, ...roundEnd.rescuable])} className={t.key} data-on="1">
                    Repêcher
                  </button>
                  <button onClick={backToGrid} className={t.key}>Classer à la main</button>
                </div>
              </>
            )}
            {roundEnd.type === 'next' && (
              <>
                <p className={`${s.display} ${t.sheetTitle}`}>Encore un effort</p>
                <p className={t.sheetText}>Il en reste {roundEnd.kept.length}. On refait un tour sur celles-ci.</p>
                <button onClick={() => nextRound(roundEnd.kept)} className={t.key} data-on="1">
                  Tour {round + 1} ▶
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`${t.overlay} ${t.swipeScreen}`} style={{ background: 'var(--bg)' }}>
        <div className={`${s.osd} ${t.swipeTop}`}>
          <button onClick={backToGrid} className={t.linkBtn}>◀ Grille</button>
          <span style={{ color: 'var(--neon)' }}>
            Tour {round} · {index + 1}/{pool.length}
          </span>
          <button onClick={undo} disabled={index === 0} className={t.linkBtn} style={{ opacity: index === 0 ? 0.35 : 1 }}>
            <Undo2 size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Annuler
          </button>
        </div>

        <div className={t.swipeStage}>
          {current && (
            <div
              className={t.swipeCard}
              style={{
                touchAction: 'none',
                transform: `translateX(${dx}px) rotate(${tilt * 8}deg)`,
                transition: dx === 0 ? 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
                borderColor: dx > 40 ? 'var(--neon)' : dx < -40 ? 'var(--rec)' : undefined,
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
              <div className={t.coverOpening} style={{ position: 'relative' }}>
                <Image src={current.image} alt="" fill sizes="80vw" style={{ objectFit: 'cover' }} priority />
                {dx > 40 && <span className={`${s.osd} ${t.swipeStamp}`} data-keep="1">Garder</span>}
                {dx < -40 && <span className={`${s.osd} ${t.swipeStamp}`}>Écarter</span>}
              </div>
              <div className={t.swipeInfo}>
                <p className={`${s.display} ${s.tapeName}`}>{current.animeName}</p>
                <p className={`${s.osd} ${s.tapeTitle}`}>♪ {current.openingTitle}</p>
                <button
                  onClick={() => (playingId === current.id ? stopAudio() : playAudio(current))}
                  className={t.key}
                  data-on={playingId === current.id ? '1' : undefined}
                >
                  {playingId === current.id ? <Square size={12} /> : <Play size={12} />}
                  {playingId === current.id ? 'Stop' : 'Écouter'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={t.swipeKeys}>
          <button onClick={() => decide(false)} className={t.swipeBtn} aria-label="Écarter">
            <X size={26} />
          </button>
          <button onClick={() => decide(true)} className={t.swipeBtn} data-keep="1" aria-label="Garder">
            <Check size={26} />
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
        <div className={t.notice}>
          <p className={`${s.display} ${t.noticeTitle}`}>Plus que {visible.length}</p>
          <p className={t.noticeText}>Touche une jaquette, puis sa place en bas.</p>
        </div>
      )}

      {mode === 'grid' && showHint && (
        <div className={t.notice} style={{ position: 'relative', paddingRight: 56 }}>
          <p className={`${s.display} ${t.noticeTitle}`}>Touche, puis choisis sa place</p>
          <p className={t.noticeText}>
            Touche la jaquette que tu veux, puis <b>1er</b>, <b>2e</b> ou <b>3e</b> en bas. Le bouton ▶ sur la jaquette écoute l’extrait.
          </p>
          <button onClick={dismissHint} className={t.close} aria-label="Compris"><X size={16} /></button>
        </div>
      )}

      <div className={s.tapes} style={{ marginTop: 0, paddingBottom: 230 }} onClick={() => selected && deselect()}>
        {visible.map((op) => {
          const rank = slots.indexOf(op.id);
          const isPicked = rank >= 0;
          const isSelected = selected === op.id;
          return (
            <div
              key={op.id}
              className={t.pick}
              data-on={isSelected || isPicked ? '1' : undefined}
              data-dim={selected && !isSelected ? '1' : undefined}
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
              onClick={(e) => { e.stopPropagation(); toggleSelect(op); }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className={`${t.thumb} ${t.coverBox} ${t.coverOpening}`}>
                <Image src={op.image} alt="" fill sizes="46vw" />
                {isPicked && <span className={t.badge}>{RANG[rank]} · {PODIUM_POINTS[rank]} pts</span>}
                {playingId === op.id && (
                  <span className={`${s.eq} ${t.eqCorner}`} aria-hidden="true"><i /><i /><i /><i /></span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playingId === op.id) stopAudio();
                    else playAudio(op);
                  }}
                  className={t.listen}
                  aria-label={playingId === op.id ? 'Arrêter' : 'Écouter'}
                >
                  {playingId === op.id ? <Square size={14} /> : <Play size={14} />}
                </button>
              </div>
              <p className={`${s.display} ${s.tapeName}`}>{op.animeName}</p>
              <p className={`${s.osd} ${s.tapeTitle}`}>♪ {op.openingTitle}</p>
            </div>
          );
        })}
      </div>

      {/* Les places, dans la zone du pouce */}
      <div className={t.rack}>
        {selected && (
          <div className={`${s.osd} ${t.rackAsk}`}>
            Quelle place pour cette jaquette ?
            {slots.includes(selected) && (
              <button onClick={() => removeFromPodium(selected)} className={t.linkBtn}>✕ Retirer</button>
            )}
          </div>
        )}
        <div className={t.rackInner}>
          {Array.from({ length: ranks }, (_, i) => {
            const op = byId(slots[i]);
            return (
              <button
                key={i}
                onClick={() => (selected ? assignRank(selected, i) : op ? clearSlot(i) : undefined)}
                className={t.slot}
                data-full={op ? '1' : undefined}
                data-target={selected ? '1' : undefined}
                aria-label={op ? `${RANG[i]} : ${op.animeName}` : `${RANG[i]}, vide`}
              >
                <span className={t.slotRank}>
                  <span className={`${s.display} ${t.slotRankNum}`}>{RANG[i]}</span>
                  {!op && <span className={`${s.osd} ${t.slotPts}`}>{PODIUM_POINTS[i]} pts</span>}
                </span>
                {op && (
                  <span className={t.slotThumb}>
                    <Image src={op.image} alt="" fill sizes="42px" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {error && <p className={`${s.osd} ${t.error}`} style={{ textAlign: 'center' }}>{error}</p>}

        <div className={t.rackRow}>
          {mode === 'grid' && (
            <button onClick={startSwipe} className={t.key}>
              Tu hésites ?
            </button>
          )}
          <button onClick={() => setConfirming(true)} disabled={!ready} className={t.key} data-on={ready ? '1' : undefined}>
            Valider {filled}/{ranks}
          </button>
        </div>
      </div>

      {/* Confirmation avant envoi définitif */}
      {confirming && (
        <div className={t.overlay}>
          <div className={t.sheet} role="dialog" aria-modal="true" aria-labelledby="confirm-podium-title">
            <h2 id="confirm-podium-title" className={`${s.display} ${t.sheetTitle}`}>Ton podium {year}</h2>
            <p className={t.sheetText}>Le vote est définitif, tu ne pourras plus le modifier.</p>
            <div className={t.confirmList}>
              {slots.map((id, i) => {
                const op = byId(id);
                if (!op) return null;
                return (
                  <div key={i} className={t.confirmRow}>
                    <span className={`${s.display} ${t.slotRankNum}`}>{RANG[i]}</span>
                    <span className={t.slotThumb}>
                      <Image src={op.image} alt="" fill sizes="42px" />
                    </span>
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span className={`${s.display} ${t.slotName}`} style={{ display: 'block' }}>{op.animeName}</span>
                      <span className={`${s.osd} ${s.tapeTitle}`} style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {op.openingTitle}
                      </span>
                    </span>
                    <span className={`${s.osd} ${t.slotPts}`}>{PODIUM_POINTS[i]} pts</span>
                  </div>
                );
              })}
            </div>
            <div className={t.rackRow}>
              <button onClick={() => setConfirming(false)} className={t.key}>Modifier</button>
              <button onClick={submit} disabled={sending} className={t.key} data-on="1">
                {sending ? 'Envoi…' : '✓ Envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
