'use client';

import React, { useEffect, useCallback } from 'react';
import {
  X,
  Sparkles,
  Briefcase,
  TrendingUp,
  AlertCircle,
  BadgeCheck,
  Check,
} from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';
import { renderPotensiVectorIcon } from './potensi-icons';

interface PotensiModalProps {
  potensi: PotensiWilayah | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PotensiModal({ potensi, isOpen, onClose }: PotensiModalProps) {
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

  if (!isOpen || !potensi) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-potensi-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100/90 overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 sm:pb-6 flex items-start justify-between gap-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-xs shrink-0">
              {renderPotensiVectorIcon(potensi.judul, potensi.icon, 'w-8 h-8 sm:w-10 sm:h-10')}
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1.5">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Potensi Wilayah Dusun
              </span>
              <h3
                id="modal-potensi-title"
                className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-950"
              >
                {potensi.judul}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {potensi.deskripsi_singkat}
              </p>
            </div>
          </div>

          {/* Tombol Tutup */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela detail potensi"
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-600 shrink-0 border border-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: 4 Data Terstruktur Sesuai Spesifikasi */}
        <div className="p-6 sm:p-8 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* 1. Kegiatan Utama */}
          <div className="bg-emerald-50/60 rounded-2xl p-4 sm:p-5 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-2xs">
                <Briefcase className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-emerald-950">
                1. Kegiatan Utama
              </h4>
            </div>
            <p className="text-sm sm:text-base text-emerald-900 font-medium pl-8 leading-relaxed">
              {potensi.kegiatan_utama || 'Belum ada data'}
            </p>
          </div>

          {/* 2. Potensi & Keunggulan */}
          <div className="bg-amber-50/60 rounded-2xl p-4 sm:p-5 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-amber-950">
                2. Potensi & Keunggulan
              </h4>
            </div>
            <p className="text-sm sm:text-base text-amber-900 font-medium pl-8 leading-relaxed">
              {potensi.keunggulan_hasil || 'Belum ada data'}
            </p>
          </div>

          {/* 3. Tantangan & Kendala */}
          <div className="bg-rose-50/50 rounded-2xl p-4 sm:p-5 border border-rose-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-rose-500 text-white shadow-2xs">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-rose-950">
                3. Tantangan & Kendala
              </h4>
            </div>
            <p className="text-sm sm:text-base text-rose-900 font-medium pl-8 leading-relaxed">
              {potensi.tantangan_kendala || 'Tidak ada kendala berarti'}
            </p>
          </div>

          {/* 4. Sumber Data */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-slate-700 text-white shadow-2xs">
                <BadgeCheck className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                4. Sumber Data
              </h4>
            </div>
            <div className="pl-8 flex items-center gap-2">
              <span className="text-sm sm:text-base text-slate-700 font-semibold">
                {potensi.sumber_data || 'Pemerintah Padukuhan Jumeneng Kidul'}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">ESC</kbd> atau klik di luar untuk menutup
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Tutup Rincian</span>
          </button>
        </div>
      </div>
    </div>
  );
}
