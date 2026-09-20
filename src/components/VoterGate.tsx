'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import type { VoterIdentity } from '@/lib/voters';
import { readEntry } from '@/components/EntryTracker';

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

const FIELD: React.CSSProperties = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  color: 'var(--sepia)',
  borderRadius: '0.375rem',
  padding: '0.7rem 0.8rem',
  width: '100%',
  fontSize: '0.875rem',
};

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
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="retro-card rounded-xl p-5 w-full max-w-sm flex flex-col gap-3"
      >
        <div className="text-center">
          <Mail size={22} className="mx-auto mb-2" style={{ color: 'var(--neon)' }} />
          <h2 className="font-black text-lg" style={{ color: 'var(--sepia)' }}>Avant de voter</h2>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
            Un pseudo et une adresse mail, comme à l’édition précédente. Tu recevras un mail de
            confirmation, puis le récap de tes votes.
          </p>
        </div>

        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'var(--neon)' }}>
          Pseudo
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
            maxLength={30}
            autoComplete="nickname"
            placeholder="Ton pseudo"
            style={{ ...FIELD, marginTop: '0.35rem' }}
          />
        </label>

        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'var(--neon)' }}>
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
            style={{ ...FIELD, marginTop: '0.35rem' }}
          />
        </label>

        {error && <p className="text-xs" style={{ color: '#ff5555' }}>{error}</p>}

        <button
          type="submit"
          disabled={sending}
          className="btn-neon text-sm py-3 px-4 rounded"
          style={{ background: 'var(--neon)', color: 'var(--bg)' }}
        >
          {sending ? '...' : 'C’est parti'}
        </button>
        <button type="button" onClick={onClose} className="text-xs" style={{ color: 'var(--sepia-dim)' }}>
          Plus tard
        </button>
        <p className="text-xs text-center" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>
          Ton adresse sert uniquement aux Retro Awards. Elle n’apparaît nulle part sur le site.
          On note aussi le pays et l’appareil, pour les statistiques de participation.
        </p>
      </form>
    </div>
  );
}
