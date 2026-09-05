import React from 'react';
import {
  BookOpen,
  MapPin,
  HeartHandshake,
  Sparkles,
  Sprout,
  Compass,
  CheckCircle2,
  Users,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { ProfilDesa, StatistikKependudukan } from '@/lib/types';

interface ProfilSectionProps {
  profil: ProfilDesa;
  statistik: StatistikKependudukan;
}

export function ProfilSection({ profil, statistik }: ProfilSectionProps) {
  // Hitung rasio gender secara dinamis
  const total = statistik.total_penduduk || 1659;
  const pria = statistik.jumlah_laki_laki || 852;
  const wanita = statistik.jumlah_perempuan || 805;
  const priaPersen = Math.round((pria / total) * 100);
  const wanitaPersen = 100 - priaPersen;

  const karakteristikList = [
    {
      title: 'Wilayah Sumberadi',
      desc: 'Berada di wilayah administratif Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.',
      icon: MapPin,
      color: 'text-emerald-700 bg-emerald-100',
    },
    {
      title: 'Semangat Gotong Royong',
      desc: 'Kultur sosial guyub rukun yang senantiasa terjaga dalam kegiatan sambatan, kerja bakti, dan perayaan kebersamaan warga.',
      icon: HeartHandshake,
      color: 'text-amber-700 bg-amber-100',
    },
    {
      title: 'Keagamaan yang Kuat',
      desc: 'Harmoni kehidupan religius yang berakar dari ajaran sosok perintis Kyai Nur Jumeneng, berpusat pada masjid dan mushola.',
      icon: Sparkles,
      color: 'text-teal-700 bg-teal-100',
    },
    {
      title: 'Lingkungan Pedesaan Asri',
      desc: 'Bentang persawahan hijau, saluran irigasi subur, serta pepohonan rindang menghadirkan ketenangan khas pedesaan Sleman.',
      icon: Sprout,
      color: 'text-emerald-700 bg-emerald-100',
    },
  ];

  const defaultMisi = [
    'Mengembangkan potensi pertanian dan usaha lokal warga.',
    'Meningkatkan kualitas pendidikan dan kesehatan masyarakat.',
    'Melestarikan tradisi dan budaya dusun.',
    'Mendorong partisipasi aktif warga dalam pembangunan.',
  ];

  const misiList = profil.misi && profil.misi.length > 0 ? profil.misi : defaultMisi;

  return (
    <section id="profil" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 mb-4">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            Tentang Wilayah
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Profil & Demografi Padukuhan
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Mengenal lebih dekat warisan sejarah, falsafah visi misi, dan gambaran demografi
            masyarakat Padukuhan Jumeneng Kidul.
          </p>
        </div>

        {/* 1. SEJARAH & KARAKTERISTIK DUSUN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Kolom Kiri: Narasi Sejarah */}
          <div className="lg:col-span-6 bg-emerald-50/50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-100/80 shadow-xs relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-800 text-amber-300 shadow-sm shadow-emerald-950/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Asal-Usul & Sejarah
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950">
                  Riwayat Kyai Nur Jumeneng
                </h3>
              </div>
            </div>

            <div className="prose prose-emerald text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Padukuhan Jumeneng Kidul bermula dari wilayah padukuhan besar yang dikenal
                sebagai <strong>Jumeneng Gedhe</strong>. Seiring pertambahan jumlah penduduk,
                perkembangan peradaban, dan penataan tata ruang pemerintahan Kalurahan
                Sumberadi, wilayah ini kemudian dimekarkan secara harmonis menjadi dua bagian:
                <strong> Jumeneng Lor</strong> (bagian utara) dan{' '}
                <strong>Jumeneng Kidul</strong> (bagian selatan).
              </p>
              <p>
                Nama <em>&ldquo;Jumeneng&rdquo;</em> diambil dari sosok tokoh perintis agung
                wilayah ini, yakni <strong>Kyai Nur Jumeneng</strong>. Petuah luhur, keteladanan
                akhlak, dan pengaruh beliau terhadap kehidupan sosial keagamaan warga senantiasa
                hidup dan mewarnai denyut nadi masyarakat hingga saat ini.
              </p>
            </div>

            {/* Quote Highlight Box */}
            <div className="mt-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-xs">
              <p className="text-xs sm:text-sm font-medium italic text-amber-950 leading-relaxed">
                &ldquo;Semangat kerukunan dan kemandirian yang diwariskan Kyai Nur Jumeneng tetap
                menjadi pondasi teguh gotong royong masyarakat Jumeneng Kidul.&rdquo;
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-amber-900/80 font-semibold">
                <span>Nilai Luhur Leluhur Dusun</span>
                <span className="text-emerald-800 font-bold">Sumberadi, Mlati</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: 4 Karakteristik Dusun */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
            <div className="mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Pilar Kehidupan
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950">
                4 Karakteristik Utama Dusun
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Empat identitas kuat yang mencerminkan harmoni dan ketenteraman warga.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {karakteristikList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-emerald-950 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. VISI & MISI DUSUN */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Kartu Visi */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg shadow-emerald-950/20 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider mb-6">
                  Visi Padukuhan
                </span>
                <div className="text-amber-400 text-4xl font-serif leading-none mb-2">&ldquo;</div>
                <blockquote className="font-heading text-xl sm:text-2xl lg:text-2xl font-bold text-white leading-snug tracking-tight mb-6">
                  {profil.visi ||
                    'Menjadi dusun yang mandiri, guyub, dan berkemajuan berbasis potensi lokal dan nilai-nilai keagamaan.'}
                </blockquote>
              </div>

              <div className="pt-6 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200/80">
                <span>Arah Kebijakan Pembangunan</span>
                <span className="font-medium text-amber-300">Padukuhan Jumeneng Kidul</span>
              </div>
            </div>

            {/* Kartu Misi Terstruktur */}
            <div className="lg:col-span-7 bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Agenda Kerja Strategis
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950 mb-6">
                  Misi Pembangunan Dusun
                </h3>

                <div className="space-y-3.5">
                  {misiList.map((misi, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs hover:border-emerald-200 transition-colors"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-800 text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed pt-0.5">
                        {misi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-500 mt-6 pt-4 border-t border-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Seluruh program kerja diselaraskan dengan RPJM Kalurahan Sumberadi.
              </p>
            </div>
          </div>
        </div>

        {/* 3. DEMOGRAFI & RASIO GENDER */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 rounded-3xl p-6 sm:p-10 border border-emerald-100/90 shadow-xs mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Statistik Kependudukan
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">
              Komposisi & Rasio Gender Penduduk
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Berdasarkan pemutakhiran data kependudukan Padukuhan Jumeneng Kidul, total penduduk
              tercatat sebanyak <strong>{total.toLocaleString('id-ID')} jiwa</strong> yang
              terhimpun dalam <strong>{statistik.kepala_keluarga} Kepala Keluarga</strong>.
            </p>
          </div>

          {/* Dual Visual Bar Chart */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100/80 shadow-xs mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Visualisasi Proporsi Gender
              </span>
              <span className="text-xs font-medium text-slate-600">
                Total:{' '}
                <strong className="text-emerald-950 font-bold">
                  {total.toLocaleString('id-ID')} Jiwa
                </strong>
              </span>
            </div>

            {/* Split Bar */}
            <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
              <div
                style={{ width: `${priaPersen}%` }}
                className="h-full bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-l-lg flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
                title={`Laki-laki: ${pria} jiwa (${priaPersen}%)`}
              >
                {priaPersen}%
              </div>
              <div
                style={{ width: `${wanitaPersen}%` }}
                className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-r-lg flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
                title={`Perempuan: ${wanita} jiwa (${wanitaPersen}%)`}
              >
                {wanitaPersen}%
              </div>
            </div>

            {/* Legend & Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Laki-laki */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                      Laki-Laki
                    </span>
                    <span className="text-xs text-slate-500">
                      Mayoritas usia produktif
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-900">
                    {pria.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-slate-600">jiwa</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">
                    {priaPersen}% dari total
                  </span>
                </div>
              </div>

              {/* Perempuan */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-amber-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                      Perempuan
                    </span>
                    <span className="text-xs text-slate-500">
                      Peran aktif keluarga & posyandu
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading font-extrabold text-xl sm:text-2xl text-amber-900">
                    {wanita.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-slate-600">jiwa</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-700">
                    {wanitaPersen}% dari total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MATA PENCAHARIAN & LEMBAGA PENDIDIKAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Mata Pencaharian */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Sosio-Ekonomi Warga
                </span>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-emerald-950">
                  Mata Pencaharian Utama
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {profil.mata_pencaharian_desc ||
                'Sebagian besar warga bermata pencaharian sebagai petani, buruh, dan pelaku UMKM.'}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Pertanian Padi & Hortikultura
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-900 border border-amber-100">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Pelaku UMKM & Warung Desa
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                Buruh Bangunan & Jasa
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-900 border border-teal-100">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                Peternakan Domba & Unggas
              </span>
            </div>
          </div>

          {/* Card Lembaga Pendidikan */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Fasilitas Generasi Bangsa
                </span>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-emerald-950">
                  Lembaga Pendidikan di Wilayah
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Akses pendidikan usia dini dan dasar yang dekat dan memadai untuk mencerdaskan
              generasi penerus padukuhan:
            </p>

            <div className="space-y-3">
              {(profil.lembaga_pendidikan && profil.lembaga_pendidikan.length > 0
                ? profil.lembaga_pendidikan
                : ['TK / PAUD', 'Sekolah Dasar Jumeneng']
              ).map((sekolah, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-emerald-950 block">
                        {sekolah}
                      </span>
                      <span className="text-xs text-slate-500">
                        Pendidikan Tingkat {idx === 0 ? 'Usia Dini' : 'Dasar'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    Aktif
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
