import { type Player, getPlayersByTeam } from './players';

// A squad is just the real players we have for a team — curated stars plus the
// real squad-depth players fetched from TheSportsDB. We no longer fabricate
// filler players to pad rosters to a fixed size.
export type SquadPlayer = Player & { generated?: boolean };

export const SQUAD_SIZE = 26;

const POSITION_ORDER: Record<Player['position'], number> = { GK: 0, DF: 1, MF: 2, FW: 3 };

/**
 * Returns the real players for a team, sorted GK → DF → MF → FW (then by jersey
 * number). Only verified players are included — never generated placeholders.
 */
export function getSquadByTeam(teamId: string): SquadPlayer[] {
  return getPlayersByTeam(teamId)
    .slice()
    .sort(
      (a, b) =>
        POSITION_ORDER[a.position] - POSITION_ORDER[b.position] ||
        (a.jerseyNum || 99) - (b.jerseyNum || 99) ||
        a.name.localeCompare(b.name),
    );
}
