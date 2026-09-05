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
      {/* Backdrop Modal Utama — Terpusat pada semua ukuran layar */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
        style={{ background: 'rgba(12, 10, 9, 0.85)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-potensi-title"
      >
        {/* Panel Modal */}
        <div
          className="relative w-full max-w-xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-text"
          style={{ maxHeight: 'min(92vh, 720px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Header Foto dengan Dukungan Lightbox Preview */}
          <div className="relative aspect-[16/9] w-full bg-stone-900 group shrink-0 overflow-hidden">
            <Image
              src={resolvedImage}
              alt={potensi.judul}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              quality={85}
              className="object-cover group-hover:scale-103 transition-transform duration-500 cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
            {/* Gradien gelap di bagian bawah foto untuk keterbacaan label */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

            {/* Tombol Tutup Mengambang di Sudut Kanan Atas */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup rincian potensi"
              className="absolute top-3 right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-lg cursor-pointer border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tombol Perbesar Foto di Sudut Kanan Bawah */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950/80 hover:bg-emerald-800 text-white text-xs font-semibold backdrop-blur-xs transition-all shadow-md cursor-pointer border border-white/10"
              aria-label="Buka foto dalam ukuran penuh"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Buka Foto Penuh</span>
            </button>

            {/* Badge Kategori di Sudut Kiri Bawah */}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-900/90 text-emerald-100 border border-emerald-700/50 backdrop-blur-xs">
                Potensi Dusun
              </span>
            </div>
          </div>

          {/* 2. Judul & Deskripsi Singkat */}
          <div className="px-5 pt-4 pb-2 sm:px-6 sm:pt-5 shrink-0 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-emerald-800">
                {renderPotensiVectorIcon(potensi.judul, potensi.icon, 'w-5 h-5')}
              </div>
              <div className="min-w-0">
                <h3
                  id="modal-potensi-title"
                  className="font-heading text-lg sm:text-xl font-bold text-stone-950 leading-tight"
                >
                  {potensi.judul}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed line-clamp-2">
                  {potensi.deskripsi_singkat}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Konten 4 Data Terstruktur (Scrollable) */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3 sm:px-6 sm:py-4 space-y-3">
            {/* 1. Kegiatan Utama */}
            <div className="rounded-lg p-3.5 sm:p-4 border border-emerald-100 bg-emerald-50/50">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-md bg-emerald-700 text-white shrink-0">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-emerald-950">
                  1. Kegiatan Utama
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed pl-7 sm:pl-8 font-medium">
                {potensi.kegiatan_utama || 'Belum ada data'}
              </p>
            </div>

            {/* 2. Potensi & Keunggulan Hasil */}
            <div className="rounded-lg p-3.5 sm:p-4 border border-amber-100 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-md bg-amber-600 text-white shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-950">
                  2. Potensi & Keunggulan
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed pl-7 sm:pl-8 font-medium">
                {potensi.keunggulan_hasil || 'Belum ada data'}
              </p>
            </div>

            {/* 3. Tantangan & Kendala */}
            <div className="rounded-lg p-3.5 sm:p-4 border border-rose-100 bg-rose-50/40">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-md bg-rose-600 text-white shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-rose-950">
                  3. Tantangan & Kendala
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed pl-7 sm:pl-8 font-medium">
                {potensi.tantangan_kendala || 'Tidak ada kendala berarti'}
              </p>
            </div>

            {/* 4. Sumber Data */}
            <div className="rounded-lg p-3.5 sm:p-4 border border-stone-200 bg-stone-50/80">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-md bg-stone-700 text-white shrink-0">
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

          {/* 4. Footer Modal */}
          <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-t border-stone-100 bg-stone-50/60 shrink-0 flex items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-stone-500" />
              <span>Lihat Foto Fullscreen</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 min-h-[38px] cursor-pointer shadow-2xs"
            >
              <Check className="w-4 h-4" />
              <span>Tutup Rincian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Layar Penuh saat foto potensi diperbesar */}
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
