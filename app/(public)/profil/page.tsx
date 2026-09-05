import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  HeartHandshake,
  Sparkles,
  Sprout,
  Users,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Quote,
  ShieldCheck,
  Building2,
  Layers,
  Home,
  CheckCircle2,
  Calendar,
  Phone,
} from 'lucide-react';
import { getProfilDesa, getStatistik } from '@/lib/data-service';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Profil & Sejarah - Padukuhan Jumeneng Kidul',
  description:
    'Sejarah Kyai Nur Jumeneng, karakteristik wilayah, visi misi, serta demografi penduduk Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.',
};

// Revalidasi data secara berkala (ISR)
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
    'Melestarikan tradisi dan budaya dusun.',
    'Mendorong partisipasi aktif warga dalam pembangunan.',
  ];

  const misiList = profil.misi && profil.misi.length > 0 ? profil.misi : defaultMisi;

  const karakteristikList = [
    {
      title: 'Wilayah Sumberadi',
      badge: 'Geografis & Agraris',
      desc: 'Berada di wilayah administratif Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman dengan kontur tanah subur lereng barat Merapi dan saluran irigasi yang menopang sawah produktif.',
      icon: MapPin,
      iconBg: 'bg-emerald-100 text-emerald-800',
      borderHover: 'hover:border-emerald-300',
    },
    {
      title: 'Semangat Gotong Royong',
      badge: 'Kultur Sosial',
      desc: 'Kultur sosial guyub rukun yang senantiasa lestari lintas generasi dalam tradisi sambatan, rewang hajatan, ronda malam, dan kerja bakti kebersihan lingkungan dusun.',
      icon: HeartHandshake,
      iconBg: 'bg-amber-100 text-amber-900',
      borderHover: 'hover:border-amber-300',
    },
    {
      title: 'Keagamaan yang Kuat',
      badge: 'Spiritual & Akhlak',
      desc: 'Harmoni kehidupan religius berakar dari ajaran sosok perintis Kyai Nur Jumeneng, berpusat pada syiar masjid, mushola dusun, pengajian berkala, serta majelis taklim warga.',
      icon: Sparkles,
      iconBg: 'bg-teal-100 text-teal-800',
      borderHover: 'hover:border-teal-300',
    },
    {
      title: 'Lingkungan Pedesaan Asri',
      badge: 'Kelestarian Alam',
      desc: 'Bentangan persawahan hijau, semilir udara pedesaan yang sejuk, serta pepohonan rindang menghadirkan ketenangan dan kenyamanan khas pedesaan Sleman barat.',
      icon: Sprout,
      iconBg: 'bg-emerald-100 text-emerald-800',
      borderHover: 'hover:border-emerald-300',
    },
  ];

  return (
    <div className="bg-stone-50/50 min-h-screen">
      {/* 1. HEADER & BREADCRUMB SECTION */}
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
                Profil Dusun
              </li>
            </ol>
          </nav>

          {/* Page Heading & Regional Descriptor */}
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-800 tracking-wide mb-2">
              Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta
            </p>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Profil & Sejarah Padukuhan Jumeneng Kidul
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
              Mengenal lebih dalam riwayat ketokohan Kyai Nur Jumeneng, asal-usul pemekaran wilayah,
              nilai budaya gotong royong, visi pembangunan, serta potret utuh demografi warga.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* 2. SEJARAH KYAI NUR JUMENENG & ASAL-USUL */}
        <section id="sejarah" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Asal-Usul & Riwayat Leluhur</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 mb-6">
                Riwayat Sejarah Kyai Nur Jumeneng & Pemekaran Dusun
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Kolom Kiri: Narasi Sejarah Lengkap */}
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
                    solidaritas antartetangga, kepedulian terhadap fakir miskin, dan semangat kebersamaan masih menjadi
                    pedoman kuat yang diwariskan dari para pendahulu ke generasi muda saat ini.
                  </p>

                  {/* Quote Box Autentik */}
                  <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200/90 shadow-xs relative">
                    <Quote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
                    <blockquote className="text-stone-900 font-medium italic text-sm sm:text-base leading-relaxed relative z-10">
                      &ldquo;Semangat kerukunan dan kemandirian yang diwariskan Kyai Nur Jumeneng tetap menjadi
                      pondasi teguh gotong royong masyarakat Jumeneng Kidul.&rdquo;
                    </blockquote>
                    <div className="mt-3 pt-3 border-t border-amber-200/70 flex flex-wrap items-center justify-between text-xs text-amber-950 font-semibold">
                      <span>Falsafah Luhur Pendiri Dusun</span>
                      <span className="text-emerald-800">Padukuhan Jumeneng Kidul, Mlati</span>
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Foto Dokumentasi Autentik Dusun */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
                    <div className="aspect-[4/3] relative overflow-hidden bg-stone-200">
                      <img
                        src="https://info-jumenengkidul.site.je/img/jumeneng.jpg"
                        alt="Gerbang dan bentang Padukuhan Jumeneng Kidul"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 bg-white border-t border-stone-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-stone-900 leading-snug">
                            Bentang & Suasana Padukuhan Jumeneng Kidul
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Dokumentasi lanskap wilayah pedesaan di Sumberadi, Mlati, Sleman.
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
                          Foto Arsip
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Informasi Koordinat & Kewilayahan */}
                  <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Ketinggian Wilayah:</span>
                      <span className="font-semibold text-stone-800">±165 mdpl (Lereng Merapi)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Kondisi Tanah:</span>
                      <span className="font-semibold text-stone-800">Vulkanik Subur & Irigasi Teratur</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Kode Pos:</span>
                      <span className="font-semibold text-stone-800">55288</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. 4 KARAKTERISTIK WILAYAH DUSUN */}
        <section id="karakteristik" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Pilar Kehidupan Warga</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight">
                4 Karakteristik Utama Dusun
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                Empat fondasi nilai dan kondisi geografis yang menjadi identitas kebanggaan masyarakat Jumeneng Kidul.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {karakteristikList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs ${item.borderHover} transition-all duration-200 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-950 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Identitas Lestari Padukuhan</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. VISI & 4 MISI PADUKUHAN */}
        <section id="visi-misi" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Kolom Visi: Tampilan Elegan & Bersih */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white rounded-xl p-8 sm:p-10 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div>
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider mb-6">
                    Visi Padukuhan
                  </span>

                  <div className="text-amber-400 text-4xl font-serif leading-none mb-3">&ldquo;</div>

                  <blockquote className="font-heading text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-tight mb-6">
                    {profil.visi ||
                      'Menjadi dusun yang mandiri, guyub, dan berkemajuan berbasis potensi lokal dan nilai-nilai keagamaan.'}
                  </blockquote>
                </div>

                <div className="pt-6 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-200/90">
                  <span>Arah Komitmen Pembangunan</span>
                  <span className="font-semibold text-amber-300">Padukuhan Jumeneng Kidul</span>
                </div>
              </div>

              {/* Kolom Misi: 4 Butir Terstruktur Rapi */}
              <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>Langkah Nyata & Agenda Kerja</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 mb-6">
                    4 Butir Misi Padukuhan
                  </h3>

                  <div className="space-y-3.5">
                    {misiList.map((misi, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-lg bg-stone-50 border border-stone-200/70 hover:border-emerald-200 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-md bg-emerald-800 text-amber-300 font-heading font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed pt-0.5">
                          {misi}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-stone-500 mt-6 pt-4 border-t border-stone-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Misi padukuhan diselaraskan dengan RPJM Kalurahan Sumberadi dan Kapanewon Mlati.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 5. DEMOGRAFI & RASIO GENDER PENDUDUK */}
        <section id="demografi" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 sm:p-10 lg:p-12">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Data Kependudukan Dusun</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight">
                  Demografi & Komposisi Penduduk
                </h2>
                <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                  Berdasarkan pemutakhiran data register kependudukan, Padukuhan Jumeneng Kidul dihuni oleh{' '}
                  <strong className="text-stone-900 font-bold">{totalPenduduk.toLocaleString('id-ID')} jiwa</strong>{' '}
                  yang terhimpun dalam <strong className="text-stone-900 font-bold">{kepalaKeluarga} Kepala Keluarga</strong>,
                  terbagi dalam <strong className="text-stone-900 font-bold">{jumlahRW} RW</strong> dan{' '}
                  <strong className="text-stone-900 font-bold">{jumlahRT} RT</strong>.
                </p>
              </div>

              {/* 4 Kartu Statistik Pokok */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="p-4 sm:p-5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Total Penduduk
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-950">
                    {totalPenduduk.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-stone-500">Jiwa terdaftar</span>
                </div>

                <div className="p-4 sm:p-5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Kepala Keluarga
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-950">
                    {kepalaKeluarga}
                  </div>
                  <span className="text-xs text-stone-500">Kartu Keluarga (KK)</span>
                </div>

                <div className="p-4 sm:p-5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Rukun Warga (RW)
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-950">
                    {jumlahRW}
                  </div>
                  <span className="text-xs text-stone-500">RW 19, 20, 21, 39, dst</span>
                </div>

                <div className="p-4 sm:p-5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Rukun Tetangga (RT)
                  </span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-950">
                    {jumlahRT}
                  </div>
                  <span className="text-xs text-stone-500">RT 01 sampai RT 09</span>
                </div>
              </div>

              {/* Visual Bar Proporsi Rasio Gender */}
              <div className="rounded-xl bg-stone-50/80 border border-stone-200 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Visualisasi Rasio Gender Penduduk
                  </span>
                  <span className="text-xs font-medium text-stone-600">
                    Total: <strong className="text-stone-950 font-bold">{totalPenduduk.toLocaleString('id-ID')} Jiwa</strong>
                  </span>
                </div>

                {/* Progress Bar Dual Segmen */}
                <div className="h-7 w-full rounded-xl overflow-hidden flex bg-stone-200 p-0.5 border border-stone-300">
                  <div
                    style={{ width: `${priaPersen}%` }}
                    className="h-full bg-emerald-800 rounded-l-lg flex items-center justify-center text-[11px] sm:text-xs font-bold text-white transition-all duration-500"
                    title={`Laki-laki: ${jumlahPria} jiwa (${priaPersen}%)`}
                  >
                    Laki-Laki {priaPersen}%
                  </div>
                  <div
                    style={{ width: `${wanitaPersen}%` }}
                    className="h-full bg-amber-700 rounded-r-lg flex items-center justify-center text-[11px] sm:text-xs font-bold text-white transition-all duration-500"
                    title={`Perempuan: ${jumlahWanita} jiwa (${wanitaPersen}%)`}
                  >
                    Perempuan {wanitaPersen}%
                  </div>
                </div>

                {/* Legend & Rincian Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Laki-laki */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-stone-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-800 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                          Laki-Laki
                        </span>
                        <span className="text-xs text-stone-500">
                          Mayoritas usia produktif
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-950">
                        {jumlahPria.toLocaleString('id-ID')}{' '}
                        <span className="text-xs font-normal text-stone-600">jiwa</span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800">
                        {priaPersen}% dari total
                      </span>
                    </div>
                  </div>

                  {/* Perempuan */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-stone-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-700 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                          Perempuan
                        </span>
                        <span className="text-xs text-stone-500">
                          Peran posyandu & PKK
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-heading font-bold text-xl sm:text-2xl text-amber-950">
                        {jumlahWanita.toLocaleString('id-ID')}{' '}
                        <span className="text-xs font-normal text-stone-600">jiwa</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-800">
                        {wanitaPersen}% dari total
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 6. SOSIO-EKONOMI & LEMBAGA PENDIDIKAN */}
        <section id="sosio-ekonomi" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Kolom 1: Mata Pencaharian & Sosio-Ekonomi */}
              <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                        Sosio-Ekonomi Warga
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-950">
                        Mata Pencaharian Utama
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
                    {profil.mata_pencaharian_desc ||
                      'Sebagian besar warga bermata pencaharian sebagai petani, buruh, dan pelaku UMKM.'}
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          Pertanian Padi & Hortikultura
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                          Sektor Utama
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Mengolah sawah padi, sayuran, dan tanaman palawija dengan dukungan air irigasi yang stabil.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          UMKM Sentra Emping Melinjo
                        </span>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                          Produk Khas
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Industri rumahan pengolahan melinjo menjadi emping berkualitas yang dipasarkan ke pasar lokal dan regional.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          Pertukangan Bangunan, Jasa, & Buruh
                        </span>
                        <span className="text-[10px] font-semibold text-stone-700 bg-stone-200/70 px-2 py-0.5 rounded">
                          Keahlian Teknis
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Tenaga kerja terampil bidang konstruksi sipil, mekanik perbengkelan, dan aneka jasa harian.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          Peternakan Domba & Unggas
                        </span>
                        <span className="text-[10px] font-semibold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                          Sambilan Warga
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Budidaya ternak ruminansia domba/kambing dan unggas ayam kampung sebagai tabungan keluarga.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                  <span>Perekonomian Padukuhan</span>
                  <Link
                    href="/potensi"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-900"
                  >
                    <span>Lihat Potensi Dusun</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Kolom 2: Lembaga Pendidikan di Wilayah */}
              <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-amber-50 text-amber-900 border border-amber-100">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                        Pendidikan & Generasi Penerus
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-950">
                        Lembaga Pendidikan di Dusun
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
                    Akses pendidikan usia dini dan dasar yang dekat dan memadai di dalam lingkungan padukuhan
                    untuk membina masa depan putra-putri warga:
                  </p>

                  <div className="space-y-4">
                    {(profil.lembaga_pendidikan && profil.lembaga_pendidikan.length > 0
                      ? profil.lembaga_pendidikan
                      : ['TK / PAUD', 'Sekolah Dasar Jumeneng']
                    ).map((sekolah, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg bg-stone-50 border border-stone-200/80 hover:border-emerald-200 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-md bg-emerald-800 text-amber-300 flex items-center justify-center font-heading font-bold text-sm shrink-0">
                              0{idx + 1}
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-stone-950">
                                {sekolah}
                              </h4>
                              <p className="text-xs text-stone-500 mt-0.5">
                                {idx === 0
                                  ? 'Pendidikan Anak Usia Dini & Taman Kanak-Kanak'
                                  : 'Pendidikan Dasar Formal 6 Tahun'}
                              </p>
                              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                                {idx === 0
                                  ? 'Fasilitas pembelajaran dasar, pembiasaan karakter luhur, dan stimulasi motorik anak sejak dini dalam suasana yang ramah anak.'
                                  : 'Membekali peserta didik dengan pengetahuan akademis, budi pekerti, serta nilai kebersamaan yang terpadu.'}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
                            Aktif
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                  <span>Dukungan Pendidikan Dusun</span>
                  <span className="font-semibold text-stone-800">Mencerdaskan Generasi</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. BOTTOM NAVIGATION CARDS */}
        <section className="pt-4 border-t border-stone-200/80">
          <div className="mb-6">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-950">
              Jelajahi Informasi Dusun Lainnya
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Lanjutkan membaca struktur pamong dan potensi unggulan Padukuhan Jumeneng Kidul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/pemerintahan"
              className="group p-6 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1">
                  Struktur Pemerintahan Dusun
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Mengenal Kepala Dukuh, pengurus 5 RW, dan para ketua dari 9 RT yang mengabdi bagi ketertiban warga.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-900">
                <span>Lihat Struktur Pamong</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/potensi"
              className="group p-6 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Sprout className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors mb-1">
                  Potensi & UMKM Unggulan
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Eksplorasi sentra produksi emping melinjo, areal pertanian padi subur, dan peternakan warga dusun.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                <span>Eksplorasi Potensi Dusun</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/kontak"
              className="group p-6 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-teal-800 transition-colors mb-1">
                  Layanan Warga & Kontak
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Hubungi kontak resmi sekretariat, sampaikan aspirasi warga, atau cek rute peta lokasi padukuhan.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-teal-800 group-hover:text-teal-900">
                <span>Hubungi Pengurus Dusun</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
