'use client';

import { useEffect, useRef, useState } from 'react';
import type { Match } from '@/lib/data/matches';
import MatchCard from '@/components/MatchCard';

const POLL_MS = 60_000;

interface Props {
  // Server-rendered fallback so the section isn't empty before the first poll.
  initialLive: Match[];
  nextKickoff?: string;
}

export default function LiveScores({ initialLive, nextKickoff }: Props) {
  const [live, setLive] = useState<Match[]>(initialLive);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  // Keep the latest live list available inside the interval without re-arming it.
  const liveRef = useRef(live);
  liveRef.current = live;

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch('/api/live-scores', { cache: 'no-store' });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data: { matches?: Match[] } = await res.json();
        if (cancelled) return;
        // The API is the source of truth once it answers — including an empty
        // list, which legitimately means "no matches in play right now".
        setLive(data.matches ?? []);
        setUpdatedAt(new Date());
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    // Fetch immediately on mount, then every 60s while the tab is mounted.
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const formatKickoff = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (live.length === 0) {
    return (
      <div className="glass-card p-10 text-center mb-10">
        <div className="text-5xl mb-4">⏸</div>
        <h2 className="font-display text-2xl text-white mb-2">No Live Matches</h2>
        <p style={{ color: '#8899AA' }}>Check back during match windows for live scores</p>
        {nextKickoff && (
          <div className="text-sm mt-3" style={{ color: 'var(--accent)' }}>
            Next match: {formatKickoff(nextKickoff)}
          </div>
        )}
        <div className="text-[11px] mt-4" style={{ color: 'var(--muted)' }}>
          {error
            ? 'Live feed unavailable — retrying every 60s'
            : updatedAt
              ? `Auto-refreshing every 60s · last checked ${updatedAt.toLocaleTimeString()}`
              : 'Connecting to live feed…'}
        </div>
      </div>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="live-badge">
          <span className="live-dot" />
          LIVE NOW
        </div>
        <span className="text-sm" style={{ color: '#8899AA' }}>
          {live.length} match{live.length !== 1 ? 'es' : ''} in progress
        </span>
        <span className="text-[11px] ml-auto" style={{ color: 'var(--muted)' }}>
          {error
            ? 'Reconnecting…'
            : updatedAt
              ? `Updated ${updatedAt.toLocaleTimeString()}`
              : 'Live'}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {live.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </section>
  );
}
