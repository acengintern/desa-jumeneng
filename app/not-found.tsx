import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-xl border border-stone-200/90 shadow-xs">
        <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center mx-auto mb-5">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Galat 404 · Halaman Tidak Ditemukan
        </span>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 mt-2 mb-3">
          Tersesat di Jumeneng Kidul?
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed mb-8">
          Halaman yang Anda tuju tidak ditemukan di portal ini. Silakan kembali ke beranda atau telusuri menu warta kegiatan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-sm font-semibold transition-colors min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/berita"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 active:bg-stone-100 text-stone-700 text-sm font-semibold transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Buka Warta Dusun</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
