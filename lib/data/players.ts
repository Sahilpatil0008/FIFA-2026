import { squadPlayers } from './squad-players';

export interface Player {
  id: string;
  name: string;
  slug: string;
  teamId: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  jerseyNum: number;
  age: number;
  birthDate: string;
  birthPlace: string;
  clubTeam: string;
  clubCountry: string;
  nationality: string;
  flag: string;
  height: number;
  caps: number;
  intGoals: number;
  goals: number;
  assists: number;
  appearances: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
  rating: number;
  isStarPlayer: boolean;
  photoUrl?: string;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  appearances: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
  shots: number;
  shotsOnTarget: number;
  xG: number;
  xA: number;
  passAccuracy: number;
  saves?: number;
  cleanSheets?: number;
  rating: number;
}

// Hand-curated marquee players (stars the free squad API omits, with rich bios).
const curatedPlayers: Player[] = [
  // Argentina
  { id: 'messi', name: 'Lionel Messi', slug: 'lionel-messi', teamId: 'argentina', position: 'FW', jerseyNum: 10, age: 38, birthDate: '1987-06-24', birthPlace: 'Rosario, Argentina', clubTeam: 'Inter Miami', clubCountry: 'USA', nationality: 'Argentine', flag: '🇦🇷', height: 170, caps: 191, intGoals: 109, goals: 4, assists: 3, appearances: 4, minutesPlayed: 335, yellowCards: 0, redCards: 0, rating: 9.1, isStarPlayer: true },
  { id: 'dibu-martinez', name: 'Emiliano Martínez', slug: 'emiliano-martinez', teamId: 'argentina', position: 'GK', jerseyNum: 23, age: 32, birthDate: '1992-09-02', birthPlace: 'Mar del Plata, Argentina', clubTeam: 'Aston Villa', clubCountry: 'England', nationality: 'Argentine', flag: '🇦🇷', height: 195, caps: 47, intGoals: 0, goals: 0, assists: 0, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 8.2, isStarPlayer: true },
  { id: 'lautaro', name: 'Lautaro Martínez', slug: 'lautaro-martinez', teamId: 'argentina', position: 'FW', jerseyNum: 22, age: 27, birthDate: '1997-08-22', birthPlace: 'Bahía Blanca, Argentina', clubTeam: 'Inter Milan', clubCountry: 'Italy', nationality: 'Argentine', flag: '🇦🇷', height: 174, caps: 74, intGoals: 30, goals: 3, assists: 1, appearances: 4, minutesPlayed: 320, yellowCards: 1, redCards: 0, rating: 8.4, isStarPlayer: true },
  { id: 'de-paul', name: 'Rodrigo De Paul', slug: 'rodrigo-de-paul', teamId: 'argentina', position: 'MF', jerseyNum: 7, age: 30, birthDate: '1994-05-24', birthPlace: 'Sarandí, Argentina', clubTeam: 'Atlético Madrid', clubCountry: 'Spain', nationality: 'Argentine', flag: '🇦🇷', height: 180, caps: 89, intGoals: 8, goals: 1, assists: 2, appearances: 4, minutesPlayed: 340, yellowCards: 1, redCards: 0, rating: 7.8, isStarPlayer: false },

  // France
  { id: 'mbappe', name: 'Kylian Mbappé', slug: 'kylian-mbappe', teamId: 'france', position: 'FW', jerseyNum: 10, age: 27, birthDate: '1998-12-20', birthPlace: 'Bondy, France', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'French', flag: '🇫🇷', height: 178, caps: 97, intGoals: 50, goals: 5, assists: 2, appearances: 4, minutesPlayed: 351, yellowCards: 0, redCards: 0, rating: 9.2, isStarPlayer: true },
  { id: 'griezmann', name: 'Antoine Griezmann', slug: 'antoine-griezmann', teamId: 'france', position: 'FW', jerseyNum: 7, age: 35, birthDate: '1991-03-21', birthPlace: 'Mâcon, France', clubTeam: 'Atlético Madrid', clubCountry: 'Spain', nationality: 'French', flag: '🇫🇷', height: 176, caps: 137, intGoals: 52, goals: 2, assists: 4, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 8.6, isStarPlayer: true },
  { id: 'camavinga', name: 'Eduardo Camavinga', slug: 'eduardo-camavinga', teamId: 'france', position: 'MF', jerseyNum: 8, age: 22, birthDate: '2002-11-10', birthPlace: 'Miconje, Angola', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'French', flag: '🇫🇷', height: 181, caps: 30, intGoals: 2, goals: 1, assists: 1, appearances: 4, minutesPlayed: 290, yellowCards: 1, redCards: 0, rating: 7.9, isStarPlayer: false },
  { id: 'maignan', name: 'Mike Maignan', slug: 'mike-maignan', teamId: 'france', position: 'GK', jerseyNum: 1, age: 29, birthDate: '1995-07-03', birthPlace: 'Cayenne, French Guiana', clubTeam: 'AC Milan', clubCountry: 'Italy', nationality: 'French', flag: '🇫🇷', height: 191, caps: 22, intGoals: 0, goals: 0, assists: 0, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: false },

  // England
  { id: 'bellingham', name: 'Jude Bellingham', slug: 'jude-bellingham', teamId: 'england', position: 'MF', jerseyNum: 10, age: 21, birthDate: '2003-06-29', birthPlace: 'Stourbridge, England', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', height: 186, caps: 48, intGoals: 14, goals: 3, assists: 3, appearances: 4, minutesPlayed: 360, yellowCards: 1, redCards: 0, rating: 9.0, isStarPlayer: true },
  { id: 'saka', name: 'Bukayo Saka', slug: 'bukayo-saka', teamId: 'england', position: 'FW', jerseyNum: 7, age: 24, birthDate: '2001-09-05', birthPlace: 'London, England', clubTeam: 'Arsenal', clubCountry: 'England', nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', height: 178, caps: 55, intGoals: 18, goals: 2, assists: 2, appearances: 4, minutesPlayed: 340, yellowCards: 0, redCards: 0, rating: 8.5, isStarPlayer: true },
  { id: 'kane', name: 'Harry Kane', slug: 'harry-kane', teamId: 'england', position: 'FW', jerseyNum: 9, age: 32, birthDate: '1993-07-28', birthPlace: 'London, England', clubTeam: 'Bayern Munich', clubCountry: 'Germany', nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', height: 188, caps: 97, intGoals: 68, goals: 3, assists: 1, appearances: 4, minutesPlayed: 360, yellowCards: 1, redCards: 0, rating: 8.3, isStarPlayer: true },
  { id: 'foden', name: 'Phil Foden', slug: 'phil-foden', teamId: 'england', position: 'MF', jerseyNum: 11, age: 26, birthDate: '2000-05-28', birthPlace: 'Stockport, England', clubTeam: 'Manchester City', clubCountry: 'England', nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', height: 171, caps: 40, intGoals: 5, goals: 1, assists: 2, appearances: 3, minutesPlayed: 230, yellowCards: 0, redCards: 0, rating: 7.9, isStarPlayer: false },

  // Brazil
  { id: 'vinicius', name: 'Vinícius Júnior', slug: 'vinicius-junior', teamId: 'brazil', position: 'FW', jerseyNum: 7, age: 24, birthDate: '2000-07-12', birthPlace: 'São Gonçalo, Brazil', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'Brazilian', flag: '🇧🇷', height: 176, caps: 53, intGoals: 14, goals: 4, assists: 2, appearances: 4, minutesPlayed: 345, yellowCards: 1, redCards: 0, rating: 8.9, isStarPlayer: true },
  { id: 'rodrygo', name: 'Rodrygo', slug: 'rodrygo', teamId: 'brazil', position: 'FW', jerseyNum: 11, age: 24, birthDate: '2001-01-09', birthPlace: 'Osasco, Brazil', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'Brazilian', flag: '🇧🇷', height: 174, caps: 38, intGoals: 7, goals: 2, assists: 3, appearances: 4, minutesPlayed: 310, yellowCards: 0, redCards: 0, rating: 8.1, isStarPlayer: false },
  { id: 'alisson', name: 'Alisson Becker', slug: 'alisson-becker', teamId: 'brazil', position: 'GK', jerseyNum: 1, age: 32, birthDate: '1992-10-02', birthPlace: 'Novo Hamburgo, Brazil', clubTeam: 'Liverpool', clubCountry: 'England', nationality: 'Brazilian', flag: '🇧🇷', height: 191, caps: 74, intGoals: 0, goals: 0, assists: 0, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 7.8, isStarPlayer: false },
  { id: 'endrick', name: 'Endrick', slug: 'endrick', teamId: 'brazil', position: 'FW', jerseyNum: 19, age: 18, birthDate: '2006-07-21', birthPlace: 'Brasília, Brazil', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'Brazilian', flag: '🇧🇷', height: 174, caps: 12, intGoals: 5, goals: 2, assists: 0, appearances: 3, minutesPlayed: 180, yellowCards: 0, redCards: 0, rating: 7.6, isStarPlayer: true },

  // Spain
  { id: 'yamal', name: 'Lamine Yamal', slug: 'lamine-yamal', teamId: 'spain', position: 'FW', jerseyNum: 19, age: 18, birthDate: '2007-07-13', birthPlace: 'Esplugues de Llobregat, Spain', clubTeam: 'Barcelona', clubCountry: 'Spain', nationality: 'Spanish', flag: '🇪🇸', height: 180, caps: 28, intGoals: 8, goals: 3, assists: 4, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 9.0, isStarPlayer: true },
  { id: 'pedri', name: 'Pedri', slug: 'pedri', teamId: 'spain', position: 'MF', jerseyNum: 8, age: 23, birthDate: '2002-11-25', birthPlace: 'Tegueste, Spain', clubTeam: 'Barcelona', clubCountry: 'Spain', nationality: 'Spanish', flag: '🇪🇸', height: 174, caps: 52, intGoals: 4, goals: 1, assists: 3, appearances: 4, minutesPlayed: 340, yellowCards: 1, redCards: 0, rating: 8.7, isStarPlayer: true },
  { id: 'morata', name: 'Álvaro Morata', slug: 'alvaro-morata', teamId: 'spain', position: 'FW', jerseyNum: 7, age: 32, birthDate: '1992-10-23', birthPlace: 'Madrid, Spain', clubTeam: 'AC Milan', clubCountry: 'Italy', nationality: 'Spanish', flag: '🇪🇸', height: 187, caps: 84, intGoals: 38, goals: 2, assists: 1, appearances: 4, minutesPlayed: 295, yellowCards: 0, redCards: 0, rating: 7.7, isStarPlayer: false },
  { id: 'unai-simon', name: 'Unai Simón', slug: 'unai-simon', teamId: 'spain', position: 'GK', jerseyNum: 1, age: 27, birthDate: '1997-06-11', birthPlace: 'Vitoria-Gasteiz, Spain', clubTeam: 'Athletic Bilbao', clubCountry: 'Spain', nationality: 'Spanish', flag: '🇪🇸', height: 190, caps: 34, intGoals: 0, goals: 0, assists: 0, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 7.9, isStarPlayer: false },

  // Germany
  { id: 'musiala', name: 'Jamal Musiala', slug: 'jamal-musiala', teamId: 'germany', position: 'MF', jerseyNum: 10, age: 22, birthDate: '2003-02-26', birthPlace: 'Stuttgart, Germany', clubTeam: 'Bayern Munich', clubCountry: 'Germany', nationality: 'German', flag: '🇩🇪', height: 183, caps: 44, intGoals: 14, goals: 2, assists: 3, appearances: 4, minutesPlayed: 340, yellowCards: 0, redCards: 0, rating: 8.8, isStarPlayer: true },
  { id: 'wirtz', name: 'Florian Wirtz', slug: 'florian-wirtz', teamId: 'germany', position: 'MF', jerseyNum: 17, age: 22, birthDate: '2003-05-03', birthPlace: 'Pulheim, Germany', clubTeam: 'Bayer Leverkusen', clubCountry: 'Germany', nationality: 'German', flag: '🇩🇪', height: 180, caps: 25, intGoals: 6, goals: 2, assists: 2, appearances: 4, minutesPlayed: 310, yellowCards: 0, redCards: 0, rating: 8.6, isStarPlayer: true },
  { id: 'gnabry', name: 'Serge Gnabry', slug: 'serge-gnabry', teamId: 'germany', position: 'FW', jerseyNum: 11, age: 29, birthDate: '1995-07-14', birthPlace: 'Stuttgart, Germany', clubTeam: 'Bayern Munich', clubCountry: 'Germany', nationality: 'German', flag: '🇩🇪', height: 175, caps: 43, intGoals: 21, goals: 1, assists: 1, appearances: 3, minutesPlayed: 210, yellowCards: 0, redCards: 0, rating: 7.5, isStarPlayer: false },
  { id: 'ter-stegen', name: 'Marc-André ter Stegen', slug: 'marc-andre-ter-stegen', teamId: 'germany', position: 'GK', jerseyNum: 1, age: 33, birthDate: '1992-04-30', birthPlace: 'Mönchengladbach, Germany', clubTeam: 'Barcelona', clubCountry: 'Spain', nationality: 'German', flag: '🇩🇪', height: 187, caps: 44, intGoals: 0, goals: 0, assists: 0, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: false },

  // Portugal
  { id: 'ronaldo', name: 'Cristiano Ronaldo', slug: 'cristiano-ronaldo', teamId: 'portugal', position: 'FW', jerseyNum: 7, age: 41, birthDate: '1985-02-05', birthPlace: 'Funchal, Portugal', clubTeam: 'Al Nassr', clubCountry: 'Saudi Arabia', nationality: 'Portuguese', flag: '🇵🇹', height: 187, caps: 215, intGoals: 135, goals: 2, assists: 0, appearances: 4, minutesPlayed: 270, yellowCards: 1, redCards: 0, rating: 7.6, isStarPlayer: true },
  { id: 'brunof', name: 'Bruno Fernandes', slug: 'bruno-fernandes', teamId: 'portugal', position: 'MF', jerseyNum: 8, age: 30, birthDate: '1994-09-08', birthPlace: 'Maia, Portugal', clubTeam: 'Manchester United', clubCountry: 'England', nationality: 'Portuguese', flag: '🇵🇹', height: 179, caps: 82, intGoals: 27, goals: 1, assists: 3, appearances: 4, minutesPlayed: 360, yellowCards: 1, redCards: 0, rating: 8.2, isStarPlayer: true },

  // Netherlands
  { id: 'van-dijk', name: 'Virgil van Dijk', slug: 'virgil-van-dijk', teamId: 'netherlands', position: 'DF', jerseyNum: 4, age: 33, birthDate: '1991-07-08', birthPlace: 'Breda, Netherlands', clubTeam: 'Liverpool', clubCountry: 'England', nationality: 'Dutch', flag: '🇳🇱', height: 193, caps: 71, intGoals: 8, goals: 1, assists: 0, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 8.1, isStarPlayer: true },
  { id: 'gakpo', name: 'Cody Gakpo', slug: 'cody-gakpo', teamId: 'netherlands', position: 'FW', jerseyNum: 11, age: 25, birthDate: '2000-05-07', birthPlace: 'Eindhoven, Netherlands', clubTeam: 'Liverpool', clubCountry: 'England', nationality: 'Dutch', flag: '🇳🇱', height: 189, caps: 41, intGoals: 15, goals: 2, assists: 1, appearances: 4, minutesPlayed: 310, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: true },

  // Japan
  { id: 'kubo', name: 'Takefusa Kubo', slug: 'takefusa-kubo', teamId: 'japan', position: 'FW', jerseyNum: 11, age: 23, birthDate: '2001-06-04', birthPlace: 'Kamakura, Japan', clubTeam: 'Real Sociedad', clubCountry: 'Spain', nationality: 'Japanese', flag: '🇯🇵', height: 173, caps: 36, intGoals: 7, goals: 2, assists: 1, appearances: 4, minutesPlayed: 290, yellowCards: 0, redCards: 0, rating: 7.9, isStarPlayer: true },
  { id: 'minamino', name: 'Takumi Minamino', slug: 'takumi-minamino', teamId: 'japan', position: 'FW', jerseyNum: 10, age: 29, birthDate: '1995-01-16', birthPlace: 'Izumisano, Japan', clubTeam: 'Monaco', clubCountry: 'France', nationality: 'Japanese', flag: '🇯🇵', height: 172, caps: 71, intGoals: 19, goals: 1, assists: 2, appearances: 4, minutesPlayed: 310, yellowCards: 0, redCards: 0, rating: 7.7, isStarPlayer: false },

  // Morocco
  { id: 'hakimi', name: 'Achraf Hakimi', slug: 'achraf-hakimi', teamId: 'morocco', position: 'DF', jerseyNum: 2, age: 26, birthDate: '1998-11-04', birthPlace: 'Madrid, Spain', clubTeam: 'Paris Saint-Germain', clubCountry: 'France', nationality: 'Moroccan', flag: '🇲🇦', height: 181, caps: 73, intGoals: 14, goals: 1, assists: 2, appearances: 4, minutesPlayed: 360, yellowCards: 1, redCards: 0, rating: 8.3, isStarPlayer: true },
  { id: 'ziyech', name: 'Hakim Ziyech', slug: 'hakim-ziyech', teamId: 'morocco', position: 'FW', jerseyNum: 7, age: 32, birthDate: '1993-03-19', birthPlace: 'Dronten, Netherlands', clubTeam: 'Galatasaray', clubCountry: 'Turkey', nationality: 'Moroccan', flag: '🇲🇦', height: 181, caps: 68, intGoals: 21, goals: 1, assists: 2, appearances: 4, minutesPlayed: 285, yellowCards: 0, redCards: 0, rating: 7.8, isStarPlayer: false },

  // USA
  { id: 'pulisic', name: 'Christian Pulisic', slug: 'christian-pulisic', teamId: 'usa', position: 'FW', jerseyNum: 10, age: 26, birthDate: '1998-09-18', birthPlace: 'Hershey, PA, USA', clubTeam: 'AC Milan', clubCountry: 'Italy', nationality: 'American', flag: '🇺🇸', height: 177, caps: 73, intGoals: 27, goals: 2, assists: 2, appearances: 4, minutesPlayed: 355, yellowCards: 0, redCards: 0, rating: 8.1, isStarPlayer: true },
  { id: 'weah', name: 'Tim Weah', slug: 'tim-weah', teamId: 'usa', position: 'FW', jerseyNum: 21, age: 24, birthDate: '2000-02-22', birthPlace: 'New York, USA', clubTeam: 'Juventus', clubCountry: 'Italy', nationality: 'American', flag: '🇺🇸', height: 180, caps: 44, intGoals: 5, goals: 1, assists: 1, appearances: 4, minutesPlayed: 280, yellowCards: 1, redCards: 0, rating: 7.5, isStarPlayer: false },

  // Croatia
  { id: 'modric', name: 'Luka Modrić', slug: 'luka-modric', teamId: 'croatia', position: 'MF', jerseyNum: 10, age: 40, birthDate: '1985-09-09', birthPlace: 'Zadar, Croatia', clubTeam: 'Real Madrid', clubCountry: 'Spain', nationality: 'Croatian', flag: '🇭🇷', height: 172, caps: 180, intGoals: 24, goals: 1, assists: 2, appearances: 4, minutesPlayed: 330, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: true },
  { id: 'gvardiol', name: 'Joško Gvardiol', slug: 'josko-gvardiol', teamId: 'croatia', position: 'DF', jerseyNum: 24, age: 22, birthDate: '2002-01-23', birthPlace: 'Zagreb, Croatia', clubTeam: 'Manchester City', clubCountry: 'England', nationality: 'Croatian', flag: '🇭🇷', height: 185, caps: 41, intGoals: 3, goals: 0, assists: 1, appearances: 4, minutesPlayed: 360, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: false },

  // Belgium
  { id: 'de-bruyne', name: 'Kevin De Bruyne', slug: 'kevin-de-bruyne', teamId: 'belgium', position: 'MF', jerseyNum: 7, age: 34, birthDate: '1991-06-28', birthPlace: 'Ghent, Belgium', clubTeam: 'Manchester City', clubCountry: 'England', nationality: 'Belgian', flag: '🇧🇪', height: 181, caps: 104, intGoals: 28, goals: 0, assists: 3, appearances: 4, minutesPlayed: 310, yellowCards: 0, redCards: 0, rating: 7.9, isStarPlayer: true },
  { id: 'lukaku', name: 'Romelu Lukaku', slug: 'romelu-lukaku', teamId: 'belgium', position: 'FW', jerseyNum: 9, age: 31, birthDate: '1993-05-13', birthPlace: 'Antwerp, Belgium', clubTeam: 'Napoli', clubCountry: 'Italy', nationality: 'Belgian', flag: '🇧🇪', height: 190, caps: 116, intGoals: 72, goals: 1, assists: 1, appearances: 4, minutesPlayed: 295, yellowCards: 1, redCards: 0, rating: 7.4, isStarPlayer: true },

  // Uruguay
  { id: 'nunez', name: 'Darwin Núñez', slug: 'darwin-nunez', teamId: 'uruguay', position: 'FW', jerseyNum: 11, age: 25, birthDate: '2000-06-24', birthPlace: 'Artigas, Uruguay', clubTeam: 'Liverpool', clubCountry: 'England', nationality: 'Uruguayan', flag: '🇺🇾', height: 187, caps: 44, intGoals: 18, goals: 2, assists: 1, appearances: 4, minutesPlayed: 330, yellowCards: 1, redCards: 0, rating: 8.0, isStarPlayer: true },
  { id: 'bentancur', name: 'Rodrigo Bentancur', slug: 'rodrigo-bentancur', teamId: 'uruguay', position: 'MF', jerseyNum: 8, age: 27, birthDate: '1997-06-25', birthPlace: 'Nueva Helvecia, Uruguay', clubTeam: 'Tottenham Hotspur', clubCountry: 'England', nationality: 'Uruguayan', flag: '🇺🇾', height: 187, caps: 56, intGoals: 5, goals: 0, assists: 2, appearances: 4, minutesPlayed: 340, yellowCards: 1, redCards: 0, rating: 7.8, isStarPlayer: false },

  // Colombia
  { id: 'james', name: 'James Rodríguez', slug: 'james-rodriguez', teamId: 'colombia', position: 'MF', jerseyNum: 10, age: 34, birthDate: '1991-07-12', birthPlace: 'Cúcuta, Colombia', clubTeam: 'Rayo Vallecano', clubCountry: 'Spain', nationality: 'Colombian', flag: '🇨🇴', height: 181, caps: 108, intGoals: 29, goals: 1, assists: 3, appearances: 4, minutesPlayed: 290, yellowCards: 0, redCards: 0, rating: 7.9, isStarPlayer: true },
  { id: 'diaz', name: 'Luis Díaz', slug: 'luis-diaz', teamId: 'colombia', position: 'FW', jerseyNum: 7, age: 27, birthDate: '1997-01-13', birthPlace: 'Barrancas, Colombia', clubTeam: 'Liverpool', clubCountry: 'England', nationality: 'Colombian', flag: '🇨🇴', height: 180, caps: 55, intGoals: 12, goals: 2, assists: 2, appearances: 4, minutesPlayed: 350, yellowCards: 0, redCards: 0, rating: 8.4, isStarPlayer: true },

  // South Korea
  { id: 'son', name: 'Son Heung-min', slug: 'son-heung-min', teamId: 'south-korea', position: 'FW', jerseyNum: 7, age: 33, birthDate: '1992-07-08', birthPlace: 'Chuncheon, South Korea', clubTeam: 'Tottenham Hotspur', clubCountry: 'England', nationality: 'South Korean', flag: '🇰🇷', height: 183, caps: 130, intGoals: 40, goals: 1, assists: 1, appearances: 4, minutesPlayed: 340, yellowCards: 1, redCards: 0, rating: 7.9, isStarPlayer: true },

  // Canada
  { id: 'david', name: 'Jonathan David', slug: 'jonathan-david', teamId: 'canada', position: 'FW', jerseyNum: 9, age: 24, birthDate: '2000-01-14', birthPlace: 'Brooklyn, USA', clubTeam: 'LOSC Lille', clubCountry: 'France', nationality: 'Canadian', flag: '🇨🇦', height: 178, caps: 48, intGoals: 24, goals: 2, assists: 1, appearances: 4, minutesPlayed: 345, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: true },

  // Senegal
  { id: 'mane', name: 'Sadio Mané', slug: 'sadio-mane', teamId: 'senegal', position: 'FW', jerseyNum: 10, age: 34, birthDate: '1992-04-10', birthPlace: 'Sédhiou, Senegal', clubTeam: 'Al-Nassr', clubCountry: 'Saudi Arabia', nationality: 'Senegalese', flag: '🇸🇳', height: 174, caps: 100, intGoals: 38, goals: 2, assists: 1, appearances: 4, minutesPlayed: 320, yellowCards: 0, redCards: 0, rating: 8.0, isStarPlayer: true },
  { id: 'diallo', name: 'Ismaïla Sarr', slug: 'ismaila-sarr', teamId: 'senegal', position: 'FW', jerseyNum: 23, age: 26, birthDate: '1998-02-25', birthPlace: 'Saint-Louis, Senegal', clubTeam: 'Crystal Palace', clubCountry: 'England', nationality: 'Senegalese', flag: '🇸🇳', height: 183, caps: 55, intGoals: 12, goals: 1, assists: 0, appearances: 3, minutesPlayed: 210, yellowCards: 0, redCards: 0, rating: 7.4, isStarPlayer: false },
];

// Curated stars + real squad depth fetched from TheSportsDB. No generated/fake players.
export const players: Player[] = [...curatedPlayers, ...squadPlayers];

export const getPlayerBySlug = (slug: string) => players.find(p => p.slug === slug);
export const getPlayersByTeam = (teamId: string) => players.filter(p => p.teamId === teamId);
export const getTopScorers = () => [...players].sort((a, b) => b.goals - a.goals).slice(0, 20);
export const getTopAssists = () => [...players].sort((a, b) => b.assists - a.assists).slice(0, 20);
export const getGoalkeepers = () => players.filter(p => p.position === 'GK');
