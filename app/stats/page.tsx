import Link from 'next/link';
import { players, getTopScorers, getTopAssists, getGoalkeepers } from '@/lib/data/players';
import { groupStandings } from '@/lib/data/teams';
import { matches } from '@/lib/data/matches';

export const metadata = {
  title: 'Statistics | FIFA World Cup 2026',
};

export default function StatsPage() {
  const topScorers = getTopScorers().slice(0, 20);
  const topAssists = getTopAssists().slice(0, 10);
  const goalkeepers = getGoalkeepers();

  const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
  const matchesPlayed = matches.filter(m => m.status === 'FINISHED').length;
  const totalYellowCards = players.reduce((sum, p) => sum + p.yellowCards, 0);

  const teamStats = Object.values(groupStandings).flat().map(s => ({
    team: s.team,
    goalsFor: s.goalsFor,
    goalsAgainst: s.goalsAgainst,
    played: s.played,
    goalDiff: s.goalDiff,
    points: s.points,
    goalsPerGame: s.played > 0 ? (s.goalsFor / s.played).toFixed(2) : '0.00',
  })).sort((a, b) => b.goalsFor - a.goalsFor);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Statistics</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">Statistics</h1>
        <p style={{ color: '#8899AA' }}>Live tournament stats, leaderboards and advanced analytics</p>
      </div>

      {/* Tournament overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Goals', value: totalGoals, color: 'var(--accent)', icon: '⚽' },
          { label: 'Matches Played', value: matchesPlayed, color: '#60A5FA', icon: '🏟️' },
          { label: 'Goals / Game', value: matchesPlayed > 0 ? (totalGoals / matchesPlayed).toFixed(1) : '—', color: '#34D399', icon: '📊' },
          { label: 'Yellow Cards', value: totalYellowCards, color: '#FFB300', icon: '🟨' },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-5 text-center" style={{ borderTop: `2px solid ${stat.color}40` }}>
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="font-display text-4xl" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs font-semibold tracking-widest uppercase mt-1" style={{ color: '#8899AA' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Top Scorers (full) */}
        <div className="xl:col-span-2">
          <div className="glass-card overflow-hidden mb-8">
            <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(0,102,255,0.2)' }}>🥇</div>
              <div>
                <h2 className="font-display text-2xl text-white">Golden Boot</h2>
                <p className="text-xs" style={{ color: '#8899AA' }}>Top scorers at WC 2026</p>
              </div>
            </div>
            <div>
              {topScorers.map((player, idx) => (
                <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="w-7 text-center font-display text-xl shrink-0" style={{ color: idx === 0 ? 'var(--accent)' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#8899AA' }}>{idx + 1}</span>
                  <span className="text-2xl shrink-0">{player.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{player.name}</div>
                    <div className="text-xs" style={{ color: '#8899AA' }}>{player.position} · {player.clubTeam}</div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-center">
                      <div className="font-display text-2xl leading-none" style={{ color: 'var(--accent)' }}>{player.goals}</div>
                      <div className="text-xs" style={{ color: '#8899AA' }}>Goals</div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="font-display text-xl leading-none" style={{ color: '#60A5FA' }}>{player.assists}</div>
                      <div className="text-xs" style={{ color: '#8899AA' }}>Ast</div>
                    </div>
                    <div className="text-center hidden md:block">
                      <div className="font-mono font-bold text-sm">{player.appearances}</div>
                      <div className="text-xs" style={{ color: '#8899AA' }}>Apps</div>
                    </div>
                    <div className="w-20 hidden lg:block">
                      <div className="stat-bar-track">
                        <div className="stat-bar-fill" style={{ width: `${(player.goals / (topScorers[0]?.goals || 1)) * 100}%`, background: 'var(--accent)' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Team Goals Table */}
          <div className="glass-card overflow-hidden">
            <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-display text-2xl text-white">Team Goals</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full standings-table">
                <thead>
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Team</th>
                    <th>P</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>G/Game</th>
                  </tr>
                </thead>
                <tbody>
                  {teamStats.slice(0, 12).map((s, idx) => (
                    <tr key={s.team.id}>
                      <td className="font-mono text-xs" style={{ color: '#8899AA' }}>{idx + 1}</td>
                      <td>
                        <Link href={`/teams/${s.team.slug}`} className="flex items-center gap-2 hover:text-white transition-colors">
                          <span>{s.team.flag}</span>
                          <span className="font-semibold text-sm">{s.team.name}</span>
                        </Link>
                      </td>
                      <td className="text-center">{s.played}</td>
                      <td className="text-center font-bold" style={{ color: 'var(--accent)' }}>{s.goalsFor}</td>
                      <td className="text-center">{s.goalsAgainst}</td>
                      <td className="text-center font-mono" style={{ color: s.goalDiff > 0 ? '#00C853' : '#FF3D00' }}>
                        {s.goalDiff > 0 ? '+' : ''}{s.goalDiff}
                      </td>
                      <td className="text-center font-mono text-sm">{s.goalsPerGame}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Top Assists */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span>🅰</span>
              <h2 className="font-display text-xl text-white">Top Assists</h2>
            </div>
            <div>
              {topAssists.map((player, idx) => (
                <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="w-5 text-center font-mono text-xs" style={{ color: '#8899AA' }}>{idx + 1}</span>
                  <span className="text-xl">{player.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{player.name}</div>
                    <div className="text-xs truncate" style={{ color: '#8899AA' }}>{player.position}</div>
                  </div>
                  <div className="font-display text-2xl shrink-0" style={{ color: '#60A5FA' }}>{player.assists}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Goalkeepers */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span>🧤</span>
              <h2 className="font-display text-xl text-white">Golden Glove</h2>
            </div>
            <div>
              {goalkeepers.map((player, idx) => (
                <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="w-5 text-center font-mono text-xs" style={{ color: '#8899AA' }}>{idx + 1}</span>
                  <span className="text-xl">{player.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{player.name}</div>
                    <div className="text-xs truncate" style={{ color: '#8899AA' }}>{player.clubTeam}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-sm">{player.appearances}</div>
                    <div className="text-xs" style={{ color: '#8899AA' }}>apps</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Disciplinary */}
          <div className="glass-card p-5">
            <h3 className="font-display text-xl text-white mb-4">Disciplinary</h3>
            <div className="space-y-3">
              {players.filter(p => p.yellowCards > 0 || p.redCards > 0).slice(0, 6).map(player => (
                <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <span className="text-xl">{player.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{player.name}</div>
                    <div className="text-xs truncate" style={{ color: '#8899AA' }}>{player.clubTeam}</div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: player.yellowCards }).map((_, i) => (
                      <span key={i} className="w-4 h-5 rounded-sm inline-block" style={{ background: '#FFB300' }} />
                    ))}
                    {player.redCards > 0 && (
                      <span className="w-4 h-5 rounded-sm inline-block" style={{ background: '#FF1744' }} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
