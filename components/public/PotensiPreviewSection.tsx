import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';
import { renderPotensiVectorIcon } from './potensi-icons';
import { ScrollReveal } from './ScrollReveal';

interface PotensiPreviewSectionProps {
  potensi?: PotensiWilayah[];
}

const DEFAULT_POTENSI: PotensiWilayah[] = [
  {
    id: 'e5000000-0000-0000-0000-000000000001',
    judul: 'Pertanian & Tanaman Pangan',
    icon: 'sprout',
    deskripsi_singkat:
      'Lahan sawah dan tegalan produktif penghasil komoditas jagung, padi, serta kacang tanah sebagai penopang pangan utama dusun.',
    kegiatan_utama: 'Jagung, Padi, Kacang Tanah',
    keunggulan_hasil: 'Lahan jagung luas & hasil panen berkualitas',
    tantangan_kendala: 'Kekeringan pada musim kemarau',
    sumber_data: 'Pak dukuh',
    urutan: 1,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000002',
    judul: 'UMKM Kripik Melinjo',
    icon: 'store',
    deskripsi_singkat:
      'Produksi olahan emping melinjo tradisional berkualitas tinggi yang digerakkan oleh industri rumahan warga padukuhan.',
    kegiatan_utama: 'Kripik & Emping Melinjo',
    keunggulan_hasil: 'Kualitas renyah & pemrosesan cepat',
    tantangan_kendala: 'Pasokan bahan baku melinjo lokal',
    sumber_data: 'Pak dukuh',
    urutan: 2,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000003',
    judul: 'Keagamaan & Tradisi Budaya',
    icon: 'landmark',
    deskripsi_singkat:
      'Kehidupan sosial agamis yang harmonis dengan pengajian rutin, tradisi adzan Jum’at 4 muadzin, serta kesenian Tarian Badui.',
    kegiatan_utama: 'Pengajian Rutin, Seni Badui, Adzan 4',
    keunggulan_hasil: 'Kerukunan warga & pelestarian budaya asli',
    tantangan_kendala: 'Regenerasi generasi penerus',
    sumber_data: 'Pak dukuh',
    urutan: 3,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000004',
    judul: 'Peternakan Rakyat',
    icon: 'beef',
    deskripsi_singkat:
      'Peternakan skala rumah tangga meliputi budidaya sapi, kambing, dan ayam kampung yang terintegrasi pemanfaatan pupuk kompos.',
    kegiatan_utama: 'Sapi, Kambing, Ayam Kampung',
    keunggulan_hasil: 'Potensi pupuk organik melimpah',
    tantangan_kendala: 'Ketersediaan hijauan pakan saat kemarau',
    sumber_data: 'Pak dukuh',
    urutan: 4,
  },
];

export function PotensiPreviewSection({ potensi }: PotensiPreviewSectionProps) {
  const items = potensi && potensi.length > 0 ? potensi.slice(0, 4) : DEFAULT_POTENSI;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-stone-50/50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Kemandirian Wilayah</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Potensi Unggulan Padukuhan
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Ragam kekuatan ekonomi, sumber daya alam, dan kearifan sosial yang menjadi denyut nadi
            kehidupan warga Jumeneng Kidul.
          </p>
        </ScrollReveal>

        {/* 4 Potentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {items.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 80} className="h-full">
              <Link
                href="/potensi"
                className="group h-full p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-600/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50/80 border border-emerald-900/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {renderPotensiVectorIcon(item.judul, item.icon, 'w-6 h-6')}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.deskripsi_singkat}
                  </p>
                </div>

                {item.kegiatan_utama && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <span className="truncate">{item.kegiatan_utama}</span>
                  </div>
                )}
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            href="/potensi"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <span>Lihat Seluruh Potensi Dusun</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
