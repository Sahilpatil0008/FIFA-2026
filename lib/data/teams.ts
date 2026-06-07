export interface Team {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  flag: string;
  confederation: 'UEFA' | 'CONMEBOL' | 'CAF' | 'AFC' | 'CONCACAF' | 'OFC';
  group: string;
  fifaRank: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  wcTitles: number;
  wcAppearances: number;
  coachName: string;
  continent: string;
  qualified: boolean;
}

export interface GroupStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

// Groups verified against the FIFA World Cup 2026 v2.0 spec (12 groups, 48 teams).
export const teams: Team[] = [
  // Group A
  { id: 'mexico', name: 'Mexico', shortName: 'MEX', slug: 'mexico', flag: '🇲🇽', confederation: 'CONCACAF', group: 'A', fifaRank: 16, primaryColor: '#006847', secondaryColor: '#FFFFFF', accentColor: '#CE1126', wcTitles: 0, wcAppearances: 17, coachName: 'Javier Aguirre', continent: 'North America', qualified: true },
  { id: 'south-africa', name: 'South Africa', shortName: 'RSA', slug: 'south-africa', flag: '🇿🇦', confederation: 'CAF', group: 'A', fifaRank: 60, primaryColor: '#007A4D', secondaryColor: '#FFB612', accentColor: '#E03C31', wcTitles: 0, wcAppearances: 3, coachName: 'Hugo Broos', continent: 'Africa', qualified: true },
  { id: 'south-korea', name: 'Korea Republic', shortName: 'KOR', slug: 'south-korea', flag: '🇰🇷', confederation: 'AFC', group: 'A', fifaRank: 25, primaryColor: '#CD2E3A', secondaryColor: '#0047A0', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 11, coachName: 'Hong Myung-bo', continent: 'Asia', qualified: true },
  { id: 'czechia', name: 'Czechia', shortName: 'CZE', slug: 'czechia', flag: '🇨🇿', confederation: 'UEFA', group: 'A', fifaRank: 40, primaryColor: '#D7141A', secondaryColor: '#FFFFFF', accentColor: '#11457E', wcTitles: 0, wcAppearances: 1, coachName: 'Ivan Hašek', continent: 'Europe', qualified: true },

  // Group B
  { id: 'canada', name: 'Canada', shortName: 'CAN', slug: 'canada', flag: '🇨🇦', confederation: 'CONCACAF', group: 'B', fifaRank: 42, primaryColor: '#FF0000', secondaryColor: '#FFFFFF', accentColor: '#FF0000', wcTitles: 0, wcAppearances: 2, coachName: 'Jesse Marsch', continent: 'North America', qualified: true },
  { id: 'switzerland', name: 'Switzerland', shortName: 'SUI', slug: 'switzerland', flag: '🇨🇭', confederation: 'UEFA', group: 'B', fifaRank: 22, primaryColor: '#FF0000', secondaryColor: '#FFFFFF', accentColor: '#FF0000', wcTitles: 0, wcAppearances: 12, coachName: 'Murat Yakin', continent: 'Europe', qualified: true },
  { id: 'qatar', name: 'Qatar', shortName: 'QAT', slug: 'qatar', flag: '🇶🇦', confederation: 'AFC', group: 'B', fifaRank: 37, primaryColor: '#8D1B3D', secondaryColor: '#FFFFFF', accentColor: '#8D1B3D', wcTitles: 0, wcAppearances: 2, coachName: 'Marquez López', continent: 'Asia', qualified: true },
  { id: 'bosnia', name: 'Bosnia and Herzegovina', shortName: 'BIH', slug: 'bosnia-herzegovina', flag: '🇧🇦', confederation: 'UEFA', group: 'B', fifaRank: 74, primaryColor: '#002F6C', secondaryColor: '#FECB00', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 1, coachName: 'Sergej Barbarez', continent: 'Europe', qualified: true },

  // Group C
  { id: 'brazil', name: 'Brazil', shortName: 'BRA', slug: 'brazil', flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C', fifaRank: 4, primaryColor: '#009C3B', secondaryColor: '#FEDD00', accentColor: '#009FC3', wcTitles: 5, wcAppearances: 22, coachName: 'Dorival Júnior', continent: 'South America', qualified: true },
  { id: 'morocco', name: 'Morocco', shortName: 'MAR', slug: 'morocco', flag: '🇲🇦', confederation: 'CAF', group: 'C', fifaRank: 14, primaryColor: '#C1272D', secondaryColor: '#006233', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 7, coachName: 'Walid Regragui', continent: 'Africa', qualified: true },
  { id: 'haiti', name: 'Haiti', shortName: 'HAI', slug: 'haiti', flag: '🇭🇹', confederation: 'CONCACAF', group: 'C', fifaRank: 83, primaryColor: '#00209F', secondaryColor: '#D21034', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 1, coachName: 'Sébastien Migné', continent: 'North America', qualified: true },
  { id: 'scotland', name: 'Scotland', shortName: 'SCO', slug: 'scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', group: 'C', fifaRank: 30, primaryColor: '#003F87', secondaryColor: '#FFFFFF', accentColor: '#FFCE00', wcTitles: 0, wcAppearances: 8, coachName: 'Steve Clarke', continent: 'Europe', qualified: true },

  // Group D
  { id: 'usa', name: 'United States', shortName: 'USA', slug: 'usa', flag: '🇺🇸', confederation: 'CONCACAF', group: 'D', fifaRank: 13, primaryColor: '#3C3B6E', secondaryColor: '#FFFFFF', accentColor: '#B22234', wcTitles: 0, wcAppearances: 11, coachName: 'Mauricio Pochettino', continent: 'North America', qualified: true },
  { id: 'paraguay', name: 'Paraguay', shortName: 'PAR', slug: 'paraguay', flag: '🇵🇾', confederation: 'CONMEBOL', group: 'D', fifaRank: 58, primaryColor: '#D52B1E', secondaryColor: '#0038A8', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 9, coachName: 'Gustavo Alfaro', continent: 'South America', qualified: true },
  { id: 'australia', name: 'Australia', shortName: 'AUS', slug: 'australia', flag: '🇦🇺', confederation: 'AFC', group: 'D', fifaRank: 24, primaryColor: '#FFCD00', secondaryColor: '#00843D', accentColor: '#002B7F', wcTitles: 0, wcAppearances: 6, coachName: 'Tony Popovic', continent: 'Oceania', qualified: true },
  { id: 'turkey', name: 'Türkiye', shortName: 'TUR', slug: 'turkey', flag: '🇹🇷', confederation: 'UEFA', group: 'D', fifaRank: 27, primaryColor: '#E30A17', secondaryColor: '#FFFFFF', accentColor: '#E30A17', wcTitles: 0, wcAppearances: 2, coachName: 'Vincenzo Montella', continent: 'Europe', qualified: true },

  // Group E
  { id: 'germany', name: 'Germany', shortName: 'GER', slug: 'germany', flag: '🇩🇪', confederation: 'UEFA', group: 'E', fifaRank: 6, primaryColor: '#000000', secondaryColor: '#DD0000', accentColor: '#FFCE00', wcTitles: 4, wcAppearances: 20, coachName: 'Julian Nagelsmann', continent: 'Europe', qualified: true },
  { id: 'curacao', name: 'Curaçao', shortName: 'CUW', slug: 'curacao', flag: '🇨🇼', confederation: 'CONCACAF', group: 'E', fifaRank: 82, primaryColor: '#002B7F', secondaryColor: '#F9E814', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 0, coachName: 'Dick Advocaat', continent: 'North America', qualified: true },
  { id: 'ivory-coast', name: "Côte d'Ivoire", shortName: 'CIV', slug: 'ivory-coast', flag: '🇨🇮', confederation: 'CAF', group: 'E', fifaRank: 48, primaryColor: '#F77F00', secondaryColor: '#FFFFFF', accentColor: '#009A44', wcTitles: 0, wcAppearances: 4, coachName: 'Emerse Faé', continent: 'Africa', qualified: true },
  { id: 'ecuador', name: 'Ecuador', shortName: 'ECU', slug: 'ecuador', flag: '🇪🇨', confederation: 'CONMEBOL', group: 'E', fifaRank: 37, primaryColor: '#FFD100', secondaryColor: '#003580', accentColor: '#FF0000', wcTitles: 0, wcAppearances: 4, coachName: 'Sebastián Beccacece', continent: 'South America', qualified: true },

  // Group F
  { id: 'netherlands', name: 'Netherlands', shortName: 'NED', slug: 'netherlands', flag: '🇳🇱', confederation: 'UEFA', group: 'F', fifaRank: 8, primaryColor: '#FF6600', secondaryColor: '#FFFFFF', accentColor: '#003DA5', wcTitles: 0, wcAppearances: 11, coachName: 'Ronald Koeman', continent: 'Europe', qualified: true },
  { id: 'japan', name: 'Japan', shortName: 'JPN', slug: 'japan', flag: '🇯🇵', confederation: 'AFC', group: 'F', fifaRank: 18, primaryColor: '#BC002D', secondaryColor: '#FFFFFF', accentColor: '#BC002D', wcTitles: 0, wcAppearances: 8, coachName: 'Hajime Moriyasu', continent: 'Asia', qualified: true },
  { id: 'tunisia', name: 'Tunisia', shortName: 'TUN', slug: 'tunisia', flag: '🇹🇳', confederation: 'CAF', group: 'F', fifaRank: 41, primaryColor: '#E70013', secondaryColor: '#FFFFFF', accentColor: '#E70013', wcTitles: 0, wcAppearances: 6, coachName: 'Sami Trabelsi', continent: 'Africa', qualified: true },
  { id: 'sweden', name: 'Sweden', shortName: 'SWE', slug: 'sweden', flag: '🇸🇪', confederation: 'UEFA', group: 'F', fifaRank: 27, primaryColor: '#006AA7', secondaryColor: '#FECC00', accentColor: '#006AA7', wcTitles: 0, wcAppearances: 12, coachName: 'Jon Dahl Tomasson', continent: 'Europe', qualified: true },

  // Group G
  { id: 'belgium', name: 'Belgium', shortName: 'BEL', slug: 'belgium', flag: '🇧🇪', confederation: 'UEFA', group: 'G', fifaRank: 12, primaryColor: '#000000', secondaryColor: '#FAE042', accentColor: '#EF3340', wcTitles: 0, wcAppearances: 14, coachName: 'Domenico Tedesco', continent: 'Europe', qualified: true },
  { id: 'egypt', name: 'Egypt', shortName: 'EGY', slug: 'egypt', flag: '🇪🇬', confederation: 'CAF', group: 'G', fifaRank: 38, primaryColor: '#CE1126', secondaryColor: '#FFFFFF', accentColor: '#000000', wcTitles: 0, wcAppearances: 3, coachName: 'Hossam Hassan', continent: 'Africa', qualified: true },
  { id: 'iran', name: 'Iran', shortName: 'IRN', slug: 'iran', flag: '🇮🇷', confederation: 'AFC', group: 'G', fifaRank: 23, primaryColor: '#239F40', secondaryColor: '#FFFFFF', accentColor: '#DA0000', wcTitles: 0, wcAppearances: 6, coachName: 'Amir Ghalenoei', continent: 'Asia', qualified: true },
  { id: 'new-zealand', name: 'New Zealand', shortName: 'NZL', slug: 'new-zealand', flag: '🇳🇿', confederation: 'OFC', group: 'G', fifaRank: 92, primaryColor: '#00247D', secondaryColor: '#FFFFFF', accentColor: '#CC142B', wcTitles: 0, wcAppearances: 2, coachName: 'Darren Bazeley', continent: 'Oceania', qualified: true },

  // Group H
  { id: 'spain', name: 'Spain', shortName: 'ESP', slug: 'spain', flag: '🇪🇸', confederation: 'UEFA', group: 'H', fifaRank: 3, primaryColor: '#AA151B', secondaryColor: '#F1BF00', accentColor: '#AA151B', wcTitles: 1, wcAppearances: 16, coachName: 'Luis de la Fuente', continent: 'Europe', qualified: true },
  { id: 'cabo-verde', name: 'Cabo Verde', shortName: 'CPV', slug: 'cabo-verde', flag: '🇨🇻', confederation: 'CAF', group: 'H', fifaRank: 70, primaryColor: '#003893', secondaryColor: '#FFFFFF', accentColor: '#CF2027', wcTitles: 0, wcAppearances: 0, coachName: 'Bubista', continent: 'Africa', qualified: true },
  { id: 'saudi-arabia', name: 'Saudi Arabia', shortName: 'KSA', slug: 'saudi-arabia', flag: '🇸🇦', confederation: 'AFC', group: 'H', fifaRank: 56, primaryColor: '#006C35', secondaryColor: '#FFFFFF', accentColor: '#006C35', wcTitles: 0, wcAppearances: 7, coachName: 'Hervé Renard', continent: 'Asia', qualified: true },
  { id: 'uruguay', name: 'Uruguay', shortName: 'URU', slug: 'uruguay', flag: '🇺🇾', confederation: 'CONMEBOL', group: 'H', fifaRank: 15, primaryColor: '#75AADB', secondaryColor: '#FFFFFF', accentColor: '#FFFFFF', wcTitles: 2, wcAppearances: 14, coachName: 'Marcelo Bielsa', continent: 'South America', qualified: true },

  // Group I
  { id: 'france', name: 'France', shortName: 'FRA', slug: 'france', flag: '🇫🇷', confederation: 'UEFA', group: 'I', fifaRank: 2, primaryColor: '#002395', secondaryColor: '#ED2939', accentColor: '#FFFFFF', wcTitles: 2, wcAppearances: 16, coachName: 'Didier Deschamps', continent: 'Europe', qualified: true },
  { id: 'senegal', name: 'Senegal', shortName: 'SEN', slug: 'senegal', flag: '🇸🇳', confederation: 'CAF', group: 'I', fifaRank: 20, primaryColor: '#00853F', secondaryColor: '#FCD116', accentColor: '#E31B23', wcTitles: 0, wcAppearances: 4, coachName: 'Aliou Cissé', continent: 'Africa', qualified: true },
  { id: 'norway', name: 'Norway', shortName: 'NOR', slug: 'norway', flag: '🇳🇴', confederation: 'UEFA', group: 'I', fifaRank: 32, primaryColor: '#BA0C2F', secondaryColor: '#FFFFFF', accentColor: '#00205B', wcTitles: 0, wcAppearances: 3, coachName: 'Ståle Solbakken', continent: 'Europe', qualified: true },
  { id: 'iraq', name: 'Iraq', shortName: 'IRQ', slug: 'iraq', flag: '🇮🇶', confederation: 'AFC', group: 'I', fifaRank: 66, primaryColor: '#CE1126', secondaryColor: '#007A3D', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 1, coachName: 'Jesús Casas', continent: 'Asia', qualified: true },

  // Group J
  { id: 'argentina', name: 'Argentina', shortName: 'ARG', slug: 'argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J', fifaRank: 1, primaryColor: '#74ACDF', secondaryColor: '#FFFFFF', accentColor: '#F6B40E', wcTitles: 3, wcAppearances: 18, coachName: 'Lionel Scaloni', continent: 'South America', qualified: true },
  { id: 'algeria', name: 'Algeria', shortName: 'ALG', slug: 'algeria', flag: '🇩🇿', confederation: 'CAF', group: 'J', fifaRank: 37, primaryColor: '#006233', secondaryColor: '#FFFFFF', accentColor: '#D21034', wcTitles: 0, wcAppearances: 4, coachName: 'Vladimir Petković', continent: 'Africa', qualified: true },
  { id: 'austria', name: 'Austria', shortName: 'AUT', slug: 'austria', flag: '🇦🇹', confederation: 'UEFA', group: 'J', fifaRank: 26, primaryColor: '#ED2939', secondaryColor: '#FFFFFF', accentColor: '#ED2939', wcTitles: 0, wcAppearances: 7, coachName: 'Ralf Rangnick', continent: 'Europe', qualified: true },
  { id: 'jordan', name: 'Jordan', shortName: 'JOR', slug: 'jordan', flag: '🇯🇴', confederation: 'AFC', group: 'J', fifaRank: 71, primaryColor: '#007A3D', secondaryColor: '#CE1126', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 1, coachName: 'Jamal Sellami', continent: 'Asia', qualified: true },

  // Group K
  { id: 'portugal', name: 'Portugal', shortName: 'POR', slug: 'portugal', flag: '🇵🇹', confederation: 'UEFA', group: 'K', fifaRank: 7, primaryColor: '#006600', secondaryColor: '#FF0000', accentColor: '#FFD700', wcTitles: 0, wcAppearances: 8, coachName: 'Roberto Martínez', continent: 'Europe', qualified: true },
  { id: 'uzbekistan', name: 'Uzbekistan', shortName: 'UZB', slug: 'uzbekistan', flag: '🇺🇿', confederation: 'AFC', group: 'K', fifaRank: 57, primaryColor: '#1EB53A', secondaryColor: '#FFFFFF', accentColor: '#0099B5', wcTitles: 0, wcAppearances: 0, coachName: 'Timur Kapadze', continent: 'Asia', qualified: true },
  { id: 'colombia', name: 'Colombia', shortName: 'COL', slug: 'colombia', flag: '🇨🇴', confederation: 'CONMEBOL', group: 'K', fifaRank: 9, primaryColor: '#FCD116', secondaryColor: '#003087', accentColor: '#CE1126', wcTitles: 0, wcAppearances: 7, coachName: 'Néstor Lorenzo', continent: 'South America', qualified: true },
  { id: 'congo-dr', name: 'DR Congo', shortName: 'COD', slug: 'congo-dr', flag: '🇨🇩', confederation: 'CAF', group: 'K', fifaRank: 56, primaryColor: '#007FFF', secondaryColor: '#F7D618', accentColor: '#CE1021', wcTitles: 0, wcAppearances: 1, coachName: 'Sébastien Desabre', continent: 'Africa', qualified: true },

  // Group L
  { id: 'england', name: 'England', shortName: 'ENG', slug: 'england', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', group: 'L', fifaRank: 5, primaryColor: '#CF142B', secondaryColor: '#FFFFFF', accentColor: '#012169', wcTitles: 1, wcAppearances: 16, coachName: 'Lee Carsley', continent: 'Europe', qualified: true },
  { id: 'croatia', name: 'Croatia', shortName: 'CRO', slug: 'croatia', flag: '🇭🇷', confederation: 'UEFA', group: 'L', fifaRank: 10, primaryColor: '#FF0000', secondaryColor: '#FFFFFF', accentColor: '#171796', wcTitles: 0, wcAppearances: 7, coachName: 'Zlatko Dalić', continent: 'Europe', qualified: true },
  { id: 'ghana', name: 'Ghana', shortName: 'GHA', slug: 'ghana', flag: '🇬🇭', confederation: 'CAF', group: 'L', fifaRank: 66, primaryColor: '#006B3F', secondaryColor: '#FCD116', accentColor: '#EF3340', wcTitles: 0, wcAppearances: 4, coachName: 'Otto Addo', continent: 'Africa', qualified: true },
  { id: 'panama', name: 'Panama', shortName: 'PAN', slug: 'panama', flag: '🇵🇦', confederation: 'CONCACAF', group: 'L', fifaRank: 49, primaryColor: '#DA121A', secondaryColor: '#1B3A6B', accentColor: '#FFFFFF', wcTitles: 0, wcAppearances: 2, coachName: 'Thomas Christiansen', continent: 'North America', qualified: true },
];

export const getTeamBySlug = (slug: string) => teams.find(t => t.slug === slug);
export const getTeamsByGroup = (group: string) => teams.filter(t => t.group === group);
export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const t = (id: string) => teams.find(team => team.id === id)!;

export const groupStandings: Record<string, GroupStanding[]> = {
  A: [
    { team: t('mexico'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 6, form: ['W', 'W'] },
    { team: t('south-korea'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDiff: 0, points: 3, form: ['W', 'L'] },
    { team: t('south-africa'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 3, form: ['L', 'W'] },
    { team: t('czechia'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0, form: ['L', 'L'] },
  ],
  B: [
    { team: t('switzerland'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 6, form: ['W', 'W'] },
    { team: t('canada'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDiff: 0, points: 3, form: ['W', 'L'] },
    { team: t('qatar'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 3, form: ['L', 'W'] },
    { team: t('bosnia'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0, form: ['L', 'L'] },
  ],
  C: [
    { team: t('brazil'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDiff: 4, points: 6, form: ['W', 'W'] },
    { team: t('morocco'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, goalDiff: 2, points: 4, form: ['D', 'W'] },
    { team: t('scotland'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 1, form: ['L', 'D'] },
    { team: t('haiti'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 6, goalDiff: -5, points: 0, form: ['L', 'L'] },
  ],
  D: [
    { team: t('usa'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 6, form: ['W', 'W'] },
    { team: t('turkey'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 3, form: ['W', 'L'] },
    { team: t('australia'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 3, form: ['L', 'W'] },
    { team: t('paraguay'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0, form: ['L', 'L'] },
  ],
  E: [
    { team: t('germany'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDiff: 4, points: 6, form: ['W', 'W'] },
    { team: t('ivory-coast'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 4, form: ['W', 'D'] },
    { team: t('ecuador'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 1, form: ['D', 'L'] },
    { team: t('curacao'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDiff: -4, points: 0, form: ['L', 'L'] },
  ],
  F: [
    { team: t('netherlands'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 6, form: ['W', 'W'] },
    { team: t('japan'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDiff: 0, points: 3, form: ['W', 'L'] },
    { team: t('sweden'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 3, form: ['L', 'W'] },
    { team: t('tunisia'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0, form: ['L', 'L'] },
  ],
  G: [
    { team: t('belgium'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, goalDiff: 2, points: 4, form: ['D', 'W'] },
    { team: t('egypt'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 4, form: ['W', 'D'] },
    { team: t('iran'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 1, form: ['L', 'D'] },
    { team: t('new-zealand'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDiff: -2, points: 1, form: ['D', 'L'] },
  ],
  H: [
    { team: t('spain'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 0, goalDiff: 5, points: 6, form: ['W', 'W'] },
    { team: t('uruguay'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDiff: 2, points: 4, form: ['W', 'D'] },
    { team: t('saudi-arabia'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDiff: -2, points: 1, form: ['D', 'L'] },
    { team: t('cabo-verde'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 6, goalDiff: -5, points: 0, form: ['L', 'L'] },
  ],
  I: [
    { team: t('france'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 6, form: ['W', 'W'] },
    { team: t('norway'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 3, form: ['W', 'L'] },
    { team: t('senegal'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 3, form: ['L', 'W'] },
    { team: t('iraq'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDiff: -4, points: 0, form: ['L', 'L'] },
  ],
  J: [
    { team: t('argentina'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDiff: 4, points: 6, form: ['W', 'W'] },
    { team: t('austria'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 4, form: ['W', 'D'] },
    { team: t('algeria'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 1, form: ['D', 'L'] },
    { team: t('jordan'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDiff: -4, points: 0, form: ['L', 'L'] },
  ],
  K: [
    { team: t('portugal'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 6, form: ['W', 'W'] },
    { team: t('colombia'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 3, form: ['W', 'L'] },
    { team: t('uzbekistan'), played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 3, form: ['L', 'W'] },
    { team: t('congo-dr'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0, form: ['L', 'L'] },
  ],
  L: [
    { team: t('england'), played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDiff: 4, points: 6, form: ['W', 'W'] },
    { team: t('croatia'), played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDiff: 1, points: 4, form: ['W', 'D'] },
    { team: t('ghana'), played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 1, form: ['D', 'L'] },
    { team: t('panama'), played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDiff: -4, points: 0, form: ['L', 'L'] },
  ],
};
