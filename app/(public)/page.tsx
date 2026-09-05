import React from 'react';
import {
  getProfilDesa,
  getStatistik,
  getPotensi,
  getBerita,
  getGaleri,
} from '@/lib/data-service';
import { HeroSection } from '@/components/public/HeroSection';
import { QuickAccessSection } from '@/components/public/QuickAccessSection';
import { StatistikBarSection } from '@/components/public/StatistikBarSection';
import { SambutanDukuhSection } from '@/components/public/SambutanDukuhSection';
import { PotensiPreviewSection } from '@/components/public/PotensiPreviewSection';
import { BeritaPreviewSection } from '@/components/public/BeritaPreviewSection';
import { GaleriPreviewSection } from '@/components/public/GaleriPreviewSection';
import { KontakPreviewSection } from '@/components/public/KontakPreviewSection';

// Memastikan data selalu segar saat direquest (SSR / ISR)
export const revalidate = 60;

export default async function PublicHomePage() {
  const [profil, statistik, potensi, berita, galeri] = await Promise.all([
    getProfilDesa(),
    getStatistik(),
    getPotensi(),
    getBerita(),
    getGaleri(),
  ]);

  return (
    <div className="w-full">
      {/* 1. Hero Sambutan & Citra Autentik Padukuhan */}
      <HeroSection profil={profil} />

      {/* 2. Akses Cepat 4 Rute Navigasi Utama */}
      <QuickAccessSection />

      {/* 3. Baris Ringkas 4 Angka Kependudukan Pokok */}
      <StatistikBarSection statistik={statistik} />

      {/* 4. Sambutan Hangat Kepala Dukuh */}
      <SambutanDukuhSection />

      {/* 5. Cuplikan Potensi Unggulan Dusun */}
      <PotensiPreviewSection potensi={potensi} />

      {/* 6. Cuplikan Warta Kegiatan Terkini */}
      <BeritaPreviewSection berita={berita} />

      {/* 7. Cuplikan 6 Foto Galeri Dokumentasi */}
      <GaleriPreviewSection galeri={galeri} />

      {/* 8. Informasi Sekretariat, WhatsApp & Peta Lokasi */}
      <KontakPreviewSection profil={profil} />
    </div>
  );
}
