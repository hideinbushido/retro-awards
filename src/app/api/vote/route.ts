/**
 * Vote : enregistrement et relecture du bulletin du visiteur.
 *
 * Le navigateur n’écrit jamais dans Firestore : tout passe par ici. Chaque
 * visiteur reçoit un cookie httpOnly lors de son inscription (/api/voter), et
 * le stockage garantit un seul bulletin par personne, par année et par
 * catégorie.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PODIUM_SIZE, isKnownYear, validateAnime, validatePodium } from '@/lib/votes';
import { votesClos } from '@/lib/event';
import {
  AlreadyVotedError,
  getBallot,
  getVoterIdentity,
  isMemoryMode,
  removeAnimeBallot,
  saveAnimeBallot,
  saveOpeningBallot,
} from '@/lib/voteStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COOKIE = 'retro_voter';

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

  // L'échéance se juge ici, à l'horloge du serveur : celle du visiteur ne compte pas.
  if (votesClos()) {
    return NextResponse.json({ error: 'Les votes sont clos depuis le dimanche 25 octobre.', closed: true }, { status: 403 });
  }

  /* Pseudo et mail d’abord : c’est eux qui rattachent le bulletin à quelqu’un. */
  const voter = (await cookies()).get(COOKIE)?.value;
  let identity = null;
  if (voter) {
    try {
      identity = await getVoterIdentity(voter);
    } catch (e) {
      console.error('[vote] lecture identité impossible', e);
      return NextResponse.json({ error: 'Le vote n’a pas pu être enregistré.' }, { status: 503 });
    }
  }
  if (!voter || !identity) {
    return NextResponse.json(
      { error: 'Indique ton pseudo et ton adresse mail avant de voter.', needIdentity: true },
      { status: 401 },
    );
  }

  try {
    if (category === 'opening') {
      await saveOpeningBallot(voter, year, body.podium as string[], identity);
    } else {
      await saveAnimeBallot(voter, year, body.id as string, identity);
    }
  } catch (e) {
    if (e instanceof AlreadyVotedError) {
      return NextResponse.json({ error: 'Tu as déjà voté pour cette année.' }, { status: 409 });
    }
    console.error('[vote] échec enregistrement', e);
    return NextResponse.json({ error: 'Le vote n’a pas pu être enregistré.' }, { status: 503 });
  }

  return NextResponse.json({ ok: true, memory: isMemoryMode() });
}

/**
 * DELETE /api/vote { year, category: 'anime' }
 *
 * Voter pour un anime tient en un clic : on doit pouvoir se raviser. Le podium
 * des openings, lui, est annoncé comme définitif et le reste.
 */
export async function DELETE(request: NextRequest) {
  // Passé l'échéance, un vote ne se retire plus : les totaux sont figés.
  if (votesClos()) {
    return NextResponse.json({ error: 'Les votes sont clos depuis le dimanche 25 octobre.', closed: true }, { status: 403 });
  }

  let body: { year?: unknown; category?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }

  const year = Number(body.year);
  if (!isKnownYear(year)) {
    return NextResponse.json({ error: 'Année inconnue.' }, { status: 400 });
  }
  if (body.category !== 'anime') {
    return NextResponse.json({ error: 'Seul le vote anime peut être annulé.' }, { status: 400 });
  }

  const voter = (await cookies()).get(COOKIE)?.value;
  if (!voter) {
    return NextResponse.json({ error: 'Aucun vote à annuler.' }, { status: 401 });
  }

  try {
    const removed = await removeAnimeBallot(voter, year);
    return NextResponse.json({ ok: true, removed });
  } catch (e) {
    console.error('[vote] échec annulation', e);
    return NextResponse.json({ error: 'L’annulation a échoué.' }, { status: 503 });
  }
}
