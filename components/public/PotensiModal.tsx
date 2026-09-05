'use client';

import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Briefcase,
  TrendingUp,
  AlertCircle,
  BadgeCheck,
  Check,
  Maximize2,
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

import { PotensiWilayah } from '@/lib/types';
import { renderPotensiVectorIcon } from './potensi-icons';

const DEFAULT_POTENSI_IMAGES: Record<string, string> = {
  'Pertanian & Tanaman Pangan':
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  'Pertanian':
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  'Sentra UMKM Kripik Melinjo':
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
  'UMKM Kripik Melinjo':
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
  'UMKM Rumahan':
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
  'Kehidupan Keagamaan & Budaya':
    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
  'Keagamaan & Tradisi Budaya':
    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
  'Kehidupan Keagamaan':
    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
  'Peternakan Rakyat Mandiri':
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
  'Peternakan Rakyat':
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
  'Peternakan':
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
};

interface PotensiModalProps {
  potensi: PotensiWilayah | null;
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
}

export function PotensiModal({ potensi, isOpen, onClose, imageUrl }: PotensiModalProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Tutup dengan tombol ESC (hanya jika lightbox tidak sedang terbuka)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLightboxOpen) {
        onClose();
      }
    },
    [onClose, isLightboxOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsLightboxOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !potensi) return null;

  const resolvedImage =
    imageUrl ||
    potensi.gambar_url ||
    DEFAULT_POTENSI_IMAGES[potensi.judul] ||
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80';

  return (
    <>
      {/* Backdrop Modal Utama — Overflow-y-auto memastikan seluruh modal dapat di-scroll di layar pendek/mobile */}
      <div
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
        style={{
          background: 'rgba(12, 10, 9, 0.85)',
          backdropFilter: 'blur(6px)',
          touchAction: 'pan-y',
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-potensi-title"
      >
        {/* Panel Modal — Card terpusat dengan scroll internal yang halus di semua area */}
        <div
          className="relative w-full max-w-xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 select-text my-auto"
          style={{
            maxHeight: 'min(92vh, 760px)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar Lengkap yang Menempel (Sticky) agar Tombol Tutup Selalu Terjangkau */}
          <div className="sticky top-0 z-20 px-4 py-3 sm:px-6 sm:py-3.5 bg-white/95 backdrop-blur-md border-b border-stone-200 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-emerald-800">
                {renderPotensiVectorIcon(potensi.judul, potensi.icon, 'w-4 h-4')}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Potensi Dusun
                </span>
                <h3
                  id="modal-potensi-title"
                  className="font-heading text-sm sm:text-base font-bold text-stone-950 truncate"
                >
                  {potensi.judul}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup jendela rincian"
              className="p-1.5 sm:p-2 rounded-lg text-stone-500 hover:text-stone-950 hover:bg-stone-100 active:bg-stone-200 transition-colors shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer border border-stone-200/80"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Area Konten Utama yang Dapat Di-scroll Secara Penuh (Touch & Wheel lancar di 100% area) */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain modal-scroll"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
          >
            {/* Foto Dokumentasi Unggulan (Dapat diklik untuk Zoom Layar Penuh) */}
            <div className="relative aspect-[16/9] w-full bg-stone-900 group shrink-0 overflow-hidden cursor-pointer">
              <Image
                src={resolvedImage}
                alt={potensi.judul}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                quality={85}
                className="object-cover group-hover:scale-103 transition-transform duration-500"
                onClick={() => setIsLightboxOpen(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Tombol Perbesar Foto di Atas Gambar */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950/80 hover:bg-emerald-800 text-white text-xs font-semibold backdrop-blur-xs transition-all shadow-md cursor-pointer border border-white/15"
                aria-label="Buka foto dalam ukuran penuh"
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Perbesar Foto</span>
              </button>
            </div>

            {/* Deskripsi Pengantar */}
            <div className="px-5 pt-4 pb-2 sm:px-6 sm:pt-5">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {potensi.deskripsi_singkat}
              </p>
            </div>

            {/* 4 Data Terstruktur Rincian Potensi */}
            <div className="px-5 py-3 sm:px-6 sm:py-4 space-y-3">
              {/* 1. Kegiatan Utama */}
              <div className="rounded-lg p-3.5 sm:p-4 border border-emerald-100 bg-emerald-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md bg-emerald-700 text-white shrink-0 shadow-2xs">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-emerald-950">
                    1. Kegiatan Utama
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed pl-7 sm:pl-8 font-medium">
                  {potensi.kegiatan_utama || 'Belum ada data kegiatan utama.'}
                </p>
              </div>

              {/* 2. Potensi & Keunggulan Hasil */}
              <div className="rounded-lg p-3.5 sm:p-4 border border-amber-100 bg-amber-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md bg-amber-600 text-white shrink-0 shadow-2xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-950">
                    2. Potensi & Keunggulan
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed pl-7 sm:pl-8 font-medium">
                  {potensi.keunggulan_hasil || 'Belum ada data keunggulan hasil.'}
                </p>
              </div>

              {/* 3. Tantangan & Kendala */}
              <div className="rounded-lg p-3.5 sm:p-4 border border-rose-100 bg-rose-50/40">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md bg-rose-600 text-white shrink-0 shadow-2xs">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-rose-950">
                    3. Tantangan & Kendala
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed pl-7 sm:pl-8 font-medium">
                  {potensi.tantangan_kendala || 'Tidak ada kendala berarti.'}
                </p>
              </div>

              {/* 4. Sumber Data */}
              <div className="rounded-lg p-3.5 sm:p-4 border border-stone-200 bg-stone-50/80">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md bg-stone-700 text-white shrink-0 shadow-2xs">
                    <BadgeCheck className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-stone-900">
                    4. Sumber Data
                  </h4>
                </div>
                <div className="pl-7 sm:pl-8 flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm text-stone-700 font-medium">
                    {potensi.sumber_data || 'Pemerintah Padukuhan Jumeneng Kidul'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Terverifikasi
                  </span>
                </div>
              </div>
            </div>

            {/* Footer di Bagian Akhir Konten Scroll */}
            <div className="px-5 py-4 sm:px-6 sm:py-4 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Buka Foto Layar Penuh</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 min-h-[40px] cursor-pointer shadow-2xs"
              >
                <Check className="w-4 h-4" />
                <span>Tutup Rincian</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Layar Penuh saat Foto Potensi Diperbesar */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={[
          {
            src: resolvedImage,
            alt: potensi.judul,
            title: potensi.judul,
            description: potensi.deskripsi_singkat,
          },
        ]}
        plugins={[Zoom, Captions]}
        captions={{
          showToggle: false,
          descriptionTextAlign: 'center',
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(12, 10, 9, 0.96)',
            backdropFilter: 'blur(8px)',
          },
          captionsTitle: {
            textAlign: 'center',
          },
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
        }}
        animation={{
          fade: 200,
        }}
      />
    </>
  );
}
