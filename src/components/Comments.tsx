'use client';

import { useCallback, useEffect, useState } from 'react';
import { MessageCircle, Reply, Send, Trash2 } from 'lucide-react';
import { useVoterGate } from '@/components/VoterGate';
import ZenkaiSpinner from '@/components/ZenkaiSpinner';

type Comment = {
  id: string;
  author: string;
  text: string;
  parentId: string | null;
  createdAt: string | null;
  mine: boolean;
};

type Props = {
  /** 'accueil', ou une année : c'est la page à laquelle la discussion appartient. */
  scope: string;
  title?: string;
};

const MAX = 1000;

/** « à l'instant », « il y a 5 min », « il y a 3 j », puis la date. */
function quand(iso: string | null): string {
  if (!iso) return '';
  const secondes = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (secondes < 60) return 'à l’instant';
  if (secondes < 3600) return `il y a ${Math.floor(secondes / 60)} min`;
  if (secondes < 86400) return `il y a ${Math.floor(secondes / 3600)} h`;
  if (secondes < 7 * 86400) return `il y a ${Math.floor(secondes / 86400)} j`;
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

/**
 * Fil de discussion d'une page : commentaires et réponses, une seule
 * profondeur. On commente sous le même pseudo qu'on vote — la fenêtre
 * d'inscription s'ouvre au premier message, puis l'envoi repart tout seul.
 */
export default function Comments({ scope, title = 'Commentaires' }: Props) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { voter, guard, gate, ask } = useVoterGate();

  const charger = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?scope=${encodeURIComponent(scope)}`);
      const data = await res.json().catch(() => ({ comments: [] }));
      setComments((data.comments ?? []) as Comment[]);
    } catch {
      setComments([]);
    }
  }, [scope]);

  /* Le chargement passe par une promesse : l'état n'est posé qu'à la réponse. */
  useEffect(() => {
    let vivant = true;
    fetch(`/api/comments?scope=${encodeURIComponent(scope)}`)
      .then((r) => (r.ok ? r.json() : { comments: [] }))
      .then((data) => { if (vivant) setComments((data.comments ?? []) as Comment[]); })
      .catch(() => { if (vivant) setComments([]); });
    return () => { vivant = false; };
  }, [scope]);

  async function envoyer() {
    const message = text.trim();
    if (!message || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope, text: message, parentId: replyTo?.id ?? null }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setComments((prev) => [...(prev ?? []), data.comment as Comment]);
        setText('');
        setReplyTo(null);
      } else if (res.status === 401 && data.needIdentity) {
        // Le serveur ne nous reconnaît pas : on s'inscrit, puis le message part.
        ask(() => { void envoyer(); });
      } else {
        setError(data.error ?? 'Ton message n’a pas pu être publié.');
      }
    } catch {
      setError('Connexion impossible.');
    } finally {
      setSending(false);
    }
  }

  async function supprimer(id: string) {
    setComments((prev) => (prev ?? []).filter((c) => c.id !== id && c.parentId !== id));
    try {
      await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch {
      void charger();
    }
  }

  const racines = (comments ?? []).filter((c) => !c.parentId);
  const reponses = (parentId: string) => (comments ?? []).filter((c) => c.parentId === parentId);

  return (
    <section className="max-w-2xl mx-auto w-full">
      {gate}

      <div className="flex items-center gap-2 mb-5">
        <MessageCircle size={18} style={{ color: 'var(--neon)' }} />
        <h2 className="font-black text-lg" style={{ color: 'var(--sepia)' }}>{title}</h2>
        {comments && comments.length > 0 && (
          <span className="text-xs" style={{ color: 'var(--sepia-dim)' }}>({comments.length})</span>
        )}
      </div>

      {/* Composer */}
      <div className="retro-card rounded-lg p-3 mb-6">
        {replyTo && (
          <div className="flex items-center justify-between mb-2 text-xs" style={{ color: 'var(--sepia-dim)' }}>
            <span>En réponse à <strong style={{ color: 'var(--neon)' }}>{replyTo.author}</strong></span>
            <button onClick={() => setReplyTo(null)} style={{ color: 'var(--sepia-dim)' }}>Annuler</button>
          </div>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX))}
          placeholder={voter ? `Laisse un commentaire, ${voter.pseudo}…` : 'Laisse un commentaire…'}
          rows={3}
          className="w-full text-sm"
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            color: 'var(--sepia)',
            borderRadius: '0.375rem',
            padding: '0.7rem 0.8rem',
            resize: 'vertical',
          }}
        />
        {error && <p className="text-xs mt-2" style={{ color: '#ff5555' }}>{error}</p>}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>
            {text.length}/{MAX}
          </span>
          <button
            onClick={() => guard(() => { void envoyer(); })}
            disabled={!text.trim() || sending}
            className="btn-neon text-xs px-4 py-2 rounded inline-flex items-center gap-2"
            style={text.trim() ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
          >
            <Send size={12} /> {sending ? '...' : 'Publier'}
          </button>
        </div>
      </div>

      {/* Fil */}
      {comments === null && (
        <ZenkaiSpinner label="Chargement des messages" size={26} />
      )}

      {comments !== null && racines.length === 0 && (
        <p className="text-xs text-center py-6" style={{ color: 'var(--sepia-dim)' }}>
          Personne n’a encore rien dit. À toi de lancer la discussion.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {racines.map((c) => (
          <div key={c.id} className="retro-card rounded-lg p-3">
            <Ligne comment={c} onReply={() => setReplyTo(c)} onDelete={() => supprimer(c.id)} />

            {reponses(c.id).length > 0 && (
              <div className="mt-3 pl-3 flex flex-col gap-3" style={{ borderLeft: '1px solid var(--border)' }}>
                {reponses(c.id).map((r) => (
                  <Ligne key={r.id} comment={r} onReply={() => setReplyTo(c)} onDelete={() => supprimer(r.id)} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Ligne({
  comment,
  onReply,
  onDelete,
}: {
  comment: Comment;
  onReply: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-3">
      <div
        className="shrink-0 rounded-full flex items-center justify-center font-black"
        style={{
          width: '2rem',
          height: '2rem',
          background: 'rgba(0,255,204,0.1)',
          border: '1px solid var(--border)',
          color: 'var(--neon)',
          fontSize: '0.8rem',
        }}
      >
        {comment.author.slice(0, 1).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-black text-sm" style={{ color: 'var(--sepia)' }}>{comment.author}</span>
          <span className="text-xs" style={{ color: 'var(--sepia-dim)', opacity: 0.8 }}>{quand(comment.createdAt)}</span>
        </div>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--sepia)', opacity: 0.92, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
        >
          {comment.text}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <button onClick={onReply} className="text-xs inline-flex items-center gap-1" style={{ color: 'var(--sepia-dim)' }}>
            <Reply size={11} /> Répondre
          </button>
          {comment.mine && (
            <button onClick={onDelete} className="text-xs inline-flex items-center gap-1" style={{ color: 'var(--sepia-dim)' }}>
              <Trash2 size={11} /> Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
