'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Briefcase,
  TrendingUp,
  AlertCircle,
  BadgeCheck,
  Search,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';
import { PotensiModal } from './PotensiModal';
import { ScrollReveal } from './ScrollReveal';

interface PotensiPageContentProps {
  potensi: PotensiWilayah[];
}

const FALLBACK_POTENSI: PotensiWilayah[] = [
  {
    id: 'e5000000-0000-0000-0000-000000000001',
    judul: 'Pertanian & Tanaman Pangan',
    icon: 'sprout',
    deskripsi_singkat:
      'Lahan sawah dan tegalan produktif penghasil komoditas jagung, padi, serta kacang tanah sebagai penopang pangan utama dusun.',
    kegiatan_utama: 'Jagung, Padi, Kacang Tanah',
    keunggulan_hasil: 'Lahan jagung luas dan kesuburan tanah terjaga',
    tantangan_kendala: 'Kekeringan pada puncak musim kemarau',
    sumber_data: 'Pak Dukuh',
    gambar_url:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    urutan: 1,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000002',
    judul: 'Sentra UMKM Kripik Melinjo',
    icon: 'store',
    deskripsi_singkat:
      'Industri rumahan emping melinjo tradisional berkualitas tinggi yang digerakkan oleh para perajin dan ibu rumah tangga warga padukuhan.',
    kegiatan_utama: 'Kripik & Emping Melinjo Tradisional',
    keunggulan_hasil: 'Produksi terampil, rasa gurih renyah tanpa bahan pengawet',
    tantangan_kendala: 'Keterbatasan pasokan bahan baku melinjo lokal',
    sumber_data: 'Pak Dukuh',
    gambar_url:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    urutan: 2,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000003',
    judul: 'Kehidupan Keagamaan & Budaya',
    icon: 'landmark',
    deskripsi_singkat:
      'Tradisi dan kegiatan keagamaan Islam warisan Kyai Nur Jumeneng yang senantiasa guyub, khusyuk, serta kesenian tari Badui yang lestari.',
    kegiatan_utama: 'Pengajian Rutin, Seni Tari Badui, Adzan 4 Muadzin',
    keunggulan_hasil: "Pelestarian tradisi adzan Jum'at 4 orang dan kerukunan warga",
    tantangan_kendala: 'Regenerasi generasi penerus pelaku seni tradisional',
    sumber_data: 'Pak Dukuh',
    gambar_url:
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
    urutan: 3,
  },
  {
    id: 'e5000000-0000-0000-0000-000000000004',
    judul: 'Peternakan Rakyat Mandiri',
    icon: 'beef',
    deskripsi_singkat:
      'Peternakan skala rumah tangga mandiri meliputi sapi, kambing/domba, dan unggas kampung yang terintegrasi pembuatan pupuk kandang kompos.',
    kegiatan_utama: 'Budidaya Sapi, Kambing, dan Ayam Kampung',
    keunggulan_hasil: 'Kotoran ternak diolah mandiri menjadi pupuk organik untuk sawah',
    tantangan_kendala: 'Ketersediaan hijauan pakan ternak segar di musim kemarau',
    sumber_data: 'Pak Dukuh',
    gambar_url:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    urutan: 4,
  },
];

const POTENSI_IMAGES: Record<string, string> = {
  'Pertanian & Tanaman Pangan':
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  'Sentra UMKM Kripik Melinjo':
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  'UMKM Kripik Melinjo':
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  'Kehidupan Keagamaan & Budaya':
    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
  'Keagamaan & Tradisi Budaya':
    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
  'Peternakan Rakyat Mandiri':
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
  'Peternakan Rakyat':
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
};

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

function getSectorMeta(sector: CategoryFilter) {
  switch (sector) {
    case 'pertanian':
      return {
        label: 'Pertanian & Ketahanan Pangan',
        badgeClass: 'bg-emerald-100/90 text-emerald-900 border-emerald-300/80',
      };
    case 'umkm':
      return {
        label: 'Sentra Industri Rumahan',
        badgeClass: 'bg-amber-100/90 text-amber-950 border-amber-300/80',
      };
    case 'keagamaan':
      return {
        label: 'Tradisi & Keagamaan Luhur',
        badgeClass: 'bg-teal-100/90 text-teal-950 border-teal-300/80',
      };
    case 'peternakan':
      return {
        label: 'Peternakan Mandiri Warga',
        badgeClass: 'bg-stone-200/90 text-stone-900 border-stone-300/80',
      };
    default:
      return {
        label: 'Sektor Unggulan Dusun',
        badgeClass: 'bg-emerald-100/90 text-emerald-900 border-emerald-300/80',
      };
  }
}

export function PotensiPageContent({ potensi }: PotensiPageContentProps) {
  const [selectedPotensi, setSelectedPotensi] = useState<PotensiWilayah | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('semua');
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="bg-white rounded-lg p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
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
            className="w-full pl-9.5 pr-14 py-2.5 text-base sm:text-sm min-h-[44px] rounded-lg bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-stone-900 placeholder:text-stone-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800 font-medium px-1.5 py-0.5 rounded cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-lg border border-stone-200 p-12 text-center">
          <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-stone-900 mb-1">
            Tidak Ada Data Potensi yang Cocok
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-4">
            Tidak ditemukan potensi yang sesuai dengan kata kunci pencarian atau filter kategori saat ini.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer min-h-[40px]"
          >
            Tampilkan Semua Potensi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const sector = getSectorKey(item);
            const meta = getSectorMeta(sector);
            const fallbackImage =
              POTENSI_IMAGES[item.judul] ||
              'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
            const imageUrl = item.gambar_url || fallbackImage;

            return (
              <ScrollReveal key={item.id} delay={idx * 60} direction="up">
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
                  className="group bg-white rounded-lg border border-stone-200 shadow-xs hover:border-emerald-700/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 text-left"
                >
                  <div>
                    {/* Image Header with Photography */}
                    <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.judul}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                        quality={75}
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Corner Category Label */}
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md border backdrop-blur-xs ${meta.badgeClass}`}
                        >
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 pb-2">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                          {item.judul}
                        </h3>
                        <div className="w-7 h-7 rounded-md bg-stone-100 group-hover:bg-emerald-800 group-hover:text-white text-stone-500 flex items-center justify-center transition-colors shrink-0 mt-0.5">
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 line-clamp-2">
                        {item.deskripsi_singkat}
                      </p>

                      {/* 3 Structured Information Snippets */}
                      <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
                        <div className="flex items-start gap-2 text-stone-700">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-stone-900">Kegiatan: </span>
                            <span>{item.kegiatan_utama || 'Belum ada data'}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-stone-700">
                          <TrendingUp className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-stone-900">Keunggulan: </span>
                            <span>{item.keunggulan_hasil || 'Belum ada data'}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-stone-700">
                          <AlertCircle className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-stone-900">Tantangan: </span>
                            <span>{item.tantangan_kendala || 'Tidak ada kendala berarti'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="px-5 sm:px-6 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-600 mt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-stone-500">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Sumber: {item.sumber_data || 'Pemerintah Dusun'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-800 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-transform font-bold">
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

