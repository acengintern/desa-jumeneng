import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Home,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  Building2,
  Newspaper,
  Tag,
} from 'lucide-react';
import { getBerita, getBeritaBySlug, getRelatedBerita } from '@/lib/data-service';
import { formatTanggalIndonesia } from '@/lib/date-utils';
import { BeritaShareButtons } from '@/components/public/BeritaShareButtons';

export const revalidate = 60;

interface BeritaDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const beritaList = await getBerita();
  return beritaList
    .filter((b) => Boolean(b.slug))
    .map((b) => ({
      slug: b.slug,
    }));
}

export async function generateMetadata({
  params,
}: BeritaDetailPageProps): Promise<Metadata> {
  const berita = await getBeritaBySlug(params.slug);
  if (!berita) {
    return {
      title: 'Warta Tidak Ditemukan - Padukuhan Jumeneng Kidul',
      description: 'Halaman warta berita yang Anda tuju tidak ditemukan atau telah dipindahkan.',
    };
  }

  const title = `${berita.judul} - Padukuhan Jumeneng Kidul`;
  const description =
    berita.ringkasan ||
    'Warta resmi dan dokumentasi kegiatan warga Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman.';
  const imageUrl =
    berita.gambar_url || 'https://info-jumenengkidul.site.je/img/jumeneng.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/berita/${berita.slug}`,
      publishedTime: berita.tanggal_publikasi,
      images: [
        {
          url: imageUrl,
          alt: berita.gambar_alt || berita.judul,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BeritaDetailPage({ params }: BeritaDetailPageProps) {
  const berita = await getBeritaBySlug(params.slug);

  if (!berita) {
    notFound();
  }

  const related = await getRelatedBerita(berita.id, berita.kategori, 3);

  // Estimasi durasi baca artikel
  const wordCount = (berita.konten || berita.ringkasan || '')
    .split(/\s+/)
    .filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 160));

  // Paragraf konten lengkap
  const paragraphs = berita.konten
    ? berita.konten.split('\n\n').filter((p) => p.trim().length > 0)
    : [berita.ringkasan];

  const categoryLabel = berita.kategori || 'Warta Dusun';

  return (
    <div className="bg-stone-50/50 min-h-screen">
      {/* 1. BREADCRUMBS NAVIGATION */}
      <section className="bg-white border-b border-stone-200/80 pt-6 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 font-medium flex-wrap">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1 text-stone-600 hover:text-emerald-800 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </li>
              <li>
                <Link
                  href="/berita"
                  className="text-stone-600 hover:text-emerald-800 transition-colors"
                >
                  Warta & Kegiatan
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </li>
              <li className="text-emerald-950 font-semibold truncate max-w-[200px] sm:max-w-xs">
                {berita.judul}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 2. ARTIKEL UTAMA (MAX-W-3XL / 680PX - 768PX READING COLUMN) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <article className="max-w-3xl mx-auto bg-white rounded-xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12">
          {/* Header Artikel */}
          <header className="space-y-4 pb-6 border-b border-stone-100">
            {/* Tag Kategori & Metadata Publikasi */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-stone-500 font-medium">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                <Tag className="w-3 h-3" />
                {categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <time dateTime={berita.tanggal_publikasi}>
                  {formatTanggalIndonesia(berita.tanggal_publikasi)}
                </time>
              </div>
              <span className="text-stone-300">·</span>
              <div className="flex items-center gap-1 text-stone-600">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{readTimeMinutes} menit baca</span>
              </div>
            </div>

            {/* Judul Utama Artikel (H1) */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight leading-snug">
              {berita.judul}
            </h1>

            {/* Instansi Penerbit */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-stone-600">
              <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Pemerintah Padukuhan Jumeneng Kidul · Kalurahan Sumberadi, Sleman
              </span>
            </div>
          </header>

          {/* Foto Dokumentasi Utama (Figure) */}
          {berita.gambar_url ? (
            <figure className="my-8 rounded-xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-2xs">
              <img
                src={berita.gambar_url}
                alt={berita.gambar_alt || berita.judul}
                loading="eager"
                decoding="async"
                className="w-full max-h-[480px] object-cover"
              />
              <figcaption className="px-4 py-2.5 bg-stone-50 border-t border-stone-200/70 text-xs text-stone-500 font-medium italic">
                Dokumentasi Kegiatan: {berita.gambar_alt || berita.judul}
              </figcaption>
            </figure>
          ) : (
            <div className="my-6 p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 text-xs sm:text-sm flex items-center gap-3">
              <Newspaper className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Rilis informasi resmi Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.
              </span>
            </div>
          )}

          {/* Ringkasan Pembuka (Lead Paragraph) */}
          <div className="my-6 p-4 sm:p-5 rounded-lg bg-emerald-50/60 border-l-4 border-emerald-700">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
              Ringkasan Warta
            </p>
            <p className="text-sm sm:text-base font-medium leading-relaxed text-stone-800">
              {berita.ringkasan}
            </p>
          </div>

          {/* Paragraf Konten Lengkap (Left-aligned, comfortable reading width & spacing) */}
          <div className="space-y-5 text-stone-700 leading-relaxed text-base sm:text-lg text-left pt-2">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-stone-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Catatan Kredibilitas & Tanggung Jawab Informasi */}
          <div className="mt-10 p-4 rounded-lg bg-stone-50 border border-stone-200/70 flex items-start gap-3 text-xs text-stone-600 leading-relaxed">
            <Building2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              Publikasi ini disiarkan secara resmi melalui Sistem Informasi Warga Padukuhan Jumeneng Kidul.
              Bila terdapat tanggapan atau informasi tambahan, silakan hubungi pengurus RT/RW atau Kepala Dukuh setempat.
            </p>
          </div>

          {/* Baris Tombol Aksi: Kembali & Bagikan */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              href="/berita"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-bold text-stone-700 hover:text-emerald-800 transition-colors min-h-[44px] px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Semua Warta</span>
            </Link>

            <BeritaShareButtons title={berita.judul} slug={berita.slug} />
          </div>
        </article>

        {/* 3. REKOMENDASI WARTA TERKAIT LAINNYA */}
        {related.length > 0 && (
          <section className="mt-14 sm:mt-18 pt-10 border-t border-stone-200">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Warta Lainnya
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  Kabar & Agenda Padukuhan Terkait
                </h2>
              </div>
              <Link
                href="/berita"
                className="hidden sm:inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950"
              >
                <span>Buka Arsip Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    {item.gambar_url && (
                      <div className="relative aspect-[16/10] rounded-lg bg-stone-100 overflow-hidden mb-3 border border-stone-200/80">
                        <img
                          src={item.gambar_url}
                          alt={item.gambar_alt || item.judul}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-2">
                      <time dateTime={item.tanggal_publikasi}>
                        {formatTanggalIndonesia(item.tanggal_publikasi)}
                      </time>
                      <span className="text-stone-300">·</span>
                      <span className="text-emerald-800 font-semibold">
                        {item.kategori || 'Warta'}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug mb-2">
                      {item.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                    <span>Baca Warta</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
