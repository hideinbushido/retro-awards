/**
 * Adresse publique du site, toujours complète.
 *
 * La variable NEXT_PUBLIC_SITE_URL s'écrit à la main dans Vercel, et il est
 * facile d'oublier le « https:// » : sans lui, le build plante (new URL) et
 * les liens des mails deviennent relatifs. On complète donc ce qui manque.
 */
const PAR_DEFAUT = 'https://retro-awards.vercel.app';

export function siteUrl(): string {
  const brut = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '');
  if (!brut) return PAR_DEFAUT;
  const complet = /^https?:\/\//i.test(brut) ? brut : `https://${brut}`;
  try {
    return new URL(complet).origin;
  } catch {
    return PAR_DEFAUT;
  }
}
