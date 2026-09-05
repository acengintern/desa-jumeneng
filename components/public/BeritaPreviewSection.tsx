import React from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { Berita } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';
import { ScrollReveal } from './ScrollReveal';

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
    tanggal_publikasi: '2026-08-10',
    status: 'published',
  },
];

export function BeritaPreviewSection({ berita }: BeritaPreviewSectionProps) {
  const publishedItems = (berita && berita.length > 0 ? berita : DEFAULT_BERITA)
    .filter((b) => b.status === 'published' || !b.status)
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
            <Newspaper className="w-4 h-4 text-emerald-700" />
            <span>Kabar Padukuhan</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Warta & Kegiatan Warga
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Catatan kegiatan sosial, pengumuman kelembagaan, serta kabar terkini dari Padukuhan
            Jumeneng Kidul.
          </p>
        </ScrollReveal>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {publishedItems.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 80} className="h-full">
              <Link
                href="/berita"
                className="group h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-600/40 hover:shadow-md transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt={item.judul}
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

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Publication Date */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-2.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{formatTanggalIndonesia(item.tanggal_publikasi)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug mb-2">
                      {item.judul}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>

                  {/* Read indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                    <span>Baca selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <span>Lihat Semua Warta Kegiatan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
