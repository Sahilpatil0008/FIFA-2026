// Fetches REAL national-team squads from TheSportsDB (free key "3") for every
// team in lib/data/teams.ts and writes scripts/squads-raw.json.
// No fabricated players — whatever the API returns is what we use.
import { readFileSync, writeFileSync } from 'node:fs';

const KEY = '3'; // free/test key
const BASE = `https://www.thesportsdb.com/api/v1/json/${KEY}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// TheSportsDB uses some different country names than our display names.
const SEARCH_OVERRIDE = {
  'south-korea': 'South Korea',
  turkey: 'Turkey',
  usa: 'USA',
  czechia: 'Czech Republic',
  'cabo-verde': 'Cape Verde',
  curacao: 'Curacao',
  'ivory-coast': 'Ivory Coast',
  'congo-dr': 'DR Congo',
};

const BAD = /(U-?1[0-9]|U-?2[0-9]|Women|Olympic|Rugby|Hockey|Tennis|Futsal|Beach|Basketball|Cricket|Amateur| B$)/i;

// Parse teams.ts for id, name, flag, primaryColor (field order is fixed there).
function readTeams() {
  const src = readFileSync(new URL('../lib/data/teams.ts', import.meta.url), 'utf8');
  const re = /\{\s*id:\s*'([^']+)'[^}]*?name:\s*'([^']+)'[^}]*?flag:\s*'([^']*)'[^}]*?primaryColor:\s*'([^']+)'[^}]*?\}/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push({ id: m[1], name: m[2], flag: m[3], color: m[4] });
  return out;
}

async function getJSON(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'WC2026/1.0' } });
      if (res.status === 429) { await sleep(2000 * (i + 1)); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(800 * (i + 1));
    }
  }
}

async function findTeamId(team) {
  const q = SEARCH_OVERRIDE[team.id] ?? team.name;
  const d = await getJSON(`${BASE}/searchteams.php?t=${encodeURIComponent(q)}`);
  const cands = (d?.teams ?? []).filter((t) => t.strSport === 'Soccer' && !BAD.test(t.strTeam || ''));
  if (cands.length === 0) return null;
  const exact = cands.find((t) => (t.strTeam || '').toLowerCase() === q.toLowerCase());
  return (exact ?? cands[0]).idTeam;
}

async function getPlayers(idTeam) {
  const d = await getJSON(`${BASE}/lookup_all_players.php?id=${idTeam}`);
  return (d?.player ?? []).filter((p) => p.strSport === 'Soccer' || !p.strSport);
}

const teams = readTeams();
console.error(`Parsed ${teams.length} teams`);
const result = {};
for (const team of teams) {
  try {
    const id = await findTeamId(team);
    await sleep(450);
    if (!id) { result[team.id] = { name: team.name, idTeam: null, players: [] }; console.error(`✗ ${team.name}: no team match`); continue; }
    const players = await getPlayers(id);
    await sleep(450);
    result[team.id] = { name: team.name, color: team.color, flag: team.flag, idTeam: id, players };
    console.error(`✓ ${team.name} (#${id}): ${players.length} players`);
  } catch (e) {
    result[team.id] = { name: team.name, idTeam: null, players: [], error: String(e) };
    console.error(`✗ ${team.name}: ${e}`);
  }
}

writeFileSync(new URL('./squads-raw.json', import.meta.url), JSON.stringify(result, null, 2));
const counts = Object.values(result).map((r) => r.players.length);
const withPlayers = counts.filter((c) => c > 0).length;
console.error(`\nDONE. ${withPlayers}/${teams.length} teams have players. total players: ${counts.reduce((a, b) => a + b, 0)}`);
