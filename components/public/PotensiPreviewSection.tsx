import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';

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

const POTENSI_IMAGES: Record<string, string> = {
  'Pertanian & Tanaman Pangan':
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  'UMKM Kripik Melinjo':
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  'Keagamaan & Tradisi Budaya':
    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
  'Peternakan Rakyat':
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
};

export function PotensiPreviewSection({ potensi }: PotensiPreviewSectionProps) {
  const items = potensi && potensi.length > 0 ? potensi.slice(0, 4) : DEFAULT_POTENSI;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-stone-50/50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Left-aligned, natural copy) */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Potensi Unggulan Padukuhan
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Pertanian pangan, sentra emping melinjo, tradisi keagamaan, dan peternakan warga Jumeneng Kidul.
          </p>
        </div>

        {/* 4 Image-Led Potentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 mb-10">
          {items.map((item) => {
            const fallbackImage =
              POTENSI_IMAGES[item.judul] ||
              'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
            const imageUrl = item.gambar_url || fallbackImage;

            return (
              <Link
                key={item.id}
                href="/potensi"
                className="group block flex flex-col justify-between"
              >
                <div>
                  {/* Visual / Image */}
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={imageUrl}
                      alt={item.judul}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300 ease-out"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-base sm:text-lg text-stone-900 group-hover:text-emerald-900 transition-colors mt-3">
                    {item.judul}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.deskripsi_singkat}
                  </p>
                </div>

                {/* Simple Link */}
                <div className="mt-3 pt-2 text-xs font-semibold text-emerald-800 group-hover:text-emerald-700 inline-flex items-center gap-1">
                  <span>Lihat rincian potensi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div>
          <Link
            href="/potensi"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm shadow-xs transition-colors active:scale-[0.98] min-h-[44px]"
          >
            <span>Lihat Seluruh Potensi Dusun</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
