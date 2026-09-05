'use client';

import React, { useEffect, useCallback } from 'react';
import {
  X,
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
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

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

  if (!isOpen || !potensi) return null;

  return (
    /* Backdrop — centered on semua ukuran layar */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(12,10,9,0.82)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-potensi-title"
    >
      {/* Modal Panel */}
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-stone-200 flex flex-col"
        style={{ maxHeight: 'min(90vh, 640px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-3 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-emerald-800">
              {renderPotensiVectorIcon(potensi.judul, potensi.icon, 'w-6 h-6')}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
                Potensi Dusun
              </span>
              <h3
                id="modal-potensi-title"
                className="font-heading text-lg sm:text-xl font-bold text-stone-950 leading-tight"
              >
                {potensi.judul}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deskripsi singkat */}
        <div className="px-5 pt-3 pb-1 sm:px-6 shrink-0">
          <p className="text-sm text-stone-600 leading-relaxed">{potensi.deskripsi_singkat}</p>
        </div>

        {/* Konten scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3 sm:px-6 sm:py-4 space-y-3">
          {/* 1. Kegiatan Utama */}
          <div className="rounded-lg p-4 border border-emerald-100 bg-emerald-50/60">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-md bg-emerald-600 text-white shrink-0">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-emerald-950">Kegiatan Utama</h4>
            </div>
            <p className="text-sm text-emerald-900 leading-relaxed pl-8">
              {potensi.kegiatan_utama || 'Belum ada data'}
            </p>
          </div>

          {/* 2. Potensi & Keunggulan */}
          <div className="rounded-lg p-4 border border-amber-100 bg-amber-50/60">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-md bg-amber-500 text-white shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-amber-950">Potensi & Keunggulan</h4>
            </div>
            <p className="text-sm text-amber-900 leading-relaxed pl-8">
              {potensi.keunggulan_hasil || 'Belum ada data'}
            </p>
          </div>

          {/* 3. Tantangan */}
          <div className="rounded-lg p-4 border border-rose-100 bg-rose-50/50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-md bg-rose-500 text-white shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-rose-950">Tantangan & Kendala</h4>
            </div>
            <p className="text-sm text-rose-900 leading-relaxed pl-8">
              {potensi.tantangan_kendala || 'Tidak ada kendala berarti'}
            </p>
          </div>

          {/* 4. Sumber Data */}
          <div className="rounded-lg p-4 border border-stone-200 bg-stone-50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-md bg-stone-700 text-white shrink-0">
                <BadgeCheck className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-stone-900">Sumber Data</h4>
            </div>
            <div className="pl-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-stone-700 font-medium">
                {potensi.sumber_data || 'Pemerintah Padukuhan Jumeneng Kidul'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 sm:px-6 sm:py-4 border-t border-stone-100 shrink-0 flex items-center justify-end gap-3">
          <p className="hidden sm:block text-xs text-stone-400 mr-auto">
            Tekan <kbd className="px-1 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-mono">ESC</kbd> atau klik di luar untuk menutup
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5 min-h-[40px] cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
