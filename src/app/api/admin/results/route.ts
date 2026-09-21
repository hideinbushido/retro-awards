/**
 * Résultats — réservés à l’admin.
 *
 * Les totaux ne sont jamais exposés publiquement : cette route exige le mot de
 * passe admin, qui reste côté serveur (ADMIN_PASSWORD, sans NEXT_PUBLIC_).
 */
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { nominees } from '@/data/nominees';
import { YEARS } from '@/lib/firestore';
import { getTallies, isMemoryMode, listBallots, listVoters } from '@/lib/voteStore';
import { listAllComments } from '@/lib/commentStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Mot de passe de secours en local uniquement, jamais en production. */
function expectedPassword(): string | null {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.NODE_ENV === 'production' ? null : 'retro2025';
}

function passwordOk(given: unknown): boolean {
  const expected = expectedPassword();
  if (!expected || typeof given !== 'string') return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }
  if (!passwordOk(body.password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  let tallies;
  let voters;
  let comments;
  let ballots;
  try {
    [tallies, voters, comments, ballots] = await Promise.all([
      getTallies(YEARS),
      listVoters(),
      listAllComments(),
      listBallots(),
    ]);
  } catch (e) {
    console.error('[results] stockage indisponible', e);
    return NextResponse.json({ error: 'Résultats indisponibles.' }, { status: 503 });
  }

  const years = YEARS.map((year, i) => {
    const tally = tallies[i];
    const yearData = nominees[year] ?? { openings: [], animes: [] };
    return {
      year,
      openingBallots: tally.openingBallots,
      animeBallots: tally.animeBallots,
      openings: yearData.openings
        .map((o) => ({
          id: o.id,
          label: `${o.animeName} — ${o.openingTitle}`,
          points: tally.openings[o.id] ?? 0,
        }))
        .sort((a, b) => b.points - a.points),
      animes: yearData.animes
        .map((a) => ({ id: a.id, label: a.name, votes: tally.animes[a.id] ?? 0 }))
        .sort((a, b) => b.votes - a.votes),
    };
  });

  return NextResponse.json({
    years,
    voters,
    ballots,
    comments: comments.map((c) => ({
      id: c.id,
      scope: c.scope,
      author: c.author,
      text: c.text,
      media: c.media,
      isReply: Boolean(c.parentId),
      createdAt: c.createdAt,
    })),
    memory: isMemoryMode(),
  });
}
