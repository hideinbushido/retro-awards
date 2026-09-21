/**
 * Le calendrier de l'événement et ses chaînes, en un seul endroit : l'accueil,
 * les pages de vote, la page Résultats, « Mes votes », les mails et le serveur
 * y puisent tous. Changer une date ici la change partout.
 */

/**
 * Fin des votes : dimanche 25 octobre, 23 h 59 à Paris.
 * Ce jour-là, la France repasse à l'heure d'hiver à 3 h : le soir, c'est UTC+1.
 */
export const FIN_DES_VOTES = new Date('2026-10-25T23:59:59+01:00');
export const FIN_DES_VOTES_TEXTE = 'dimanche 25 octobre';
export const FIN_DES_VOTES_COURT = 'dim. 25 oct.';

export function votesClos(maintenant: number = Date.now()): boolean {
  return maintenant > FIN_DES_VOTES.getTime();
}

export const LIVES = [
  { categorie: 'Openings', date: 'samedi 31 octobre', court: 'sam. 31 oct.' },
  { categorie: 'Animés', date: 'samedi 7 novembre', court: 'sam. 7 nov.' },
] as const;

/** « le samedi 31 octobre pour les openings et le samedi 7 novembre pour les animés » */
export const CALENDRIER_PHRASE = LIVES.map((l) => `le ${l.date} pour les ${l.categorie.toLowerCase()}`).join(' et ');

export type Chaine = { plateforme: 'twitch' | 'tiktok'; nom: string; url: string };

/** Les chaînes où passent les lives, la structure d'abord. */
export const CHAINES: Chaine[] = [
  { plateforme: 'twitch', nom: 'zenkai_anime', url: 'https://www.twitch.tv/zenkai_anime' },
  { plateforme: 'tiktok', nom: '@zenkai_team0', url: 'https://www.tiktok.com/@zenkai_team0' },
  { plateforme: 'tiktok', nom: '@ricokouame', url: 'https://www.tiktok.com/@ricokouame' },
];
