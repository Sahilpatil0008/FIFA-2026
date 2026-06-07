'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { players, type Player } from '@/lib/data/players';
import { teams } from '@/lib/data/teams';
import PlayerPhoto from './PlayerPhoto';

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const POSITIONS: Array<{ key: Player['position']; label: string }> = [
  { key: 'GK', label: 'Goalkeepers' },
  { key: 'DF', label: 'Defenders' },
  { key: 'MF', label: 'Midfielders' },
  { key: 'FW', label: 'Forwards' },
];

type SortKey = 'rating' | 'goals' | 'assists' | 'name';

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: 'rating', label: 'Rating' },
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'name', label: 'Name' },
];

const teamColor = (teamId: string) => teams.find((t) => t.id === teamId)?.primaryColor ?? 'var(--accent)';

export default function PlayersBrowser() {
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState<Player['position'] | 'ALL'>('ALL');
  const [teamId, setTeamId] = useState<string>('ALL');
  const [sort, setSort] = useState<SortKey>('rating');

  const sortedTeams = useMemo(() => [...teams].sort((a, b) => a.name.localeCompare(b.name)), []);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    const list = players.filter((p) => {
      if (position !== 'ALL' && p.position !== position) return false;
      if (teamId !== 'ALL' && p.teamId !== teamId) return false;
      if (q && !norm(p.name).includes(q) && !norm(p.clubTeam).includes(q)) return false;
      return true;
    });
    list.sort((a, b) => {
      switch (sort) {
        case 'goals':
          return b.goals - a.goals || b.assists - a.assists;
        case 'assists':
          return b.assists - a.assists || b.goals - a.goals;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });
    return list;
  }, [query, position, teamId, sort]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg" aria-hidden>
          🔍
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search players… (e.g. "Mbappé", "Real Madrid")'
          className="w-full pl-12 pr-4 py-3 rounded-xl outline-none text-white"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <FilterPill active={position === 'ALL'} onClick={() => setPosition('ALL')}>
          All positions
        </FilterPill>
        {POSITIONS.map((p) => (
          <FilterPill key={p.key} active={position === p.key} onClick={() => setPosition(p.key)}>
            {p.label}
          </FilterPill>
        ))}

        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-lg text-sm outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
        >
          <option value="ALL">All teams</option>
          {sortedTeams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-3 py-1.5 rounded-lg text-sm outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm mb-4" style={{ color: '#8899AA' }}>
        {filtered.length} {filtered.length === 1 ? 'player' : 'players'}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-10 text-center" style={{ color: '#8899AA' }}>
          No players match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const color = teamColor(p.teamId);
            return (
              <Link
                key={p.id}
                href={`/players/${p.slug}`}
                className="glass-card p-4 flex flex-col items-center text-center hover:no-underline group"
              >
                <PlayerPhoto name={p.name} photoUrl={p.photoUrl} jersey={p.jerseyNum} color={color} size={80} rounded />
                <div className="mt-3 font-bold leading-tight group-hover:text-white transition-colors">
                  {p.name}
                </div>
                <div className="text-xs mt-0.5 truncate max-w-full" style={{ color: '#8899AA' }}>
                  {p.flag} {p.clubTeam}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#8899AA' }}
                  >
                    {p.position}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: `${color}22`, color }}>
                    #{p.jerseyNum}
                  </span>
                </div>
                <div className="flex gap-3 mt-3 text-sm">
                  <span style={{ color: 'var(--accent)' }}>⚽ {p.goals}</span>
                  <span style={{ color: '#60A5FA' }}>🅰 {p.assists}</span>
                  <span style={{ color: '#8899AA' }}>⭐ {p.rating.toFixed(1)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
      style={
        active
          ? { background: 'linear-gradient(135deg, var(--accent), var(--accent))', color: '#0a0e1a' }
          : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#8899AA' }
      }
    >
      {children}
    </button>
  );
}
