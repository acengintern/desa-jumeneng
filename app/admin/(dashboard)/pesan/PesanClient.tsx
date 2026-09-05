'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Phone,
  MessageCircle,
  Clock,
  Check,
  X,
  AlertCircle,
  Loader2,
  Eye,
  Filter,
} from 'lucide-react';
import { PesanKontak } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';
import { tandaiPesanDibacaAction, hapusPesanAction } from '../actions';

interface PesanClientProps {
  initialPesan: PesanKontak[];
}

export default function PesanClient({ initialPesan }: PesanClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [pesanList, setPesanList] = useState<PesanKontak[]>(initialPesan);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');

  // Active Detail Modal
  const [selectedPesan, setSelectedPesan] = useState<PesanKontak | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PesanKontak | null>(null);

  // Toast
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Tandai Dibaca
  const handleMarkAsRead = (item: PesanKontak) => {
    if (item.dibaca) return;

    startTransition(async () => {
      const res = await tandaiPesanDibacaAction(item.id);
      if (res.success) {
        showToast('success', 'Pesan ditandai telah dibaca.');
        setPesanList((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, dibaca: true } : p))
        );
        if (selectedPesan?.id === item.id) {
          setSelectedPesan((prev) => (prev ? { ...prev, dibaca: true } : null));
        }
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal mengubah status pesan.');
      }
    });
  };

  // Open Detail & Auto Mark as Read if unread
  const handleOpenDetail = (item: PesanKontak) => {
    setSelectedPesan(item);
    if (!item.dibaca) {
      handleMarkAsRead(item);
    }
  };

  // Delete Confirm
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await hapusPesanAction(deleteTarget.id);
      if (res.success) {
        showToast('success', `Pesan dari ${deleteTarget.nama_pengirim} berhasil dihapus.`);
        setPesanList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        if (selectedPesan?.id === deleteTarget.id) {
          setSelectedPesan(null);
        }
        setDeleteTarget(null);
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menghapus pesan.');
      }
    });
  };

  // WhatsApp Link Helper
  const getWhatsAppLink = (phone: string | null | undefined, name: string) => {
    if (!phone) return null;
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    } else if (!clean.startsWith('62')) {
      clean = '62' + clean;
    }
    const text = encodeURIComponent(
      `Halo Bapak/Ibu ${name}, kami dari pengurus Padukuhan Jumeneng Kidul bermaksud menindaklanjuti pesan & aspirasi yang Anda sampaikan melalui portal resmi: `
    );
    return `https://wa.me/${clean}?text=${text}`;
  };

  // Filtered List
  const filteredPesan = pesanList.filter((item) => {
    const matchSearch =
      item.nama_pengirim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pesan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.no_telepon && item.no_telepon.includes(searchQuery));
    const matchStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'unread'
        ? !item.dibaca
        : item.dibaca;
    return matchSearch && matchStatus;
  });

  const countUnread = pesanList.filter((p) => !p.dibaca).length;
  const countRead = pesanList.filter((p) => p.dibaca).length;

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-rose-900 text-white border-rose-700'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 mb-1">
            <Mail className="w-4 h-4" />
            <span>Pusat Komunikasi & Pengaduan Warga</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Kotak Masuk Pesan Warga
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar aspirasi, masukan, dan permohonan informasi warga melalui formulir kontak portal.
          </p>
        </div>

        {countUnread > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{countUnread} Pesan Belum Ditinjau</span>
          </div>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, nomor telepon, atau isi pesan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Filter:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({pesanList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('unread')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === 'unread'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum Dibaca ({countUnread})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('read')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === 'read'
                  ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sudah Ditinjau ({countRead})
            </button>
          </div>
        </div>
      </div>

      {/* Table Pesan */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredPesan.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Tidak ada pesan masuk ditemukan
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'Tidak ada pesan yang cocok dengan kata kunci pencarian.'
                : 'Kotak masuk pengaduan dan aspirasi warga masih bersih.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4 w-32">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-52">
                    Pengirim & Kontak
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Isi Aspirasi / Pesan
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-36">
                    Waktu Masuk
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right w-44">
                    Tindak Lanjut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPesan.map((item) => {
                  const waLink = getWhatsAppLink(item.no_telepon, item.nama_pengirim);

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        !item.dibaca
                          ? 'bg-amber-50/40 hover:bg-amber-50/70 font-medium'
                          : 'hover:bg-slate-50/75'
                      }`}
                    >
                      {/* Status */}
                      <td className="py-3.5 px-4 align-top whitespace-nowrap">
                        {!item.dibaca ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-400 text-amber-950 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                            Baru
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Ditinjau
                          </span>
                        )}
                      </td>

                      {/* Pengirim */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-slate-900 text-sm">
                          {item.nama_pengirim}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{item.no_telepon || 'Tanpa telepon'}</span>
                        </div>
                      </td>

                      {/* Isi Pesan */}
                      <td className="py-3.5 px-4 align-top">
                        <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed">
                          {item.pesan}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item)}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline mt-1 inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Lihat Pesan Lengkap</span>
                        </button>
                      </td>

                      {/* Tanggal */}
                      <td className="py-3.5 px-4 align-top whitespace-nowrap text-slate-500 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {item.created_at
                              ? formatTanggalIndonesia(item.created_at)
                              : '-'}
                          </span>
                        </div>
                      </td>

                      {/* Tindak Lanjut & Aksi */}
                      <td className="py-3.5 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Direct Link */}
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Balas via WhatsApp"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                          )}

                          {/* Tandai Dibaca */}
                          {!item.dibaca && (
                            <button
                              type="button"
                              onClick={() => handleMarkAsRead(item)}
                              title="Tandai Sudah Dibaca"
                              className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Hapus */}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            title="Hapus Pesan"
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail Pesan */}
      {selectedPesan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-slate-900 text-base">
                    Rincian Pesan Warga
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedPesan.created_at
                      ? formatTanggalIndonesia(selectedPesan.created_at)
                      : 'Waktu tidak tercatat'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPesan(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Pengirim Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                <div className="text-xs text-slate-500 font-medium">Pengirim:</div>
                <div className="text-base font-bold text-slate-900">
                  {selectedPesan.nama_pengirim}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedPesan.no_telepon || 'Tidak mencantumkan nomor kontak'}</span>
                </div>
              </div>

              {/* Pesan Isi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Isi Pesan / Aspirasi Lengkap:
                </label>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedPesan.pesan}
                </div>
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const item = selectedPesan;
                  setSelectedPesan(null);
                  setDeleteTarget(item);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100/60 rounded-xl transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Pesan</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedPesan.no_telepon && (
                  <a
                    href={getWhatsAppLink(selectedPesan.no_telepon, selectedPesan.nama_pengirim) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPesan(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Hapus Pesan Aspirasi?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Anda akan menghapus pesan dari &ldquo;
                <span className="font-semibold text-slate-700">
                  {deleteTarget.nama_pengirim}
                </span>
                &rdquo; secara permanen dari sistem kotak masuk dusun.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleDeleteConfirm}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 transition-colors"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Ya, Hapus Pesan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
