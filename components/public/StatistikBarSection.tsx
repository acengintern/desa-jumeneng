import React from 'react';
import { StatistikKependudukan } from '@/lib/types';

interface StatistikBarSectionProps {
  statistik?: StatistikKependudukan;
}

export function StatistikBarSection({ statistik }: StatistikBarSectionProps) {
  const stats = [
    {
      value: (statistik?.total_penduduk ?? 1659).toLocaleString('id-ID'),
      label: 'Penduduk',
      sub: 'Jiwa Terdaftar',
    },
    {
      value: (statistik?.kepala_keluarga ?? 527).toLocaleString('id-ID'),
      label: 'Kepala Keluarga',
      sub: 'Kartu Keluarga (KK)',
    },
    {
      value: (statistik?.jumlah_rt ?? 9).toString(),
      label: 'RT',
      sub: 'Rukun Tetangga',
    },
    {
      value: (statistik?.jumlah_rw ?? 5).toString(),
      label: 'RW',
      sub: 'Rukun Warga',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-stone-50/70 border-y border-stone-200 mt-10 sm:mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Statistik Demografi Padukuhan Jumeneng Kidul</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-6 lg:divide-x lg:divide-stone-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center lg:px-4">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-emerald-950 tracking-tight leading-none mb-1.5">
                {stat.value}
              </div>
              <div className="font-bold text-sm sm:text-base text-stone-900">
                {stat.label}
              </div>
              <div className="text-xs text-stone-500 mt-0.5 font-normal">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
