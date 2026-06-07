import { type Player, getPlayersByTeam } from './players';
import { teams } from './teams';

// ---------------------------------------------------------------------------
// Squad builder
//
// lib/data/players.ts only holds a handful of real, notable players per team.
// The team modal needs to present a full 26-man squad, so this module keeps the
// real players and deterministically generates plausible *placeholder* squad
// members to fill the roster out to 26. Generated players are flagged with
// `generated: true` so the UI can mark them honestly — they are not real
// call-ups, just roster fillers.
//
// Generation is seeded off the team id, so a given team always yields the same
// squad (no hydration mismatch, no flicker between renders).
// ---------------------------------------------------------------------------

export type SquadPlayer = Player & { generated?: boolean };

export const SQUAD_SIZE = 26;

// Target shape of a 26-man squad. 3 + 9 + 8 + 6 = 26.
const TARGET: Record<Player['position'], number> = { GK: 3, DF: 9, MF: 8, FW: 6 };
const POSITION_ORDER: Player['position'][] = ['GK', 'DF', 'MF', 'FW'];

const FIRST_NAMES = [
  'Luca', 'Mateo', 'Diego', 'Andrés', 'Marco', 'Tomás', 'Adam', 'Noah', 'Leon', 'Felix',
  'Yusuf', 'Omar', 'Karim', 'Ali', 'Hugo', 'Pablo', 'Sergio', 'Iván', 'Bruno', 'Rafael',
  'Daniel', 'Samuel', 'Victor', 'Oscar', 'Kenji', 'Hiro', 'Min-jun', 'Kwame', 'Sékou', 'Amadou',
  'Nikola', 'Stefan', 'Mehdi', 'Reza', 'Lars', 'Emil', 'Theo', 'Mathis', 'Enzo', 'Gabriel',
];

const LAST_NAMES = [
  'Silva', 'Rossi', 'Müller', 'García', 'Fernández', 'López', 'Hansen', 'Andersen', 'Kovač', 'Novak',
  'Haddad', 'Bensaïd', 'Traoré', 'Diallo', 'Okafor', 'Mensah', 'Yamada', 'Tanaka', 'Kim', 'Park',
  'Petrov', 'Ivanov', 'Costa', 'Pereira', 'Moreau', 'Dubois', 'Schmidt', 'Weber', 'Nielsen', 'Berg',
  'Suzuki', 'Khan', 'Ahmadi', 'Marković', 'Horvat', 'Almeida', 'Reyes', 'Castro', 'Vargas', 'Romero',
];

const CLUBS = [
  'Domestic League', 'Inter Milan', 'Sporting CP', 'Ajax', 'Feyenoord', 'Benfica', 'Celtic',
  'Galatasaray', 'Olympiacos', 'Shakhtar', 'River Plate', 'Boca Juniors', 'Flamengo', 'Al Hilal',
  'LA Galaxy', 'Brighton', 'Wolfsburg', 'Real Betis', 'Lyon', 'Torino',
];

// Small, fast string hash → 32-bit seed.
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 — tiny deterministic PRNG.
function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T>(arr: T[], r: number) => arr[Math.floor(r * arr.length) % arr.length];

const heightFor = (pos: Player['position'], r: number) => {
  const base = pos === 'GK' ? 188 : pos === 'DF' ? 184 : pos === 'FW' ? 181 : 178;
  return base + Math.floor(r * 8) - 3; // ±a few cm
};

/**
 * Returns a complete 26-man squad for a team: real players first (sorted GK→FW),
 * then deterministic generated fillers to reach 26.
 */
export function getSquadByTeam(teamId: string): SquadPlayer[] {
  const team = teams.find((t) => t.id === teamId);
  const flag = team?.flag ?? '';
  const nationality = team?.name ?? '';

  const real: SquadPlayer[] = getPlayersByTeam(teamId).map((p) => ({ ...p }));

  // Jersey numbers already taken by real players.
  const usedJerseys = new Set<number>(real.map((p) => p.jerseyNum));
  const freeJersey = (() => {
    let n = 1;
    return () => {
      while (usedJerseys.has(n) && n <= 99) n++;
      usedJerseys.add(n);
      return n;
    };
  })();

  // How many generated players are needed per position.
  const realByPos: Record<Player['position'], number> = { GK: 0, DF: 0, MF: 0, FW: 0 };
  real.forEach((p) => realByPos[p.position]++);

  const r = rng(hashSeed(teamId));
  const generated: SquadPlayer[] = [];

  let slot = 0;
  for (const pos of POSITION_ORDER) {
    const need = Math.max(0, TARGET[pos] - realByPos[pos]);
    for (let i = 0; i < need; i++) {
      const first = pick(FIRST_NAMES, r());
      const last = pick(LAST_NAMES, r());
      const name = `${first} ${last}`;
      const jersey = freeJersey();
      generated.push({
        id: `${teamId}-gen-${slot}`,
        name,
        slug: `${teamId}-gen-${slot}`,
        teamId,
        position: pos,
        jerseyNum: jersey,
        age: 21 + Math.floor(r() * 14),
        birthDate: '',
        birthPlace: '',
        clubTeam: pick(CLUBS, r()),
        clubCountry: '',
        nationality,
        flag,
        height: heightFor(pos, r()),
        caps: Math.floor(r() * 30),
        intGoals: pos === 'FW' ? Math.floor(r() * 6) : 0,
        goals: 0,
        assists: 0,
        appearances: 0,
        minutesPlayed: 0,
        yellowCards: 0,
        redCards: 0,
        rating: 0,
        isStarPlayer: false,
        photoUrl: undefined,
        generated: true,
      });
      slot++;
    }
  }

  const ordered = [...real, ...generated].sort(
    (a, b) =>
      POSITION_ORDER.indexOf(a.position) - POSITION_ORDER.indexOf(b.position) ||
      a.jerseyNum - b.jerseyNum,
  );

  // Guard: guarantee exactly SQUAD_SIZE (real data should never exceed targets,
  // but clamp/pad defensively so the UI contract always holds).
  if (ordered.length > SQUAD_SIZE) return ordered.slice(0, SQUAD_SIZE);
  return ordered;
}
