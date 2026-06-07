import Link from 'next/link';
import { notFound } from 'next/navigation';
import { players, getPlayerBySlug } from '@/lib/data/players';
import { getTeamBySlug, teams } from '@/lib/data/teams';
import PlayerPhoto from '@/components/PlayerPhoto';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return players.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return {};
  return { title: `${player.name} | FIFA World Cup 2026` };
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) notFound();

  const team = teams.find(t => t.id === player.teamId);
  if (!team) notFound();

  const positionColors = { GK: 'var(--accent)', DF: '#60A5FA', MF: '#34D399', FW: '#F97316' };
  const positionFull = { GK: 'Goalkeeper', DF: 'Defender', MF: 'Midfielder', FW: 'Forward' };

  const statBars = [
    { label: 'Goals', value: player.goals, max: 8, color: 'var(--accent)' },
    { label: 'Assists', value: player.assists, max: 8, color: '#60A5FA' },
    { label: 'Appearances', value: player.appearances, max: 6, color: '#34D399' },
    { label: 'Minutes', value: Math.round(player.minutesPlayed / 90), max: 6, color: '#A78BFA', suffix: '×90' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${team.primaryColor}30 0%, rgba(10,14,26,0.98) 70%)`,
        borderBottom: `2px solid ${team.primaryColor}40`
      }}>
        <div className="absolute right-0 top-0 font-display text-[300px] opacity-5 leading-none select-none" style={{ color: team.primaryColor }}>
          {player.jerseyNum}
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#8899AA' }}>
            <Link href="/players" className="hover:text-white transition-colors">Players</Link>
            <span>/</span>
            <Link href={`/teams/${team.slug}`} className="hover:text-white transition-colors" style={{ color: team.primaryColor }}>{team.name}</Link>
            <span>/</span>
            <span className="text-white">{player.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Player Photo */}
            <div className="shrink-0 relative">
              <PlayerPhoto name={player.name} photoUrl={player.photoUrl} jersey={player.jerseyNum} color={team.primaryColor} size={176} />
              <span className="absolute -bottom-2 -right-2 text-3xl drop-shadow-lg" aria-hidden>{player.flag}</span>
            </div>

            {/* Player Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${positionColors[player.position]}20`, border: `1px solid ${positionColors[player.position]}40`, color: positionColors[player.position] }}>
                  {positionFull[player.position]}
                </span>
                <span className="font-display text-2xl" style={{ color: team.primaryColor }}>#{player.jerseyNum}</span>
                {player.isStarPlayer && (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)', color: 'var(--accent)' }}>⭐ Star Player</span>
                )}
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none">{player.name}</h1>
              <div className="flex flex-wrap gap-6 text-sm mb-6" style={{ color: '#8899AA' }}>
                <div><span>Age: </span><strong className="text-white">{player.age}</strong></div>
                <div><span>Club: </span><strong className="text-white">{player.clubTeam}</strong></div>
                <div><span>Caps: </span><strong className="text-white">{player.caps}</strong></div>
                <div><span>Int'l Goals: </span><strong className="text-white">{player.intGoals}</strong></div>
                <div><span>Height: </span><strong className="text-white">{player.height}cm</strong></div>
              </div>

              {/* Tournament Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Goals', value: player.goals, color: 'var(--accent)' },
                  { label: 'Assists', value: player.assists, color: '#60A5FA' },
                  { label: 'Apps', value: player.appearances, color: '#34D399' },
                  { label: 'Rating', value: player.rating.toFixed(1), color: '#F97316' },
                ].map(stat => (
                  <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}>
                    <div className="font-display text-4xl" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs font-semibold tracking-widest uppercase mt-1" style={{ color: '#8899AA' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Bars */}
            <div className="glass-card p-6">
              <h2 className="font-display text-2xl text-white mb-5">Tournament Stats</h2>
              <div className="space-y-4">
                {[
                  { label: 'Goals', value: player.goals, max: 8, color: 'var(--accent)' },
                  { label: 'Assists', value: player.assists, max: 8, color: '#60A5FA' },
                  { label: 'Appearances', value: player.appearances, max: 6, color: '#34D399' },
                  { label: 'Yellow Cards', value: player.yellowCards, max: 3, color: '#FFB300' },
                  { label: 'Minutes Played', value: player.minutesPlayed, max: 540, color: '#A78BFA' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: '#8899AA' }}>{stat.label}</span>
                      <span className="font-bold" style={{ color: stat.color }}>{stat.value}{stat.label === 'Minutes Played' ? ' mins' : ''}</span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className="stat-bar-fill"
                        style={{ width: `${Math.min(100, (stat.value / stat.max) * 100)}%`, background: stat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Bio */}
            <div className="glass-card p-6">
              <h2 className="font-display text-2xl text-white mb-4">Profile</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Full Name', player.name],
                  ['Nationality', player.nationality],
                  ['Date of Birth', new Date(player.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
                  ['Birthplace', player.birthPlace],
                  ['Height', `${player.height} cm`],
                  ['Position', positionFull[player.position]],
                  ['Jersey No.', `#${player.jerseyNum}`],
                  ['Club Team', player.clubTeam],
                  ['Club Country', player.clubCountry],
                  ['International Caps', player.caps],
                  ['International Goals', player.intGoals],
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex flex-col gap-0.5 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-xs" style={{ color: '#8899AA' }}>{label}</span>
                    <span className="font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* National Team */}
            <Link href={`/teams/${team.slug}`} className="glass-card p-5 block hover:no-underline" style={{ borderTop: `3px solid ${team.primaryColor}` }}>
              <h3 className="font-heading font-bold text-xs tracking-widest uppercase mb-3" style={{ color: '#8899AA' }}>National Team</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{team.flag}</span>
                <div>
                  <div className="font-bold">{team.name}</div>
                  <div className="text-sm" style={{ color: '#8899AA' }}>Group {team.group} · FIFA #{team.fifaRank}</div>
                </div>
              </div>
            </Link>

            {/* WC Record */}
            <div className="glass-card p-5">
              <h3 className="font-heading font-bold text-xs tracking-widest uppercase mb-4" style={{ color: '#8899AA' }}>WC 2026 Record</h3>
              <div className="space-y-3">
                {[
                  ['Appearances', player.appearances],
                  ['Goals', player.goals],
                  ['Assists', player.assists],
                  ['Minutes', player.minutesPlayed],
                  ['Yellow Cards', player.yellowCards],
                  ['Red Cards', player.redCards],
                  ['Rating', `${player.rating.toFixed(1)} / 10`],
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex justify-between text-sm">
                    <span style={{ color: '#8899AA' }}>{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Analysis preview */}
            <div className="glass-card p-5" style={{ borderTop: '2px solid rgba(96,165,250,0.3)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span>🤖</span>
                <h3 className="font-heading font-bold text-sm text-white">AI Analysis</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8899AA' }}>
                Get a deep AI-powered analysis of {player.name}&apos;s tournament performance, tactical impact, and Golden Boot probability.
              </p>
              <Link href="/ai" className="flex items-center justify-center gap-2 mt-4 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}>
                Analyse with AI →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
