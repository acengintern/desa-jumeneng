'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { VillageEmblem } from './VillageEmblem';

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Pemerintahan', href: '/pemerintahan' },
  { label: 'Potensi', href: '/potensi' },
  { label: 'Berita', href: '/berita' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener for sticky navbar subtle border/shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || (pathname ? pathname.startsWith(`${href}/`) : false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-xs ${
        scrolled
          ? 'border-b border-stone-200/90 shadow-2xs'
          : 'border-b border-stone-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Height: 56px-64px on mobile, 64px-72px on desktop */}
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Left: Logo & Village Identity (Illustration + Jumeneng Kidul) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg py-1"
            onClick={() => setIsOpen(false)}
          >
            <VillageEmblem
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 group-hover:scale-105 transition-transform duration-200 shrink-0"
              variant="light"
            />
            <span className="font-heading font-bold text-base sm:text-lg lg:text-xl text-stone-950 group-hover:text-emerald-900 transition-colors tracking-tight">
              Jumeneng Kidul
            </span>
          </Link>

          {/* Center: 7 Direct Route Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navigasi Utama">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm transition-colors py-1 relative ${
                    active
                      ? 'text-emerald-900 font-bold'
                      : 'text-stone-600 hover:text-stone-950 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle Underline Active Indicator (No pill) */}
                  {active && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Action (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-2xs transition-all active:scale-[0.98] min-h-[40px]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi Kami</span>
            </Link>
          </div>

          {/* Mobile Right Bar: Minimal Custom Animated Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-lg text-stone-800 bg-stone-100/70 hover:bg-stone-200/70 active:bg-stone-200 border border-stone-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            >
              {/* Minimalist 2-line Hamburger Morphing to X (20x20px, stroke 1.8px, natural 200ms ease) */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 ease-in-out"
                aria-hidden="true"
              >
                {/* Top line -> Diagonal X bar 1 */}
                <line
                  x1="3"
                  y1={isOpen ? '10' : '6.5'}
                  x2="17"
                  y2={isOpen ? '10' : '6.5'}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`origin-center transition-all duration-200 ease-in-out ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                />
                {/* Bottom line -> Diagonal X bar 2 */}
                <line
                  x1="3"
                  y1={isOpen ? '10' : '13.5'}
                  x2="17"
                  y2={isOpen ? '10' : '13.5'}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`origin-center transition-all duration-200 ease-in-out ${
                    isOpen ? '-rotate-45' : ''
                  }`}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-14 sm:top-16 z-40 bg-stone-950/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer (Clean text navigation, no cards, separated secondary action) */}
      <div
        id="mobile-nav-drawer"
        className={`fixed top-14 sm:top-16 right-0 bottom-0 z-50 w-full max-w-[280px] xs:max-w-xs bg-white text-stone-900 shadow-xl border-l border-stone-200 flex flex-col transform transition-transform duration-250 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Mobile"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Menu Padukuhan
          </span>
          <span className="text-xs text-emerald-900 font-bold">Jumeneng Kidul</span>
        </div>

        {/* 7 Clean Text Links (No left border AI slop, clean rounded highlight) */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Navigasi Mobile">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center px-3.5 py-3 rounded-lg text-sm transition-colors min-h-[44px] ${
                  active
                    ? 'text-emerald-950 font-bold bg-emerald-50/80'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50 font-medium'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer Actions: Separated cleanly from main links */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/50 mt-auto">
          <Link
            href="/kontak"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-2xs transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" />
            <span>Hubungi Pengurus Dusun</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
