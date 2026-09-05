import React from 'react';
import Link from 'next/link';
import { Compass, Users, Sprout, MessageSquare, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const SHORTCUTS = [
  {
    title: 'Profil Padukuhan',
    href: '/profil',
    description: 'Riwayat asal-usul, visi misi, dan karakteristik wilayah.',
    icon: Compass,
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  },
  {
    title: 'Pemerintahan Dusun',
    href: '/pemerintahan',
    description: 'Pamong dukuh, kepengurusan RW, dan struktur 9 RT.',
    icon: Users,
    accentBg: 'bg-teal-50 text-teal-800 border-teal-200/60',
  },
  {
    title: 'Potensi Wilayah',
    href: '/potensi',
    description: 'Pertanian, sentra UMKM emping, dan peternakan.',
    icon: Sprout,
    accentBg: 'bg-amber-50 text-amber-900 border-amber-200/60',
  },
  {
    title: 'Layanan Warga',
    href: '/kontak',
    description: 'Kontak sekretariat, aspirasi warga, dan lokasi.',
    icon: MessageSquare,
    accentBg: 'bg-stone-100 text-stone-800 border-stone-200',
  },
];

export function QuickAccessSection() {
  return (
    <section className="relative z-20 -mt-7 sm:-mt-9 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="sr-only">Akses Cepat Layanan Padukuhan Jumeneng Kidul</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SHORTCUTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.href} direction="up" delay={idx * 60}>
              <Link
                href={item.href}
                className="group p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-600/40 hover:bg-emerald-50/25 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full min-h-[120px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.accentBg} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
