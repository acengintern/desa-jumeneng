import React from 'react';
import { StatistikKependudukan } from '@/lib/types';
import { ScrollReveal } from './ScrollReveal';

interface StatistikBarSectionProps {
  statistik?: StatistikKependudukan;
}

export function StatistikBarSection({ statistik }: StatistikBarSectionProps) {
  const stats = [
    {
      value: (statistik?.total_penduduk ?? 1659).toLocaleString('id-ID'),
      label: 'Penduduk Jiwa',
      sublabel: 'Total Warga Terdata',
    },
    {
      value: (statistik?.kepala_keluarga ?? 527).toLocaleString('id-ID'),
      label: 'Kepala Keluarga (KK)',
      sublabel: 'Rumah Tangga',
    },
    {
      value: (statistik?.jumlah_rt ?? 9).toString(),
      label: 'Rukun Tetangga (RT)',
      sublabel: 'RT 01 s/d RT 09',
    },
    {
      value: (statistik?.jumlah_rw ?? 5).toString(),
      label: 'Rukun Warga (RW)',
      sublabel: 'Satuan RW & Kring',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-stone-50/60 border-y border-slate-200/70 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Statistik Pokok Kependudukan Jumeneng Kidul</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-slate-200/80">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 60}>
              <div className="text-center lg:px-6">
                <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-emerald-950 tracking-tight leading-none mb-2">
                  {stat.value}
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-800">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {stat.sublabel}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
