'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Lock,
  ArrowUp,
  GraduationCap,
} from 'lucide-react';

const FOOTER_NAV = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Dusun', href: '/profil' },
  { label: 'Pemerintahan Dusun', href: '/pemerintahan' },
  { label: 'Potensi Dusun', href: '/potensi' },
  { label: 'Berita & Warta', href: '/berita' },
  { label: 'Galeri Dokumentasi', href: '/galeri' },
  { label: 'Kontak & Lokasi', href: '/kontak' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Col 1 (5/12): Identitas Padukuhan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-sm border border-emerald-500/30 shrink-0">
                <span className="text-amber-300">JK</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg sm:text-xl tracking-tight leading-tight">
                  Padukuhan Jumeneng Kidul
                </h3>
                <p className="text-xs text-emerald-400 font-medium tracking-wide">
                  Kalurahan Sumberadi, Kapanewon Mlati, Sleman, DIY
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md pt-1">
              Mewujudkan dusun yang mandiri, guyub rukun, dan berkemajuan berbasis
              potensi pertanian, UMKM lokal, serta keluhuran nilai-nilai tradisi keagamaan.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman, DIY 55288</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0878-3906-4121 (Layanan Warga)</span>
              </div>
            </div>
          </div>

          {/* Col 2 (3/12): Navigasi Halaman (Direct 7 Routes) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-emerald-400">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (4/12): KKN & Kerjasama Kampus + Portal Admin */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Kolaborasi Pengabdian</span>
            </h4>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <p className="font-semibold text-white">
                Universitas AKPRIND Indonesia
              </p>
              <p className="text-slate-400 leading-relaxed">
                Platform Sistem Informasi & Profil Padukuhan ini dikembangkan sebagai karya bakti
                program Kuliah Kerja Nyata (KKN) Mahasiswa Universitas AKPRIND Indonesia tahun 2026
                untuk Padukuhan Jumeneng Kidul.
              </p>
            </div>

            {/* Portal Admin Dusun Link */}
            <div className="pt-1">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-700/60 transition-all group"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                <span>Portal Admin Dusun</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 Padukuhan Jumeneng Kidul. Seluruh Hak Cipta Dilindungi.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors focus:outline-none text-xs font-medium"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
