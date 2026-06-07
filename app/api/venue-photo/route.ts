import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Stadium photos don't change — cache lookups for a day.
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

interface SummaryResponse {
  thumbnail?: { source?: string };
  originalimage?: { source?: string };
}

// REST summary fallback — returns the article's lead image (preferring the
// larger ~800px thumbnail) for pages that lack a pageimage.
async function fetchSummaryImage(title: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`,
      { headers: { 'User-Agent': 'WorldCup2026App/1.0 (educational project)' }, next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data: SummaryResponse = await res.json();
    return data.thumbnail?.source ?? data.originalimage?.source ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')?.trim();
  if (!title) {
    return NextResponse.json({ url: null }, { status: 400 });
  }

  const api =
    'https://en.wikipedia.org/w/api.php' +
    '?action=query&format=json&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=800' +
    `&titles=${encodeURIComponent(title)}`;

  try {
    const res = await fetch(api, {
      headers: { 'User-Agent': 'WorldCup2026App/1.0 (educational project)' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Wikipedia responded ${res.status}`);

    const data: WikiResponse = await res.json();
    const pages = data.query?.pages ?? {};
    const first = Object.values(pages)[0];
    let url = first?.thumbnail?.source ?? null;

    // Some stadium articles don't expose a "pageimage"; fall back to the REST
    // summary endpoint, which surfaces the lead image for those pages.
    if (!url) {
      url = await fetchSummaryImage(title);
    }

    return NextResponse.json(
      { url },
      { headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' } },
    );
  } catch (error) {
    console.error('venue-photo lookup failed:', error);
    // Never error the client — it falls back to an SVG stadium graphic.
    return NextResponse.json({ url: null });
  }
}
