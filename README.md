# Portal Profil & Sistem Informasi Padukuhan Jumeneng Kidul

> **Portal web profil resmi dan Content Management System (CMS) interaktif untuk Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.**

Aplikasi web modern yang dirancang untuk mendigitalisasi informasi dusun, meningkatkan transparansi tata kelola pemerintahan padukuhan, mempromosikan potensi lokal (pertanian, peternakan, perikanan, dan UMKM), serta membuka saluran aspirasi langsung dari masyarakat kepada pengurus dukuh dan RT/RW.

---

## Daftar Isi
1. [Ringkasan & Identitas Dusun](#identitas-padukuhan)
2. [Fitur Unggulan](#fitur-unggulan)
   - [8 Menu Portal Publik](#1-portal-publik-warga--tamu)
   - [7 Modul Admin CMS Pengurus](#2-panel-admin-cms-pengurus-dusun)
3. [Tech Stack & Arsitektur](#tech-stack--arsitektur)
4. [Panduan Menjalankan Secara Lokal (Quickstart)](#panduan-menjalankan-secara-lokal-quickstart)
5. [Panduan Setup Database Supabase](#panduan-setup-database-supabase-opsional-untuk-produksi)
6. [Panduan Deployment ke Vercel (100% Gratis)](#panduan-deployment-ke-vercel-100-gratis)
7. [Panduan Akun Pengelola Admin](#panduan-akses-admin-cms)
8. [Struktur Proyek](#struktur-direktori-proyek)

---

## Identitas Padukuhan

- **Nama Wilayah:** Padukuhan Jumeneng Kidul
- **Kalurahan:** Sumberadi
- **Kapanewon:** Mlati
- **Kabupaten:** Sleman
- **Provinsi:** Daerah Istimewa Yogyakarta
- **Sejarah Singkat:** Berasal dari pemekaran padukuhan besar *Jumeneng Gedhe* menjadi dua wilayah: Jumeneng Lor dan Jumeneng Kidul. Nama *"Jumeneng"* dinisbatkan kepada tokoh perintis wilayah, **Kyai Nur Jumeneng**, yang pengaruhnya terhadap nilai-nilai keagamaan, sosial, dan keguyuban warga senantiasa dihidupkan hingga masa kini.

---

## Fitur Unggulan

Sistem ini terbagi menjadi dua bagian utama: **Portal Publik** yang dapat diakses siapa saja, dan **Panel CMS Pengurus** yang diamankan dengan otentikasi login.

### 1. Portal Publik (Warga & Tamu)
Portal satu halaman responsif (*single-page landing*) dengan navigasi cepat (*smooth scroll*) mencakup 8 bagian lengkap:

1. **Hero Banner & Sambutan Dusun**
   - Header visual atraktif dengan latar bertema kearifan lokal Yogyakarta.
   - Slogan sambutan selamat datang dan navigasi kilat ke profil, potensi, dan layanan.
2. **Profil Dusun & Sejarah**
   - Informasi terperinci mengenai asal-usul Padukuhan Jumeneng Kidul dan Kyai Nur Jumeneng.
   - Visi dan misi pembangunan padukuhan.
   - Gambaran mata pencaharian warga dan lembaga pendidikan setempat (PAUD/TK, SD Jumeneng).
3. **Statistik & Demografi Penduduk**
   - Panel visual indikator data kependudukan: Total Penduduk (1.659 Jiwa), Kepala Keluarga (527 KK), Jumlah RT (9 RT), dan RW (5 RW).
   - Rasio perbandingan jenis kelamin (Laki-laki: 852, Perempuan: 805).
4. **Struktur Pemerintahan & Kelembagaan**
   - Bagan pengurus padukuhan mulai dari Kepala Dukuh, Ketua RW 01 - RW 05, hingga Ketua RT 01 - RT 09.
   - Dilengkapi kartu informasi pengurus, foto, dan masa bakti.
5. **Sarana & Prasarana Wilayah**
   - Katalog fasilitas umum dusun: masjid/mushola, balai pertemuan dusun, pos ronda, sarana olahraga, makam, posyandu, dan jalan lingkungan.
   - Filter interaktif berdasarkan kategori dan status kondisi fasilitas (Baik, Cukup, Dalam Perbaikan).
6. **Potensi Wilayah Unggulan (Modal Pop-Up Interaktif)**
   - Menampilkan komoditas andalan: Pertanian padi & cabai, peternakan domba & sapi perah, budidaya perikanan lele & nila, serta aneka UMKM olahan pangan warga.
   - Klik kartu potensi membuka modal popup beresolusi tinggi dengan informasi kapasitas produksi, keunggulan, dan narahubung warga.
7. **Kabar & Berita Kegiatan Dusun**
   - Arsip berita terkini seperti kegiatan Merti Dusun, posyandu balita & lansia, gotong royong warga, dan pengumuman kalurahan.
   - Pencarian berita, filter kategori, status rilis, dan modal baca lengkap berita.
8. **Galeri Dokumentasi, Kotak Saran & Kontak**
   - **Galeri Foto Lightbox:** Dokumentasi foto kegiatan gotong royong, peringatan hari besar, dan budaya dengan tampilan modal layar penuh.
   - **Formulir Pesan & Aspirasi:** Warga dapat langsung mengirimkan masukan, saran, atau aduan yang tersimpan langsung ke kotak masuk admin.
   - **Peta Interaktif & Kontak:** Integrasi Google Maps lokasi Jumeneng Kidul, kontak telepon Dukuh/Pengurus, dan tautan langsung ke WhatsApp.

---

### 2. Panel Admin CMS Pengurus Dusun
Panel manajemen modern di rute `/admin` khusus untuk perangkat dusun:

1. **Dashboard Overview (`/admin`)**
   - Ringkasan statistik sistem: jumlah berita, sarana, potensi, foto galeri, serta jumlah aspirasi warga yang belum dibaca.
   - Pintasan navigasi cepat ke seluruh modul operasional.
2. **Kelola Profil Padukuhan (`/admin/profil`)**
   - Editor teks hero sambutan, sejarah lengkap dusun, butir-butir visi misi, gambaran mata pencaharian, lembaga pendidikan, kontak telepon, alamat sekretariat, dan URL Google Maps.
3. **Kelola Struktur Pemerintahan (`/admin/struktur`)**
   - Tambah, sunting urutan tampilan, dan hapus pengurus Dukuh, RW, dan RT.
4. **Kelola Sarana & Prasarana (`/admin/sarana`)**
   - Input dan pembaruan fasilitas umum dusun, kondisi fisik, alamat/lokasi, dan deskripsi penggunaan.
5. **Kelola Potensi Wilayah (`/admin/potensi`)**
   - Tambah dan edit etalase potensi dusun (pertanian, peternakan, perikanan, UMKM, pariwisata), kontak pelaku usaha, dan keunggulan produk.
6. **Kelola Berita & Informasi (`/admin/berita`)**
   - Pembuatan dan pengeditan artikel berita dusun, pengaturan status rilis (*Published* vs *Draft*), kategori, tag, dan gambar utama.
7. **Kelola Galeri Foto (`/admin/galeri`)**
   - Manajemen album dokumentasi kegiatan padukuhan, keterangan momen, dan tanggal pelaksanaan.
8. **Kotak Masuk Pesan Warga (`/admin/pesan`)**
   - Menerima pesan masuk dari portal publik, membaca detail isi aspirasi, mengubah status pesan menjadi "Sudah Dibaca", atau menghapus pesan yang tidak relevan.

---

## Tech Stack & Arsitektur

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Server Actions, Route Handlers)
- **Bahasa:** [TypeScript 5](https://www.typescriptlang.org/) (Strict typing, safe data contracts)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide React Icons](https://lucide.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL Database, Supabase Auth, Row Level Security, Storage Bucket `desa-media`)
- **Pola Arsitektur Data (*Dual-Engine Repository Pattern*):**
   - **Zero-Friction Fallback:** Aplikasi dirancang cerdas — jika kredensial Supabase belum diisi, sistem secara otomatis beralih ke *In-Memory Mock Repository* berisi data autentik Padukuhan Jumeneng Kidul. Website dan panel admin tetap 100% berfungsi normal tanpa risiko error *crash*.
   - **Live Database Mode:** Begitu *Environment Variables* Supabase terisi, sistem otomatis melakukan sinkronisasi dua arah ke database cloud Supabase.
- **Hosting & Deployment:** [Vercel](https://vercel.com/) (Serverless compute, edge caching, HTTPS gratis, continuous deployment dari GitHub).

---

## Panduan Menjalankan Secara Lokal (Quickstart)

Aplikasi dapat langsung dijalankan di komputer lokal dalam hitungan menit tanpa perlu instalasi database tambahan:

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18.17 atau lebih baru
- Git

### Langkah Instalasi
```bash
# 1. Clone repositori ini
git clone https://github.com/username/desa-jumeneng.git
cd desa-jumeneng

# 2. Install seluruh dependensi
npm install

# 3. Jalankan server pengembang lokal
npm run dev
```

Buka browser Anda dan akses:
- **Portal Publik:** [http://localhost:3000](http://localhost:3000)
- **Panel Admin CMS:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

> **Info:** Dalam mode lokal tanpa Supabase, Anda dapat langsung menguji semua fitur membaca konten publik dan mengelola CMS menggunakan akun demo bawaan.

---

## Panduan Setup Database Supabase (Opsional untuk Produksi)

Jika Anda ingin menghubungkan website ke database online permanen Supabase (Free Tier):

1. **Buat Akun & Proyek Supabase:**
   - Kunjungi [supabase.com](https://supabase.com) dan masuk atau daftar akun baru gratis.
   - Klik **New Project**, pilih Region terdekat (contoh: *Singapore*), beri nama proyek (misal `desa-jumeneng`), dan tentukan kata sandi database.

2. **Jalankan Skema Database (Schema SQL):**
   - Buka menu **SQL Editor** di sidebar kiri dashboard Supabase.
   - Klik **New Query**.
   - Buka file [`supabase/schema.sql`](supabase/schema.sql) dari repositori ini, salin seluruh kodenya, tempel (*paste*) ke SQL Editor Supabase, lalu klik tombol **Run**.
   - Skrip ini akan membuat tabel: `profil_desa`, `statistik_kependudukan`, `struktur_pemerintahan`, `sarana_prasarana`, `potensi_wilayah`, `berita`, `galeri`, `pesan_kontak`, aturan RLS (Row Level Security), dan Storage Bucket `desa-media`.

3. **Masukkan Data Awal (Seed Data SQL):**
   - Buat query baru di **SQL Editor**.
   - Buka file [`supabase/seed.sql`](supabase/seed.sql), salin kodenya, tempel ke SQL Editor Supabase, lalu klik tombol **Run**.
   - Skrip ini mengisikan data riil Padukuhan Jumeneng Kidul ke dalam database.

4. **Buat Akun Admin Pengurus di Supabase Auth:**
   - Masuk ke menu **Authentication > Users** di dashboard Supabase.
   - Klik **Add User** > **Create User**.
   - Masukkan email pengurus (contoh: `admin@jumenengkidul.desa.id`) dan password yang aman, lalu simpan.

5. **Hubungkan ke Proyek Lokal:**
   - Masuk ke **Project Settings > API** di Supabase.
   - Salin **Project URL** dan **anon public key**.
   - Buat file `.env.local` di direktori utama proyek Anda (bisa mengacu pada contoh di `.env.example`):
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
   - Restart server pengembang Anda (`npm run dev`).

---

## Panduan Deployment ke Vercel (100% Gratis)

Aplikasi ini 100% kompatibel dengan hosting gratis di Vercel:

### Langkah 1: Push Kode ke GitHub
Pastikan seluruh kode Anda telah di-commit dan di-push ke repositori GitHub:
```bash
git add .
git commit -m "feat: siap deploy ke vercel"
git push origin main
```

### Langkah 2: Hubungkan Repositori ke Vercel
1. Kunjungi [vercel.com](https://vercel.com) dan masuk menggunakan akun GitHub Anda.
2. Pada halaman Dashboard Vercel, klik tombol **Add New...** lalu pilih **Project**.
3. Cari dan pilih repositori `desa-jumeneng`, lalu klik **Import**.

### Langkah 3: Konfigurasi Environment Variables
1. Pada halaman konfigurasi sebelum deploy, buka accordion **Environment Variables**.
2. Masukkan dua variabel berikut (jika Anda menggunakan Supabase):
   - `NEXT_PUBLIC_SUPABASE_URL`: URL proyek Supabase Anda
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Kunci anonim publik Supabase Anda
   *(Catatan: Jika Anda belum menyiapkan Supabase, Anda dapat mengabaikan langkah ini. Website akan otomatis berjalan mulus dengan data bawaan)*.

### Langkah 4: Deploy & Selesai!
1. Klik tombol **Deploy**.
2. Tunggu proses build Next.js selama 1–2 menit hingga selesai.
3. Vercel akan memberikan domain gratis dengan sertifikat SSL otomatis, contohnya:
   `https://desa-jumeneng.vercel.app`
4. *(Opsional)* Jika pengurus padukuhan memiliki domain resmi (seperti `jumenengkidul.desa.id`), Anda dapat menambahkannya melalui menu **Settings > Domains** di dashboard Vercel.

---

## Panduan Akses Admin CMS

Untuk mengelola konten, pengurus dapat mengunjungi rute login admin di:
Akses URL: **`https://domain-anda.vercel.app/admin/login`**

### Kredensial Akses Bawaan (Mode Demo / Mock)
Jika Supabase belum dikonfigurasi, sistem menyediakan kredensial pengurus bawaan:
- **Email / Username:** `admin` atau `admin@jumenengkidul.desa.id`
- **Kata Sandi:** `admin` atau `jumeneng2026`
- **Tombol Pintas:** Tersedia tombol **"Isi Kredensial Demo"** pada formulir login untuk kemudahan pengujian sekali-klik.

### Kredensial Produksi (Mode Supabase)
Setelah menghubungkan Supabase, Anda dapat masuk menggunakan alamat email dan kata sandi yang telah Anda daftarkan di dashboard **Supabase Authentication**.

### Keamanan Sistem
- Seluruh rute `/admin/*` diproteksi ketat menggunakan Next.js Middleware (`middleware.ts`).
- Pengguna yang belum login otomatis dialihkan (*redirect*) ke `/admin/login`.
- Sesi login disimpan menggunakan Cookie HTTP-Only yang aman dengan masa berlaku 7 hari.
- Fitur Logout aman tersedia di sidebar panel admin untuk membersihkan sesi.

---

## Struktur Direktori Proyek

```plaintext
desa-jumeneng/
├── app/
│   ├── (public)/                 # Komponen dan tampilan portal publik
│   │   └── page.tsx              # Halaman beranda (Hero, Profil, Statistik, Sarana, Potensi, Berita, Galeri, Kontak)
│   ├── admin/                    # Panel Admin CMS Pengurus Dusun
│   │   ├── (dashboard)/          # Modul kelola konten (layout shell sidebar responsif)
│   │   │   ├── page.tsx          # Dashboard ringkasan (Overview)
│   │   │   ├── profil/           # Kelola profil, sejarah, visi & misi
│   │   │   ├── struktur/         # Kelola aparatur Dukuh, RW, dan RT
│   │   │   ├── sarana/           # Kelola sarana dan prasarana
│   │   │   ├── potensi/          # Kelola etalase potensi wilayah
│   │   │   ├── berita/           # Kelola artikel publikasi dan berita
│   │   │   ├── galeri/           # Kelola dokumentasi galeri foto
│   │   │   └── pesan/            # Kelola kotak masuk aspirasi warga
│   │   └── login/                # Halaman otentikasi login admin
│   ├── api/
│   │   └── kontak/               # Endpoint API pengiriman pesan / aspirasi publik
│   ├── globals.css               # Styling global Tailwind CSS
│   └── layout.tsx                # Root layout & konfigurasi font
├── lib/
│   ├── supabase/                 # Client Supabase (browser, server, middleware)
│   ├── data-service.ts           # Abstraksi data service (Supabase + Mock Fallback)
│   ├── mock-data.ts              # Data autentik Padukuhan Jumeneng Kidul
│   ├── date-utils.ts             # Formatter tanggal standar Indonesia
│   └── types.ts                  # Definisi antarmuka TypeScript
├── supabase/
│   ├── schema.sql                # DDL skema database, tabel, RLS, & bucket storage
│   └── seed.sql                  # Data awal autentik hasil ekstraksi wilayah
├── public/                       # Aset publik statis (favicon, logo, gambar)
├── middleware.ts                 # Next.js route protection & session guard
├── next.config.mjs               # Konfigurasi Next.js & remote image domain
├── tailwind.config.ts            # Konfigurasi tema warna & styling
└── package.json                  # Dependensi dan skrip proyek
```

---

## Lisensi & Kontribusi

Dikembangkan dengan dedikasi untuk kemajuan masyarakat **Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta**.

Hak Cipta © 2026 Pemerintah Padukuhan Jumeneng Kidul.
Dilindungi di bawah lisensi terbuka untuk pengembangan sistem informasi desa.
