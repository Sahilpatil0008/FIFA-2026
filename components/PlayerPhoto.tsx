'use client';

import { useEffect, useState } from 'react';

// Session-level cache so we don't re-hit /api/player-photo for a player we've
// already looked up (e.g. when they appear in a grid and a modal).
const photoCache = new Map<string, string | null>();

interface PlayerPhotoProps {
  /** Wikipedia article title / player name, e.g. "Kylian Mbappé". */
  name: string;
  /** Optional jersey number shown on the fallback silhouette. */
  jersey?: number;
  /** Accent color for the fallback background. */
  color?: string;
  /** Square size in pixels. */
  size?: number;
  className?: string;
  rounded?: boolean;
}

function Silhouette({ jersey, color, size, rounded }: { jersey?: number; color: string; size: number; rounded: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? '50%' : 12,
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        border: `1px solid ${color}44`,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill={color} opacity={0.55}>
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6Z" />
      </svg>
      {jersey != null && (
        <span
          className="absolute bottom-0 right-0 font-mono text-[10px] font-bold px-1 rounded-tl"
          style={{ background: color, color: '#0a0e1a' }}
        >
          {jersey}
        </span>
      )}
    </div>
  );
}

export default function PlayerPhoto({
  name,
  jersey,
  color = '#0066FF',
  size = 64,
  className = '',
  rounded = false,
}: PlayerPhotoProps) {
  const [url, setUrl] = useState<string | null | undefined>(() =>
    photoCache.has(name) ? photoCache.get(name) : undefined,
  );
  const [broken, setBroken] = useState(false);

  useEffect(() => {
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
  }, [name]);

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
        <Silhouette jersey={jersey} color={color} size={size} rounded={rounded} />
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
