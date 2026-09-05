'use client';

import React, { useEffect, useCallback, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Image as ImageIcon,
  Sparkles,
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

  // Keyboard navigation & ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
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
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950/95 backdrop-blur-md select-none transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Galeri Layar Penuh"
    >
      {/* 1. Header Toolbar */}
      <div
        className="flex items-center justify-between p-4 sm:p-6 shrink-0 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 backdrop-blur-md flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Foto {currentIndex + 1} dari {total}
            </span>
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup penampil galeri"
          className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* 2. Main Photo Showcase with Navigation Controls */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Navigasi Kiri (Prev) */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-emerald-800 text-white border border-slate-700/80 hover:border-emerald-600 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xl group"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Gambar Utama / Fallback */}
        <div className="relative max-w-5xl max-h-[68vh] sm:max-h-[72vh] w-full flex items-center justify-center">
          {!imageError ? (
            <img
              src={currentPhoto.foto_url}
              alt={currentPhoto.judul_kegiatan}
              onError={() => setImageError(true)}
              className="max-h-[68vh] sm:max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl border border-slate-800/80 select-none animate-in fade-in duration-200"
            />
          ) : (
            <div className="w-full max-w-lg h-72 sm:h-96 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3">
                <ImageIcon className="w-8 h-8" />
              </div>
              <p className="text-white font-semibold text-lg mb-1">
                {currentPhoto.judul_kegiatan}
              </p>
              <p className="text-xs text-slate-400">
                Gambar pratinjau sedang dimuat atau berada dalam penyimpanan arsip lokal.
              </p>
            </div>
          )}
        </div>

        {/* Tombol Navigasi Kanan (Next) */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Foto selanjutnya"
            className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-emerald-800 text-white border border-slate-700/80 hover:border-emerald-600 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xl group"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* 3. Footer Caption Bar */}
      <div
        className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-900 shrink-0 z-20 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl mx-auto">
          <h4 className="font-heading text-lg sm:text-2xl font-bold text-white mb-1">
            {currentPhoto.judul_kegiatan}
          </h4>

          {currentPhoto.tanggal_kegiatan && (
            <p className="text-xs sm:text-sm text-emerald-400 font-medium inline-flex items-center gap-1.5 justify-center">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatTanggalIndonesia(currentPhoto.tanggal_kegiatan)}</span>
            </p>
          )}

          <p className="text-[11px] text-slate-500 mt-2 hidden sm:block">
            Gunakan tombol panah keyboard <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">◀</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">▶</kbd> untuk berpindah foto, atau <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">ESC</kbd> untuk keluar.
          </p>
        </div>
      </div>
    </div>
  );
}
