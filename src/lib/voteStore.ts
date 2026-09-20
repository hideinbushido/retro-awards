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
export async function saveOpeningBallot(voter: string, year: number, podium: string[]) {
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
    tx.set(ballotRef, { voter, year, podium, createdAt: FieldValue.serverTimestamp() });
    tx.set(tallyRef, { openings: points, openingBallots: FieldValue.increment(1) }, { merge: true });
  });
}

/** Enregistre le vote anime. Lève AlreadyVotedError si déjà voté. */
export async function saveAnimeBallot(voter: string, year: number, id: string) {
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
    tx.set(ballotRef, { voter, year, id, createdAt: FieldValue.serverTimestamp() });
    tx.set(
      tallyRef,
      { animes: { [id]: FieldValue.increment(1) }, animeBallots: FieldValue.increment(1) },
      { merge: true },
    );
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
