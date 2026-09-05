import React from 'react';
import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import { Galeri } from '@/lib/types';
import { ScrollReveal } from './ScrollReveal';

interface GaleriPreviewSectionProps {
  galeri?: Galeri[];
}

const DEFAULT_GALERI_ITEMS: Galeri[] = [
  {
    id: 'g-preview-1',
    judul_kegiatan: 'Pelayanan Posyandu Balita & Lansia',
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg',
    urutan: 1,
  },
  {
    id: 'g-preview-2',
    judul_kegiatan: 'Pemeriksaan Kesehatan Rutin Warga',
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/berita/img_20260903_090114_d4968679.jpg',
    urutan: 2,
  },
  {
    id: 'g-preview-3',
    judul_kegiatan: 'Kerja Bakti Gotong Royong Lingkungan',
    foto_url:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    urutan: 3,
  },
  {
    id: 'g-preview-4',
    judul_kegiatan: 'Hamparan Lahan Pertanian Sawah & Palawija',
    foto_url:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    urutan: 4,
  },
  {
    id: 'g-preview-5',
    judul_kegiatan: 'Musyawarah Warga di Balai Padukuhan',
    foto_url:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    urutan: 5,
  },
  {
    id: 'g-preview-6',
    judul_kegiatan: 'Tradisi Guyub Rukun & Kebersamaan',
    foto_url:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    urutan: 6,
  },
];

export function GaleriPreviewSection({ galeri }: GaleriPreviewSectionProps) {
  // Combine passed gallery items with defaults to guarantee 6 photos
  const passedItems = galeri || [];
  const combined: Galeri[] = [...passedItems];
  for (const item of DEFAULT_GALERI_ITEMS) {
    if (combined.length >= 6) break;
    if (!combined.some((c) => c.foto_url === item.foto_url || c.id === item.id)) {
      combined.push(item);
    }
  }
  const displayItems = combined.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-stone-50/50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
            <Camera className="w-4 h-4 text-emerald-700" />
            <span>Dokumentasi Kegiatan</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Potret Jumeneng Kidul
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Momen kebersamaan, pelayanan posyandu, gotong royong, dan keasrian suasana padukuhan
            kami.
          </p>
        </ScrollReveal>

        {/* 6 Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-12">
          {displayItems.map((item, idx) => (
            <ScrollReveal key={item.id || idx} direction="up" delay={idx * 60}>
              <Link
                href="/galeri"
                className="group relative block aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 shadow-xs hover:shadow-md border border-slate-200/80 transition-all duration-200"
                aria-label={`Buka foto ${item.judul_kegiatan} di halaman galeri`}
              >
                <img
                  src={item.foto_url}
                  alt={item.judul_kegiatan}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-200" />

                {/* Bottom Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white z-10">
                  <p className="font-medium text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {item.judul_kegiatan}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <span>Buka Galeri Foto Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
