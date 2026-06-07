export interface Venue {
  id: string;
  name: string;
  slug: string;
  city: string;
  state?: string;
  country: 'USA' | 'Canada' | 'Mexico';
  capacity: number;
  lat: number;
  lng: number;
  surface: string;
  yearBuilt: number;
  matches: number;
  /** Wikipedia article title used to fetch a real stadium photo (see /api/venue-photo). */
  wikiTitle: string;
  /** Most notable WC2026 fixture this venue hosts — its "status" in the tournament. */
  notableMatch?: string;
  photoUrl: string;
  description: string;
  nflTeam?: string;
}

// Match allocation reflects the official FIFA World Cup 2026 distribution:
// USA hosts 78 matches, Canada 13, Mexico 13 (104 total). AT&T Stadium hosts the
// most (9); MetLife hosts the Final; Estadio Azteca the opening match; Hard Rock
// the third-place match; semifinals at AT&T and Mercedes-Benz.
export const venues: Venue[] = [
  // USA — 78 matches
  { id: 'metlife', name: 'MetLife Stadium', slug: 'metlife-stadium', city: 'East Rutherford', state: 'NJ', country: 'USA', capacity: 82500, lat: 40.8135, lng: -74.0745, surface: 'Artificial Turf', yearBuilt: 2010, matches: 8, wikiTitle: 'MetLife Stadium', notableMatch: 'Final', photoUrl: '/venues/metlife.jpg', description: 'Home of the New York Giants and Jets, MetLife Stadium is the largest stadium in the northeastern USA and will host the FIFA World Cup 2026 Final on July 19.', nflTeam: 'NY Giants / NY Jets' },
  { id: 'att', name: "AT&T Stadium", slug: 'att-stadium', city: 'Arlington', state: 'TX', country: 'USA', capacity: 80000, lat: 32.7479, lng: -97.0944, surface: 'Natural Grass', yearBuilt: 2009, matches: 9, wikiTitle: 'AT&T Stadium', notableMatch: 'Semi-final', photoUrl: '/venues/att.jpg', description: "Jerry World — AT&T Stadium hosts more World Cup matches than any other venue (9), including a semifinal. A marvel of modern architecture with the world's largest column-free interior.", nflTeam: 'Dallas Cowboys' },
  { id: 'sofi', name: 'SoFi Stadium', slug: 'sofi-stadium', city: 'Inglewood', state: 'CA', country: 'USA', capacity: 70240, lat: 33.9535, lng: -118.3392, surface: 'Natural Grass', yearBuilt: 2020, matches: 8, wikiTitle: 'SoFi Stadium', notableMatch: 'Quarter-final', photoUrl: '/venues/sofi.jpg', description: 'The most technologically advanced stadium in the world, SoFi Stadium features a translucent roof and a 360° dual-sided videoboard.', nflTeam: 'LA Rams / LA Chargers' },
  { id: 'mercedes-benz', name: 'Mercedes-Benz Stadium', slug: 'mercedes-benz-stadium', city: 'Atlanta', state: 'GA', country: 'USA', capacity: 71000, lat: 33.7553, lng: -84.4006, surface: 'Artificial Turf', yearBuilt: 2017, matches: 8, wikiTitle: 'Mercedes-Benz Stadium', notableMatch: 'Semi-final', photoUrl: '/venues/mercedes-benz.jpg', description: 'The first stadium to earn LEED Platinum certification, Mercedes-Benz Stadium features a retractable roof with 8 triangular panels that open like a camera aperture. Hosts a semifinal.', nflTeam: 'Atlanta Falcons' },
  { id: 'gillette', name: 'Gillette Stadium', slug: 'gillette-stadium', city: 'Foxborough', state: 'MA', country: 'USA', capacity: 65878, lat: 42.0909, lng: -71.2643, surface: 'Artificial Turf', yearBuilt: 2002, matches: 7, wikiTitle: 'Gillette Stadium', notableMatch: 'Quarter-final', photoUrl: '/venues/gillette.jpg', description: 'Home of the New England Patriots and Revolution, Gillette Stadium hosts seven World Cup matches including a quarterfinal, just 30 miles from Boston.', nflTeam: 'New England Patriots' },
  { id: 'nrg', name: 'NRG Stadium', slug: 'nrg-stadium', city: 'Houston', state: 'TX', country: 'USA', capacity: 72220, lat: 29.6847, lng: -95.4107, surface: 'Natural Grass', yearBuilt: 2002, matches: 7, wikiTitle: 'NRG Stadium', notableMatch: 'Round of 16', photoUrl: '/venues/nrg.jpg', description: "NRG Stadium features a fully retractable roof — the first of its kind in North America — and hosts seven matches including knockout fixtures.", nflTeam: 'Houston Texans' },
  { id: 'hard-rock', name: 'Hard Rock Stadium', slug: 'hard-rock-stadium', city: 'Miami Gardens', state: 'FL', country: 'USA', capacity: 65326, lat: 25.9580, lng: -80.2389, surface: 'Natural Grass', yearBuilt: 1987, matches: 7, wikiTitle: 'Hard Rock Stadium', notableMatch: 'Third-place play-off', photoUrl: '/venues/hard-rock.jpg', description: 'Located in Miami Gardens, Hard Rock Stadium hosts the World Cup third-place play-off and features a fixed roof canopy for shade.', nflTeam: 'Miami Dolphins' },
  { id: 'lincoln', name: 'Lincoln Financial Field', slug: 'lincoln-financial-field', city: 'Philadelphia', state: 'PA', country: 'USA', capacity: 69328, lat: 39.9008, lng: -75.1675, surface: 'Natural Grass', yearBuilt: 2003, matches: 6, wikiTitle: 'Lincoln Financial Field', notableMatch: 'Round of 16', photoUrl: '/venues/lincoln.jpg', description: "The Linc is home to the Philadelphia Eagles and hosts six matches including a Round of 16 fixture.", nflTeam: 'Philadelphia Eagles' },
  { id: 'levis', name: "Levi's Stadium", slug: 'levis-stadium', city: 'Santa Clara', state: 'CA', country: 'USA', capacity: 68500, lat: 37.4033, lng: -121.9699, surface: 'Natural Grass', yearBuilt: 2014, matches: 6, wikiTitle: "Levi's Stadium", notableMatch: 'Round of 32', photoUrl: '/venues/levis.jpg', description: "Home of the San Francisco 49ers, Levi's Stadium is one of the most technologically advanced and environmentally sustainable NFL stadiums.", nflTeam: 'San Francisco 49ers' },
  { id: 'arrowhead', name: 'Arrowhead Stadium', slug: 'arrowhead-stadium', city: 'Kansas City', state: 'MO', country: 'USA', capacity: 76416, lat: 39.0489, lng: -94.4839, surface: 'Natural Grass', yearBuilt: 1972, matches: 6, wikiTitle: 'Arrowhead Stadium', notableMatch: 'Quarter-final', photoUrl: '/venues/arrowhead.jpg', description: 'One of the loudest stadiums in the world (Guinness World Record), Arrowhead hosts six matches including a quarterfinal.', nflTeam: 'Kansas City Chiefs' },
  { id: 'lumen', name: 'Lumen Field', slug: 'lumen-field', city: 'Seattle', state: 'WA', country: 'USA', capacity: 68740, lat: 47.5952, lng: -122.3316, surface: 'Artificial Turf', yearBuilt: 2002, matches: 6, wikiTitle: 'Lumen Field', notableMatch: 'Round of 16', photoUrl: '/venues/lumen.jpg', description: 'Known for its raucous atmosphere, Lumen Field sits in the shadow of downtown Seattle and hosts six matches including a Round of 16 fixture.', nflTeam: 'Seattle Seahawks' },

  // Canada — 13 matches
  { id: 'bc-place', name: 'BC Place', slug: 'bc-place', city: 'Vancouver', state: 'BC', country: 'Canada', capacity: 54500, lat: 49.2767, lng: -123.1114, surface: 'Artificial Turf', yearBuilt: 1983, matches: 7, wikiTitle: 'BC Place', notableMatch: 'Round of 16', photoUrl: '/venues/bc-place.jpg', description: "Canada's largest covered stadium, BC Place features a retractable roof and hosts seven matches including a Round of 16 fixture in downtown Vancouver.", nflTeam: 'Vancouver Whitecaps / BC Lions' },
  { id: 'bmo', name: 'BMO Field', slug: 'bmo-field', city: 'Toronto', state: 'ON', country: 'Canada', capacity: 45000, lat: 43.6333, lng: -79.4189, surface: 'Natural Grass', yearBuilt: 2007, matches: 6, wikiTitle: 'BMO Field', notableMatch: "Canada's opening match", photoUrl: '/venues/bmo.jpg', description: "Home of Toronto FC, BMO Field has been expanded to ~45,000 for the World Cup and hosts Canada's opening match plus a Round of 32 fixture.", nflTeam: 'Toronto FC' },

  // Mexico — 13 matches
  { id: 'azteca', name: 'Estadio Azteca', slug: 'estadio-azteca', city: 'Mexico City', country: 'Mexico', capacity: 83264, lat: 19.3029, lng: -99.1505, surface: 'Natural Grass', yearBuilt: 1966, matches: 5, wikiTitle: 'Estadio Azteca', notableMatch: 'Opening match', photoUrl: '/venues/azteca.jpg', description: "The legendary Estadio Azteca hosts the World Cup opening match on June 11. The only stadium to have hosted two World Cup Finals (1970, 1986) — witness to Pelé and Maradona's Hand of God.", nflTeam: undefined },
  { id: 'bbva', name: 'Estadio BBVA', slug: 'estadio-bbva', city: 'Monterrey', country: 'Mexico', capacity: 53500, lat: 25.6692, lng: -100.2419, surface: 'Natural Grass', yearBuilt: 2015, matches: 4, wikiTitle: 'Estadio BBVA', notableMatch: 'Round of 32', photoUrl: '/venues/bbva.jpg', description: "One of the most beautiful stadiums in Latin America, Estadio BBVA is built into the base of Cerro de la Silla, creating a dramatic mountain backdrop.", nflTeam: undefined },
  { id: 'akron', name: 'Estadio AKRON', slug: 'estadio-akron', city: 'Guadalajara', country: 'Mexico', capacity: 49850, lat: 20.6817, lng: -103.4607, surface: 'Natural Grass', yearBuilt: 2010, matches: 4, wikiTitle: 'Estadio Akron', notableMatch: 'Group stage', photoUrl: '/venues/akron.jpg', description: "Home of Chivas de Guadalajara, Estadio AKRON is a modern, world-class venue hosting four group-stage matches in Mexico's second city.", nflTeam: undefined },
];

export const getVenueBySlug = (slug: string) => venues.find(v => v.slug === slug);
export const getVenuesByCountry = (country: string) => venues.filter(v => v.country === country);
