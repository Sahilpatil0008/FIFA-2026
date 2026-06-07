'use client';

import { useMemo, useState } from 'react';
import type { Team } from '@/lib/data/teams';
import TeamSquadModal from './TeamSquadModal';

const CONFEDERATIONS = ['UEFA', 'CONMEBOL', 'CAF', 'AFC', 'CONCACAF', 'OFC'] as const;

const CONF_LABELS: Record<string, string> = {
  UEFA: '🌍 Europe (UEFA)',
  CONMEBOL: '🌎 South America (CONMEBOL)',
  CAF: '🌍 Africa (CAF)',
  AFC: '🌏 Asia (AFC)',
  CONCACAF: '🌎 North & Central America (CONCACAF)',
  OFC: '🌏 Oceania (OFC)',
};

export default function TeamsDirectory({ teams }: { teams: Team[] }) {
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  const byConfederation = useMemo(
    () =>
      teams.reduce<Record<string, Team[]>>((acc, team) => {
        (acc[team.confederation] ||= []).push(team);
        return acc;
      }, {}),
    [teams],
  );

  return (
    <>
      {CONFEDERATIONS.map((conf) => {
        const confTeams = byConfederation[conf] || [];
        if (!confTeams.length) return null;
        return (
          <section key={conf} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-3xl text-white">{CONF_LABELS[conf]}</h2>
                <p className="text-xs mt-1" style={{ color: '#8899AA' }}>
                  {confTeams.length} {confTeams.length === 1 ? 'team' : 'teams'} qualified
                </p>
              </div>
              <div className="w-px h-8" style={{ background: 'rgba(0,102,255,0.3)' }} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {confTeams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setActiveTeam(team)}
                  aria-label={`View ${team.name} squad`}
                  className="glass-card p-4 flex flex-col items-center text-center gap-2 group cursor-pointer"
                  style={{ borderTop: `3px solid ${team.primaryColor}` }}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform">{team.flag}</span>
                  <div>
                    <div className="font-bold text-sm leading-tight text-white">{team.name}</div>
                    <div className="text-xs mt-1" style={{ color: '#8899AA' }}>
                      Group {team.group} · #{team.fifaRank}
                    </div>
                    {team.wcTitles > 0 && (
                      <div className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
                        {'🏆'.repeat(team.wcTitles)} {team.wcTitles}x Champion
                      </div>
                    )}
                  </div>
                  <div
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#8899AA' }}
                  >
                    View squad →
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <TeamSquadModal team={activeTeam} onClose={() => setActiveTeam(null)} />
    </>
  );
}
