import Link from 'next/link';

export const metadata = {
  title: 'World Cup History | FIFA World Cup 2026',
};

const wcHistory = [
  { year: 1930, host: 'Uruguay', champion: 'Uruguay', runnerUp: 'Argentina', topScorer: 'Guillermo Stábile (8)', goals: 70, teams: 13, flag: '🇺🇾' },
  { year: 1934, host: 'Italy', champion: 'Italy', runnerUp: 'Czechoslovakia', topScorer: 'Oldřich Nejedlý (5)', goals: 70, teams: 16, flag: '🇮🇹' },
  { year: 1938, host: 'France', champion: 'Italy', runnerUp: 'Hungary', topScorer: 'Leônidas (7)', goals: 84, teams: 15, flag: '🇮🇹' },
  { year: 1950, host: 'Brazil', champion: 'Uruguay', runnerUp: 'Brazil', topScorer: 'Ademir (9)', goals: 88, teams: 13, flag: '🇺🇾' },
  { year: 1954, host: 'Switzerland', champion: 'West Germany', runnerUp: 'Hungary', topScorer: 'Sándor Kocsis (11)', goals: 140, teams: 16, flag: '🇩🇪' },
  { year: 1958, host: 'Sweden', champion: 'Brazil', runnerUp: 'Sweden', topScorer: 'Just Fontaine (13)', goals: 126, teams: 16, flag: '🇧🇷' },
  { year: 1962, host: 'Chile', champion: 'Brazil', runnerUp: 'Czechoslovakia', topScorer: 'Multiple (4)', goals: 89, teams: 16, flag: '🇧🇷' },
  { year: 1966, host: 'England', champion: 'England', runnerUp: 'West Germany', topScorer: 'Eusébio (9)', goals: 89, teams: 16, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { year: 1970, host: 'Mexico', champion: 'Brazil', runnerUp: 'Italy', topScorer: 'Gerd Müller (10)', goals: 95, teams: 16, flag: '🇧🇷' },
  { year: 1974, host: 'West Germany', champion: 'West Germany', runnerUp: 'Netherlands', topScorer: 'Grzegorz Lato (7)', goals: 97, teams: 16, flag: '🇩🇪' },
  { year: 1978, host: 'Argentina', champion: 'Argentina', runnerUp: 'Netherlands', topScorer: 'Mario Kempes (6)', goals: 102, teams: 16, flag: '🇦🇷' },
  { year: 1982, host: 'Spain', champion: 'Italy', runnerUp: 'West Germany', topScorer: 'Paolo Rossi (6)', goals: 146, teams: 24, flag: '🇮🇹' },
  { year: 1986, host: 'Mexico', champion: 'Argentina', runnerUp: 'West Germany', topScorer: 'Gary Lineker (6)', goals: 132, teams: 24, flag: '🇦🇷' },
  { year: 1990, host: 'Italy', champion: 'West Germany', runnerUp: 'Argentina', topScorer: 'Salvatore Schillaci (6)', goals: 115, teams: 24, flag: '🇩🇪' },
  { year: 1994, host: 'USA', champion: 'Brazil', runnerUp: 'Italy', topScorer: 'Oleg Salenko (6)', goals: 141, teams: 24, flag: '🇧🇷' },
  { year: 1998, host: 'France', champion: 'France', runnerUp: 'Brazil', topScorer: 'Davor Šuker (6)', goals: 171, teams: 32, flag: '🇫🇷' },
  { year: 2002, host: 'South Korea/Japan', champion: 'Brazil', runnerUp: 'Germany', topScorer: 'Ronaldo (8)', goals: 161, teams: 32, flag: '🇧🇷' },
  { year: 2006, host: 'Germany', champion: 'Italy', runnerUp: 'France', topScorer: 'Miroslav Klose (5)', goals: 147, teams: 32, flag: '🇮🇹' },
  { year: 2010, host: 'South Africa', champion: 'Spain', runnerUp: 'Netherlands', topScorer: 'Thomas Müller (5)', goals: 145, teams: 32, flag: '🇪🇸' },
  { year: 2014, host: 'Brazil', champion: 'Germany', runnerUp: 'Argentina', topScorer: 'James Rodríguez (6)', goals: 171, teams: 32, flag: '🇩🇪' },
  { year: 2018, host: 'Russia', champion: 'France', runnerUp: 'Croatia', topScorer: 'Harry Kane (6)', goals: 169, teams: 32, flag: '🇫🇷' },
  { year: 2022, host: 'Qatar', champion: 'Argentina', runnerUp: 'France', topScorer: 'Kylian Mbappé (8)', goals: 172, teams: 32, flag: '🇦🇷' },
];

const titleCounts = [
  { country: 'Brazil', titles: 5, flag: '🇧🇷', years: [1958, 1962, 1970, 1994, 2002] },
  { country: 'Germany', titles: 4, flag: '🇩🇪', years: [1954, 1974, 1990, 2014] },
  { country: 'Italy', titles: 4, flag: '🇮🇹', years: [1934, 1938, 1982, 2006] },
  { country: 'Argentina', titles: 3, flag: '🇦🇷', years: [1978, 1986, 2022] },
  { country: 'France', titles: 2, flag: '🇫🇷', years: [1998, 2018] },
  { country: 'Uruguay', titles: 2, flag: '🇺🇾', years: [1930, 1950] },
  { country: 'England', titles: 1, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', years: [1966] },
  { country: 'Spain', titles: 1, flag: '🇪🇸', years: [2010] },
];

export default function HistoryPage() {
  // Overview figures derive from the data below so they're always accurate.
  const editions = wcHistory.length;
  const totalGoals = wcHistory.reduce((sum, wc) => sum + wc.goals, 0);
  const champions = titleCounts.length;
  const yearsOfHistory = 2026 - wcHistory[0].year;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>History</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">📜 World Cup History</h1>
        <p style={{ color: '#8899AA' }}>{yearsOfHistory} years of football&apos;s greatest tournament · {editions} editions · {champions} champions</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Editions', value: String(editions), color: 'var(--accent)' },
          { label: 'Total Goals', value: totalGoals.toLocaleString(), color: '#60A5FA' },
          { label: 'Different Champions', value: String(champions), color: '#34D399' },
          { label: 'Years of History', value: String(yearsOfHistory), color: '#F97316' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 text-center">
            <div className="font-display text-4xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold tracking-widest uppercase mt-1" style={{ color: '#8899AA' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main table */}
        <div className="xl:col-span-2">
          <div className="glass-card overflow-hidden">
            <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-display text-2xl text-white">All-Time Champions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full standings-table">
                <thead>
                  <tr>
                    <th className="text-left">Year</th>
                    <th className="text-left">Host</th>
                    <th className="text-left">Champion</th>
                    <th className="text-left hidden md:table-cell">Runner-Up</th>
                    <th className="hidden lg:table-cell">Goals</th>
                    <th className="hidden lg:table-cell">Teams</th>
                  </tr>
                </thead>
                <tbody>
                  {[...wcHistory].reverse().map(wc => (
                    <tr key={wc.year}>
                      <td className="font-mono font-bold" style={{ color: 'var(--accent)' }}>{wc.year}</td>
                      <td className="text-sm" style={{ color: '#8899AA' }}>{wc.host}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span>{wc.flag}</span>
                          <span className="font-semibold text-sm">{wc.champion}</span>
                        </div>
                      </td>
                      <td className="text-sm hidden md:table-cell" style={{ color: '#8899AA' }}>{wc.runnerUp}</td>
                      <td className="text-center hidden lg:table-cell text-sm">{wc.goals}</td>
                      <td className="text-center hidden lg:table-cell text-sm">{wc.teams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Champions */}
          <div className="glass-card overflow-hidden">
            <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-display text-xl text-white">🏆 Title Holders</h2>
            </div>
            <div>
              {titleCounts.map((c, i) => (
                <div key={c.country} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="w-5 text-center font-mono text-xs" style={{ color: '#8899AA' }}>{i + 1}</span>
                  <span className="text-2xl">{c.flag}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{c.country}</div>
                    <div className="text-xs" style={{ color: '#8899AA' }}>{c.years.join(', ')}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {'🏆'.repeat(Math.min(c.titles, 5))}
                    {c.titles > 5 && <span className="font-bold text-xs">×{c.titles}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Records */}
          <div className="glass-card p-5">
            <h3 className="font-display text-xl text-white mb-4">All-Time Records</h3>
            <div className="space-y-3">
              {[
                { label: 'Top WC Scorer', value: 'Miroslav Klose (16)', icon: '⚽' },
                { label: 'Most WC Finals', value: 'Germany (8)', icon: '🏆' },
                { label: 'Biggest Victory', value: 'Hungary 10-1 El Salvador', icon: '📊' },
                { label: 'Fastest Goal', value: '11s (Hakan Şükür, 2002)', icon: '⚡' },
                { label: 'Most Titles', value: 'Brazil (5)', icon: '🇧🇷' },
                { label: 'Most Appearances', value: 'Lothar Matthäus (25)', icon: '👤' },
              ].map(r => (
                <div key={r.label} className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{r.icon}</span>
                  <div>
                    <div className="text-xs" style={{ color: '#8899AA' }}>{r.label}</div>
                    <div className="font-semibold text-sm">{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WC 2026 context */}
          <div className="glass-card p-5" style={{ borderTop: '2px solid rgba(0,102,255,0.4)' }}>
            <h3 className="font-display text-xl text-white mb-3">WC 2026 History</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8899AA' }}>
              For the first time, <strong className="text-white">48 teams</strong> compete across <strong className="text-white">3 host nations</strong>. A win for Argentina would equal Germany&apos;s record of 4 titles. France would make it 3. Brazil could become the first nation with 6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
