import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Users,
  ShieldCheck,
  Home,
  ChevronRight,
  ArrowRight,
  Landmark,
  GraduationCap,
  HeartPulse,
  Trophy,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  Check,
  Sparkles,
} from 'lucide-react';
import { getPengurus, getSarana } from '@/lib/data-service';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Pemerintahan & Sarana Dusun - Padukuhan Jumeneng Kidul',
  description:
    'Struktur organisasi aparatur pamong dusun, ketua RW/RT, dan fasilitas sarana prasarana publik Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.',
};

export const revalidate = 60;

export default async function PemerintahanPage() {
  const [pengurus, sarana] = await Promise.all([
    getPengurus(),
    getSarana(),
  ]);

  const formatName = (str: string) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // 1. Profil Kepala Dukuh
  const dukuh = pengurus.find((p) => p.kategori === 'dukuh') || {
    id: 'dukuh-1',
    nama: 'Edhy Purwanta',
    jabatan: 'Kepala Dukuh (Dukuh)',
    kategori: 'dukuh' as const,
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png',
    urutan: 1,
  };

  const dukuhPhotoUrl =
    dukuh.foto_url ||
    'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png';

  // 2. Jajaran Ketua RW
  const defaultRwList = [
    { id: 'rw-19', nama: 'Ngabidi', jabatan: 'Ketua RW 19', kategori: 'rw' as const, urutan: 2 },
    { id: 'rw-20', nama: 'Moh Idris', jabatan: 'Ketua RW 20', kategori: 'rw' as const, urutan: 5 },
    { id: 'rw-21', nama: 'Mujiman', jabatan: 'Ketua RW 21', kategori: 'rw' as const, urutan: 8 },
    { id: 'rw-39', nama: 'Misbakhul Anam', jabatan: 'Ketua RW 39', kategori: 'rw' as const, urutan: 11 },
  ];

  const rwList = pengurus
    .filter((p) => p.kategori === 'rw')
    .sort((a, b) => a.urutan - b.urutan);

  const effectiveRw = rwList.length > 0 ? rwList : defaultRwList;

  const rwDescriptions: Record<string, { desc: string; focus: string }> = {
    'RW 19': {
      desc: 'Koordinasi ketertiban lingkungan pemukiman dan kerja bakti gotong royong terpadu.',
      focus: 'Ketertiban & Gotong Royong',
    },
    'RW 20': {
      desc: 'Harmoni sosial warga, fasilitasi musyawarah kewilayahan, dan agenda keagamaan.',
      focus: 'Harmoni & Keagamaan',
    },
    'RW 21': {
      desc: 'Ketahanan lingkungan, posyandu balita/lansia, serta pembinaan pemuda wilayah.',
      focus: 'Posyandu & Pemuda',
    },
    'RW 39': {
      desc: 'Pemeliharaan fasilitas lingkungan, kebersihan sanitasi, dan silaturahmi antar-RT.',
      focus: 'Infrastruktur Lingkungan',
    },
  };

  // 3. Jajaran Ketua RT (9 RT)
  const defaultRtList = [
    { id: 'rt-01', nama: 'Fastabiq Ahmad', jabatan: 'Ketua RT 01', kategori: 'rt' as const, urutan: 3 },
    { id: 'rt-02', nama: 'Usman Slamet', jabatan: 'Ketua RT 02', kategori: 'rt' as const, urutan: 4 },
    { id: 'rt-03', nama: 'Darojat Hilal Fatah', jabatan: 'Ketua RT 03', kategori: 'rt' as const, urutan: 6 },
    { id: 'rt-04', nama: 'Dahri Iskandar', jabatan: 'Ketua RT 04', kategori: 'rt' as const, urutan: 7 },
    { id: 'rt-05', nama: 'Hardiyanto', jabatan: 'Ketua RT 05', kategori: 'rt' as const, urutan: 9 },
    { id: 'rt-06', nama: 'Sukirdi', jabatan: 'Ketua RT 06', kategori: 'rt' as const, urutan: 10 },
    { id: 'rt-07', nama: 'Irawan Wibowo', jabatan: 'Ketua RT 07', kategori: 'rt' as const, urutan: 12 },
    { id: 'rt-08', nama: 'Lilik Sunarsa', jabatan: 'Ketua RT 08', kategori: 'rt' as const, urutan: 13 },
    { id: 'rt-09', nama: 'Masrul Indrayana', jabatan: 'Ketua RT 09', kategori: 'rt' as const, urutan: 14 },
  ];

  const rtList = pengurus
    .filter((p) => p.kategori === 'rt')
    .sort((a, b) => a.urutan - b.urutan);

  const effectiveRt = rtList.length > 0 ? rtList : defaultRtList;

  // 4. Sarana & Prasarana Dusun (7 Kategori)
  const saranaDefinitions = [
    {
      kategori: 'Ibadah',
      namaDefault: 'Masjid Dusun',
      jumlahDefault: '1 buah',
      deskripsi:
        'Pusat ibadah shalat berjamaah lima waktu, pengajian berkala, serta pelestarian tradisi adzan 4 muadzin serentak pada shalat Jumat.',
      icon: Landmark,
    },
    {
      kategori: 'Pendidikan',
      namaDefault: 'Sekolah Dasar (SD) Jumeneng',
      jumlahDefault: '1 buah',
      deskripsi:
        'Institusi pendidikan dasar formal yang mencerdaskan generasi penerus dusun dengan fasilitas belajar lengkap dan pembinaan karakter luhur.',
      icon: GraduationCap,
    },
    {
      kategori: 'Kesehatan',
      namaDefault: 'Posyandu Padukuhan',
      jumlahDefault: '1 tempat',
      deskripsi:
        'Layanan kesehatan terpadu berkala bagi balita dan lansia bersama bidan desa Kalurahan Sumberadi dan kader posyandu padukuhan.',
      icon: HeartPulse,
    },
    {
      kategori: 'Umum',
      namaDefault: 'Balai Dusun Jumeneng Kidul',
      jumlahDefault: '1 buah',
      deskripsi:
        'Sentra musyawarah padukuhan (Musdus), koordinasi pengurus RT/RW, pelatihan warga, dan kegiatan kemasyarakatan.',
      icon: Building2,
    },
    {
      kategori: 'Olahraga & Seni',
      namaDefault: 'Lapangan Warga',
      jumlahDefault: '1 buah',
      deskripsi:
        'Ruang terbuka aktif untuk kegiatan olahraga pemuda, turnamen voli dusun, senam kebugaran lansia/PKK, dan panggung perayaan warga.',
      icon: Trophy,
    },
    {
      kategori: 'Keamanan',
      namaDefault: 'Pos Ronda & Siskamling',
      jumlahDefault: 'Tersedia di RT',
      deskripsi:
        'Pos pengamanan swakarsa warga dengan jadwal ronda malam bergiliran demi menjaga keamanan dan ketentraman lingkungan.',
      icon: ShieldCheck,
    },
    {
      kategori: 'Kelembagaan',
      namaDefault: 'PKK & Karang Taruna',
      jumlahDefault: 'Aktif di tiap unit',
      deskripsi:
        'Kelembagaan pemberdayaan wanita keluarga (PKK) dan wadah kepemudaan (Karang Taruna) dalam kegiatan sosial kemasyarakatan.',
      icon: Users,
    },
  ];

  const effectiveSarana = saranaDefinitions.map((item) => {
    const matched = sarana.find(
      (s) => s.kategori.toLowerCase() === item.kategori.toLowerCase()
    );
    return {
      ...item,
      id: matched?.id || `sarana-${item.kategori}`,
      nama_fasilitas: matched?.nama_fasilitas || item.namaDefault,
      jumlah: matched?.jumlah || item.jumlahDefault,
    };
  });

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
                Pemerintahan & Sarana
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-800 mb-1.5">
              Kalurahan Sumberadi, Kapanewon Mlati, Sleman, D.I. Yogyakarta
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Pemerintahan Dusun & Sarana Wilayah
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Struktur aparatur pamong padukuhan, jajaran pengurus 4 RW, 9 ketua RT,
              serta sarana prasarana publik yang melayani warga Padukuhan Jumeneng Kidul.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* 2. PROFIL KEPALA DUKUH */}
        <section id="kepala-dukuh" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-6 sm:p-9 lg:p-11">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Kolom Foto Dukuh */}
                <div className="lg:col-span-4 flex flex-col items-center">
                  <div className="w-full max-w-[240px] sm:max-w-[260px] rounded-lg overflow-hidden border border-stone-200 bg-stone-100 aspect-[4/5] shadow-xs">
                    <img
                      src={dukuhPhotoUrl}
                      alt={`Bapak ${dukuh.nama} - Kepala Dukuh Jumeneng Kidul`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="w-full max-w-[260px] mt-4 p-3 rounded-lg bg-stone-50 border border-stone-200/70 text-xs text-stone-600 space-y-1.5 text-center">
                    <div className="font-bold text-stone-950 text-sm">{dukuh.nama}</div>
                    <div className="text-emerald-800 font-semibold">Kepala Dukuh Jumeneng Kidul</div>
                    <div className="text-[11px] text-stone-500">Masa Bakti Aktif Pamong Dusun</div>
                  </div>
                </div>

                {/* Kolom Narasi Tugas & Wewenang */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Pamong Pimpinan Dusun
                    </span>
                    <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-stone-950">
                      Bapak {dukuh.nama}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      Kepala Dukuh Padukuhan Jumeneng Kidul, Sumberadi, Mlati
                    </p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                    <p>
                      Sebagai kepala dukuh, Bapak Edhy Purwanta mengemban amanah memimpin tata kelola kemasyarakatan,
                      menjaga ketentraman lingkungan, serta mengkoordinasikan kegiatan kelembagaan 4 Rukun Warga (RW)
                      dan 9 Rukun Tetangga (RT) di lingkungan Padukuhan Jumeneng Kidul.
                    </p>
                    <p>
                      Kepala dukuh berperan sebagai jembatan komunikasi resmi antara masyarakat dengan Pemerintah
                      Kalurahan Sumberadi dan Kapanewon Mlati, memastikan setiap program pembangunan, penyaluran bantuan
                      sosial, serta pelayanan administrasi kependudukan terselenggara secara tepat sasaran, adil, dan transparan.
                    </p>
                  </div>

                  {/* Nilai Kepemimpinan Ringkas (Text-first, no bubble icons) */}
                  <div className="pt-4 border-t border-stone-100">
                    <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                      Prinsip Pelayanan Pamong:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                      <div className="flex items-center gap-2 py-1">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Amanah & bertanggung jawab melayani warga</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Merawat persaudaraan & guyub rukun</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Keterbukaan informasi & musyawarah mufakat</span>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Tanggap terhadap kebutuhan sosial warga</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. JAJARAN KETUA RW (4 WILAYAH) */}
        <section id="jajaran-rw" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="mb-5 max-w-2xl">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                Jajaran Ketua Rukun Warga (RW)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Empat koordinator wilayah Rukun Warga yang membina keharmonisan dan program kemasyarakatan dusun.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {effectiveRw.map((rw) => {
                const rwCode = rw.jabatan.replace(/[^0-9]/g, '');
                const rwKey = `RW ${rwCode}`;
                const rwMeta = rwDescriptions[rwKey] || {
                  desc: 'Membina kerukunan dan koordinasi kemasyarakatan.',
                  focus: 'Pelayanan Wilayah',
                };

                return (
                  <div
                    key={rw.id}
                    className="bg-white rounded-lg p-4 sm:p-5 border border-stone-200/90 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                        {rw.jabatan}
                      </span>
                      <h3 className="font-heading text-base font-bold text-stone-950 mb-1">
                        Bapak {formatName(rw.nama)}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {rwMeta.desc}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-stone-100 flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>Fokus: {rwMeta.focus}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. JAJARAN KETUA RT (STRUCTURED DIRECTORY LIST, NO SAAS CARDS) */}
        <section id="jajaran-rt" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="mb-5 max-w-2xl">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                Jajaran Ketua Rukun Tetangga (RT 01 – RT 09)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Garda terdepan pelayanan warga yang mendampingi administrasi kependudukan dan kerukunan lingkungan RT.
              </p>
            </div>

            {/* Structured Directory List with clean dividers */}
            <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-5 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
                {effectiveRt.map((rt) => {
                  const numMatch = rt.jabatan.match(/\d+/);
                  const rtLabel = numMatch
                    ? `RT ${numMatch[0].padStart(2, '0')}`
                    : rt.jabatan;
                  return (
                    <div
                      key={rt.id}
                      className="py-3 border-b border-stone-100 flex items-start justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                          {rtLabel}
                        </span>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mt-0.5">
                          Bapak {formatName(rt.nama)}
                        </h3>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Layanan pengantar & rukun warga
                        </p>
                      </div>
                      <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded shrink-0 mt-1">
                        Aktif
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 5. SARANA & PRASARANA PUBLIK (7 KATEGORI) */}
        <section id="sarana-prasarana" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="mb-5 max-w-2xl">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                Sarana & Prasarana Publik Dusun
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Fasilitas publik penunjang ibadah, pendidikan dasar, posyandu kesehatan, dan ruang komunal warga.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {effectiveSarana.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-5 border border-stone-200/90 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
                          {item.jumlah}
                        </span>
                      </div>

                      <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                        Kategori {item.kategori}
                      </span>
                      <h3 className="font-heading text-base font-bold text-stone-950 mb-1.5">
                        {item.nama_fasilitas}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Pemeliharaan Swadaya Dusun Card */}
              <div className="bg-emerald-900 text-white rounded-lg p-5 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kearifan Lokal</span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-white mb-1.5">
                    Pemeliharaan Gotong Royong
                  </h3>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Seluruh sarana dusun dipelihara secara berkala melalui kerja bakti swadaya warga
                    agar senantiasa bersih, aman, dan nyaman dimanfaatkan bersama.
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-800 text-[11px] text-emerald-200">
                  <span>Milik & Tanggung Jawab Bersama Warga</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 6. ALUR LAYANAN ADMINISTRASI WARGA */}
        <section id="alur-pelayanan" className="scroll-mt-20">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-6 sm:p-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-950 mb-2">
                Alur Pengurusan Administrasi Warga
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mb-6 leading-relaxed">
                Pengurusan surat pengantar kependudukan (KTP, KK, Surat Keterangan) dapat dilakukan melalui 3 tahapan berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/70">
                  <div className="w-7 h-7 rounded-md bg-emerald-800 text-amber-200 text-xs font-bold flex items-center justify-center mb-2.5">
                    1
                  </div>
                  <h3 className="font-heading font-bold text-sm text-stone-950 mb-1">
                    Surat Pengantar RT
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Menghubungi Ketua RT setempat dengan membawa fotokopi KTP & Kartu Keluarga.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/70">
                  <div className="w-7 h-7 rounded-md bg-emerald-800 text-amber-200 text-xs font-bold flex items-center justify-center mb-2.5">
                    2
                  </div>
                  <h3 className="font-heading font-bold text-sm text-stone-950 mb-1">
                    Verifikasi Wilayah RW
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Meneruskan berkas pengantar RT kepada Ketua RW untuk ditandatangani.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/70">
                  <div className="w-7 h-7 rounded-md bg-emerald-800 text-amber-200 text-xs font-bold flex items-center justify-center mb-2.5">
                    3
                  </div>
                  <h3 className="font-heading font-bold text-sm text-stone-950 mb-1">
                    Pengesahan Dukuh / Kalurahan
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Menghadap Kepala Dukuh atau langsung ke loket pelayanan Kantor Kalurahan Sumberadi.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Pengurusan surat pengantar tidak dipungut biaya (bebas biaya/gratis).</span>
                </div>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 shrink-0"
                >
                  <span>Formulir Kontak Sekretariat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
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
              href="/profil"
              className="p-5 rounded-lg bg-white border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
                  Profil & Sejarah Dusun
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Riwayat Kyai Nur Jumeneng, asal-usul pemekaran, visi misi, dan demografi penduduk.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <span>Buka Profil Dusun</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/kontak"
              className="p-5 rounded-lg bg-white border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between min-h-[44px]"
            >
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
                  Layanan Warga & Kontak
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Konsultasi WhatsApp resmi Kepala Dukuh, jam pelayanan balai, dan peta lokasi dusun.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <span>Akses Layanan & Kontak</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
