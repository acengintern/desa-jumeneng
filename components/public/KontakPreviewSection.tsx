import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { ProfilDesa } from '@/lib/types';

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
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-6">
            {/* Title (no eyebrow pill) */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-2">
              Layanan Warga & Kontak Padukuhan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mb-6 leading-relaxed">
              Pelayanan administrasi kependudukan, konsultasi warga, dan penyampaian aspirasi masyarakat Padukuhan Jumeneng Kidul.
            </p>

            {/* Utilitarian Info List */}
            <div className="space-y-1 mb-8 border-t border-stone-200">
              {/* Address */}
              <div className="flex items-start gap-3 py-3.5 border-b border-stone-200">
                <MapPin className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Alamat Sekretariat
                  </div>
                  <div className="text-sm font-medium text-stone-900 mt-0.5 leading-snug">
                    {alamat}
                  </div>
                </div>
              </div>

              {/* Service Hours */}
              <div className="flex items-start gap-3 py-3.5 border-b border-stone-200">
                <Clock className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Jam Pelayanan Balai
                  </div>
                  <div className="text-sm font-medium text-stone-900 mt-0.5">
                    Senin – Jumat: 08.00 – 15.00 WIB
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Aspirasi online 24 jam via formulir website atau WhatsApp
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 py-3.5 border-b border-stone-200">
                <Phone className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Telepon / WhatsApp
                  </div>
                  <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">
                    {telepon}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-sm transition-colors shadow-xs min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Chat WhatsApp Resmi</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-sm font-semibold text-stone-800 transition-colors min-h-[44px]"
              >
                <span>Formulir Aspirasi Warga</span>
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </Link>
            </div>
          </div>

          {/* Map Column (rounded-lg, no shadow-md) */}
          <div className="lg:col-span-6">
            <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100 aspect-[4/3] sm:aspect-[16/10] w-full">
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
          </div>
        </div>
      </div>
    </section>
  );
}
