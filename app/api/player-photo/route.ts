import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Cache photo lookups for a day — player headshots don't change.
export const revalidate = 86400;

interface WikiThumbnail {
  source?: string;
}
interface WikiPage {
  thumbnail?: WikiThumbnail;
}
interface WikiResponse {
  query?: { pages?: Record<string, WikiPage> };
}

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name')?.trim();
  if (!name) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  const api =
    'https://en.wikipedia.org/w/api.php' +
    '?action=query&format=json&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=320' +
    `&titles=${encodeURIComponent(name)}`;

  try {
    const res = await fetch(api, {
      headers: { 'User-Agent': 'WorldCup2026App/1.0 (educational project)' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Wikipedia responded ${res.status}`);

    const data: WikiResponse = await res.json();
    const pages = data.query?.pages ?? {};
    const first = Object.values(pages)[0];
    const url = first?.thumbnail?.source ?? null;

    return NextResponse.json(
      { url },
      { headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' } },
    );
  } catch (error) {
    console.error('player-photo lookup failed:', error);
    // Never error out the client — it falls back to a silhouette.
    return NextResponse.json({ url: null });
  }
}
