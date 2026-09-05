import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function SambutanDukuhSection() {
  const dukuhPhotoUrl =
    'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png';

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Dukuh Portrait Photo Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-xs sm:max-w-sm">
              <div className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200 aspect-[4/5]">
                <img
                  src={dukuhPhotoUrl}
                  alt="Edhy Purwanta - Kepala Dukuh Jumeneng Kidul"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Identification Typography (no badge) */}
              <div className="mt-3 text-center lg:text-left">
                <h3 className="font-heading font-bold text-lg text-stone-950">
                  Edhy Purwanta
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Kepala Dukuh Jumeneng Kidul
                </p>
              </div>
            </div>
          </div>

          {/* Sambutan Text Column */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="left">
              {/* Natural Title (no eyebrow pill) */}
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-2">
                Sambutan Kepala Dukuh
              </h2>
              <p className="font-medium text-emerald-900 text-base sm:text-lg mb-6">
                Membangun Padukuhan yang Guyub, Mandiri, dan Bermartabat
              </p>

              {/* Paragraphs */}
              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed mb-6">
                <p>
                  <span className="font-semibold text-stone-950">Sugeng rawuh</span> wonten ing
                  portal resmi Padukuhan Jumeneng Kidul. Melalui media digital ini, kami berikhtiar
                  menghadirkan keterbukaan informasi publik, kemudahan akses layanan bagi warga,
                  serta mengabarkan kegiatan sosial dan potensi padukuhan kami.
                </p>
                <p>
                  Padukuhan Jumeneng Kidul senantiasa menjunjung tinggi semangat gotong royong, guyub
                  rukun, dan kemandirian. Bersama para pamong dusun, pengurus RT, RW, dan seluruh
                  warga, kami berkomitmen merawat kelestarian lingkungan, memajukan perekonomian
                  lokal, serta menjaga nilai luhur warisan keagamaan dan budaya leluhur.
                </p>
                <p className="text-stone-600">
                  Semoga portal ini menjadi jembatan silaturahmi yang mempererat kebersamaan, baik
                  bagi warga di dusun maupun sedulur warga Jumeneng Kidul yang berada di perantauan.
                </p>
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm shadow-xs transition-colors active:scale-[0.98] min-h-[44px]"
                >
                  <span>Baca Profil Dusun Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
