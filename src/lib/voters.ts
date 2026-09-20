/**
 * Identité du votant : un pseudo et une adresse mail, comme à l’édition
 * précédente. Les deux sont saisis une seule fois, avant le premier vote.
 */
export type VoterIdentity = { pseudo: string; email: string };

/** Assez permissif pour ne refuser personne, assez strict pour un envoi de mail. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function normalizePseudo(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const pseudo = value.trim().replace(/\s+/g, ' ');
  if (pseudo.length < 2 || pseudo.length > 30) return null;
  return pseudo;
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length > 120 || !EMAIL.test(email)) return null;
  return email;
}
