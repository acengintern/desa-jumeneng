/**
 * Tipe Data TypeScript untuk Portal Profil & CMS Padukuhan Jumeneng Kidul
 * Sesuai skema database Supabase & spesifikasi teknis proyek.
 */

// 1. Profil Desa / Padukuhan
export interface ProfilDesa {
  id: string;
  nama_dusun: string;
  kalurahan: string;
  kapanewon: string;
  kabupaten: string;
  provinsi: string;
  deskripsi_hero: string;
  sejarah: string;
  visi: string;
  misi: string[];
  mata_pencaharian_desc?: string;
  lembaga_pendidikan?: string[];
  kontak_telepon?: string;
  kontak_alamat?: string;
  kontak_map_url?: string;
  gambar_profil_url?: string;
  updated_at?: string;
}

// 2. Statistik Kependudukan
export interface StatistikKependudukan {
  id: string;
  total_penduduk: number;
  kepala_keluarga: number;
  jumlah_rt: number;
  jumlah_rw: number;
  jumlah_laki_laki: number;
  jumlah_perempuan: number;
  updated_at?: string;
}

// 3. Struktur Pemerintahan / Pengurus Dusun
export type KategoriPengurus = 'dukuh' | 'rw' | 'rt';

export interface PengurusDusun {
  id: string;
  nama: string;
  jabatan: string;
  kategori: KategoriPengurus;
  foto_url?: string | null;
  urutan: number;
  created_at?: string;
}

// Alias untuk kecocokan penamaan tabel `struktur_pemerintahan`
export type StrukturPemerintahan = PengurusDusun;

// 4. Sarana & Prasarana
export interface SaranaPrasarana {
  id: string;
  kategori: string;
  nama_fasilitas: string;
  jumlah: string;
  urutan: number;
  created_at?: string;
}

// 5. Potensi Wilayah
export interface PotensiWilayah {
  id: string;
  judul: string;
  icon: string;
  deskripsi_singkat: string;
  kegiatan_utama: string;
  keunggulan_hasil: string;
  tantangan_kendala: string;
  sumber_data: string;
  gambar_url?: string | null;
  detail_konten_html?: string | null;
  urutan: number;
  created_at?: string;
}

// 6. Berita & Kegiatan
export type StatusBerita = 'published' | 'draft';

export interface Berita {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  gambar_url?: string | null;
  tanggal_publikasi: string;
  status: StatusBerita;
  created_at?: string;
}

// 7. Galeri Foto Dokumentasi
export interface Galeri {
  id: string;
  judul_kegiatan: string;
  foto_url: string;
  tanggal_kegiatan?: string | null;
  urutan: number;
  created_at?: string;
}

// 8. Pesan Kontak / Aspirasi Warga
export interface PesanKontak {
  id: string;
  nama_pengirim: string;
  pesan: string;
  no_telepon?: string | null;
  dibaca: boolean;
  created_at?: string;
}

// Response & State Types
export interface DashboardStats {
  totalBerita: number;
  totalGaleri: number;
  totalPengurus: number;
  totalSarana: number;
  totalPesan: number;
  pesanBelumDibaca: number;
}
