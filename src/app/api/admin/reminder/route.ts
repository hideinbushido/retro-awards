/**
 * Rappel par mail aux votants à qui il manque des bulletins.
 *
 * Beaucoup ont classé les openings sans voter l'animé : les deux catégories
 * vivent sur des pages différentes. Cette route n'est déclenchée qu'à la main
 * depuis l'admin, et son mode « aperçu » permet de voir qui serait relancé
 * avant d'envoyer quoi que ce soit.
 */
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { YEARS } from '@/lib/firestore';
import { listBallots, listVoters } from '@/lib/voteStore';
import { isMailConfigured, sendRappel } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** Une vingtaine de mails, quelques secondes chacun. */
export const maxDuration = 60;

/** Deux envois rapprochés relanceraient les mêmes personnes deux fois. */
const DELAI_ENTRE_ENVOIS = 6 * 60 * 60 * 1000;
let dernierEnvoi = 0;

function adminOk(given: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === 'production' ? null : 'retro2025');
  if (!expected || typeof given !== 'string') return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

type Cible = { pseudo: string; email: string; animes: number[]; openings: number[] };

async function cibles(): Promise<Cible[]> {
  const [voters, ballots] = await Promise.all([listVoters(), listBallots()]);

  return voters
    .filter((v) => v.email)
    .map((v) => {
      const siens = ballots.filter((b) => b.email === v.email);
      const avecAnime = new Set(siens.filter((b) => b.anime).map((b) => b.year));
      const avecPodium = new Set(siens.filter((b) => b.podium).map((b) => b.year));
      return {
        pseudo: v.pseudo,
        email: v.email,
        animes: YEARS.filter((y) => !avecAnime.has(y)),
        openings: YEARS.filter((y) => !avecPodium.has(y)),
      };
    })
    .filter((c) => c.animes.length || c.openings.length)
    .sort((a, b) => b.animes.length - a.animes.length);
}

/** POST /api/admin/reminder { password, dryRun } */
export async function POST(request: NextRequest) {
  let body: { password?: unknown; dryRun?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }
  if (!adminOk(body.password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  let liste: Cible[];
  try {
    liste = await cibles();
  } catch (e) {
    console.error('[rappel] lecture impossible', e);
    return NextResponse.json({ error: 'Lecture des votes impossible.' }, { status: 503 });
  }

  const apercu = liste.map((c) => ({
    pseudo: c.pseudo,
    email: c.email,
    animes: c.animes.length,
    openings: c.openings.length,
  }));

  if (body.dryRun) {
    return NextResponse.json({ dryRun: true, total: liste.length, cibles: apercu });
  }

  if (!isMailConfigured()) {
    return NextResponse.json({ error: 'L’envoi de mails n’est pas activé.' }, { status: 503 });
  }
  if (Date.now() - dernierEnvoi < DELAI_ENTRE_ENVOIS) {
    return NextResponse.json(
      { error: 'Un rappel vient d’être envoyé. Attends quelques heures avant de relancer.' },
      { status: 429 },
    );
  }
  dernierEnvoi = Date.now();

  // Par paquets : Gmail n'aime pas vingt connexions d'un coup, et une
  // fonction serveur ne peut pas attendre indéfiniment.
  let envoyes = 0;
  const echecs: string[] = [];
  for (let i = 0; i < liste.length; i += 5) {
    const paquet = liste.slice(i, i + 5);
    const resultats = await Promise.allSettled(
      paquet.map((c) => sendRappel(c.email, c.pseudo, { animes: c.animes, openings: c.openings })),
    );
    resultats.forEach((r, j) => {
      if (r.status === 'fulfilled') envoyes++;
      else {
        echecs.push(paquet[j].email);
        console.error('[rappel] échec', paquet[j].email, r.reason);
      }
    });
  }

  return NextResponse.json({ ok: true, envoyes, echecs: echecs.length, total: liste.length });
}
