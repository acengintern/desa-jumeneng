import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { ProfilDesa } from '@/lib/types';
import { ScrollReveal } from './ScrollReveal';

interface HeroSectionProps {
  profil?: ProfilDesa;
}

export function HeroSection({ profil }: HeroSectionProps) {
  const bgImageUrl =
    profil?.gambar_profil_url ||
    'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg';

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center">
      {/* Authentic Village Background Photo with Tone Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageUrl}
          alt="Pemandangan Padukuhan Jumeneng Kidul"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-35 filter saturate-90"
        />
        {/* Soft authentic gradient overlay - dark emerald & slate tint for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-emerald-950/85 to-stone-950/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center">
        <ScrollReveal direction="up">
          {/* Natural Location Subtitle (no pill, no capsule) */}
          <p className="text-xs sm:text-sm font-medium text-emerald-300 tracking-wide mb-3 sm:mb-4">
            Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta
          </p>

          {/* Headline (Responsive 30-48px) */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
            Padukuhan Jumeneng Kidul
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mx-auto mb-8 font-normal text-balance">
            Mewujudkan padukuhan mandiri, guyub rukun, dan berdaya berbasis kearifan lokal.
          </p>

          {/* 2 CTAs (Stacked on mobile, rounded-lg) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
            <Link
              href="/profil"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-xs transition-colors active:scale-[0.98] min-h-[44px]"
            >
              <span>Jelajahi Padukuhan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kontak"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base transition-colors active:scale-[0.98] min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Layanan & Kontak</span>
            </Link>
          </div>

          {/* Natural Plain Note (no capsule) */}
          <p className="text-xs text-stone-400">
            Portal Informasi & Pelayanan Administrasi Warga Terpadu
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
