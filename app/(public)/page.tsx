import React from 'react';
import {
  getProfilDesa,
  getStatistik,
  getPengurus,
  getSarana,
  getPotensi,
} from '@/lib/data-service';
import { HeroSection } from '@/components/public/HeroSection';
import { ProfilSection } from '@/components/public/ProfilSection';
import { PemdesSection } from '@/components/public/PemdesSection';
import { SaranaSection } from '@/components/public/SaranaSection';
import { PotensiSection } from '@/components/public/PotensiSection';

// Memastikan data selalu segar saat direquest (SSR / ISR)
export const revalidate = 60;

export default async function PublicHomePage() {
  const [profil, statistik, pengurus, sarana, potensi] = await Promise.all([
    getProfilDesa(),
    getStatistik(),
    getPengurus(),
    getSarana(),
    getPotensi(),
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

      {/* Anchor targets for upcoming sections (Task 5: Berita, Galeri, Kontak) */}
      <div id="berita" className="scroll-mt-20" />
      <div id="galeri" className="scroll-mt-20" />
      <div id="kontak" className="scroll-mt-20" />
    </div>
  );
}
