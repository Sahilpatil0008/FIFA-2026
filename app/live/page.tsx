import { matches, getLiveMatches, getRecentMatches, getUpcomingMatches } from '@/lib/data/matches';
import MatchCard from '@/components/MatchCard';

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
        <p style={{ color: '#8899AA' }}>Real-time match scores, results and upcoming fixtures · Auto-refreshes every 30s</p>
      </div>

      {/* Live Matches */}
      {live.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="live-badge">
              <span className="live-dot" />
              LIVE NOW
            </div>
            <span className="text-sm" style={{ color: '#8899AA' }}>{live.length} match{live.length !== 1 ? 'es' : ''} in progress</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {live.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {live.length === 0 && (
        <div className="glass-card p-10 text-center mb-10">
          <div className="text-5xl mb-4">⏸</div>
          <h2 className="font-display text-2xl text-white mb-2">No Live Matches</h2>
          <p style={{ color: '#8899AA' }}>Check back during match windows for live scores</p>
          <div className="text-sm mt-3" style={{ color: 'var(--accent)' }}>Next matches: {upcoming[0] ? new Date(upcoming[0].kickoff).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'TBD'}</div>
        </div>
      )}

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
