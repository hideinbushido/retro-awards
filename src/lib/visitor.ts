/**
 * Ce qu’on sait d’un visiteur au moment où il s’inscrit — côté serveur.
 *
 * Aucune adresse IP n’est conservée : seulement une empreinte, qui permet de
 * repérer deux inscriptions venues du même endroit sans jamais pouvoir
 * remonter à la personne. Le pays vient des en-têtes que Vercel ajoute
 * lui-même, l’appareil de la signature du navigateur.
 */
import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';

export type VisitorContext = {
  country: string | null;
  city: string | null;
  device: 'mobile' | 'tablette' | 'ordinateur' | null;
  os: string | null;
  browser: string | null;
  language: string | null;
  ipHash: string | null;
};

function detectDevice(ua: string): VisitorContext['device'] {
  if (!ua) return null;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablette';
  if (/Mobi|iPhone|iPod|Android|Windows Phone/i.test(ua)) return 'mobile';
  return 'ordinateur';
}

function detectOs(ua: string): string | null {
  if (!ua) return null;
  if (/Windows NT/i.test(ua)) return 'Windows';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Mac OS X/i.test(ua)) return 'macOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Linux/i.test(ua)) return 'Linux';
  return null;
}

function detectBrowser(ua: string): string | null {
  if (!ua) return null;
  // L’ordre compte : presque tous les navigateurs se disent aussi « Safari ».
  if (/Edg\//i.test(ua)) return 'Edge';
  if (/OPR\/|Opera/i.test(ua)) return 'Opera';
  if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
  if (/Firefox\//i.test(ua)) return 'Firefox';
  if (/Chrome\//i.test(ua)) return 'Chrome';
  if (/Safari\//i.test(ua)) return 'Safari';
  return null;
}

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.VISITOR_SALT ?? process.env.FIREBASE_PROJECT_ID ?? 'retro-awards';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 16);
}

export function readVisitor(request: NextRequest): VisitorContext {
  const header = (name: string) => {
    const value = request.headers.get(name);
    if (!value) return null;
    try { return decodeURIComponent(value); } catch { return value; }
  };

  const ua = request.headers.get('user-agent') ?? '';
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip');

  return {
    country: header('x-vercel-ip-country'),
    city: header('x-vercel-ip-city'),
    device: detectDevice(ua),
    os: detectOs(ua),
    browser: detectBrowser(ua),
    language: request.headers.get('accept-language')?.split(',')[0] ?? null,
    ipHash: hashIp(ip),
  };
}

/** D’où vient la personne : « instagram.com », « google », ou « direct ». */
export function readSource(referrer: unknown): string {
  if (typeof referrer !== 'string' || !referrer.trim()) return 'direct';
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    return host || 'direct';
  } catch {
    return 'direct';
  }
}
