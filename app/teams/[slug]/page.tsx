import Link from 'next/link';
import { notFound } from 'next/navigation';
import { teams, groupStandings, getTeamBySlug } from '@/lib/data/teams';
import { getPlayersByTeam } from '@/lib/data/players';
import { getMatchesByTeam } from '@/lib/data/matches';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return teams.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) return {};
  return { title: `${team.name} | FIFA World Cup 2026`, description: `${team.name} squad, stats, fixtures and AI analysis at WC2026` };
}

const positionOrder = { GK: 0, DF: 1, MF: 2, FW: 3 };
const positionLabels = { GK: 'Goalkeepers', DF: 'Defenders', MF: 'Midfielders', FW: 'Forwards' };

export default async function TeamPage({ params }: Props) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) notFound();

  const players = getPlayersByTeam(team.id).sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
  const matches = getMatchesByTeam(team.id);
  const groupTable = groupStandings[team.group];
  const teamStanding = groupTable.find(s => s.team.id === team.id);
  const position = groupTable.findIndex(s => s.team.id === team.id) + 1;

  const positions = ['GK', 'DF', 'MF', 'FW'] as const;

  return (
    <div className={`team-${team.slug}`}>
      {/* Hero Banner */}
      <div className="relative min-h-[320px] flex items-end overflow-hidden" style={{
        background: `linear-gradient(135deg, ${team.primaryColor}40 0%, rgba(10,14,26,0.95) 60%)`,
        borderBottom: `2px solid ${team.primaryColor}60`
      }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top left, rgba(10,14,26,0) 0%, rgba(10,14,26,0.8) 100%)' }} />

        {/* Giant flag background */}
        <div className="absolute right-0 top-0 text-[280px] opacity-5 select-none leading-none">{team.flag}</div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 pb-10 pt-20 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#8899AA' }}>
            <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
            <span>/</span>
            <span style={{ color: team.primaryColor }}>{team.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <span className="text-[100px] leading-none">{team.flag}</span>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${team.primaryColor}30`, border: `1px solid ${team.primaryColor}50`, color: team.primaryColor }}>
                  {team.confederation}
                </span>
                {team.wcTitles > 0 && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.4)', color: 'var(--accent)' }}>
                    🏆 {team.wcTitles}x World Champion
                  </span>
                )}
              </div>
              <h1 className="font-display text-6xl text-white mb-2">{team.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#8899AA' }}>
                <span>FIFA Rank: <strong className="text-white">#{team.fifaRank}</strong></span>
                <span>Group: <strong className="text-white">{team.group}</strong> · <strong className="text-white">{position}{['st','nd','rd','th'][Math.min(position-1,3)]}</strong> Place</span>
                <span>Coach: <strong className="text-white">{team.coachName}</strong></span>
                <span>WC Appearances: <strong className="text-white">{team.wcAppearances}</strong></span>
              </div>
            </div>

            {/* Standing card */}
            {teamStanding && (
              <div className="glass-card p-5 shrink-0">
                <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#8899AA' }}>Group {team.group} Standing</div>
                <div className="grid grid-cols-5 gap-3 text-center">
                  {[['Pos', position + (position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th')], ['P', teamStanding.played], ['W', teamStanding.won], ['GD', `${teamStanding.goalDiff > 0 ? '+' : ''}${teamStanding.goalDiff}`], ['Pts', teamStanding.points]].map(([l, v]) => (
                    <div key={String(l)}>
                      <div className="text-xs" style={{ color: '#8899AA' }}>{l}</div>
                      <div className="font-display text-2xl" style={{ color: l === 'Pts' ? 'var(--accent)' : 'white' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Squad */}
          <div className="xl:col-span-3 space-y-8">
            <section>
              <h2 className="font-display text-3xl text-white mb-4">Squad</h2>
              {positions.map(pos => {
                const posPlayers = players.filter(p => p.position === pos);
                if (!posPlayers.length) return null;
                return (
                  <div key={pos} className="mb-6">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-3 px-1" style={{ color: '#8899AA' }}>{positionLabels[pos]}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {posPlayers.map(player => (
                        <Link key={player.id} href={`/players/${player.slug}`} className="glass-card p-4 block hover:no-underline group">
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-display text-3xl" style={{ color: team.primaryColor, opacity: 0.7 }}>
                              {player.jerseyNum}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: '#8899AA' }}>
                              {player.position}
                            </span>
                          </div>
                          <div className="font-bold text-sm leading-tight group-hover:text-white transition-colors">{player.name}</div>
                          <div className="text-xs mt-1 truncate" style={{ color: '#8899AA' }}>{player.clubTeam}</div>
                          {(player.goals > 0 || player.assists > 0) && (
                            <div className="flex gap-3 mt-2 text-xs">
                              {player.goals > 0 && <span style={{ color: '#00C853' }}>⚽ {player.goals}</span>}
                              {player.assists > 0 && <span style={{ color: '#60A5FA' }}>🅰 {player.assists}</span>}
                            </div>
                          )}
                          {player.isStarPlayer && (
                            <div className="mt-2">
                              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--accent)' }}>⭐ Key Player</span>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Matches */}
            <section>
              <h2 className="font-display text-3xl text-white mb-4">Matches</h2>
              <div className="space-y-3">
                {matches.map(match => {
                  const isHome = match.homeTeamId === team.id;
                  const won = match.status === 'FINISHED' && (
                    (isHome && (match.homeScore ?? 0) > (match.awayScore ?? 0)) ||
                    (!isHome && (match.awayScore ?? 0) > (match.homeScore ?? 0))
                  );
                  const lost = match.status === 'FINISHED' && (
                    (isHome && (match.homeScore ?? 0) < (match.awayScore ?? 0)) ||
                    (!isHome && (match.awayScore ?? 0) < (match.homeScore ?? 0))
                  );
                  const drawn = match.status === 'FINISHED' && match.homeScore === match.awayScore;

                  return (
                    <div key={match.id} className="glass-card p-4 flex items-center gap-4">
                      <span className="text-xs font-semibold px-2 py-1 rounded shrink-0" style={{ background: match.status === 'FINISHED' ? 'rgba(0,200,83,0.1)' : 'rgba(255,255,255,0.05)', color: match.status === 'FINISHED' ? '#00C853' : '#8899AA' }}>
                        {match.status === 'FINISHED' ? 'FT' : 'Scheduled'}
                      </span>
                      <div className="flex-1">
                        <div className="text-xs mb-1" style={{ color: '#8899AA' }}>
                          {new Date(match.kickoff).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {match.venueName}
                        </div>
                        <div className="flex items-center gap-3">
                          <span>{match.homeTeamFlag}</span>
                          <span className="font-heading font-bold text-sm">{match.homeTeamName}</span>
                          {match.homeScore !== null && (
                            <span className="font-mono font-bold px-2 py-0.5 rounded text-sm" style={{ background: 'rgba(0,102,255,0.15)', color: 'var(--accent)' }}>
                              {match.homeScore} - {match.awayScore}
                            </span>
                          )}
                          <span className="font-heading font-bold text-sm">{match.awayTeamName}</span>
                          <span>{match.awayTeamFlag}</span>
                        </div>
                      </div>
                      {match.status === 'FINISHED' && (
                        <span className={`text-xs font-bold px-2 py-1 rounded`} style={{ background: won ? 'rgba(0,200,83,0.15)' : lost ? 'rgba(255,61,0,0.15)' : 'rgba(255,179,0,0.15)', color: won ? '#00C853' : lost ? '#FF3D00' : '#FFB300' }}>
                          {won ? 'W' : lost ? 'L' : 'D'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team info */}
            <div className="glass-card p-5">
              <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: '#8899AA' }}>Team Info</h3>
              <div className="space-y-3">
                {[
                  ['Confederation', team.confederation],
                  ['FIFA Ranking', `#${team.fifaRank}`],
                  ['World Cup Titles', team.wcTitles || 'None'],
                  ['WC Appearances', team.wcAppearances],
                  ['Head Coach', team.coachName],
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex justify-between text-sm">
                    <span style={{ color: '#8899AA' }}>{label}</span>
                    <span className="font-semibold text-right" style={{ color: label === 'World Cup Titles' && value !== 'None' ? 'var(--accent)' : 'white' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Table */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sm tracking-widest uppercase" style={{ color: '#8899AA' }}>Group {team.group}</h3>
                <Link href={`/groups/${team.group}`} className="text-xs hover:text-white" style={{ color: 'var(--accent)' }}>Details →</Link>
              </div>
              <div className="space-y-2">
                {groupTable.map((s, idx) => (
                  <div key={s.team.id} className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm ${idx < 2 ? 'zone-advance' : ''}`} style={{ ...(s.team.id === team.id ? { outline: `1px solid ${team.primaryColor}`, outlineOffset: '0px' } : {}) }}>
                    <span className="text-xs font-mono w-4" style={{ color: '#8899AA' }}>{idx + 1}</span>
                    <span className="text-base">{s.team.flag}</span>
                    <span className={`flex-1 text-xs font-medium ${s.team.id === team.id ? 'text-white' : ''}`}>{s.team.shortName}</span>
                    <span className="font-bold text-xs" style={{ color: 'var(--accent)' }}>{s.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Star Players */}
            <div className="glass-card p-5">
              <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: '#8899AA' }}>Key Players</h3>
              <div className="space-y-3">
                {players.filter(p => p.isStarPlayer).slice(0, 4).map(player => (
                  <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-3 hover:text-white transition-colors">
                    <span className="text-xl">{player.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{player.name}</div>
                      <div className="text-xs" style={{ color: '#8899AA' }}>{player.position} · {player.clubTeam}</div>
                    </div>
                    <div className="text-right shrink-0">
                      {player.goals > 0 && <div className="text-xs font-bold" style={{ color: 'var(--accent)' }}>⚽ {player.goals}</div>}
                      <div className="text-xs" style={{ color: '#8899AA' }}>⭐ {(player.rating).toFixed(1)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
