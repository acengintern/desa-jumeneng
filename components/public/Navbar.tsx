'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Compass,
  Users,
  Building2,
  Package,
  Newspaper,
  Image as ImageIcon,
  Phone,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#beranda', icon: Compass },
  { label: 'Profil', href: '#profil', icon: Users },
  { label: 'Pemerintahan', href: '#pemerintahan', icon: Building2 },
  { label: 'Sarana', href: '#sarana', icon: Package },
  { label: 'Potensi', href: '#potensi', icon: Sparkles },
  { label: 'Berita', href: '#berita', icon: Newspaper },
  { label: 'Galeri', href: '#galeri', icon: ImageIcon },
  { label: 'Kontak', href: '#kontak', icon: Phone },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for anchor highlight
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
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

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-emerald-100/90 shadow-xs shadow-emerald-950/5'
          : 'bg-white/90 backdrop-blur-md border-b border-emerald-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Dusun Identity */}
          <Link
            href="#beranda"
            className="flex items-center gap-3.5 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#beranda');
            }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform duration-200">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-amber-300">
                JK
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg text-emerald-950 group-hover:text-emerald-800 transition-colors leading-tight">
                Padukuhan Jumeneng Kidul
              </span>
              <span className="text-xs font-medium text-emerald-700/80 leading-normal">
                Kalurahan Sumberadi • Mlati • Sleman
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-emerald-900 bg-emerald-50/80 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action / Contact & Admin Link */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#kontak');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-sm shadow-emerald-950/10 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi Kami</span>
            </a>

            <Link
              href="/admin/login"
              title="Portal Admin Dusun"
              aria-label="Masuk ke Halaman Admin"
              className="p-2 text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin/login"
              title="Login Admin"
              aria-label="Masuk Admin"
              className="p-2 text-slate-500 hover:text-emerald-800 rounded-lg"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-18 sm:top-20 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-18 sm:top-20 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl border-l border-emerald-100/80 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-emerald-100/60 bg-gradient-to-r from-emerald-50/70 to-amber-50/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">
              Navigasi Dusun
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pilih bagian portal yang ingin Anda jelajahi
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-950 bg-emerald-100/70 font-semibold'
                    : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald-100 bg-slate-50/70 space-y-2">
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#kontak');
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Hubungi Pengurus Dusun</span>
          </a>

          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-slate-600 hover:text-emerald-800 rounded-lg transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Masuk Portal Admin / Pengurus</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
