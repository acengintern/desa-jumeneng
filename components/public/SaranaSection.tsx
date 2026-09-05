import React from 'react';
import {
  Package,
  Landmark,
  GraduationCap,
  HeartPulse,
  Building2,
  Trophy,
  ShieldCheck,
  Users,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { SaranaPrasarana } from '@/lib/types';
import { ScrollReveal } from './ScrollReveal';

interface SaranaSectionProps {
  sarana?: SaranaPrasarana[];
}

interface FacilityMeta {
  kategori: string;
  namaDefault: string;
  jumlahDefault: string;
  deskripsi: string;
  icon: React.ElementType;
  colorClass: {
    badge: string;
    iconBg: string;
    iconText: string;
    border: string;
  };
}

const FACILITY_METAS: Record<string, FacilityMeta> = {
  Ibadah: {
    kategori: 'Ibadah',
    namaDefault: 'Masjid',
    jumlahDefault: '1 buah',
    deskripsi:
      'Pusat kegiatan ibadah shalat berjamaah, pengajian rutin, adzan 4 orang Jumat, dan silaturahmi keagamaan warga.',
    icon: Landmark,
    colorClass: {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-800',
      border: 'hover:border-emerald-300',
    },
  },
  Pendidikan: {
    kategori: 'Pendidikan',
    namaDefault: 'Sekolah Dasar Jumeneng',
    jumlahDefault: '1 buah',
    deskripsi:
      'Institusi pendidikan dasar formal yang mencerdaskan anak-anak dusun dengan fasilitas belajar yang memadai.',
    icon: GraduationCap,
    colorClass: {
      badge: 'bg-blue-50 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-800',
      border: 'hover:border-blue-300',
    },
  },
  Kesehatan: {
    kategori: 'Kesehatan',
    namaDefault: 'Posyandu',
    jumlahDefault: '1 tempat',
    deskripsi:
      'Layanan kesehatan terpadu berkala bagi balita dan lansia bersama bidan desa dan kader kesehatan padukuhan.',
    icon: HeartPulse,
    colorClass: {
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      iconBg: 'bg-rose-100',
      iconText: 'text-rose-800',
      border: 'hover:border-rose-300',
    },
  },
  Umum: {
    kategori: 'Umum',
    namaDefault: 'Balai Dusun',
    jumlahDefault: '1 buah',
    deskripsi:
      'Sentra pertemuan serbaguna untuk musyawarah warga, forum RT/RW, pelatihan kemasyarakatan, dan hajatan.',
    icon: Building2,
    colorClass: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-800',
      border: 'hover:border-amber-300',
    },
  },
  'Olahraga & Ekonomi': {
    kategori: 'Olahraga & Ekonomi',
    namaDefault: 'Lapangan',
    jumlahDefault: '1 buah',
    deskripsi:
      'Ruang terbuka aktif untuk olahraga bersama warga, turnamen dusun, serta panggung peringatan hari besar.',
    icon: Trophy,
    colorClass: {
      badge: 'bg-orange-50 text-orange-800 border-orange-200',
      iconBg: 'bg-orange-100',
      iconText: 'text-orange-800',
      border: 'hover:border-orange-300',
    },
  },
  'Keamanan & Lingkungan': {
    kategori: 'Keamanan & Lingkungan',
    namaDefault: 'Pos Ronda',
    jumlahDefault: 'Tersedia',
    deskripsi:
      'Pos pengamanan swakarsa aktif untuk ronda malam bergiliran warga demi ketertiban dan ketentraman lingkungan.',
    icon: ShieldCheck,
    colorClass: {
      badge: 'bg-teal-50 text-teal-800 border-teal-200',
      iconBg: 'bg-teal-100',
      iconText: 'text-teal-800',
      border: 'hover:border-teal-300',
    },
  },
  'Lembaga Kemasyarakatan': {
    kategori: 'Lembaga Kemasyarakatan',
    namaDefault: 'PKK',
    jumlahDefault: '1',
    deskripsi:
      'Organisasi Pemberdayaan dan Kesejahteraan Keluarga yang aktif menggerakkan kemandirian wanita dan posyandu.',
    icon: Users,
    colorClass: {
      badge: 'bg-purple-50 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-800',
      border: 'hover:border-purple-300',
    },
  },
};

export function SaranaSection({ sarana = [] }: SaranaSectionProps) {
  // Susun 7 kategori secara konsisten
  const categoryOrder = [
    'Ibadah',
    'Pendidikan',
    'Kesehatan',
    'Umum',
    'Olahraga & Ekonomi',
    'Keamanan & Lingkungan',
    'Lembaga Kemasyarakatan',
  ];

  const items = categoryOrder.map((catKey) => {
    const matched = sarana.find(
      (s) => s.kategori.toLowerCase() === catKey.toLowerCase()
    );
    const meta = FACILITY_METAS[catKey];

    return {
      id: matched?.id || `sarana-${catKey}`,
      kategori: catKey,
      nama_fasilitas: matched?.nama_fasilitas || meta.namaDefault,
      jumlah: matched?.jumlah || meta.jumlahDefault,
      deskripsi: meta.deskripsi,
      icon: meta.icon,
      colorClass: meta.colorClass,
    };
  });

  return (
    <section id="sarana" className="py-16 sm:py-20 lg:py-28 bg-white scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
            <Package className="w-4 h-4 text-emerald-700" />
            <span>Infrastruktur & Layanan</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Sarana & Prasarana Dusun
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Fasilitas publik dan kelembagaan penunjang kegiatan sosial, pendidikan,
            kesehatan, serta keagamaan masyarakat Padukuhan Jumeneng Kidul.
          </p>
        </ScrollReveal>

        {/* 7 Kategori Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={(index % 4) * 80}
                className="h-full"
              >
                <div
                  className={`group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 ${item.colorClass.border} shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full`}
                >
                  <div>
                    {/* Header Card: Icon + Category Badge */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.colorClass.iconBg} ${item.colorClass.iconText} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      {/* Quantity Tag dengan Aksen Emerald Bersih */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs whitespace-nowrap">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.jumlah}</span>
                      </span>
                    </div>

                    {/* Kategori Label */}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Kategori {item.kategori}
                    </span>

                    {/* Nama Fasilitas */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-800 transition-colors">
                      {item.nama_fasilitas}
                    </h3>

                    {/* Deskripsi Fasilitas */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Fasilitas Aktif
                    </span>
                    <span className="text-[11px] text-slate-400">Dusun Jumeneng Kidul</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Quick Summary Card to balance the 7-item grid */}
          <ScrollReveal direction="up" delay={240} className="h-full">
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex flex-col justify-between shadow-lg shadow-emerald-950/15 border border-emerald-700 h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                  Kenyamanan Warga
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-white">
                  Pemeliharaan Swadaya
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
                  Seluruh sarana dan prasarana umum dirawat bersama melalui budaya kerja bakti
                  dan iuran swadaya warga agar senantiasa aman, bersih, dan nyaman digunakan.
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-700/60 flex items-center gap-2 text-xs text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Tersebar di wilayah RT 01 s/d RT 09</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
