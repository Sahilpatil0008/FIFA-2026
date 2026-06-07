import Link from 'next/link';
import { notFound } from 'next/navigation';
import { venues, getVenueBySlug } from '@/lib/data/venues';
import { matches } from '@/lib/data/matches';
import MatchCard from '@/components/MatchCard';
import VenueImage from '@/components/VenueImage';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return venues.map(v => ({ slug: v.slug }));
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const venueMatches = matches.filter(m => m.venueId === venue.id);
  const finishedMatches = venueMatches.filter(m => m.status === 'FINISHED');
  const upcomingMatches = venueMatches.filter(m => m.status === 'SCHEDULED');

  const countryFlags: Record<string, string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' };

  return (
    <div>
      {/* Hero with real stadium photo + SVG fallback */}
      <div className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <VenueImage wikiTitle={venue.wikiTitle} className="absolute inset-0 w-full h-full" rounded={false} />
        {/* Legibility scrim over the photo */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,6,20,0.15) 0%, rgba(2,6,20,0.78) 100%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 pb-8 w-full">
          <Link href="/venues" className="text-xs font-semibold tracking-widest uppercase mb-3 block transition-colors" style={{ color: '#E2E8F0' }}>← Venues</Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{countryFlags[venue.country]}</span>
            <h1 className="font-display text-5xl" style={{ color: '#FFFFFF' }}>{venue.name}</h1>
          </div>
          <p className="text-sm" style={{ color: '#CBD5E1' }}>📍 {venue.city}{venue.state ? `, ${venue.state}` : ''}, {venue.country}{venue.notableMatch ? ` · Hosts: ${venue.notableMatch}` : ''}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="glass-card p-6">
              <h2 className="font-display text-2xl text-white mb-3">About</h2>
              <p className="leading-relaxed" style={{ color: '#8899AA' }}>{venue.description}</p>
            </div>

            {/* Matches */}
            {finishedMatches.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-white mb-4">Results at {venue.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {finishedMatches.map(m => <MatchCard key={m.id} match={m} />)}
                </div>
              </div>
            )}

            {upcomingMatches.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-white mb-4">Upcoming at {venue.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stadium Stats */}
            <div className="glass-card p-5">
              <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: '#8899AA' }}>Stadium Info</h3>
              <div className="space-y-3">
                {[
                  ['Capacity', venue.capacity.toLocaleString()],
                  ['City', `${venue.city}${venue.state ? `, ${venue.state}` : ''}`],
                  ['Country', venue.country],
                  ['Surface', venue.surface],
                  ['Year Built', venue.yearBuilt],
                  ['WC Matches', venue.matches],
                  ['Hosts', venue.notableMatch || 'Group stage'],
                  ['NFL Team', venue.nflTeam || 'Football specific'],
                ].map(([label, value]) => (
                  <div key={String(label)} className="flex justify-between text-sm">
                    <span style={{ color: '#8899AA' }}>{label}</span>
                    <span className="font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card p-5">
              <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-3" style={{ color: '#8899AA' }}>Location</h3>
              <div className="w-full h-48 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <div className="text-sm font-semibold">{venue.city}</div>
                  <div className="text-xs mt-1" style={{ color: '#8899AA' }}>
                    {venue.lat.toFixed(4)}°N, {Math.abs(venue.lng).toFixed(4)}°W
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
