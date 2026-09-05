'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
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
              <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center text-white font-heading font-extrabold text-base shadow-xs border border-emerald-700/50 shrink-0">
                <span className="text-amber-300">JK</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base sm:text-lg tracking-tight leading-tight">
                  Padukuhan Jumeneng Kidul
                </h3>
                <p className="text-xs text-emerald-400 font-medium tracking-wide">
                  Kalurahan Sumberadi, Kapanewon Mlati, Sleman, DIY
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md pt-1">
              Mewujudkan padukuhan yang mandiri, guyub rukun, dan berdaya berbasis
              potensi lokal serta kearifan tradisi warga.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
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

          {/* Col 2 (3/12): Navigasi Halaman (Direct 7 Routes, no decorative dots) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (4/12): KKN & Kerjasama Kampus */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Kolaborasi Pengabdian</span>
            </h4>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-white">
                Universitas AKPRIND Indonesia
              </p>
              <p className="text-slate-400 leading-relaxed">
                Platform Sistem Informasi & Profil Padukuhan ini dikembangkan sebagai karya bakti
                program Kuliah Kerja Nyata (KKN) Mahasiswa Universitas AKPRIND Indonesia tahun 2026
                untuk Padukuhan Jumeneng Kidul.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 Padukuhan Jumeneng Kidul. Seluruh Hak Cipta Dilindungi.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors focus:outline-none text-xs font-medium min-h-[36px]"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
