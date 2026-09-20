/**
 * Récapitulatif des votes d’un visiteur : à l’écran, et par mail sur demande.
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nominees } from '@/data/nominees';
import { getVoterBallots, getVoterIdentity } from '@/lib/voteStore';
import { sendRecap, isMailConfigured, type RecapYear } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COOKIE = 'retro_voter';
/** Un envoi par minute : de quoi renvoyer un récap, pas d’inonder une boîte. */
const COOLDOWN = 60 * 1000;
const lastSent = new Map<string, number>();

export type RecapEntry = {
  year: number;
  anime: { id: string; label: string; image: string } | null;
  podium: { id: string; label: string; sub: string; image: string }[];
};

/** Les bulletins ne gardent que des identifiants : on retrouve ici les titres. */
async function collect(voter: string): Promise<RecapEntry[]> {
  const ballots = await getVoterBallots(voter);
  return ballots.map((ballot) => {
    const year = nominees[ballot.year];
    const anime = ballot.anime ? year?.animes.find((a) => a.id === ballot.anime) : undefined;
    return {
      year: ballot.year,
      anime: ballot.anime
        ? { id: ballot.anime, label: anime?.name ?? ballot.anime, image: anime?.image ?? '' }
        : null,
      podium: (ballot.podium ?? []).map((id) => {
        const opening = year?.openings.find((o) => o.id === id);
        return {
          id,
          label: opening?.openingTitle ?? id,
          sub: opening?.animeName ?? '',
          image: opening?.image ?? '',
        };
      }),
    };
  });
}

const forMail = (entries: RecapEntry[]): RecapYear[] =>
  entries.map((entry) => ({
    year: entry.year,
    anime: entry.anime?.label ?? null,
    podium: entry.podium.map((p) => `${p.sub} — ${p.label}`),
  }));

/** GET /api/voter/recap — tout ce que ce visiteur a voté. */
export async function GET() {
  const voter = (await cookies()).get(COOKIE)?.value;
  if (!voter) return NextResponse.json({ voter: null, years: [], mail: isMailConfigured() });
  try {
    const [identity, years] = await Promise.all([getVoterIdentity(voter), collect(voter)]);
    return NextResponse.json({ voter: identity, years, mail: isMailConfigured() });
  } catch (e) {
    console.error('[recap] lecture impossible', e);
    return NextResponse.json({ error: 'Récapitulatif indisponible.' }, { status: 503 });
  }
}

/** POST /api/voter/recap — envoie ce récapitulatif par mail. */
export async function POST() {
  const voter = (await cookies()).get(COOKIE)?.value;
  if (!voter) {
    return NextResponse.json({ error: 'Tu n’as pas encore voté.', needIdentity: true }, { status: 401 });
  }
  if (!isMailConfigured()) {
    return NextResponse.json({ error: 'L’envoi de mails n’est pas activé.' }, { status: 503 });
  }

  const previous = lastSent.get(voter) ?? 0;
  if (Date.now() - previous < COOLDOWN) {
    return NextResponse.json({ error: 'Récap déjà envoyé, regarde tes mails.' }, { status: 429 });
  }

  try {
    const identity = await getVoterIdentity(voter);
    if (!identity) {
      return NextResponse.json({ error: 'Tu n’as pas encore voté.', needIdentity: true }, { status: 401 });
    }
    const entries = await collect(voter);
    if (!entries.length) {
      return NextResponse.json({ error: 'Il n’y a encore rien à récapituler.' }, { status: 400 });
    }
    await sendRecap(identity.email, identity.pseudo, forMail(entries));
    lastSent.set(voter, Date.now());
    return NextResponse.json({ ok: true, email: identity.email });
  } catch (e) {
    console.error('[recap] envoi impossible', e);
    return NextResponse.json({ error: 'Le mail n’a pas pu partir.' }, { status: 503 });
  }
}
