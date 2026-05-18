import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

export type Opening = {
  id: string;
  animeName: string;
  openingTitle: string;
  imageUrl: string;
  audioPath: string;
  votes: number;
  order: number;
};

export type Anime = {
  id: string;
  name: string;
  imageUrl: string;
  votes: number;
  order: number;
};

export type YearData = {
  year: number;
  openings: Opening[];
  animes: Anime[];
};

export const YEARS = Array.from({ length: 15 }, (_, i) => 2019 - i);

export async function getOpenings(year: number): Promise<Opening[]> {
  const snap = await getDocs(
    query(collection(db, `years/${year}/openings`), orderBy('order'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Opening));
}

export async function getAnimes(year: number): Promise<Anime[]> {
  const snap = await getDocs(
    query(collection(db, `years/${year}/animes`), orderBy('order'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Anime));
}

export async function voteOpening(year: number, openingId: string) {
  await updateDoc(doc(db, `years/${year}/openings/${openingId}`), {
    votes: increment(1),
  });
}

export async function voteAnime(year: number, animeId: string) {
  await updateDoc(doc(db, `years/${year}/animes/${animeId}`), {
    votes: increment(1),
  });
}

export async function addOpening(year: number, data: Omit<Opening, 'id'>) {
  return addDoc(collection(db, `years/${year}/openings`), data);
}

export async function addAnime(year: number, data: Omit<Anime, 'id'>) {
  return addDoc(collection(db, `years/${year}/animes`), data);
}

export async function updateOpening(year: number, id: string, data: Partial<Opening>) {
  return updateDoc(doc(db, `years/${year}/openings/${id}`), data);
}

export async function updateAnime(year: number, id: string, data: Partial<Anime>) {
  return updateDoc(doc(db, `years/${year}/animes/${id}`), data);
}

export async function deleteOpening(year: number, id: string) {
  return deleteDoc(doc(db, `years/${year}/openings/${id}`));
}

export async function deleteAnime(year: number, id: string) {
  return deleteDoc(doc(db, `years/${year}/animes/${id}`));
}
