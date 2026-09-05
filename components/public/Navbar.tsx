'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  Lock,
  ChevronRight,
} from 'lucide-react';

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
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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
      className={`sticky top-0 z-50 transition-shadow duration-200 bg-white ${
        scrolled
          ? 'border-b border-stone-200/90 shadow-sm'
          : 'border-b border-stone-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Left: Logo & Village Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl p-1"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200 border border-emerald-700/50 shrink-0">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-amber-300">
                JK
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-sm sm:text-lg text-stone-950 group-hover:text-emerald-900 transition-colors leading-tight truncate max-w-[190px] xs:max-w-[260px] sm:max-w-none">
                Padukuhan Jumeneng Kidul
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-emerald-800 leading-normal truncate max-w-[180px] xs:max-w-none">
                Kalurahan Sumberadi, Sleman
              </span>
            </div>
          </Link>

          {/* Center: 7 Direct Route Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navigasi Utama">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-150 border ${
                    active
                      ? 'text-emerald-950 font-bold bg-emerald-50 border-emerald-200 shadow-sm'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50 border-transparent font-medium'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Action & Admin Login (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </Link>

            <Link
              href="/admin/login"
              title="Portal Admin Dusun"
              aria-label="Masuk ke Halaman Admin"
              className="p-2.5 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200/80"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Right Bar: Admin Lock & Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin/login"
              title="Login Admin"
              aria-label="Masuk Admin"
              className="p-2 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200/80"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-colors border border-stone-200/80"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-18 sm:top-20 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Clean, crisp village portal aesthetic) */}
      <div
        className={`fixed top-18 sm:top-20 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-white text-stone-900 shadow-2xl border-l border-stone-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Mobile"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Navigasi Dusun
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Padukuhan Jumeneng Kidul
          </p>
        </div>

        {/* 7 Direct Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5" aria-label="Navigasi Mobile">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors border ${
                  active
                    ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-200 shadow-sm'
                    : 'bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 border-stone-100 font-medium'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight
                  className={`w-4 h-4 ${
                    active ? 'text-emerald-800' : 'text-stone-400'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/80 space-y-2.5">
          <Link
            href="/kontak"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl shadow-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Hubungi Pengurus Dusun</span>
          </Link>

          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-stone-600 hover:text-emerald-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-stone-500" />
            <span>Portal Admin Dusun</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
