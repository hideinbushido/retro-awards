/**
 * Médias joints aux commentaires : photos et vidéos envoyées, GIF et stickers
 * choisis dans GIPHY.
 *
 * Un commentaire ne stocke qu'une adresse. Pour qu'on ne puisse pas y glisser
 * n'importe quel lien (pixel espion, contenu hébergé ailleurs), chaque type
 * n'accepte que son hébergeur : notre espace Vercel Blob pour les envois,
 * les serveurs de GIPHY pour les GIF et stickers.
 */
export type MediaKind = 'image' | 'video' | 'gif' | 'sticker';

export type CommentMedia = {
  kind: MediaKind;
  url: string;
  width?: number;
  height?: number;
};

export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
/** Une photo de téléphone réduite pèse moins de 1 Mo ; un GIF animé bien plus. */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
/** Une quinzaine de secondes filmées au téléphone. */
export const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
/** Tous les envois vont dans ce dossier, pour les distinguer du reste du stockage. */
export const UPLOAD_FOLDER = 'commentaires';

const BLOB_HOST = /\.public\.blob\.vercel-storage\.com$/i;
const GIPHY_HOST = /^(media\d*\.giphy\.com|i\.giphy\.com)$/i;

export function isBlobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && BLOB_HOST.test(parsed.hostname);
  } catch {
    return false;
  }
}

function isGiphyUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && GIPHY_HOST.test(parsed.hostname);
  } catch {
    return false;
  }
}

function dimension(value: unknown): number | undefined {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 && n < 10000 ? Math.round(n) : undefined;
}

/** Valide un média reçu du navigateur ; null s'il est absent ou suspect. */
export function normalizeMedia(value: unknown): CommentMedia | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;
  const kind = raw.kind;
  const url = typeof raw.url === 'string' ? raw.url.trim() : '';
  if (!url || url.length > 600) return null;

  if (kind === 'image' || kind === 'video') {
    if (!isBlobUrl(url)) return null;
  } else if (kind === 'gif' || kind === 'sticker') {
    if (!isGiphyUrl(url)) return null;
  } else {
    return null;
  }

  return { kind, url, width: dimension(raw.width), height: dimension(raw.height) };
}

/** Les envois de fichiers sont-ils branchés ? (un espace Vercel Blob relié au projet) */
export function uploadsEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/** La recherche de GIF est-elle branchée ? (une clé GIPHY) */
export function gifsEnabled(): boolean {
  return Boolean(process.env.GIPHY_API_KEY);
}
