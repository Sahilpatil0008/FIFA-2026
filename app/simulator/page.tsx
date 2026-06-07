'use client';

import { useState } from 'react';
import Link from 'next/link';
import { groupStandings } from '@/lib/data/teams';

interface SimulatedMatch {
  homeTeam: string;
  homeFlag: string;
  awayTeam: string;
  awayFlag: string;
  winner?: string;
  winnerFlag?: string;
}

export default function SimulatorPage() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [simDone, setSimDone] = useState(false);

  // Build R32 matchups from group winners/runners-up
  const matchups: SimulatedMatch[] = [
    { homeTeam: 'Argentina', homeFlag: '🇦🇷', awayTeam: 'Norway', awayFlag: '🇳🇴' },
    { homeTeam: 'France', homeFlag: '🇫🇷', awayTeam: 'Austria', awayFlag: '🇦🇹' },
    { homeTeam: 'England', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayTeam: 'Colombia', awayFlag: '🇨🇴' },
    { homeTeam: 'Spain', homeFlag: '🇪🇸', awayTeam: 'Croatia', awayFlag: '🇭🇷' },
    { homeTeam: 'Brazil', homeFlag: '🇧🇷', awayTeam: 'Türkiye', awayFlag: '🇹🇷' },
    { homeTeam: 'Portugal', homeFlag: '🇵🇹', awayTeam: 'Morocco', awayFlag: '🇲🇦' },
    { homeTeam: 'Germany', homeFlag: '🇩🇪', awayTeam: 'Japan', awayFlag: '🇯🇵' },
    { homeTeam: 'USA', homeFlag: '🇺🇸', awayTeam: "Côte d'Ivoire", awayFlag: '🇨🇮' },
  ];

  const r16Teams = matchups.map((m, i) => selections[`r32_${i}`] || null);
  const qfTeams = matchups.slice(0, 4).map((_, i) => {
    const a = r16Teams[i * 2];
    const b = r16Teams[i * 2 + 1];
    return selections[`r16_${i}`] || null;
  });

  const selectWinner = (stage: string, matchIndex: number, team: string, flag: string) => {
    setSelections(prev => ({ ...prev, [`${stage}_${matchIndex}`]: `${team}|${flag}` }));
  };

  const getSelection = (stage: string, idx: number) => {
    const val = selections[`${stage}_${idx}`];
    if (!val) return null;
    const [name, flag] = val.split('|');
    return { name, flag };
  };

  const champion = getSelection('final', 0);

  const resetSimulator = () => {
    setSelections({});
    setSimDone(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tools</span><span>/</span><span>Simulator</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">🎮 Bracket Simulator</h1>
        <p style={{ color: '#8899AA' }}>Pick winners in every round and simulate your World Cup. Who will lift the trophy?</p>
      </div>

      {champion && (
        <div className="glass-card p-6 mb-8 text-center animate-glow" style={{ borderTop: '3px solid var(--accent)' }}>
          <div className="text-6xl mb-2">{champion.flag}</div>
          <h2 className="font-display text-4xl text-white mb-1">Your Predicted Champion</h2>
          <p className="font-display text-2xl" style={{ color: 'var(--accent)' }}>{champion.name}</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={resetSimulator} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#8899AA' }}>
              Reset & Try Again
            </button>
            <Link href="/ai" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}>
              🤖 Get AI Analysis
            </Link>
          </div>
        </div>
      )}

      {/* Round of 32 */}
      <section className="mb-10">
        <h2 className="font-display text-3xl text-white mb-5">Round of 32</h2>
        <p className="text-sm mb-5" style={{ color: '#8899AA' }}>Click to pick a winner in each matchup</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {matchups.map((match, i) => {
            const sel = getSelection('r32', i);
            return (
              <div key={i} className="glass-card p-3">
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#8899AA' }}>Match {i + 1}</div>
                <div className="space-y-2">
                  {[{ team: match.homeTeam, flag: match.homeFlag }, { team: match.awayTeam, flag: match.awayFlag }].map(side => (
                    <button
                      key={side.team}
                      onClick={() => selectWinner('r32', i, side.team, side.flag)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: sel?.name === side.team ? 'rgba(0,200,83,0.15)' : 'rgba(255,255,255,0.03)',
                        border: sel?.name === side.team ? '1px solid rgba(0,200,83,0.4)' : '1px solid rgba(255,255,255,0.06)',
                        color: sel?.name === side.team ? '#00C853' : 'white',
                      }}
                    >
                      <span className="text-xl">{side.flag}</span>
                      <span className="flex-1 text-left text-xs">{side.team}</span>
                      {sel?.name === side.team && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Round of 16 */}
      <section className="mb-10">
        <h2 className="font-display text-3xl text-white mb-5">Round of 16</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => {
            const teamA = getSelection('r32', i * 2);
            const teamB = getSelection('r32', i * 2 + 1);
            const sel = getSelection('r16', i);
            const locked = !teamA || !teamB;

            return (
              <div key={i} className="glass-card p-3">
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#8899AA' }}>QF {i + 1} Winner</div>
                {locked ? (
                  <div className="text-center py-4 text-xs" style={{ color: '#8899AA' }}>
                    Pick Round of 32 winners first
                  </div>
                ) : (
                  <div className="space-y-2">
                    {[teamA, teamB].filter(Boolean).map(team => team && (
                      <button
                        key={team.name}
                        onClick={() => selectWinner('r16', i, team.name, team.flag)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg text-sm font-semibold transition-all"
                        style={{
                          background: sel?.name === team.name ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.03)',
                          border: sel?.name === team.name ? '1px solid rgba(96,165,250,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          color: sel?.name === team.name ? '#60A5FA' : 'white',
                        }}
                      >
                        <span className="text-xl">{team.flag}</span>
                        <span className="flex-1 text-left text-xs">{team.name}</span>
                        {sel?.name === team.name && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Semi-finals */}
      <section className="mb-10">
        <h2 className="font-display text-3xl text-white mb-5">Semi-finals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[[0, 1], [2, 3]].map(([a, b], sfIdx) => {
            const teamA = getSelection('r16', a);
            const teamB = getSelection('r16', b);
            const sel = getSelection('sf', sfIdx);
            const locked = !teamA || !teamB;

            return (
              <div key={sfIdx} className="glass-card p-4">
                <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#8899AA' }}>SF {sfIdx + 1}</div>
                {locked ? (
                  <div className="text-center py-4 text-xs" style={{ color: '#8899AA' }}>Pick QF winners first</div>
                ) : (
                  <div className="space-y-2">
                    {[teamA, teamB].filter(Boolean).map(team => team && (
                      <button
                        key={team.name}
                        onClick={() => selectWinner('sf', sfIdx, team.name, team.flag)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition-all"
                        style={{
                          background: sel?.name === team.name ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.03)',
                          border: sel?.name === team.name ? '1px solid rgba(167,139,250,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          color: sel?.name === team.name ? '#A78BFA' : 'white',
                        }}
                      >
                        <span className="text-2xl">{team.flag}</span>
                        <span className="flex-1 text-left">{team.name}</span>
                        {sel?.name === team.name && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final */}
      <section>
        <h2 className="font-display text-3xl text-white mb-5">🏆 Final</h2>
        <div className="glass-card p-6 max-w-lg mx-auto text-center">
          {(() => {
            const teamA = getSelection('sf', 0);
            const teamB = getSelection('sf', 1);
            const sel = getSelection('final', 0);
            const locked = !teamA || !teamB;

            if (locked) return (
              <div>
                <div className="text-5xl mb-3">🏆</div>
                <p className="text-sm" style={{ color: '#8899AA' }}>Pick semi-final winners to reveal the Final</p>
              </div>
            );

            return (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>World Cup Final · July 19, 2026</p>
                <div className="flex items-center justify-center gap-6 mb-6">
                  {[teamA, teamB].filter(Boolean).map((team, ti) => team && (
                    <div key={ti}>
                      <button
                        onClick={() => selectWinner('final', 0, team.name, team.flag)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${sel?.name === team.name ? 'ring-2 ring-offset-2' : ''}`}
                        style={{
                          background: sel?.name === team.name ? 'rgba(0,102,255,0.2)' : 'rgba(255,255,255,0.04)',
                          border: sel?.name === team.name ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                          outline: sel?.name === team.name ? '2px solid var(--accent)' : 'none',
                          outlineOffset: '2px',
                        }}
                      >
                        <span className="text-5xl">{team.flag}</span>
                        <span className="font-bold">{team.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
                {sel && (
                  <div className="text-center">
                    <div className="text-4xl mb-2">{sel.flag}</div>
                    <div className="font-display text-2xl text-white">🏆 {sel.name}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--accent)' }}>Your World Cup Champion!</div>
                  </div>
                )}
                {!sel && <p className="text-sm" style={{ color: '#8899AA' }}>Click a team to crown your champion</p>}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
