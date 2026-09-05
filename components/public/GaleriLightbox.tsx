'use client';

import React, { useEffect, useCallback, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import { Galeri } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface GaleriLightboxProps {
  photos: Galeri[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function GaleriLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GaleriLightboxProps) {
  const [imageError, setImageError] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentPhoto = photos[currentIndex];
  const total = photos.length;

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setImageError(false);
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setImageError(false);
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    setTouchStartX(null);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/97 backdrop-blur-md select-none"
      style={{ height: '100dvh' }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Galeri Layar Penuh"
    >
      {/* 1. Header */}
      <div
        className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 inline-flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
          Foto {currentIndex + 1} dari {total}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup penampil galeri"
          className="p-2 sm:p-2.5 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-lg"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 2. Main Photo Area — flex-1 + min-h-0 supaya tidak overflow */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Prev */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-slate-900/80 hover:bg-emerald-800 text-white border border-slate-700/80 hover:border-emerald-600 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xl group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Gambar / Fallback */}
        <div className="w-full h-full flex items-center justify-center px-2 sm:px-16 md:px-20 py-2 sm:py-4">
          {!imageError ? (
            <img
              src={currentPhoto.foto_url}
              alt={currentPhoto.judul_kegiatan}
              loading="eager"
              decoding="async"
              onError={() => setImageError(true)}
              className="max-h-[75vh] sm:max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-lg sm:rounded-xl shadow-2xl border border-stone-800/60 select-none animate-in fade-in duration-200"
            />
          ) : (
            <div className="w-full max-w-sm h-52 sm:h-72 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3">
                <ImageIcon className="w-7 h-7" />
              </div>
              <p className="text-white font-semibold text-sm mb-1">{currentPhoto.judul_kegiatan}</p>
              <p className="text-xs text-slate-400">Gambar tidak tersedia</p>
            </div>
          )}
        </div>

        {/* Tombol Next */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Foto selanjutnya"
            className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-slate-900/80 hover:bg-emerald-800 text-white border border-slate-700/80 hover:border-emerald-600 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xl group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* 3. Footer Caption */}
      <div
        className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-950/90 border-t border-slate-900 shrink-0 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="font-heading text-sm sm:text-lg font-bold text-white line-clamp-1">
          {currentPhoto.judul_kegiatan}
        </h4>

        {currentPhoto.tanggal_kegiatan && (
          <p className="text-[11px] sm:text-sm text-emerald-400 font-medium inline-flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{formatTanggalIndonesia(currentPhoto.tanggal_kegiatan)}</span>
          </p>
        )}

        {total > 1 && (
          <p className="text-[11px] text-slate-500 mt-1.5 hidden sm:block">
            Gunakan{' '}
            <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">◀</kbd>{' '}
            <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">▶</kbd>{' '}
            untuk berpindah foto, atau{' '}
            <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">ESC</kbd>{' '}
            untuk keluar.
          </p>
        )}

        {total > 1 && (
          <p className="text-[11px] text-slate-500 mt-1 sm:hidden">
            Usap kiri/kanan untuk ganti foto
          </p>
        )}
      </div>
    </div>
  );
}
