import React from 'react';
import Link from 'next/link';
import { ArrowRight, Quote, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function SambutanDukuhSection() {
  const dukuhPhotoUrl =
    'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Dukuh Portrait Photo Column */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="right" className="w-full max-w-sm sm:max-w-md">
              <div className="relative">
                {/* Clean portrait frame */}
                <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-slate-200/90 shadow-md aspect-[4/5] sm:aspect-[3/4]">
                  <img
                    src={dukuhPhotoUrl}
                    alt="Bapak Edhy Purwanta - Kepala Dukuh Jumeneng Kidul"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle lower gradient for caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  {/* Identification Tag */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-700/90 text-white text-[11px] font-semibold mb-1.5 backdrop-blur-xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>Pamong Padukuhan</span>
                    </div>
                    <div className="font-heading font-bold text-xl sm:text-2xl text-white">
                      Edhy Purwanta
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-200/90 font-medium">
                      Kepala Dukuh Jumeneng Kidul
                    </div>
                  </div>
                </div>

                {/* Subtle decorative quote accent */}
                <div className="hidden sm:flex absolute -bottom-4 -right-4 w-14 h-14 rounded-2xl bg-emerald-800 text-white items-center justify-center shadow-md border-2 border-white">
                  <Quote className="w-7 h-7 text-emerald-100" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sambutan Text Column */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
                <Quote className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sambutan Kepala Dukuh</span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Membangun Padukuhan yang Guyub, Mandiri, dan Bermartabat
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed mb-8">
                <p>
                  <span className="font-semibold text-emerald-950">Sugeng rawuh</span> wonten ing
                  portal resmi Padukuhan Jumeneng Kidul. Melalui media digital ini, kami berikhtiar
                  menghadirkan keterbukaan informasi publik, kemudahan akses layanan bagi warga,
                  serta mempublikasikan berbagai potensi lokal dan kegiatan sosial kemasyarakatan di
                  wilayah kami.
                </p>
                <p>
                  Padukuhan Jumeneng Kidul senantiasa menjunjung tinggi semangat gotong royong, guyub
                  rukun, dan kemandirian. Bersama para pamong dusun, pengurus RT, RW, dan seluruh
                  elemen warga, kami berkomitmen merawat kelestarian lingkungan, memajukan
                  perekonomian lokal, serta menjaga nilai luhur warisan keagamaan dan budaya leluhur.
                </p>
                <p className="text-slate-600 text-sm sm:text-base">
                  Semoga portal ini menjadi jembatan silaturahmi yang mempererat kebersamaan, baik
                  bagi warga yang tinggal di dusun maupun sedulur warga Jumeneng Kidul yang berada di
                  perantauan.
                </p>
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
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
