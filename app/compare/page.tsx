'use client';

import { useState } from 'react';
import Link from 'next/link';
import { players } from '@/lib/data/players';
import { teams } from '@/lib/data/teams';

export default function ComparePage() {
  const [player1Id, setPlayer1Id] = useState('mbappe');
  const [player2Id, setPlayer2Id] = useState('bellingham');

  const p1 = players.find(p => p.id === player1Id) || players[0];
  const p2 = players.find(p => p.id === player2Id) || players[1];
  const team1 = teams.find(t => t.id === p1.teamId);
  const team2 = teams.find(t => t.id === p2.teamId);

  const stats = [
    { label: 'Goals', key: 'goals' as const, color1: 'var(--accent)', color2: '#60A5FA', max: 8 },
    { label: 'Assists', key: 'assists' as const, color1: 'var(--accent)', color2: '#60A5FA', max: 8 },
    { label: 'Appearances', key: 'appearances' as const, color1: 'var(--accent)', color2: '#60A5FA', max: 6 },
    { label: 'Minutes Played', key: 'minutesPlayed' as const, color1: 'var(--accent)', color2: '#60A5FA', max: 540 },
    { label: 'Yellow Cards', key: 'yellowCards' as const, color1: 'var(--accent)', color2: '#60A5FA', max: 3 },
    { label: 'Rating', key: 'rating' as const, color1: 'var(--accent)', color2: '#60A5FA', max: 10 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tools</span><span>/</span><span>Compare</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">⚖️ Player Compare</h1>
        <p style={{ color: '#8899AA' }}>Side-by-side comparison of any two players at WC 2026</p>
      </div>

      {/* Player Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[{ id: player1Id, set: setPlayer1Id, color: 'var(--accent)', label: 'Player 1' }, { id: player2Id, set: setPlayer2Id, color: '#60A5FA', label: 'Player 2' }].map(({ id, set, color, label }) => (
          <div key={label} className="glass-card p-4">
            <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color }}>{label}</label>
            <select
              value={id}
              onChange={e => set(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            >
              {players.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0d1b3e' }}>
                  {p.flag} {p.name} ({p.position})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {[{ player: p1, team: team1, color: 'var(--accent)' }, { player: p2, team: team2, color: '#60A5FA' }].map(({ player, team, color }, i) => (
          <div key={i} className="glass-card p-5 text-center" style={{ borderTop: `3px solid ${color}` }}>
            <div className="text-6xl mb-3">{player.flag}</div>
            <h2 className="font-display text-3xl text-white mb-1">{player.name}</h2>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-xs px-2 py-1 rounded" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>{player.position}</span>
              <span className="text-xs" style={{ color: '#8899AA' }}>{player.clubTeam}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['Goals', player.goals, 'var(--accent)'], ['Assists', player.assists, '#60A5FA'], ['Rating', player.rating.toFixed(1), '#F97316']].map(([l, v, c]) => (
                <div key={String(l)} className="p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="font-display text-2xl" style={{ color: c as string }}>{v}</div>
                  <div className="text-xs" style={{ color: '#8899AA' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Comparison */}
      <div className="glass-card p-6 mb-6">
        <h2 className="font-display text-2xl text-white mb-6">Head-to-Head Stats</h2>
        <div className="space-y-5">
          {stats.map(stat => {
            const v1 = p1[stat.key] as number;
            const v2 = p2[stat.key] as number;
            const pct1 = (v1 / stat.max) * 100;
            const pct2 = (v2 / stat.max) * 100;
            const winner = v1 > v2 ? 'p1' : v2 > v1 ? 'p2' : 'draw';

            return (
              <div key={stat.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg" style={{ color: winner === 'p1' ? 'var(--accent)' : '#8899AA' }}>
                      {stat.label === 'Rating' ? v1.toFixed(1) : v1}
                    </span>
                    {winner === 'p1' && <span style={{ color: 'var(--accent)' }}>▲</span>}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#8899AA' }}>{stat.label}</span>
                  <div className="flex items-center gap-2">
                    {winner === 'p2' && <span style={{ color: '#60A5FA' }}>▲</span>}
                    <span className="font-bold text-lg" style={{ color: winner === 'p2' ? '#60A5FA' : '#8899AA' }}>
                      {stat.label === 'Rating' ? v2.toFixed(1) : v2}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Left bar (player 1 — fills from right) */}
                  <div className="flex-1 stat-bar-track" style={{ direction: 'rtl' }}>
                    <div className="stat-bar-fill" style={{ width: `${Math.min(100, pct1)}%`, background: 'var(--accent)', direction: 'ltr' }} />
                  </div>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  {/* Right bar (player 2) */}
                  <div className="flex-1 stat-bar-track">
                    <div className="stat-bar-fill" style={{ width: `${Math.min(100, pct2)}%`, background: '#60A5FA' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Verdict */}
      <div className="glass-card p-6" style={{ borderTop: '2px solid rgba(96,165,250,0.3)' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🤖</span>
          <h2 className="font-display text-2xl text-white">AI Verdict</h2>
        </div>
        <p className="mb-4" style={{ color: '#8899AA' }}>
          Get a detailed AI-powered comparison and verdict on who has been more impactful at WC 2026.
        </p>
        <Link
          href={`/ai?compare=${p1.slug}:${p2.slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
          style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}
        >
          Ask AI: Who is better? →
        </Link>
      </div>
    </div>
  );
}
