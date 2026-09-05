import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sprout,
  Store,
  Landmark,
  Beef,
  Sparkles,
  Home,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Newspaper,
  HeartHandshake,
  Droplets,
  Layers,
  Leaf,
  Users,
  Compass,
  Check,
  Award,
} from 'lucide-react';
import { getPotensi } from '@/lib/data-service';
import { PotensiPageContent } from '@/components/public/PotensiPageContent';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Potensi Unggulan Wilayah - Padukuhan Jumeneng Kidul',
  description:
    'Eksplorasi potensi pertanian, sentra UMKM emping melinjo, tradisi keagamaan leluhur, dan peternakan warga Padukuhan Jumeneng Kidul, Sleman.',
};

// Revalidasi data secara berkala (ISR)
export const revalidate = 60;

export default async function PotensiPage() {
  const potensi = await getPotensi();

  // 4 Pilar Sektor Utama untuk Highlight Ringkasan
  const pilarSektor = [
    {
      id: 'pertanian',
      nama: 'Pertanian Jagung & Padi',
      kategori: 'Ketahanan Pangan Agraris',
      deskripsi:
        'Lahan tegalan subur lereng Merapi penghasil jagung manis, jagung pipil, dan padi sawah beririgasi teknis.',
      icon: Sprout,
      iconColor: 'text-emerald-800',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
      hoverBorder: 'hover:border-emerald-400',
      highlightTag: 'Sentra Jagung & Padi',
    },
    {
      id: 'umkm',
      nama: 'Sentra UMKM Emping Melinjo',
      kategori: 'Ekonomi Produktif Rumahan',
      deskripsi:
        'Sentra produksi emping melinjo renyah gurih tanpa pengawet yang menopang kemandirian ekonomi keluarga warga dusun.',
      icon: Store,
      iconColor: 'text-amber-800',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200/70',
      hoverBorder: 'hover:border-amber-400',
      highlightTag: 'Kripik & Emping Renyah',
    },
    {
      id: 'keagamaan',
      nama: 'Tradisi Keagamaan & Seni Badui',
      kategori: 'Warisan Nilai Leluhur',
      deskripsi:
        'Pelestarian tradisi langka Adzan Jum’at 4 muadzin serentak warisan Kyai Nur Jumeneng serta kesenian tari Badui.',
      icon: Landmark,
      iconColor: 'text-teal-800',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200/70',
      hoverBorder: 'hover:border-teal-400',
      highlightTag: 'Adzan 4 & Kesenian Badui',
    },
    {
      id: 'peternakan',
      nama: 'Peternakan Domba & Sapi',
      kategori: 'Sirkular Ekonomi Rakyat',
      deskripsi:
        'Budidaya ternak mandiri skala warga dengan pemanfaatan limbah pakan dan pengolahan pupuk kompos alami untuk sawah.',
      icon: Beef,
      iconColor: 'text-orange-800',
      badgeBg: 'bg-orange-50 text-orange-900 border-orange-200/70',
      hoverBorder: 'hover:border-orange-400',
      highlightTag: 'Pupuk Kompos Organik',
    },
  ];

  return (
    <div className="bg-stone-50/50 min-h-screen">
      {/* 1. BREADCRUMB & PAGE HEADER SECTION */}
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
                Potensi Wilayah
              </li>
            </ol>
          </nav>

          {/* Page Heading & Regional Metadata */}
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-800 tracking-wide mb-2">
              Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta
            </p>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Potensi & Kemandirian Dusun Jumeneng Kidul
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
              Mengembangkan ketahanan pangan agraris, ekonomi produktif UMKM rumahan,
              lestarinya nilai keagamaan tradisi, dan peternakan rakyat yang berkelanjutan
              demi kesejahteraan masyarakat secara menyeluruh.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* 2. RINGKASAN 4 PILAR SEKTOR UNGGULAN */}
        <section id="ringkasan-sektor">
          <ScrollReveal direction="up">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Ringkasan Pilar Ekonomi
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
                  4 Pilar Sektor Utama Dusun
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md">
                Kombinasi sektor agraris, industri rumahan, warisan budaya, dan peternakan terpadu
                yang menopang ketahanan lokal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {pilarSektor.map((pilar) => {
                const IconComponent = pilar.icon;
                return (
                  <div
                    key={pilar.id}
                    className={`bg-white rounded-lg p-6 border border-stone-200 shadow-xs ${pilar.hoverBorder} hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-stone-100 border border-stone-200/70 flex items-center justify-center">
                          <IconComponent className={`w-6 h-6 ${pilar.iconColor}`} />
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${pilar.badgeBg}`}
                        >
                          {pilar.highlightTag}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-stone-900 mb-1.5">
                        {pilar.nama}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium mb-3">
                        {pilar.kategori}
                      </p>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {pilar.deskripsi}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                      <span className="text-[11px] text-stone-400">Status Sektor:</span>
                      <span className="inline-flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Produktif</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 3. DIREKTORI POTENSI INTERAKTIF WITH DETAIL MODAL */}
        <section id="direktori-potensi" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="mb-6 sm:mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Direktori Komoditas & Usaha
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
                Eksplorasi Rincian Potensi & Data Lapangan
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl">
                Pilih sektor di bawah ini untuk meninjau kegiatan utama, keunggulan hasil panen/produksi,
                tantangan yang dihadapi warga, serta sumber data terverifikasi dari pamong dusun.
              </p>
            </div>

            {/* Client Component with Filters, Cards, and Modal */}
            <PotensiPageContent potensi={potensi} />
          </ScrollReveal>
        </section>

        {/* 4. NARASI PROGRAM PEMBERDAYAAN DUSUN */}
        <section id="program-pemberdayaan" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 sm:p-10 lg:p-12 space-y-10">
              {/* Header Narasi */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  <span>Kebijakan & Inisiatif Dusun</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950">
                  Program Pemberdayaan & Penguatan Potensi Dusun
                </h2>
                <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
                  Pemerintah Padukuhan Jumeneng Kidul bersama seluruh elemen warga secara aktif
                  merumuskan langkah strategis guna mengatasi kendala iklim dan pemasaran, seraya
                  memperkokoh kemandirian ekonomi serta lestarinya tradisi leluhur.
                </p>
              </div>

              {/* 4 Pilar Narasi Terperinci */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* 1. UMKM Melinjo */}
                <div className="p-6 rounded-lg bg-amber-50/50 border border-amber-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base sm:text-lg text-amber-950">
                          Peningkatan Mutu & Hilirisasi UMKM Melinjo
                        </h3>
                        <span className="text-xs text-amber-800 font-medium">
                          Ekonomi Kreatif & Kemitraan Usaha
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                      Guna mengatasi keterbatasan pohon melinjo di dusun dan meningkatkan nilai jual kripik emping:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Gerakan Pekarangan Produktif:</strong> Pembagian bibit melinjo unggul untuk ditanam di pekarangan rumah warga demi menjamin pasokan biji mandiri jangka panjang.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Standarisasi Pengemasan & Higienitas:</strong> Pendampingan kemasan kedap udara higienis agar kripik melinjo lebih renyah tahan lama dan berdaya saing di pusat oleh-oleh Sleman.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Jejaring Pemasaran Digital:</strong> Fasilitasi promosi daring melalui portal dusun dan kemitraan distributor UMKM regional Sleman.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200/60 text-xs text-amber-900 font-medium">
                    Fokus: Pendapatan keluarga & kemandirian pangan olahan.
                  </div>
                </div>

                {/* 2. Ketahanan Pangan Agraris */}
                <div className="p-6 rounded-lg bg-emerald-50/50 border border-emerald-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base sm:text-lg text-emerald-950">
                          Ketahanan Pangan Agraris & Mitigasi Kekeringan
                        </h3>
                        <span className="text-xs text-emerald-800 font-medium">
                          Optimalisasi Lahan & Tata Kelola Air
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                      Menghadapi risiko kemarau dan menjaga produktivitas hamparan jagung serta padi sawah:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Manajemen Giliran Irigasi Terpadu:</strong> Koordinasi intensif antar-kelompok tani dusun bersama pengatur air desa (ulu-ulu) untuk pembagian debit air yang adil.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Rotasi Palawija Hemat Air:</strong> Menjadwalkan penanaman jagung dan kacang tanah pada musim kemarau saat pasokan air sawah menurun.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Aplikasi Kompos Organik Terpadu:</strong> Penggunaan kompos alami dari kotoran ternak lokal guna menjaga kelembapan serta struktur kesuburan tanah vulkanik.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-200/60 text-xs text-emerald-900 font-medium">
                    Fokus: Swasembada jagung & stabilitas hasil panen padi dusun.
                  </div>
                </div>

                {/* 3. Perawatan Tradisi & Gotong Royong */}
                <div className="p-6 rounded-lg bg-teal-50/50 border border-teal-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-md bg-teal-100 text-teal-900 flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base sm:text-lg text-teal-950">
                          Perawatan Tradisi Keagamaan & Budaya Luhur
                        </h3>
                        <span className="text-xs text-teal-800 font-medium">
                          Spiritualitas & Warisan Kyai Nur Jumeneng
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                      Melestarikan identitas religius dan tradisi kesenian khas yang telah ada sejak berabad lampau:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Pelestarian Tradisi Adzan 4 Muadzin:</strong> Menjaga tradisi kumandang adzan Jum’at oleh 4 orang muadzin secara serentak di masjid dusun sebagai warisan luhur yang langka.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Regenerasi Kesenian Tari Badui:</strong> Mengadakan latihan rutin kesenian tari Badui bernuansa shalawat bagi para pemuda karang taruna agar tidak punah.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Majelis Guyub Rukun Warga:</strong> Mempertahankan kegiatan yasinan, pengajian keliling per RT, dan sambatan sosial sebagai perekat kekeluargaan.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-teal-200/60 text-xs text-teal-900 font-medium">
                    Fokus: Ketenteraman batin, keharmonisan sosial, dan syiar Islam.
                  </div>
                </div>

                {/* 4. Sirkular Ekonomi Peternakan Rakyat */}
                <div className="p-6 rounded-lg bg-orange-50/50 border border-orange-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-md bg-orange-100 text-orange-950 flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base sm:text-lg text-orange-950">
                          Sirkular Pertanian & Peternakan Terpadu
                        </h3>
                        <span className="text-xs text-orange-800 font-medium">
                          Ekonomi Hijau & Ramah Lingkungan
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                      Mengintegrasikan sektor ternak dan pertanian tanpa limbah terbuang (zero-waste):
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-orange-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Pemanfaatan Kompos Kotoran Ternak:</strong> Limbah kotoran sapi dan kambing warga diolah menjadi pupuk kandang matang untuk menyuburkan lahan jagung dan padi.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-orange-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Pengolahan Pakan Hijauan & Fermentasi:</strong> Mengantisipasi kekurangan rumput saat kemarau dengan teknologi silase tebon jagung dan jerami padi fermentasi.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-orange-800 shrink-0 mt-0.5" />
                        <span>
                          <strong>Budidaya Unggas Mandiri:</strong> Pembinaan ayam kampung lepas bagi warga sebagai sumber tambahan protein harian keluarga serta tabungan ekonomi.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-orange-200/60 text-xs text-orange-900 font-medium">
                    Fokus: Kemandirian pupuk organik dusun & efisiensi biaya tani.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 5. BOTTOM NAVIGATION CARDS */}
        <section id="navigasi-lanjutan" className="pt-4">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Navigasi Halaman Terkait
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Jelajahi Informasi Dusun Lainnya
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Temukan warta kegiatan warga, ajukan kemitraan produk UMKM, atau telusuri profil sejarah dusun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: Berita */}
            <Link
              href="/berita"
              className="group p-6 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Newspaper className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  Warta & Kabar Kegiatan Dusun
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Ikuti informasi panen raya pertanian, kegiatan pelatihan UMKM melinjo, dan agenda sosial padukuhan terkini.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                <span>Baca Berita Terbaru</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Kontak & Kemitraan */}
            <Link
              href="/kontak"
              className="group p-6 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors mb-1.5">
                  Layanan Warga & Kemitraan UMKM
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Hubungi kontak sekretariat dusun untuk pemesanan emping melinjo, koordinasi potensi lokal, atau menyampaikan saran.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                <span>Hubungi Pengurus Dusun</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Profil & Sejarah */}
            <Link
              href="/profil"
              className="group p-6 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-teal-800 transition-colors mb-1.5">
                  Profil & Sejarah Padukuhan
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Mengenal ketokohan leluhur Kyai Nur Jumeneng, asal-usul pemekaran wilayah, dan falsafah kerukunan warga.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-teal-800 group-hover:text-teal-950">
                <span>Pelajari Riwayat Dusun</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
