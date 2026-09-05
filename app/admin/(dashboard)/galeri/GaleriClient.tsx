'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Maximize2,
} from 'lucide-react';
import { Galeri } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';
import {
  tambahGaleriAction,
  updateGaleriAction,
  hapusGaleriAction,
} from '../actions';

interface GaleriClientProps {
  initialGaleri: Galeri[];
}

export default function GaleriClient({ initialGaleri }: GaleriClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [galeriList, setGaleriList] = useState<Galeri[]>(initialGaleri);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Galeri | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Galeri | null>(null);
  const [previewImage, setPreviewImage] = useState<Galeri | null>(null);

  // Notification State
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Form Fields
  const [formJudul, setFormJudul] = useState('');
  const [formFotoUrl, setFormFotoUrl] = useState('');
  const [formTanggal, setFormTanggal] = useState('');
  const [formUrutan, setFormUrutan] = useState<number>(1);

  // Open Create
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormJudul('');
    setFormFotoUrl('');
    setFormTanggal(new Date().toISOString().split('T')[0]);
    setFormUrutan(galeriList.length + 1);
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (item: Galeri) => {
    setEditingItem(item);
    setFormJudul(item.judul_kegiatan);
    setFormFotoUrl(item.foto_url);
    setFormTanggal(
      item.tanggal_kegiatan
        ? new Date(item.tanggal_kegiatan).toISOString().split('T')[0]
        : ''
    );
    setFormUrutan(item.urutan || 1);
    setIsModalOpen(true);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul.trim()) {
      showToast('error', 'Judul kegiatan wajib diisi.');
      return;
    }
    if (!formFotoUrl.trim()) {
      showToast('error', 'URL foto wajib diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('judul_kegiatan', formJudul.trim());
    formData.append('foto_url', formFotoUrl.trim());
    formData.append('tanggal_kegiatan', formTanggal);
    formData.append('urutan', formUrutan.toString());

    startTransition(async () => {
      if (editingItem) {
        const res = await updateGaleriAction(editingItem.id, formData);
        if (res.success) {
          showToast('success', 'Dokumentasi kegiatan berhasil diperbarui.');
          setGaleriList((prev) =>
            prev.map((g) =>
              g.id === editingItem.id
                ? {
                    ...g,
                    judul_kegiatan: formJudul.trim(),
                    foto_url: formFotoUrl.trim(),
                    tanggal_kegiatan: formTanggal || null,
                    urutan: formUrutan,
                  }
                : g
            )
          );
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal memperbarui foto galeri.');
        }
      } else {
        const res = await tambahGaleriAction(formData);
        if (res.success && res.data) {
          showToast('success', 'Foto dokumentasi baru berhasil ditambahkan.');
          setGaleriList((prev) => [res.data as Galeri, ...prev]);
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal menambahkan foto.');
        }
      }
    });
  };

  // Confirm Delete
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await hapusGaleriAction(deleteTarget.id);
      if (res.success) {
        showToast('success', `Foto "${deleteTarget.judul_kegiatan}" berhasil dihapus.`);
        setGaleriList((prev) => prev.filter((g) => g.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menghapus foto.');
      }
    });
  };

  // Filtered
  const filteredGaleri = galeriList.filter((item) =>
    item.judul_kegiatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>Dokumentasi Visual Padukuhan</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Kelola Galeri Foto
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola arsip foto dokumentasi kegiatan gotong royong, keagamaan, dan momen penting warga.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Foto Kegiatan</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari dokumentasi berdasarkan judul kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>

        <span className="text-xs text-slate-500 font-medium shrink-0">
          Total Foto: <strong className="text-slate-800">{galeriList.length}</strong>
        </span>
      </div>

      {/* Galeri Card Grid */}
      {filteredGaleri.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Belum ada dokumentasi kegiatan ditemukan
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'Tidak ada foto yang cocok dengan kata kunci pencarian.'
              : 'Tambahkan dokumentasi foto kegiatan dusun pertama Anda.'}
          </p>
          {!searchQuery && (
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              Unggah Foto Sekarang
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredGaleri.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.foto_url}
                  alt={item.judul_kegiatan}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute(
                      'src',
                      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'
                    );
                  }}
                />

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item)}
                    title="Perbesar Foto"
                    className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {item.urutan && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/70 text-white backdrop-blur-xs">
                    Urutan #{item.urutan}
                  </span>
                )}
              </div>

              {/* Caption & Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {item.judul_kegiatan}
                  </h4>
                  {item.tanggal_kegiatan && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatTanggalIndonesia(item.tanggal_kegiatan)}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah / Edit Foto */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-slate-900 text-base">
                    {editingItem ? 'Edit Foto Kegiatan' : 'Tambah Foto Dokumentasi'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? 'Perbarui takarir dan informasi foto'
                      : 'Unggah foto arsip kegiatan padukuhan'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul / Keterangan Kegiatan <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Senam Bersama Ibu-ibu Dusun"
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Foto Dokumentasi <span className="text-rose-600">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... atau URL gambar langsung"
                  value={formFotoUrl}
                  onChange={(e) => setFormFotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
                {formFotoUrl && (
                  <div className="mt-2 w-full h-36 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative">
                    <img
                      src={formFotoUrl}
                      alt="Pratinjau Foto"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="date"
                    value={formTanggal}
                    onChange={(e) => setFormTanggal(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Urutan Tampilan
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formUrutan}
                    onChange={(e) => setFormUrutan(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Foto'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between text-white border-b border-white/10">
              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  {previewImage.judul_kegiatan}
                </h4>
                {previewImage.tanggal_kegiatan && (
                  <p className="text-xs text-slate-400">
                    {formatTanggalIndonesia(previewImage.tanggal_kegiatan)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-2 flex items-center justify-center">
              <img
                src={previewImage.foto_url}
                alt={previewImage.judul_kegiatan}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
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
                Hapus Foto Dokumentasi?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Anda akan menghapus foto &ldquo;
                <span className="font-semibold text-slate-700">
                  {deleteTarget.judul_kegiatan}
                </span>
                &rdquo; dari arsip galeri publik warga.
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
                <span>Ya, Hapus Foto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
