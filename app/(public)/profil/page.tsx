import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  HeartHandshake,
  Sprout,
  Users,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Quote,
  Home,
  Phone,
} from 'lucide-react';
import { getProfilDesa, getStatistik } from '@/lib/data-service';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Profil & Sejarah - Padukuhan Jumeneng Kidul',
  description:
    'Sejarah Kyai Nur Jumeneng, karakteristik wilayah, visi misi, serta demografi penduduk Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.',
};

export const revalidate = 60;

export default async function ProfilPage() {
  const [profil, statistik] = await Promise.all([
    getProfilDesa(),
    getStatistik(),
  ]);

  // Kalkulasi data demografis
  const totalPenduduk = statistik.total_penduduk || 1659;
  const kepalaKeluarga = statistik.kepala_keluarga || 527;
  const jumlahPria = statistik.jumlah_laki_laki || 852;
  const jumlahWanita = statistik.jumlah_perempuan || 805;
  const jumlahRT = statistik.jumlah_rt || 9;
  const jumlahRW = statistik.jumlah_rw || 5;

  const priaPersen = Math.round((jumlahPria / totalPenduduk) * 100);
  const wanitaPersen = 100 - priaPersen;

  const defaultMisi = [
    'Mengembangkan potensi pertanian dan usaha lokal warga.',
    'Meningkatkan kualitas pendidikan dan kesehatan masyarakat.',
    'Melestarikan tradisi dan budaya luhur dusun.',
    'Mendorong partisipasi aktif warga dalam pembangunan berkelanjutan.',
  ];

  const misiList = profil.misi && profil.misi.length > 0 ? profil.misi : defaultMisi;

  const karakteristikList = [
    {
      title: 'Wilayah Sumberadi',
      desc: 'Berada di wilayah administratif Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman dengan kontur tanah subur lereng barat Merapi dan saluran irigasi yang menopang sawah produktif.',
      icon: MapPin,
    },
    {
      title: 'Semangat Gotong Royong',
      desc: 'Kultur sosial guyub rukun yang senantiasa lestari lintas generasi dalam tradisi sambatan, rewang hajatan, ronda malam, dan kerja bakti kebersihan lingkungan dusun.',
      icon: HeartHandshake,
    },
    {
      title: 'Keagamaan yang Kuat',
      desc: 'Harmoni kehidupan religius berakar dari ajaran sosok perintis Kyai Nur Jumeneng, berpusat pada syiar masjid, mushola dusun, pengajian berkala, serta majelis taklim warga.',
      icon: Sprout,
    },
    {
      title: 'Lingkungan Pedesaan Asri',
      desc: 'Bentangan persawahan hijau, semilir udara pedesaan yang sejuk, serta pepohonan rindang menghadirkan ketenangan dan kenyamanan khas pedesaan Sleman barat.',
      icon: Sprout,
    },
  ];

  return (
    <div className="bg-stone-50/40 min-h-screen">
      {/* 1. HEADER & BREADCRUMB */}
      <section className="bg-white border-b border-stone-200/80 pt-6 sm:pt-8 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-stone-500 font-medium">
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
              <li className="text-emerald-950 font-semibold truncate">
                Profil Dusun
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-800 mb-1.5">
              Kalurahan Sumberadi, Kapanewon Mlati, Sleman, D.I. Yogyakarta
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Profil & Sejarah Padukuhan Jumeneng Kidul
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Mengenal riwayat ketokohan Kyai Nur Jumeneng, asal-usul pemekaran wilayah,
              falsafah gotong royong warga, visi misi kemasyarakatan, serta potret demografi dusun.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WITH VARIED VISUAL RHYTHMS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* 2. SEJARAH: EDITORIAL COMPOSITION (PHOTO + PROSE + QUOTE) */}
        <section id="sejarah" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-6 sm:p-9 lg:p-11">
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-stone-950 mb-6">
                Riwayat Sejarah Kyai Nur Jumeneng & Pemekaran Dusun
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Kolom Kiri: Narasi Sejarah (60-75ch readable text) */}
                <div className="lg:col-span-7 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                  <p>
                    Padukuhan Jumeneng Kidul memiliki akar sejarah yang panjang dan terhormat di tanah Sleman.
                    Bermula dari sebuah padukuhan induk yang luas bernama <strong>Padukuhan Jumeneng Gedhe</strong>.
                    Seiring laju pertambahan populasi penduduk dan penataan tata kelola pemerintahan desa Kalurahan
                    Sumberadi pada masa itu, wilayah Jumeneng Gedhe dimekarkan secara bijak menjadi dua bagian:
                    <strong> Jumeneng Lor</strong> di sisi utara dan <strong>Jumeneng Kidul</strong> di sisi selatan.
                  </p>

                  <p>
                    Nama &ldquo;<strong>Jumeneng</strong>&rdquo; sendiri berakar erat dari nama sang tokoh perintis dan
                    pembuka wilayah (<em>babat alas</em>), yaitu <strong>Kyai Nur Jumeneng</strong>. Beliau merupakan sosok
                    ulama dan sesepuh karismatik yang meletakkan dasar-dasar peradaban, mengajarkan syiar keagamaan Islam,
                    serta menanamkan falsafah hidup bermasyarakat yang berkeadaban.
                  </p>

                  <p>
                    Pengaruh ajaran Kyai Nur Jumeneng bukan sekadar catatan riwayat masa lampau, melainkan jiwa yang tetap
                    hidup dalam laku keseharian masyarakat Padukuhan Jumeneng Kidul. Ketulusan dalam bermusyawarah,
                    solidaritas antartetangga, dan semangat kebersamaan masih menjadi pedoman kuat yang diwariskan
                    hingga generasi kini.
                  </p>

                  {/* Quote Box Autentik */}
                  <div className="mt-6 p-4 sm:p-5 rounded-lg bg-amber-50/70 border-l-4 border-amber-600 relative">
                    <Quote className="w-6 h-6 text-amber-500/20 absolute top-3 right-3" />
                    <blockquote className="text-stone-900 font-medium italic text-xs sm:text-sm leading-relaxed">
                      &ldquo;Semangat kerukunan dan kemandirian yang diwariskan Kyai Nur Jumeneng tetap menjadi
                      pondasi teguh gotong royong masyarakat Jumeneng Kidul.&rdquo;
                    </blockquote>
                    <p className="mt-2 text-[11px] text-amber-900 font-semibold">
                      Falsafah Luhur Pendiri Dusun · Padukuhan Jumeneng Kidul
                    </p>
                  </div>
                </div>

                {/* Kolom Kanan: Foto Arsip Dusun */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100 aspect-[4/3] relative">
                    <Image
                      src={profil.gambar_profil_url || 'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg'}
                      alt="Pemandangan dan gerbang Padukuhan Jumeneng Kidul"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={80}
                      className="object-cover object-center"
                    />
                  </div>
                  <p className="text-xs text-stone-500 italic">
                    Dokumentasi: Lanskap pedesaan Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.
                  </p>

                  {/* Kewilayahan ringkas */}
                  <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Ketinggian:</span>
                      <span className="font-medium text-stone-900">±165 mdpl (Lereng Merapi)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Kondisi Lahan:</span>
                      <span className="font-medium text-stone-900">Vulkanik Subur & Irigasi Sawah</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Kode Pos:</span>
                      <span className="font-medium text-stone-900">55288</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. KARAKTERISTIK: STRUCTURED FEATURE GRID */}
        <section id="karakteristik" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="mb-6 max-w-2xl">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                4 Karakteristik Utama Dusun
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Kondisi geografis dan nilai kemasyarakatan yang menjadi fondasi kehidupan Padukuhan Jumeneng Kidul.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {karakteristikList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 sm:p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-stone-950">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. VISI & MISI: BALANCED SPLIT SECTION */}
        <section id="visi-misi" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Visi */}
              <div className="lg:col-span-5 bg-emerald-900 text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-3">
                    Visi Pembangunan Padukuhan
                  </span>
                  <blockquote className="font-heading text-lg sm:text-xl font-bold text-white leading-snug tracking-tight mb-4">
                    &ldquo;
                    {profil.visi ||
                      'Menjadi dusun yang mandiri, guyub, dan berkemajuan berbasis potensi lokal dan nilai-nilai keagamaan.'}
                    &rdquo;
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-emerald-800/80 text-xs text-emerald-200">
                  <span>Komitmen Bersama Warga & Pamong Dusun</span>
                </div>
              </div>

              {/* Misi */}
              <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-950 mb-4">
                    4 Misi Padukuhan Jumeneng Kidul
                  </h3>

                  <div className="space-y-3">
                    {misiList.map((misi, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 border border-stone-200/70"
                      >
                        <span className="w-6 h-6 rounded-md bg-emerald-800 text-amber-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                          {misi}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-stone-500 mt-4 pt-3 border-t border-stone-100">
                  Selaras dengan agenda pembangunan Pemerintah Kalurahan Sumberadi.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 5. DEMOGRAFI & RASIO GENDER */}
        <section id="demografi" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200 shadow-2xs p-6 sm:p-8">
              <div className="max-w-2xl mb-6">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                  Demografi Penduduk Dusun
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Data kependudukan Padukuhan Jumeneng Kidul mencatat{' '}
                  <strong className="text-stone-900 font-bold">{totalPenduduk.toLocaleString('id-ID')} jiwa</strong>{' '}
                  dalam <strong className="text-stone-900 font-bold">{kepalaKeluarga} KK</strong> yang tersebar di{' '}
                  {jumlahRW} RW dan {jumlahRT} RT.
                </p>
              </div>

              {/* 4 Stat Box Ringkas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="p-3.5 sm:p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-medium block">Total Penduduk</span>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-950 mt-0.5">
                    {totalPenduduk.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[10px] text-stone-500">Jiwa</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-medium block">Kepala Keluarga</span>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-950 mt-0.5">
                    {kepalaKeluarga}
                  </div>
                  <span className="text-[10px] text-stone-500">KK</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-medium block">Rukun Warga</span>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-950 mt-0.5">
                    {jumlahRW}
                  </div>
                  <span className="text-[10px] text-stone-500">Wilayah RW</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-medium block">Rukun Tetangga</span>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-950 mt-0.5">
                    {jumlahRT}
                  </div>
                  <span className="text-[10px] text-stone-500">Unit RT</span>
                </div>
              </div>

              {/* Bar Proporsi Gender */}
              <div className="p-4 sm:p-5 rounded-lg bg-stone-50/70 border border-stone-200">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                  <span>Komposisi Gender</span>
                  <span>Laki-Laki {priaPersen}% · Perempuan {wanitaPersen}%</span>
                </div>

                <div className="h-4 w-full rounded-md overflow-hidden flex bg-stone-200">
                  <div
                    style={{ width: `${priaPersen}%` }}
                    className="h-full bg-emerald-800"
                    title={`Laki-laki: ${jumlahPria} jiwa`}
                  />
                  <div
                    style={{ width: `${wanitaPersen}%` }}
                    className="h-full bg-amber-700"
                    title={`Perempuan: ${jumlahWanita} jiwa`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 mt-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-800 inline-block" />
                    <span>Laki-laki: <strong className="text-stone-900">{jumlahPria}</strong> jiwa</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block" />
                    <span>Perempuan: <strong className="text-stone-900">{jumlahWanita}</strong> jiwa</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 6. MATA PENCAHARIAN & PENDIDIKAN (STRUCTURED DIRECTORY, NOT CARDS-IN-CARDS) */}
        <section id="sosio-ekonomi" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mata Pencaharian */}
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Briefcase className="w-4 h-4 text-emerald-800" />
                    <h3 className="font-heading text-lg font-bold text-stone-950">
                      Mata Pencaharian Pokok
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                    Aktivitas ekonomi utama warga mencakup sektor agraris, industri rumahan, dan pertukangan terampil:
                  </p>

                  <ul className="divide-y divide-stone-100 text-xs sm:text-sm">
                    <li className="py-2.5 flex items-start justify-between gap-2">
                      <div>
                        <strong className="text-stone-900 font-semibold block">Pertanian Sawah & Palawija</strong>
                        <span className="text-stone-500 text-xs">Padi, jagung, dan aneka tanaman sayuran</span>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-800 shrink-0">Mayoritas</span>
                    </li>
                    <li className="py-2.5 flex items-start justify-between gap-2">
                      <div>
                        <strong className="text-stone-900 font-semibold block">Sentra UMKM Emping Melinjo</strong>
                        <span className="text-stone-500 text-xs">Produksi rumahan bernilai tambah khas dusun</span>
                      </div>
                      <span className="text-[11px] font-medium text-amber-900 shrink-0">Khas Dusun</span>
                    </li>
                    <li className="py-2.5 flex items-start justify-between gap-2">
                      <div>
                        <strong className="text-stone-900 font-semibold block">Pertukangan & Jasa Konstruksi</strong>
                        <span className="text-stone-500 text-xs">Keahlian sipil, perbengkelan, dan jasa harian</span>
                      </div>
                      <span className="text-[11px] font-medium text-stone-600 shrink-0">Terampil</span>
                    </li>
                    <li className="py-2.5 flex items-start justify-between gap-2">
                      <div>
                        <strong className="text-stone-900 font-semibold block">Peternakan Skala Rumah Tangga</strong>
                        <span className="text-stone-500 text-xs">Sapi, domba/kambing, dan unggas kampung</span>
                      </div>
                      <span className="text-[11px] font-medium text-stone-600 shrink-0">Sambilan</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-100">
                  <Link
                    href="/potensi"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    <span>Rincian Sektor Potensi Dusun</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Pendidikan */}
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <GraduationCap className="w-4 h-4 text-emerald-800" />
                    <h3 className="font-heading text-lg font-bold text-stone-950">
                      Lembaga Pendidikan di Dusun
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                    Fasilitas pembinaan moral, budi pekerti, dan pendidikan dasar yang berada di lingkungan dusun:
                  </p>

                  <ul className="divide-y divide-stone-100 text-xs sm:text-sm">
                    <li className="py-2.5">
                      <strong className="text-stone-900 font-semibold block">PAUD / TK Jumeneng</strong>
                      <span className="text-stone-500 text-xs leading-relaxed block mt-0.5">
                        Pendidikan usia dini dengan stimulasi motorik dan pembiasaan karakter ramah anak.
                      </span>
                    </li>
                    <li className="py-2.5">
                      <strong className="text-stone-900 font-semibold block">Sekolah Dasar (SD) Jumeneng</strong>
                      <span className="text-stone-500 text-xs leading-relaxed block mt-0.5">
                        Pendidikan formal 6 tahun yang mengutamakan prestasi akademis serta kepribadian luhur.
                      </span>
                    </li>
                    <li className="py-2.5">
                      <strong className="text-stone-900 font-semibold block">TPA & Pengajian Masjid</strong>
                      <span className="text-stone-500 text-xs leading-relaxed block mt-0.5">
                        Pendidikan baca tulis Al-Qur&apos;an dan wawasan keagamaan berkala bagi anak-anak warga.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-100 text-xs text-stone-500">
                  <span>Membina generasi berakhlak mulia</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. BOTTOM NAVIGATION */}
        <section className="pt-4 border-t border-stone-200">
          <div className="mb-4">
            <h3 className="font-heading text-base sm:text-lg font-bold text-stone-950">
              Navigasi Halaman Terkait
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/pemerintahan"
              className="p-5 rounded-lg bg-white border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
                  Struktur Pemerintahan Dusun
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pamong kepala dukuh, koordinator 4 RW, 9 ketua RT, serta fasilitas sarana publik dusun.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <span>Buka Struktur Pemerintahan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/potensi"
              className="p-5 rounded-lg bg-white border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
                  Potensi & UMKM Unggulan
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pertanian pangan produktif, sentra kripik melinjo rumahan, dan peternakan rakyat.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <span>Buka Potensi Wilayah</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
