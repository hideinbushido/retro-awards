/**
 * Vote : enregistrement et relecture du bulletin du visiteur.
 *
 * Le navigateur n’écrit jamais dans Firestore : tout passe par ici. Chaque
 * visiteur reçoit un cookie httpOnly qui l’identifie, et le stockage garantit
 * un seul bulletin par personne, par année et par catégorie.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PODIUM_SIZE, isKnownYear, validateAnime, validatePodium } from '@/lib/votes';
import {
  AlreadyVotedError,
  getBallot,
  isMemoryMode,
  saveAnimeBallot,
  saveOpeningBallot,
} from '@/lib/voteStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COOKIE = 'retro_voter';
const ONE_YEAR = 60 * 60 * 24 * 365;

/** GET /api/vote?year=2019 — ce que ce visiteur a déjà voté cette année-là. */
export async function GET(request: NextRequest) {
  const year = Number(request.nextUrl.searchParams.get('year'));
  if (!isKnownYear(year)) {
    return NextResponse.json({ error: 'Année inconnue.' }, { status: 400 });
  }

  const voter = (await cookies()).get(COOKIE)?.value;
  if (!voter) return NextResponse.json({ podium: null, anime: null });

  try {
    return NextResponse.json(await getBallot(voter, year));
  } catch {
    // Stockage indisponible : on ne bloque pas l’affichage de la page.
    return NextResponse.json({ podium: null, anime: null });
  }
}

/**
 * POST /api/vote
 *   { year, category: 'opening', podium: [id1, id2, id3] }
 *   { year, category: 'anime',   id: 'x' }
 */
export async function POST(request: NextRequest) {
  let body: { year?: unknown; category?: unknown; podium?: unknown; id?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }

  const year = Number(body.year);
  const category = body.category;
  if (!isKnownYear(year) || (category !== 'opening' && category !== 'anime')) {
    return NextResponse.json({ error: 'Année ou catégorie invalide.' }, { status: 400 });
  }
  if (category === 'opening' && !validatePodium(year, body.podium)) {
    return NextResponse.json(
      { error: `Podium invalide : il faut ${PODIUM_SIZE} openings différents de ${year}.` },
      { status: 400 },
    );
  }
  if (category === 'anime' && !validateAnime(year, body.id)) {
    return NextResponse.json({ error: 'Anime invalide.' }, { status: 400 });
  }

  const jar = await cookies();
  let voter = jar.get(COOKIE)?.value;
  const isNewVoter = !voter;
  if (!voter) voter = crypto.randomUUID();

  try {
    if (category === 'opening') {
      await saveOpeningBallot(voter, year, body.podium as string[]);
    } else {
      await saveAnimeBallot(voter, year, body.id as string);
    }
  } catch (e) {
    if (e instanceof AlreadyVotedError) {
      return NextResponse.json({ error: 'Tu as déjà voté pour cette année.' }, { status: 409 });
    }
    console.error('[vote] échec enregistrement', e);
    return NextResponse.json({ error: 'Le vote n’a pas pu être enregistré.' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true, memory: isMemoryMode() });
  if (isNewVoter) {
    response.cookies.set(COOKIE, voter, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ONE_YEAR,
    });
  }
  return response;
}
