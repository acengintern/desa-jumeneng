'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Crown,
  Users,
  UserCheck,
  MapPin,
  Award,
  Sparkles,
} from 'lucide-react';
import { PengurusDusun } from '@/lib/types';

interface PemdesSectionProps {
  pengurus?: PengurusDusun[];
}

export function PemdesSection({ pengurus = [] }: PemdesSectionProps) {
  const [imageError, setImageError] = useState(false);

  // Filter pengurus berdasarkan kategori atau fallback ke data default
  const dukuh = pengurus.find((p) => p.kategori === 'dukuh') || {
    id: 'dukuh-1',
    nama: 'Edhy Purwanta',
    jabatan: 'Kepala Dukuh Jumeneng Kidul',
    kategori: 'dukuh' as const,
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png',
    urutan: 1,
  };

  const rwList = pengurus
    .filter((p) => p.kategori === 'rw')
    .sort((a, b) => a.urutan - b.urutan);

  const defaultRwList: PengurusDusun[] = [
    { id: 'rw-19', nama: 'Ngabidi', jabatan: 'Ketua RW 19', kategori: 'rw', urutan: 2 },
    { id: 'rw-20', nama: 'Moh Idris', jabatan: 'Ketua RW 20', kategori: 'rw', urutan: 5 },
    { id: 'rw-21', nama: 'Mujiman', jabatan: 'Ketua RW 21', kategori: 'rw', urutan: 8 },
    { id: 'rw-39', nama: 'Misbakhul Anam', jabatan: 'Ketua RW 39', kategori: 'rw', urutan: 11 },
  ];

  const effectiveRw = rwList.length > 0 ? rwList : defaultRwList;

  const rtList = pengurus
    .filter((p) => p.kategori === 'rt')
    .sort((a, b) => a.urutan - b.urutan);

  const defaultRtList: PengurusDusun[] = [
    { id: 'rt-01', nama: 'Fastabiq Ahmad', jabatan: 'Ketua RT 01', kategori: 'rt', urutan: 3 },
    { id: 'rt-02', nama: 'Usman Slamet', jabatan: 'Ketua RT 02', kategori: 'rt', urutan: 4 },
    { id: 'rt-03', nama: 'Darojat Hilal Fatah', jabatan: 'Ketua RT 03', kategori: 'rt', urutan: 6 },
    { id: 'rt-04', nama: 'Dahri Iskandar', jabatan: 'Ketua RT 04', kategori: 'rt', urutan: 7 },
    { id: 'rt-05', nama: 'Hardiyanto', jabatan: 'Ketua RT 05', kategori: 'rt', urutan: 9 },
    { id: 'rt-06', nama: 'Sukirdi', jabatan: 'Ketua RT 06', kategori: 'rt', urutan: 10 },
    { id: 'rt-07', nama: 'Irawan Wibowo', jabatan: 'Ketua RT 07', kategori: 'rt', urutan: 12 },
    { id: 'rt-08', nama: 'Lilik Sunarsa', jabatan: 'Ketua RT 08', kategori: 'rt', urutan: 13 },
    { id: 'rt-09', nama: 'Masrul Indrayana', jabatan: 'Ketua RT 09', kategori: 'rt', urutan: 14 },
  ];

  const effectiveRt = rtList.length > 0 ? rtList : defaultRtList;

  // Helper untuk format nama berhuruf kapital rapi
  const formatName = (str: string) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <section id="pemerintahan" className="py-20 lg:py-28 bg-slate-50/70 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Pemerintahan Dusun</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Struktur Pengurus Wilayah
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Aparatur pamong dan jajaran ketua lingkungan yang berdedikasi melayani serta
            menjaga keharmonisan warga Padukuhan Jumeneng Kidul.
          </p>
        </div>

        {/* 1. HIERARKI UTAMA: KEPALA DUKUH (Centerpiece Card) */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="relative rounded-3xl bg-white border border-emerald-200/90 shadow-xl shadow-emerald-950/5 overflow-hidden p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:border-emerald-400">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Foto Kepala Dukuh dengan Frame Menarik */}
              <div className="relative shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-amber-100 border-4 border-white shadow-lg flex items-center justify-center">
                  {!imageError && dukuh.foto_url ? (
                    <img
                      src={dukuh.foto_url}
                      alt={dukuh.nama}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center mb-2 shadow-inner">
                        <Crown className="w-8 h-8" />
                      </div>
                      <span className="font-heading font-bold text-emerald-900 text-lg">EP</span>
                    </div>
                  )}
                </div>

                {/* Badge Status Terverifikasi */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-emerald-800 text-amber-300 text-[11px] font-bold rounded-md shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pamong Dusun</span>
                </div>
              </div>

              {/* Detail Profil & Narasi Tugas Kepala Dukuh */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pemimpin Wilayah Padukuhan</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-950 mb-1">
                  {dukuh.nama}
                </h3>
                <p className="text-sm font-semibold text-emerald-700 mb-4">
                  Kepala Dukuh Jumeneng Kidul
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Mengayomi kerukunan warga, mengkoordinasikan kegiatan kelembagaan RT dan RW,
                  serta memimpin penyelenggaraan administrasi dan pembangunan berkelanjutan
                  di lingkungan Padukuhan Jumeneng Kidul.
                </p>

                {/* Tag Nilai Kepemimpinan */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Amanah & Melayani
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Gotong Royong
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Transparan & Inklusif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. JAJARAN KETUA RW (4 Kolom) */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950">
                Jajaran Ketua Rukun Warga (RW)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Koordinator lingkungan rukun warga 19, 20, 21, dan 39
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {effectiveRw.map((rw) => (
              <div
                key={rw.id}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100/90 shadow-xs hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* RW Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-200">
                      {rw.jabatan}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 border border-teal-200/60 flex items-center justify-center text-xs font-semibold group-hover:bg-teal-800 group-hover:text-white transition-colors">
                      RW
                    </div>
                  </div>

                  {/* Nama Pengurus RW */}
                  <h4 className="font-heading text-lg font-bold text-emerald-950 mb-1 leading-snug">
                    {formatName(rw.nama)}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Ketua Wilayah {rw.jabatan.replace('Ketua ', '')}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>Padukuhan Jumeneng Kidul</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. JAJARAN KETUA RT 01 s/d RT 09 (Grid 3x3 Kolom) */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950">
                Jajaran Ketua Rukun Tetangga (RT)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Garda terdepan pelayanan warga di tingkat unit RT 01 s/d RT 09
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {effectiveRt.map((rt) => {
              // Ekstrak nomor RT (misal "01" dari "Ketua RT 01")
              const rtNumber = rt.jabatan.replace(/[^0-9]/g, '');

              return (
                <div
                  key={rt.id}
                  className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
                >
                  {/* Badge Nomor RT Kotak Modern */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-emerald-800 group-hover:text-amber-300 group-hover:border-emerald-800 transition-colors duration-200 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">RT</span>
                    <span className="font-heading font-extrabold text-base leading-none mt-0.5">
                      {rtNumber || rt.urutan}
                    </span>
                  </div>

                  {/* Info Nama dan Wilayah */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-emerald-700 block uppercase tracking-wide">
                      {rt.jabatan}
                    </span>
                    <h4 className="font-heading font-bold text-base text-slate-800 truncate group-hover:text-emerald-950 transition-colors">
                      {formatName(rt.nama)}
                    </h4>
                    <p className="text-[12px] text-slate-400">Pamong Wilayah Jumeneng Kidul</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-100 text-xs text-slate-600 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              Total 14 aparatur pengurus siap mendukung pelayanan dan kegiatan masyarakat.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
