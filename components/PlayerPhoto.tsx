'use client';

import { useEffect, useState } from 'react';

// Session-level cache so we don't re-hit /api/player-photo for a player we've
// already looked up (e.g. when they appear in a grid and a modal).
const photoCache = new Map<string, string | null>();

interface PlayerPhotoProps {
  /** Wikipedia article title / player name, e.g. "Kylian Mbappé". */
  name: string;
  /** Known photo URL (e.g. from the squad data). Used directly, skips lookup. */
  photoUrl?: string;
  /** Optional jersey number shown on the fallback silhouette. */
  jersey?: number;
  /** Accent color for the fallback background. */
  color?: string;
  /** Square size in pixels. */
  size?: number;
  className?: string;
  rounded?: boolean;
}

/** First letter of the first two name parts, e.g. "Kylian Mbappé" → "KM". */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Pick black or white text for readable contrast on the given hex color. */
function readableText(hex: string): string {
  const m = hex.replace('#', '');
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  // Relative luminance — bright backgrounds get dark text and vice-versa.
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#0a0e1a' : '#ffffff';
}

/**
 * Fallback shown when no Wikipedia photo is found: the player's initials on
 * their team color. Reads as intentional, not a broken image.
 */
function InitialsAvatar({ name, jersey, color, size, rounded }: { name: string; jersey?: number; color: string; size: number; rounded: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center shrink-0 overflow-hidden font-bold"
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? '50%' : 12,
        background: color,
        color: readableText(color),
        fontSize: Math.round(size * 0.38),
        letterSpacing: '0.02em',
        border: `1px solid ${color}`,
      }}
      role="img"
      aria-label={name}
    >
      {initials(name)}
      {jersey != null && (
        <span
          className="absolute bottom-0 right-0 font-mono text-[10px] font-bold px-1 rounded-tl"
          style={{ background: '#0a0e1a', color: '#fff' }}
        >
          {jersey}
        </span>
      )}
    </div>
  );
}

export default function PlayerPhoto({
  name,
  photoUrl,
  jersey,
  color = '#0066FF',
  size = 64,
  className = '',
  rounded = false,
}: PlayerPhotoProps) {
  const [url, setUrl] = useState<string | null | undefined>(() =>
    photoUrl ? photoUrl : photoCache.has(name) ? photoCache.get(name) : undefined,
  );
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    // A known photo URL (from squad data) wins — no need to hit the lookup API.
    if (photoUrl) {
      setUrl(photoUrl);
      return;
    }
    if (photoCache.has(name)) {
      setUrl(photoCache.get(name) ?? null);
      return;
    }
    let active = true;
    fetch(`/api/player-photo?name=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((d: { url: string | null }) => {
        photoCache.set(name, d.url);
        if (active) setUrl(d.url);
      })
      .catch(() => {
        photoCache.set(name, null);
        if (active) setUrl(null);
      });
    return () => {
      active = false;
    };
  }, [name, photoUrl]);

  // Reset the broken flag whenever the source changes.
  useEffect(() => setBroken(false), [name, photoUrl]);

  // Still loading
  if (url === undefined) {
    return (
      <div
        className={`shrink-0 animate-pulse ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: rounded ? '50%' : 12,
          background: 'rgba(255,255,255,0.06)',
        }}
        aria-hidden
      />
    );
  }

  if (!url || broken) {
    return (
      <div className={className}>
        <InitialsAvatar name={name} jersey={jersey} color={color} size={size} rounded={rounded} />
      </div>
    );
  }

  return (
    // Wikipedia thumbnails vary in size; a plain img with object-cover keeps the
    // square crop simple and avoids next/image layout constraints.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setBroken(true)}
      className={`shrink-0 object-cover ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? '50%' : 12,
        border: `1px solid ${color}33`,
        objectPosition: 'center top',
      }}
    />
  );
}
