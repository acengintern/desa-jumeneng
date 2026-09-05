'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Tag,
  Layers,
} from 'lucide-react';
import { SaranaPrasarana } from '@/lib/types';
import {
  tambahSaranaAction,
  updateSaranaAction,
  hapusSaranaAction,
} from '../actions';

interface SaranaClientProps {
  initialSarana: SaranaPrasarana[];
}

const KATEGORI_OPTIONS = [
  'Ibadah',
  'Pendidikan',
  'Kesehatan',
  'Umum',
  'Olahraga & Ekonomi',
  'Keamanan & Lingkungan',
  'Lembaga Kemasyarakatan',
];

export default function SaranaClient({ initialSarana }: SaranaClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [saranaList, setSaranaList] = useState<SaranaPrasarana[]>(initialSarana);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SaranaPrasarana | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SaranaPrasarana | null>(null);

  // Toast
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Form Fields
  const [formKategori, setFormKategori] = useState(KATEGORI_OPTIONS[0]);
  const [formCustomKategori, setFormCustomKategori] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formJumlah, setFormJumlah] = useState('');
  const [formUrutan, setFormUrutan] = useState<number>(1);

  // Open Create
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormKategori(selectedKategori === 'all' ? KATEGORI_OPTIONS[0] : selectedKategori);
    setFormCustomKategori('');
    setFormNama('');
    setFormJumlah('1 unit');
    setFormUrutan(saranaList.length + 1);
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (item: SaranaPrasarana) => {
    setEditingItem(item);
    if (KATEGORI_OPTIONS.includes(item.kategori)) {
      setFormKategori(item.kategori);
      setFormCustomKategori('');
    } else {
      setFormKategori('Lainnya');
      setFormCustomKategori(item.kategori);
    }
    setFormNama(item.nama_fasilitas);
    setFormJumlah(item.jumlah);
    setFormUrutan(item.urutan || 1);
    setIsModalOpen(true);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalKategori =
      formKategori === 'Lainnya' ? formCustomKategori.trim() : formKategori;

    if (!finalKategori) {
      showToast('error', 'Kategori sarana wajib ditentukan.');
      return;
    }
    if (!formNama.trim()) {
      showToast('error', 'Nama fasilitas sarana wajib diisi.');
      return;
    }
    if (!formJumlah.trim()) {
      showToast('error', 'Jumlah / status unit wajib diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('kategori', finalKategori);
    formData.append('nama_fasilitas', formNama.trim());
    formData.append('jumlah', formJumlah.trim());
    formData.append('urutan', formUrutan.toString());

    startTransition(async () => {
      if (editingItem) {
        const res = await updateSaranaAction(editingItem.id, formData);
        if (res.success) {
          showToast('success', 'Fasilitas sarana berhasil diperbarui.');
          setSaranaList((prev) =>
            prev.map((s) =>
              s.id === editingItem.id
                ? {
                    ...s,
                    kategori: finalKategori,
                    nama_fasilitas: formNama.trim(),
                    jumlah: formJumlah.trim(),
                    urutan: formUrutan,
                  }
                : s
            )
          );
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal memperbarui sarana.');
        }
      } else {
        const res = await tambahSaranaAction(formData);
        if (res.success && res.data) {
          showToast('success', 'Fasilitas sarana baru berhasil ditambahkan.');
          setSaranaList((prev) => [...prev, res.data as SaranaPrasarana]);
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal menambahkan sarana.');
        }
      }
    });
  };

  // Confirm Delete
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await hapusSaranaAction(deleteTarget.id);
      if (res.success) {
        showToast('success', `Fasilitas "${deleteTarget.nama_fasilitas}" berhasil dihapus.`);
        setSaranaList((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menghapus sarana.');
      }
    });
  };

  // Filtered
  const filteredSarana = saranaList
    .filter((item) => {
      const matchSearch =
        item.nama_fasilitas.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat =
        selectedKategori === 'all' || item.kategori.toLowerCase() === selectedKategori.toLowerCase();
      return matchSearch && matchCat;
    })
    .sort((a, b) => a.urutan - b.urutan);

  // Group categories
  const categoriesPresent = Array.from(new Set(saranaList.map((s) => s.kategori)));

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
            <Building2 className="w-4 h-4" />
            <span>Infrastruktur & Fasilitas Lingkungan</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Sarana & Prasarana Dusun
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar fasilitas umum dusun seperti tempat ibadah, balai warga, posyandu, pos ronda, dan lembaga dusun.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Fasilitas</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedKategori('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedKategori === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Semua Fasilitas ({saranaList.length})
          </button>
          {categoriesPresent.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedKategori(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedKategori.toLowerCase() === cat.toLowerCase()
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat} ({saranaList.filter((s) => s.kategori.toLowerCase() === cat.toLowerCase()).length})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari fasilitas sarana..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium shrink-0">
            Ditemukan: <strong className="text-slate-800">{filteredSarana.length}</strong> fasilitas
          </span>
        </div>
      </div>

      {/* Sarana Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredSarana.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Tidak ada fasilitas sarana ditemukan
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'Tidak ada sarana yang cocok dengan pencarian Anda.'
                : 'Belum ada fasilitas tercatat pada kategori ini.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4 w-14 text-center">
                    Urutan
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-44">
                    Kategori Sarana
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Nama Fasilitas
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-36">
                    Jumlah / Status Unit
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right w-28">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSarana.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-400">
                      #{item.urutan || idx + 1}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/70">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {item.kategori}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {item.nama_fasilitas}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {item.jumlah}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Fasilitas"
                          className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          title="Hapus Fasilitas"
                          className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
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
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-slate-900 text-base">
                    {editingItem ? 'Edit Sarana & Prasarana' : 'Tambah Fasilitas Sarana'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? 'Perbarui data fasilitas infrastruktur dusun'
                      : 'Catat fasilitas sarana prasarana baru di padukuhan'}
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
                  Kategori Sarana <span className="text-rose-600">*</span>
                </label>
                <select
                  value={formKategori}
                  onChange={(e) => setFormKategori(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                >
                  {KATEGORI_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Lainnya">Lainnya (Kategori Kustom)</option>
                </select>
              </div>

              {formKategori === 'Lainnya' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Kategori Kustom <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Transportasi & Drainase"
                    value={formCustomKategori}
                    onChange={(e) => setFormCustomKategori(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Fasilitas Sarana <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Balai Pertemuan RW 21, Lapangan Voli, dll."
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jumlah / Status Unit <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 1 buah, 2 unit, Tersedia"
                    value={formJumlah}
                    onChange={(e) => setFormJumlah(e.target.value)}
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
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Fasilitas'}</span>
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
                Hapus Sarana Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Anda akan menghapus fasilitas &ldquo;
                <span className="font-semibold text-slate-700">
                  {deleteTarget.nama_fasilitas} ({deleteTarget.kategori})
                </span>
                &rdquo; dari daftar sarana prasarana dusun.
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
                <span>Ya, Hapus Fasilitas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
