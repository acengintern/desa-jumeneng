import React from 'react';
import Link from 'next/link';
import { Newspaper, ArrowLeft, Home } from 'lucide-react';

export default function BeritaNotFound() {
  return (
    <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-xl border border-stone-200/90 shadow-xs">
        <div className="w-16 h-16 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-5">
          <Newspaper className="w-8 h-8 text-emerald-800" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Galat 404 · Tidak Ditemukan
        </span>

        <h1 className="font-heading text-2xl font-bold text-stone-900 mt-2 mb-3">
          Warta Tidak Ditemukan
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed mb-8">
          Artikel warta atau berita kegiatan yang Anda cari belum tersedia, telah dihapus, atau tautan yang Anda tuju kurang tepat.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/berita"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-sm font-semibold transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Warta</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 active:bg-stone-100 text-stone-700 text-sm font-semibold transition-colors min-h-[44px]"
          >
            <Home className="w-4 h-4 text-stone-500" />
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
