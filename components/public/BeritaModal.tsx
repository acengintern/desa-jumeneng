'use client';

import React, { useEffect, useCallback, useState } from 'react';
import {
  X,
  Calendar,
  Newspaper,
  Check,
  Building2,
  Share2,
  Clock,
  UserCheck,
} from 'lucide-react';
import { Berita } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface BeritaModalProps {
  berita: Berita | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BeritaModal({ berita, isOpen, onClose }: BeritaModalProps) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tutup dengan tombol ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    setImageError(false);
    setCopied(false);
  }, [berita]);

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

  if (!isOpen || !berita) return null;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: berita.judul,
          text: berita.ringkasan,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${berita.judul}\n\n${berita.ringkasan}\n\nSumber: Portal Resmi Padukuhan Jumeneng Kidul`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // User cancelled share or clipboard error
    }
  };

  // Membagi paragraf konten berdasarkan baris baru
  const paragraphs = berita.konten
    ? berita.konten.split('\n\n').filter((p) => p.trim().length > 0)
    : [berita.ringkasan];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-berita-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-emerald-100 overflow-hidden transform transition-all duration-300 max-h-[88vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull-Down Handle Indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="px-5 py-3.5 sm:p-7 pb-3 sm:pb-5 flex items-start justify-between gap-3 border-b border-slate-100 shrink-0">
          <div className="flex-1 pr-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2.5">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                <Newspaper className="w-3 h-3 text-emerald-700" />
                Warta Warga
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                {formatTanggalIndonesia(berita.tanggal_publikasi)}
              </span>
            </div>

            <h3
              id="modal-berita-title"
              className="font-heading text-base sm:text-2xl lg:text-3xl font-extrabold text-emerald-950 leading-snug"
            >
              {berita.judul}
            </h3>
          </div>

          {/* Tombol Tutup Silang */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela artikel berita"
            className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-600 shrink-0 border border-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-4 sm:p-7 space-y-4 sm:space-y-5 overflow-y-auto modal-scroll flex-1">
          {/* Cover Image Banner jika tersedia */}
          {berita.gambar_url && !imageError ? (
            <div className="relative w-full h-44 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
              <img
                src={berita.gambar_url}
                alt={berita.judul}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-100 flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Publikasi Resmi Padukuhan
                </p>
                <p className="text-xs text-slate-600">
                  Dokumentasi dan informasi resmi kegiatan masyarakat Padukuhan Jumeneng Kidul.
                </p>
              </div>
            </div>
          )}

          {/* Ringkasan Berita Callout Box */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950">
            <p className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-emerald-800 mb-1">
              Ringkasan Kegiatan
            </p>
            <p className="text-xs sm:text-base font-medium leading-relaxed">
              {berita.ringkasan}
            </p>
          </div>

          {/* Konten Lengkap Paragraf */}
          <div className="space-y-3 sm:space-y-4 pt-1">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-slate-700 leading-relaxed text-xs sm:text-base text-left sm:text-justify"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Meta Informasi & Sumber */}
          <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Sumber: Tim Informasi & Humas Padukuhan Jumeneng Kidul</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Kalurahan Sumberadi, Mlati, Sleman</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-row items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 shadow-2xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span>{copied ? 'Tersalin!' : 'Bagikan'}</span>
          </button>

          <span className="hidden sm:inline text-xs text-slate-400">
            Tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">ESC</kbd> untuk keluar
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-initial sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Tutup Berita</span>
          </button>
        </div>
      </div>
    </div>
  );
}
