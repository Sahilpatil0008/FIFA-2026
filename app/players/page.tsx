import Link from 'next/link';
import { getTopScorers } from '@/lib/data/players';
import PlayersBrowser from '@/components/PlayersBrowser';

export const metadata = {
  title: 'Players | FIFA World Cup 2026',
  description: 'Search and explore every player at the FIFA World Cup 2026 — photos, stats and tournament leaders.',
};

export default function PlayersPage() {
  const topScorers = getTopScorers().slice(0, 5);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Players</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">Players</h1>
        <p style={{ color: '#8899AA' }}>Search the squads, filter by position or team, and open any player for full stats.</p>
      </div>

      {/* Golden Boot highlight */}
      <div className="glass-card overflow-hidden mb-8">
        <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="font-display text-2xl text-white">🥅 Golden Boot Race</h2>
          <Link href="/stats" className="text-sm font-semibold hover:text-white" style={{ color: 'var(--accent)' }}>Full Stats →</Link>
        </div>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {topScorers.map((player, idx) => (
            <Link key={player.id} href={`/players/${player.slug}`} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
              <div className="w-8 text-center font-display text-2xl" style={{ color: idx === 0 ? 'var(--accent)' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#8899AA' }}>
                {idx + 1}
              </div>
              <span className="text-3xl">{player.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold">{player.name}</div>
                <div className="text-sm" style={{ color: '#8899AA' }}>{player.position} · {player.clubTeam}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-display text-3xl" style={{ color: 'var(--accent)' }}>{player.goals}</div>
                  <div className="text-xs" style={{ color: '#8899AA' }}>Goals</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl" style={{ color: '#60A5FA' }}>{player.assists}</div>
                  <div className="text-xs" style={{ color: '#8899AA' }}>Assists</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Searchable, filterable player grid with photos */}
      <PlayersBrowser />
    </div>
  );
}
