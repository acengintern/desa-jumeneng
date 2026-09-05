import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Galeri } from '@/lib/types';

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
    <section className="py-12 sm:py-16 lg:py-20 bg-stone-50/50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (Left-aligned, natural copy, no capsule) */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Galeri Foto Padukuhan
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Dokumentasi gotong royong, posyandu, dan dinamika kemasyarakatan warga Jumeneng Kidul.
          </p>
        </div>

        {/* 6 Photo Clean Grid (2 cols mobile, 3 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-10">
          {displayItems.map((item, idx) => (
            <Link
              key={item.id || idx}
              href="/galeri"
              className="group relative block aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 border border-stone-200"
              aria-label={`Buka foto ${item.judul_kegiatan} di halaman galeri`}
            >
              <img
                src={item.foto_url}
                alt={item.judul_kegiatan}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300 ease-out"
              />

              {/* Subtle bottom gradient for caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

              {/* Bottom Caption */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 text-white z-10">
                <p className="font-medium text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-1 leading-snug">
                  {item.judul_kegiatan}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div>
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm shadow-xs transition-colors active:scale-[0.98] min-h-[44px]"
          >
            <span>Buka Galeri Foto Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
