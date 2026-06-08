import { getLiveMatches, getRecentMatches, getUpcomingMatches } from '@/lib/data/matches';
import MatchCard from '@/components/MatchCard';
import LiveScores from '@/components/LiveScores';

export const metadata = {
  title: 'Live Scores | FIFA World Cup 2026',
};

export default function LivePage() {
  const live = getLiveMatches();
  const recent = getRecentMatches();
  const upcoming = getUpcomingMatches();

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="live-badge">
            <span className="live-dot" />
            LIVE
          </span>
          <h1 className="font-display text-5xl text-white">Scores</h1>
        </div>
        <p style={{ color: '#8899AA' }}>Real-time match scores, results and upcoming fixtures · Auto-refreshes every 60s</p>
      </div>

      {/* Live Matches — client component polls the football-data API every 60s */}
      <LiveScores initialLive={live} nextKickoff={upcoming[0]?.kickoff} />

      {/* Recent Results */}
      <section className="mb-10">
        <h2 className="font-display text-3xl text-white mb-4">Recent Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </section>

      {/* Upcoming */}
      <section>
        <h2 className="font-display text-3xl text-white mb-4">Upcoming Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </section>
    </div>
  );
}
