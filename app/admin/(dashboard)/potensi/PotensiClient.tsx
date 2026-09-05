'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sprout,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';
import { PotensiWilayah } from '@/lib/types';
import {
  tambahPotensiAction,
  updatePotensiAction,
  hapusPotensiAction,
} from '../actions';

interface PotensiClientProps {
  initialPotensi: PotensiWilayah[];
}

export default function PotensiClient({ initialPotensi }: PotensiClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [potensiList, setPotensiList] = useState<PotensiWilayah[]>(initialPotensi);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PotensiWilayah | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PotensiWilayah | null>(null);

  // Toast Feedback
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Form Fields (termasuk 4 field terstruktur)
  const [formJudul, setFormJudul] = useState('');
  const [formIcon, setFormIcon] = useState('🌾');
  const [formDeskripsi, setFormDeskripsi] = useState('');
  const [formKegiatanUtama, setFormKegiatanUtama] = useState('');
  const [formKeunggulan, setFormKeunggulan] = useState('');
  const [formTantangan, setFormTantangan] = useState('');
  const [formSumberData, setFormSumberData] = useState('Pemerintah Padukuhan Jumeneng Kidul');
  const [formUrutan, setFormUrutan] = useState<number>(1);

  // Open Create
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormJudul('');
    setFormIcon('🌾');
    setFormDeskripsi('');
    setFormKegiatanUtama('');
    setFormKeunggulan('');
    setFormTantangan('');
    setFormSumberData('Pemerintah Padukuhan Jumeneng Kidul');
    setFormUrutan(potensiList.length + 1);
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (item: PotensiWilayah) => {
    setEditingItem(item);
    setFormJudul(item.judul);
    setFormIcon(item.icon || '🌾');
    setFormDeskripsi(item.deskripsi_singkat || '');
    setFormKegiatanUtama(item.kegiatan_utama || '');
    setFormKeunggulan(item.keunggulan_hasil || '');
    setFormTantangan(item.tantangan_kendala || '');
    setFormSumberData(item.sumber_data || 'Pemerintah Padukuhan Jumeneng Kidul');
    setFormUrutan(item.urutan || 1);
    setIsModalOpen(true);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul.trim()) {
      showToast('error', 'Judul potensi wilayah wajib diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('judul', formJudul.trim());
    formData.append('icon', formIcon.trim() || '🌾');
    formData.append('deskripsi_singkat', formDeskripsi.trim());
    formData.append('kegiatan_utama', formKegiatanUtama.trim());
    formData.append('keunggulan_hasil', formKeunggulan.trim());
    formData.append('tantangan_kendala', formTantangan.trim());
    formData.append('sumber_data', formSumberData.trim() || 'Pemerintah Dusun');
    formData.append('urutan', formUrutan.toString());

    startTransition(async () => {
      if (editingItem) {
        const res = await updatePotensiAction(editingItem.id, formData);
        if (res.success) {
          showToast('success', 'Potensi wilayah berhasil diperbarui.');
          setPotensiList((prev) =>
            prev.map((p) =>
              p.id === editingItem.id
                ? {
                    ...p,
                    judul: formJudul.trim(),
                    icon: formIcon.trim() || '🌾',
                    deskripsi_singkat: formDeskripsi.trim(),
                    kegiatan_utama: formKegiatanUtama.trim(),
                    keunggulan_hasil: formKeunggulan.trim(),
                    tantangan_kendala: formTantangan.trim(),
                    sumber_data: formSumberData.trim(),
                    urutan: formUrutan,
                  }
                : p
            )
          );
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal memperbarui potensi wilayah.');
        }
      } else {
        const res = await tambahPotensiAction(formData);
        if (res.success && res.data) {
          showToast('success', 'Potensi wilayah baru berhasil ditambahkan.');
          setPotensiList((prev) => [...prev, res.data as PotensiWilayah].sort((a, b) => a.urutan - b.urutan));
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal menambahkan potensi wilayah.');
        }
      }
    });
  };

  // Confirm Delete
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await hapusPotensiAction(deleteTarget.id);
      if (res.success) {
        showToast('success', `Potensi "${deleteTarget.judul}" berhasil dihapus.`);
        setPotensiList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menghapus potensi wilayah.');
      }
    });
  };

  // Filtered
  const filteredPotensi = potensiList
    .filter(
      (item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi_singkat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kegiatan_utama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.urutan - b.urutan);

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
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <Sprout className="w-4 h-4" />
            <span>Sektor Unggulan & Ekonomi Warga</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Potensi Wilayah Dusun
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola data komoditas pertanian, UMKM rumahan, keagamaan, dan peternakan lengkap dengan 4 field terstruktur modal.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Sektor Potensi</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari potensi wilayah atau komoditas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>

        <span className="text-xs text-slate-500 font-medium shrink-0">
          Total Sektor: <strong className="text-slate-800">{potensiList.length}</strong>
        </span>
      </div>

      {/* Potensi Cards Grid */}
      {filteredPotensi.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Tidak ada potensi wilayah ditemukan
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Tambahkan sektor ekonomi atau potensi unggulan padukuhan pertama Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPotensi.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shadow-inner shrink-0">
                      {item.icon || '🌾'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Urutan #{item.urutan}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-slate-900 mt-0.5">
                        {item.judul}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Potensi"
                      className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      title="Hapus Potensi"
                      className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Deskripsi Singkat */}
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {item.deskripsi_singkat || 'Belum ada deskripsi singkat.'}
                </p>

                {/* 4 Field Terstruktur Preview */}
                <div className="space-y-2.5">
                  {/* 1. Kegiatan Utama */}
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 text-xs">
                    <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                      <span>1. Kegiatan Utama:</span>
                    </div>
                    <p className="text-emerald-900 font-medium pl-5">
                      {item.kegiatan_utama || '-'}
                    </p>
                  </div>

                  {/* 2. Potensi & Keunggulan */}
                  <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-2.5 text-xs">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5 mb-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                      <span>2. Keunggulan / Potensi:</span>
                    </div>
                    <p className="text-amber-900 font-medium pl-5">
                      {item.keunggulan_hasil || '-'}
                    </p>
                  </div>

                  {/* 3. Tantangan & Kendala */}
                  <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-2.5 text-xs">
                    <div className="font-bold text-rose-950 flex items-center gap-1.5 mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                      <span>3. Tantangan / Kendala:</span>
                    </div>
                    <p className="text-rose-900 font-medium pl-5">
                      {item.tantangan_kendala || 'Tidak ada kendala berarti'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Sumber Data */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sumber: <strong>{item.sumber_data || 'Pemerintah Dusun'}</strong></span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                  Terverifikasi
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah / Edit Potensi */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-slate-900 text-base">
                    {editingItem ? 'Edit Sektor Potensi Wilayah' : 'Tambah Potensi Wilayah Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lengkapi 4 data terstruktur (kegiatan, keunggulan, kendala, dan sumber data)
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Sektor Potensi <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pertanian, UMKM Rumahan, dll."
                    value={formJudul}
                    onChange={(e) => setFormJudul(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Simbol / Emoji Icon <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="🌾, 🏠, 🕌, 🐄, dsb"
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm text-center text-lg rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Pengantar Singkat
                </label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan umum mengenai sektor potensi ini..."
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>4 Field Data Terstruktur (Tampil pada Modal Publik):</span>
                </div>

                {/* 1. Kegiatan Utama */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    1. Kegiatan Utama
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jagung, Padi, Kacang Tanah"
                    value={formKegiatanUtama}
                    onChange={(e) => setFormKegiatanUtama(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                {/* 2. Potensi & Keunggulan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    2. Potensi & Keunggulan / Hasil
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Lahan jagung luas, produksi stabil"
                    value={formKeunggulan}
                    onChange={(e) => setFormKeunggulan(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                {/* 3. Tantangan & Kendala */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    3. Tantangan & Kendala
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Kekeringan musim kemarau, hama musiman"
                    value={formTantangan}
                    onChange={(e) => setFormTantangan(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                {/* 4. Sumber Data & Urutan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      4. Sumber Data Validasi
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Pak Dukuh / Kelompok Tani"
                      value={formSumberData}
                      onChange={(e) => setFormSumberData(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Urutan Tampil
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formUrutan}
                      onChange={(e) => setFormUrutan(parseInt(e.target.value, 10) || 1)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
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
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Potensi'}</span>
                </button>
              </div>
            </form>
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
                Hapus Potensi Wilayah Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Anda akan menghapus sektor potensi &ldquo;
                <span className="font-semibold text-slate-700">
                  {deleteTarget.judul}
                </span>
                &rdquo; beserta seluruh data terstrukturnya.
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
                <span>Ya, Hapus Sektor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
