'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getSquadByTeam, SQUAD_SIZE } from '@/lib/data/squads';
import type { Team } from '@/lib/data/teams';
import PlayerPhoto from './PlayerPhoto';

const POSITION_LABEL: Record<string, string> = {
  GK: 'Goalkeeper',
  DF: 'Defender',
  MF: 'Midfielder',
  FW: 'Forward',
};

interface Props {
  team: Team | null;
  onClose: () => void;
}

export default function TeamSquadModal({ team, onClose }: Props) {
  const squad = useMemo(() => (team ? getSquadByTeam(team.id) : []), [team]);
  const open = team !== null;
  const hasGenerated = squad.some((p) => p.generated);

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!team) return null;

  const color = team.primaryColor;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${team.name} squad`}
    >
      {/* Backdrop */}
      <button
        aria-label="Close squad"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(5,8,15,0.72)', backdropFilter: 'blur(4px)' }}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-[1100px] max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{
          background: 'var(--surface, #121826)',
          border: '1px solid var(--border-strong, rgba(255,255,255,0.12))',
          borderTop: `3px solid ${color}`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-4 px-5 py-4 shrink-0"
          style={{
            borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))',
            background: `linear-gradient(135deg, ${color}22 0%, transparent 70%)`,
          }}
        >
          <span className="text-4xl leading-none">{team.flag}</span>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl text-white leading-tight truncate">{team.name}</h2>
            <p className="text-xs mt-0.5" style={{ color: '#8899AA' }}>
              Group {team.group} · FIFA #{team.fifaRank} · {squad.length}-player squad
            </p>
          </div>
          <Link
            href={`/teams/${team.slug}`}
            className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-lg hover:no-underline"
            style={{ background: `${color}22`, color: '#fff', border: `1px solid ${color}55` }}
          >
            Full profile →
          </Link>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#AEB7C7' }}
          >
            ✕
          </button>
        </div>

        {/* Squad grid — 2 cols on mobile, 4 on desktop */}
        <div className="overflow-y-auto px-4 sm:px-5 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {squad.map((p) => (
              <div
                key={p.id}
                className="glass-card p-3 sm:p-4 flex flex-col items-center text-center"
                style={{ borderTop: `2px solid ${color}` }}
              >
                <div className="relative">
                  <PlayerPhoto name={p.name} photoUrl={p.photoUrl} jersey={p.jerseyNum} color={color} size={72} rounded />
                  {/* Jersey number badge */}
                  <span
                    className="absolute -bottom-1 -right-1 font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: color, color: '#0a0e1a' }}
                  >
                    #{p.jerseyNum}
                  </span>
                </div>

                <div className="mt-3 font-bold text-sm leading-tight text-white flex items-center gap-1">
                  <span className="truncate">{p.name}</span>
                  {p.generated && (
                    <span title="Placeholder squad member (not a confirmed call-up)" style={{ color: '#6B7689' }}>
                      *
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="text-[11px] px-2 py-0.5 rounded font-semibold"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
                    title={POSITION_LABEL[p.position]}
                  >
                    {p.position}
                  </span>
                  <span
                    className="text-[11px] px-2 py-0.5 rounded font-semibold"
                    style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent-deep)' }}
                  >
                    ⚽ {p.goals}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {hasGenerated && (
            <p className="text-[11px] mt-5 text-center" style={{ color: '#6B7689' }}>
              * Placeholder squad member generated to complete the {SQUAD_SIZE}-man roster — not a confirmed call-up.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
