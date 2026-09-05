import React from 'react';
import {
  Users,
  Home,
  MapPin,
  Layers,
  ArrowRight,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { ProfilDesa, StatistikKependudukan } from '@/lib/types';

interface HeroSectionProps {
  profil: ProfilDesa;
  statistik: StatistikKependudukan;
}

export function HeroSection({ profil, statistik }: HeroSectionProps) {
  const statMetrics = [
    {
      label: 'Jumlah Penduduk',
      value: (statistik.total_penduduk ?? 1659).toLocaleString('id-ID'),
      unit: 'Jiwa Warga Terdata',
      icon: Users,
      meta: 'Sensus Padukuhan',
      badgeClass: 'text-emerald-900 bg-emerald-100',
    },
    {
      label: 'Kepala Keluarga',
      value: (statistik.kepala_keluarga ?? 527).toLocaleString('id-ID'),
      unit: 'Kartu Keluarga (KK)',
      icon: Home,
      meta: 'Kepala Rumah Tangga',
      badgeClass: 'text-amber-900 bg-amber-100',
    },
    {
      label: 'Rukun Tetangga',
      value: (statistik.jumlah_rt ?? 9).toString(),
      unit: 'Wilayah RT 01 s/d RT 09',
      icon: MapPin,
      meta: 'Unit RT Dusun',
      badgeClass: 'text-emerald-900 bg-emerald-100',
    },
    {
      label: 'Rukun Warga',
      value: (statistik.jumlah_rw ?? 5).toString(),
      unit: 'RW 19, 20, 21, 39 & Kring',
      icon: Layers,
      meta: 'Satuan RW & Kring',
      badgeClass: 'text-teal-900 bg-teal-100',
    },
  ];

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/40 pt-10 pb-16 lg:pt-20 lg:pb-24 border-b border-emerald-950/10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          {/* Authentic Editorial Location Eyebrow (No capsule) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Padukuhan Jumeneng Kidul</span>
            <span className="text-emerald-400 font-normal">/</span>
            <span className="text-stone-600 font-normal">Kalurahan Sumberadi, Mlati, Sleman</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 tracking-tight leading-[1.12] mb-6 text-balance">
            Selamat Datang di{' '}
            <span className="text-emerald-800">
              Jumeneng Kidul
            </span>
          </h1>

          {/* Descriptive Narrative */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            {profil.deskripsi_hero ||
              'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Menyajikan informasi seputar wilayah, pemerintahan, potensi, dan kegiatan warga.'}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
            <a
              href="#profil"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Jelajahi Profil Dusun</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#kontak"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-900/20 font-semibold text-sm shadow-xs transition-all duration-200 active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-emerald-800" />
              <span>Hubungi Pengurus</span>
            </a>
          </div>

          {/* Verification indicator */}
          <div className="inline-flex items-center gap-2 text-xs text-emerald-950 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-900/10 mb-10 lg:mb-14">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Portal Informasi & Pelayanan Administrasi Warga Terpadu</span>
          </div>
        </div>

        {/* 4 Demography Metric Ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {statMetrics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-emerald-700/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-900/10">
                    <Icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${stat.badgeClass}`}
                  >
                    {stat.meta}
                  </span>
                </div>

                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-950 tracking-tight leading-none mb-1.5">
                    {stat.value}
                  </div>
                  <div className="font-bold text-sm text-slate-800">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    {stat.unit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
