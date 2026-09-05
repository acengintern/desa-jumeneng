'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  ExternalLink,
  LogOut,
  User,
  Shield,
  Loader2,
} from 'lucide-react';
import { logoutAction } from '@/app/admin/login/actions';

export interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/admin': {
    title: 'Ringkasan Dashboard',
    subtitle: 'Statistik utama & aktivitas terkini Padukuhan Jumeneng Kidul',
  },
  '/admin/berita': {
    title: 'Kelola Berita & Publikasi',
    subtitle: 'Publikasi warta kegiatan dan informasi penting dusun',
  },
  '/admin/galeri': {
    title: 'Dokumentasi Galeri Foto',
    subtitle: 'Arsip foto dokumentasi kegiatan kemasyarakatan padukuhan',
  },
  '/admin/struktur': {
    title: 'Struktur Organisasi Dusun',
    subtitle: 'Daftar pengurus padukuhan, RW 21, RW 22, dan RT 01 - RT 06',
  },
  '/admin/sarana': {
    title: 'Sarana & Prasarana Wilayah',
    subtitle: 'Fasilitas umum, keagamaan, olahraga, dan balai dusun',
  },
  '/admin/potensi': {
    title: 'Kelola Potensi Wilayah',
    subtitle: 'Sektor pertanian, UMKM, kerajinan bambu, dan peternakan',
  },
  '/admin/profil': {
    title: 'Profil & Demografi',
    subtitle: 'Informasi sejarah, visi misi, dan statistik kependudukan',
  },
  '/admin/pesan': {
    title: 'Kotak Masuk Aspirasi Warga',
    subtitle: 'Pesan dan aspirasi yang dikirimkan warga melalui portal',
  },
};

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isLoggingOut, startLogout] = useTransition();

  // Dapatkan judul berdasarkan awalan rute yang cocok
  const currentRouteMeta =
    ROUTE_TITLES[pathname] ||
    Object.entries(ROUTE_TITLES).find(
      ([path]) => path !== '/admin' && pathname.startsWith(path)
    )?.[1] || {
      title: 'Panel Administrasi',
      subtitle: 'Padukuhan Jumeneng Kidul',
    };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari Panel Admin?')) {
      startLogout(async () => {
        await logoutAction();
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Current Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold font-heading text-slate-900 truncate">
              {currentRouteMeta.title}
            </h1>
            <p className="text-xs text-slate-500 truncate hidden sm:block">
              {currentRouteMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action & Profile / Logout */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* View Public Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
            title="Buka Website Padukuhan di tab baru"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Lihat Website</span>
          </Link>

          {/* User Profile Pill */}
          <div className="hidden lg:flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs ring-2 ring-emerald-600/20">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight flex items-center gap-1">
                Pengurus Dusun
                <Shield className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Administrator
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors disabled:opacity-60 cursor-pointer"
            title="Keluar dari Panel Admin"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
            ) : (
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
