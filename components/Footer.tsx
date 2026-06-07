import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 py-14" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(180deg, var(--accent), var(--accent-deep))' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1503" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </span>
              <div>
                <div className="font-display text-xl text-white">World Cup 26</div>
                <div className="text-[10px] tracking-[0.16em] uppercase" style={{ color: 'var(--muted)' }}>USA · Canada · Mexico</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              The definitive FIFA World Cup 2026 digital experience. Live scores, AI analysis, all 48 teams.
            </p>
          </div>

          {/* Tournament */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Tournament</h4>
            <div className="flex flex-col gap-2">
              {[['Groups', '/groups'], ['Bracket', '/bracket'], ['Schedule', '/schedule'], ['Live Scores', '/live'], ['Venues', '/venues']].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-2)' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Teams & Players */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Teams & Players</h4>
            <div className="flex flex-col gap-2">
              {[['All 48 Teams', '/teams'], ['Player Database', '/players'], ['Statistics', '/stats'], ['Compare Tool', '/compare'], ['News', '/news']].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-2)' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Tools</h4>
            <div className="flex flex-col gap-2">
              {[['AI Analyst', '/ai'], ['Bracket Simulator', '/simulator'], ['History', '/history'], ['About', '/about']].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-2)' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © 2026 FIFA World Cup Fan Platform. Not affiliated with FIFA. For entertainment purposes.
          </p>
          <div className="flex items-center gap-2">
            <span className="live-dot" style={{ background: 'var(--win)' }} />
            <span className="text-xs" style={{ color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--win)' }}>Live</span> · June 11 – July 19, 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

