/**
 * Commentaires : lecture publique, écriture réservée aux personnes inscrites.
 *
 * Le pseudo et l'adresse mail du vote servent aussi ici : on commente sous le
 * même nom qu'on vote, et l'adresse ne sort jamais du serveur.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { timingSafeEqual } from 'crypto';
import { del } from '@vercel/blob';
import { YEARS } from '@/lib/firestore';
import { getVoterIdentity } from '@/lib/voteStore';
import { addComment, deleteComment, listComments, type StoredComment } from '@/lib/commentStore';
import { gifsEnabled, isBlobUrl, normalizeMedia, uploadsEnabled } from '@/lib/media';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COOKIE = 'retro_voter';
const MAX_LONGUEUR = 1000;
/** Un commentaire toutes les dix secondes par personne. */
const DELAI = 10 * 1000;
const dernierEnvoi = new Map<string, number>();

/** 'accueil', ou une année connue : rien d'autre ne peut porter de discussion. */
function normalizeScope(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const scope = value.trim();
  if (scope === 'accueil') return scope;
  return YEARS.includes(Number(scope)) ? scope : null;
}

function adminOk(given: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === 'production' ? null : 'retro2025');
  if (!expected || typeof given !== 'string') return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Ce que le navigateur voit d'un commentaire : jamais l'identifiant du votant. */
function publier(c: StoredComment, voter: string | null) {
  return {
    id: c.id,
    author: c.author,
    text: c.text,
    media: c.media,
    parentId: c.parentId,
    createdAt: c.createdAt,
    mine: Boolean(voter) && c.voter === voter,
  };
}

/** GET /api/comments?scope=accueil */
export async function GET(request: NextRequest) {
  const scope = normalizeScope(request.nextUrl.searchParams.get('scope'));
  if (!scope) return NextResponse.json({ error: 'Page inconnue.' }, { status: 400 });

  const features = { gif: gifsEnabled(), upload: uploadsEnabled() };
  const voter = (await cookies()).get(COOKIE)?.value ?? null;
  try {
    const comments = await listComments(scope);
    return NextResponse.json({ comments: comments.map((c) => publier(c, voter)), features });
  } catch (e) {
    console.error('[comments] lecture impossible', e);
    return NextResponse.json({ comments: [], features });
  }
}

/** POST /api/comments { scope, text, media?, parentId? } */
export async function POST(request: NextRequest) {
  let body: { scope?: unknown; text?: unknown; media?: unknown; parentId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }

  const scope = normalizeScope(body.scope);
  if (!scope) return NextResponse.json({ error: 'Page inconnue.' }, { status: 400 });

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const media = body.media ? normalizeMedia(body.media) : null;
  if (body.media && !media) {
    return NextResponse.json({ error: 'Ce fichier ne peut pas être publié.' }, { status: 400 });
  }
  if (!text && !media) return NextResponse.json({ error: 'Ton message est vide.' }, { status: 400 });
  if (text.length > MAX_LONGUEUR) {
    return NextResponse.json({ error: `Message trop long (${MAX_LONGUEUR} caractères maximum).` }, { status: 400 });
  }

  const voter = (await cookies()).get(COOKIE)?.value;
  let identity = null;
  if (voter) {
    try {
      identity = await getVoterIdentity(voter);
    } catch (e) {
      console.error('[comments] lecture identité impossible', e);
      return NextResponse.json({ error: 'Impossible de publier pour le moment.' }, { status: 503 });
    }
  }
  if (!voter || !identity) {
    return NextResponse.json(
      { error: 'Indique ton pseudo et ton adresse mail avant de commenter.', needIdentity: true },
      { status: 401 },
    );
  }

  const precedent = dernierEnvoi.get(voter) ?? 0;
  if (Date.now() - precedent < DELAI) {
    return NextResponse.json({ error: 'Doucement — attends quelques secondes.' }, { status: 429 });
  }

  try {
    const parentId = typeof body.parentId === 'string' ? body.parentId : null;
    let racine = parentId;
    if (parentId) {
      // Une seule profondeur de réponses : on répond au fil, pas à la réponse.
      const existing = await listComments(scope);
      const cible = existing.find((c) => c.id === parentId);
      if (!cible) return NextResponse.json({ error: 'Ce message n’existe plus.' }, { status: 400 });
      racine = cible.parentId ?? cible.id;
    }

    const created = await addComment({ scope, author: identity.pseudo, text, media, parentId: racine, voter });
    dernierEnvoi.set(voter, Date.now());
    return NextResponse.json({ ok: true, comment: publier(created, voter) });
  } catch (e) {
    console.error('[comments] publication impossible', e);
    return NextResponse.json({ error: 'Ton message n’a pas pu être publié.' }, { status: 503 });
  }
}

/** DELETE /api/comments { id, password? } — l'auteur, ou l'admin. */
export async function DELETE(request: NextRequest) {
  let body: { id?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id : null;
  if (!id) return NextResponse.json({ error: 'Message inconnu.' }, { status: 400 });

  const voter = (await cookies()).get(COOKIE)?.value ?? null;
  const admin = adminOk(body.password);
  if (!voter && !admin) return NextResponse.json({ error: 'Suppression refusée.' }, { status: 401 });

  try {
    const { ok, media } = await deleteComment(id, voter, admin);
    if (!ok) return NextResponse.json({ error: 'Suppression refusée.' }, { status: 403 });

    // Les fichiers envoyés partent avec leur message : pas de photo orpheline
    // qui resterait en ligne après une modération.
    const fichiers = media.map((m) => m.url).filter(isBlobUrl);
    if (fichiers.length && uploadsEnabled()) {
      await del(fichiers).catch((e) => console.error('[comments] fichiers non supprimés', e));
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[comments] suppression impossible', e);
    return NextResponse.json({ error: 'La suppression a échoué.' }, { status: 503 });
  }
}
