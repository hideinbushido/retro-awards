/**
 * Barème et validation des votes.
 *
 * Openings : chacun classe 3 openings par année. La place donne les points.
 * Animés   : un seul vote par année, qui vaut une voix.
 */
import { nominees } from '@/data/nominees';

/** Points attribués selon la place dans le podium (index 0 = 1re place). */
export const PODIUM_POINTS = [10, 6, 3] as const;

/** Nombre d'openings à classer pour qu'un podium soit valide. */
export const PODIUM_SIZE = PODIUM_POINTS.length;

export type Category = 'opening' | 'anime';

export type Ballot = {
  /** Podium d'openings : [1re place, 2e place, 3e place]. */
  podium: string[] | null;
  /** Anime voté pour l'année. */
  anime: string | null;
};

export function isKnownYear(year: number): boolean {
  return Number.isInteger(year) && year in nominees;
}

/** Vérifie qu'un podium est jouable : 3 ids distincts, tous nommés cette année-là. */
export function validatePodium(year: number, podium: unknown): podium is string[] {
  if (!isKnownYear(year) || !Array.isArray(podium)) return false;
  if (podium.length !== PODIUM_SIZE) return false;
  if (!podium.every((id) => typeof id === 'string')) return false;
  if (new Set(podium).size !== PODIUM_SIZE) return false;
  const ids = new Set(nominees[year].openings.map((o) => o.id));
  return podium.every((id) => ids.has(id as string));
}

export function validateAnime(year: number, id: unknown): id is string {
  if (!isKnownYear(year) || typeof id !== 'string') return false;
  return nominees[year].animes.some((a) => a.id === id);
}
