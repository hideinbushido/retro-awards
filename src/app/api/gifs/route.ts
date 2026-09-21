/**
 * Recherche de GIF et de stickers, relayée vers GIPHY.
 *
 * Passer par ici garde la clé côté serveur et impose un filtre de contenu
 * (pg-13) que le navigateur ne peut pas lever.
 */
import { NextRequest, NextResponse } from 'next/server';
import { gifsEnabled } from '@/lib/media';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type GiphyImage = { url?: string; width?: string; height?: string };
type GiphyItem = {
  id: string;
  title?: string;
  images?: { fixed_width?: GiphyImage; fixed_width_small?: GiphyImage };
};

/** GET /api/gifs?type=gifs|stickers&q=naruto — sans q, les tendances. */
export async function GET(request: NextRequest) {
  if (!gifsEnabled()) {
    return NextResponse.json({ error: 'Les GIF ne sont pas activés.', disabled: true }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const type = params.get('type') === 'stickers' ? 'stickers' : 'gifs';
  const q = (params.get('q') ?? '').trim().slice(0, 50);

  const url = new URL(`https://api.giphy.com/v1/${type}/${q ? 'search' : 'trending'}`);
  url.searchParams.set('api_key', process.env.GIPHY_API_KEY as string);
  url.searchParams.set('limit', '24');
  url.searchParams.set('rating', 'pg-13');
  if (q) {
    url.searchParams.set('q', q);
    url.searchParams.set('lang', 'fr');
  }

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`GIPHY ${res.status}`);
    const data = (await res.json()) as { data?: GiphyItem[] };

    const results = (data.data ?? [])
      .map((item) => {
        const full = item.images?.fixed_width;
        const small = item.images?.fixed_width_small ?? full;
        if (!full?.url) return null;
        return {
          id: item.id,
          title: item.title ?? '',
          url: full.url,
          preview: small?.url ?? full.url,
          width: Number(full.width) || undefined,
          height: Number(full.height) || undefined,
        };
      })
      .filter(Boolean);

    return NextResponse.json(
      { results },
      { headers: { 'Cache-Control': 'public, max-age=120' } },
    );
  } catch (e) {
    console.error('[gifs] GIPHY injoignable', e);
    return NextResponse.json({ error: 'Recherche indisponible pour le moment.', results: [] }, { status: 502 });
  }
}
