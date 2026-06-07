'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { teams } from '@/lib/data/teams';
import { players } from '@/lib/data/players';
import { matches, stageLabels } from '@/lib/data/matches';

type Result =
  | { kind: 'team'; id: string; href: string; flag: string; title: string; subtitle: string }
  | { kind: 'player'; id: string; href: string; flag: string; title: string; subtitle: string }
  | { kind: 'match'; id: string; href: string; flag: string; title: string; subtitle: string };

// strip combining diacritical marks (U+0300–U+036F) so "mbappe" matches "Mbappé"
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function search(query: string): Result[] {
  const q = norm(query.trim());
  if (!q) return [];

  const teamResults: Result[] = teams
    .filter((t) => norm(t.name).includes(q) || norm(t.shortName).includes(q))
    .slice(0, 6)
    .map((t) => ({
      kind: 'team',
      id: t.id,
      href: `/teams/${t.slug}`,
      flag: t.flag,
      title: t.name,
      subtitle: `Group ${t.group} · FIFA Rank ${t.fifaRank}`,
    }));

  const playerResults: Result[] = players
    .filter((p) => norm(p.name).includes(q) || norm(p.clubTeam).includes(q))
    .slice(0, 8)
    .map((p) => ({
      kind: 'player',
      id: p.id,
      href: `/players/${p.slug}`,
      flag: p.flag,
      title: p.name,
      subtitle: `${p.position} · #${p.jerseyNum} · ${p.clubTeam}`,
    }));

  const matchResults: Result[] = matches
    .filter(
      (m) =>
        norm(m.homeTeamName).includes(q) ||
        norm(m.awayTeamName).includes(q) ||
        norm(m.venueName).includes(q),
    )
    .slice(0, 6)
    .map((m) => {
      const date = new Date(m.kickoff).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const score =
        m.status === 'FINISHED' || m.status === 'LIVE' ? `${m.homeScore}–${m.awayScore}` : 'vs';
      return {
        kind: 'match',
        id: m.id,
        href: '/schedule',
        flag: `${m.homeTeamFlag}${m.awayTeamFlag}`,
        title: `${m.homeTeamName} ${score} ${m.awayTeamName}`,
        subtitle: `${date} · ${stageLabels[m.stage] ?? m.stage} · ${m.venueName}`,
      };
    });

  return [...playerResults, ...teamResults, ...matchResults];
}

const sectionLabel: Record<Result['kind'], string> = {
  player: 'Players',
  team: 'Teams',
  match: 'Matches',
};

export default function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);

  // Global keyboard shortcut: Cmd/Ctrl+K to open, "/" when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === '/' && !open) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setOpen(true);
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = (r: Result) => {
    setOpen(false);
    router.push(r.href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      go(results[active]);
    }
  };

  // group results preserving order
  let cursor = -1;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
        style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#8899AA' }}
      >
        <span aria-hidden>🔍</span>
        <span className="hidden md:inline">Search</span>
        <kbd
          className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded font-mono"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          style={{ background: 'rgba(5,8,15,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden"
            style={{ background: '#0d1424', border: '1px solid rgba(0,102,255,0.25)', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span aria-hidden className="text-lg">🔍</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search teams, players, matches…"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-[#667]"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-xs px-2 py-1 rounded font-mono"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#8899AA' }}
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim() === '' && (
                <p className="px-4 py-6 text-sm text-center" style={{ color: '#667' }}>
                  Start typing to search across all 48 teams, players and matches.
                </p>
              )}
              {query.trim() !== '' && results.length === 0 && (
                <p className="px-4 py-6 text-sm text-center" style={{ color: '#667' }}>
                  No results for “{query}”.
                </p>
              )}

              {(['player', 'team', 'match'] as const).map((kind) => {
                const group = results.filter((r) => r.kind === kind);
                if (group.length === 0) return null;
                return (
                  <div key={kind}>
                    <div
                      className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: 'var(--accent)' }}
                    >
                      {sectionLabel[kind]}
                    </div>
                    {group.map((r) => {
                      cursor += 1;
                      const idx = cursor;
                      return (
                        <button
                          key={`${r.kind}-${r.id}`}
                          onClick={() => go(r)}
                          onMouseEnter={() => setActive(idx)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{ background: active === idx ? 'rgba(0,102,255,0.12)' : 'transparent' }}
                        >
                          <span className="text-2xl shrink-0">{r.flag}</span>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-white truncate">{r.title}</div>
                            <div className="text-xs truncate" style={{ color: '#8899AA' }}>
                              {r.subtitle}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
