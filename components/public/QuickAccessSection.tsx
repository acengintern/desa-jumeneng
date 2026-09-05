import React from 'react';
import Link from 'next/link';
import { Compass, Users, Sprout, MessageSquare, ChevronRight } from 'lucide-react';

const SHORTCUTS = [
  {
    title: 'Profil Padukuhan',
    href: '/profil',
    description: 'Riwayat asal-usul, visi misi, dan karakteristik wilayah.',
    icon: Compass,
  },
  {
    title: 'Pemerintahan Dusun',
    href: '/pemerintahan',
    description: 'Pamong dukuh, kepengurusan RW, dan struktur 9 RT.',
    icon: Users,
  },
  {
    title: 'Potensi Wilayah',
    href: '/potensi',
    description: 'Pertanian, sentra UMKM emping, dan peternakan.',
    icon: Sprout,
  },
  {
    title: 'Layanan Warga',
    href: '/kontak',
    description: 'Kontak sekretariat, aspirasi warga, dan lokasi.',
    icon: MessageSquare,
  },
];

export function QuickAccessSection() {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="sr-only">Akses Cepat Layanan Padukuhan Jumeneng Kidul</h2>
      <div className="bg-white border border-stone-200 rounded-lg shadow-xs overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
        {SHORTCUTS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group p-4 sm:p-5 hover:bg-stone-50/80 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 text-emerald-800 shrink-0" />
                    <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 group-hover:text-emerald-900 transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
