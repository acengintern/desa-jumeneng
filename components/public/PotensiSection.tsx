'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';
import { PotensiModal } from './PotensiModal';

interface PotensiSectionProps {
  potensi?: PotensiWilayah[];
}

const DEFAULT_POTENSI: PotensiWilayah[] = [
  {
    id: 'e5000000-0000-0000-0000-000000000001',
    judul: 'Pertanian',
    icon: '🌾',
    deskripsi_singkat: 'Sebagian warga bermata pencaharian sebagai petani dan pekebun.',
    kegiatan_utama: 'Jagung, Padi, kacang tanah',
    keunggulan_hasil: 'lahan jagung luas',
    tantangan_kendala: 'Kekeringan banyak terjadi',
    sumber_data: 'Pak dukuh',
    urutan: 1,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000002',
    judul: 'UMKM Rumahan',
    icon: '🏠',
    deskripsi_singkat: 'Usaha kecil menengah warga seperti kuliner dan kerajinan.',
    kegiatan_utama: 'Kripik Melinjo',
    keunggulan_hasil: 'produksi cepat',
    tantangan_kendala: 'Pohon melinjo di dusun sedikit',
    sumber_data: 'Pak dukuh',
    urutan: 2,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000003',
    judul: 'Kehidupan Keagamaan',
    icon: '🕌',
    deskripsi_singkat: 'Tradisi dan kegiatan keagamaan yang masih kuat di tengah warga.',
    kegiatan_utama: 'Pengajian Rutin, Tarian Badui',
    keunggulan_hasil: "Masih melestarikan tradisi adzan Jum'at 4 orang",
    tantangan_kendala: 'Belum ada kendala signifikan, antusiasme warga senantiasa terjaga',
    sumber_data: 'Pak dukuh',
    urutan: 3,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000004',
    judul: 'Peternakan',
    icon: '🐄',
    deskripsi_singkat:
      'Skala rumah tangga: kambing, sapi kecil, ayam kampung; potensi untuk pakan dan pemasaran.',
    kegiatan_utama: 'Beternak Sapi, Kambing, Ayam',
    keunggulan_hasil: 'Kotoran Ternak Banyak sehingga untuk kompos mudah dilakukan',
    tantangan_kendala: 'Rumput bagus berkurang karena kekeringan',
    sumber_data: 'Pak dukuh',
    urutan: 4,
  },
];

export function PotensiSection({ potensi = [] }: PotensiSectionProps) {
  const [selectedPotensi, setSelectedPotensi] = useState<PotensiWilayah | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = potensi.length > 0 ? potensi : DEFAULT_POTENSI;

  const handleOpenDetail = (item: PotensiWilayah) => {
    setSelectedPotensi(item);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="potensi" className="py-20 lg:py-28 bg-slate-50/70 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Keunggulan & Kemandirian
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Potensi Unggulan Wilayah
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-slate-600">
            Kekayaan sumber daya agraris, ekonomi rumahan, tradisi keagamaan, dan peternakan
            yang menjadi penggerak roda kesejahteraan warga.
          </p>
        </div>

        {/* 4 Kartu Potensi Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenDetail(item);
                }
              }}
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-400 shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 text-left"
            >
              <div>
                {/* Header Card: Icon Box */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100/80 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Potensi Dusun
                  </span>
                </div>

                {/* Judul Potensi */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950 mb-2 group-hover:text-emerald-800 transition-colors">
                  {item.judul}
                </h3>

                {/* Ringkasan */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {item.deskripsi_singkat}
                </p>

                {/* Kegiatan Utama Pill */}
                <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Komoditas / Fokus:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {item.kegiatan_utama}
                  </p>
                </div>
              </div>

              {/* Action Indicator: Klik untuk detail potensi */}
              <div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                  <span className="inline-flex items-center gap-1.5">
                    <span>Klik untuk detail potensi</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Decorative Hover Glow Line */}
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Modal Pop-up Interaktif */}
        <PotensiModal
          potensi={selectedPotensi}
          isOpen={isModalOpen}
          onClose={handleCloseDetail}
        />
      </div>
    </section>
  );
}
