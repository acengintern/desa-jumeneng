'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Newspaper,
  Calendar,
  Search,
  Tag,
  ChevronRight,
  HeartPulse,
  Users,
  Shovel,
  Sparkles,
  X,
  Filter,
} from 'lucide-react';
import { Berita } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface BeritaPageContentProps {
  berita: Berita[];
}

export type BeritaCategory = 'semua' | 'kesehatan' | 'pemerintahan' | 'lingkungan' | 'warta-dusun';

interface CategoryTab {
  key: BeritaCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const BERITA_CATEGORIES: CategoryTab[] = [
  { key: 'semua', label: 'Semua', icon: Sparkles },
  { key: 'kesehatan', label: 'Kesehatan', icon: HeartPulse },
  { key: 'pemerintahan', label: 'Pemerintahan', icon: Users },
  { key: 'lingkungan', label: 'Lingkungan', icon: Shovel },
  { key: 'warta-dusun', label: 'Warta Dusun', icon: Newspaper },
];

/**
 * Mendeteksi kategori warta secara akurat dengan prioritas field kategori,
 * lalu kata kunci tematik yang mengevaluasi lingkungan sebelum kesehatan.
 */
export function getBeritaCategory(item: Berita): BeritaCategory {
  if (item.kategori) {
    const k = item.kategori.toLowerCase();
    if (k.includes('lingkungan') || k.includes('kebersihan') || k.includes('bersih')) return 'lingkungan';
    if (k.includes('kesehatan') || k.includes('posyandu')) return 'kesehatan';
    if (k.includes('pemerintahan') || k.includes('rt') || k.includes('rw') || k.includes('pamong')) return 'pemerintahan';
    return 'warta-dusun';
  }

  const text = `${item.judul} ${item.ringkasan || ''} ${item.konten || ''}`.toLowerCase();
  if (
    text.includes('kerja bakti') ||
    text.includes('lingkungan') ||
    text.includes('kebersihan') ||
    text.includes('gotong royong') ||
    text.includes('selokan') ||
    text.includes('sampah')
  ) {
    return 'lingkungan';
  }
  if (
    text.includes('posyandu') ||
    text.includes('kesehatan') ||
    text.includes('lansia') ||
    text.includes('balita') ||
    text.includes('imunisasi') ||
    text.includes('gizi')
  ) {
    return 'kesehatan';
  }
  if (
    text.includes('rapat') ||
    text.includes('koordinasi') ||
    text.includes('pemerintahan') ||
    text.includes('pamong') ||
    text.includes('rt') ||
    text.includes('rw') ||
    text.includes('musyawarah')
  ) {
    return 'pemerintahan';
  }
  return 'warta-dusun';
}

/**
 * Styling dan metadata visual untuk kartu berita fallback
 */
export function getBeritaVisuals(category: BeritaCategory) {
  switch (category) {
    case 'kesehatan':
      return {
        label: 'Kesehatan',
        icon: HeartPulse,
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200/80',
        gradient: 'from-rose-500/10 via-rose-50 to-emerald-50/20',
        iconBg: 'bg-rose-100 text-rose-800',
        borderColor: 'hover:border-rose-400',
      };
    case 'pemerintahan':
      return {
        label: 'Pemerintahan',
        icon: Users,
        badgeColor: 'bg-blue-50 text-blue-800 border-blue-200/80',
        gradient: 'from-blue-500/10 via-blue-50 to-emerald-50/20',
        iconBg: 'bg-blue-100 text-blue-800',
        borderColor: 'hover:border-blue-400',
      };
    case 'lingkungan':
      return {
        label: 'Lingkungan',
        icon: Shovel,
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
        gradient: 'from-emerald-500/10 via-emerald-50 to-amber-50/20',
        iconBg: 'bg-emerald-100 text-emerald-800',
        borderColor: 'hover:border-emerald-400',
      };
    case 'warta-dusun':
    default:
      return {
        label: 'Warta Dusun',
        icon: Newspaper,
        badgeColor: 'bg-amber-50 text-amber-900 border-amber-200/80',
        gradient: 'from-amber-500/10 via-amber-50 to-emerald-50/20',
        iconBg: 'bg-amber-100 text-amber-900',
        borderColor: 'hover:border-amber-400',
      };
  }
}

export function BeritaPageContent({ berita }: BeritaPageContentProps) {
  const [activeCategory, setActiveCategory] = useState<BeritaCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Hitung jumlah artikel per kategori
  const categoryCounts = useMemo(() => {
    const counts: Record<BeritaCategory, number> = {
      semua: berita.length,
      kesehatan: 0,
      pemerintahan: 0,
      lingkungan: 0,
      'warta-dusun': 0,
    };

    berita.forEach((item) => {
      const cat = getBeritaCategory(item);
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
  }, [berita]);

  // Filter berita berdasarkan kategori dan search query
  const filteredBerita = useMemo(() => {
    return berita.filter((item) => {
      // Filter kategori
      if (activeCategory !== 'semua') {
        const itemCat = getBeritaCategory(item);
        if (itemCat !== activeCategory) return false;
      }

      // Filter pencarian teks
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inJudul = item.judul.toLowerCase().includes(q);
        const inRingkasan = item.ringkasan.toLowerCase().includes(q);
        const inKonten = item.konten ? item.konten.toLowerCase().includes(q) : false;
        if (!inJudul && !inRingkasan && !inKonten) return false;
      }

      return true;
    });
  }, [berita, activeCategory, searchQuery]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleResetFilters = () => {
    setActiveCategory('semua');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. KONTROL FILTER & PENCARIAN */}
      <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs p-4 sm:p-6 space-y-4">
        {/* Baris Atas: Input Pencarian & Counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari warta kegiatan, posyandu, kerja bakti..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm text-stone-900 bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus kata kunci pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-md hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Indikator Jumlah Hasil */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-stone-500 font-medium">
            <span>
              Menampilkan <strong className="text-stone-900 font-bold">{filteredBerita.length}</strong> dari{' '}
              {berita.length} warta
            </span>
          </div>
        </div>

        {/* Baris Bawah: Tabs Kategori */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-400 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </div>

          {BERITA_CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.key;
            const IconComponent = tab.icon;
            const count = categoryCounts[tab.key];

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/70'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                    isActive ? 'bg-emerald-900 text-emerald-100' : 'bg-stone-200/70 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GRID DAFTAR WARTA KEGIATAN */}
      {filteredBerita.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBerita.map((item) => {
            const category = getBeritaCategory(item);
            const visuals = getBeritaVisuals(category);
            const VisualIcon = visuals.icon;
            const hasValidImage = item.gambar_url && !failedImages[item.id];
            const detailUrl = `/berita/${item.slug}`;

            return (
              <article
                key={item.id}
                className={`group rounded-xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md ${visuals.borderColor} hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden h-full`}
              >
                {/* Thumbnail Gambar Berita: Klik langsung mengarah ke detail artikel */}
                <Link
                  href={detailUrl}
                  className="relative h-52 w-full overflow-hidden bg-stone-100 shrink-0 block"
                  aria-label={`Buka berita: ${item.judul}`}
                >
                  {hasValidImage ? (
                    <Image
                      src={item.gambar_url!}
                      alt={item.gambar_alt || item.judul}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                      quality={75}
                      onError={() => handleImageError(item.id)}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${visuals.gradient} flex flex-col items-center justify-center p-6 border-b border-stone-100`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl ${visuals.iconBg} flex items-center justify-center mb-2.5 shadow-inner group-hover:scale-110 transition-transform duration-300`}
                      >
                        <VisualIcon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-stone-500 tracking-wide">
                        Dokumentasi Resmi Dusun
                      </span>
                    </div>
                  )}

                  {/* Kategori Badge Floating */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-2xs backdrop-blur-md bg-white/95 ${visuals.badgeColor}`}
                    >
                      <Tag className="w-3 h-3" />
                      {item.kategori || visuals.label}
                    </span>
                  </div>
                </Link>

                {/* Body Konten Kartu */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Tanggal Publikasi Berformat Indonesia */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-3">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      <time dateTime={item.tanggal_publikasi}>
                        {formatTanggalIndonesia(item.tanggal_publikasi)}
                      </time>
                      <span className="text-stone-300">·</span>
                      <span className="text-emerald-800 font-semibold">
                        {item.kategori || visuals.label}
                      </span>
                    </div>

                    {/* Judul Berita: Klik langsung mengarah ke detail artikel */}
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-stone-950 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-2.5 leading-snug">
                      <Link href={detailUrl} className="hover:underline">
                        {item.judul}
                      </Link>
                    </h2>

                    {/* Ringkasan Cuplikan */}
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6">
                      {item.ringkasan}
                    </p>
                  </div>

                  {/* Footer Aksi Kartu: Tombol Baca Selengkapnya mengarah ke detail artikel */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 group/btn transition-colors"
                    >
                      <span>Baca Selengkapnya</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[11px] text-stone-400 font-medium">Jumeneng Kidul</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Newspaper className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-lg text-stone-900 mb-1.5">
            Tidak Ada Warta yang Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
            Tidak ada publikasi warta yang sesuai dengan kata kunci{' '}
            {searchQuery ? `"${searchQuery}"` : ''}{' '}
            {activeCategory !== 'semua' ? `pada kategori ${activeCategory}` : ''}. Silakan atur ulang filter pencarian Anda.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg min-h-[44px] bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tampilkan Semua Warta</span>
          </button>
        </div>
      )}
    </div>
  );
}
