'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Home,
  UserCheck,
} from 'lucide-react';
import { PengurusDusun, KategoriPengurus } from '@/lib/types';
import {
  tambahPengurusAction,
  updatePengurusAction,
  hapusPengurusAction,
} from '../actions';

interface StrukturClientProps {
  initialPengurus: PengurusDusun[];
}

export default function StrukturClient({ initialPengurus }: StrukturClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [pengurusList, setPengurusList] = useState<PengurusDusun[]>(initialPengurus);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<'all' | KategoriPengurus>('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PengurusDusun | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PengurusDusun | null>(null);

  // Notification Toast
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Form Fields
  const [formNama, setFormNama] = useState('');
  const [formJabatan, setFormJabatan] = useState('');
  const [formKategori, setFormKategori] = useState<KategoriPengurus>('rt');
  const [formFotoUrl, setFormFotoUrl] = useState('');
  const [formUrutan, setFormUrutan] = useState<number>(1);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormNama('');
    setFormJabatan('');
    setFormKategori(selectedKategori === 'all' ? 'rt' : selectedKategori);
    setFormFotoUrl('');
    setFormUrutan(pengurusList.length + 1);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: PengurusDusun) => {
    setEditingItem(item);
    setFormNama(item.nama);
    setFormJabatan(item.jabatan);
    setFormKategori(item.kategori);
    setFormFotoUrl(item.foto_url || '');
    setFormUrutan(item.urutan || 1);
    setIsModalOpen(true);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama.trim()) {
      showToast('error', 'Nama pengurus wajib diisi.');
      return;
    }
    if (!formJabatan.trim()) {
      showToast('error', 'Jabatan pengurus wajib diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('nama', formNama.trim());
    formData.append('jabatan', formJabatan.trim());
    formData.append('kategori', formKategori);
    formData.append('foto_url', formFotoUrl.trim());
    formData.append('urutan', formUrutan.toString());

    startTransition(async () => {
      if (editingItem) {
        const res = await updatePengurusAction(editingItem.id, formData);
        if (res.success) {
          showToast('success', 'Data pengurus berhasil diperbarui.');
          setPengurusList((prev) =>
            prev.map((p) =>
              p.id === editingItem.id
                ? {
                    ...p,
                    nama: formNama.trim(),
                    jabatan: formJabatan.trim(),
                    kategori: formKategori,
                    foto_url: formFotoUrl.trim() || null,
                    urutan: formUrutan,
                  }
                : p
            )
          );
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal memperbarui data pengurus.');
        }
      } else {
        const res = await tambahPengurusAction(formData);
        if (res.success && res.data) {
          showToast('success', 'Pengurus baru berhasil ditambahkan.');
          setPengurusList((prev) => [...prev, res.data as PengurusDusun].sort((a, b) => a.urutan - b.urutan));
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal menambahkan pengurus.');
        }
      }
    });
  };

  // Confirm Delete
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await hapusPengurusAction(deleteTarget.id);
      if (res.success) {
        showToast('success', `Pengurus "${deleteTarget.nama}" berhasil dihapus.`);
        setPengurusList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menghapus pengurus.');
      }
    });
  };

  // Filtered List
  const filteredPengurus = pengurusList
    .filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jabatan.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedKategori === 'all' || item.kategori === selectedKategori;
      return matchSearch && matchCat;
    })
    .sort((a, b) => a.urutan - b.urutan);

  // Group stats
  const countDukuh = pengurusList.filter((p) => p.kategori === 'dukuh').length;
  const countRw = pengurusList.filter((p) => p.kategori === 'rw').length;
  const countRt = pengurusList.filter((p) => p.kategori === 'rt').length;

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
            <Users className="w-4 h-4" />
            <span>Pemerintahan & Kelembagaan Dusun</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Struktur Pengurus Dusun
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola aparatur Padukuhan Jumeneng Kidul mulai dari Kepala Dukuh, Ketua RW, hingga seluruh Ketua RT.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengurus</span>
        </button>
      </div>

      {/* Grouping Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setSelectedKategori('dukuh')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedKategori === 'dukuh'
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 font-heading">
              {countDukuh}
            </span>
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700">Kepala Dukuh</div>
          <p className="text-[11px] text-slate-500">Pimpinan administratif wilayah dusun</p>
        </div>

        <div
          onClick={() => setSelectedKategori('rw')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedKategori === 'rw'
              ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 font-heading">
              {countRw}
            </span>
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700">Rukun Warga (RW)</div>
          <p className="text-[11px] text-slate-500">Koordinator tingkat RW 19, 20, 21, 39</p>
        </div>

        <div
          onClick={() => setSelectedKategori('rt')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedKategori === 'rt'
              ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 font-heading">
              {countRt}
            </span>
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700">Rukun Tetangga (RT)</div>
          <p className="text-[11px] text-slate-500">Ketua lingkungan RT 01 s/d RT 09</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau jabatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Tingkatan:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setSelectedKategori('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedKategori === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({pengurusList.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedKategori('dukuh')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedKategori === 'dukuh'
                  ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dukuh ({countDukuh})
            </button>
            <button
              type="button"
              onClick={() => setSelectedKategori('rw')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedKategori === 'rw'
                  ? 'bg-white text-sky-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              RW ({countRw})
            </button>
            <button
              type="button"
              onClick={() => setSelectedKategori('rt')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedKategori === 'rt'
                  ? 'bg-white text-indigo-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              RT ({countRt})
            </button>
          </div>
        </div>
      </div>

      {/* Table Pengurus */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredPengurus.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Tidak ada data pengurus ditemukan
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'Tidak ada nama yang cocok dengan kata kunci pencarian.'
                : 'Belum ada data pada tingkatan pengurus ini.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4 w-14 text-center">
                    No
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Nama & Foto
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Jabatan Struktural
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-32">
                    Tingkatan
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right w-28">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPengurus.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/75 transition-colors">
                    {/* Urutan */}
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-400">
                      #{item.urutan || idx + 1}
                    </td>

                    {/* Avatar & Nama */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                          {item.foto_url ? (
                            <img
                              src={item.foto_url}
                              alt={item.nama}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-xs font-bold text-slate-600">
                              {item.nama.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {item.nama}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            ID: {item.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Jabatan */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">
                        {item.jabatan}
                      </span>
                    </td>

                    {/* Kategori Badge */}
                    <td className="py-3.5 px-4">
                      {item.kategori === 'dukuh' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Kepala Dukuh
                        </span>
                      )}
                      {item.kategori === 'rw' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
                          Rukun Warga
                        </span>
                      )}
                      {item.kategori === 'rt' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                          Rukun Tetangga
                        </span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Pengurus"
                          className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          title="Hapus Pengurus"
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

      {/* Modal Tambah / Edit Pengurus */}
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
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-slate-900 text-base">
                    {editingItem ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? 'Perbarui nama, jabatan, atau foto aparatur dusun'
                      : 'Masukkan identitas aparatur / pengurus dusun'}
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
                  Nama Lengkap <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Edhy Purwanta"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tingkatan Kategori <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value as KategoriPengurus)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  >
                    <option value="dukuh">Kepala Dukuh</option>
                    <option value="rw">Rukun Warga (RW)</option>
                    <option value="rt">Rukun Tetangga (RT)</option>
                  </select>
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jabatan Lengkap <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ketua RW 19 atau Ketua RT 02"
                  value={formJabatan}
                  onChange={(e) => setFormJabatan(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Foto Profil (Opsional)
                </label>
                <input
                  type="url"
                  placeholder="https://... atau biarkan kosong untuk inisial nama"
                  value={formFotoUrl}
                  onChange={(e) => setFormFotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
                {formFotoUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={formFotoUrl}
                      alt="Pratinjau Foto"
                      className="w-12 h-12 rounded-full object-cover border"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="text-xs text-slate-500">Pratinjau foto pengurus</span>
                  </div>
                )}
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
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Pengurus'}</span>
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
                Hapus Data Pengurus?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Anda akan menghapus pengurus &ldquo;
                <span className="font-semibold text-slate-700">
                  {deleteTarget.nama} ({deleteTarget.jabatan})
                </span>
                &rdquo; dari daftar aparatur padukuhan.
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
                <span>Ya, Hapus Pengurus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
