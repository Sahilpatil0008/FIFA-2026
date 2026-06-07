import Link from 'next/link';
import { getRecentMatches, getUpcomingMatches } from '@/lib/data/matches';
import { groupStandings, teams } from '@/lib/data/teams';
import { players, getTopScorers } from '@/lib/data/players';
import { venues } from '@/lib/data/venues';
import CountdownTimer from '@/components/CountdownTimer';
import MatchCard from '@/components/MatchCard';
import ScoreTicker from '@/components/ScoreTicker';

export default function HomePage() {
  const recentMatches = getRecentMatches();
  const upcomingMatches = getUpcomingMatches();
  const topScorers = getTopScorers().slice(0, 6);

  const stats = [
    { value: String(teams.length), label: 'Nations' },
    { value: '104', label: 'Matches' },
    { value: String(venues.length), label: 'Venues' },
    { value: '39', label: 'Days' },
    { value: '3', label: 'Host Nations' },
    { value: players.length.toLocaleString(), label: 'Players' },
  ];

  const features = [
    { href: '/ai', title: 'AI Analyst', desc: 'Claude-powered match predictions, tactical breakdowns & player analysis.', accent: '#9FC0FF',
      icon: <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1 0 8 4 4 0 0 1-8 0 4 4 0 0 1 0-8 4 4 0 0 1 4-4Z" /> },
    { href: '/simulator', title: 'Bracket Simulator', desc: 'Predict your champion — simulate the full knockout path.', accent: 'var(--accent)',
      icon: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /></> },
    { href: '/compare', title: 'Player Compare', desc: 'Side-by-side comparison of any two players with radar charts.', accent: '#B69CFF',
      icon: <><path d="M3 6h7" /><path d="M14 6h7" /><path d="M5 6v12" /><path d="M19 6v12" /></> },
    { href: '/history', title: 'World Cup History', desc: 'All-time champions, records & legendary moments since 1930.', accent: '#7DE0A6',
      icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  ];

  return (
    <div className="relative overflow-hidden">
      <ScoreTicker matches={recentMatches} />

      {/* ===== Hero ===== */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pitch-pattern opacity-60" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(180deg, transparent, var(--bg))' }} />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide"
            style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)', color: 'var(--accent-deep)' }}>
            <span className="live-dot" />
            Group Stage In Progress · June 11 – July 19, 2026
          </div>

          <h1 className="font-display leading-[0.92] mb-5" style={{ fontSize: 'clamp(48px, 9vw, 104px)' }}>
            <span className="block text-white">FIFA WORLD CUP</span>
            <span className="block text-gold-gradient">2026</span>
          </h1>

          <p className="text-base md:text-lg mb-9 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-2)' }}>
            48 nations. 104 matches. 3 countries. One world champion — across the USA, Canada &amp; Mexico.
          </p>

          <div className="flex items-center justify-center gap-2.5 mb-10 flex-wrap">
            {[{ flag: '🇺🇸', name: 'USA' }, { flag: '🇨🇦', name: 'Canada' }, { flag: '🇲🇽', name: 'Mexico' }].map(c => (
              <div key={c.name} className="chip" style={{ padding: '6px 14px' }}>
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="font-heading text-[13px] text-white">{c.name}</span>
              </div>
            ))}
          </div>

          <CountdownTimer targetDate="2026-07-19T20:00:00" label="Until World Cup Final" />

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <Link href="/live" className="btn btn-live"><span className="live-dot" />Live Scores</Link>
            <Link href="/groups" className="btn btn-primary">Group Tables</Link>
            <Link href="/bracket" className="btn">Bracket</Link>
            <Link href="/simulator" className="btn">Predict Winner</Link>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="panel grid grid-cols-3 md:grid-cols-6 divide-x divide-y md:divide-y-0"
            style={{ borderColor: 'var(--border)' }}>
            {stats.map((stat, i) => (
              <div key={i} className="text-center py-6 px-2" style={{ borderColor: 'var(--border)' }}>
                <div className="font-display text-3xl md:text-4xl text-gold-gradient">{stat.value}</div>
                <div className="text-[11px] font-heading tracking-[0.14em] uppercase mt-1.5" style={{ color: 'var(--muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 py-14 space-y-16">
        {/* Recent Matches */}
        <section>
          <SectionHead title="Recent Results" eyebrow="Match Centre" href="/schedule" linkLabel="View all" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMatches.slice(0, 6).map(match => <MatchCard key={match.id} match={match} />)}
          </div>
        </section>

        {/* Group Standings */}
        <section>
          <SectionHead title="Group Standings" eyebrow="Standings" href="/groups" linkLabel="All groups" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {['A', 'B', 'C', 'D'].map(group => {
              const standings = groupStandings[group];
              return (
                <Link key={group} href={`/groups/${group}`} className="glass-card p-5 block">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg text-white">Group {group}</h3>
                    <span className="chip">Matchday 2</span>
                  </div>
                  <div className="space-y-1">
                    {standings.map((s, idx) => (
                      <div key={s.team.id} className={`flex items-center gap-3 py-1.5 px-2.5 rounded-lg text-sm ${idx < 2 ? 'zone-advance' : ''}`}>
                        <span className="text-[11px] font-mono w-4 text-center" style={{ color: 'var(--muted)' }}>{idx + 1}</span>
                        <span className="text-base">{s.team.flag}</span>
                        <span className="flex-1 font-medium text-[13px]">{s.team.shortName}</span>
                        <span className="font-mono font-bold text-[13px]" style={{ color: 'var(--gold-2)' }}>{s.points}</span>
                        <span className="text-[11px] font-mono w-8 text-right" style={{ color: 'var(--muted)' }}>{s.goalDiff > 0 ? '+' : ''}{s.goalDiff}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Upcoming + Top Scorers */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <SectionHead title="Upcoming Matches" eyebrow="Fixtures" href="/schedule" linkLabel="Full schedule" />
            <div className="space-y-3">
              {upcomingMatches.slice(0, 6).map(match => (
                <div key={match.id} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="chip">{match.venueName}</span>
                    <span className="chip-gold chip">
                      {new Date(match.kickoff).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {new Date(match.kickoff).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{match.homeTeamFlag}</span>
                      <span className="font-heading text-[14px]">{match.homeTeamName}</span>
                    </div>
                    <div className="px-3 py-1 rounded-md font-heading text-[11px]" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>VS</div>
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="font-heading text-[14px]">{match.awayTeamName}</span>
                      <span className="text-2xl">{match.awayTeamFlag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <SectionHead title="Top Scorers" eyebrow="Golden Boot" href="/stats" linkLabel="Full stats" />
            <div className="glass-card p-4">
              <div className="space-y-1">
                {topScorers.map((player, idx) => (
                  <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors">
                    <span className="w-6 text-center font-mono text-xs font-bold" style={{ color: idx === 0 ? 'var(--accent)' : idx === 1 ? '#C8CDD6' : idx === 2 ? '#D29B6B' : 'var(--muted)' }}>{idx + 1}</span>
                    <span className="text-xl">{player.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[13px] truncate">{player.name}</div>
                      <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{player.clubTeam}</div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl leading-none" style={{ color: 'var(--gold-2)' }}>{player.goals}</span>
                      <span className="text-[10px]" style={{ color: 'var(--muted)' }}>G</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/stats" className="btn w-full mt-3" style={{ height: 38 }}>View full leaderboard</Link>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section>
          <SectionHead title="Explore More" eyebrow="Tools" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(item => (
              <Link key={item.href} href={item.href} className="glass-card p-6 block group">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </span>
                <h3 className="font-heading text-[17px] mb-1.5 text-white">{item.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Nations grid */}
        <section>
          <SectionHead title="48 Nations" eyebrow="Qualified" href="/teams" linkLabel="All teams" />
          <div className="panel p-4">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1">
              {Object.values(groupStandings).flat().map(s => (
                <Link key={s.team.id} href={`/teams/${s.team.slug}`} className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors" title={s.team.name}>
                  <span className="text-3xl">{s.team.flag}</span>
                  <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: 'var(--muted)' }}>{s.team.shortName}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHead({ title, eyebrow, href, linkLabel }: { title: string; eyebrow?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        {eyebrow && <div className="eyebrow mb-1.5">{eyebrow}</div>}
        <h2 className="section-title text-2xl md:text-3xl text-white">{title}</h2>
      </div>
      {href && linkLabel && (
        <Link href={href} className="text-[13px] font-semibold flex items-center gap-1 transition-colors hover:text-white" style={{ color: 'var(--gold-2)' }}>
          {linkLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </Link>
      )}
    </div>
  );
}
