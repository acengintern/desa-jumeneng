# Desain Redesain Portal Padukuhan Jumeneng Kidul

## 1. Ringkasan & Tujuan
Redesain portal Padukuhan Jumeneng Kidul difokuskan pada:
1. **Restrukturisasi Informasi (Information Architecture):** Memindahkan informasi detail dan panjang dari beranda ke halaman tematik khusus (`/profil`, `/pemerintahan`, `/potensi`, `/berita`, `/galeri`, `/kontak`).
2. **Beranda Ringkas (Overview Portal):** Beranda hanya berfungsi sebagai ringkasan penting dan pintu masuk yang cepat dimuat dan nyaman diakses di perangkat mobile.
3. **Anti-AI Slop & Visual Tone Lokal Modern:** Menghilangkan elemen visual generik (card di dalam card, glow/glassmorphism berlebihan, icon di setiap heading, emoji UI, badge/pill spam) demi menciptakan tampilan yang bersih, tenang, hangat, terpercaya, dan berorientasi pada foto autentik lingkungan dan kegiatan Padukuhan Jumeneng Kidul.

---

## 2. Arsitektur Informasi & Routing

### A. Beranda (`/` - `app/(public)/page.tsx`)
Beranda diperpendek secara drastis dengan susunan hierarki:
1. **Navbar:** 7 menu teks langsung horizontal tanpa dropdown rumit: `Beranda`, `Profil`, `Pemerintahan`, `Potensi`, `Berita`, `Galeri`, `Kontak`, plus tombol pintasan Admin.
2. **Hero Section:** Foto lingkungan asli dusun, nama wilayah, tagline padukuhan, lokasi administratif, dan 2 tombol CTA (`Jelajahi Padukuhan` ke `/profil` & `Layanan & Kontak` ke `/kontak`).
3. **Akses Cepat (4 Shortcut):** Baris 4 tautan bersih dengan ikon garis: Profil Wilayah, Struktur Pamong, Potensi Dusun, Layanan Warga.
4. **Statistik Utama:** 4 metrik dalam 1 baris bersih tanpa chart (1.659 Penduduk, 527 KK, 9 RT, 5 RW).
5. **Sambutan Kepala Dukuh:** Foto resmi Dukuh Edhy Purwanta berdampingan dengan 2 paragraf sambutan hangat dan tombol `Baca Profil Selengkapnya →` (menuju `/profil`).
6. **Potensi Unggulan (Preview 4 Bidang):** Kartu foto sederhana untuk Pertanian, UMKM Emping Melinjo, Peternakan, dan Keagamaan/Budaya + tombol `Lihat Seluruh Potensi →` (menuju `/potensi`).
7. **Warta Terkini (Maksimal 3 Berita):** 3 berita terbaru dengan foto thumbnail, tanggal terbit, judul, dan ringkasan 2 baris + tombol `Lihat Semua Berita →` (menuju `/berita`).
8. **Dokumentasi Galeri (Preview 6 Foto):** Grid visual bersih 6 foto kegiatan warga + tombol `Buka Galeri Lengkap →` (menuju `/galeri`).
9. **Lokasi & Kontak Ringkas:** Alamat dusun, jam buka sekretariat, tombol WhatsApp resmi, dan peta lokasi ringkas.
10. **Footer Sederhana:** Identitas dusun, menu navigasi, kontak, dan kredit legal tanpa ornamen berlebih.

---

### B. Halaman Khusus (`app/(public)/...`)

1. **`/profil` (`app/(public)/profil/page.tsx`):**
   * Sejarah Kyai Nur Jumeneng dan asal-usul Padukuhan Jumeneng Kidul.
   * Karakteristik geografis dan potensi sosial masyarakat.
   * Visi dan 4 Misi padukuhan.
   * Demografi penduduk terperinci: rasio gender, kelompok usia, mata pencaharian utama (petani, buruh, UMKM), dan sarana pendidikan.

2. **`/pemerintahan` (`app/(public)/pemerintahan/page.tsx`):**
   * Profil Kepala Dukuh (Edhy Purwanta) dengan tugas pokok dan fungsi.
   * Struktur Organisasi Pamong Dusun.
   * Daftar Wilayah RW 19–39 dan RT 01–09 secara komprehensif.
   * Inventaris Sarana & Fasilitas Publik Dusun (Ibadah, Posyandu/Kesehatan, Balai Warga, Lapangan/Keamanan).

3. **`/potensi` (`app/(public)/potensi/page.tsx`):**
   * Direktori lengkap 4 potensi wilayah (Pertanian Jagung & Padi, UMKM Emping Melinjo, Peternakan Sapi & Kambing, Kehidupan Keagamaan & Budaya).
   * Rincian mendalam tiap potensi: kegiatan utama, keunggulan hasil, tantangan/kendala, dan sumber data terverifikasi.

4. **`/berita` (`app/(public)/berita/page.tsx`):**
   * Seluruh arsip warta dan pengumuman resmi dusun.
   * Filter kategori sederhana: Semua, Pemerintahan, Kesehatan/Posyandu, Lingkungan.
   * Modal pembaca artikel lengkap dengan tombol bagikan berita.

5. **`/galeri` (`app/(public)/galeri/page.tsx`):**
   * Seluruh dokumentasi kegiatan warga dusun dalam grid responsif.
   * Lightbox layar penuh dengan navigasi panah keyboard dan touch swipe di perangkat mobile.

6. **`/kontak` (`app/(public)/kontak/page.tsx`):**
   * Alamat sekretariat, jam pelayanan, dan kontak darurat.
   * Tautan langsung WhatsApp pamong dusun.
   * Peta Google Maps interaktif.
   * Formulir penyampaian aspirasi / permohonan warga yang terhubung ke sistem pesan admin.

---

## 3. Prinsip Desain Visual & Anti-AI Slop

1. **Struktur & Komposisi:**
   * Mengutamakan tipografi dan whitespace daripada kartu berlapis-lapis (*no cards inside cards*).
   * Menghilangkan shadow tebal, border tebal, dan border-radius raksasa yang tidak wajar.
   * Mengganti border berwarna-warni dengan garis tipis netral (`border-stone-200`).
2. **Warna:**
   * Primary: Hijau Hutan / Emerald Alami (`#14532d` / `#166534`).
   * Neutral: Stone/Slate bersih (`#0f172a`, `#334155`, `#64748b`, `#f8fafc`, `#ffffff`).
   * Accent: Warm Amber lembut (`#d97706`).
3. **Tipografi:**
   * Heading: Plus Jakarta Sans (bobot bold/extrabold dengan tracking rapat proporsional).
   * Body: Inter (line-height 1.6 - 1.7 untuk kenyamanan membaca).
4. **Fotografi:**
   * Menjadikan foto asli Padukuhan Jumeneng Kidul sebagai elemen visual utama.
   * Semua foto menggunakan `loading="lazy"` dan `decoding="async"`.
5. **Animasi:**
   * Minimalis, subtle fade dan micro-interaction hover saja. Tanpa animasi floating atau stagger berlebihan yang memberatkan CPU HP.

---

## 4. Rencana File & Komponen

1. **Komponen Navigasi & Footer:**
   * `components/public/Navbar.tsx`: Diperbarui dengan 7 tautan navigasi langsung ke rute `/`, `/profil`, `/pemerintahan`, `/potensi`, `/berita`, `/galeri`, `/kontak`.
   * `components/public/Footer.tsx`: Disesuaikan dengan tautan rute baru.
2. **Komponen Beranda Baru:**
   * `components/public/HeroSection.tsx`: Diperbarui sesuai spesifikasi hero ringkas berfoto asli.
   * `components/public/QuickAccessSection.tsx`: 4 tautan cepat minimalis.
   * `components/public/StatistikBarSection.tsx`: 4 angka statistik dalam 1 baris bersih.
   * `components/public/SambutanDukuhSection.tsx`: Foto + 2 paragraf sambutan Dukuh.
   * `components/public/PotensiPreviewSection.tsx`: 4 preview potensi + tombol ke `/potensi`.
   * `components/public/BeritaPreviewSection.tsx`: 3 warta terbaru + tombol ke `/berita`.
   * `components/public/GaleriPreviewSection.tsx`: 6 foto pilihan + tombol ke `/galeri`.
   * `components/public/KontakPreviewSection.tsx`: Alamat & ringkasan kontak + peta ringkas.
3. **Halaman Khusus Baru:**
   * `app/(public)/profil/page.tsx`
   * `app/(public)/pemerintahan/page.tsx`
   * `app/(public)/potensi/page.tsx`
   * `app/(public)/berita/page.tsx`
   * `app/(public)/galeri/page.tsx`
   * `app/(public)/kontak/page.tsx`
4. **Verifikasi:**
   * `npm run build` sukses dengan 20 rute terkompilasi bersih tanpa error TypeScript.
   * Uji responsivitas mobile pada seluruh halaman baru.
