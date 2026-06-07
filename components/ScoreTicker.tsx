'use client';

import type { Match } from '@/lib/data/matches';

interface Props {
  matches: Match[];
}

export default function ScoreTicker({ matches }: Props) {
  const displayMatches = [...matches, ...matches]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden py-2.5" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
      <div className="ticker-inner">
        {displayMatches.map((match, i) => (
          <div key={`${match.id}-${i}`} className="inline-flex items-center gap-2.5 px-6 text-[13px]" style={{ borderRight: '1px solid var(--border)' }}>
            {match.status === 'LIVE' && <span className="live-dot" />}
            <span>{match.homeTeamFlag}</span>
            <span className="font-heading">{match.homeTeamName}</span>
            {match.homeScore !== null ? (
              <span className="font-mono font-bold px-2 py-0.5 rounded-md text-[13px]" style={{ background: 'rgba(0,102,255,0.12)', color: 'var(--gold-2)' }}>
                {match.homeScore} – {match.awayScore}
              </span>
            ) : (
              <span className="font-mono text-xs px-2" style={{ color: 'var(--muted)' }}>vs</span>
            )}
            <span className="font-heading">{match.awayTeamName}</span>
            <span>{match.awayTeamFlag}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-md ml-1" style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
              Grp {match.group}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
