import { teams } from '@/lib/data/teams';
import TeamsDirectory from '@/components/TeamsDirectory';

export const metadata = {
  title: 'All 48 Teams | FIFA World Cup 2026',
};

export default function TeamsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Teams</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">{teams.length} Nations</h1>
        <p style={{ color: '#8899AA' }}>Tap any team to see its full 26-player squad</p>
      </div>

      {/* By Confederation — click a team to open its squad modal */}
      <TeamsDirectory teams={teams} />

      {/* Stats section — all derived from team data */}
      <div className="glass-card p-6 mt-8">
        <h2 className="font-display text-2xl text-white mb-4">Tournament by Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Teams', value: String(teams.length) },
            { label: 'Debutants', value: String(teams.filter(t => t.wcAppearances === 1).length) },
            { label: 'WC Titles Among Teams', value: String(teams.reduce((s, t) => s + t.wcTitles, 0)) },
            { label: 'Total WC Appearances', value: String(teams.reduce((s, t) => s + t.wcAppearances, 0)) },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="font-display text-4xl" style={{ color: 'var(--accent)' }}>{item.value}</div>
              <div className="text-sm mt-1" style={{ color: '#8899AA' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
