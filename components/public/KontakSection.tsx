'use client';

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ShieldAlert,
  Building,
  Sparkles,
} from 'lucide-react';
import { ProfilDesa } from '@/lib/types';

interface KontakSectionProps {
  profil?: ProfilDesa;
}

export function KontakSection({ profil }: KontakSectionProps) {
  // Form State
  const [formData, setFormData] = useState({
    nama: '',
    no_telepon: '',
    pesan: '',
  });

  const [errors, setErrors] = useState<{
    nama?: string;
    pesan?: string;
  }>({});

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const mapEmbedUrl =
    profil?.kontak_map_url ||
    'https://www.google.com/maps?q=Jumeneng+Kidul,+Sumberadi,+Mlati,+Sleman&output=embed';

  const teleponNumber = profil?.kontak_telepon || '0878-3906-4121';
  const cleanPhoneForWa = teleponNumber.replace(/[^0-9]/g, '');
  const waNumber = cleanPhoneForWa.startsWith('0')
    ? '62' + cleanPhoneForWa.slice(1)
    : cleanPhoneForWa;

  const waLink = `https://wa.me/${waNumber}?text=Halo%20Pengurus%20Padukuhan%20Jumeneng%20Kidul,%20saya%20ingin%20berkonsultasi/menyampaikan%20pesan:`;

  const validate = () => {
    const errs: { nama?: string; pesan?: string } = {};

    if (!formData.nama.trim()) {
      errs.nama = 'Nama lengkap wajib diisi.';
    } else if (formData.nama.trim().length < 2) {
      errs.nama = 'Nama minimal terdiri dari 2 karakter.';
    }

    if (!formData.pesan.trim()) {
      errs.pesan = 'Pesan aspirasi wajib diisi.';
    } else if (formData.pesan.trim().length < 5) {
      errs.pesan = 'Pesan minimal terdiri dari 5 karakter.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');
    setResponseMessage('');

    try {
      const res = await fetch('/api/kontak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.nama.trim(),
          no_telepon: formData.no_telepon.trim(),
          pesan: formData.pesan.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMessage(
          data.message || 'Pesan Anda berhasil kami terima! Pengurus dusun akan segera menindaklanjuti.'
        );
        // Reset form inputs
        setFormData({ nama: '', no_telepon: '', pesan: '' });
        setErrors({});
      } else {
        setStatus('error');
        setResponseMessage(data.message || 'Gagal mengirim pesan. Silakan coba kembali.');
      }
    } catch (err: any) {
      setStatus('error');
      setResponseMessage('Terjadi gangguan jaringan saat mengirim pesan. Mohon periksa koneksi Anda.');
    }
  };

  return (
    <section id="kontak" className="py-20 lg:py-28 bg-white scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 mb-4">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            Layanan & Komunikasi Warga
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Kontak & Lokasi Padukuhan
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-slate-600">
            Sampaikan pertanyaan, permohonan informasi, maupun aspirasi pembangunan dusun.
            Pemerintah Padukuhan Jumeneng Kidul siap melayani warga dengan tulus dan terbuka.
          </p>
        </div>

        {/* 2 Kolom Layout Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Kolom Kiri (5/12): Informasi Dusun, Tombol WA & Peta Google Maps */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card Informasi Dusun */}
            <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <h3 className="font-heading text-xl font-bold text-emerald-950 mb-6 flex items-center gap-2.5">
                <Building className="w-5 h-5 text-emerald-700" />
                <span>Sekretariat Padukuhan</span>
              </h3>

              <div className="space-y-5 text-slate-700 text-sm sm:text-base">
                {/* Alamat */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-800 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-950 text-xs uppercase tracking-wider mb-0.5">
                      Alamat Wilayah
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {profil?.kontak_alamat ||
                        'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55288'}
                    </p>
                  </div>
                </div>

                {/* Telepon / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-800 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-950 text-xs uppercase tracking-wider mb-0.5">
                      Telepon / WhatsApp
                    </h4>
                    <p className="text-slate-900 font-bold text-base font-mono">
                      {teleponNumber}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Kepala Dukuh & Humas Padukuhan Jumeneng Kidul
                    </p>
                  </div>
                </div>

                {/* Jam Layanan */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-800 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-950 text-xs uppercase tracking-wider mb-0.5">
                      Jam Layanan Administrasi
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Senin – Sabtu: 08.00 – 16.00 WIB
                    </p>
                    <p className="text-xs text-emerald-700 font-medium mt-0.5">
                      (Form Aspirasi Digital Online 24 Jam)
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol WhatsApp Chat Langsung */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat Langsung via WhatsApp</span>
                  <ExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Terhubung langsung dengan pengurus dusun melalui WhatsApp Messenger
                </p>
              </div>
            </div>

            {/* Google Maps Embed Card */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span className="font-heading font-bold text-sm text-emerald-950">
                    Peta Lokasi Dusun
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Jumeneng+Kidul,+Sumberadi,+Mlati,+Sleman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe Peta */}
              <div className="relative w-full h-64 sm:h-72 bg-slate-100">
                <iframe
                  src={mapEmbedUrl}
                  title="Peta Lokasi Padukuhan Jumeneng Kidul"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan (7/12): Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border-2 border-emerald-100 shadow-xl shadow-emerald-950/5 overflow-hidden p-6 sm:p-10 relative">
              {/* Decorative Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500" />

              <div className="mb-8">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Formulir Aspirasi Online
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-950">
                  Kirim Pesan / Aspirasi Warga
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Formulir ini dikelola langsung untuk menampung kritik, saran, maupun permohonan
                  informasi publik masyarakat Jumeneng Kidul.
                </p>
              </div>

              {/* Alert Pesan Sukses */}
              {status === 'success' && (
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3.5 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-emerald-950 mb-0.5">
                      Pesan Anda berhasil kami terima!
                    </p>
                    <p className="leading-relaxed">
                      {responseMessage ||
                        'Terima kasih telah berpartisipasi. Pengurus dusun akan segera menelaah dan menindaklanjuti pesan Anda.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Alert Pesan Gagal */}
              {status === 'error' && (
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3.5 animate-in fade-in duration-300">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-rose-950 mb-0.5">Gagal Mengirim Pesan</p>
                    <p className="leading-relaxed">
                      {responseMessage ||
                        'Terjadi kendala saat mengirim pesan. Silakan coba kembali atau gunakan tombol WhatsApp langsung.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Formulir Input */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Nama Lengkap */}
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm font-bold text-slate-800 mb-2"
                  >
                    Nama Lengkap <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, nama: e.target.value }));
                      if (errors.nama) {
                        setErrors((prev) => ({ ...prev, nama: undefined }));
                      }
                    }}
                    placeholder="Masukkan nama lengkap Anda"
                    disabled={status === 'loading'}
                    className={`w-full px-4 py-3.5 rounded-2xl text-slate-900 bg-slate-50/50 border transition-all text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 ${
                      errors.nama
                        ? 'border-rose-400 focus:ring-rose-400/50 bg-rose-50/30'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                  />
                  {errors.nama && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.nama}
                    </p>
                  )}
                </div>

                {/* Input No Telepon / WA */}
                <div>
                  <label
                    htmlFor="no_telepon"
                    className="block text-sm font-bold text-slate-800 mb-2"
                  >
                    Nomor WhatsApp / Telepon{' '}
                    <span className="text-xs font-normal text-slate-500">
                      (Opsional, untuk balasan)
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="no_telepon"
                    name="no_telepon"
                    value={formData.no_telepon}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, no_telepon: e.target.value }))
                    }
                    placeholder="Contoh: 0812-3456-7890"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3.5 rounded-2xl text-slate-900 bg-slate-50/50 border border-slate-200 transition-all text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                {/* Input Pesan / Aspirasi */}
                <div>
                  <label
                    htmlFor="pesan"
                    className="block text-sm font-bold text-slate-800 mb-2"
                  >
                    Isi Pesan / Aspirasi <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={5}
                    value={formData.pesan}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, pesan: e.target.value }));
                      if (errors.pesan) {
                        setErrors((prev) => ({ ...prev, pesan: undefined }));
                      }
                    }}
                    placeholder="Tuliskan pesan, pertanyaan, kritik, atau usulan aspirasi warga secara jelas..."
                    disabled={status === 'loading'}
                    className={`w-full px-4 py-3.5 rounded-2xl text-slate-900 bg-slate-50/50 border transition-all text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 resize-y ${
                      errors.pesan
                        ? 'border-rose-400 focus:ring-rose-400/50 bg-rose-50/30'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                  />
                  {errors.pesan && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.pesan}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-base shadow-lg shadow-emerald-900/10 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mengirimkan Pesan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Kirim Aspirasi Sekarang</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Data yang Anda kirimkan dirahasiakan dan hanya digunakan untuk keperluan pelayanan warga dusun.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
