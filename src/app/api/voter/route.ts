/**
 * Identité du votant : pseudo et adresse mail, demandés une seule fois avant
 * le premier vote. C’est ici que naît le cookie qui identifie la personne.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { normalizeEmail, normalizePseudo } from '@/lib/voters';
import { getVoterIdentity, saveVoterIdentity } from '@/lib/voteStore';
import { sendWelcome } from '@/lib/mailer';
import { readSource, readVisitor } from '@/lib/visitor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COOKIE = 'retro_voter';
const ONE_YEAR = 60 * 60 * 24 * 365;

/** GET /api/voter — qui est ce visiteur, s’il s’est déjà présenté. */
export async function GET() {
  const voter = (await cookies()).get(COOKIE)?.value;
  if (!voter) return NextResponse.json({ voter: null });
  try {
    return NextResponse.json({ voter: await getVoterIdentity(voter) });
  } catch {
    return NextResponse.json({ voter: null });
  }
}

/** POST /api/voter { pseudo, email } */
export async function POST(request: NextRequest) {
  let body: { pseudo?: unknown; email?: unknown; referrer?: unknown; landing?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }

  const pseudo = normalizePseudo(body.pseudo);
  const email = normalizeEmail(body.email);
  if (!pseudo) {
    return NextResponse.json({ error: 'Ton pseudo doit faire entre 2 et 30 caractères.' }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: 'Cette adresse mail ne semble pas valide.' }, { status: 400 });
  }

  const jar = await cookies();
  const current = jar.get(COOKIE)?.value ?? crypto.randomUUID();

  const context = {
    ...readVisitor(request),
    source: readSource(body.referrer),
    landing: typeof body.landing === 'string' ? body.landing.slice(0, 120) : null,
  };

  let saved: { voter: string; returning: boolean };
  try {
    saved = await saveVoterIdentity(current, { pseudo, email }, context);
  } catch (e) {
    console.error('[voter] échec enregistrement', e);
    return NextResponse.json({ error: 'Impossible de t’inscrire pour le moment.' }, { status: 503 });
  }

  // Un mail qui ne part pas ne doit pas empêcher de voter.
  if (!saved.returning) {
    try {
      await sendWelcome(email, pseudo);
    } catch (e) {
      console.error('[voter] mail de bienvenue non envoyé', e);
    }
  }

  const response = NextResponse.json({
    ok: true,
    voter: { pseudo, email },
    returning: saved.returning,
  });
  response.cookies.set(COOKIE, saved.voter, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_YEAR,
  });
  return response;
}
