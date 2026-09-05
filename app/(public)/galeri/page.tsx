import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Camera,
  Sparkles,
  ArrowRight,
  Newspaper,
  Building2,
  Image as ImageIcon,
  ShieldCheck,
  Send,
  Phone,
} from 'lucide-react';
import { getGaleri } from '@/lib/data-service';
import { GaleriPageContent } from '@/components/public/GaleriPageContent';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Galeri Foto Kegiatan - Padukuhan Jumeneng Kidul',
  description:
    'Dokumentasi visual foto kegiatan masyarakat, agenda gotong royong, posyandu balita & lansia, dan kebersamaan warga Padukuhan Jumeneng Kidul, Sleman.',
};

// Revalidasi data secara berkala (ISR)
export const revalidate = 60;

export default async function GaleriPage() {
  const galeri = await getGaleri();

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
                Galeri Dokumentasi
              </li>
            </ol>
          </nav>

          {/* Page Heading & Metadata Dusun */}
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-800 tracking-wide mb-2">
              Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta
            </p>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Galeri Foto Kegiatan Padukuhan
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
              Arsip visual momen kebersamaan warga, agenda gotong royong kebersihan lingkungan,
              pelayanan kesehatan terpadu, serta kehangatan silaturahmi masyarakat Padukuhan Jumeneng Kidul.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT: INTERACTIVE GALLERY GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        <section id="koleksi-foto">
          <ScrollReveal direction="up">
            <GaleriPageContent galeri={galeri} />
          </ScrollReveal>
        </section>

        {/* 3. ARSIP DOKUMENTASI & KONTRIBUSI WARGA */}
        <section id="kontribusi-dokumentasi">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <span>Arsip & Partisipasi Dokumentasi</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-950">
                  Partisipasi Dokumentasi Kegiatan Padukuhan
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                  Dokumentasi visual berperan penting sebagai jejak rekam sejarah dan keterbukaan kegiatan warga.
                  Kami mengundang seluruh pemuda Karang Taruna, PKK, dan warga untuk berkontribusi mendokumentasikan kegiatan positif di lingkungannya.
                </p>
              </div>

              {/* 3 Kartu Pedoman Dokumentasi */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-3">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    Kualitas & Ketajaman Foto
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Utamakan foto dengan pencahayaan jelas, tidak buram, dan memperlihatkan aktivitas positif masyarakat secara wajar.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    Etika & Penghormatan Privasi
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Setiap foto dipublikasikan semata-mata untuk kepentingan arsip kemasyarakatan dengan tetap menghormati norma dan kenyamanan warga.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-3">
                    <Send className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    Pengiriman Dokumentasi
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Foto resolusi penuh beserta keterangan tanggal dan lokasi kegiatan dapat dikirimkan langsung ke admin portal padukuhan.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/6287839064121?text=Halo%20Pengurus%20Padukuhan%20Jumeneng%20Kidul,%20saya%20ingin%20mengirimkan%20foto%20dokumentasi%20kegiatan:"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg min-h-[44px] bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Kirim Foto via WhatsApp Humas</span>
                </a>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg min-h-[44px] bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
                >
                  <span>Formulir Kontak Dusun</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 4. BOTTOM NAVIGATION LINKS */}
        <section id="navigasi-halaman">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Navigasi Halaman Terkait
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Jelajahi Informasi Dusun Lainnya
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Baca artikel berita kegiatan terkini atau telusuri struktur kepengurusan pamong dusun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Berita */}
            <Link
              href="/berita"
              className="group p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Newspaper className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  Warta & Berita Kegiatan
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Pelajari ulasan lengkap agenda posyandu, rapat koordinasi RT/RW, dan informasi pengumuman resmi padukuhan.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                <span>Baca Seluruh Warta Kegiatan</span>
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
                  Pemerintahan & Sarana Dusun
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Kenali struktur aparatur pamong dusun, ketua RW/RT, serta 7 kategori sarana dan prasarana publik di Jumeneng Kidul.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-teal-800 group-hover:text-teal-950">
                <span>Lihat Struktur Pamong Dusun</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
