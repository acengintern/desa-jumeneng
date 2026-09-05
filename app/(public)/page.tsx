import React from 'react';
import { getProfilDesa, getStatistik } from '@/lib/data-service';
import { HeroSection } from '@/components/public/HeroSection';
import { ProfilSection } from '@/components/public/ProfilSection';

// Memastikan data selalu segar saat direquest (SSR / ISR)
export const revalidate = 60;

export default async function PublicHomePage() {
  const [profil, statistik] = await Promise.all([
    getProfilDesa(),
    getStatistik(),
  ]);

  return (
    <div className="w-full">
      {/* 1. Hero Sambutan & 4 Kartu Statistik */}
      <HeroSection profil={profil} statistik={statistik} />

      {/* 2. Profil Dusun, Sejarah, Karakteristik, Visi Misi & Demografi */}
      <ProfilSection profil={profil} statistik={statistik} />

      {/* Anchor targets for upcoming sections (Task 4 & Task 5) */}
      <div id="pemerintahan" className="scroll-mt-20" />
      <div id="sarana" className="scroll-mt-20" />
      <div id="potensi" className="scroll-mt-20" />
      <div id="berita" className="scroll-mt-20" />
      <div id="galeri" className="scroll-mt-20" />
      <div id="kontak" className="scroll-mt-20" />
    </div>
  );
}
