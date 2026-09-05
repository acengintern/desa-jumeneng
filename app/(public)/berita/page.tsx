import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Newspaper,
  Sparkles,
  ArrowRight,
  Camera,
  Phone,
  FileCheck2,
  Users2,
  Send,
  Compass,
} from 'lucide-react';
import { getBerita } from '@/lib/data-service';
import { BeritaPageContent } from '@/components/public/BeritaPageContent';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Warta & Berita Kegiatan - Padukuhan Jumeneng Kidul',
  description:
    'Publikasi warta resmi, liputan kegiatan gotong royong, agenda posyandu, musyawarah RT/RW, dan dinamika kebersamaan warga Padukuhan Jumeneng Kidul, Sleman.',
};

// Revalidasi data secara berkala (ISR)
export const revalidate = 60;

export default async function BeritaPage() {
  const berita = await getBerita();

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
                Warta & Kegiatan
              </li>
            </ol>
          </nav>

          {/* Page Heading & Metadata Dusun */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Publikasi Resmi Padukuhan</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Warta & Berita Kegiatan Warga
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-stone-600">
              <span className="font-medium text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                Kalurahan Sumberadi
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-medium text-stone-800">Kapanewon Mlati</span>
              <span className="text-stone-300">•</span>
              <span className="font-medium text-stone-800">Kabupaten Sleman</span>
              <span className="text-stone-300">•</span>
              <span className="font-medium text-stone-800">D.I. Yogyakarta</span>
            </div>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
              Pusat informasi dan dokumentasi resmi seputar agenda kemasyarakatan, layanan kesehatan posyandu,
              program kerja bakti lingkungan, serta kebijakan pembangunan wilayah Padukuhan Jumeneng Kidul.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT: INTERACTIVE NEWS CATALOG */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        <section id="katalog-berita">
          <ScrollReveal direction="up">
            <BeritaPageContent berita={berita} />
          </ScrollReveal>
        </section>

        {/* 3. ALUR PENGAJUAN WARTA KEGIATAN WARGA */}
        <section id="alur-publikasi">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  <Users2 className="w-4 h-4 text-emerald-700" />
                  <span>Partisipasi Informasi Masyarakat</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-950">
                  Ingin Menerbitkan Kabar Kegiatan Wilayah RT / RW?
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                  Pengurus RT, RW, PKK, Posyandu, maupun Karang Taruna di Padukuhan Jumeneng Kidul dapat
                  mengirimkan rilis kabar atau dokumentasi kegiatan untuk dipublikasikan pada portal resmi dusun.
                </p>
              </div>

              {/* 3 Langkah Alur Penerbitan */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-3">
                    1
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    Susun Narasi & Foto
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Siapkan informasi kegiatan: nama agenda, tanggal, lokasi, uraian singkat jalannya acara, dan 1–3 foto dokumentasi jelas.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-3">
                    2
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    Kirim ke Humas / Dukuh
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Teruskan materi berita melalui WhatsApp resmi Kepala Dukuh atau formulir layanan kontak daring warga dusun.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-3">
                    3
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    Verifikasi & Terbit
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Tim humas akan memverifikasi data dan menyunting berita agar tayang resmi pada portal web Padukuhan Jumeneng Kidul.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Informasi via Formulir Kontak</span>
                </Link>
                <a
                  href="https://wa.me/6287839064121?text=Halo%20Pengurus%20Padukuhan%20Jumeneng%20Kidul,%20saya%20ingin%20mengajukan%20kabar%20kegiatan%20wilayah:"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Humas Dusun</span>
                </a>
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
              Tinjau dokumentasi foto visual, ajukan aspirasi layanan warga, atau telusuri potensi ekonomi dusun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Galeri */}
            <Link
              href="/galeri"
              className="group p-6 rounded-2xl sm:rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  Galeri Foto Dokumentasi
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Saksikan potret momen kegiatan warga, gotong royong lingkungan, posyandu balita, dan kebersamaan dusun dalam format galeri foto interaktif.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                <span>Buka Galeri Foto Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Kontak */}
            <Link
              href="/kontak"
              className="group p-6 rounded-2xl sm:rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors mb-1.5">
                  Kontak & Layanan Warga
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Hubungi sekretariat dusun, ketahui jam layanan administrasi kependudukan, konsultasi WhatsApp Dukuh, atau kirimkan aspirasi warga.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                <span>Akses Layanan & Kontak</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
