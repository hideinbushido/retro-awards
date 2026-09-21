/**
 * Commentaires — côté serveur uniquement.
 *
 * Collection `retroComments`, et surtout pas `comments` : le projet Firebase
 * est partagé avec le site Zenkai, qui possède déjà une collection de ce nom.
 *
 * Un commentaire porte le pseudo de son auteur, jamais son adresse mail :
 * l'adresse sert à le reconnaître, pas à être affichée.
 */
import { FieldValue, type DocumentData } from 'firebase-admin/firestore';
import { getAdminDb } from './firebaseAdmin';
import { isMemoryMode } from './voteStore';
import { normalizeMedia, type CommentMedia } from './media';

const COLLECTION = 'retroComments';
/** Au-delà, la page devient illisible et la lecture coûte cher. */
const MAX_PAR_PAGE = 300;

export type StoredComment = {
  id: string;
  scope: string;
  author: string;
  text: string;
  media: CommentMedia | null;
  parentId: string | null;
  voter: string;
  createdAt: string | null;
};

const memComments = new Map<string, StoredComment>();

function trier(list: StoredComment[]): StoredComment[] {
  return list.sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''));
}

function depuisDocument(id: string, data: DocumentData): StoredComment {
  return {
    id,
    scope: typeof data.scope === 'string' ? data.scope : '?',
    author: typeof data.author === 'string' ? data.author : '?',
    text: typeof data.text === 'string' ? data.text : '',
    // Relu à travers la même validation qu'à l'écriture : une donnée abîmée
    // en base ne doit jamais afficher un lien qu'on n'aurait pas accepté.
    media: normalizeMedia(data.media),
    parentId: typeof data.parentId === 'string' ? data.parentId : null,
    voter: typeof data.voter === 'string' ? data.voter : '',
    createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
  };
}

/** Tous les commentaires d'une page, du plus ancien au plus récent. */
export async function listComments(scope: string): Promise<StoredComment[]> {
  if (isMemoryMode()) {
    return trier([...memComments.values()].filter((c) => c.scope === scope));
  }

  // Filtre seul, tri en mémoire : un tri côté Firestore demanderait un index
  // composite à créer à la main, pour un gain nul à cette échelle.
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where('scope', '==', scope)
    .limit(MAX_PAR_PAGE)
    .get();

  return trier(snap.docs.map((doc) => depuisDocument(doc.id, doc.data())));
}

/** Tout le mur, toutes pages confondues, du plus récent au plus ancien : réservé à la modération. */
export async function listAllComments(): Promise<StoredComment[]> {
  if (isMemoryMode()) return trier([...memComments.values()]).reverse();

  const snap = await getAdminDb().collection(COLLECTION).limit(MAX_PAR_PAGE).get();
  return trier(snap.docs.map((doc) => depuisDocument(doc.id, doc.data()))).reverse();
}

export async function addComment(comment: {
  scope: string;
  author: string;
  text: string;
  media: CommentMedia | null;
  parentId: string | null;
  voter: string;
}): Promise<StoredComment> {
  const createdAt = new Date().toISOString();

  if (isMemoryMode()) {
    const id = crypto.randomUUID();
    const stored = { id, ...comment, createdAt };
    memComments.set(id, stored);
    return stored;
  }

  const ref = await getAdminDb().collection(COLLECTION).add({
    ...comment,
    createdAt: FieldValue.serverTimestamp(),
  });
  return { id: ref.id, ...comment, createdAt };
}

/**
 * Supprime un commentaire et, si c'est un commentaire racine, ses réponses.
 *
 * Renvoie les médias qui étaient attachés, pour que l'appelant efface aussi
 * les fichiers envoyés ; `ok` vaut false si le demandeur n'en est pas
 * l'auteur et n'est pas l'admin.
 */
export async function deleteComment(
  id: string,
  voter: string | null,
  admin: boolean,
): Promise<{ ok: boolean; media: CommentMedia[] }> {
  if (isMemoryMode()) {
    const found = memComments.get(id);
    if (!found || (!admin && found.voter !== voter)) return { ok: false, media: [] };
    const retires = [found, ...[...memComments.values()].filter((c) => c.parentId === id)];
    retires.forEach((c) => memComments.delete(c.id));
    return { ok: true, media: retires.flatMap((c) => (c.media ? [c.media] : [])) };
  }

  const db = getAdminDb();
  const ref = db.collection(COLLECTION).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return { ok: false, media: [] };
  if (!admin && snap.data()?.voter !== voter) return { ok: false, media: [] };

  const replies = await db.collection(COLLECTION).where('parentId', '==', id).get();
  const media = [snap, ...replies.docs]
    .map((doc) => normalizeMedia(doc.data()?.media))
    .filter((m): m is CommentMedia => m !== null);

  const batch = db.batch();
  batch.delete(ref);
  replies.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  return { ok: true, media };
}
