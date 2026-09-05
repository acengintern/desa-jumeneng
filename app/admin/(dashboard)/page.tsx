import Link from 'next/link';
import {
  Newspaper,
  Image as ImageIcon,
  Users,
  Building2,
  Sprout,
  Mail,
  ArrowRight,
  PlusCircle,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  Calendar,
} from 'lucide-react';
import {
  getDashboardStats,
  getPotensi,
  getPesanKontak,
  getBerita,
  getStatistik,
} from '@/lib/data-service';
import { formatTanggalIndonesia } from '@/lib/date-utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [stats, potensiList, pesanList, beritaList, statistik] = await Promise.all([
    getDashboardStats(),
    getPotensi(),
    getPesanKontak(),
    getBerita(),
    getStatistik(),
  ]);

  const recentPesan = pesanList.slice(0, 4);
  const recentBerita = beritaList.slice(0, 4);

  // 6 Kartu Metrik Ringkasan
  const metricCards = [
    {
      title: 'Total Berita Terbit',
      value: stats.totalBerita,
      unit: 'Artikel Publikasi',
      description: 'Warta kegiatan aktif terpublikasi',
      href: '/admin/berita',
      icon: Newspaper,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
      iconColor: 'text-emerald-600 bg-emerald-100',
    },
    {
      title: 'Total Foto Galeri',
      value: stats.totalGaleri,
      unit: 'Dokumentasi',
      description: 'Foto arsip kegiatan padukuhan',
      href: '/admin/galeri',
      icon: ImageIcon,
      color: 'text-sky-700 bg-sky-50 border-sky-200/80',
      iconColor: 'text-sky-600 bg-sky-100',
    },
    {
      title: 'Pengurus Dusun',
      value: stats.totalPengurus,
      unit: 'Aparatur / Petugas',
      description: 'Dukuh, RW 21-22 & RT 01-06',
      href: '/admin/struktur',
      icon: Users,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200/80',
      iconColor: 'text-indigo-600 bg-indigo-100',
    },
    {
      title: 'Sarana & Prasarana',
      value: stats.totalSarana,
      unit: 'Kategori Fasilitas',
      description: 'Fasilitas umum & keagamaan',
      href: '/admin/sarana',
      icon: Building2,
      color: 'text-amber-700 bg-amber-50 border-amber-200/80',
      iconColor: 'text-amber-600 bg-amber-100',
    },
    {
      title: 'Potensi Wilayah',
      value: potensiList.length,
      unit: 'Sektor Unggulan',
      description: 'Pertanian, UMKM, Kerajinan',
      href: '/admin/potensi',
      icon: Sprout,
      color: 'text-teal-700 bg-teal-50 border-teal-200/80',
      iconColor: 'text-teal-600 bg-teal-100',
    },
    {
      title: 'Kotak Masuk Pesan',
      value: stats.totalPesan,
      unit: stats.pesanBelumDibaca > 0 ? `${stats.pesanBelumDibaca} Baru` : 'Aspirasi',
      description:
        stats.pesanBelumDibaca > 0
          ? `${stats.pesanBelumDibaca} pesan belum ditinjau`
          : 'Semua aspirasi telah ditinjau',
      href: '/admin/pesan',
      icon: Mail,
      color:
        stats.pesanBelumDibaca > 0
          ? 'text-rose-700 bg-rose-50 border-rose-300'
          : 'text-purple-700 bg-purple-50 border-purple-200/80',
      iconColor:
        stats.pesanBelumDibaca > 0
          ? 'text-rose-600 bg-rose-100'
          : 'text-purple-600 bg-purple-100',
      highlightBadge: stats.pesanBelumDibaca > 0 ? stats.pesanBelumDibaca : null,
    },
  ];

  // Quick Action Buttons
  const quickActions = [
    {
      label: 'Tulis Berita Baru',
      href: '/admin/berita',
      icon: PlusCircle,
      desc: 'Publikasi warta dusun terkini',
    },
    {
      label: 'Unggah Foto Galeri',
      href: '/admin/galeri',
      icon: ImageIcon,
      desc: 'Tambahkan dokumentasi kegiatan',
    },
    {
      label: 'Kelola Pengurus RT/RW',
      href: '/admin/struktur',
      icon: Users,
      desc: 'Perbarui data 14 aparatur dusun',
    },
    {
      label: 'Cek Pesan Warga',
      href: '/admin/pesan',
      icon: Mail,
      desc: 'Tinjau aspirasi & pengaduan',
      badge: stats.pesanBelumDibaca > 0 ? `${stats.pesanBelumDibaca} baru` : null,
    },
    {
      label: 'Perbarui Sarana Dusun',
      href: '/admin/sarana',
      icon: Building2,
      desc: 'Fasilitas ibadah & balai warga',
    },
    {
      label: 'Edit Profil & Visi Misi',
      href: '/admin/profil',
      icon: Sparkles,
      desc: 'Informasi dan data kependudukan',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Status Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Aktif & Terintegrasi
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white tracking-tight">
              Selamat Datang di Panel Pengurus Dusun
            </h2>
            <p className="mt-2 text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Kelola informasi profil, statistik kependudukan, dokumentasi, sarana prasarana, serta aspirasi warga Padukuhan Jumeneng Kidul secara terpadu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl px-4 py-3 text-xs">
              <div className="text-emerald-200 font-medium">Demografi Dusun</div>
              <div className="text-white font-bold text-sm mt-0.5">
                {statistik.total_penduduk.toLocaleString('id-ID')} Jiwa / {statistik.kepala_keluarga} KK
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm transition-all shadow-sm group cursor-pointer"
            >
              <span>Lihat Portal Publik</span>
              <ExternalLink className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 2. 6 Kartu Metrik Ringkasan */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold font-heading text-slate-900">
              Ringkasan Data Dusun
            </h3>
            <p className="text-xs text-slate-500">
              Status akumulasi data operasional portal sistem informasi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {metricCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl ${card.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.highlightBadge && (
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-rose-500 text-white shadow-xs">
                        {card.highlightBadge} Belum Dibaca
                      </span>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
                    {card.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    {card.unit}
                  </div>
                  <div className="text-xs text-slate-600 mt-2 line-clamp-1">
                    {card.description}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-emerald-700 transition-colors">
                  <span>Kelola rincian data</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Tombol Aksi Cepat (Quick Actions) */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
            Aksi Cepat Pengurus
          </h3>
          <p className="text-xs text-slate-500">
            Akses langsung ke formulir kelola konten dan konfigurasi utama
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="group relative flex flex-col items-center text-center p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/60 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer"
              >
                {action.badge && (
                  <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-amber-950 shadow-xs">
                    {action.badge}
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-emerald-300 group-hover:bg-emerald-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-all shadow-2xs mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 transition-colors">
                  {action.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                  {action.desc}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Bagian Cuplikan Konten (Pesan Terbaru & Berita Terkini) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Kolom A: Cuplikan Pesan Kontak Terbaru */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-700" />
                  Aspirasi & Pesan Warga Terbaru
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pesan masuk melalui form kontak portal publik
                </p>
              </div>
              <Link
                href="/admin/pesan"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
              >
                Lihat Semua
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentPesan.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-xs">
                Belum ada pesan kontak dari warga.
              </div>
            ) : (
              <div className="space-y-3">
                {recentPesan.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      !item.dibaca
                        ? 'bg-amber-50/50 border-amber-200/80 shadow-2xs'
                        : 'bg-slate-50 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                        {item.nama_pengirim}
                        {!item.dibaca && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                            Baru
                          </span>
                        )}
                      </div>
                      {item.created_at && (
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {formatTanggalIndonesia(item.created_at)}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 italic mb-2">
                      &ldquo;{item.pesan}&rdquo;
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/40">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{item.no_telepon || 'Tanpa nomor telepon'}</span>
                      </div>
                      <span
                        className={`font-medium ${
                          item.dibaca ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {item.dibaca ? 'Sudah Ditinjau' : 'Perlu Direspon'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/admin/pesan"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
            >
              Buka Seluruh Kotak Masuk Aspirasi ({stats.totalPesan} Total)
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Kolom B: Cuplikan Berita Dusun Terkini */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-emerald-700" />
                  Warta & Publikasi Dusun Terkini
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Berita dan kegiatan yang sedang tayang di portal publik
                </p>
              </div>
              <Link
                href="/admin/berita"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
              >
                Kelola Berita
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentBerita.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-xs">
                Belum ada artikel berita yang dipublikasikan.
              </div>
            ) : (
              <div className="space-y-3">
                {recentBerita.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {item.judul}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                        Terbit
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                      {item.ringkasan}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/40">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formatTanggalIndonesia(item.tanggal_publikasi)}</span>
                      </div>
                      <Link
                        href={`/admin/berita`}
                        className="text-emerald-700 font-semibold hover:underline"
                      >
                        Edit Warta
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/admin/berita"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
            >
              Kelola Semua Berita ({stats.totalBerita} Artikel)
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
