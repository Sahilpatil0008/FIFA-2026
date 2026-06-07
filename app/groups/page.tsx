import Link from 'next/link';
import { groups, groupStandings } from '@/lib/data/teams';

export const metadata = {
  title: 'Groups | FIFA World Cup 2026',
  description: 'All 12 group standings for FIFA World Cup 2026',
};

export default function GroupsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Groups</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">Group Stage</h1>
        <p style={{ color: '#8899AA' }}>12 groups · 48 teams · Top 2 from each group + 8 best 3rd-place teams advance</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-xl" style={{ background: 'rgba(13,27,62,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(0,200,83,0.5)' }} />
          <span style={{ color: '#8899AA' }}>Advance (Top 2)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(255,179,0,0.4)' }} />
          <span style={{ color: '#8899AA' }}>Possible (Best 3rd)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(255,61,0,0.3)' }} />
          <span style={{ color: '#8899AA' }}>Eliminated</span>
        </div>
        <div className="ml-auto text-xs" style={{ color: '#8899AA' }}>P = Played · W/D/L · GF/GA · GD · Pts</div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map(group => {
          const standings = groupStandings[group];
          return (
            <div key={group} className="glass-card overflow-hidden">
              {/* Group Header */}
              <div className="flex items-center justify-between p-4 pb-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <div className="font-display text-5xl" style={{ color: 'var(--accent)', lineHeight: 1 }}>
                    {group}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-white">Group {group}</div>
                    <div className="flex gap-1 mt-1">
                      {standings.map(s => (
                        <span key={s.team.id} className="text-sm" title={s.team.name}>{s.team.flag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={`/groups/${group}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90" style={{ border: '1px solid rgba(0,102,255,0.3)', color: 'var(--accent)' }}>
                  Details →
                </Link>
              </div>

              {/* Table */}
              <div className="p-4">
                <table className="w-full standings-table">
                  <thead>
                    <tr>
                      <th className="text-left w-6">#</th>
                      <th className="text-left">Team</th>
                      <th>P</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>GD</th>
                      <th style={{ color: 'var(--accent)' }}>Pts</th>
                      <th>Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((s, idx) => (
                      <tr key={s.team.id} className={idx < 2 ? 'zone-advance' : idx === 2 ? 'zone-possible' : 'zone-eliminated'}>
                        <td className="text-xs font-mono" style={{ color: '#8899AA' }}>{idx + 1}</td>
                        <td>
                          <Link href={`/teams/${s.team.slug}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <span className="text-lg">{s.team.flag}</span>
                            <span className="font-semibold text-sm">{s.team.shortName}</span>
                          </Link>
                        </td>
                        <td className="text-center text-xs">{s.played}</td>
                        <td className="text-center text-xs">{s.won}</td>
                        <td className="text-center text-xs">{s.drawn}</td>
                        <td className="text-center text-xs">{s.lost}</td>
                        <td className="text-center text-xs font-mono" style={{ color: s.goalDiff > 0 ? '#00C853' : s.goalDiff < 0 ? '#FF3D00' : '#8899AA' }}>
                          {s.goalDiff > 0 ? '+' : ''}{s.goalDiff}
                        </td>
                        <td className="text-center font-bold" style={{ color: 'var(--accent)' }}>{s.points}</td>
                        <td>
                          <div className="flex gap-0.5 justify-center">
                            {s.form.map((r, i) => (
                              <span key={i} className={`form-badge form-badge-${r}`}>{r}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
