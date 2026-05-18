import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { getDb } from './firebase';

export const YEARS = Array.from({ length: 15 }, (_, i) => 2019 - i);

export async function voteOpening(year: number, openingId: string) {
  const db = getDb();
  const ref = doc(db, `votes/${year}_opening_${openingId}`);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { votes: 1 });
  } else {
    await updateDoc(ref, { votes: increment(1) });
  }
}

export async function voteAnime(year: number, animeId: string) {
  const db = getDb();
  const ref = doc(db, `votes/${year}_anime_${animeId}`);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { votes: 1 });
  } else {
    await updateDoc(ref, { votes: increment(1) });
  }
}

export async function getVotes(year: number, category: 'opening' | 'anime', id: string): Promise<number> {
  const db = getDb();
  const ref = doc(db, `votes/${year}_${category}_${id}`);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data().votes as number) : 0;
}
