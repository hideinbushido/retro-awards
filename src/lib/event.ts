/**
 * Le calendrier des résultats et les chaînes du live, en un seul endroit :
 * l'accueil, la page Résultats, « Mes votes » et les mails y puisent tous.
 * Changer une date ici la change partout.
 */
export const LIVES = [
  { categorie: 'Openings', date: 'samedi 31 octobre', court: 'sam. 31 oct.' },
  { categorie: 'Animés', date: 'samedi 7 novembre', court: 'sam. 7 nov.' },
] as const;

/**
 * Les chaînes où passent les lives. Tant qu'une adresse vaut null, le site
 * nomme la plateforme sans afficher de lien — jamais de lien cassé.
 */
export const CHAINES: { twitch: string | null; tiktok: string | null } = {
  twitch: null,
  tiktok: null,
};

/** « le samedi 31 octobre pour les openings et le samedi 7 novembre pour les animés » */
export const CALENDRIER_PHRASE = LIVES.map((l) => `le ${l.date} pour les ${l.categorie.toLowerCase()}`).join(' et ');
