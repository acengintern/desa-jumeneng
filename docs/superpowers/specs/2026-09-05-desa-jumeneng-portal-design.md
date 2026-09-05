# Dokumen Desain Teknis: Portal Profil & CMS Padukuhan Jumeneng Kidul

- **Tanggal**: 05 September 2026
- **Status**: Disetujui (Approved)
- **Tech Stack**: Next.js 14/15 (App Router, React, TypeScript), Tailwind CSS, Lucide Icons, Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel Free Tier + Supabase Free Tier
- **Referensi Awal**: `https://info-jumenengkidul.site.je/`

---

## 1. Latar Belakang & Tujuan
Website profil Padukuhan Jumeneng Kidul sebelumnya dibangun menggunakan PHP native sederhana berorientasi landing page brosur KKN. Pembaruan ini bertujuan untuk:
1. Memodernisasi tampilan dan pengalaman pengguna (UI/UX) agar setara dengan standar portal instansi profesional.
2. Mempertahankan 100% struktur menu dan konten yang ada saat ini tanpa menambah fitur di luar cakupan eksisting.
3. Membangun sistem pengelolaan konten (CMS Admin Panel) yang aman, responsif, dan mudah digunakan oleh pengurus dusun/admin.
4. Mengoptimalkan infrastruktur dengan stack modern gratis (Next.js di Vercel dan database/storage di Supabase).

---

## 2. Cakupan Menu & Fitur (100% Sesuai Menu Eksisting)

### 2.1. Portal Publik (Frontend)
1. **Navigasi & Header**:
   - Sticky navbar dengan backdrop blur.
   - Menu anchor navigasi: *Beranda, Profil, Pemerintahan, Sarana & Prasarana, Potensi, Berita, Galeri, Kontak*.
   - Responsive mobile drawer menu.
2. **Beranda (Hero & Quick Stats)**:
   - Identitas wilayah: Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Sleman, DIY.
   - Teks sambutan hangat & deskripsi padukuhan.
   - 4 Kartu Statistik Cepat: Jumlah Penduduk (1659), Kepala Keluarga (527), RT (9), RW/Kring (5).
3. **Profil & Visi Misi**:
   - Sejarah & Asal-usul wilayah: Kisah Kyai Nur Jumeneng dan pemekaran Jumeneng Gedhe.
   - Visi & Misi dusun terstruktur.
   - Grafik demografi perbandingan jenis kelamin (Laki-laki vs Perempuan).
   - Informasi mata pencaharian warga dan lembaga pendidikan.
4. **Struktur Pemerintahan Dusun**:
   - Hierarki pengurus: Kepala Dukuh, Ketua RW, Ketua RT 01 s/d 09.
   - Kartu profil pengurus dengan foto, nama, dan jabatan.
5. **Sarana & Prasarana**:
   - Grid fasilitas per kategori (Ibadah, Pendidikan, Kesehatan, Balai Dusun, Olahraga, Keamanan/Ronda, Lembaga Kemasyarakatan).
   - Keterangan jumlah dan status ketersediaan unit.
6. **Potensi Wilayah**:
   - Kartu potensi: Pertanian, UMKM Rumahan, Kehidupan Keagamaan, Peternakan.
   - Modal pop-up interaktif saat kartu diklik yang memuat data terstruktur: *Kegiatan Utama, Potensi & Keunggulan, Tantangan & Kendala, Sumber Data*.
7. **Berita & Kegiatan**:
   - Kartu artikel berita kegiatan warga dengan gambar cover, tanggal publikasi, ringkasan, dan konten lengkap.
8. **Galeri Dokumentasi**:
   - Grid foto kegiatan warga dengan caption dan tampilan lightbox pembesar foto.
9. **Kontak & Peta**:
   - Alamat dusun dan tautan WhatsApp resmi pengurus.
   - Formulir pesan interaktif untuk aspirasi/pertanyaan warga dengan validasi dan alert konfirmasi.
   - Google Maps embed lokasi Padukuhan Jumeneng Kidul.
10. **Footer**:
    - Hak Cipta, kredit pengembang Mahasiswa KKN Universitas AKPRIND Indonesia, dan tautan Login Admin.

---

### 2.2. Admin Panel (CMS Pengurus Dusun)
1. **Autentikasi & Keamanan**:
   - Proteksi sesi via Supabase Auth (Email & Password).
   - Next.js Middleware guard untuk seluruh rute `/admin/*` (kecuali `/admin/login`).
2. **Dashboard Overview**:
   - Widget statistik total data (Berita, Galeri, Pengurus, Sarana, Pesan Masuk).
   - Indikator notifikasi pesan baru belum dibaca.
3. **Modul Kelola Berita**:
   - CRUD Berita & Kegiatan (Judul, Ringkasan, Konten, Tanggal).
   - Unggah gambar sampul langsung ke Supabase Storage Bucket.
4. **Modul Kelola Galeri**:
   - CRUD Foto Dokumentasi Kegiatan Warga + Caption.
5. **Modul Kelola Struktur Pemerintahan**:
   - CRUD Pengurus Dusun (Nama, Jabatan, Kategori Dukuh/RW/RT, Foto, Urutan tampil).
6. **Modul Kelola Sarana & Prasarana**:
   - CRUD Fasilitas Dusun (Kategori, Nama Sarana, Jumlah/Status).
7. **Modul Kelola Potensi Wilayah**:
   - CRUD Potensi (Judul, Icon, Deskripsi, Kegiatan Utama, Keunggulan, Kendala, Sumber Data).
8. **Modul Kelola Profil & Demografi**:
   - Pengaturan teks Sejarah & Deskripsi Hero.
   - Pengaturan Visi dan daftar butir Misi.
   - Update angka demografi (Penduduk, KK, RT, RW, Laki-laki, Perempuan).
9. **Modul Kotak Masuk Pesan**:
   - Daftar pesan dari formulir kontak warga dengan status baca dan opsi kelola.

---

## 3. Skema Database Supabase (PostgreSQL)

```sql
-- 1. Tabel Profil & Informasi Dusun
CREATE TABLE IF NOT EXISTS profil_desa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_dusun TEXT NOT NULL DEFAULT 'Padukuhan Jumeneng Kidul',
  kalurahan TEXT NOT NULL DEFAULT 'Sumberadi',
  kapanewon TEXT NOT NULL DEFAULT 'Mlati',
  kabupaten TEXT NOT NULL DEFAULT 'Sleman',
  provinsi TEXT NOT NULL DEFAULT 'Daerah Istimewa Yogyakarta',
  deskripsi_hero TEXT NOT NULL,
  sejarah TEXT NOT NULL,
  visi TEXT NOT NULL,
  misi JSONB NOT NULL DEFAULT '[]'::jsonb,
  mata_pencaharian_desc TEXT,
  lembaga_pendidikan JSONB NOT NULL DEFAULT '[]'::jsonb,
  kontak_telepon TEXT,
  kontak_alamat TEXT,
  kontak_map_url TEXT,
  gambar_profil_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel Statistik Kependudukan
CREATE TABLE IF NOT EXISTS statistik_kependudukan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_penduduk INT NOT NULL DEFAULT 1659,
  kepala_keluarga INT NOT NULL DEFAULT 527,
  jumlah_rt INT NOT NULL DEFAULT 9,
  jumlah_rw INT NOT NULL DEFAULT 5,
  jumlah_laki_laki INT NOT NULL DEFAULT 852,
  jumlah_perempuan INT NOT NULL DEFAULT 805,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabel Struktur Pemerintahan
CREATE TABLE IF NOT EXISTS struktur_pemerintahan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('dukuh', 'rw', 'rt')),
  foto_url TEXT,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabel Sarana & Prasarana
CREATE TABLE IF NOT EXISTS sarana_prasarana (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kategori TEXT NOT NULL,
  nama_fasilitas TEXT NOT NULL,
  jumlah TEXT NOT NULL,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Tabel Potensi Wilayah
CREATE TABLE IF NOT EXISTS potensi_wilayah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🌾',
  deskripsi_singkat TEXT NOT NULL,
  kegiatan_utama TEXT,
  keunggulan_hasil TEXT,
  tantangan_kendala TEXT,
  sumber_data TEXT,
  detail_konten_html TEXT,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Tabel Berita & Kegiatan
CREATE TABLE IF NOT EXISTS berita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  gambar_url TEXT,
  tanggal_publikasi DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Tabel Galeri Foto
CREATE TABLE IF NOT EXISTS galeri (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul_kegiatan TEXT NOT NULL,
  foto_url TEXT NOT NULL,
  tanggal_kegiatan DATE,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Tabel Pesan Masuk Kontak
CREATE TABLE IF NOT EXISTS pesan_kontak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_pengirim TEXT NOT NULL,
  pesan TEXT NOT NULL,
  no_telepon TEXT,
  dibaca BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. Struktur Direktori Proyek Next.js

```text
desa-jumeneng/
├── app/
│   ├── (public)/                 # Halaman Portal Publik
│   │   ├── layout.tsx            # Header Navbar & Footer
│   │   └── page.tsx              # One-page view (Semua section)
│   ├── admin/                    # Portal Admin CMS
│   │   ├── login/page.tsx        # Login Form
│   │   └── (dashboard)/          # Protected Dashboard
│   │       ├── layout.tsx        # Admin Sidebar & Topbar
│   │       ├── page.tsx          # Ringkasan Dashboard
│   │       ├── berita/page.tsx   # Kelola Berita
│   │       ├── galeri/page.tsx   # Kelola Galeri
│   │       ├── struktur/page.tsx # Kelola Pemerintahan
│   │       ├── sarana/page.tsx   # Kelola Sarana & Prasarana
│   │       ├── potensi/page.tsx  # Kelola Potensi
│   │       ├── profil/page.tsx   # Kelola Profil & Demografi
│   │       └── pesan/page.tsx    # Kotak Masuk Pesan
│   └── globals.css
├── components/
│   ├── public/                   # Komponen khusus portal publik
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProfilSection.tsx
│   │   ├── PemdesSection.tsx
│   │   ├── SaranaSection.tsx
│   │   ├── PotensiSection.tsx
│   │   ├── PotensiModal.tsx
│   │   ├── BeritaSection.tsx
│   │   ├── GaleriSection.tsx
│   │   ├── KontakSection.tsx
│   │   └── Footer.tsx
│   ├── admin/                    # Komponen khusus admin
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   └── DataTable.tsx
│   └── ui/                       # Komponen UI umum (Button, Modal, Card, Input)
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server Component client
│   │   └── middleware.ts         # Session refresh & route guard
│   └── types.ts                  # TypeScript interface data
├── public/                       # Aset statis & logo
├── docs/
│   └── superpowers/specs/        # Dokumen perancangan
├── middleware.ts                 # Next.js Route Protection
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Seed Data Awal
Proyek akan dilengkapi dengan script / SQL seed yang memuat seluruh data nyata yang telah diunduh dari `info-jumenengkidul.site.je` (14 pengurus RT/RW/Dukuh, 7 kategori sarana, 4 potensi wilayah lengkap, visi misi, statistik 1659 jiwa, dan data sejarah Kyai Nur Jumeneng), sehingga saat pertama kali dijalankan langsung memiliki konten lengkap dan akurat.

---

## 6. Verifikasi & Pengujian
1. **Verifikasi Publik**: Seluruh 8 seksi dapat dimuat dengan cepat, responsif di mobile/desktop, modal potensi berfungsi lancar, form kontak berhasil mengirim data.
2. **Verifikasi Admin**: Login admin berhasil, rute dashboard terproteksi dari akses unauthenticated, seluruh operasi tambah/edit/hapus berjalan sukses ke Supabase.
3. **Verifikasi Build**: `npm run build` berjalan tanpa error TypeScript maupun linting.
