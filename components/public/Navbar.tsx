'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Compass,
  Building2,
  Package,
  Newspaper,
  Image as ImageIcon,
  Phone,
  Lock,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface DropdownSubItem {
  label: string;
  desc: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  id: string;
  label: string;
  tagline: string;
  badge: string;
  footerIcon: React.ElementType;
  footerText: string;
  items: DropdownSubItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'profil-group',
    label: 'Profil Dusun',
    tagline: 'Profil & Pamong',
    badge: '3 Kategori',
    footerIcon: Compass,
    footerText: 'Jelajahi Wilayah Dusun',
    items: [
      {
        label: 'Profil & Demografi',
        desc: 'Riwayat Kyai Nur Jumeneng, visi misi & statistik kependudukan',
        href: '#profil',
        icon: BookOpen,
      },
      {
        label: 'Pemerintahan Dusun',
        desc: 'Kepala Dukuh, ketua RW 19–39, dan pamong RT 01–09',
        href: '#pemerintahan',
        icon: Building2,
      },
      {
        label: 'Sarana & Prasarana',
        desc: 'Fasilitas ibadah, sekolah, kesehatan, balai, dan keamanan',
        href: '#sarana',
        icon: Package,
      },
    ],
  },
  {
    id: 'potensi-group',
    label: 'Potensi & Warta',
    tagline: 'Potensi & Informasi',
    badge: '3 Kategori',
    footerIcon: Sparkles,
    footerText: 'Pemberdayaan & Kegiatan',
    items: [
      {
        label: 'Potensi Unggulan',
        desc: 'Pertanian jagung-padi, UMKM emping, keagamaan & ternak',
        href: '#potensi',
        icon: Sparkles,
      },
      {
        label: 'Warta & Kegiatan',
        desc: 'Publikasi resmi posyandu, rapat dinas, dan kerja bakti warga',
        href: '#berita',
        icon: Newspaper,
      },
      {
        label: 'Galeri Dokumentasi',
        desc: 'Potret arsip kegiatan kebersamaan masyarakat dusun',
        href: '#galeri',
        icon: ImageIcon,
      },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll listener for glassmorphism and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const allSections = [
        'beranda',
        'profil',
        'pemerintahan',
        'sarana',
        'potensi',
        'berita',
        'galeri',
        'kontak',
      ];
      const scrollPosition = window.scrollY + 120;

      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(allSections[i]);
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

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setActiveDropdown(null);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 88; // Height of sticky navbar + breathing clearance
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const handleDropdownEnter = (groupId: string) => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setActiveDropdown(groupId);
  };

  const handleDropdownLeave = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  // Group active checks
  const isProfilGroupActive = ['profil', 'pemerintahan', 'sarana'].includes(activeSection);
  const isPotensiGroupActive = ['potensi', 'berita', 'galeri'].includes(activeSection);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-stone-200 shadow-md shadow-stone-900/5'
          : 'bg-white border-b border-stone-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20" ref={navRef}>
          {/* Logo & Dusun Identity */}
          <Link
            href="#beranda"
            className="flex items-center gap-3.5 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl p-1"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#beranda');
            }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform duration-200 border border-emerald-700/50">
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

          {/* Desktop Navigation with Modern Grouped Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {/* 1. Beranda Direct Link */}
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#beranda');
              }}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border ${
                activeSection === 'beranda'
                  ? 'text-emerald-950 bg-emerald-100/80 border-emerald-200 shadow-2xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100 border-transparent'
              }`}
            >
              Beranda
            </a>

            {/* 2. Profil Dusun Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('profil-group')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'profil-group' ? null : 'profil-group')
                }
                aria-expanded={activeDropdown === 'profil-group'}
                aria-haspopup="true"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  activeDropdown === 'profil-group'
                    ? 'bg-slate-950 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : isProfilGroupActive
                    ? 'text-emerald-950 bg-emerald-100/80 border-emerald-200 shadow-2xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100 border-transparent'
                }`}
              >
                <span>Profil Dusun</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'profil-group'
                      ? 'rotate-180 text-emerald-300'
                      : isProfilGroupActive
                      ? 'text-emerald-800'
                      : 'text-stone-500'
                  }`}
                />
              </button>

              {/* Flyout Menu (100% Solid Obsidian + Emerald Theme) */}
              {activeDropdown === 'profil-group' && (
                <div
                  className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleDropdownEnter('profil-group')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="relative w-[360px] p-3 bg-slate-950 text-white rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/70 ring-1 ring-white/10">
                    {/* Top Notch Pointer */}
                    <div className="absolute -top-1.5 left-7 w-3 h-3 bg-slate-950 border-t border-l border-emerald-500/30 rotate-45" />

                    {/* Header Strip */}
                    <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-slate-800/90">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                          {NAV_GROUPS[0].tagline}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                        {NAV_GROUPS[0].badge}
                      </span>
                    </div>

                    {/* Sub-Items List */}
                    <div className="space-y-1">
                      {NAV_GROUPS[0].items.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeSection === sub.href.substring(1);
                        return (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(sub.href);
                            }}
                            className={`group relative flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 border ${
                              isSubActive
                                ? 'bg-emerald-950/80 border-emerald-500/50 text-white shadow-inner'
                                : 'bg-white/[0.03] hover:bg-slate-900 border-white/5 hover:border-emerald-500/40 text-slate-200'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-xl shrink-0 mt-0.5 transition-all duration-200 ${
                                isSubActive
                                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                                  : 'bg-slate-900 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-emerald-500/25'
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-semibold leading-tight text-white group-hover:text-emerald-300 transition-colors">
                                  {sub.label}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-1" />
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2 group-hover:text-slate-300 transition-colors">
                                {sub.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* Footer Strip */}
                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-800/90 px-2 text-[11px] text-slate-400">
                      <span className="text-[10px] text-slate-400">Padukuhan Jumeneng Kidul</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                        <Compass className="w-3 h-3" />
                        {NAV_GROUPS[0].footerText}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Potensi & Warta Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('potensi-group')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'potensi-group' ? null : 'potensi-group')
                }
                aria-expanded={activeDropdown === 'potensi-group'}
                aria-haspopup="true"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  activeDropdown === 'potensi-group'
                    ? 'bg-slate-950 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : isPotensiGroupActive
                    ? 'text-emerald-950 bg-emerald-100/80 border-emerald-200 shadow-2xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100 border-transparent'
                }`}
              >
                <span>Potensi & Warta</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'potensi-group'
                      ? 'rotate-180 text-emerald-300'
                      : isPotensiGroupActive
                      ? 'text-emerald-800'
                      : 'text-stone-500'
                  }`}
                />
              </button>

              {/* Flyout Menu (100% Solid Obsidian + Emerald Theme) */}
              {activeDropdown === 'potensi-group' && (
                <div
                  className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleDropdownEnter('potensi-group')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="relative w-[360px] p-3 bg-slate-950 text-white rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/70 ring-1 ring-white/10">
                    {/* Top Notch Pointer */}
                    <div className="absolute -top-1.5 left-7 w-3 h-3 bg-slate-950 border-t border-l border-emerald-500/30 rotate-45" />

                    {/* Header Strip */}
                    <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-slate-800/90">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                          {NAV_GROUPS[1].tagline}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                        {NAV_GROUPS[1].badge}
                      </span>
                    </div>

                    {/* Sub-Items List */}
                    <div className="space-y-1">
                      {NAV_GROUPS[1].items.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeSection === sub.href.substring(1);
                        return (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(sub.href);
                            }}
                            className={`group relative flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 border ${
                              isSubActive
                                ? 'bg-emerald-950/80 border-emerald-500/50 text-white shadow-inner'
                                : 'bg-white/[0.03] hover:bg-slate-900 border-white/5 hover:border-emerald-500/40 text-slate-200'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-xl shrink-0 mt-0.5 transition-all duration-200 ${
                                isSubActive
                                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                                  : 'bg-slate-900 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-emerald-500/25'
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-semibold leading-tight text-white group-hover:text-emerald-300 transition-colors">
                                  {sub.label}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-1" />
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2 group-hover:text-slate-300 transition-colors">
                                {sub.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* Footer Strip */}
                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-800/90 px-2 text-[11px] text-slate-400">
                      <span className="text-[10px] text-slate-400">Padukuhan Jumeneng Kidul</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                        <Sparkles className="w-3 h-3" />
                        {NAV_GROUPS[1].footerText}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Kontak Direct Link */}
            <a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#kontak');
              }}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border ${
                activeSection === 'kontak'
                  ? 'text-emerald-950 bg-emerald-100/80 border-emerald-200 shadow-2xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100 border-transparent'
              }`}
            >
              Kontak & Lokasi
            </a>
          </nav>

          {/* Right Action / Contact & Admin Link */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#kontak');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </a>

            <Link
              href="/admin/login"
              title="Portal Admin Dusun"
              aria-label="Masuk ke Halaman Admin"
              className="p-2.5 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200/80"
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
              className="p-2 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200/80"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-stone-900 hover:bg-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 transition-colors border border-stone-200/80"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dark Protective Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-18 sm:top-20 z-40 bg-slate-950/85 backdrop-blur-md lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer (Solid Obsidian Slate & Emerald Theme) */}
      <div
        className={`fixed top-18 sm:top-20 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-slate-950 text-white shadow-2xl border-l border-emerald-500/30 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-800/90 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
              Menu Navigasi Dusun
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Padukuhan Jumeneng Kidul, Sleman
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Beranda */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#beranda');
            }}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors border ${
              activeSection === 'beranda'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : 'bg-white/[0.03] text-slate-200 hover:bg-slate-900 border-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-emerald-500/20">
                <Compass className="w-4 h-4" />
              </div>
              <span>Beranda</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>

          {/* Group 1: Profil Dusun */}
          <div className="pt-2">
            <div className="px-3 text-[11px] font-black uppercase tracking-wider text-emerald-400 mb-2 flex items-center justify-between">
              <span>{NAV_GROUPS[0].tagline}</span>
              <span className="text-[10px] text-slate-400 font-normal">{NAV_GROUPS[0].badge}</span>
            </div>
            <div className="space-y-1.5">
              {NAV_GROUPS[0].items.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeSection === sub.href.substring(1);
                return (
                  <a
                    key={sub.href}
                    href={sub.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(sub.href);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                      isSubActive
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 font-bold'
                        : 'bg-white/[0.03] text-slate-200 hover:bg-slate-900 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSubActive
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-900 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        <SubIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm">{sub.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Group 2: Potensi & Warta */}
          <div className="pt-2">
            <div className="px-3 text-[11px] font-black uppercase tracking-wider text-emerald-400 mb-2 flex items-center justify-between">
              <span>{NAV_GROUPS[1].tagline}</span>
              <span className="text-[10px] text-slate-400 font-normal">{NAV_GROUPS[1].badge}</span>
            </div>
            <div className="space-y-1.5">
              {NAV_GROUPS[1].items.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeSection === sub.href.substring(1);
                return (
                  <a
                    key={sub.href}
                    href={sub.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(sub.href);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                      isSubActive
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 font-bold'
                        : 'bg-white/[0.03] text-slate-200 hover:bg-slate-900 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSubActive
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-900 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        <SubIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm">{sub.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Kontak */}
          <div className="pt-2">
            <div className="px-3 text-[11px] font-black uppercase tracking-wider text-emerald-400 mb-2">
              Layanan Warga
            </div>
            <a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#kontak');
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors border ${
                activeSection === 'kontak'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-white/[0.03] text-slate-200 hover:bg-slate-900 border-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-emerald-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <span>Kontak & Lokasi Dusun</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>
        </nav>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-900/90 space-y-2.5">
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#kontak');
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl shadow-md shadow-emerald-950/40 transition-colors active:scale-[0.98]"
          >
            <Phone className="w-4 h-4" />
            <span>Hubungi Pengurus Dusun</span>
          </a>

          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-slate-300 hover:text-emerald-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Masuk Portal Admin Dusun</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
