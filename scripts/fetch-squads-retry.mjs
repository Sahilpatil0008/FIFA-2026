// Re-fetches ONLY the teams missing/empty in squads-raw.json, slowly, to dodge
// TheSportsDB free-key rate limits. Merges results back into squads-raw.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const KEY = '3';
const BASE = `https://www.thesportsdb.com/api/v1/json/${KEY}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SEARCH_OVERRIDE = {
  'south-korea': 'South Korea', turkey: 'Turkey', usa: 'USA',
  czechia: 'Czech Republic', 'cabo-verde': 'Cape Verde', curacao: 'Curacao',
  'ivory-coast': 'Ivory Coast', 'congo-dr': 'DR Congo',
};
const BAD = /(U-?1[0-9]|U-?2[0-9]|Women|Olympic|Rugby|Hockey|Tennis|Futsal|Beach|Basketball|Cricket|Amateur| B$)/i;

// Robust line-based parse — catches every team object (one per line).
function readTeams() {
  const src = readFileSync(new URL('../lib/data/teams.ts', import.meta.url), 'utf8');
  const out = [];
  for (const line of src.split('\n')) {
    const id = line.match(/\bid:\s*'([^']+)'/);
    if (!id || !/primaryColor:/.test(line)) continue;
    const name = line.match(/\bname:\s*'([^']+)'/);
    const flag = line.match(/\bflag:\s*'([^']*)'/);
    const color = line.match(/primaryColor:\s*'([^']+)'/);
    out.push({ id: id[1], name: name?.[1] ?? id[1], flag: flag?.[1] ?? '', color: color?.[1] ?? '#0066FF' });
  }
  return out;
}

async function getJSON(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'WC2026/1.0' } });
      if (res.status === 429) { await sleep(3000 * (i + 1)); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(1500 * (i + 1));
    }
  }
}

async function findTeamId(team) {
  const q = SEARCH_OVERRIDE[team.id] ?? team.name;
  const d = await getJSON(`${BASE}/searchteams.php?t=${encodeURIComponent(q)}`);
  const cands = (d?.teams ?? []).filter((t) => t.strSport === 'Soccer' && !BAD.test(t.strTeam || ''));
  if (!cands.length) return null;
  const exact = cands.find((t) => (t.strTeam || '').toLowerCase() === q.toLowerCase());
  return (exact ?? cands[0]).idTeam;
}

const teams = readTeams();
console.error(`Parsed ${teams.length} teams (robust)`);

const path = new URL('./squads-raw.json', import.meta.url);
const data = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};

const todo = teams.filter((t) => !data[t.id] || !(data[t.id].players?.length > 0));
console.error(`Re-fetching ${todo.length}: ${todo.map((t) => t.name).join(', ')}`);

for (const team of todo) {
  try {
    const id = await findTeamId(team);
    await sleep(1200);
    if (!id) { console.error(`✗ ${team.name}: no match`); continue; }
    const d = await getJSON(`${BASE}/lookup_all_players.php?id=${id}`);
    const players = (d?.player ?? []).filter((p) => p.strSport === 'Soccer' || !p.strSport);
    data[team.id] = { name: team.name, color: team.color, flag: team.flag, idTeam: id, players };
    console.error(`✓ ${team.name} (#${id}): ${players.length}`);
    await sleep(1200);
  } catch (e) {
    console.error(`✗ ${team.name}: ${e}`);
  }
}

writeFileSync(path, JSON.stringify(data, null, 2));
const withPlayers = Object.values(data).filter((r) => r.players?.length > 0).length;
const total = Object.values(data).reduce((a, r) => a + (r.players?.length || 0), 0);
console.error(`\nDONE. ${withPlayers}/${teams.length} teams have players. total: ${total}`);
