import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Users,
  UserCheck,
  ShieldCheck,
  Award,
  Crown,
  CheckCircle2,
  MapPin,
  Home,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Landmark,
  GraduationCap,
  HeartPulse,
  Trophy,
  Phone,
  Sprout,
  BookOpen,
  FileText,
  Clock,
  HeartHandshake,
  Check,
  Compass,
  Layers,
} from 'lucide-react';
import { getPengurus, getSarana } from '@/lib/data-service';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Pemerintahan & Sarana Dusun - Padukuhan Jumeneng Kidul',
  description:
    'Struktur organisasi aparatur pamong dusun, ketua RW/RT, dan fasilitas sarana prasarana publik Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.',
};

// Revalidasi data secara berkala (ISR)
export const revalidate = 60;

export default async function PemerintahanPage() {
  const [pengurus, sarana] = await Promise.all([
    getPengurus(),
    getSarana(),
  ]);

  // Helper untuk format nama berhuruf kapital rapi
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

  // 2. Jajaran Ketua RW (4 Wilayah)
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

  // Metadata detail untuk 4 RW
  const rwDescriptions: Record<string, { desc: string; focus: string }> = {
    'RW 19': {
      desc: 'Mengkoordinasikan kerukunan warga, ketertiban lingkungan pemukiman, serta mengawal kegiatan gotong royong terpadu.',
      focus: 'Ketertiban & Gotong Royong',
    },
    'RW 20': {
      desc: 'Membina keharmonisan sosial warga, memfasilitasi musyawarah kewilayahan, dan menyelaraskan agenda keagamaan.',
      focus: 'Harmoni & Keagamaan',
    },
    'RW 21': {
      desc: 'Mengawal ketahanan lingkungan, pemberdayaan keluarga posyandu, serta kegiatan pemuda di wilayah rukun warga.',
      focus: 'Posyandu & Pemuda',
    },
    'RW 39': {
      desc: 'Mengoordinasikan pemeliharaan sarana prasarana lingkungan, program kebersihan, dan silaturahmi antar-RT.',
      focus: 'Infrastruktur Lingkungan',
    },
  };

  // 3. Jajaran Ketua RT (9 Unit RT)
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
        'Pusat kegiatan ibadah shalat berjamaah lima waktu, pengajian berkala, majelis taklim, dan pelestarian tradisi adzan 4 orang muadzin serentak pada shalat Jumat.',
      fasilitasUtama: ['Ruang shalat utama', 'Serambi pengajian', 'Tempat wudhu terpisah', 'Sound system adzan'],
      icon: Landmark,
      color: {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
        iconBg: 'bg-emerald-100 text-emerald-800',
        borderHover: 'hover:border-emerald-300',
      },
    },
    {
      kategori: 'Pendidikan',
      namaDefault: 'Sekolah Dasar (SD) Jumeneng',
      jumlahDefault: '1 buah',
      deskripsi:
        'Institusi pendidikan dasar formal yang mencerdaskan generasi penerus dusun dengan fasilitas belajar lengkap, pembinaan budi pekerti, dan karakter luhur.',
      fasilitasUtama: ['Ruang kelas memadai', 'Perpustakaan sekolah', 'Halaman upacara & bermain', 'Area olahraga'],
      icon: GraduationCap,
      color: {
        badge: 'bg-blue-50 text-blue-800 border-blue-200/80',
        iconBg: 'bg-blue-100 text-blue-800',
        borderHover: 'hover:border-blue-300',
      },
    },
    {
      kategori: 'Kesehatan',
      namaDefault: 'Posyandu Padukuhan',
      jumlahDefault: '1 tempat',
      deskripsi:
        'Layanan kesehatan terpadu berkala bagi balita dan lansia bersama bidan desa Kalurahan Sumberadi dan kader posyandu padukuhan.',
      fasilitasUtama: ['Timbangan balita & stadiometer', 'Tensimeter lansia', 'Pemberian Makanan Tambahan (PMT)', 'Buku register KMS'],
      icon: HeartPulse,
      color: {
        badge: 'bg-rose-50 text-rose-800 border-rose-200/80',
        iconBg: 'bg-rose-100 text-rose-800',
        borderHover: 'hover:border-rose-300',
      },
    },
    {
      kategori: 'Umum',
      namaDefault: 'Balai Dusun Jumeneng Kidul',
      jumlahDefault: '1 buah',
      deskripsi:
        'Sentra pertemuan serbaguna untuk musyawarah padukuhan (Musdus), koordinasi pengurus RT/RW, pelatihan warga, sosialisasi program kalurahan, serta hajatan warga.',
      fasilitasUtama: ['Pendopo pertemuan luas', 'Panggung serbaguna', 'Perlengkapan rapat', 'Halaman parkir warga'],
      icon: Building2,
      color: {
        badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
        iconBg: 'bg-amber-100 text-amber-800',
        borderHover: 'hover:border-amber-300',
      },
    },
    {
      kategori: 'Olahraga & Ekonomi',
      namaDefault: 'Lapangan Olahraga Warga',
      jumlahDefault: '1 buah',
      deskripsi:
        'Ruang terbuka aktif untuk kegiatan olahraga pemuda, turnamen bola voli dusun, senam kebugaran lansia/PKK, dan panggung perayaan hari kemerdekaan 17 Agustus.',
      fasilitasUtama: ['Lapangan terbuka rumput', 'Tiang gawang & net olahraga', 'Penerangan malam', 'Akses mudah warga'],
      icon: Trophy,
      color: {
        badge: 'bg-orange-50 text-orange-800 border-orange-200/80',
        iconBg: 'bg-orange-100 text-orange-800',
        borderHover: 'hover:border-orange-300',
      },
    },
    {
      kategori: 'Keamanan & Lingkungan',
      namaDefault: 'Pos Ronda & Siskamling',
      jumlahDefault: 'Tersedia di RT/RW',
      deskripsi:
        'Pos pengamanan swakarsa warga dengan jadwal ronda malam bergiliran demi menjaga keamanan, ketentraman lingkungan, dan kesiapsiagaan darurat.',
      fasilitasUtama: ['Kentongan kayu tradisi', 'Jadwal ronda bergilir warga', 'Senter patroli malam', 'Kotak P3K darurat'],
      icon: ShieldCheck,
      color: {
        badge: 'bg-teal-50 text-teal-800 border-teal-200/80',
        iconBg: 'bg-teal-100 text-teal-800',
        borderHover: 'hover:border-teal-300',
      },
    },
    {
      kategori: 'Lembaga Kemasyarakatan',
      namaDefault: 'PKK & Karang Taruna',
      jumlahDefault: 'Aktif di tiap unit',
      deskripsi:
        'Wadah kelembagaan pemberdayaan wanita keluarga (PKK) dalam ketahanan keluarga serta organisasi pemuda (Karang Taruna) dalam kegiatan sosial dan kemasyarakatan.',
      fasilitasUtama: ['Kelompok kerja PKK', 'Kegiatan pemuda & seni', 'Pemberdayaan UMKM wanita', 'Program kepemudaan'],
      icon: Users,
      color: {
        badge: 'bg-purple-50 text-purple-800 border-purple-200/80',
        iconBg: 'bg-purple-100 text-purple-800',
        borderHover: 'hover:border-purple-300',
      },
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
                Pemerintahan & Sarana
              </li>
            </ol>
          </nav>

          {/* Page Heading & Regional Descriptor */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Aparatur Pamong & Fasilitas Publik</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
              Pemerintahan Dusun & Sarana Wilayah
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
              Struktur organisasi aparatur pamong dusun, ketua lingkungan RW & RT, serta fasilitas publik yang mendukung kesejahteraan warga Padukuhan Jumeneng Kidul.
            </p>

            {/* Quick Navigation Anchor Bar */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="text-stone-400 uppercase tracking-wider text-[11px] mr-1">
                Lompat ke:
              </span>
              <a
                href="#kepala-dukuh"
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-200 transition-colors"
              >
                Kepala Dukuh
              </a>
              <a
                href="#jajaran-rw"
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-200 transition-colors"
              >
                Ketua RW (4 Wilayah)
              </a>
              <a
                href="#jajaran-rt"
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-200 transition-colors"
              >
                Ketua RT (9 Unit)
              </a>
              <a
                href="#sarana-prasarana"
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-200 transition-colors"
              >
                Sarana & Prasarana
              </a>
              <a
                href="#alur-pelayanan"
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-200 transition-colors"
              >
                Alur Layanan Warga
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* 2. PROFIL KEPALA DUKUH (Centerpiece Card) */}
        <section id="kepala-dukuh" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden p-6 sm:p-10 lg:p-12">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <Crown className="w-4 h-4 text-emerald-700" />
                <span>Pimpinan Wilayah Padukuhan</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 mb-8">
                Profil & Kepemimpinan Kepala Dukuh
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Kolom Kiri: Foto Resmi & Ringkasan Pamong */}
                <div className="lg:col-span-4 flex flex-col items-center">
                  <div className="relative w-full max-w-xs">
                    {/* Frame Foto dengan Fallback Elegan di Layer Bawah */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border-4 border-white shadow-md flex items-center justify-center">
                      {/* Fallback layer: Aktif jika gambar lambat/gagal termuat */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-100">
                        <div className="w-20 h-20 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center font-heading font-extrabold text-2xl shadow-inner mb-3">
                          EP
                        </div>
                        <span className="font-heading font-bold text-stone-900 text-base">
                          {dukuh.nama}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          Kepala Dukuh Jumeneng Kidul
                        </span>
                      </div>

                      {/* Foto Asli Kepala Dukuh */}
                      <img
                        src={dukuhPhotoUrl}
                        alt={`Bapak ${dukuh.nama} - Kepala Dukuh Jumeneng Kidul`}
                        loading="lazy"
                        decoding="async"
                        className="relative z-10 w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Badge Status Pamong */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-emerald-800 text-amber-300 text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 whitespace-nowrap border border-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Pamong Padukuhan</span>
                    </div>
                  </div>

                  {/* Ringkasan Administrasi Dukuh */}
                  <div className="w-full max-w-xs mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Nama Lengkap:</span>
                      <span className="font-bold text-stone-900">{dukuh.nama}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Jabatan:</span>
                      <span className="font-semibold text-emerald-800">Kepala Dukuh</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Wilayah Binaan:</span>
                      <span className="font-semibold text-stone-800">4 RW & 9 RT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Kalurahan:</span>
                      <span className="font-semibold text-stone-800">Sumberadi, Mlati</span>
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Narasi Tugas, Wewenang, & 4 Nilai Kepemimpinan */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold mb-2">
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                      <span>Amanah Mengabdi untuk Warga Dusun</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-950">
                      Bapak {dukuh.nama}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-800">
                      Kepala Dukuh Jumeneng Kidul, Sumberadi, Mlati, Sleman
                    </p>
                  </div>

                  {/* Narasi Wewenang & Tugas Pokok */}
                  <div className="space-y-3.5 text-stone-700 text-sm sm:text-base leading-relaxed">
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
                    <p>
                      Melanjutkan keteladanan pendiri dusun Kyai Nur Jumeneng, kepemimpinan beliau senantiasa mengedepankan
                      pendekatan musyawarah mufakat, mendorong partisipasi pemuda dan kaum wanita, serta merawat
                      kearifan lokal gotong royong warga.
                    </p>
                  </div>

                  {/* 4 Nilai Kepemimpinan Dusun */}
                  <div className="pt-4 border-t border-stone-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                      4 Nilai Utama Kepemimpinan Pamong:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <div className="flex items-center gap-2 font-bold text-stone-950 text-sm mb-1">
                          <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <span>Amanah & Tanggung Jawab</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Menjalankan mandat kepercayaan warga dengan ketulusan hati, integritas moral, dan kedisiplinan penuh.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <div className="flex items-center gap-2 font-bold text-stone-950 text-sm mb-1">
                          <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center text-xs">
                            <HeartHandshake className="w-3.5 h-3.5" />
                          </div>
                          <span>Guyub Rukun</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Merawat persaudaraan dan keharmonisan sosial antarkeluarga dan antarlingkungan tanpa membeda-bedakan.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <div className="flex items-center gap-2 font-bold text-stone-950 text-sm mb-1">
                          <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center text-xs">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <span>Transparan & Akuntabel</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Keterbukaan informasi program kerja padukuhan, musyawarah anggaran, dan keputusan pembangunan warga.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <div className="flex items-center gap-2 font-bold text-stone-950 text-sm mb-1">
                          <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span>Melayani Warga</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Senantiasa hadir tanggap, ramah, dan solutif membantu kebutuhan administrasi dan sosial masyarakat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. JAJARAN KETUA RW (Rukun Warga - 4 Wilayah) */}
        <section id="jajaran-rw" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Pamong Wilayah Antar-RT</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight">
                Jajaran Ketua Rukun Warga (RW)
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                Empat koordinator wilayah Rukun Warga yang mengampu koordinasi ketertiban, keharmonisan sosial, dan sinkronisasi program padukuhan di masing-masing teritori.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {effectiveRw.map((rw, idx) => {
                const rwCode = rw.jabatan.replace(/[^0-9]/g, '');
                const rwKey = `RW ${rwCode}`;
                const rwMeta = rwDescriptions[rwKey] || {
                  desc: 'Membina kerukunan dan mengkoordinasikan kegiatan lingkungan kemasyarakatan.',
                  focus: 'Pelayanan Wilayah',
                };

                return (
                  <div
                    key={rw.id}
                    className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Header Badge RW */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {rw.jabatan}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center text-xs font-bold">
                          0{idx + 1}
                        </div>
                      </div>

                      {/* Nama Ketua RW */}
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-950 mb-1 leading-snug">
                        Bapak {formatName(rw.nama)}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-800 mb-3">
                        Ketua Rukun Warga {rwCode}
                      </p>

                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        {rwMeta.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-800">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>Fokus: {rwMeta.focus}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. JAJARAN KETUA RT (RT 01 s/d RT 09) */}
        <section id="jajaran-rt" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>Garda Terdepan Pelayanan Warga</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight">
                Jajaran Ketua Rukun Tetangga (RT 01 - RT 09)
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                Sembilan ketua unit RT yang mengabdi langsung di tengah permukiman warga, melayani administrasi pengantar kependudukan, serta memimpin kerukunan lingkungan harian.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {effectiveRt.map((rt) => {
                const rtNumber = rt.jabatan.replace(/[^0-9]/g, '');

                return (
                  <div
                    key={rt.id}
                    className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                  >
                    {/* Badge Nomor RT Elegan */}
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/80 flex flex-col items-center justify-center shrink-0 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
                        RT
                      </span>
                      <span className="font-heading font-extrabold text-base leading-none mt-0.5">
                        {rtNumber || rt.urutan}
                      </span>
                    </div>

                    {/* Identitas Ketua RT & Informasi Layanan */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[11px] font-semibold text-emerald-800 block uppercase tracking-wide">
                          {rt.jabatan}
                        </span>
                        <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          Aktif
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-stone-900 truncate">
                        Bapak {formatName(rt.nama)}
                      </h3>

                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        Layanan pengantar administrasi, ronda siskamling, dan kerja bakti kebersihan unit RT.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 5. SARANA & PRASARANA PUBLIK DUSUN (7 Kategori) */}
        <section id="sarana-prasarana" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <Landmark className="w-4 h-4 text-emerald-700" />
                <span>Infrastruktur & Layanan Publik</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight">
                Sarana & Prasarana Dusun (7 Kategori)
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                Fasilitas umum penunjang kebutuhan peribadatan, pendidikan dasar, kesehatan, olahraga, keamanan lingkungan, dan kelembagaan warga Padukuhan Jumeneng Kidul.
              </p>
            </div>

            {/* Grid 7 Kategori Fasilitas + 1 Kartu Pemeliharaan Swadaya */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {effectiveSarana.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 ${item.color.borderHover} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
                  >
                    <div>
                      {/* Top Header: Icon & Quantity Badge */}
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div
                          className={`w-12 h-12 rounded-2xl ${item.color.iconBg} flex items-center justify-center shadow-xs`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item.jumlah}</span>
                        </span>
                      </div>

                      {/* Kategori Label */}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Kategori {item.kategori}
                      </span>

                      {/* Nama Fasilitas */}
                      <h3 className="font-heading text-xl font-bold text-stone-950 mb-3">
                        {item.nama_fasilitas}
                      </h3>

                      {/* Deskripsi Fasilitas */}
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                        {item.deskripsi}
                      </p>

                      {/* Fitur Utama Sarana */}
                      <div className="space-y-1.5 pt-3 border-t border-stone-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Fasilitas / Aktivitas:
                        </span>
                        {item.fasilitasUtama.slice(0, 3).map((f, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-1.5 text-xs text-stone-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="text-[11px] text-emerald-800 font-semibold">
                        Fasilitas Aktif
                      </span>
                      <span className="text-[11px] text-stone-500">Jumeneng Kidul</span>
                    </div>
                  </div>
                );
              })}

              {/* Kartu Pemeliharaan & Gotong Royong Swadaya */}
              <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-emerald-900 to-stone-950 text-white flex flex-col justify-between shadow-md border border-emerald-800/80">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center mb-5">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                    Kearifan Lokal
                  </span>
                  <h3 className="font-heading text-xl font-bold mb-3 text-white">
                    Pemeliharaan Swadaya Dusun
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-4">
                    Seluruh sarana prasarana publik dipelihara secara rutin melalui tradisi kerja bakti gotong royong dan iuran swadaya warga agar senantiasa bersih, aman, dan nyaman digunakan bersama.
                  </p>

                  <div className="space-y-2 text-xs text-emerald-200">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Kerja bakti selapanan (tiap 35 hari)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Pemeliharaan berkala sarana ibadah & balai</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Piket siskamling ronda malam warga</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-800/70 flex items-center gap-1.5 text-xs text-emerald-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Milik Bersama Warga Dusun</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 6. PANDUAN ALUR LAYANAN ADMINISTRASI WARGA */}
        <section id="alur-pelayanan" className="scroll-mt-24">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Pelayanan Administrasi Terpadu</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 mb-4">
                Alur Pengurusan Administrasi Warga
              </h2>
              <p className="text-sm sm:text-base text-stone-600 max-w-3xl mb-8 leading-relaxed">
                Untuk kemudahan pengurusan surat pengantar kependudukan (KTP, Kartu Keluarga, Surat Keterangan Domisili, dll), warga dapat mengikuti 3 langkah berjenjang berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-heading font-extrabold text-base flex items-center justify-center mb-4">
                    1
                  </div>
                  <h3 className="font-heading font-bold text-lg text-stone-950 mb-2">
                    Surat Pengantar RT
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Menghubungi Ketua RT setempat sesuai domisili dengan membawa salinan KTP & KK untuk mendapatkan Surat Pengantar RT.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-heading font-extrabold text-base flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="font-heading font-bold text-lg text-stone-950 mb-2">
                    Verifikasi Wilayah RW
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Membawa berkas pengantar RT kepada Ketua RW untuk ditandatangani dan dicatat dalam buku registrasi kewilayahan.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-heading font-extrabold text-base flex items-center justify-center mb-4">
                    3
                  </div>
                  <h3 className="font-heading font-bold text-lg text-stone-950 mb-2">
                    Pengesahan Dukuh & Kalurahan
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Menghadap Kepala Dukuh atau langsung ke loket pelayanan Kantor Kalurahan Sumberadi untuk penerbitan dokumen resmi final.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-950 font-medium">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Pelayanan ramah, cepat, dan mengedepankan prinsip keterbukaan bagi seluruh warga dusun.</span>
                </div>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0"
                >
                  <span>Hubungi Kontak Sekretariat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
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
              Lanjutkan membaca potensi unggulan serta layanan kontak Padukuhan Jumeneng Kidul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/potensi"
              className="group p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Sprout className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1">
                  Potensi & UMKM Unggulan
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Eksplorasi sentra industri emping melinjo, areal pertanian padi subur lereng Merapi, dan peternakan domba warga.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 group-hover:text-emerald-900">
                <span>Eksplorasi Potensi Dusun</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/profil"
              className="group p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors mb-1">
                  Profil & Sejarah Dusun
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Kisah sejarah ketokohan Kyai Nur Jumeneng, asal-usul pemekaran wilayah, visi pembangunan, dan demografi warga.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                <span>Baca Riwayat Sejarah</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/kontak"
              className="group p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 border border-teal-200/70 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-stone-900 group-hover:text-teal-800 transition-colors mb-1">
                  Layanan Warga & Kontak
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Hubungi kontak resmi pamong dusun, sampaikan aspirasi warga secara digital, atau cek rute peta lokasi padukuhan.
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
