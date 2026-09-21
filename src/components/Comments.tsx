'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ImagePlus, MessageCircle, Reply, Send, Sticker, Trash2, X } from 'lucide-react';
import { useVoterGate } from '@/components/VoterGate';
import ZenkaiSpinner from '@/components/ZenkaiSpinner';
import type { CommentMedia } from '@/lib/media';

type Comment = {
  id: string;
  author: string;
  text: string;
  media: CommentMedia | null;
  parentId: string | null;
  createdAt: string | null;
  mine: boolean;
};

type Features = { gif: boolean; upload: boolean };

type Props = {
  /** 'accueil', ou une année : c'est la page à laquelle la discussion appartient. */
  scope: string;
  title?: string;
};

const MAX = 1000;
const MAX_IMAGE = 8 * 1024 * 1024;
const MAX_VIDEO = 25 * 1024 * 1024;
/** Plus grand côté d'une photo envoyée : largement assez pour un fil de discussion. */
const COTE_MAX = 1600;

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
 * Réduit une photo et la réencode en JPEG.
 *
 * Deux gains : une photo de téléphone passe de 4 Mo à quelques centaines de
 * Ko, et le réencodage efface les métadonnées — dont la position GPS que les
 * téléphones glissent dans chaque cliché.
 */
async function reduireImage(file: File): Promise<{ blob: Blob; width: number; height: number } | null> {
  try {
    const bitmap = await createImageBitmap(file);
    const echelle = Math.min(1, COTE_MAX / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * echelle);
    const height = Math.round(bitmap.height * echelle);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    // Les zones transparentes d'un PNG deviennent le fond du site, pas du noir
    ctx.fillStyle = '#120e08';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
    return blob ? { blob, width, height } : null;
  } catch {
    return null;
  }
}

/**
 * Fil de discussion d'une page : commentaires et réponses, une seule
 * profondeur, avec photo, vidéo, GIF ou sticker. On commente sous le même
 * pseudo qu'on vote — la fenêtre d'inscription s'ouvre au premier message,
 * puis l'envoi repart tout seul.
 */
export default function Comments({ scope, title = 'Commentaires' }: Props) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [features, setFeatures] = useState<Features>({ gif: false, upload: false });
  const [text, setText] = useState('');
  const [media, setMedia] = useState<CommentMedia | null>(null);
  const [picker, setPicker] = useState<'gifs' | 'stickers' | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
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
      .then((data) => {
        if (!vivant) return;
        setComments((data.comments ?? []) as Comment[]);
        if (data.features) setFeatures(data.features as Features);
      })
      .catch(() => { if (vivant) setComments([]); });
    return () => { vivant = false; };
  }, [scope]);

  async function envoyerFichier(file: File) {
    setError(null);
    const video = file.type.startsWith('video/');
    if (!video && !file.type.startsWith('image/')) {
      setError('Seules les photos et les vidéos sont acceptées.');
      return;
    }

    let corps: Blob = file;
    let type = file.type;
    let dimensions: { width?: number; height?: number } = {};
    // Les GIF gardent leur animation ; les JPEG sont toujours nettoyés de leur
    // position GPS ; les autres images ne sont réduites que si elles pèsent lourd.
    const aReduire = !video && file.type !== 'image/gif' && (file.type === 'image/jpeg' || file.size > 2 * 1024 * 1024);
    if (aReduire) {
      const reduite = await reduireImage(file);
      if (reduite) {
        corps = reduite.blob;
        type = 'image/jpeg';
        dimensions = { width: reduite.width, height: reduite.height };
      }
    }

    const limite = video ? MAX_VIDEO : MAX_IMAGE;
    if (corps.size > limite) {
      setError(video ? 'Vidéo trop lourde (25 Mo maximum, environ 15 secondes).' : 'Image trop lourde (8 Mo maximum).');
      return;
    }

    const extension = type.split('/')[1]?.replace('quicktime', 'mov').replace('jpeg', 'jpg') ?? 'bin';
    setProgress(0);
    try {
      // Chargée à la demande : inutile de l'embarquer pour qui ne fait que lire
      const { upload } = await import('@vercel/blob/client');
      const envoye = await upload(`commentaires/${video ? 'video' : 'photo'}.${extension}`, corps, {
        access: 'public',
        handleUploadUrl: '/api/comments/upload',
        clientPayload: video ? 'video' : 'image',
        contentType: type,
        multipart: video,
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      setMedia({ kind: video ? 'video' : 'image', url: envoye.url, ...dimensions });
      setPicker(null);
    } catch {
      setError('L’envoi a échoué. Vérifie ta connexion et réessaie.');
    } finally {
      setProgress(null);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  async function envoyer() {
    const message = text.trim();
    if ((!message && !media) || sending || progress !== null) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope, text: message, media, parentId: replyTo?.id ?? null }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setComments((prev) => [...(prev ?? []), data.comment as Comment]);
        setText('');
        setMedia(null);
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
  const pret = (text.trim() || media) && progress === null;

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

        {/* Média en attente d'envoi */}
        {media && (
          <div className="relative inline-block mt-2">
            <MediaView media={media} compact />
            <button
              onClick={() => setMedia(null)}
              className="absolute top-1 right-1 rounded-full flex items-center justify-center"
              style={{ width: '1.6rem', height: '1.6rem', background: 'rgba(13,10,6,0.85)', color: 'var(--sepia)' }}
              aria-label="Retirer le média"
            >
              <X size={13} />
            </button>
          </div>
        )}

        {progress !== null && (
          <div className="mt-2">
            <div className="h-1 rounded" style={{ background: 'var(--bg2)' }}>
              <div className="h-1 rounded transition-all" style={{ width: `${progress}%`, background: 'var(--neon)' }} />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)' }}>Envoi en cours… {progress} %</p>
          </div>
        )}

        {picker && (
          <GifPicker
            type={picker}
            onClose={() => setPicker(null)}
            onPick={(choix) => {
              setMedia(choix);
              setPicker(null);
            }}
          />
        )}

        {error && <p className="text-xs mt-2" style={{ color: '#ff5555' }}>{error}</p>}

        <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {features.upload && (
              <>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void envoyerFichier(file);
                  }}
                />
                <OutilBouton
                  // Le sélecteur de fichiers ne s'ouvre que sur un geste direct :
                  // sans inscription, on ouvre d'abord la fenêtre, puis on retouche.
                  onClick={() => (voter ? fileInput.current?.click() : ask())}
                  disabled={progress !== null}
                  label="Photo ou vidéo"
                >
                  <ImagePlus size={15} />
                </OutilBouton>
              </>
            )}
            {features.gif && (
              <>
                <OutilBouton onClick={() => setPicker((p) => (p === 'gifs' ? null : 'gifs'))} actif={picker === 'gifs'} label="GIF">
                  <span className="text-xs font-black">GIF</span>
                </OutilBouton>
                <OutilBouton onClick={() => setPicker((p) => (p === 'stickers' ? null : 'stickers'))} actif={picker === 'stickers'} label="Sticker">
                  <Sticker size={15} />
                </OutilBouton>
              </>
            )}
            <span className="text-xs ml-1" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>
              {text.length}/{MAX}
            </span>
          </div>
          <button
            onClick={() => guard(() => { void envoyer(); })}
            disabled={!pret || sending}
            className="btn-neon text-xs px-4 py-2 rounded inline-flex items-center gap-2"
            style={pret ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
          >
            <Send size={12} /> {sending ? '...' : 'Publier'}
          </button>
        </div>
      </div>

      {/* Fil */}
      {comments === null && <ZenkaiSpinner label="Chargement des messages" size={26} />}

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

function OutilBouton({
  children,
  onClick,
  label,
  actif = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  actif?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="rounded flex items-center justify-center transition-colors"
      style={{
        minWidth: '2.25rem',
        height: '2.25rem',
        padding: '0 0.5rem',
        border: `1px solid ${actif ? 'var(--neon)' : 'var(--border)'}`,
        background: actif ? 'rgba(0,255,204,0.12)' : 'transparent',
        color: actif ? 'var(--neon)' : 'var(--sepia-dim)',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}

type GifResult = { id: string; url: string; preview: string; width?: number; height?: number; title: string };

/** Recherche GIPHY : les tendances d'abord, puis ce qu'on tape. */
function GifPicker({
  type,
  onPick,
  onClose,
}: {
  type: 'gifs' | 'stickers';
  onPick: (media: CommentMedia) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<GifResult[] | null>(null);

  useEffect(() => {
    let vivant = true;
    // On attend que la frappe se calme avant d'interroger GIPHY
    const minuterie = setTimeout(() => {
      fetch(`/api/gifs?type=${type}&q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((data) => { if (vivant) setResults((data.results ?? []) as GifResult[]); })
        .catch(() => { if (vivant) setResults([]); });
    }, q ? 350 : 0);
    return () => { vivant = false; clearTimeout(minuterie); };
  }, [q, type]);

  return (
    <div className="mt-3 rounded-lg p-2" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={type === 'gifs' ? 'Chercher un GIF…' : 'Chercher un sticker…'}
          autoFocus
          className="flex-1 text-sm"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--sepia)',
            borderRadius: '0.375rem',
            padding: '0.5rem 0.7rem',
          }}
        />
        <button onClick={onClose} className="p-1" style={{ color: 'var(--sepia-dim)' }} aria-label="Fermer">
          <X size={16} />
        </button>
      </div>

      {results === null ? (
        <ZenkaiSpinner label="Recherche" size={22} />
      ) : results.length === 0 ? (
        <p className="text-xs text-center py-4" style={{ color: 'var(--sepia-dim)' }}>Aucun résultat.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 overflow-y-auto" style={{ maxHeight: '16rem' }}>
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() =>
                onPick({ kind: type === 'gifs' ? 'gif' : 'sticker', url: r.url, width: r.width, height: r.height })
              }
              className="rounded overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: '1', background: type === 'stickers' ? 'transparent' : 'var(--bg)' }}
              title={r.title}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- GIF animé hébergé par GIPHY */}
              <img src={r.preview} alt={r.title} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <p className="text-right mt-1.5" style={{ fontSize: '0.65rem', color: 'var(--sepia-dim)', opacity: 0.8 }}>
        Powered by GIPHY
      </p>
    </div>
  );
}

function MediaView({ media, compact = false }: { media: CommentMedia; compact?: boolean }) {
  if (media.kind === 'video') {
    return (
      <video
        src={media.url}
        controls
        playsInline
        preload="metadata"
        className="rounded-lg"
        style={{ maxHeight: compact ? '9rem' : '22rem', maxWidth: '100%', background: '#000' }}
      />
    );
  }

  const sticker = media.kind === 'sticker';
  const hauteur = compact ? '8rem' : sticker ? '9rem' : media.kind === 'gif' ? '16rem' : '20rem';
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- média envoyé ou GIF animé, souvent sans dimensions connues
    <img
      src={media.url}
      alt=""
      loading="lazy"
      width={media.width}
      height={media.height}
      className={sticker ? '' : 'rounded-lg'}
      style={{ maxHeight: hauteur, maxWidth: '100%', width: 'auto', height: 'auto' }}
    />
  );

  // Une photo s'ouvre en grand ; un GIF ou un sticker se suffit à lui-même
  return media.kind === 'image' && !compact ? (
    <a href={media.url} target="_blank" rel="noopener noreferrer">{image}</a>
  ) : image;
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
        {comment.text && (
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--sepia)', opacity: 0.92, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
          >
            {comment.text}
          </p>
        )}
        {comment.media && (
          <div className="mt-2">
            <MediaView media={comment.media} />
          </div>
        )}
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
