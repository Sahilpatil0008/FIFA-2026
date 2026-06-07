import { matches, stageLabels } from '@/lib/data/matches';
import MatchCard from '@/components/MatchCard';

export const metadata = {
  title: 'Schedule | FIFA World Cup 2026',
};

export default function SchedulePage() {
  const grouped = matches.reduce<Record<string, typeof matches>>((acc, m) => {
    const date = m.kickoff.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(m);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Schedule</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">Match Schedule</h1>
        <p style={{ color: '#8899AA' }}>104 matches · June 11 – July 19, 2026 · USA, Canada & Mexico</p>
      </div>

      {/* Stage filter indicators */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[['GROUP', 'Group Stage', 'var(--accent)'], ['Upcoming', 'Upcoming', '#60A5FA'], ['FT', 'Finished', '#00C853']].map(([type, label, color]) => (
          <div key={type} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
            {label}
          </div>
        ))}
      </div>

      {/* Matches by date */}
      <div className="space-y-10">
        {sortedDates.map(date => {
          const dayMatches = grouped[date];
          const dateObj = new Date(date + 'T12:00:00');
          const today = new Date().toISOString().split('T')[0];
          const isToday = date === today;

          return (
            <section key={date}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl ${isToday ? 'animate-glow' : ''}`} style={{ background: isToday ? 'rgba(0,102,255,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isToday ? 'rgba(0,102,255,0.4)' : 'rgba(255,255,255,0.08)'}` }}>
                  <span className="font-display text-xl" style={{ color: isToday ? 'var(--accent)' : 'white' }}>
                    {dateObj.getDate()}
                  </span>
                  <span className="text-xs" style={{ color: '#8899AA' }}>
                    {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-white">
                    {isToday && <span className="mr-2" style={{ color: '#FF1744' }}>TODAY</span>}
                    {dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h2>
                  <p className="text-xs" style={{ color: '#8899AA' }}>{dayMatches.length} match{dayMatches.length !== 1 ? 'es' : ''}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
