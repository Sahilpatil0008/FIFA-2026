import Link from 'next/link';
import { venues } from '@/lib/data/venues';
import VenueImage from '@/components/VenueImage';

export const metadata = {
  title: 'Venues | FIFA World Cup 2026',
};

export default function VenuesPage() {
  const byCountry = venues.reduce<Record<string, typeof venues>>((acc, v) => {
    if (!acc[v.country]) acc[v.country] = [];
    acc[v.country].push(v);
    return acc;
  }, {});

  const countryFlags: Record<string, string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' };
  const matchCounts: Record<string, number> = { USA: 78, Canada: 13, Mexico: 13 };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>Venues</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">Venues</h1>
        <p style={{ color: '#8899AA' }}>16 iconic stadiums across 3 countries hosting 104 matches</p>
      </div>

      {/* Host countries overview */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {(['USA', 'Canada', 'Mexico'] as const).map(country => (
          <div key={country} className="glass-card p-5 text-center">
            <div className="text-4xl mb-2">{countryFlags[country]}</div>
            <h3 className="font-display text-2xl text-white">{country}</h3>
            <div className="text-sm mt-1" style={{ color: '#8899AA' }}>
              {byCountry[country]?.length || 0} stadiums · {matchCounts[country]} matches
            </div>
            {country === 'USA' && <div className="text-xs mt-2 px-2 py-1 rounded" style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--accent)' }}>🏆 Final Venue</div>}
          </div>
        ))}
      </div>

      {/* By Country */}
      {(['USA', 'Canada', 'Mexico'] as const).map(country => {
        const countryVenues = byCountry[country] || [];
        return (
          <section key={country} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{countryFlags[country]}</span>
              <div>
                <h2 className="font-display text-3xl text-white">{country}</h2>
                <p className="text-xs" style={{ color: '#8899AA' }}>{countryVenues.length} venues · {matchCounts[country]} total matches</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryVenues.map(venue => (
                <Link key={venue.id} href={`/venues/${venue.slug}`} className="glass-card p-5 block hover:no-underline group">
                  {/* Real stadium photo (Wikimedia) with SVG fallback */}
                  <VenueImage wikiTitle={venue.wikiTitle} caption={venue.city} className="w-full h-36 mb-4" rounded />
                  {venue.notableMatch && (
                    <div className="text-[11px] font-semibold mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent-deep)' }}>
                      {venue.notableMatch}
                    </div>
                  )}

                  <h3 className="font-bold text-lg leading-tight group-hover:text-white transition-colors mb-1">{venue.name}</h3>
                  <div className="text-sm mb-3" style={{ color: '#8899AA' }}>📍 {venue.city}{venue.state ? `, ${venue.state}` : ''}</div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: 'Capacity', value: `${(venue.capacity / 1000).toFixed(0)}K` },
                      { label: 'Matches', value: venue.matches },
                      { label: 'Built', value: venue.yearBuilt },
                    ].map(stat => (
                      <div key={stat.label} className="p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="font-bold text-sm">{stat.value}</div>
                        <div className="text-xs" style={{ color: '#8899AA' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {venue.id === 'metlife' && (
                    <div className="mt-3 flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)', color: 'var(--accent)' }}>
                      🏆 World Cup Final Venue
                    </div>
                  )}
                  {venue.id === 'azteca' && (
                    <div className="mt-3 flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,100,0,0.1)', border: '1px solid rgba(255,100,0,0.2)', color: '#F97316' }}>
                      🏆 Legendary: 2 WC Finals hosted
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
