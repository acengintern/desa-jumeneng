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
  Building,
  Sparkles,
  FileText,
  HeartHandshake,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { ProfilDesa } from '@/lib/types';

interface KontakPageContentProps {
  profil: ProfilDesa;
}

export function KontakPageContent({ profil }: KontakPageContentProps) {
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
      errs.pesan = 'Pesan atau aspirasi warga wajib diisi.';
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
          data.message ||
            'Pesan Anda berhasil kami terima! Pengurus dusun akan segera menindaklanjuti.'
        );
        // Reset form inputs
        setFormData({ nama: '', no_telepon: '', pesan: '' });
        setErrors({});
      } else {
        setStatus('error');
        setResponseMessage(
          data.message || 'Gagal mengirim pesan. Silakan coba kembali sesaat lagi.'
        );
      }
    } catch {
      setStatus('error');
      setResponseMessage(
        'Terjadi gangguan jaringan saat mengirim pesan. Mohon periksa koneksi internet Anda.'
      );
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. KARTU RINGKASAN KONTAK UTAMA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Alamat */}
        <div className="bg-white rounded-lg p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
              Alamat Sekretariat
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Jumeneng Kidul, RT 01–09 / RW 19–39, Sumberadi, Mlati, Sleman, DIY 55288.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
            Balai Dusun & Rumah Dukuh
          </div>
        </div>

        {/* Card 2: WhatsApp Dukuh */}
        <div className="bg-white rounded-lg p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
              WhatsApp Resmi
            </h3>
            <p className="text-xs font-mono font-bold text-stone-800 mb-1">
              {teleponNumber}
            </p>
            <p className="text-xs text-stone-500">
              Kepala Dukuh Edhy Purwanta & Humas Padukuhan.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
            Respon Cepat Jam Pelayanan
          </div>
        </div>

        {/* Card 3: Jam Layanan Administrasi */}
        <div className="bg-white rounded-lg p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
              Jam Administrasi
            </h3>
            <p className="text-xs text-stone-700 font-semibold mb-1">
              Senin – Sabtu: 08.00 – 16.00 WIB
            </p>
            <p className="text-xs text-stone-500">
              Pelayanan surat pengantar & administrasi warga.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
            Hari Minggu & Libur Nasional Tutup
          </div>
        </div>

        {/* Card 4: Form Online 24 Jam */}
        <div className="bg-white rounded-lg p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 mb-1">
              Aspirasi Daring
            </h3>
            <p className="text-xs text-stone-700 font-semibold mb-1">
              Tersedia 24 Jam Online
            </p>
            <p className="text-xs text-stone-500">
              Kirim saran, permohonan informasi publik kapan saja.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
            Ditinjau Pengurus Berkala
          </div>
        </div>
      </div>

      {/* 2. DUA KOLOM: INFORMASI & FORMULIR ASPIRASI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Kolom Kiri (5/12): Informasi Detail Dusun, Tombol WA & Peta Google Maps */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Kontak Sekretariat */}
          <div className="rounded-xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-950 mb-6 flex items-center gap-2.5">
              <Building className="w-5 h-5 text-emerald-700" />
              <span>Sekretariat Padukuhan</span>
            </h3>

            <div className="space-y-5 text-stone-700 text-xs sm:text-sm">
              {/* Alamat Lengkap */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-stone-100 text-emerald-800 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 text-xs uppercase tracking-wider mb-0.5">
                    Alamat Lengkap
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    {profil?.kontak_alamat ||
                      'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55288'}
                  </p>
                </div>
              </div>

              {/* Telepon / WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-stone-100 text-emerald-800 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 text-xs uppercase tracking-wider mb-0.5">
                    Telepon & WhatsApp
                  </h4>
                  <p className="text-stone-900 font-bold font-mono text-sm sm:text-base">
                    {teleponNumber}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Kepala Dukuh Bapak Edhy Purwanta
                  </p>
                </div>
              </div>

              {/* Jam Administrasi */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-stone-100 text-emerald-800 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 text-xs uppercase tracking-wider mb-0.5">
                    Waktu Layanan Administrasi
                  </h4>
                  <p className="text-stone-600">
                    Senin – Sabtu: 08.00 – 16.00 WIB
                  </p>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    Surat pengantar RT/RW dapat dikoordinasikan terlebih dahulu
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol WhatsApp Chat Langsung */}
            <div className="mt-8 pt-6 border-t border-stone-100">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg min-h-[44px] bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat Langsung via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-[11px] text-center text-stone-400 mt-2">
                Terhubung langsung dengan nomor resmi Kepala Dukuh Jumeneng Kidul
              </p>
            </div>
          </div>

          {/* Google Maps Embed Card */}
          <div className="rounded-xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span className="font-heading font-bold text-xs sm:text-sm text-stone-950">
                  Peta Lokasi Wilayah Dusun
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Jumeneng+Kidul,+Sumberadi,+Mlati,+Sleman"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Iframe Peta */}
            <div className="relative w-full h-64 sm:h-72 bg-stone-100">
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

        {/* Kolom Kanan (7/12): Formulir Aspirasi Warga */}
        <div className="lg:col-span-7">
          <div className="rounded-xl bg-white border border-stone-200/90 shadow-xs overflow-hidden p-6 sm:p-10 relative">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Formulir Aspirasi Online</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-950">
                Sampaikan Aspirasi & Pengaduan
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                Saluran resmi ini disediakan untuk menampung kritik konstruktif, saran perbaikan layanan,
                usulan kegiatan, maupun permohonan informasi dari warga masyarakat Padukuhan Jumeneng Kidul.
              </p>
            </div>

            {/* Alert Pesan Sukses */}
            {status === 'success' && (
              <div className="mb-6 p-4 sm:p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm">
                  <p className="font-bold text-emerald-950 mb-0.5">
                    Aspirasi Berhasil Dikirim!
                  </p>
                  <p className="leading-relaxed">
                    {responseMessage ||
                      'Terima kasih telah berpartisipasi. Pengurus padukuhan akan segera meninjau dan menindaklanjuti pesan Anda.'}
                  </p>
                </div>
              </div>
            )}

            {/* Alert Pesan Gagal */}
            {status === 'error' && (
              <div className="mb-6 p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-in fade-in duration-300">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm">
                  <p className="font-bold text-rose-950 mb-0.5">Gagal Mengirimkan Pesan</p>
                  <p className="leading-relaxed">
                    {responseMessage ||
                      'Terjadi kendala saat mengirim pesan. Silakan coba kembali atau gunakan tombol WhatsApp langsung.'}
                  </p>
                </div>
              </div>
            )}

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Nama Lengkap */}
              <div>
                <label
                  htmlFor="nama"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
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
                  className={`w-full px-4 py-3 rounded-lg text-stone-900 bg-stone-50 border transition-all text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.nama
                      ? 'border-rose-400 focus:ring-rose-400/30 bg-rose-50/30'
                      : 'border-stone-200 focus:border-emerald-600 focus:ring-emerald-600/20'
                  }`}
                />
                {errors.nama && (
                  <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.nama}
                  </p>
                )}
              </div>

              {/* Input No WhatsApp / Telepon */}
              <div>
                <label
                  htmlFor="no_telepon"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
                >
                  Nomor Telepon / WhatsApp{' '}
                  <span className="text-[11px] font-normal text-stone-500">
                    (Opsional, untuk balasan pengurus)
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
                  className="w-full px-4 py-3 rounded-lg text-stone-900 bg-stone-50 border border-stone-200 transition-all text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:border-emerald-600 focus:ring-emerald-600/20"
                />
              </div>

              {/* Input Isi Pesan */}
              <div>
                <label
                  htmlFor="pesan"
                  className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
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
                  placeholder="Tuliskan pesan aspirasi, usulan kegiatan, kritik konstruktif, atau pertanyaan Anda secara rinci..."
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg text-stone-900 bg-stone-50 border transition-all text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 resize-y ${
                    errors.pesan
                      ? 'border-rose-400 focus:ring-rose-400/30 bg-rose-50/30'
                      : 'border-stone-200 focus:border-emerald-600 focus:ring-emerald-600/20'
                  }`}
                />
                {errors.pesan && (
                  <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.pesan}
                  </p>
                )}
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-lg min-h-[44px] bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirimkan Aspirasi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Aspirasi Warga</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-stone-400">
                Pesan yang masuk dijamin kerahasiaannya dan hanya digunakan untuk keperluan pelayanan padukuhan.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* 3. PANDUAN PELAYANAN ADMINISTRASI WARGA */}
      <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Alur Pelayanan Administrasi</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-950">
            Panduan Pengurusan Surat & Layanan Kependudukan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
            Untuk mempermudah urusan administrasi warga Padukuhan Jumeneng Kidul, berikut adalah
            langkah-langkah umum permohonan surat pengantar menuju Kalurahan Sumberadi:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layanan 1 */}
          <div className="p-5 rounded-lg bg-stone-50 border border-stone-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              01
            </div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900">
              Pengantar RT & RW Setempat
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Temui Ketua RT di wilayah tempat tinggal Anda (RT 01 s/d RT 09) untuk mendapatkan surat pengantar pengantar awal dengan membawa fotokopi KTP & KK.
            </p>
          </div>

          {/* Layanan 2 */}
          <div className="p-5 rounded-lg bg-stone-50 border border-stone-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              02
            </div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900">
              Legalisasi Kepala Dukuh
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bawa surat pengantar RT/RW ke sekretariat Kepala Dukuh Edhy Purwanta untuk verifikasi data kependudukan dan penandatanganan pengantar resmi padukuhan.
            </p>
          </div>

          {/* Layanan 3 */}
          <div className="p-5 rounded-lg bg-stone-50 border border-stone-200/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              03
            </div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900">
              Proses Kantor Kalurahan
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Surat pengantar padukuhan diserahkan ke loket pelayanan Kalurahan Sumberadi untuk penerbitan surat resmi yang dibutuhkan pemohon.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
          <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Catatan Pelayanan:</strong> Seluruh pengurusan surat pengantar di tingkat Padukuhan Jumeneng Kidul tidak dipungut biaya (bebas biaya/gratis). Apabila terdapat kendala administrasi mendesak, silakan hubungi langsung Kepala Dukuh via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
