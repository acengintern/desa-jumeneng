-- ============================================================================
-- SEED DATA SUPABASE: PORTAL PROFIL & CMS PADUKUHAN JUMENENG KIDUL
-- Data autentik hasil ekstraksi info-jumenengkidul.site.je
-- ============================================================================

-- 1. PROFIL DESA
INSERT INTO profil_desa (
  id,
  nama_dusun,
  kalurahan,
  kapanewon,
  kabupaten,
  provinsi,
  deskripsi_hero,
  sejarah,
  visi,
  misi,
  mata_pencaharian_desc,
  lembaga_pendidikan,
  kontak_telepon,
  kontak_alamat,
  kontak_map_url,
  gambar_profil_url
) VALUES (
  'a1000000-0000-0000-0000-000000000001',
  'Padukuhan Jumeneng Kidul',
  'Sumberadi',
  'Mlati',
  'Sleman',
  'Daerah Istimewa Yogyakarta',
  'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Menyajikan informasi seputar wilayah, pemerintahan, potensi, dan kegiatan warga.',
  E'Padukuhan Jumeneng Kidul merupakan pemekaran dari padukuhan besar bernama Jumeneng Gedhe, yang seiring perkembangan zaman dan kebijakan pemerintahan kalurahan kemudian dibagi menjadi dua, yaitu Jumeneng Lor dan Jumeneng Kidul.\n\nNama "Jumeneng" berasal dari sosok tokoh perintis wilayah ini, yakni Kyai Nur Jumeneng, yang pengaruhnya terhadap kehidupan sosial dan keagamaan warga masih terasa hingga sekarang. Padukuhan ini berada di wilayah administratif Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.',
  'Menjadi dusun yang mandiri, guyub, dan berkemajuan berbasis potensi lokal dan nilai-nilai keagamaan.',
  jsonb_build_array(
    'Mengembangkan potensi pertanian dan usaha lokal warga.',
    'Meningkatkan kualitas pendidikan dan kesehatan masyarakat.',
    'Melestarikan tradisi dan budaya dusun.',
    'Mendorong partisipasi aktif warga dalam pembangunan.'
  ),
  'Sebagian besar warga bermata pencaharian sebagai petani, buruh, dan pelaku UMKM.',
  jsonb_build_array(
    'TK / PAUD',
    'Sekolah Dasar Jumeneng'
  ),
  '0878-3906-4121',
  'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, DIY',
  'https://www.google.com/maps?q=Jumeneng+Kidul,+Sumberadi,+Mlati,+Sleman&output=embed',
  'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg'
) ON CONFLICT (id) DO UPDATE SET
  nama_dusun = EXCLUDED.nama_dusun,
  deskripsi_hero = EXCLUDED.deskripsi_hero,
  sejarah = EXCLUDED.sejarah,
  visi = EXCLUDED.visi,
  misi = EXCLUDED.misi,
  mata_pencaharian_desc = EXCLUDED.mata_pencaharian_desc,
  lembaga_pendidikan = EXCLUDED.lembaga_pendidikan,
  kontak_telepon = EXCLUDED.kontak_telepon,
  kontak_alamat = EXCLUDED.kontak_alamat,
  kontak_map_url = EXCLUDED.kontak_map_url,
  gambar_profil_url = EXCLUDED.gambar_profil_url;

-- 2. STATISTIK KEPENDUDUKAN
INSERT INTO statistik_kependudukan (
  id,
  total_penduduk,
  kepala_keluarga,
  jumlah_rt,
  jumlah_rw,
  jumlah_laki_laki,
  jumlah_perempuan
) VALUES (
  'b2000000-0000-0000-0000-000000000001',
  1659,
  527,
  9,
  5,
  852,
  805
) ON CONFLICT (id) DO UPDATE SET
  total_penduduk = EXCLUDED.total_penduduk,
  kepala_keluarga = EXCLUDED.kepala_keluarga,
  jumlah_rt = EXCLUDED.jumlah_rt,
  jumlah_rw = EXCLUDED.jumlah_rw,
  jumlah_laki_laki = EXCLUDED.jumlah_laki_laki,
  jumlah_perempuan = EXCLUDED.jumlah_perempuan;

-- 3. STRUKTUR PEMERINTAHAN (14 PENGURUS DUSUN)
INSERT INTO struktur_pemerintahan (id, nama, jabatan, kategori, foto_url, urutan) VALUES
('c3000000-0000-0000-0000-000000000001', 'Edhy Purwanta', 'Kepala Dukuh (Dukuh)', 'dukuh', 'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png', 1),
('c3000000-0000-0000-0000-000000000002', 'Ngabidi', 'Ketua RW 19', 'rw', NULL, 2),
('c3000000-0000-0000-0000-000000000003', 'Fastabiq ahmad', 'Ketua RT 01', 'rt', NULL, 3),
('c3000000-0000-0000-0000-000000000004', 'Usman Slamet', 'Ketua RT 02', 'rt', NULL, 4),
('c3000000-0000-0000-0000-000000000005', 'Moh Idris', 'Ketua RW 20', 'rw', NULL, 5),
('c3000000-0000-0000-0000-000000000006', 'Darojat Hilal Fatah', 'Ketua RT 03', 'rt', NULL, 6),
('c3000000-0000-0000-0000-000000000007', 'Dahri Iskandar', 'Ketua RT 04', 'rt', NULL, 7),
('c3000000-0000-0000-0000-000000000008', 'Mujiman', 'Ketua RW 21', 'rw', NULL, 8),
('c3000000-0000-0000-0000-000000000009', 'Hardiyanto', 'Ketua RT 05', 'rt', NULL, 9),
('c3000000-0000-0000-0000-000000000010', 'Sukirdi', 'Ketua RT 06', 'rt', NULL, 10),
('c3000000-0000-0000-0000-000000000011', 'Misbakhul Anam', 'Ketua RW 39', 'rw', NULL, 11),
('c3000000-0000-0000-0000-000000000012', 'Irawan Wibowo', 'Ketua RT 07', 'rt', NULL, 12),
('c3000000-0000-0000-0000-000000000013', 'Lilik Sunarsa', 'Ketua RT 08', 'rt', NULL, 13),
('c3000000-0000-0000-0000-000000000014', 'Masrul Indrayana', 'Ketua RT 09', 'rt', NULL, 14)
ON CONFLICT (id) DO NOTHING;

-- 4. SARANA & PRASARANA (7 KATEGORI)
INSERT INTO sarana_prasarana (id, kategori, nama_fasilitas, jumlah, urutan) VALUES
('d4000000-0000-0000-0000-000000000001', 'Ibadah', 'Masjid', '1 buah', 1),
('d4000000-0000-0000-0000-000000000002', 'Pendidikan', 'Sekolah Dasar Jumeneng', '1 buah', 2),
('d4000000-0000-0000-0000-000000000003', 'Kesehatan', 'Posyandu', '1 tempat', 3),
('d4000000-0000-0000-0000-000000000004', 'Umum', 'Balai Dusun', '1 buah', 4),
('d4000000-0000-0000-0000-000000000005', 'Olahraga & Ekonomi', 'Lapangan', '1 buah', 5),
('d4000000-0000-0000-0000-000000000006', 'Keamanan & Lingkungan', 'Pos Ronda', 'Tersedia', 6),
('d4000000-0000-0000-0000-000000000007', 'Lembaga Kemasyarakatan', 'PKK', '1', 7)
ON CONFLICT (id) DO NOTHING;

-- 5. POTENSI WILAYAH (4 POTENSI DENGAN 4 FIELD TERSTRUKTUR)
INSERT INTO potensi_wilayah (id, judul, icon, deskripsi_singkat, kegiatan_utama, keunggulan_hasil, tantangan_kendala, sumber_data, detail_konten_html, urutan) VALUES
('e5000000-0000-0000-0000-000000000001', 'Pertanian', '🌾', 'Sebagian warga bermata pencaharian sebagai petani dan pekebun.', 'Jagung, Padi, kacang tanah', 'lahan jagung luas', 'Kekeringan banyak terjadi', 'Pak dukuh', '<p>Komoditas utama: padi, jagung, sayuran musiman.</p>', 1),
('e5000000-0000-0000-0000-000000000002', 'UMKM Rumahan', '🏠', 'Usaha kecil menengah warga seperti kuliner dan kerajinan.', 'Kripik Melinjo', 'produksi cepat', 'Pohon melinjo di dusun sedikit', 'Pak dukuh', '<p>Jenis usaha: kuliner tradisional dan kerajinan.</p>', 2),
('e5000000-0000-0000-0000-000000000003', 'Kehidupan Keagamaan', '🕌', 'Tradisi dan kegiatan keagamaan yang masih kuat di tengah warga.', 'Pengajian Rutin, Tarian Badui', 'Masih melestarikan tradisi adzan Jum''at 4 orang', 'Belum ada kendala signifikan, antusiasme warga senantiasa terjaga', 'Pak dukuh', '<p>Kegiatan pengajian dan ibadah bersama.</p>', 3),
('e5000000-0000-0000-0000-000000000004', 'Peternakan', '🐄', 'Skala rumah tangga: kambing, sapi kecil, ayam kampung; potensi untuk pengembangan pakan dan pemasaran lokal.', 'Beternak Sapi, Kambing, Ayam', 'Kotoran Ternak Banyak sehingga untuk kompos mudah dilakukan', 'Rumput bagus berkurang karena kekeringan', 'Pak dukuh', '<p>Hewan ternak: ayam kampung, kambing, sapi kecil.</p>', 4)
ON CONFLICT (id) DO NOTHING;

-- 6. BERITA & KEGIATAN (3 ARTIKEL)
INSERT INTO berita (id, judul, slug, ringkasan, konten, gambar_url, tanggal_publikasi, status) VALUES
('f6000000-0000-0000-0000-000000000001', 'Kegiatan Posyandu Balita & Lansia', 'kegiatan-posyandu-balita-lansia', 'Pelayanan kesehatan rutin bagi balita dan lansia yang diselenggarakan oleh kader kesehatan setempat.', 'Pelayanan kesehatan rutin bagi balita dan lansia diselenggarakan secara konsisten oleh para kader kesehatan Padukuhan Jumeneng Kidul. Kegiatan ini mencakup penimbangan berat badan balita, imunisasi dasar, penyuluhan gizi seimbang, serta pemeriksaan tensi darah dan kesehatan umum bagi para lansia.', 'https://info-jumenengkidul.site.je/uploads/berita/img_20260903_090114_d4968679.jpg', '2026-07-20', 'published'),
('f6000000-0000-0000-0000-000000000002', 'Rapat Koordinasi Pengurus RT/RW', 'rapat-koordinasi-pengurus-rt-rw', 'Pertemuan rutin pengurus wilayah membahas program kerja dan kegiatan warga untuk periode mendatang.', 'Pertemuan rutin pengurus wilayah RT 01 s/d RT 09 bersama para ketua RW (RW 19, RW 20, RW 21, dan RW 39) serta Kepala Dukuh Bapak Edhy Purwanta bertempat di Balai Dusun. Agenda rapat mencakup evaluasi kegiatan gotong royong, pemeliharaan sarana umum, dan persiapan peringatan hari besar kemasyarakatan.', NULL, '2026-08-01', 'published'),
('f6000000-0000-0000-0000-000000000003', 'Kerja Bakti Bersih Lingkungan Dusun', 'kerja-bakti-bersih-lingkungan-dusun', 'Warga bergotong royong membersihkan lingkungan dusun dalam rangka menjaga kebersihan dan kesehatan bersama.', 'Seluruh elemen warga Padukuhan Jumeneng Kidul melaksanakan agenda kerja bakti massal membersihkan selokan, merapikan bahu jalan dusun, serta membersihkan area fasilitas umum. Tradisi gotong royong ini terus dipelihara sebagai wujud kebersamaan dan kepedulian terhadap kelestarian lingkungan.', NULL, '2026-08-10', 'published')
ON CONFLICT (id) DO NOTHING;

-- 7. GALERI KEGIATAN (2 FOTO)
INSERT INTO galeri (id, judul_kegiatan, foto_url, tanggal_kegiatan, urutan) VALUES
('77000000-0000-0000-0000-000000000001', 'Kerja Bakti Warga', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80', '2026-08-10', 1),
('77000000-0000-0000-0000-000000000002', 'Kegiatan Posyandu', 'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg', '2026-07-20', 2)
ON CONFLICT (id) DO NOTHING;

-- 8. PESAN MASUK KONTAK (1 CONTOH)
INSERT INTO pesan_kontak (id, nama_pengirim, pesan, no_telepon, dibaca, created_at) VALUES
('88000000-0000-0000-0000-000000000001', 'Budi Santoso', 'Mohon info terkait jadwal kerja bakti serentak untuk wilayah RT 03.', '081234567890', false, '2026-09-01 10:00:00+07')
ON CONFLICT (id) DO NOTHING;
