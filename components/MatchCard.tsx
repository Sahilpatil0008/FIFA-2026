import type { Match } from '@/lib/data/matches';

interface Props {
  match: Match;
}

export default function MatchCard({ match }: Props) {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const homeWon = isFinished && match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore;
  const awayWon = isFinished && match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore;

  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="live-badge"><span className="live-dot" />LIVE {match.minute}&apos;</span>
          )}
          {isFinished && (
            <span className="chip" style={{ color: 'var(--win)', borderColor: 'rgba(46,212,122,0.3)', background: 'rgba(46,212,122,0.08)' }}>Full Time</span>
          )}
          {isScheduled && (
            <span className="chip">{formatDate(match.kickoff)}</span>
          )}
        </div>
        <span className="chip-gold chip">Group {match.group}</span>
      </div>

      {/* Score Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Home Team */}
        <div className={`flex flex-col items-center gap-2 flex-1 transition-opacity ${!homeWon && isFinished ? 'opacity-55' : ''}`}>
          <span className="text-[40px] leading-none">{match.homeTeamFlag}</span>
          <span className="font-heading text-[13px] text-center leading-tight">{match.homeTeamName}</span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-1 shrink-0 min-w-[88px]">
          {isScheduled ? (
            <div className="px-4 py-1.5 rounded-lg font-heading text-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>VS</div>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="score-number" style={{ fontSize: '2.4rem', color: homeWon ? 'var(--gold-2)' : 'var(--text)' }}>{match.homeScore}</span>
              <span className="text-xl" style={{ color: 'var(--muted)' }}>–</span>
              <span className="score-number" style={{ fontSize: '2.4rem', color: awayWon ? 'var(--gold-2)' : 'var(--text)' }}>{match.awayScore}</span>
            </div>
          )}
          {isFinished && match.htHomeScore !== null && (
            <span className="text-[11px]" style={{ color: 'var(--muted)' }}>HT {match.htHomeScore}–{match.htAwayScore}</span>
          )}
        </div>

        {/* Away Team */}
        <div className={`flex flex-col items-center gap-2 flex-1 transition-opacity ${!awayWon && isFinished ? 'opacity-55' : ''}`}>
          <span className="text-[40px] leading-none">{match.awayTeamFlag}</span>
          <span className="font-heading text-[13px] text-center leading-tight">{match.awayTeamName}</span>
        </div>
      </div>

      {/* Scorers */}
      {isFinished && (match.homeScorers?.length || match.awayScorers?.length) ? (
        <div className="flex justify-between text-[11px] pt-1" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          <div className="flex-1 text-left space-y-0.5 pt-2">
            {match.homeScorers?.map((s, i) => <div key={i}>{s}</div>)}
          </div>
          <div className="flex-1 text-right space-y-0.5 pt-2">
            {match.awayScorers?.map((s, i) => <div key={i}>{s}</div>)}
          </div>
        </div>
      ) : null}

      {/* Venue */}
      <div className="text-[11px] text-center" style={{ color: 'var(--muted)' }}>
        {match.venueName}, {match.venueCity}
        {match.attendance ? <span> · {match.attendance.toLocaleString()} att.</span> : null}
      </div>
    </div>
  );
}
