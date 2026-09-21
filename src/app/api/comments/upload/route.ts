/**
 * Envoi de photos et de vidéos pour les commentaires.
 *
 * Le fichier ne transite pas par ce serveur : le navigateur l'envoie
 * directement à Vercel Blob, avec un jeton délivré ici. C'est ce qui permet
 * d'accepter des vidéos — une fonction Vercel refuse les corps de plus de
 * 4,5 Mo. Le jeton n'est remis qu'aux personnes inscrites, et fixe lui-même
 * le type et la taille autorisés.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getVoterIdentity } from '@/lib/voteStore';
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  UPLOAD_FOLDER,
  VIDEO_TYPES,
  uploadsEnabled,
} from '@/lib/media';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COOKIE = 'retro_voter';
/** Dix envois par tranche de dix minutes et par personne. */
const FENETRE = 10 * 60 * 1000;
const MAX_ENVOIS = 10;
const envois = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  if (!uploadsEnabled()) {
    return NextResponse.json({ error: 'L’envoi de fichiers n’est pas activé.' }, { status: 503 });
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'Requête illisible.' }, { status: 400 });
  }

  // Seule la demande de jeton vient du navigateur ; l'avis de fin d'envoi
  // vient de Vercel, sans cookie, et n'a pas à être identifié.
  let voter: string | null = null;
  if (body.type === 'blob.generate-client-token') {
    voter = (await cookies()).get(COOKIE)?.value ?? null;
    const identity = voter ? await getVoterIdentity(voter).catch(() => null) : null;
    if (!voter || !identity) {
      return NextResponse.json(
        { error: 'Indique ton pseudo et ton adresse mail avant d’envoyer un fichier.', needIdentity: true },
        { status: 401 },
      );
    }

    const maintenant = Date.now();
    const recents = (envois.get(voter) ?? []).filter((t) => maintenant - t < FENETRE);
    if (recents.length >= MAX_ENVOIS) {
      return NextResponse.json({ error: 'Trop d’envois d’un coup — réessaie dans quelques minutes.' }, { status: 429 });
    }
    envois.set(voter, [...recents, maintenant]);
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!pathname.startsWith(`${UPLOAD_FOLDER}/`)) throw new Error('Dossier refusé.');
        const video = clientPayload === 'video';
        return {
          allowedContentTypes: video ? VIDEO_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: video ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error('[upload] jeton refusé', e);
    return NextResponse.json({ error: 'Envoi refusé.' }, { status: 400 });
  }
}
