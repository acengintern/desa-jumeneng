import {
  ProfilDesa,
  StatistikKependudukan,
  PengurusDusun,
  SaranaPrasarana,
  PotensiWilayah,
  Berita,
  Galeri,
  PesanKontak,
} from './types';

/**
 * Data Profil Dusun Autentik dari info-jumenengkidul.site.je
 */
export const initialProfilDesa: ProfilDesa = {
  id: 'a1000000-0000-0000-0000-000000000001',
  nama_dusun: 'Padukuhan Jumeneng Kidul',
  kalurahan: 'Sumberadi',
  kapanewon: 'Mlati',
  kabupaten: 'Sleman',
  provinsi: 'Daerah Istimewa Yogyakarta',
  deskripsi_hero:
    'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Menyajikan informasi seputar wilayah, pemerintahan, potensi, dan kegiatan warga.',
  sejarah:
    'Padukuhan Jumeneng Kidul merupakan pemekaran dari padukuhan besar bernama Jumeneng Gedhe, yang seiring perkembangan zaman dan kebijakan pemerintahan kalurahan kemudian dibagi menjadi dua, yaitu Jumeneng Lor dan Jumeneng Kidul.\n\nNama "Jumeneng" berasal dari sosok tokoh perintis wilayah ini, yakni Kyai Nur Jumeneng, yang pengaruhnya terhadap kehidupan sosial dan keagamaan warga masih terasa hingga sekarang. Padukuhan ini berada di wilayah administratif Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.',
  visi: 'Menjadi dusun yang mandiri, guyub, dan berkemajuan berbasis potensi lokal dan nilai-nilai keagamaan.',
  misi: [
    'Mengembangkan potensi pertanian dan usaha lokal warga.',
    'Meningkatkan kualitas pendidikan dan kesehatan masyarakat.',
    'Melestarikan tradisi dan budaya dusun.',
    'Mendorong partisipasi aktif warga dalam pembangunan.',
  ],
  mata_pencaharian_desc:
    'Sebagian besar warga bermata pencaharian sebagai petani, buruh, dan pelaku UMKM.',
  lembaga_pendidikan: ['TK / PAUD', 'Sekolah Dasar Jumeneng'],
  kontak_telepon: '0878-3906-4121',
  kontak_alamat:
    'Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, DIY',
  kontak_map_url:
    'https://www.google.com/maps?q=Jumeneng+Kidul,+Sumberadi,+Mlati,+Sleman&output=embed',
  gambar_profil_url:
    'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg',
  updated_at: '2026-09-05T00:00:00.000Z',
};

/**
 * Data Statistik Kependudukan Autentik
 */
export const initialStatistik: StatistikKependudukan = {
  id: 'b2000000-0000-0000-0000-000000000001',
  total_penduduk: 1659,
  kepala_keluarga: 527,
  jumlah_rt: 9,
  jumlah_rw: 5,
  jumlah_laki_laki: 852,
  jumlah_perempuan: 805,
  updated_at: '2026-09-05T00:00:00.000Z',
};

/**
 * 14 Pengurus Dusun Autentik (Dukuh, RW 19, RW 20, RW 21, RW 39, RT 01 s/d RT 09)
 */
export const initialPengurus: PengurusDusun[] = [
  {
    id: 'c3000000-0000-0000-0000-000000000001',
    nama: 'Edhy Purwanta',
    jabatan: 'Kepala Dukuh (Dukuh)',
    kategori: 'dukuh',
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png',
    urutan: 1,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000002',
    nama: 'Ngabidi',
    jabatan: 'Ketua RW 19',
    kategori: 'rw',
    foto_url: null,
    urutan: 2,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000003',
    nama: 'Fastabiq ahmad',
    jabatan: 'Ketua RT 01',
    kategori: 'rt',
    foto_url: null,
    urutan: 3,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000004',
    nama: 'Usman Slamet',
    jabatan: 'Ketua RT 02',
    kategori: 'rt',
    foto_url: null,
    urutan: 4,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000005',
    nama: 'Moh Idris',
    jabatan: 'Ketua RW 20',
    kategori: 'rw',
    foto_url: null,
    urutan: 5,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000006',
    nama: 'Darojat Hilal Fatah',
    jabatan: 'Ketua RT 03',
    kategori: 'rt',
    foto_url: null,
    urutan: 6,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000007',
    nama: 'Dahri Iskandar',
    jabatan: 'Ketua RT 04',
    kategori: 'rt',
    foto_url: null,
    urutan: 7,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000008',
    nama: 'Mujiman',
    jabatan: 'Ketua RW 21',
    kategori: 'rw',
    foto_url: null,
    urutan: 8,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000009',
    nama: 'Hardiyanto',
    jabatan: 'Ketua RT 05',
    kategori: 'rt',
    foto_url: null,
    urutan: 9,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000010',
    nama: 'Sukirdi',
    jabatan: 'Ketua RT 06',
    kategori: 'rt',
    foto_url: null,
    urutan: 10,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000011',
    nama: 'Misbakhul Anam',
    jabatan: 'Ketua RW 39',
    kategori: 'rw',
    foto_url: null,
    urutan: 11,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000012',
    nama: 'Irawan Wibowo',
    jabatan: 'Ketua RT 07',
    kategori: 'rt',
    foto_url: null,
    urutan: 12,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000013',
    nama: 'Lilik Sunarsa',
    jabatan: 'Ketua RT 08',
    kategori: 'rt',
    foto_url: null,
    urutan: 13,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'c3000000-0000-0000-0000-000000000014',
    nama: 'Masrul Indrayana',
    jabatan: 'Ketua RT 09',
    kategori: 'rt',
    foto_url: null,
    urutan: 14,
    created_at: '2026-08-24T00:00:00.000Z',
  },
];

/**
 * 7 Kategori Sarana & Prasarana Autentik
 */
export const initialSarana: SaranaPrasarana[] = [
  {
    id: 'd4000000-0000-0000-0000-000000000001',
    kategori: 'Ibadah',
    nama_fasilitas: 'Masjid',
    jumlah: '1 buah',
    urutan: 1,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'd4000000-0000-0000-0000-000000000002',
    kategori: 'Pendidikan',
    nama_fasilitas: 'Sekolah Dasar Jumeneng',
    jumlah: '1 buah',
    urutan: 2,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'd4000000-0000-0000-0000-000000000003',
    kategori: 'Kesehatan',
    nama_fasilitas: 'Posyandu',
    jumlah: '1 tempat',
    urutan: 3,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'd4000000-0000-0000-0000-000000000004',
    kategori: 'Umum',
    nama_fasilitas: 'Balai Dusun',
    jumlah: '1 buah',
    urutan: 4,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'd4000000-0000-0000-0000-000000000005',
    kategori: 'Olahraga & Ekonomi',
    nama_fasilitas: 'Lapangan',
    jumlah: '1 buah',
    urutan: 5,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'd4000000-0000-0000-0000-000000000006',
    kategori: 'Keamanan & Lingkungan',
    nama_fasilitas: 'Pos Ronda',
    jumlah: 'Tersedia',
    urutan: 6,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'd4000000-0000-0000-0000-000000000007',
    kategori: 'Lembaga Kemasyarakatan',
    nama_fasilitas: 'PKK',
    jumlah: '1',
    urutan: 7,
    created_at: '2026-08-24T00:00:00.000Z',
  },
];

/**
 * 4 Potensi Wilayah Autentik dengan 4 field terstruktur:
 * kegiatan_utama, keunggulan_hasil, tantangan_kendala, sumber_data
 */
export const initialPotensi: PotensiWilayah[] = [
  {
    id: 'e5000000-0000-0000-0000-000000000001',
    judul: 'Pertanian',
    icon: 'sprout',
    deskripsi_singkat: 'Sebagian warga bermata pencaharian sebagai petani dan pekebun.',
    kegiatan_utama: 'Jagung, Padi, kacang tanah',
    keunggulan_hasil: 'lahan jagung luas',
    tantangan_kendala: 'Kekeringan banyak terjadi',
    sumber_data: 'Pak dukuh',
    detail_konten_html: '<p>Komoditas utama: padi, jagung, sayuran musiman.</p>',
    urutan: 1,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'e5000000-0000-0000-0000-000000000002',
    judul: 'UMKM Rumahan',
    icon: 'store',
    deskripsi_singkat: 'Usaha kecil menengah warga seperti kuliner dan kerajinan.',
    kegiatan_utama: 'Kripik Melinjo',
    keunggulan_hasil: 'produksi cepat',
    tantangan_kendala: 'Pohon melinjo di dusun sedikit',
    sumber_data: 'Pak dukuh',
    detail_konten_html: '<p>Jenis usaha: kuliner tradisional dan kerajinan.</p>',
    urutan: 2,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'e5000000-0000-0000-0000-000000000003',
    judul: 'Kehidupan Keagamaan',
    icon: 'landmark',
    deskripsi_singkat: 'Tradisi dan kegiatan keagamaan yang masih kuat di tengah warga.',
    kegiatan_utama: 'Pengajian Rutin, Tarian Badui',
    keunggulan_hasil: "Masih melestarikan tradisi adzan Jum'at 4 orang",
    tantangan_kendala: 'Belum ada kendala signifikan, antusiasme warga senantiasa terjaga',
    sumber_data: 'Pak dukuh',
    detail_konten_html: '<p>Kegiatan pengajian dan ibadah bersama.</p>',
    urutan: 3,
    created_at: '2026-08-24T00:00:00.000Z',
  },
  {
    id: 'e5000000-0000-0000-0000-000000000004',
    judul: 'Peternakan',
    icon: 'beef',
    deskripsi_singkat:
      'Skala rumah tangga: kambing, sapi kecil, ayam kampung; potensi untuk pengembangan pakan dan pemasaran lokal.',
    kegiatan_utama: 'Beternak Sapi, Kambing, Ayam',
    keunggulan_hasil: 'Kotoran Ternak Banyak sehingga untuk kompos mudah dilakukan',
    tantangan_kendala: 'Rumput bagus berkurang karena kekeringan',
    sumber_data: 'Pak dukuh',
    detail_konten_html: '<p>Hewan ternak: ayam kampung, kambing, sapi kecil.</p>',
    urutan: 4,
    created_at: '2026-08-24T00:00:00.000Z',
  },
];

/**
 * 3 Berita & Kegiatan Autentik
 */
export const initialBerita: Berita[] = [
  {
    id: 'f6000000-0000-0000-0000-000000000001',
    judul: 'Kegiatan Posyandu Balita & Lansia',
    slug: 'kegiatan-posyandu-balita-lansia',
    ringkasan:
      'Pelayanan kesehatan rutin bagi balita dan lansia yang diselenggarakan oleh kader kesehatan setempat.',
    konten:
      'Pelayanan kesehatan rutin bagi balita dan lansia diselenggarakan secara konsisten oleh para kader kesehatan Padukuhan Jumeneng Kidul. Kegiatan ini mencakup penimbangan berat badan balita, imunisasi dasar, penyuluhan gizi seimbang, serta pemeriksaan tensi darah dan kesehatan umum bagi para lansia.\n\nDengan adanya agenda posyandu berkala setiap bulan, tumbuh kembang anak-anak balita dapat terpantau secara optimal sedini mungkin, sekaligus memberikan pendampingan kesehatan preventif bagi para warga lanjut usia agar tetap bugar dan produktif.',
    gambar_url:
      'https://info-jumenengkidul.site.je/uploads/berita/img_20260903_090114_d4968679.jpg',
    gambar_alt: 'Pelayanan Posyandu Balita dan Lansia Padukuhan Jumeneng Kidul',
    kategori: 'Kesehatan',
    tanggal_publikasi: '2026-07-20',
    status: 'published',
    created_at: '2026-07-20T00:00:00.000Z',
  },
  {
    id: 'f6000000-0000-0000-0000-000000000002',
    judul: 'Rapat Koordinasi Pengurus RT/RW',
    slug: 'rapat-koordinasi-pengurus-rt-rw',
    ringkasan:
      'Pertemuan rutin pengurus wilayah membahas program kerja dan kegiatan warga untuk periode mendatang.',
    konten:
      'Pertemuan rutin pengurus wilayah RT 01 s/d RT 09 bersama para ketua RW (RW 19, RW 20, RW 21, dan RW 39) serta Kepala Dukuh Bapak Edhy Purwanta bertempat di Balai Dusun. Agenda rapat mencakup evaluasi kegiatan gotong royong, pemeliharaan sarana umum, dan persiapan peringatan hari besar kemasyarakatan.\n\nMusyawarah mufakat ini menegaskan komitmen seluruh jajaran pamong padukuhan untuk senantiasa hadir melayani kebutuhan administrasi warga secara transparan, akuntabel, dan mengutamakan kerukunan antarlingkungan.',
    gambar_url:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    gambar_alt: 'Rapat Koordinasi Pengurus RT dan RW Jumeneng Kidul di Balai Dusun',
    kategori: 'Pemerintahan',
    tanggal_publikasi: '2026-08-01',
    status: 'published',
    created_at: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'f6000000-0000-0000-0000-000000000003',
    judul: 'Kerja Bakti Bersih Lingkungan Dusun',
    slug: 'kerja-bakti-bersih-lingkungan-dusun',
    ringkasan:
      'Warga bergotong royong membersihkan lingkungan dusun dalam rangka menjaga kebersihan dan kelestarian alam bersama.',
    konten:
      'Seluruh elemen warga Padukuhan Jumeneng Kidul melaksanakan agenda kerja bakti massal membersihkan saluran irigasi, merapikan bahu jalan dusun, serta membersihkan area fasilitas publik. Tradisi gotong royong ini terus dipelihara sebagai wujud kebersamaan dan kepedulian terhadap kelestarian lingkungan hidup pedesaan.\n\nPartisipasi aktif dari bapak-bapak, pemuda Karang Taruna, hingga ibu-ibu PKK yang menyediakan konsumsi swadaya mencerminkan guyub rukun warga Jumeneng Kidul yang tetap terjaga lestari di era modern saat ini.',
    gambar_url:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    gambar_alt: 'Warga Padukuhan Jumeneng Kidul Gotong Royong Kerja Bakti Lingkungan',
    kategori: 'Lingkungan',
    tanggal_publikasi: '2026-08-10',
    status: 'published',
    created_at: '2026-08-10T00:00:00.000Z',
  },
];

/**
 * 2 Galeri Foto Autentik
 */
export const initialGaleri: Galeri[] = [
  {
    id: '77000000-0000-0000-0000-000000000001',
    judul_kegiatan: 'Kerja Bakti Warga',
    foto_url:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    tanggal_kegiatan: '2026-08-10',
    urutan: 1,
    created_at: '2026-08-10T00:00:00.000Z',
  },
  {
    id: '77000000-0000-0000-0000-000000000002',
    judul_kegiatan: 'Kegiatan Posyandu',
    foto_url:
      'https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg',
    tanggal_kegiatan: '2026-07-20',
    urutan: 2,
    created_at: '2026-07-20T00:00:00.000Z',
  },
];

/**
 * Data Pesan Masuk Contoh Awal
 */
export const initialPesanKontak: PesanKontak[] = [
  {
    id: '88000000-0000-0000-0000-000000000001',
    nama_pengirim: 'Budi Santoso',
    pesan: 'Mohon info terkait jadwal kerja bakti serentak untuk wilayah RT 03.',
    no_telepon: '081234567890',
    dibaca: false,
    created_at: '2026-09-01T10:00:00.000Z',
  },
];
