import React from 'react';
import {
  Users,
  Home,
  MapPin,
  Layers,
  ArrowDown,
  Phone,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { ProfilDesa, StatistikKependudukan } from '@/lib/types';

interface HeroSectionProps {
  profil: ProfilDesa;
  statistik: StatistikKependudukan;
}

export function HeroSection({ profil, statistik }: HeroSectionProps) {
  const statCards = [
    {
      label: 'Jumlah Penduduk',
      value: (statistik.total_penduduk ?? 1659).toLocaleString('id-ID'),
      unit: 'Jiwa Warga',
      icon: Users,
      badgeText: 'Total Jiwa',
      badgeColor: 'text-emerald-700 bg-emerald-100/70',
      iconBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      label: 'Kepala Keluarga',
      value: (statistik.kepala_keluarga ?? 527).toLocaleString('id-ID'),
      unit: 'Kepala Keluarga (KK)',
      icon: Home,
      badgeText: 'Rukun Warga',
      badgeColor: 'text-amber-700 bg-amber-100/70',
      iconBg: 'bg-amber-100 text-amber-800',
    },
    {
      label: 'Rukun Tetangga (RT)',
      value: (statistik.jumlah_rt ?? 9).toString(),
      unit: 'Wilayah RT 01 - 09',
      icon: MapPin,
      badgeText: 'Unit Wilayah',
      badgeColor: 'text-emerald-700 bg-emerald-100/70',
      iconBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      label: 'Rukun Warga (RW)',
      value: (statistik.jumlah_rw ?? 5).toString(),
      unit: 'RW 19, 20, 21, 39 & Kring',
      icon: Layers,
      badgeText: 'Rukun Lingkungan',
      badgeColor: 'text-teal-700 bg-teal-100/70',
      iconBg: 'bg-teal-100 text-teal-800',
    },
  ];

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/20 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-emerald-100/60"
    >
      {/* Background Decorative Grid & Glow Elements */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(#064e3b 1px, transparent 1px), radial-gradient(#064e3b 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          {/* Regional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs mb-6 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Padukuhan • Sumberadi • Mlati • Sleman</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 tracking-tight leading-[1.15] mb-6">
            Selamat Datang di{' '}
            <span className="relative inline-block text-emerald-800">
              Jumeneng Kidul
              <svg
                className="absolute -bottom-2 left-0 w-full text-amber-500/60"
                viewBox="0 0 250 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9C60 3 180 3 247 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Descriptive Narrative */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            {profil.deskripsi_hero ||
              'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Menyajikan informasi seputar wilayah, pemerintahan, potensi, dan kegiatan warga.'}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-12">
            <a
              href="#profil"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-sm shadow-md shadow-emerald-950/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Jelajahi Profil Dusun</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <a
              href="#kontak"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50/80 text-emerald-900 border border-emerald-200 font-semibold text-sm shadow-xs hover:border-emerald-300 transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Hubungi Kami</span>
            </a>
          </div>

          {/* Authenticity Pill */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/60 mb-8 lg:mb-12">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Portal Informasi & Layanan Padukuhan Terverifikasi</span>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 pt-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/95 rounded-2xl p-4 sm:p-6 border border-emerald-100/90 shadow-xs shadow-emerald-950/5 hover:shadow-md hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${stat.badgeColor}`}
                  >
                    {stat.badgeText}
                  </span>
                </div>

                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-emerald-950 tracking-tight leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-medium text-xs sm:text-sm text-slate-700">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {stat.unit}
                  </div>
                </div>

                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
