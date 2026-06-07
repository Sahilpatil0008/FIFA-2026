// Turns scripts/squads-raw.json (real TheSportsDB data) into
// lib/data/squad-players.ts — real squad-depth players that supplement the
// curated stars already in players.ts. Filters out managers, maps positions,
// assigns missing jersey numbers, and skips anyone already curated.
import { readFileSync, writeFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync(new URL('./squads-raw.json', import.meta.url), 'utf8'));
const playersSrc = readFileSync(new URL('../lib/data/players.ts', import.meta.url), 'utf8');

const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const slugify = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Existing curated players: collect (teamId|normName) and used slugs to dedupe.
const existingKeys = new Set();
const usedSlugs = new Set();
const reEx = /teamId:\s*'([^']+)'[^]*?name:\s*'([^']+)'/g; // not used; line based below
for (const line of playersSrc.split('\n')) {
  const tid = line.match(/teamId:\s*'([^']+)'/);
  const nm = line.match(/\bname:\s*'([^']+)'/);
  const sl = line.match(/\bslug:\s*'([^']+)'/);
  if (tid && nm) existingKeys.add(tid[1] + '|' + norm(nm[1]));
  if (sl) usedSlugs.add(sl[1]);
}

function mapPos(s) {
  s = (s || '').toLowerCase();
  if (s.includes('manager') || s.includes('coach')) return null;
  if (s.includes('goalkeeper')) return 'GK';
  if (s.includes('midfield')) return 'MF';
  if (s.includes('wing') || s.includes('forward') || s.includes('strik') || s.includes('strick')) return 'FW';
  if (s.includes('back') || s.includes('defen') || s.includes('centre') || s.includes('center')) return 'DF';
  return 'MF';
}

function ageFrom(dateBorn) {
  const d = new Date(dateBorn);
  if (isNaN(d)) return 0;
  const ref = new Date('2026-06-11');
  let a = ref.getFullYear() - d.getFullYear();
  if (ref.getMonth() < d.getMonth() || (ref.getMonth() === d.getMonth() && ref.getDate() < d.getDate())) a--;
  return a;
}

function heightFrom(h) {
  const m = (h || '').match(/(\d{3})\s*cm/);
  return m ? parseInt(m[1], 10) : 0;
}

const out = [];
let skippedExisting = 0, skippedMgr = 0;

for (const [teamId, t] of Object.entries(raw)) {
  const used = new Set();
  // First pass: record explicit numbers so assigned ones don't clash.
  for (const p of t.players) { const n = parseInt(p.strNumber, 10); if (n > 0) used.add(n); }
  const freeNum = () => { let n = 1; while (used.has(n)) n++; used.add(n); return n; };

  for (const p of t.players) {
    const pos = mapPos(p.strPosition);
    if (!pos) { skippedMgr++; continue; }
    const key = teamId + '|' + norm(p.strPlayer);
    if (existingKeys.has(key)) { skippedExisting++; continue; }
    existingKeys.add(key); // dedupe within API too

    let slug = slugify(p.strPlayer) || slugify(teamId + '-' + p.strPlayer);
    if (usedSlugs.has(slug)) slug = `${slug}-${teamId}`;
    let s2 = slug, i = 2; while (usedSlugs.has(s2)) { s2 = `${slug}-${i++}`; } slug = s2;
    usedSlugs.add(slug);

    const num = parseInt(p.strNumber, 10) > 0 ? parseInt(p.strNumber, 10) : freeNum();
    const photo = p.strCutout || p.strThumb || '';

    out.push({
      id: `${teamId}-${slug}`,
      name: p.strPlayer,
      slug,
      teamId,
      position: pos,
      jerseyNum: num,
      age: ageFrom(p.dateBorn),
      birthDate: p.dateBorn || '',
      birthPlace: p.strBirthLocation || '',
      clubTeam: p.strTeam || '',
      clubCountry: '',
      nationality: p.strNationality || t.name,
      flag: t.flag || '',
      height: heightFrom(p.strHeight),
      caps: 0, intGoals: 0, goals: 0, assists: 0, appearances: 0, minutesPlayed: 0,
      yellowCards: 0, redCards: 0, rating: 0, isStarPlayer: false,
      photoUrl: photo || undefined,
    });
  }
}

// Sort by team then position then number for readability.
const ORDER = { GK: 0, DF: 1, MF: 2, FW: 3 };
out.sort((a, b) => a.teamId.localeCompare(b.teamId) || ORDER[a.position] - ORDER[b.position] || a.jerseyNum - b.jerseyNum);

const body = out.map((p) => '  ' + JSON.stringify(p).replace(/"([a-zA-Z0-9_]+)":/g, '$1: ') + ',').join('\n');
const file = `// AUTO-GENERATED from real TheSportsDB squad data (scripts/generate-players.mjs).
// Real squad-depth players supplementing the curated stars in players.ts.
// Do not edit by hand — re-run the generator instead.
import type { Player } from './players';

export const squadPlayers: Player[] = [
${body}
];
`;

writeFileSync(new URL('../lib/data/squad-players.ts', import.meta.url), file);
console.error(`Wrote ${out.length} real squad players. Skipped ${skippedExisting} dup-of-curated, ${skippedMgr} managers.`);
