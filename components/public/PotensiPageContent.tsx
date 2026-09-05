'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ChevronRight,
  Briefcase,
  TrendingUp,
  AlertCircle,
  BadgeCheck,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';
import { PotensiModal } from './PotensiModal';
import { renderPotensiVectorIcon } from './potensi-icons';
import { ScrollReveal } from './ScrollReveal';

interface PotensiPageContentProps {
  potensi: PotensiWilayah[];
}

// Fallback data otentik jika database belum terisi atau kosong
const FALLBACK_POTENSI: PotensiWilayah[] = [
  {
    id: 'e5000000-0000-0000-0000-000000000001',
    judul: 'Pertanian & Tanaman Pangan',
    icon: 'sprout',
    deskripsi_singkat:
      'Lahan sawah dan tegalan produktif penghasil komoditas jagung, padi, serta kacang tanah sebagai penopang pangan utama dusun.',
    kegiatan_utama: 'Jagung, Padi, kacang tanah',
    keunggulan_hasil: 'lahan jagung luas',
    tantangan_kendala: 'Kekeringan banyak terjadi',
    sumber_data: 'Pak dukuh',
    urutan: 1,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000002',
    judul: 'Sentra UMKM Kripik Melinjo',
    icon: 'store',
    deskripsi_singkat:
      'Industri rumahan emping melinjo tradisional berkualitas tinggi yang digerakkan oleh para ibu rumah tangga warga padukuhan.',
    kegiatan_utama: 'Kripik Melinjo',
    keunggulan_hasil: 'produksi cepat',
    tantangan_kendala: 'Pohon melinjo di dusun sedikit',
    sumber_data: 'Pak dukuh',
    urutan: 2,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000003',
    judul: 'Kehidupan Keagamaan & Budaya',
    icon: 'landmark',
    deskripsi_singkat:
      'Tradisi dan kegiatan keagamaan Islam warisan Kyai Nur Jumeneng yang senantiasa guyub, khusyuk, dan terjaga kelestariannya.',
    kegiatan_utama: 'Pengajian Rutin, Tarian Badui',
    keunggulan_hasil: "Masih melestarikan tradisi adzan Jum'at 4 orang",
    tantangan_kendala: 'Belum ada kendala signifikan, antusiasme warga senantiasa terjaga',
    sumber_data: 'Pak dukuh',
    urutan: 3,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000004',
    judul: 'Peternakan Rakyat Mandiri',
    icon: 'beef',
    deskripsi_singkat:
      'Peternakan skala rumah tangga mandiri meliputi sapi, domba/kambing, dan ayam kampung yang terintegrasi pupuk kompos organik.',
    kegiatan_utama: 'Beternak Sapi, Kambing, Ayam',
    keunggulan_hasil: 'Kotoran Ternak Banyak sehingga untuk kompos mudah dilakukan',
    tantangan_kendala: 'Rumput bagus berkurang karena kekeringan',
    sumber_data: 'Pak dukuh',
    urutan: 4,
  },
];

type CategoryFilter = 'semua' | 'pertanian' | 'umkm' | 'keagamaan' | 'peternakan';

interface CategoryTab {
  key: CategoryFilter;
  label: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { key: 'semua', label: 'Semua Potensi' },
  { key: 'pertanian', label: 'Pertanian & Pangan' },
  { key: 'umkm', label: 'Sentra UMKM' },
  { key: 'keagamaan', label: 'Tradisi & Budaya' },
  { key: 'peternakan', label: 'Peternakan' },
];

function getSectorKey(item: PotensiWilayah): CategoryFilter {
  const text = `${item.judul} ${item.icon || ''} ${item.kegiatan_utama || ''}`.toLowerCase();
  if (text.includes('tani') || text.includes('padi') || text.includes('jagung') || text.includes('sprout')) {
    return 'pertanian';
  }
  if (text.includes('umkm') || text.includes('melinjo') || text.includes('usaha') || text.includes('store') || text.includes('kripik')) {
    return 'umkm';
  }
  if (text.includes('agama') || text.includes('ibadah') || text.includes('masjid') || text.includes('adzan') || text.includes('badui') || text.includes('landmark')) {
    return 'keagamaan';
  }
  if (text.includes('ternak') || text.includes('sapi') || text.includes('kambing') || text.includes('domba') || text.includes('beef')) {
    return 'peternakan';
  }
  return 'semua';
}

function getSectorBadges(sector: CategoryFilter) {
  switch (sector) {
    case 'pertanian':
      return {
        badge: 'Ketahanan Pangan Agraris',
        tagBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
        borderColor: 'hover:border-emerald-500/50',
        accentBg: 'bg-emerald-50',
      };
    case 'umkm':
      return {
        badge: 'Industri Kreatif Rumahan',
        tagBg: 'bg-amber-50 text-amber-900 border-amber-200/70',
        borderColor: 'hover:border-amber-500/50',
        accentBg: 'bg-amber-50',
      };
    case 'keagamaan':
      return {
        badge: 'Warisan Tradisi Luhur',
        tagBg: 'bg-teal-50 text-teal-800 border-teal-200/70',
        borderColor: 'hover:border-teal-500/50',
        accentBg: 'bg-teal-50',
      };
    case 'peternakan':
      return {
        badge: 'Sirkular Ekonomi Rakyat',
        tagBg: 'bg-orange-50 text-orange-900 border-orange-200/70',
        borderColor: 'hover:border-orange-500/50',
        accentBg: 'bg-orange-50',
      };
    default:
      return {
        badge: 'Potensi Unggulan',
        tagBg: 'bg-stone-50 text-stone-800 border-stone-200/70',
        borderColor: 'hover:border-emerald-500/50',
        accentBg: 'bg-stone-50',
      };
  }
}

export function PotensiPageContent({ potensi }: PotensiPageContentProps) {
  const [selectedPotensi, setSelectedPotensi] = useState<PotensiWilayah | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Pastikan data yang digunakan selalu lengkap
  const rawItems = potensi && potensi.length > 0 ? potensi : FALLBACK_POTENSI;

  const items = useMemo(() => {
    return rawItems.filter((item) => {
      const sector = getSectorKey(item);
      const matchesCategory = activeCategory === 'semua' || sector === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.judul.toLowerCase().includes(q) ||
        item.deskripsi_singkat.toLowerCase().includes(q) ||
        (item.kegiatan_utama && item.kegiatan_utama.toLowerCase().includes(q)) ||
        (item.keunggulan_hasil && item.keunggulan_hasil.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [rawItems, activeCategory, searchQuery]);

  const handleOpenDetail = (item: PotensiWilayah) => {
    setSelectedPotensi(item);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Header Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100/80 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="relative min-w-[240px] lg:min-w-[280px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari komoditas atau sektor..."
            aria-label="Cari potensi dusun"
            className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-emerald-600 focus:bg-white text-stone-900 placeholder:text-stone-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-stone-900 mb-1">
            Tidak Ada Data Potensi yang Cocok
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-4">
            Tidak ditemukan potensi yang sesuai dengan kata kunci pencarian atau filter kategori saat ini.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Tampilkan Semua Potensi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const sector = getSectorKey(item);
            const style = getSectorBadges(sector);

            return (
              <ScrollReveal key={item.id} delay={idx * 70} direction="up">
                <article
                  onClick={() => handleOpenDetail(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenDetail(item);
                    }
                  }}
                  className={`group bg-white rounded-xl border border-stone-200 shadow-xs ${style.borderColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-6 sm:p-8 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 text-left`}
                >
                  <div>
                    {/* Header Bar: Icon, Badge, Arrow Indicator */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-14 h-14 rounded-lg ${style.accentBg} border border-stone-200/60 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200`}
                        >
                          {renderPotensiVectorIcon(item.judul, item.icon, 'w-7 h-7')}
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${style.tagBg}`}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{style.badge}</span>
                          </span>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-900 transition-colors mt-1">
                            {item.judul}
                          </h3>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-md bg-stone-100 group-hover:bg-emerald-800 group-hover:text-white text-stone-500 flex items-center justify-center transition-colors shrink-0">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 line-clamp-3">
                      {item.deskripsi_singkat}
                    </p>

                    {/* 4 Structured Information Snippets */}
                    <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs">
                      {/* 1. Kegiatan Utama */}
                      <div className="p-3 rounded-lg bg-stone-50/80 border border-stone-100 flex items-start gap-2.5">
                        <Briefcase className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px] block">
                            Kegiatan Utama:
                          </span>
                          <p className="text-stone-800 font-semibold truncate">
                            {item.kegiatan_utama || 'Belum ada data'}
                          </p>
                        </div>
                      </div>

                      {/* 2. Keunggulan Hasil */}
                      <div className="p-3 rounded-lg bg-stone-50/80 border border-stone-100 flex items-start gap-2.5">
                        <TrendingUp className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px] block">
                            Potensi & Keunggulan:
                          </span>
                          <p className="text-stone-800 font-semibold truncate">
                            {item.keunggulan_hasil || 'Belum ada data'}
                          </p>
                        </div>
                      </div>

                      {/* 3. Tantangan & Kendala */}
                      <div className="p-3 rounded-lg bg-stone-50/80 border border-stone-100 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px] block">
                            Tantangan Lapangan:
                          </span>
                          <p className="text-stone-800 font-medium truncate">
                            {item.tantangan_kendala || 'Tidak ada kendala berarti'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Trigger */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                    <span className="inline-flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-emerald-700" />
                      <span>Sumber: {item.sumber_data || 'Pemerintah Dusun'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-800 group-hover:text-emerald-900 group-hover:translate-x-1 transition-transform">
                      <span>Rincian Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      )}

      {/* Modal Interaktif 4 Butir Spesifikasi */}
      <PotensiModal
        potensi={selectedPotensi}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
