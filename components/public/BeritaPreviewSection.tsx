import React from 'react';
import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';
import { Berita } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface BeritaPreviewSectionProps {
  berita?: Berita[];
}

const DEFAULT_BERITA: Berita[] = [
  {
    id: 'f6000000-0000-0000-0000-000000000001',
    judul: 'Kegiatan Posyandu Balita & Lansia Rutin Dusun',
    slug: 'kegiatan-posyandu-balita-lansia',
    ringkasan:
      'Pelayanan kesehatan rutin bagi balita dan lansia yang diselenggarakan oleh kader kesehatan Padukuhan Jumeneng Kidul.',
    konten: '',
    gambar_url:
      'https://info-jumenengkidul.site.je/uploads/berita/img_20260903_090114_d4968679.jpg',
    gambar_alt: 'Pelayanan Posyandu Balita dan Lansia Jumeneng Kidul',
    kategori: 'Kesehatan',
    tanggal_publikasi: '2026-07-20',
    status: 'published',
  },
  {
    id: 'f6000000-0000-0000-0000-000000000002',
    judul: 'Rapat Koordinasi Pengurus RT dan RW Padukuhan',
    slug: 'rapat-koordinasi-pengurus-rt-rw',
    ringkasan:
      'Pertemuan berkala evaluasi gotong royong dan rencana program kerja kemasyarakatan semester mendatang.',
    konten: '',
    gambar_url:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    gambar_alt: 'Rapat Koordinasi Pengurus RT dan RW Jumeneng Kidul',
    kategori: 'Pemerintahan',
    tanggal_publikasi: '2026-08-01',
    status: 'published',
  },
  {
    id: 'f6000000-0000-0000-0000-000000000003',
    judul: 'Kerja Bakti Massal Kebersihan Lingkungan Dusun',
    slug: 'kerja-bakti-bersih-lingkungan-dusun',
    ringkasan:
      'Warga bergotong royong membersihkan selokan, bahu jalan dusun, serta area fasilitas umum.',
    konten: '',
    gambar_url:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    gambar_alt: 'Warga Kerja Bakti Gotong Royong Kebersihan Lingkungan Dusun',
    kategori: 'Lingkungan',
    tanggal_publikasi: '2026-08-10',
    status: 'published',
  },
];

export function BeritaPreviewSection({ berita }: BeritaPreviewSectionProps) {
  const publishedItems = (berita && berita.length > 0 ? berita : DEFAULT_BERITA)
    .filter((b) => b.status === 'published' || !b.status)
    .slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (Left-aligned, natural copy, no capsule) */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Warta & Kegiatan Warga
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Agenda kemasyarakatan, layanan posyandu, gotong royong, dan pengumuman padukuhan.
          </p>
        </div>

        {/* News Editorial Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {publishedItems.map((item) => (
            <Link
              key={item.id}
              href={`/berita/${item.slug}`}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail (rounded-lg) */}
                <div className="relative aspect-[16/10] rounded-lg bg-stone-100 overflow-hidden border border-stone-200 mb-3">
                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt={item.gambar_alt || item.judul}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                      <Newspaper className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Publication Date & Category */}
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1.5">
                  <time dateTime={item.tanggal_publikasi}>
                    {formatTanggalIndonesia(item.tanggal_publikasi)}
                  </time>
                  <span className="text-stone-300">·</span>
                  <span className="text-emerald-800 font-semibold">
                    {item.kategori || 'Warta Dusun'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {item.judul}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {item.ringkasan}
                </p>
              </div>

              {/* Read indicator */}
              <div className="mt-3 pt-2 text-xs font-semibold text-emerald-800 group-hover:text-emerald-700 inline-flex items-center gap-1">
                <span>Baca selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm shadow-xs transition-colors active:scale-[0.98] min-h-[44px]"
          >
            <span>Lihat Semua Warta Kegiatan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
