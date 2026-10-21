'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { VoterIdentity } from '@/lib/voters';
import { readEntry } from '@/components/EntryTracker';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';

/**
 * Pseudo et adresse mail, demandés une seule fois, juste avant le premier vote.
 *
 * `guard` enveloppe l’action de vote : si la personne s’est déjà présentée,
 * elle part directement ; sinon la fenêtre s’ouvre, et l’action reprend d’elle
 * même une fois l’inscription faite.
 */
export function useVoterGate() {
  const [voter, setVoter] = useState<VoterIdentity | null>(null);
  const [asking, setAsking] = useState(false);
  const pending = useRef<(() => void) | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/voter')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive && data?.voter) setVoter(data.voter as VoterIdentity); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const guard = useCallback((action: () => void) => {
    if (voter) { action(); return; }
    pending.current = action;
    setAsking(true);
  }, [voter]);

  const close = useCallback(() => {
    pending.current = null;
    setAsking(false);
  }, []);

  const done = useCallback((identity: VoterIdentity) => {
    setVoter(identity);
    setAsking(false);
    const action = pending.current;
    pending.current = null;
    action?.();
  }, []);

  /**
   * Ouvre la fenêtre sans condition, et reprend l’action ensuite.
   *
   * Sert quand le serveur répond « je ne te connais pas » alors que le
   * navigateur se croyait identifié : sans ça, la personne resterait bloquée
   * devant un message d’erreur, son vote perdu.
   */
  const ask = useCallback((action?: () => void) => {
    pending.current = action ?? null;
    setAsking(true);
  }, []);

  const gate = asking ? <VoterModal onDone={done} onClose={close} /> : null;
  return { voter, guard, gate, ask };
}

function VoterModal({
  onDone,
  onClose,
}: {
  onDone: (identity: VoterIdentity) => void;
  onClose: () => void;
}) {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/voter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, email, ...readEntry() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) onDone(data.voter as VoterIdentity);
      else setError(data.error ?? 'Inscription impossible.');
    } catch {
      setError('Connexion impossible. Réessaie dans un instant.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={t.overlay} onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className={t.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="voter-gate-title"
      >
        <div>
          <p className={`${s.osd} ${s.kicker}`} style={{ marginBottom: 10 }}>
            <span className={s.recDot} />Avant le premier vote
          </p>
          <h2 id="voter-gate-title" className={`${s.display} ${t.sheetTitle}`}>Qui vote ?</h2>
          <p className={t.sheetText} style={{ marginTop: 10 }}>
            Un pseudo et une adresse mail, comme à l’édition précédente. Tu recevras un mail de
            confirmation, puis le récap de tes votes.
          </p>
        </div>

        <label className={`${s.osd} ${t.label}`}>
          Pseudo
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
            maxLength={30}
            autoComplete="nickname"
            placeholder="Ton pseudo"
            className={t.field}
          />
        </label>

        <label className={`${s.osd} ${t.label}`}>
          Adresse mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={120}
            autoComplete="email"
            inputMode="email"
            placeholder="toi@exemple.com"
            className={t.field}
          />
        </label>

        {error && <p className={`${s.osd} ${t.error}`} style={{ marginTop: 0 }}>{error}</p>}

        <button type="submit" disabled={sending} className={t.key} data-on="1">
          {sending ? 'Envoi…' : 'C’est parti ▶'}
        </button>
        <button type="button" onClick={onClose} className={`${s.osd} ${t.linkBtn}`}>
          Plus tard
        </button>
        <p className={t.sheetSmall}>
          Ton adresse sert uniquement aux Retro Awards. Elle n’apparaît nulle part sur le site.
          On note aussi le pays et l’appareil, pour les statistiques de participation.
        </p>
      </form>
    </div>
  );
}
