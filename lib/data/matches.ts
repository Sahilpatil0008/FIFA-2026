export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamFlag: string;
  awayTeamFlag: string;
  homeScore: number | null;
  awayScore: number | null;
  htHomeScore: number | null;
  htAwayScore: number | null;
  kickoff: string;
  stage: string;
  group?: string;
  venueId: string;
  venueName: string;
  venueCity: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  minute?: number;
  homeScorers?: string[];
  awayScorers?: string[];
  attendance?: number;
}

// Fixtures align with the v2.0 spec groups (see teams.ts). Matchday 1 results
// are FINISHED; Matchday 2 marquee fixtures are LIVE / SCHEDULED.
export const matches: Match[] = [
  // ===== Matchday 1 (FINISHED) =====
  // Group A
  { id: 'M001', homeTeamId: 'mexico', awayTeamId: 'south-africa', homeTeamName: 'Mexico', awayTeamName: 'South Africa', homeTeamFlag: '🇲🇽', awayTeamFlag: '🇿🇦', homeScore: 2, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-11T19:00:00', stage: 'GROUP_A', group: 'A', venueId: 'azteca', venueName: 'Estadio Azteca', venueCity: 'Mexico City', status: 'FINISHED', homeScorers: ["Jiménez 24'", "Lozano 70'"], awayScorers: [], attendance: 87000 },
  { id: 'M002', homeTeamId: 'south-korea', awayTeamId: 'czechia', homeTeamName: 'Korea Republic', awayTeamName: 'Czechia', homeTeamFlag: '🇰🇷', awayTeamFlag: '🇨🇿', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 1, kickoff: '2026-06-11T22:00:00', stage: 'GROUP_A', group: 'A', venueId: 'akron', venueName: 'Estadio AKRON', venueCity: 'Guadalajara', status: 'FINISHED', homeScorers: ["Son 33'", "Hwang 78'"], awayScorers: ["Schick 19'"], attendance: 48000 },

  // Group B
  { id: 'M003', homeTeamId: 'canada', awayTeamId: 'qatar', homeTeamName: 'Canada', awayTeamName: 'Qatar', homeTeamFlag: '🇨🇦', awayTeamFlag: '🇶🇦', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-12T18:00:00', stage: 'GROUP_B', group: 'B', venueId: 'bmo', venueName: 'BMO Field', venueCity: 'Toronto, Canada', status: 'FINISHED', homeScorers: ["David 27'", "Larin 66'"], awayScorers: ["Afif 80'"], attendance: 30000 },
  { id: 'M004', homeTeamId: 'switzerland', awayTeamId: 'bosnia', homeTeamName: 'Switzerland', awayTeamName: 'Bosnia and Herzegovina', homeTeamFlag: '🇨🇭', awayTeamFlag: '🇧🇦', homeScore: 2, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-12T15:00:00', stage: 'GROUP_B', group: 'B', venueId: 'levis', venueName: "Levi's Stadium", venueCity: 'Santa Clara, CA', status: 'FINISHED', homeScorers: ["Embolo 18'", "Ndoye 73'"], awayScorers: [], attendance: 68000 },

  // Group C
  { id: 'M005', homeTeamId: 'brazil', awayTeamId: 'haiti', homeTeamName: 'Brazil', awayTeamName: 'Haiti', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇭🇹', homeScore: 3, awayScore: 0, htHomeScore: 2, htAwayScore: 0, kickoff: '2026-06-13T18:00:00', stage: 'GROUP_C', group: 'C', venueId: 'metlife', venueName: 'MetLife Stadium', venueCity: 'East Rutherford, NJ', status: 'FINISHED', homeScorers: ["Vinícius 12'", "Endrick 39'", "Rodrygo 71'"], awayScorers: [], attendance: 82000 },
  { id: 'M006', homeTeamId: 'morocco', awayTeamId: 'scotland', homeTeamName: 'Morocco', awayTeamName: 'Scotland', homeTeamFlag: '🇲🇦', awayTeamFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', homeScore: 1, awayScore: 1, htHomeScore: 0, htAwayScore: 1, kickoff: '2026-06-13T21:00:00', stage: 'GROUP_C', group: 'C', venueId: 'gillette', venueName: 'Gillette Stadium', venueCity: 'Foxborough, MA', status: 'FINISHED', homeScorers: ["Ziyech 75'"], awayScorers: ["McTominay 40'"], attendance: 65000 },

  // Group D
  { id: 'M007', homeTeamId: 'usa', awayTeamId: 'paraguay', homeTeamName: 'United States', awayTeamName: 'Paraguay', homeTeamFlag: '🇺🇸', awayTeamFlag: '🇵🇾', homeScore: 2, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-12T21:00:00', stage: 'GROUP_D', group: 'D', venueId: 'sofi', venueName: 'SoFi Stadium', venueCity: 'Los Angeles, CA', status: 'FINISHED', homeScorers: ["Pulisic 23'", "Weah 71'"], awayScorers: [], attendance: 70000 },
  { id: 'M008', homeTeamId: 'turkey', awayTeamId: 'australia', homeTeamName: 'Türkiye', awayTeamName: 'Australia', homeTeamFlag: '🇹🇷', awayTeamFlag: '🇦🇺', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 1, kickoff: '2026-06-13T00:00:00', stage: 'GROUP_D', group: 'D', venueId: 'bc-place', venueName: 'BC Place', venueCity: 'Vancouver, Canada', status: 'FINISHED', homeScorers: ["Güler 30'", "Yıldız 84'"], awayScorers: ["Irvine 45'"], attendance: 54000 },

  // Group E
  { id: 'M009', homeTeamId: 'germany', awayTeamId: 'curacao', homeTeamName: 'Germany', awayTeamName: 'Curaçao', homeTeamFlag: '🇩🇪', awayTeamFlag: '🇨🇼', homeScore: 3, awayScore: 0, htHomeScore: 2, htAwayScore: 0, kickoff: '2026-06-14T13:00:00', stage: 'GROUP_E', group: 'E', venueId: 'nrg', venueName: 'NRG Stadium', venueCity: 'Houston, TX', status: 'FINISHED', homeScorers: ["Musiala 15'", "Wirtz 44'", "Gnabry 71'"], awayScorers: [], attendance: 72000 },
  { id: 'M010', homeTeamId: 'ivory-coast', awayTeamId: 'ecuador', homeTeamName: "Côte d'Ivoire", awayTeamName: 'Ecuador', homeTeamFlag: '🇨🇮', awayTeamFlag: '🇪🇨', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-14T19:00:00', stage: 'GROUP_E', group: 'E', venueId: 'lincoln', venueName: 'Lincoln Financial Field', venueCity: 'Philadelphia, PA', status: 'FINISHED', homeScorers: ["Haller 35'", "Kessié 68'"], awayScorers: ["Valencia 73'"], attendance: 69000 },

  // Group F
  { id: 'M011', homeTeamId: 'netherlands', awayTeamId: 'tunisia', homeTeamName: 'Netherlands', awayTeamName: 'Tunisia', homeTeamFlag: '🇳🇱', awayTeamFlag: '🇹🇳', homeScore: 2, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-14T16:00:00', stage: 'GROUP_F', group: 'F', venueId: 'lumen', venueName: 'Lumen Field', venueCity: 'Seattle, WA', status: 'FINISHED', homeScorers: ["Gakpo 22'", "Depay 67'"], awayScorers: [], attendance: 68000 },
  { id: 'M012', homeTeamId: 'japan', awayTeamId: 'sweden', homeTeamName: 'Japan', awayTeamName: 'Sweden', homeTeamFlag: '🇯🇵', awayTeamFlag: '🇸🇪', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 1, kickoff: '2026-06-15T15:00:00', stage: 'GROUP_F', group: 'F', venueId: 'mercedes-benz', venueName: 'Mercedes-Benz Stadium', venueCity: 'Atlanta, GA', status: 'FINISHED', homeScorers: ["Kubo 38'", "Minamino 70'"], awayScorers: ["Gyökeres 44'"], attendance: 71000 },

  // Group G
  { id: 'M013', homeTeamId: 'belgium', awayTeamId: 'iran', homeTeamName: 'Belgium', awayTeamName: 'Iran', homeTeamFlag: '🇧🇪', awayTeamFlag: '🇮🇷', homeScore: 2, awayScore: 2, htHomeScore: 1, htAwayScore: 1, kickoff: '2026-06-15T18:00:00', stage: 'GROUP_G', group: 'G', venueId: 'att', venueName: "AT&T Stadium", venueCity: 'Arlington, TX', status: 'FINISHED', homeScorers: ["Lukaku 28'", "De Bruyne 66'"], awayScorers: ["Taremi 40'", "Azmoun 82'"], attendance: 80000 },
  { id: 'M014', homeTeamId: 'egypt', awayTeamId: 'new-zealand', homeTeamName: 'Egypt', awayTeamName: 'New Zealand', homeTeamFlag: '🇪🇬', awayTeamFlag: '🇳🇿', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-15T21:00:00', stage: 'GROUP_G', group: 'G', venueId: 'arrowhead', venueName: 'Arrowhead Stadium', venueCity: 'Kansas City, MO', status: 'FINISHED', homeScorers: ["Salah 30'", "Mohamed 75'"], awayScorers: ["Wood 88'"], attendance: 76000 },

  // Group H
  { id: 'M015', homeTeamId: 'spain', awayTeamId: 'cabo-verde', homeTeamName: 'Spain', awayTeamName: 'Cabo Verde', homeTeamFlag: '🇪🇸', awayTeamFlag: '🇨🇻', homeScore: 3, awayScore: 0, htHomeScore: 2, htAwayScore: 0, kickoff: '2026-06-16T19:00:00', stage: 'GROUP_H', group: 'H', venueId: 'sofi', venueName: 'SoFi Stadium', venueCity: 'Los Angeles, CA', status: 'FINISHED', homeScorers: ["Yamal 18'", "Pedri 41'", "Morata 79'"], awayScorers: [], attendance: 70000 },
  { id: 'M016', homeTeamId: 'uruguay', awayTeamId: 'saudi-arabia', homeTeamName: 'Uruguay', awayTeamName: 'Saudi Arabia', homeTeamFlag: '🇺🇾', awayTeamFlag: '🇸🇦', homeScore: 2, awayScore: 0, htHomeScore: 0, htAwayScore: 0, kickoff: '2026-06-16T16:00:00', stage: 'GROUP_H', group: 'H', venueId: 'levis', venueName: "Levi's Stadium", venueCity: 'Santa Clara, CA', status: 'FINISHED', homeScorers: ["Núñez 58'", "Pellistri 84'"], awayScorers: [], attendance: 68000 },

  // Group I
  { id: 'M017', homeTeamId: 'france', awayTeamId: 'iraq', homeTeamName: 'France', awayTeamName: 'Iraq', homeTeamFlag: '🇫🇷', awayTeamFlag: '🇮🇶', homeScore: 2, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-16T22:00:00', stage: 'GROUP_I', group: 'I', venueId: 'bc-place', venueName: 'BC Place', venueCity: 'Vancouver, Canada', status: 'FINISHED', homeScorers: ["Mbappé 34'", "Griezmann 58'"], awayScorers: [], attendance: 54000 },
  { id: 'M018', homeTeamId: 'norway', awayTeamId: 'senegal', homeTeamName: 'Norway', awayTeamName: 'Senegal', homeTeamFlag: '🇳🇴', awayTeamFlag: '🇸🇳', homeScore: 3, awayScore: 1, htHomeScore: 2, htAwayScore: 1, kickoff: '2026-06-17T18:00:00', stage: 'GROUP_I', group: 'I', venueId: 'gillette', venueName: 'Gillette Stadium', venueCity: 'Foxborough, MA', status: 'FINISHED', homeScorers: ["Haaland 11'", "Haaland 37'", "Ødegaard 70'"], awayScorers: ["Mané 45'"], attendance: 65000 },

  // Group J
  { id: 'M019', homeTeamId: 'argentina', awayTeamId: 'jordan', homeTeamName: 'Argentina', awayTeamName: 'Jordan', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇯🇴', homeScore: 3, awayScore: 1, htHomeScore: 2, htAwayScore: 0, kickoff: '2026-06-17T21:00:00', stage: 'GROUP_J', group: 'J', venueId: 'metlife', venueName: 'MetLife Stadium', venueCity: 'East Rutherford, NJ', status: 'FINISHED', homeScorers: ["Messi 12'", "Lautaro 38'", "De Paul 67'"], awayScorers: ["Al-Naimat 70'"], attendance: 82000 },
  { id: 'M020', homeTeamId: 'austria', awayTeamId: 'algeria', homeTeamName: 'Austria', awayTeamName: 'Algeria', homeTeamFlag: '🇦🇹', awayTeamFlag: '🇩🇿', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 1, kickoff: '2026-06-18T18:00:00', stage: 'GROUP_J', group: 'J', venueId: 'nrg', venueName: 'NRG Stadium', venueCity: 'Houston, TX', status: 'FINISHED', homeScorers: ["Arnautović 36'", "Baumgartner 78'"], awayScorers: ["Bounedjah 40'"], attendance: 72000 },

  // Group K
  { id: 'M021', homeTeamId: 'portugal', awayTeamId: 'congo-dr', homeTeamName: 'Portugal', awayTeamName: 'DR Congo', homeTeamFlag: '🇵🇹', awayTeamFlag: '🇨🇩', homeScore: 2, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-17T16:00:00', stage: 'GROUP_K', group: 'K', venueId: 'mercedes-benz', venueName: 'Mercedes-Benz Stadium', venueCity: 'Atlanta, GA', status: 'FINISHED', homeScorers: ["Ronaldo 8' (pen)", "Bruno Fernandes 55'"], awayScorers: [], attendance: 71000 },
  { id: 'M022', homeTeamId: 'colombia', awayTeamId: 'uzbekistan', homeTeamName: 'Colombia', awayTeamName: 'Uzbekistan', homeTeamFlag: '🇨🇴', awayTeamFlag: '🇺🇿', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-18T21:00:00', stage: 'GROUP_K', group: 'K', venueId: 'att', venueName: "AT&T Stadium", venueCity: 'Arlington, TX', status: 'FINISHED', homeScorers: ["James 31'", "Díaz 64'"], awayScorers: ["Shomurodov 80'"], attendance: 80000 },

  // Group L
  { id: 'M023', homeTeamId: 'england', awayTeamId: 'panama', homeTeamName: 'England', awayTeamName: 'Panama', homeTeamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayTeamFlag: '🇵🇦', homeScore: 3, awayScore: 0, htHomeScore: 2, htAwayScore: 0, kickoff: '2026-06-18T15:00:00', stage: 'GROUP_L', group: 'L', venueId: 'arrowhead', venueName: 'Arrowhead Stadium', venueCity: 'Kansas City, MO', status: 'FINISHED', homeScorers: ["Kane 12'", "Saka 38'", "Bellingham 56'"], awayScorers: [], attendance: 76000 },
  { id: 'M024', homeTeamId: 'croatia', awayTeamId: 'ghana', homeTeamName: 'Croatia', awayTeamName: 'Ghana', homeTeamFlag: '🇭🇷', awayTeamFlag: '🇬🇭', homeScore: 2, awayScore: 1, htHomeScore: 1, htAwayScore: 1, kickoff: '2026-06-19T15:00:00', stage: 'GROUP_L', group: 'L', venueId: 'lincoln', venueName: 'Lincoln Financial Field', venueCity: 'Philadelphia, PA', status: 'FINISHED', homeScorers: ["Modrić 25'", "Kramarić 77'"], awayScorers: ["Kudus 40'"], attendance: 69000 },

  // ===== Matchday 2 marquee fixtures =====
  // LIVE now
  { id: 'M025', homeTeamId: 'mexico', awayTeamId: 'south-korea', homeTeamName: 'Mexico', awayTeamName: 'Korea Republic', homeTeamFlag: '🇲🇽', awayTeamFlag: '🇰🇷', homeScore: 1, awayScore: 0, htHomeScore: 1, htAwayScore: 0, kickoff: '2026-06-20T19:00:00', stage: 'GROUP_A', group: 'A', venueId: 'azteca', venueName: 'Estadio Azteca', venueCity: 'Mexico City', status: 'LIVE', minute: 63, homeScorers: ["Lozano 22'"], awayScorers: [], attendance: 87000 },

  // SCHEDULED
  { id: 'M026', homeTeamId: 'switzerland', awayTeamId: 'canada', homeTeamName: 'Switzerland', awayTeamName: 'Canada', homeTeamFlag: '🇨🇭', awayTeamFlag: '🇨🇦', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-20T22:00:00', stage: 'GROUP_B', group: 'B', venueId: 'bmo', venueName: 'BMO Field', venueCity: 'Toronto, Canada', status: 'SCHEDULED' },
  { id: 'M027', homeTeamId: 'brazil', awayTeamId: 'morocco', homeTeamName: 'Brazil', awayTeamName: 'Morocco', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇲🇦', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-21T18:00:00', stage: 'GROUP_C', group: 'C', venueId: 'metlife', venueName: 'MetLife Stadium', venueCity: 'East Rutherford, NJ', status: 'SCHEDULED' },
  { id: 'M028', homeTeamId: 'usa', awayTeamId: 'turkey', homeTeamName: 'United States', awayTeamName: 'Türkiye', homeTeamFlag: '🇺🇸', awayTeamFlag: '🇹🇷', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-21T21:00:00', stage: 'GROUP_D', group: 'D', venueId: 'sofi', venueName: 'SoFi Stadium', venueCity: 'Los Angeles, CA', status: 'SCHEDULED' },
  { id: 'M029', homeTeamId: 'germany', awayTeamId: 'ivory-coast', homeTeamName: 'Germany', awayTeamName: "Côte d'Ivoire", homeTeamFlag: '🇩🇪', awayTeamFlag: '🇨🇮', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-22T18:00:00', stage: 'GROUP_E', group: 'E', venueId: 'nrg', venueName: 'NRG Stadium', venueCity: 'Houston, TX', status: 'SCHEDULED' },
  { id: 'M030', homeTeamId: 'netherlands', awayTeamId: 'japan', homeTeamName: 'Netherlands', awayTeamName: 'Japan', homeTeamFlag: '🇳🇱', awayTeamFlag: '🇯🇵', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-22T16:00:00', stage: 'GROUP_F', group: 'F', venueId: 'lumen', venueName: 'Lumen Field', venueCity: 'Seattle, WA', status: 'SCHEDULED' },
  { id: 'M031', homeTeamId: 'belgium', awayTeamId: 'egypt', homeTeamName: 'Belgium', awayTeamName: 'Egypt', homeTeamFlag: '🇧🇪', awayTeamFlag: '🇪🇬', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-23T18:00:00', stage: 'GROUP_G', group: 'G', venueId: 'att', venueName: "AT&T Stadium", venueCity: 'Arlington, TX', status: 'SCHEDULED' },
  { id: 'M032', homeTeamId: 'spain', awayTeamId: 'uruguay', homeTeamName: 'Spain', awayTeamName: 'Uruguay', homeTeamFlag: '🇪🇸', awayTeamFlag: '🇺🇾', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-23T21:00:00', stage: 'GROUP_H', group: 'H', venueId: 'levis', venueName: "Levi's Stadium", venueCity: 'Santa Clara, CA', status: 'SCHEDULED' },
  { id: 'M033', homeTeamId: 'france', awayTeamId: 'norway', homeTeamName: 'France', awayTeamName: 'Norway', homeTeamFlag: '🇫🇷', awayTeamFlag: '🇳🇴', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-24T18:00:00', stage: 'GROUP_I', group: 'I', venueId: 'gillette', venueName: 'Gillette Stadium', venueCity: 'Foxborough, MA', status: 'SCHEDULED' },
  { id: 'M034', homeTeamId: 'argentina', awayTeamId: 'austria', homeTeamName: 'Argentina', awayTeamName: 'Austria', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇦🇹', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-24T21:00:00', stage: 'GROUP_J', group: 'J', venueId: 'metlife', venueName: 'MetLife Stadium', venueCity: 'East Rutherford, NJ', status: 'SCHEDULED' },
  { id: 'M035', homeTeamId: 'portugal', awayTeamId: 'colombia', homeTeamName: 'Portugal', awayTeamName: 'Colombia', homeTeamFlag: '🇵🇹', awayTeamFlag: '🇨🇴', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-25T18:00:00', stage: 'GROUP_K', group: 'K', venueId: 'mercedes-benz', venueName: 'Mercedes-Benz Stadium', venueCity: 'Atlanta, GA', status: 'SCHEDULED' },
  { id: 'M036', homeTeamId: 'england', awayTeamId: 'croatia', homeTeamName: 'England', awayTeamName: 'Croatia', homeTeamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayTeamFlag: '🇭🇷', homeScore: null, awayScore: null, htHomeScore: null, htAwayScore: null, kickoff: '2026-06-25T21:00:00', stage: 'GROUP_L', group: 'L', venueId: 'arrowhead', venueName: 'Arrowhead Stadium', venueCity: 'Kansas City, MO', status: 'SCHEDULED' },
];

export const getMatchesByGroup = (group: string) =>
  matches.filter(m => m.group === group);

export const getMatchesByTeam = (teamId: string) =>
  matches.filter(m => m.homeTeamId === teamId || m.awayTeamId === teamId);

export const getLiveMatches = () =>
  matches.filter(m => m.status === 'LIVE');

export const getTodayMatches = () => {
  const today = new Date().toISOString().split('T')[0];
  return matches.filter(m => m.kickoff.startsWith(today));
};

export const getRecentMatches = () =>
  matches.filter(m => m.status === 'FINISHED').slice(-6);

export const getUpcomingMatches = () =>
  matches.filter(m => m.status === 'SCHEDULED').slice(0, 8);

export const stageLabels: Record<string, string> = {
  GROUP_A: 'Group A', GROUP_B: 'Group B', GROUP_C: 'Group C',
  GROUP_D: 'Group D', GROUP_E: 'Group E', GROUP_F: 'Group F',
  GROUP_G: 'Group G', GROUP_H: 'Group H', GROUP_I: 'Group I',
  GROUP_J: 'Group J', GROUP_K: 'Group K', GROUP_L: 'Group L',
  R32: 'Round of 32', R16: 'Round of 16', QF: 'Quarter-final',
  SF: 'Semi-final', FINAL: 'Final',
};
