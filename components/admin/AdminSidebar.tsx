'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  Users,
  Building2,
  Sprout,
  BookOpen,
  Mail,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  unreadCount?: number;
}

export const ADMIN_NAV_ITEMS = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Kelola Berita',
    href: '/admin/berita',
    icon: Newspaper,
    exact: false,
  },
  {
    name: 'Kelola Galeri',
    href: '/admin/galeri',
    icon: ImageIcon,
    exact: false,
  },
  {
    name: 'Struktur Dusun',
    href: '/admin/struktur',
    icon: Users,
    exact: false,
  },
  {
    name: 'Sarana & Prasarana',
    href: '/admin/sarana',
    icon: Building2,
    exact: false,
  },
  {
    name: 'Potensi Wilayah',
    href: '/admin/potensi',
    icon: Sprout,
    exact: false,
  },
  {
    name: 'Profil & Demografi',
    href: '/admin/profil',
    icon: BookOpen,
    exact: false,
  },
  {
    name: 'Pesan Warga',
    href: '/admin/pesan',
    icon: Mail,
    exact: false,
    hasBadge: true,
  },
];

export default function AdminSidebar({
  isOpen,
  onClose,
  unreadCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-emerald-950 text-white border-r border-emerald-900/60 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-emerald-900/60 flex items-center justify-between">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold font-heading text-white tracking-tight leading-none">
                Admin Dusun
              </div>
              <div className="text-[11px] text-emerald-300/80 font-medium mt-1">
                Jumeneng Kidul
              </div>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/80 md:hidden transition-colors"
            aria-label="Tutup navigasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Label */}
        <div className="px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-300/60">
          Menu Navigasi
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
          {ADMIN_NAV_ITEMS.map((item) => {
            const active = isItemActive(item.href, item.exact);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-emerald-800 text-white font-semibold shadow-sm shadow-emerald-950/40 border border-emerald-700/60'
                    : 'text-emerald-100/75 hover:bg-emerald-900/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      active
                        ? 'text-emerald-300'
                        : 'text-emerald-300/70 group-hover:text-emerald-200'
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>

                {/* Badges / Indicators */}
                {item.hasBadge && unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-amber-950 bg-amber-400 rounded-md shadow-xs">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}

                {active && !item.hasBadge && (
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300/60 ml-1 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-emerald-900/60 bg-emerald-950/70">
          <div className="bg-emerald-900/40 border border-emerald-800/40 rounded-xl p-3 text-xs">
            <div className="text-emerald-200 font-semibold mb-0.5">
              Padukuhan Jumeneng Kidul
            </div>
            <div className="text-[11px] text-emerald-300/60 leading-relaxed">
              Kal. Sumberadi, Kapanewon Mlati, Sleman, D.I. Yogyakarta
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
