'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/live', label: 'Live' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/groups', label: 'Groups' },
  { href: '/bracket', label: 'Bracket' },
  { href: '/teams', label: 'Teams' },
  { href: '/players', label: 'Players' },
  { href: '/stats', label: 'Stats' },
  { href: '/venues', label: 'Venues' },
  { href: '/news', label: 'News' },
  { href: '/ai', label: 'AI Analyst' },
];

function Logo() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl"
      style={{ background: 'linear-gradient(180deg, var(--accent-2), var(--accent))', boxShadow: '0 4px 14px color-mix(in srgb, var(--accent) 30%, transparent)' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    </span>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full"
      style={{ background: 'var(--header-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Logo />
            <div className="leading-none">
              <div className="font-display text-[18px] text-white tracking-tight">World Cup <span className="text-gold-gradient">26</span></div>
              <div className="text-[9px] font-semibold tracking-[0.18em] uppercase mt-0.5" style={{ color: 'var(--muted)' }}>USA · Canada · Mexico</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => {
              const active = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link key={link.href} href={link.href} className={`nav-link ${active ? 'active' : ''}`}>
                  {link.label === 'Live' ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="live-dot" style={{ width: 5, height: 5 }} />
                      Live
                    </span>
                  ) : link.label === 'AI Analyst' ? (
                    <span style={{ color: '#9FC0FF' }}>AI Analyst</span>
                  ) : link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <GlobalSearch />
            <ThemeToggle />
            <Link href="/simulator" className="hidden md:inline-flex h-9 items-center gap-2 px-4 rounded-lg text-[13px] font-semibold transition-all"
              style={{ background: 'linear-gradient(180deg, var(--accent-2), var(--accent))', color: 'var(--on-accent)' }}>
              Predict
            </Link>

            {/* Mobile menu toggle */}
            <button className="lg:hidden p-2 rounded-lg" style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'currentColor' }} />
                <span className={`block h-0.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} style={{ background: 'currentColor' }} />
                <span className={`block h-0.5 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'currentColor' }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 pb-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`nav-link block text-center py-2.5 ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/compare" className="nav-link block text-center py-2.5" onClick={() => setMenuOpen(false)}>Compare</Link>
              <Link href="/simulator" className="nav-link block text-center py-2.5" onClick={() => setMenuOpen(false)}>Predict</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
