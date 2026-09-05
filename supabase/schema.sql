-- ============================================================================
-- SKEMA DATABASE SUPABASE: PORTAL PROFIL & CMS PADUKUHAN JUMENENG KIDUL
-- Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta
-- ============================================================================

-- Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. TABEL: profil_desa
-- Menyimpan informasi umum, identitas, sejarah, visi misi, dan kontak padukuhan
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 2. TABEL: statistik_kependudukan
-- Menyimpan metrik demografi penduduk, KK, RT, RW, dan rasio gender
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 3. TABEL: struktur_pemerintahan
-- Menyimpan data pengurus dusun (Dukuh, Ketua RW, dan Ketua RT)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS struktur_pemerintahan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('dukuh', 'rw', 'rt')),
  foto_url TEXT,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 4. TABEL: sarana_prasarana
-- Menyimpan inventaris sarana dan prasarana fasilitas umum dusun
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sarana_prasarana (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kategori TEXT NOT NULL,
  nama_fasilitas TEXT NOT NULL,
  jumlah TEXT NOT NULL,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 5. TABEL: potensi_wilayah
-- Menyimpan potensi dusun lengkap dengan 4 field terstruktur
-- (kegiatan_utama, keunggulan_hasil, tantangan_kendala, sumber_data)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 6. TABEL: berita
-- Menyimpan artikel berita, pengumuman, dan publikasi kegiatan warga
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 7. TABEL: galeri
-- Menyimpan dokumentasi foto kegiatan dusun beserta caption
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS galeri (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul_kegiatan TEXT NOT NULL,
  foto_url TEXT NOT NULL,
  tanggal_kegiatan DATE,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 8. TABEL: pesan_kontak
-- Menyimpan pesan, aspirasi, dan pertanyaan warga dari formulir kontak
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pesan_kontak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_pengirim TEXT NOT NULL,
  pesan TEXT NOT NULL,
  no_telepon TEXT,
  dibaca BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_struktur_kategori ON struktur_pemerintahan(kategori);
CREATE INDEX IF NOT EXISTS idx_struktur_urutan ON struktur_pemerintahan(urutan);

CREATE INDEX IF NOT EXISTS idx_sarana_kategori ON sarana_prasarana(kategori);
CREATE INDEX IF NOT EXISTS idx_sarana_urutan ON sarana_prasarana(urutan);

CREATE INDEX IF NOT EXISTS idx_potensi_urutan ON potensi_wilayah(urutan);

CREATE INDEX IF NOT EXISTS idx_berita_slug ON berita(slug);
CREATE INDEX IF NOT EXISTS idx_berita_tanggal ON berita(tanggal_publikasi DESC);
CREATE INDEX IF NOT EXISTS idx_berita_status ON berita(status);

CREATE INDEX IF NOT EXISTS idx_galeri_urutan ON galeri(urutan);

CREATE INDEX IF NOT EXISTS idx_pesan_created ON pesan_kontak(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pesan_dibaca ON pesan_kontak(dibaca);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Aktifkan RLS di seluruh tabel
ALTER TABLE profil_desa ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistik_kependudukan ENABLE ROW LEVEL SECURITY;
ALTER TABLE struktur_pemerintahan ENABLE ROW LEVEL SECURITY;
ALTER TABLE sarana_prasarana ENABLE ROW LEVEL SECURITY;
ALTER TABLE potensi_wilayah ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE pesan_kontak ENABLE ROW LEVEL SECURITY;

-- 1. profil_desa: Publik bisa baca, Admin autentikasi bisa kelola
CREATE POLICY "Public Read profil_desa"
  ON profil_desa FOR SELECT
  USING (true);

CREATE POLICY "Admin All profil_desa"
  ON profil_desa FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. statistik_kependudukan: Publik bisa baca, Admin autentikasi bisa kelola
CREATE POLICY "Public Read statistik_kependudukan"
  ON statistik_kependudukan FOR SELECT
  USING (true);

CREATE POLICY "Admin All statistik_kependudukan"
  ON statistik_kependudukan FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. struktur_pemerintahan: Publik bisa baca, Admin autentikasi bisa kelola
CREATE POLICY "Public Read struktur_pemerintahan"
  ON struktur_pemerintahan FOR SELECT
  USING (true);

CREATE POLICY "Admin All struktur_pemerintahan"
  ON struktur_pemerintahan FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. sarana_prasarana: Publik bisa baca, Admin autentikasi bisa kelola
CREATE POLICY "Public Read sarana_prasarana"
  ON sarana_prasarana FOR SELECT
  USING (true);

CREATE POLICY "Admin All sarana_prasarana"
  ON sarana_prasarana FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. potensi_wilayah: Publik bisa baca, Admin autentikasi bisa kelola
CREATE POLICY "Public Read potensi_wilayah"
  ON potensi_wilayah FOR SELECT
  USING (true);

CREATE POLICY "Admin All potensi_wilayah"
  ON potensi_wilayah FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. berita: Publik bisa baca artikel published, Admin autentikasi bisa kelola semua
CREATE POLICY "Public Read published berita"
  ON berita FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admin All berita"
  ON berita FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. galeri: Publik bisa baca, Admin autentikasi bisa kelola
CREATE POLICY "Public Read galeri"
  ON galeri FOR SELECT
  USING (true);

CREATE POLICY "Admin All galeri"
  ON galeri FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. pesan_kontak: Publik bisa INSERT pesan baru, Admin autentikasi bisa SELECT/UPDATE/DELETE
CREATE POLICY "Public Insert pesan_kontak"
  ON pesan_kontak FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin All pesan_kontak"
  ON pesan_kontak FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- STORAGE BUCKET (Jalankan di Supabase SQL Editor jika belum ada)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('desa-media', 'desa-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access Storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'desa-media');

CREATE POLICY "Authenticated Upload Storage"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'desa-media');

CREATE POLICY "Authenticated Update Storage"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'desa-media');

CREATE POLICY "Authenticated Delete Storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'desa-media');
