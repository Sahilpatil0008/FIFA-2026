import { NextRequest, NextResponse } from 'next/server';
import type { Match } from '@/lib/data/matches';

// TEMPORARY: pointed at the Premier League to verify live updates flow end-to-end.
// Revert COMPETITION to 'WC' (and drop the ?status override) once verified.
const COMPETITION = 'PL';

export const runtime = 'nodejs';
// Must stay dynamic: this is live data that changes minute-to-minute. Marking the
// route cacheable would let Netlify's CDN serve a stale snapshot. force-dynamic +
// no-store keeps every poll fresh; the upstream football-data fetch uses no-store
// too so we never hand back a cached scoreline.
export const dynamic = 'force-dynamic';

// Shape of the relevant fields from football-data.org v4 /matches.
interface FDTeam {
  id: number;
  name: string;
  crest?: string;
}
interface FDScorePair {
  home: number | null;
  away: number | null;
}
interface FDMatch {
  id: number;
  utcDate: string;
  status: string;
  stage?: string;
  group?: string | null;
  minute?: number | null;
  venue?: string | null;
  homeTeam: FDTeam;
  awayTeam: FDTeam;
  score: { fullTime: FDScorePair; halfTime: FDScorePair };
}
interface FDResponse {
  matches?: FDMatch[];
}

// football-data uses IN_PLAY / PAUSED for in-progress games; collapse those into
// the app's own 'LIVE' status so <MatchCard> renders them with the live badge.
function mapStatus(status: string): Match['status'] {
  if (status === 'IN_PLAY' || status === 'PAUSED') return 'LIVE';
  if (status === 'FINISHED' || status === 'AWARDED') return 'FINISHED';
  return 'SCHEDULED';
}

function mapMatch(m: FDMatch): Match {
  const group = m.group ? m.group.replace(/^GROUP[_\s]?/i, '') : undefined;
  return {
    id: String(m.id),
    homeTeamId: String(m.homeTeam.id),
    awayTeamId: String(m.awayTeam.id),
    homeTeamName: m.homeTeam.name,
    awayTeamName: m.awayTeam.name,
    // The feed gives crest image URLs, not emoji; fall back to a neutral glyph.
    homeTeamFlag: '⚽',
    awayTeamFlag: '⚽',
    homeScore: m.score.fullTime.home,
    awayScore: m.score.fullTime.away,
    htHomeScore: m.score.halfTime.home,
    htAwayScore: m.score.halfTime.away,
    kickoff: m.utcDate,
    stage: m.stage ?? '',
    group,
    venueId: '',
    venueName: m.venue ?? '',
    venueCity: '',
    status: mapStatus(m.status),
    minute: m.minute ?? undefined,
  };
}

export async function GET(request: NextRequest) {
  const token = process.env.FOOTBALL_DATA_API_KEY;
  if (!token) {
    return NextResponse.json(
      { matches: [], error: 'FOOTBALL_DATA_API_KEY not configured' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }

  // TEMPORARY: allow ?status= to prove real scores flow even if nothing is
  // in-play this instant. Defaults to LIVE (the real behavior).
  const status = request.nextUrl.searchParams.get('status') ?? 'LIVE';

  try {
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${COMPETITION}/matches?status=${status}`,
      { headers: { 'X-Auth-Token': token }, cache: 'no-store' },
    );

    if (!res.ok) {
      // Surface the upstream status but never 500 the client — the live section
      // just keeps showing whatever it had.
      return NextResponse.json(
        { matches: [], error: `football-data responded ${res.status}` },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const data: FDResponse = await res.json();
    const mapped = (data.matches ?? []).map(mapMatch);
    // Default LIVE behavior still only surfaces in-play games to the UI.
    const matches = status === 'LIVE' ? mapped.filter((m) => m.status === 'LIVE') : mapped;

    return NextResponse.json(
      { matches, count: matches.length, competition: COMPETITION, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('live-scores fetch failed:', error);
    return NextResponse.json(
      { matches: [], error: 'fetch failed' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
