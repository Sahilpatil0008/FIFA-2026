import Link from 'next/link';
import { notFound } from 'next/navigation';
import { groupStandings, groups } from '@/lib/data/teams';
import { getMatchesByGroup } from '@/lib/data/matches';
import MatchCard from '@/components/MatchCard';

interface Props {
  params: Promise<{ group: string }>;
}

export function generateStaticParams() {
  return groups.map(g => ({ group: g }));
}

export default async function GroupPage({ params }: Props) {
  const { group } = await params;
  const groupUpper = group.toUpperCase();

  if (!groups.includes(groupUpper)) notFound();

  const standings = groupStandings[groupUpper];
  const groupMatches = getMatchesByGroup(groupUpper);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#8899AA' }}>
        <Link href="/groups" className="hover:text-white transition-colors">Groups</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>Group {groupUpper}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-6 mb-10">
        <div className="font-display text-[100px] leading-none" style={{ color: 'var(--accent)', opacity: 0.9 }}>
          {groupUpper}
        </div>
        <div>
          <h1 className="font-display text-5xl text-white mb-2">Group {groupUpper}</h1>
          <div className="flex gap-2 flex-wrap">
            {standings.map(s => (
              <div key={s.team.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span>{s.team.flag}</span>
                <span>{s.team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Standings Table (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card overflow-hidden">
            <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-display text-2xl text-white">Standings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full standings-table">
                <thead>
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th style={{ color: 'var(--accent)' }}>Pts</th>
                    <th>Form</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s, idx) => (
                    <tr key={s.team.id} className={idx < 2 ? 'zone-advance' : idx === 2 ? 'zone-possible' : 'zone-eliminated'}>
                      <td className="font-mono text-sm" style={{ color: '#8899AA' }}>{idx + 1}</td>
                      <td>
                        <Link href={`/teams/${s.team.slug}`} className="flex items-center gap-3 hover:text-white transition-colors py-1">
                          <span className="text-2xl">{s.team.flag}</span>
                          <div>
                            <div className="font-bold text-sm">{s.team.name}</div>
                            <div className="text-xs" style={{ color: '#8899AA' }}>FIFA #{s.team.fifaRank}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="text-center">{s.played}</td>
                      <td className="text-center text-[#00C853] font-semibold">{s.won}</td>
                      <td className="text-center text-[#FFB300] font-semibold">{s.drawn}</td>
                      <td className="text-center text-[#FF3D00] font-semibold">{s.lost}</td>
                      <td className="text-center">{s.goalsFor}</td>
                      <td className="text-center">{s.goalsAgainst}</td>
                      <td className="text-center font-mono font-semibold" style={{ color: s.goalDiff > 0 ? '#00C853' : s.goalDiff < 0 ? '#FF3D00' : '#8899AA' }}>
                        {s.goalDiff > 0 ? '+' : ''}{s.goalDiff}
                      </td>
                      <td className="text-center font-bold text-xl" style={{ color: 'var(--accent)' }}>{s.points}</td>
                      <td>
                        <div className="flex gap-1 justify-center">
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

            {/* Qualification legend */}
            <div className="p-4 flex gap-4 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: '#00C853' }} />
                <span style={{ color: '#8899AA' }}>Advance to Round of 32</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: '#FFB300' }} />
                <span style={{ color: '#8899AA' }}>Possible best 3rd-place</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: '#FF3D00' }} />
                <span style={{ color: '#8899AA' }}>Eliminated</span>
              </div>
            </div>
          </div>

          {/* Matches */}
          <div>
            <h2 className="font-display text-2xl text-white mb-4">Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Team Cards */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-white">Teams</h2>
          {standings.map((s, idx) => (
            <Link key={s.team.id} href={`/teams/${s.team.slug}`} className="glass-card p-4 block hover:no-underline">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{s.team.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{s.team.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: idx < 2 ? 'rgba(0,200,83,0.1)' : 'rgba(255,255,255,0.05)', color: idx < 2 ? '#00C853' : '#8899AA' }}>
                      {idx === 0 ? '1st' : idx === 1 ? '2nd' : idx === 2 ? '3rd' : '4th'}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs" style={{ color: '#8899AA' }}>
                    <span>FIFA #{s.team.fifaRank}</span>
                    <span>·</span>
                    <span>{s.team.confederation}</span>
                    {s.team.wcTitles > 0 && <span>· 🏆 {s.team.wcTitles}x</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl" style={{ color: 'var(--accent)' }}>{s.points}</div>
                  <div className="text-xs" style={{ color: '#8899AA' }}>pts</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-1 text-center text-xs">
                {[['P', s.played], ['W', s.won], ['D', s.drawn], ['L', s.lost], ['GD', `${s.goalDiff > 0 ? '+' : ''}${s.goalDiff}`]].map(([l, v]) => (
                  <div key={l as string}>
                    <div style={{ color: '#8899AA' }}>{l}</div>
                    <div className="font-bold">{v}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}

          {/* Navigation to other groups */}
          <div className="glass-card p-4">
            <h3 className="font-heading font-bold text-sm mb-3" style={{ color: '#8899AA' }}>Other Groups</h3>
            <div className="flex flex-wrap gap-2">
              {groups.filter(g => g !== groupUpper).map(g => (
                <Link key={g} href={`/groups/${g}`} className="w-9 h-9 rounded-lg flex items-center justify-center font-display text-lg transition-all hover:opacity-90" style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)', color: 'var(--accent)' }}>
                  {g}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
