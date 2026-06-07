import Link from 'next/link';
import { groupStandings } from '@/lib/data/teams';

export const metadata = {
  title: 'Bracket | FIFA World Cup 2026',
};

export default function BracketPage() {
  // Get the top 2 from each group for R32
  const groupAdvancers = Object.entries(groupStandings).map(([group, standings]) => ({
    group,
    first: standings[0],
    second: standings[1],
  }));

  const R32matchups = [
    { home: '1A', away: '2B' }, { home: '1C', away: '2D' },
    { home: '1E', away: '2F' }, { home: '1G', away: '2H' },
    { home: '1I', away: '2J' }, { home: '1K', away: '2L' },
    { home: '1B', away: '2A' }, { home: '1D', away: '2C' },
    { home: '1F', away: '2E' }, { home: '1H', away: '2G' },
    { home: '1J', away: '2I' }, { home: '1L', away: '2K' },
    { home: 'B3rd', away: 'Best 3rd' }, { home: 'B3rd', away: 'Best 3rd' },
    { home: 'B3rd', away: 'Best 3rd' }, { home: 'B3rd', away: 'Best 3rd' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Bracket</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">🏆 Knockout Bracket</h1>
        <p style={{ color: '#8899AA' }}>Round of 32 · Round of 16 · Quarter-finals · Semi-finals · Final</p>
      </div>

      {/* Tournament Path */}
      <div className="mb-8 glass-card p-5">
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { stage: 'Group Stage', matches: 72, status: 'in-progress', color: '#00C853' },
            { stage: 'Round of 32', matches: 16, status: 'upcoming', color: 'var(--accent)' },
            { stage: 'Round of 16', matches: 8, status: 'upcoming', color: '#60A5FA' },
            { stage: 'Quarter-finals', matches: 4, status: 'upcoming', color: '#A78BFA' },
            { stage: 'Semi-finals', matches: 2, status: 'upcoming', color: '#F97316' },
            { stage: 'Final', matches: 1, status: 'upcoming', color: 'var(--accent)' },
          ].map((stage, i) => (
            <div key={stage.stage} className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-xs px-3 py-1.5 rounded-full mb-1 font-semibold" style={{ background: `${stage.color}15`, border: `1px solid ${stage.color}30`, color: stage.color }}>
                  {stage.status === 'in-progress' ? '🟢 Live' : '⏳ Upcoming'}
                </div>
                <div className="font-heading font-bold text-sm">{stage.stage}</div>
                <div className="text-xs" style={{ color: '#8899AA' }}>{stage.matches} match{stage.matches > 1 ? 'es' : ''}</div>
              </div>
              {i < 5 && <div className="text-xl" style={{ color: '#8899AA' }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Round of 32 */}
      <section className="mb-10">
        <h2 className="font-display text-3xl text-white mb-5">Round of 32</h2>
        <p className="text-sm mb-6" style={{ color: '#8899AA' }}>
          The 24 group winners (top 2 per group) + 8 best 3rd-place teams advance to the Round of 32.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {groupAdvancers.map(({ group, first, second }) => (
            <div key={group} className="glass-card p-4">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Group {group}</div>
              <div className="space-y-2">
                {[{ s: first, place: '1st' }, { s: second, place: '2nd' }].map(({ s, place }) => (
                  <Link key={s.team.id} href={`/teams/${s.team.slug}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ border: '1px solid rgba(0,200,83,0.15)', background: 'rgba(0,200,83,0.05)' }}>
                    <span className="text-xs font-mono" style={{ color: '#8899AA' }}>{place}</span>
                    <span className="text-xl">{s.team.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate">{s.team.shortName}</div>
                      <div className="text-xs" style={{ color: '#8899AA' }}>{s.points} pts</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Later rounds placeholder */}
      {['Round of 16', 'Quarter-finals', 'Semi-finals'].map(round => (
        <section key={round} className="mb-10">
          <h2 className="font-display text-3xl text-white mb-4">{round}</h2>
          <div className="glass-card p-8 text-center">
            <div className="text-5xl mb-3">🔒</div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">To Be Determined</h3>
            <p className="text-sm mb-4" style={{ color: '#8899AA' }}>
              {round} fixtures will be confirmed once the previous round is complete
            </p>
            <Link href="/simulator" className="inline-flex items-center gap-2 px-6 py-2 rounded-xl font-semibold text-sm transition-all" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent))', color: '#0a0e1a' }}>
              🎮 Simulate It Now →
            </Link>
          </div>
        </section>
      ))}

      {/* Final */}
      <section>
        <h2 className="font-display text-3xl text-white mb-4">🏆 Final</h2>
        <div className="glass-card p-8 text-center animate-glow">
          <div className="text-6xl mb-3">🏆</div>
          <h3 className="font-display text-4xl text-white mb-2">World Cup Final</h3>
          <p className="text-lg mb-1" style={{ color: 'var(--accent)' }}>July 19, 2026</p>
          <p className="text-sm mb-6" style={{ color: '#8899AA' }}>MetLife Stadium · East Rutherford, NJ</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center opacity-40">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-2" style={{ border: '2px dashed rgba(0,102,255,0.3)' }}>?</div>
              <div className="font-heading font-bold" style={{ color: '#8899AA' }}>TBD</div>
            </div>
            <div className="font-display text-5xl" style={{ color: 'var(--accent)' }}>VS</div>
            <div className="text-center opacity-40">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-2" style={{ border: '2px dashed rgba(0,102,255,0.3)' }}>?</div>
              <div className="font-heading font-bold" style={{ color: '#8899AA' }}>TBD</div>
            </div>
          </div>
          <Link href="/simulator" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold transition-all" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent))', color: '#0a0e1a' }}>
            🎮 Predict the Final →
          </Link>
        </div>
      </section>
    </div>
  );
}
