import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Must stay dynamic: the response depends on the ?name query param. Marking the
// route cacheable (revalidate/segment cache) makes Netlify's CDN key its cache
// without the `name` param, so the first player's photo gets served for every
// name. force-dynamic + no-store below keeps each request per-name correct; the
// upstream Wikipedia fetch is still cached per-URL, so it stays efficient.
export const dynamic = 'force-dynamic';

interface WikiThumbnail {
  source?: string;
}
interface WikiPage {
  thumbnail?: WikiThumbnail;
  missing?: string;
}
interface WikiResponse {
  query?: { pages?: Record<string, WikiPage> };
}

/**
 * Look up a single Wikipedia page image by exact title.
 * Returns the thumbnail URL, or null if the page is missing / has no image.
 * `redirects=1` follows redirects so e.g. "Pedri" → "Pedro González López".
 */
async function lookup(title: string): Promise<string | null> {
  const api =
    'https://en.wikipedia.org/w/api.php' +
    '?action=query&format=json&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=320' +
    `&titles=${encodeURIComponent(title)}`;

  const res = await fetch(api, {
    headers: { 'User-Agent': 'WorldCup2026App/1.0 (educational project)' },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Wikipedia responded ${res.status}`);

  const data: WikiResponse = await res.json();
  const pages = data.query?.pages ?? {};
  const first = Object.values(pages)[0];
  // A missing page has `missing: ""` and no thumbnail.
  if (!first || first.missing !== undefined) return null;
  return first.thumbnail?.source ?? null;
}

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name')?.trim();
  if (!name) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  try {
    // Try the exact name first, then the "(footballer)" disambiguation, which
    // catches players whose plain title is a disambiguation page or a namesake.
    const url = (await lookup(name)) ?? (await lookup(`${name} (footballer)`));

    return NextResponse.json(
      { url },
      // no-store so the CDN never serves one player's photo for another's name.
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('player-photo lookup failed:', error);
    // Never error out the client — it falls back to an initials avatar.
    return NextResponse.json({ url: null });
  }
}
