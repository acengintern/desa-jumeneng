import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Phone,
  Sparkles,
  ArrowRight,
  Compass,
  Building2,
  Sprout,
  Users,
} from 'lucide-react';
import { getProfilDesa } from '@/lib/data-service';
import { KontakPageContent } from '@/components/public/KontakPageContent';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Kontak & Layanan Warga - Padukuhan Jumeneng Kidul',
  description:
    'Kontak resmi sekretariat dusun, jam layanan administrasi kependudukan, nomor WhatsApp Dukuh, peta lokasi Google Maps, dan formulir aspirasi warga Padukuhan Jumeneng Kidul, Sleman.',
};

// Revalidasi data secara berkala (ISR)
export const revalidate = 60;

export default async function KontakPage() {
  const profil = await getProfilDesa();

  return (
    <div className="bg-stone-50/50 min-h-screen">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <section className="bg-white border-b border-stone-200/80 pt-8 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 font-medium">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-stone-600 hover:text-emerald-800 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </li>
              <li className="text-emerald-950 font-semibold truncate">
                Kontak & Layanan
              </li>
            </ol>
          </nav>

          {/* Page Heading & Metadata Dusun */}
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-800 tracking-wide mb-2">
              Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta
            </p>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Kontak & Layanan Warga Dusun
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
              Sampaikan pertanyaan seputar surat pengantar kependudukan, koordinasi potensi lokal,
              maupun saran pembangunan dusun. Pengurus Padukuhan Jumeneng Kidul siap melayani warga secara terbuka, guyub, dan solutif.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT: CONTACT CARDS, MAPS & CITIZEN FORM */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        <section id="kontak-layanan">
          <ScrollReveal direction="up">
            <KontakPageContent profil={profil} />
          </ScrollReveal>
        </section>

        {/* 3. BOTTOM NAVIGATION LINKS */}
        <section id="navigasi-halaman">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Navigasi Halaman Terkait
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Jelajahi Informasi Dusun Lainnya
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Mengenal riwayat asal-usul padukuhan, susunan pamong RT/RW, atau potensi kemandirian ekonomi dusun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Profil */}
            <Link
              href="/profil"
              className="group p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  Profil & Sejarah Dusun
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Telusuri ketokohan leluhur Kyai Nur Jumeneng, visi-misi padukuhan, serta data kependudukan 1.659 jiwa di Jumeneng Kidul.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                <span>Buka Profil Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Pemerintahan */}
            <Link
              href="/pemerintahan"
              className="group p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-teal-800 transition-colors mb-1.5">
                  Pemerintahan & Pamong Dusun
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Informasi struktur kepengurusan pamong, kontak pengurus 4 RW, 9 RT, dan daftar fasilitas sarana publik dusun.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-teal-800 group-hover:text-teal-950">
                <span>Buka Struktur Pemerintahan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
