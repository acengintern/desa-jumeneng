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
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 text-center">
        <ScrollReveal direction="up">
          {/* Location Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-medium tracking-wide mb-6 backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 text-balance">
            Padukuhan Jumeneng Kidul
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 leading-relaxed max-w-2xl mx-auto mb-9 font-normal text-balance">
            Mewujudkan padukuhan mandiri, guyub rukun, dan berdaya berbasis kearifan lokal.
          </p>

          {/* 2 CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/profil"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              <span>Jelajahi Padukuhan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/25 font-semibold text-sm sm:text-base backdrop-blur-xs transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Layanan & Kontak</span>
            </Link>
          </div>

          {/* Trust Indicator */}
          <div className="inline-flex items-center gap-2 text-xs text-emerald-200/80 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Portal Informasi & Pelayanan Administrasi Warga Terpadu</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
