'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  History,
  Compass,
  Users,
  Phone,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ProfilDesa, StatistikKependudukan } from '@/lib/types';
import { updateProfilAction, updateStatistikAction } from '../actions';

interface ProfilClientProps {
  initialProfil: ProfilDesa;
  initialStatistik: StatistikKependudukan;
}

export default function ProfilClient({
  initialProfil,
  initialStatistik,
}: ProfilClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [activeTab, setActiveTab] = useState<'sejarah' | 'visi-misi' | 'statistik' | 'kontak'>('sejarah');

  // Notification Toast
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // State Tab 1: Sejarah & Hero
  const [namaDusun, setNamaDusun] = useState(initialProfil.nama_dusun || '');
  const [kalurahan, setKalurahan] = useState(initialProfil.kalurahan || '');
  const [kapanewon, setKapanewon] = useState(initialProfil.kapanewon || '');
  const [kabupaten, setKabupaten] = useState(initialProfil.kabupaten || '');
  const [provinsi, setProvinsi] = useState(initialProfil.provinsi || '');
  const [deskripsiHero, setDeskripsiHero] = useState(initialProfil.deskripsi_hero || '');
  const [sejarah, setSejarah] = useState(initialProfil.sejarah || '');
  const [gambarProfilUrl, setGambarProfilUrl] = useState(initialProfil.gambar_profil_url || '');

  // State Tab 2: Visi & Misi
  const [visi, setVisi] = useState(initialProfil.visi || '');
  const [misiList, setMisiList] = useState<string[]>(
    initialProfil.misi && initialProfil.misi.length > 0
      ? initialProfil.misi
      : ['Mengembangkan potensi pertanian dan usaha lokal warga.']
  );
  const [newMisiInput, setNewMisiInput] = useState('');

  // State Tab 3: Statistik Demografi
  const [totalPenduduk, setTotalPenduduk] = useState<number>(initialStatistik.total_penduduk || 0);
  const [kepalaKeluarga, setKepalaKeluarga] = useState<number>(initialStatistik.kepala_keluarga || 0);
  const [jumlahRt, setJumlahRt] = useState<number>(initialStatistik.jumlah_rt || 0);
  const [jumlahRw, setJumlahRw] = useState<number>(initialStatistik.jumlah_rw || 0);
  const [jumlahLakiLaki, setJumlahLakiLaki] = useState<number>(initialStatistik.jumlah_laki_laki || 0);
  const [jumlahPerempuan, setJumlahPerempuan] = useState<number>(initialStatistik.jumlah_perempuan || 0);

  // State Tab 4: Kontak & Alamat
  const [kontakTelepon, setKontakTelepon] = useState(initialProfil.kontak_telepon || '');
  const [kontakAlamat, setKontakAlamat] = useState(initialProfil.kontak_alamat || '');
  const [kontakMapUrl, setKontakMapUrl] = useState(initialProfil.kontak_map_url || '');

  // Add Misi Item
  const handleAddMisi = () => {
    if (!newMisiInput.trim()) return;
    setMisiList((prev) => [...prev, newMisiInput.trim()]);
    setNewMisiInput('');
  };

  // Remove Misi Item
  const handleRemoveMisi = (idx: number) => {
    setMisiList((prev) => prev.filter((_, i) => i !== idx));
  };

  // Update Misi Item
  const handleUpdateMisi = (idx: number, val: string) => {
    setMisiList((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  // Save Tab 1 (Sejarah & Hero)
  const handleSaveSejarah = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama_dusun', namaDusun);
    formData.append('kalurahan', kalurahan);
    formData.append('kapanewon', kapanewon);
    formData.append('kabupaten', kabupaten);
    formData.append('provinsi', provinsi);
    formData.append('deskripsi_hero', deskripsiHero);
    formData.append('sejarah', sejarah);
    formData.append('gambar_profil_url', gambarProfilUrl);

    startTransition(async () => {
      const res = await updateProfilAction(formData);
      if (res.success) {
        showToast('success', 'Sejarah dan narasi profil padukuhan berhasil disimpan!');
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menyimpan profil padukuhan.');
      }
    });
  };

  // Save Tab 2 (Visi Misi)
  const handleSaveVisiMisi = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('visi', visi);
    formData.append('misi', misiList.join('\n'));

    startTransition(async () => {
      const res = await updateProfilAction(formData);
      if (res.success) {
        showToast('success', 'Visi dan Misi padukuhan berhasil diperbarui!');
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal menyimpan visi & misi.');
      }
    });
  };

  // Save Tab 3 (Statistik)
  const handleSaveStatistik = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('total_penduduk', totalPenduduk.toString());
    formData.append('kepala_keluarga', kepalaKeluarga.toString());
    formData.append('jumlah_rt', jumlahRt.toString());
    formData.append('jumlah_rw', jumlahRw.toString());
    formData.append('jumlah_laki_laki', jumlahLakiLaki.toString());
    formData.append('jumlah_perempuan', jumlahPerempuan.toString());

    startTransition(async () => {
      const res = await updateStatistikAction(formData);
      if (res.success) {
        showToast('success', 'Data statistik demografi kependudukan berhasil diperbarui!');
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal memperbarui data kependudukan.');
      }
    });
  };

  // Save Tab 4 (Kontak)
  const handleSaveKontak = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('kontak_telepon', kontakTelepon);
    formData.append('kontak_alamat', kontakAlamat);
    formData.append('kontak_map_url', kontakMapUrl);

    startTransition(async () => {
      const res = await updateProfilAction(formData);
      if (res.success) {
        showToast('success', 'Informasi kontak dan alamat padukuhan berhasil diperbarui!');
        router.refresh();
      } else {
        showToast('error', res.error || 'Gagal memperbarui info kontak.');
      }
    });
  };

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
            <BookOpen className="w-4 h-4" />
            <span>Identitas & Data Pokok Dusun</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            Profil & Demografi Padukuhan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Konfigurasi sejarah, visi-misi, statistik demografi, dan alamat kontak Padukuhan Jumeneng Kidul.
          </p>
        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('sejarah')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'sejarah'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Tab 1: Sejarah & Narasi Hero</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('visi-misi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'visi-misi'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tab 2: Visi & Misi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('statistik')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'statistik'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Tab 3: Statistik Demografi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('kontak')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'kontak'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Tab 4: Info Kontak & Alamat</span>
        </button>
      </div>

      {/* TAB 1: SEJARAH & NARASI HERO */}
      {activeTab === 'sejarah' && (
        <form onSubmit={handleSaveSejarah} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-700" />
              Kisah Sejarah & Narasi Pengantar (Hero)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit sejarah tokoh Kyai Nur Jumeneng, pembagian wilayah Jumeneng Lor dan Kidul, serta identitas administrasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Padukuhan
              </label>
              <input
                type="text"
                value={namaDusun}
                onChange={(e) => setNamaDusun(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kalurahan
              </label>
              <input
                type="text"
                value={kalurahan}
                onChange={(e) => setKalurahan(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kapanewon
              </label>
              <input
                type="text"
                value={kapanewon}
                onChange={(e) => setKapanewon(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kabupaten
              </label>
              <input
                type="text"
                value={kabupaten}
                onChange={(e) => setKabupaten(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Provinsi
              </label>
              <input
                type="text"
                value={provinsi}
                onChange={(e) => setProvinsi(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Pengantar Hero (Beranda Depan)
            </label>
            <textarea
              rows={3}
              value={deskripsiHero}
              onChange={(e) => setDeskripsiHero(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Teks ini ditampilkan di banner utama halaman beranda publik.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kisah Sejarah Lengkap (Kyai Nur Jumeneng & Pemekaran Jumeneng Gedhe)
            </label>
            <textarea
              rows={8}
              value={sejarah}
              onChange={(e) => setSejarah(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-sans leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Foto Cover Profil Padukuhan
            </label>
            <input
              type="url"
              value={gambarProfilUrl}
              onChange={(e) => setGambarProfilUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Perubahan Sejarah</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: VISI & MISI */}
      {activeTab === 'visi-misi' && (
        <form onSubmit={handleSaveVisiMisi} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              Visi & Misi Padukuhan
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tentukan arah tujuan jangka panjang dan butir-butir program misi padukuhan secara dinamis.
            </p>
          </div>

          {/* Visi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pernyataan Visi Dusun <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 leading-relaxed"
            />
          </div>

          {/* Misi Dinamis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Butir-butir Misi Dusun ({misiList.length} Butir)
              </label>
            </div>

            <div className="space-y-2">
              {misiList.map((misiItem, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={misiItem}
                    onChange={(e) => handleUpdateMisi(idx, e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMisi(idx)}
                    title="Hapus Butir Misi"
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Tambah Misi Baru Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Tulis butir misi baru..."
                value={newMisiInput}
                onChange={(e) => setNewMisiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddMisi();
                  }
                }}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-dashed border-slate-300 focus:border-solid focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="button"
                onClick={handleAddMisi}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Butir</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Visi & Misi</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: STATISTIK DEMOGRAFI */}
      {activeTab === 'statistik' && (
        <form onSubmit={handleSaveStatistik} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              Statistik Demografi & Kependudukan
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Perbarui angka agregat kependudukan dusun yang tampil pada kartu ringkasan beranda dan profil desa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Total Penduduk */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Penduduk (Jiwa)
              </label>
              <input
                type="number"
                min={0}
                value={totalPenduduk}
                onChange={(e) => setTotalPenduduk(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 text-lg font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Seluruh warga tercatat</span>
            </div>

            {/* Kepala Keluarga */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kepala Keluarga (KK)
              </label>
              <input
                type="number"
                min={0}
                value={kepalaKeluarga}
                onChange={(e) => setKepalaKeluarga(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 text-lg font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Total kepala keluarga</span>
            </div>

            {/* Jumlah RT */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Rukun Tetangga (RT)
              </label>
              <input
                type="number"
                min={0}
                value={jumlahRt}
                onChange={(e) => setJumlahRt(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 text-lg font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">RT 01 s/d RT 09</span>
            </div>

            {/* Jumlah RW */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Rukun Warga (RW)
              </label>
              <input
                type="number"
                min={0}
                value={jumlahRw}
                onChange={(e) => setJumlahRw(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 text-lg font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">RW 19, 20, 21, 39</span>
            </div>

            {/* Laki-laki */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Laki-laki (Jiwa)
              </label>
              <input
                type="number"
                min={0}
                value={jumlahLakiLaki}
                onChange={(e) => setJumlahLakiLaki(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 text-lg font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Warga berjenis kelamin pria</span>
            </div>

            {/* Perempuan */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Perempuan (Jiwa)
              </label>
              <input
                type="number"
                min={0}
                value={jumlahPerempuan}
                onChange={(e) => setJumlahPerempuan(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 text-lg font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Warga berjenis kelamin wanita</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Data Statistik</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: INFO KONTAK & ALAMAT */}
      {activeTab === 'kontak' && (
        <form onSubmit={handleSaveKontak} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-700" />
              Informasi Kontak & Alamat Wilayah
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Perbarui nomor kontak hotline WhatsApp pengurus, alamat sekretariat dusun, serta sematan peta Google Maps.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor Telepon / Hotline WhatsApp Pengurus
              </label>
              <input
                type="text"
                placeholder="Contoh: 0878-3906-4121"
                value={kontakTelepon}
                onChange={(e) => setKontakTelepon(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Nomor ini akan digunakan sebagai nomor hotline resmi pada bagian kontak publik.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Fisik Balai / Sekretariat Dusun
              </label>
              <textarea
                rows={2}
                value={kontakAlamat}
                onChange={(e) => setKontakAlamat(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                URL Sematan Peta Google Maps (Embed URL)
              </label>
              <input
                type="url"
                value={kontakMapUrl}
                onChange={(e) => setKontakMapUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Gunakan URL embed Google Maps (contoh: https://www.google.com/maps?q=...&output=embed)
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Info Kontak</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
