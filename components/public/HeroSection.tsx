import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center">
      {/* Authentic Village Background Photo with Eager LCP Loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt="Pemandangan Padukuhan Jumeneng Kidul"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center opacity-30 saturate-90"
        />
        {/* Soft authentic gradient overlay - dark emerald & stone tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 text-center">
        <ScrollReveal direction="up">
          {/* Location Subtitle */}
          <p className="text-xs sm:text-sm font-medium text-emerald-300/90 tracking-wide mb-2 sm:mb-3">
            Kalurahan Sumberadi, Kapanewon Mlati, Sleman, D.I. Yogyakarta
          </p>

          {/* Headline with fluid clamp typography */}
          <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-4 text-balance">
            Padukuhan Jumeneng Kidul
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-normal text-balance">
            Mewujudkan padukuhan yang mandiri, guyub rukun, dan berdaya berbasis kearifan lokal.
          </p>

          {/* 2 CTAs (Stacked on mobile, side-by-side on tablet/desktop) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-5 max-w-md mx-auto sm:max-w-none">
            <Link
              href="/profil"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-2xs transition-colors active:scale-[0.98] min-h-[44px]"
            >
              <span>Jelajahi Padukuhan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kontak"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-colors active:scale-[0.98] min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Layanan & Kontak</span>
            </Link>
          </div>

          {/* Note */}
          <p className="text-[11px] sm:text-xs text-stone-400 font-normal">
            Portal Informasi & Pelayanan Administrasi Warga Terpadu
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
