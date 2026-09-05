import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { ProfilDesa } from '@/lib/types';
import { ScrollReveal } from './ScrollReveal';

interface KontakPreviewSectionProps {
  profil?: ProfilDesa;
}

export function KontakPreviewSection({ profil }: KontakPreviewSectionProps) {
  const alamat =
    profil?.kontak_alamat ||
    'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta';

  const telepon = profil?.kontak_telepon || '0878-3906-4121';
  const cleanPhone = telepon.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const waLink = `https://wa.me/${waNumber}?text=Halo%20Pengurus%20Padukuhan%20Jumeneng%20Kidul,%20saya%20ingin%20berkonsultasi/menyampaikan%20pesan:`;

  const mapEmbedUrl =
    profil?.kontak_map_url ||
    'https://www.google.com/maps?q=Jumeneng+Kidul,+Sumberadi,+Mlati,+Sleman&output=embed';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Contact Details Column */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Sekretariat & Pelayanan</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Layanan Warga & Kontak Padukuhan
              </h2>

              <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                Kami siap memberikan pelayanan administrasi kemasyarakatan, konsultasi warga, serta
                menerima saran aspirasi untuk kemajuan bersama.
              </p>

              {/* Information Cards */}
              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-slate-200/70">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Alamat Sekretariat
                    </div>
                    <div className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
                      {alamat}
                    </div>
                  </div>
                </div>

                {/* Service Hours */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-slate-200/70">
                  <div className="w-10 h-10 rounded-lg bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Jam Pelayanan Balai
                    </div>
                    <div className="text-sm sm:text-base font-medium text-slate-800">
                      Senin – Jumat: 08.00 – 15.00 WIB
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Pelayanan aduan darurat dan pesan online 24 jam via WhatsApp
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm transition-all duration-200 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat WhatsApp Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-bold text-emerald-900 hover:text-emerald-700 group transition-colors"
                >
                  <span>Hubungi Kami / Sampaikan Aspirasi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-stone-100 aspect-[4/3] sm:aspect-[16/10] w-full">
                <iframe
                  title="Peta Lokasi Padukuhan Jumeneng Kidul"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
