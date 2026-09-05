'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Maximize2,
  Calendar,
  Sparkles,
  Camera,
} from 'lucide-react';
import { Galeri } from '@/lib/types';
import { GaleriLightbox } from './GaleriLightbox';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface GaleriSectionProps {
  galeri?: Galeri[];
}

const DEFAULT_GALERI: Galeri[] = [
  {
    id: '77000000-0000-0000-0000-000000000001',
    judul_kegiatan: 'Kerja Bakti Warga',
    foto_url:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    tanggal_kegiatan: '2026-08-10',
    urutan: 1,
  },
  {
    id: '77000000-0000-0000-0000-000000000002',
    judul_kegiatan: 'Kegiatan Posyandu',
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg',
    tanggal_kegiatan: '2026-07-20',
    urutan: 2,
  },
];

export function GaleriSection({ galeri = [] }: GaleriSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const items = galeri && galeri.length > 0 ? galeri : DEFAULT_GALERI;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="galeri" className="py-20 lg:py-28 bg-slate-50/70 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 mb-4">
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            Dokumentasi Visual
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Galeri Kegiatan Dusun
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-slate-600">
            Kumpulan potret momen kebersamaan, gotong royong warga, layanan kemasyarakatan,
            serta kehangatan tradisi sosial di Padukuhan Jumeneng Kidul.
          </p>
        </div>

        {/* Galeri Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const isBroken = failedImages[item.id];

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenLightbox(index);
                  }
                }}
                aria-label={`Lihat foto ${item.judul_kegiatan} dalam ukuran penuh`}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 bg-slate-900 border border-slate-200/80 focus:outline-hidden focus:ring-4 focus:ring-emerald-500/40"
              >
                {/* Image or Fallback */}
                {!isBroken && item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.judul_kegiatan}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center mb-2">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {item.judul_kegiatan}
                    </span>
                  </div>
                )}

                {/* Dark Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Center Hover Action Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-13 h-13 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/50 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Bottom Caption & Date */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white z-10">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors drop-shadow-xs line-clamp-2">
                    {item.judul_kegiatan}
                  </h3>

                  {item.tanggal_kegiatan && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 font-medium drop-shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{formatTanggalIndonesia(item.tanggal_kegiatan)}</span>
                    </div>
                  )}
                </div>

                {/* Top Corner Pill "Klik untuk Perbesar" */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-xs">
                    Perbesar
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informasi Footer Galeri */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            Menampilkan dokumentasi resmi arsip kegiatan Padukuhan Jumeneng Kidul. Klik pada foto untuk melihat tampilan layar penuh.
          </p>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <GaleriLightbox
        photos={items}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
