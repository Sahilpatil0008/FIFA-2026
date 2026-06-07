'use client';

import { memo, useEffect, useState } from 'react';

// Session cache so the same stadium isn't looked up twice (grid + detail page).
const venuePhotoCache = new Map<string, string | null>();

interface VenueImageProps {
  /** Wikipedia article title, e.g. "MetLife Stadium". */
  wikiTitle: string;
  /** Caption shown on the SVG fallback (usually the city). */
  caption?: string;
  className?: string;
  /** Tailwind/inline height utility is set by the parent via className. */
  rounded?: boolean;
}

/** Inline SVG shown while loading or when no photo is available. */
function StadiumFallback({ caption, rounded }: { caption?: string; rounded: boolean }) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        borderRadius: rounded ? 12 : 0,
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, var(--surface-2)), var(--surface-2))',
      }}
      aria-hidden
    >
      <svg viewBox="0 0 120 80" width="68%" height="68%" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" opacity={0.55}>
        {/* Stadium bowl */}
        <ellipse cx="60" cy="44" rx="46" ry="26" />
        <ellipse cx="60" cy="44" rx="26" ry="13" />
        {/* Pitch */}
        <rect x="44" y="38" width="32" height="12" rx="2" fill="var(--accent)" fillOpacity="0.18" />
        {/* Floodlights */}
        <path d="M18 20v8M102 20v8M40 12v6M80 12v6" />
      </svg>
      {caption && (
        <span
          className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold"
          style={{ color: 'var(--text-2)' }}
        >
          {caption}
        </span>
      )}
    </div>
  );
}

function VenueImageImpl({ wikiTitle, caption, className = '', rounded = true }: VenueImageProps) {
  const [url, setUrl] = useState<string | null | undefined>(() =>
    venuePhotoCache.has(wikiTitle) ? venuePhotoCache.get(wikiTitle) : undefined,
  );
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (venuePhotoCache.has(wikiTitle)) {
      setUrl(venuePhotoCache.get(wikiTitle) ?? null);
      return;
    }
    let active = true;
    fetch(`/api/venue-photo?title=${encodeURIComponent(wikiTitle)}`)
      .then((r) => r.json())
      .then((d: { url: string | null }) => {
        venuePhotoCache.set(wikiTitle, d.url);
        if (active) setUrl(d.url);
      })
      .catch(() => {
        venuePhotoCache.set(wikiTitle, null);
        if (active) setUrl(null);
      });
    return () => {
      active = false;
    };
  }, [wikiTitle]);

  const showFallback = url === undefined || !url || broken;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: rounded ? 12 : 0 }}>
      {showFallback && <StadiumFallback caption={caption} rounded={rounded} />}
      {url && !broken && (
        // Plain img keeps the cover crop simple and avoids next/image remote config churn.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={wikiTitle}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ borderRadius: rounded ? 12 : 0 }}
        />
      )}
    </div>
  );
}

const VenueImage = memo(VenueImageImpl);
export default VenueImage;
