'use client';

import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Users,
  Shovel,
  Tag,
  ChevronRight,
} from 'lucide-react';
import { Berita } from '@/lib/types';
import { BeritaModal } from './BeritaModal';
import { ScrollReveal } from './ScrollReveal';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface BeritaSectionProps {
  berita?: Berita[];
}

const DEFAULT_BERITA: Berita[] = [
  {
    id: 'f6000000-0000-0000-0000-000000000001',
    judul: 'Kegiatan Posyandu Balita & Lansia',
    slug: 'kegiatan-posyandu-balita-lansia',
    ringkasan:
      'Pelayanan kesehatan rutin bagi balita dan lansia yang diselenggarakan oleh kader kesehatan setempat.',
    konten:
      'Pelayanan kesehatan rutin bagi balita dan lansia diselenggarakan secara konsisten oleh para kader kesehatan Padukuhan Jumeneng Kidul. Kegiatan ini mencakup penimbangan berat badan balita, imunisasi dasar, penyuluhan gizi seimbang, serta pemeriksaan tensi darah dan kesehatan umum bagi para lansia.',
    gambar_url:
      'https://info-jumenengkidul.site.je/uploads/berita/img_20260903_090114_d4968679.jpg',
    tanggal_publikasi: '2026-07-20',
    status: 'published',
  },
  {
    id: 'f6000000-0000-0000-0000-000000000002',
    judul: 'Rapat Koordinasi Pengurus RT/RW',
    slug: 'rapat-koordinasi-pengurus-rt-rw',
    ringkasan:
      'Pertemuan rutin pengurus wilayah membahas program kerja dan kegiatan warga untuk periode mendatang.',
    konten:
      'Pertemuan rutin pengurus wilayah RT 01 s/d RT 09 bersama para ketua RW (RW 19, RW 20, RW 21, dan RW 39) serta Kepala Dukuh Bapak Edhy Purwanta bertempat di Balai Dusun. Agenda rapat mencakup evaluasi kegiatan gotong royong, pemeliharaan sarana umum, dan persiapan peringatan hari besar kemasyarakatan.',
    gambar_url: null,
    tanggal_publikasi: '2026-08-01',
    status: 'published',
  },
  {
    id: 'f6000000-0000-0000-0000-000000000003',
    judul: 'Kerja Bakti Bersih Lingkungan Dusun',
    slug: 'kerja-bakti-bersih-lingkungan-dusun',
    ringkasan:
      'Warga bergotong royong membersihkan lingkungan dusun dalam rangka menjaga kebersihan dan kesehatan bersama.',
    konten:
      'Seluruh elemen warga Padukuhan Jumeneng Kidul melaksanakan agenda kerja bakti massal membersihkan selokan, merapikan bahu jalan dusun, serta membersihkan area fasilitas umum. Tradisi gotong royong ini terus dipelihara sebagai wujud kebersamaan dan kepedulian terhadap kelestarian lingkungan.',
    gambar_url: null,
    tanggal_publikasi: '2026-08-10',
    status: 'published',
  },
];

/**
 * Mendapatkan ikon dan badge tematik berdasarkan judul berita
 */
function getBeritaThematic(judul: string) {
  const lower = judul.toLowerCase();
  if (lower.includes('posyandu') || lower.includes('kesehatan')) {
    return {
      kategori: 'Kesehatan',
      icon: HeartPulse,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      gradient: 'from-rose-500/10 via-rose-50 to-emerald-50/20',
      iconBg: 'bg-rose-100 text-rose-700',
    };
  }
  if (lower.includes('rapat') || lower.includes('koordinasi') || lower.includes('pemerintahan')) {
    return {
      kategori: 'Pemerintahan',
      icon: Users,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      gradient: 'from-blue-500/10 via-blue-50 to-emerald-50/20',
      iconBg: 'bg-blue-100 text-blue-700',
    };
  }
  if (lower.includes('kerja bakti') || lower.includes('lingkungan') || lower.includes('bersih')) {
    return {
      kategori: 'Lingkungan',
      icon: Shovel,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      gradient: 'from-emerald-500/10 via-emerald-50 to-amber-50/20',
      iconBg: 'bg-emerald-100 text-emerald-700',
    };
  }
  return {
    kategori: 'Warta Dusun',
    icon: Newspaper,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    gradient: 'from-amber-500/10 via-amber-50 to-emerald-50/20',
    iconBg: 'bg-amber-100 text-amber-700',
  };
}

export function BeritaSection({ berita = [] }: BeritaSectionProps) {
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const items = (berita && berita.length > 0 ? berita : DEFAULT_BERITA).filter(
    (item) => item.status === 'published'
  );

  const handleOpenBerita = (item: Berita) => {
    setSelectedBerita(item);
    setIsModalOpen(true);
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="berita" className="py-20 lg:py-28 bg-white scroll-mt-24 sm:scroll-mt-28 relative">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
            <Newspaper className="w-4 h-4 text-emerald-700" />
            <span>Informasi Terkini Dusun</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Warta & Kegiatan Warga
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Publikasi resmi seputar agenda kemasyarakatan, layanan kesehatan terpadu,
            kebijakan dusun, dan dinamika kebersamaan warga Padukuhan Jumeneng Kidul.
          </p>
        </ScrollReveal>

        {/* Berita Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const thematic = getBeritaThematic(item.judul);
            const ThematicIcon = thematic.icon;
            const hasValidImage = item.gambar_url && !failedImages[item.id];

            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={idx * 100}
                className="h-full"
              >
                <article
                  className="group rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 h-full"
                >
                  {/* Card Thumbnail / Header Visual */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                    {hasValidImage ? (
                      <img
                        src={item.gambar_url!}
                        alt={item.judul}
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${thematic.gradient} flex flex-col items-center justify-center p-6 border-b border-slate-100`}
                      >
                        <div
                          className={`w-16 h-16 rounded-2xl ${thematic.iconBg} flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform duration-300`}
                        >
                          <ThematicIcon className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 tracking-wide">
                          Dokumentasi Kegiatan Dusun
                        </span>
                      </div>
                    )}

                    {/* Kategori Badge Floating */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-2xs backdrop-blur-md bg-white/95 ${thematic.badgeColor}`}
                      >
                        <Tag className="w-3 h-3" />
                        {thematic.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Tanggal Terbit Berformat Indonesia */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <time dateTime={item.tanggal_publikasi}>
                          {formatTanggalIndonesia(item.tanggal_publikasi)}
                        </time>
                      </div>

                      {/* Judul Berita */}
                      <h3
                        onClick={() => handleOpenBerita(item)}
                        className="font-heading font-bold text-lg sm:text-xl text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer mb-3 leading-snug"
                      >
                        {item.judul}
                      </h3>

                      {/* Ringkasan Cuplikan */}
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                        {item.ringkasan}
                      </p>
                    </div>

                    {/* Card Action: Tombol Baca Selengkapnya */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenBerita(item)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-900 group/btn transition-colors focus:outline-hidden"
                      >
                        <span>Baca Selengkapnya</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[11px] text-slate-400 font-medium">Jumeneng Kidul</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Modal Baca Artikel Lengkap */}
      <BeritaModal
        berita={selectedBerita}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
