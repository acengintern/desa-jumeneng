'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Newspaper,
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
  Image as ImageIcon,
} from 'lucide-react';
import { Berita, StatusBerita } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';
import {
  tambahBeritaAction,
  updateBeritaAction,
  hapusBeritaAction,
} from '../actions';

interface BeritaClientProps {
  initialBerita: Berita[];
}

export default function BeritaClient({ initialBerita }: BeritaClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [beritaList, setBeritaList] = useState<Berita[]>(initialBerita);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Berita | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Berita | null>(null);

  // Notification State
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Form Field States
  const [formJudul, setFormJudul] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formKategori, setFormKategori] = useState('Warta Dusun');
  const [formRingkasan, setFormRingkasan] = useState('');
  const [formKonten, setFormKonten] = useState('');
  const [formGambarUrl, setFormGambarUrl] = useState('');
  const [formTanggal, setFormTanggal] = useState('');
  const [formStatus, setFormStatus] = useState<StatusBerita>('published');

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormJudul('');
    setFormSlug('');
    setFormKategori('Warta Dusun');
    setFormRingkasan('');
    setFormKonten('');
    setFormGambarUrl('');
    setFormTanggal(new Date().toISOString().split('T')[0]);
    setFormStatus('published');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: Berita) => {
    setEditingItem(item);
    setFormJudul(item.judul);
    setFormSlug(item.slug || '');
    setFormKategori(item.kategori || 'Warta Dusun');
    setFormRingkasan(item.ringkasan || '');
    setFormKonten(item.konten || '');
    setFormGambarUrl(item.gambar_url || '');
    setFormTanggal(
      item.tanggal_publikasi
        ? new Date(item.tanggal_publikasi).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]
    );
    setFormStatus(item.status || 'published');
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul.trim()) {
      showToast('error', 'Judul berita wajib diisi.');
      return;
    }
    if (!formKonten.trim()) {
      showToast('error', 'Isi konten berita wajib diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('judul', formJudul);
    formData.append('slug', formSlug);
    formData.append('kategori', formKategori);
    formData.append('ringkasan', formRingkasan || formJudul);
    formData.append('konten', formKonten);
    formData.append('gambar_url', formGambarUrl);
    formData.append('tanggal_publikasi', formTanggal);
    formData.append('status', formStatus);

    startTransition(async () => {
      if (editingItem) {
        const res = await updateBeritaAction(editingItem.id, formData);
        if (res.success) {
          showToast('success', 'Berita berhasil diperbarui.');
          setBeritaList((prev) =>
            prev.map((b) =>
              b.id === editingItem.id
                ? {
                    ...b,
                    judul: formJudul,
                    slug: formSlug || b.slug,
                    kategori: formKategori,
                    ringkasan: formRingkasan,
                    konten: formKonten,
                    gambar_url: formGambarUrl || null,
                    tanggal_publikasi: formTanggal,
                    status: formStatus,
                  }
                : b
            )
          );
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal memperbarui berita.');
        }
      } else {
        const res = await tambahBeritaAction(formData);
        if (res.success && res.data) {
          showToast('success', 'Berita baru berhasil diterbitkan.');
          setBeritaList((prev) => [res.data as Berita, ...prev]);
          setIsModalOpen(false);
          router.refresh();
        } else {
          showToast('error', res.error || 'Gagal menambahkan berita.');
        }
      }
    });
  };

  // Handle Delete
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await hapusBeritaAction(deleteTarget.id);
      if (res.success) {
        showToast('success', `Berita "${deleteTarget.judul}" berhasil dihapus.`);
        setBeritaList((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menghapus berita.');
      }
    });
  };

  // Filtered List
  const filteredBerita = beritaList.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <Newspaper className="w-4 h-4" />
            <span>Manajemen Konten Publikasi</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Kelola Berita & Kegiatan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Publikasikan warta, agenda kegiatan dusun, serta pengumuman resmi warga Jumeneng Kidul.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Berita</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau ringkasan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({beritaList.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                statusFilter === 'published'
                  ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terbit ({beritaList.filter((b) => b.status === 'published').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                statusFilter === 'draft'
                  ? 'bg-white text-amber-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Draf ({beritaList.filter((b) => b.status === 'draft').length})
            </button>
          </div>
        </div>
      </div>

      {/* Berita Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredBerita.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Tidak ada artikel berita ditemukan
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'Tidak ada hasil untuk kata kunci pencarian tersebut.'
                : 'Mulai dengan menambahkan berita baru untuk warga.'}
            </p>
            {!searchQuery && (
              <button
                type="button"
                onClick={handleOpenCreate}
                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Berita Sekarang
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4 w-16">
                    Cover
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Judul & Ringkasan
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-36">
                    Tanggal Terbit
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-28">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right w-36">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBerita.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/75 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center shrink-0">
                        {item.gambar_url ? (
                          <img
                            src={item.gambar_url}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </td>

                    {/* Judul & Ringkasan */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">
                        {item.judul}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.ringkasan}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400">
                        <span>Slug: /{item.slug}</span>
                      </div>
                    </td>

                    {/* Tanggal Terbit */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap text-slate-600">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatTanggalIndonesia(item.tanggal_publikasi)}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 align-top">
                      {item.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Terbit
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          Draf
                        </span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Lihat Halaman Publik"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Berita"
                          className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          title="Hapus Berita"
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

      {/* Modal Tambah / Edit Berita */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-slate-900 text-base">
                    {editingItem ? 'Edit Berita & Warta' : 'Tambah Berita Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? 'Perbarui detail artikel publikasi padukuhan'
                      : 'Isi formulir untuk menerbitkan warta dusun'}
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

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Judul Berita */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Berita <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kerja Bakti Massal Sambut HUT Dusun"
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              {/* Kategori Berita & Kustomisasi Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Berita <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  >
                    <option value="Lingkungan">Lingkungan (Kerja bakti, kebersihan)</option>
                    <option value="Kesehatan">Kesehatan (Posyandu, imunisasi, lansia)</option>
                    <option value="Pemerintahan">Pemerintahan (Rapat RT/RW, pamong)</option>
                    <option value="Warta Dusun">Warta Dusun (Kegiatan umum, pengumuman)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Slug URL Permanen{' '}
                    <span className="text-[11px] font-normal text-slate-400">
                      (Opsional / otomatis)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="kegiatan-posyandu-balita-lansia"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono text-xs"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Akan diakses pada: <code className="text-emerald-700 font-mono">/berita/{'{slug}'}</code>
                  </p>
                </div>
              </div>

              {/* URL Cover Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Gambar Cover / Foto Dokumentasi
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... atau URL gambar lainnya"
                  value={formGambarUrl}
                  onChange={(e) => setFormGambarUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
                {formGambarUrl && (
                  <div className="mt-2 w-full h-32 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative">
                    <img
                      src={formGambarUrl}
                      alt="Pratinjau cover"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Tanggal Publikasi & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Publikasi
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
                    Status Publikasi
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StatusBerita)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  >
                    <option value="published">Terbit (Tayang di Web)</option>
                    <option value="draft">Draf (Disimpan Sementara)</option>
                  </select>
                </div>
              </div>

              {/* Ringkasan Singkat */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ringkasan Singkat (Lead Paragraph)
                </label>
                <textarea
                  rows={2}
                  placeholder="Cuplikan ringkas tentang kegiatan yang akan tampil di kartu berita..."
                  value={formRingkasan}
                  onChange={(e) => setFormRingkasan(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              {/* Konten Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Konten Lengkap Berita <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan narasi lengkap berita dusun di sini..."
                  value={formKonten}
                  onChange={(e) => setFormKonten(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-sans leading-relaxed"
                />
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
                  <span>{editingItem ? 'Simpan Perubahan' : 'Terbitkan Berita'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dialog Konfirmasi Hapus */}
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
                Hapus Berita Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Anda akan menghapus artikel warta &ldquo;
                <span className="font-semibold text-slate-700">{deleteTarget.judul}</span>
                &rdquo;. Berita ini tidak akan lagi tampil di portal publik warga.
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
                <span>Ya, Hapus Berita</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
