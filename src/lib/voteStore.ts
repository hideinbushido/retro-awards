/**
 * Stockage des votes — utilisé uniquement côté serveur.
 *
 * Deux implémentations derrière la même interface :
 *   • Firestore, dès que les clés d’administration sont présentes ;
 *   • mémoire du serveur, pour tester en local sans clés. Ce mode de secours
 *     est refusé en production, pour qu’un oubli de variable d’environnement
 *     ne fasse jamais disparaître des votes en silence.
 */
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, hasAdminCredentials } from './firebaseAdmin';
import { PODIUM_POINTS } from './votes';
import type { VoterIdentity } from './voters';

export class AlreadyVotedError extends Error {
  constructor() {
    super('ALREADY_VOTED');
  }
}

export type Tally = {
  openings: Record<string, number>;
  animes: Record<string, number>;
  openingBallots: number;
  animeBallots: number;
};

const emptyTally = (): Tally => ({ openings: {}, animes: {}, openingBallots: 0, animeBallots: 0 });

/** Mode dégradé : pas de clés, et on n’est pas en production. */
export function isMemoryMode(): boolean {
  return !hasAdminCredentials() && process.env.NODE_ENV !== 'production';
}

/* ── Implémentation mémoire (développement) ── */
const memBallots = new Map<string, { podium?: string[]; anime?: string }>();
const memTallies = new Map<number, Tally>();

const key = (voter: string, year: number) => `${voter}_${year}`;

/* ── Interface commune ── */

export async function getBallot(voter: string, year: number) {
  if (isMemoryMode()) {
    const found = memBallots.get(key(voter, year));
    return { podium: found?.podium ?? null, anime: found?.anime ?? null };
  }
  const db = getAdminDb();
  const [opening, anime] = await Promise.all([
    db.collection('ballots').doc(`${voter}_${year}_opening`).get(),
    db.collection('ballots').doc(`${voter}_${year}_anime`).get(),
  ]);
  return {
    podium: opening.exists ? ((opening.data()?.podium as string[]) ?? null) : null,
    anime: anime.exists ? ((anime.data()?.id as string) ?? null) : null,
  };
}

/** Enregistre un podium d’openings. Lève AlreadyVotedError si déjà voté. */
export async function saveOpeningBallot(
  voter: string,
  year: number,
  podium: string[],
  identity: VoterIdentity,
) {
  if (isMemoryMode()) {
    const existing = memBallots.get(key(voter, year)) ?? {};
    if (existing.podium) throw new AlreadyVotedError();
    memBallots.set(key(voter, year), { ...existing, podium });
    const tally = memTallies.get(year) ?? emptyTally();
    podium.forEach((id, rank) => {
      tally.openings[id] = (tally.openings[id] ?? 0) + PODIUM_POINTS[rank];
    });
    tally.openingBallots += 1;
    memTallies.set(year, tally);
    return;
  }

  const db = getAdminDb();
  const ballotRef = db.collection('ballots').doc(`${voter}_${year}_opening`);
  const tallyRef = db.collection('tallies').doc(String(year));
  await db.runTransaction(async (tx) => {
    if ((await tx.get(ballotRef)).exists) throw new AlreadyVotedError();
    const points: Record<string, FieldValue> = {};
    podium.forEach((id, rank) => {
      points[id] = FieldValue.increment(PODIUM_POINTS[rank]);
    });
    tx.set(ballotRef, {
      voter,
      year,
      podium,
      pseudo: identity.pseudo,
      email: identity.email,
      createdAt: FieldValue.serverTimestamp(),
    });
    tx.set(tallyRef, { openings: points, openingBallots: FieldValue.increment(1) }, { merge: true });
  });
}

/** Enregistre le vote anime. Lève AlreadyVotedError si déjà voté. */
export async function saveAnimeBallot(
  voter: string,
  year: number,
  id: string,
  identity: VoterIdentity,
) {
  if (isMemoryMode()) {
    const existing = memBallots.get(key(voter, year)) ?? {};
    if (existing.anime) throw new AlreadyVotedError();
    memBallots.set(key(voter, year), { ...existing, anime: id });
    const tally = memTallies.get(year) ?? emptyTally();
    tally.animes[id] = (tally.animes[id] ?? 0) + 1;
    tally.animeBallots += 1;
    memTallies.set(year, tally);
    return;
  }

  const db = getAdminDb();
  const ballotRef = db.collection('ballots').doc(`${voter}_${year}_anime`);
  const tallyRef = db.collection('tallies').doc(String(year));
  await db.runTransaction(async (tx) => {
    if ((await tx.get(ballotRef)).exists) throw new AlreadyVotedError();
    tx.set(ballotRef, {
      voter,
      year,
      id,
      pseudo: identity.pseudo,
      email: identity.email,
      createdAt: FieldValue.serverTimestamp(),
    });
    tx.set(
      tallyRef,
      { animes: { [id]: FieldValue.increment(1) }, animeBallots: FieldValue.increment(1) },
      { merge: true },
    );
  });
}

/**
 * Retire le vote anime de l’année : un seul clic suffit à voter, il faut donc
 * pouvoir revenir en arrière. Le podium des openings, lui, reste définitif.
 * Renvoie false s’il n’y avait rien à annuler.
 */
export async function removeAnimeBallot(voter: string, year: number): Promise<boolean> {
  if (isMemoryMode()) {
    const existing = memBallots.get(key(voter, year));
    const id = existing?.anime;
    if (!id) return false;
    memBallots.set(key(voter, year), { ...existing, anime: undefined });
    const tally = memTallies.get(year);
    if (tally) {
      tally.animes[id] = Math.max(0, (tally.animes[id] ?? 0) - 1);
      tally.animeBallots = Math.max(0, tally.animeBallots - 1);
    }
    return true;
  }

  const db = getAdminDb();
  const ballotRef = db.collection('ballots').doc(`${voter}_${year}_anime`);
  const tallyRef = db.collection('tallies').doc(String(year));
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ballotRef);
    if (!snap.exists) return false;
    const id = snap.data()?.id;
    tx.delete(ballotRef);
    if (typeof id === 'string') {
      tx.set(
        tallyRef,
        { animes: { [id]: FieldValue.increment(-1) }, animeBallots: FieldValue.increment(-1) },
        { merge: true },
      );
    }
    return true;
  });
}

/** Totaux par année, dans l’ordre demandé. */
export async function getTallies(years: number[]): Promise<Tally[]> {
  if (isMemoryMode()) {
    return years.map((y) => memTallies.get(y) ?? emptyTally());
  }
  const db = getAdminDb();
  const snaps = await db.getAll(...years.map((y) => db.collection('tallies').doc(String(y))));
  return snaps.map((snap) => {
    const data = snap.data() ?? {};
    return {
      openings: (data.openings ?? {}) as Record<string, number>,
      animes: (data.animes ?? {}) as Record<string, number>,
      openingBallots: (data.openingBallots as number) ?? 0,
      animeBallots: (data.animeBallots as number) ?? 0,
    };
  });
}

/* ── Identité du votant ── */

const memVoters = new Map<string, VoterIdentity>();

export async function getVoterIdentity(voter: string): Promise<VoterIdentity | null> {
  if (isMemoryMode()) return memVoters.get(voter) ?? null;
  const snap = await getAdminDb().collection('voters').doc(voter).get();
  if (!snap.exists) return null;
  const data = snap.data() ?? {};
  if (typeof data.pseudo !== 'string' || typeof data.email !== 'string') return null;
  return { pseudo: data.pseudo, email: data.email };
}

/**
 * Enregistre le pseudo et le mail.
 *
 * Si l’adresse a déjà servi, on renvoie l’identifiant existant : la personne
 * retrouve ses votes depuis un autre appareil, et ne peut pas voter deux fois
 * en changeant de navigateur.
 */
export async function saveVoterIdentity(
  voter: string,
  identity: VoterIdentity,
): Promise<{ voter: string; returning: boolean }> {
  if (isMemoryMode()) {
    for (const [id, found] of memVoters) {
      if (found.email === identity.email) {
        memVoters.set(id, { ...found, pseudo: identity.pseudo });
        return { voter: id, returning: true };
      }
    }
    memVoters.set(voter, identity);
    return { voter, returning: false };
  }

  const db = getAdminDb();
  const existing = await db.collection('voters').where('email', '==', identity.email).limit(1).get();
  if (!existing.empty) {
    const doc = existing.docs[0];
    await doc.ref.set(
      { pseudo: identity.pseudo, updatedAt: FieldValue.serverTimestamp() },
      { merge: true },
    );
    return { voter: doc.id, returning: true };
  }

  await db.collection('voters').doc(voter).set({
    ...identity,
    createdAt: FieldValue.serverTimestamp(),
  });
  return { voter, returning: false };
}

export type VoterSummary = {
  pseudo: string;
  email: string;
  createdAt: string | null;
  animes: number;
  openings: number;
};

/** Qui s’est inscrit, et combien de bulletins chacun a déposés. */
export async function listVoters(): Promise<VoterSummary[]> {
  if (isMemoryMode()) {
    return [...memVoters.entries()].map(([id, identity]) => {
      let animes = 0;
      let openings = 0;
      for (const [ballotKey, ballot] of memBallots) {
        if (!ballotKey.startsWith(`${id}_`)) continue;
        if (ballot.podium) openings += 1;
        if (ballot.anime) animes += 1;
      }
      return { ...identity, createdAt: null, animes, openings };
    });
  }

  const db = getAdminDb();
  const [voters, ballots] = await Promise.all([
    db.collection('voters').get(),
    db.collection('ballots').get(),
  ]);

  const counts = new Map<string, { animes: number; openings: number }>();
  ballots.forEach((doc) => {
    const data = doc.data();
    if (typeof data.voter !== 'string') return;
    const found = counts.get(data.voter) ?? { animes: 0, openings: 0 };
    if (Array.isArray(data.podium)) found.openings += 1;
    else found.animes += 1;
    counts.set(data.voter, found);
  });

  return voters.docs
    .map((doc) => {
      const data = doc.data();
      const found = counts.get(doc.id) ?? { animes: 0, openings: 0 };
      return {
        pseudo: typeof data.pseudo === 'string' ? data.pseudo : '(sans pseudo)',
        email: typeof data.email === 'string' ? data.email : '',
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        animes: found.animes,
        openings: found.openings,
      };
    })
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
}

/** Tous les bulletins d’un votant, pour le récapitulatif. */
export async function getVoterBallots(
  voter: string,
): Promise<{ year: number; podium: string[] | null; anime: string | null }[]> {
  const found = new Map<number, { podium: string[] | null; anime: string | null }>();
  const touch = (year: number) =>
    found.get(year) ?? found.set(year, { podium: null, anime: null }).get(year)!;

  if (isMemoryMode()) {
    for (const [id, ballot] of memBallots) {
      if (!id.startsWith(`${voter}_`)) continue;
      const year = Number(id.slice(voter.length + 1));
      const entry = touch(year);
      entry.podium = ballot.podium ?? null;
      entry.anime = ballot.anime ?? null;
    }
  } else {
    const snap = await getAdminDb().collection('ballots').where('voter', '==', voter).get();
    snap.forEach((doc) => {
      const data = doc.data();
      const year = Number(data.year);
      if (!Number.isFinite(year)) return;
      const entry = touch(year);
      if (Array.isArray(data.podium)) entry.podium = data.podium as string[];
      if (typeof data.id === 'string') entry.anime = data.id;
    });
  }

  return [...found.entries()]
    .map(([year, entry]) => ({ year, ...entry }))
    .sort((a, b) => b.year - a.year);
}
