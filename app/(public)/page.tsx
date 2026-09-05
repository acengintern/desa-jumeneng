import React from 'react';
import {
  getProfilDesa,
  getStatistik,
  getPengurus,
  getSarana,
  getPotensi,
  getBerita,
  getGaleri,
} from '@/lib/data-service';
import { HeroSection } from '@/components/public/HeroSection';
import { ProfilSection } from '@/components/public/ProfilSection';
import { PemdesSection } from '@/components/public/PemdesSection';
import { SaranaSection } from '@/components/public/SaranaSection';
import { PotensiSection } from '@/components/public/PotensiSection';
import { BeritaSection } from '@/components/public/BeritaSection';
import { GaleriSection } from '@/components/public/GaleriSection';
import { KontakSection } from '@/components/public/KontakSection';

// Memastikan data selalu segar saat direquest (SSR / ISR)
export const revalidate = 60;

export default async function PublicHomePage() {
  const [profil, statistik, pengurus, sarana, potensi, berita, galeri] =
    await Promise.all([
      getProfilDesa(),
      getStatistik(),
      getPengurus(),
      getSarana(),
      getPotensi(),
      getBerita(),
      getGaleri(),
    ]);

  return (
    <div className="w-full">
      {/* 1. Hero Sambutan & 4 Kartu Statistik */}
      <HeroSection profil={profil} statistik={statistik} />

      {/* 2. Profil Dusun, Sejarah, Karakteristik, Visi Misi & Demografi */}
      <ProfilSection profil={profil} statistik={statistik} />

      {/* 3. Struktur Pamong & Pengurus Dusun (Task 4) */}
      <PemdesSection pengurus={pengurus} />

      {/* 4. Sarana & Prasarana Fasilitas Publik (Task 4) */}
      <SaranaSection sarana={sarana} />

      {/* 5. Potensi Wilayah dengan Modal Detail Interaktif (Task 4) */}
      <PotensiSection potensi={potensi} />

      {/* 6. Warta & Berita Kegiatan Dusun dengan Modal Artikel (Task 5) */}
      <BeritaSection berita={berita} />

      {/* 7. Galeri Foto Dokumentasi dengan Fullscreen Lightbox (Task 5) */}
      <GaleriSection galeri={galeri} />

      {/* 8. Kontak Sekretariat, Direct WhatsApp, Form Aspirasi & Google Maps (Task 5) */}
      <KontakSection profil={profil} />
    </div>
  );
}

