'use client';

import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  Maximize2,
  Calendar,
  Search,
  X,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { Galeri } from '@/lib/types';
import { GaleriLightbox } from './GaleriLightbox';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface GaleriPageContentProps {
  galeri: Galeri[];
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

export function GaleriPageContent({ galeri }: GaleriPageContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const items = galeri && galeri.length > 0 ? galeri : DEFAULT_GALERI;

  // Filter foto berdasarkan kata kunci
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) =>
      item.judul_kegiatan.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* 1. FILTER & PENCARIAN FOTO */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari foto kerja bakti, posyandu, gotong royong..."
            aria-label="Cari foto kegiatan dusun"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg text-base sm:text-sm min-h-[44px] text-stone-900 bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-colors placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 rounded-md hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Indikator Jumlah & Petunjuk Interaksi */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-stone-500 font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 font-semibold">
            <Camera className="w-3.5 h-3.5 text-emerald-800" />
            <span>
              {filteredPhotos.length} Dokumentasi Foto
            </span>
          </span>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="hidden sm:inline text-stone-500">
            Klik foto untuk mode layar penuh
          </span>
        </div>
      </div>

      {/* 2. RESPONSIVE PHOTO GRID (2 COLUMNS ON MOBILE, 3 ON DESKTOP) */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredPhotos.map((item, index) => {
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
                aria-label={`Buka foto ${item.judul_kegiatan} dalam ukuran penuh`}
                className="group relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 bg-stone-900 border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                {/* Image or Graceful Fallback */}
                {!isBroken && item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.judul_kegiatan}
                    loading="lazy"
                    decoding="async"
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-10 h-10 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center mb-2">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-semibold text-xs sm:text-sm line-clamp-2">
                      {item.judul_kegiatan}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-400 mt-1 hidden sm:block">
                      Dokumentasi arsip kegiatan
                    </span>
                  </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Center Hover Action Icon (desktop only) */}
                <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-white/25 backdrop-blur-xs text-white border border-white/40 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Top Corner Pill "Perbesar" (desktop only) */}
                <div className="hidden sm:block absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-white bg-stone-950/80 backdrop-blur-xs border border-white/20 shadow-xs">
                    Perbesar
                  </span>
                </div>

                {/* Bottom Caption & Indonesian Date */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white z-10">
                  <h2 className="font-heading font-bold text-xs sm:text-base text-white group-hover:text-emerald-300 transition-colors drop-shadow-xs line-clamp-2 leading-tight sm:leading-snug">
                    {item.judul_kegiatan}
                  </h2>

                  {item.tanggal_kegiatan && (
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-stone-300 mt-1 font-medium drop-shadow-xs truncate">
                      <Calendar className="w-3 h-3 text-emerald-400 shrink-0" />
                      <time dateTime={item.tanggal_kegiatan}>
                        {formatTanggalIndonesia(item.tanggal_kegiatan)}
                      </time>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-lg border border-stone-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-lg bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-stone-900 mb-1">
            Tidak Ada Foto yang Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed">
            Tidak ada foto dokumentasi yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan periksa kembali ejaan pencarian Anda.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg min-h-[44px] bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <span>Tampilkan Seluruh Foto</span>
          </button>
        </div>
      )}

      {/* 3. LIGHTBOX VIEWER */}
      <GaleriLightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </div>
  );
}
