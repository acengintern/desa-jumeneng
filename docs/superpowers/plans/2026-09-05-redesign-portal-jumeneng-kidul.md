# Redesain Portal Padukuhan Jumeneng Kidul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menata ulang arsitektur informasi, navigasi, dan visual portal Padukuhan Jumeneng Kidul menjadi beranda yang ringkas (overview portal) dan 6 halaman detail terpisah (`/profil`, `/pemerintahan`, `/potensi`, `/berita`, `/galeri`, `/kontak`), dengan estetika lokal modern yang hangat, bersih, cepat diakses, dan bebas dari pola AI slop.

**Architecture:** Next.js 14 App Router dengan App Group `(public)` yang membagi beranda menjadi overview ringkas dan sub-halaman tematik. Semua data autentik dari `lib/data-service.ts` dipertahankan dan ditata ulang menggunakan Server Components dan Client Components yang dioptimasi untuk mobile.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React, Supabase Client / Local Mock Fallback.

## Global Constraints

- Jangan menghapus data autentik yang sudah ada (1.659 penduduk, 527 KK, 9 RT, 5 RW, Kyai Nur Jumeneng, 14 pamong, sarana prasarana, 4 potensi, berita, galeri).
- Bebas AI slop: Hindari card di dalam card, glow borders, text gradient, glassmorphism berlebih, icon random pada setiap heading, emoji UI, dan badge spam.
- Homepage harus jauh lebih pendek dan berorientasi overview.
- Seluruh halaman detail harus memiliki rute sendiri: `/profil`, `/pemerintahan`, `/potensi`, `/berita`, `/galeri`, `/kontak`.
- Desain wajib responsif mobile dengan touch target ramah ibu jari.

---

### Task 1: Navbar & Footer Redesign (Direct 7 Route Navigation)

**Files:**
- Modify: `components/public/Navbar.tsx`
- Modify: `components/public/Footer.tsx`

**Interfaces:**
- Consumes: Next.js `usePathname`, `<Link>`
- Produces: Clean sticky horizontal navbar with direct routes (`/`, `/profil`, `/pemerintahan`, `/potensi`, `/berita`, `/galeri`, `/kontak`) and minimal footer without decorative bloat.

- [ ] **Step 1: Update Navbar.tsx to direct routes**
  Ganti scroll anchor links (`#profil`, dll.) dan dropdown flyout dengan direct route Next.js:
  - Beranda (`/`)
  - Profil (`/profil`)
  - Pemerintahan (`/pemerintahan`)
  - Potensi (`/potensi`)
  - Berita (`/berita`)
  - Galeri (`/galeri`)
  - Kontak (`/kontak`)
  Tampilkan active indicator berdasarkan `pathname === href`.

- [ ] **Step 2: Update mobile drawer in Navbar.tsx**
  Pastikan menu mobile menampilkan 7 link langsung yang rapi, tombol WhatsApp langsung, dan tombol masuk admin.

- [ ] **Step 3: Update Footer.tsx**
  Sesuaikan link navigasi footer agar mengarah ke 7 rute baru. Hapus ornamen berlebih agar tampil ringkas dan elegan.

- [ ] **Step 4: Verify build**
  Jalankan `npm run build` untuk memastikan navbar & footer terkompilasi bersih.

- [ ] **Step 5: Commit changes**
  `git add components/public/Navbar.tsx components/public/Footer.tsx; git commit -m "feat(nav): update navbar and footer with direct 7-route navigation"`

---

### Task 2: Homepage Overview Redesign (`app/(public)/page.tsx` & Concise Sections)

**Files:**
- Create: `components/public/QuickAccessSection.tsx`
- Create: `components/public/StatistikBarSection.tsx`
- Create: `components/public/SambutanDukuhSection.tsx`
- Create: `components/public/PotensiPreviewSection.tsx`
- Create: `components/public/BeritaPreviewSection.tsx`
- Create: `components/public/GaleriPreviewSection.tsx`
- Create: `components/public/KontakPreviewSection.tsx`
- Modify: `components/public/HeroSection.tsx`
- Modify: `app/(public)/page.tsx`

**Interfaces:**
- Consumes: `getProfilDesa()`, `getStatistik()`, `getPotensi()`, `getBerita()`, `getGaleri()`
- Produces: Concise homepage with strict vertical hierarchy under 5-6 scroll screens.

- [ ] **Step 1: Refactor HeroSection.tsx**
  Gunakan foto lingkungan asli Jumeneng Kidul sebagai latar visual, judul padukuhan, tagline, lokasi singkat, dan 2 tombol CTA (`Jelajahi Padukuhan` ke `/profil` & `Layanan & Kontak` ke `/kontak`).

- [ ] **Step 2: Create QuickAccessSection.tsx**
  Buat 4 shortcut navigasi bersih dengan border tipis dan ikon garis: Profil Padukuhan (`/profil`), Struktur Pamong (`/pemerintahan`), Potensi Dusun (`/potensi`), Layanan Warga (`/kontak`).

- [ ] **Step 3: Create StatistikBarSection.tsx**
  Tampilkan 4 angka utama dalam 1 baris bersih tanpa grafik chart: 1.659 Penduduk, 527 Kepala Keluarga, 9 RT, 5 RW.

- [ ] **Step 4: Create SambutanDukuhSection.tsx**
  Tampilkan foto resmi Kepala Dukuh Edhy Purwanta berdampingan dengan 2 paragraf sambutan hangat dan tombol `Baca Profil Selengkapnya →` ke `/profil`.

- [ ] **Step 5: Create PotensiPreviewSection.tsx**
  Tampilkan preview 4 potensi utama (Pertanian, UMKM Melinjo, Peternakan, Keagamaan) dengan 1 kalimat ringkas dan tombol `Lihat Seluruh Potensi Dusun →` ke `/potensi`.

- [ ] **Step 6: Create BeritaPreviewSection.tsx**
  Tampilkan maksimal 3 berita terbaru dengan thumbnail, tanggal, judul, ringkasan, dan tombol `Lihat Semua Warta Kegiatan →` ke `/berita`.

- [ ] **Step 7: Create GaleriPreviewSection.tsx**
  Tampilkan preview 6 foto kegiatan pilihan dalam grid visual bersih dan tombol `Buka Galeri Foto Lengkap →` ke `/galeri`.

- [ ] **Step 8: Create KontakPreviewSection.tsx**
  Tampilkan alamat sekretariat, tombol WhatsApp resmi, jam pelayanan, peta Google Maps ringkas, dan tombol menuju `/kontak`.

- [ ] **Step 9: Assemble app/(public)/page.tsx**
  Gantikan tumpukan section lama dengan sekuens komponen overview yang baru: Hero -> Quick Access -> Statistik Bar -> Sambutan Dukuh -> Potensi Preview -> Berita Preview -> Galeri Preview -> Kontak Preview.

- [ ] **Step 10: Verify build & commit**
  Jalankan `npm run build` lalu commit:
  `git add components/public/ app/(public)/page.tsx; git commit -m "feat(home): redesign homepage to concise overview layout with authentic photos and quick access"`

---

### Task 3: Dedicated Page - `/profil`

**Files:**
- Create: `app/(public)/profil/page.tsx`

**Interfaces:**
- Consumes: `getProfilDesa()`, `getStatistik()`
- Produces: Complete dedicated profile page with history of Kyai Nur Jumeneng, characteristics, vision & mission, detailed demographics, education, and livelihoods.

- [ ] **Step 1: Create app/(public)/profil/page.tsx**
  Buat Server Component yang mengambil `getProfilDesa()` dan `getStatistik()`. Tampilkan:
  - Header halaman: "Profil & Sejarah Padukuhan Jumeneng Kidul"
  - Bagian Riwayat Asal-usul & Tokoh Perintis Kyai Nur Jumeneng dengan foto dan narasi autentik
  - Bagian Karakteristik Geografis & Sosial Budaya
  - Bagian Visi & 4 Misi Padukuhan
  - Bagian Statistik Demografi Terperinci: Total Penduduk, Rasio Gender, Mata Pencaharian, dan Lembaga Pendidikan (TK/PAUD & SD Jumeneng).

- [ ] **Step 2: Verify build**
  Jalankan `npm run build` untuk memverifikasi rute `/profil` berhasil di-generate.

- [ ] **Step 3: Commit changes**
  `git add app/(public)/profil/page.tsx; git commit -m "feat(routes): add dedicated /profil page with history, vision, and full demographics"`

---

### Task 4: Dedicated Page - `/pemerintahan`

**Files:**
- Create: `app/(public)/pemerintahan/page.tsx`

**Interfaces:**
- Consumes: `getPengurus()`, `getSarana()`, `getProfilDesa()`
- Produces: Complete dedicated governance page with Dukuh profile, organizational pamong structure, 5 RW, 9 RT, and public facilities (Sarana & Prasarana).

- [ ] **Step 1: Create app/(public)/pemerintahan/page.tsx**
  Buat Server Component yang memuat data pengurus dusun dan sarana prasarana:
  - Header halaman: "Pemerintahan & Pamong Padukuhan"
  - Kartu kepemimpinan Kepala Dukuh Edhy Purwanta lengkap dengan uraian tugas pokok
  - Struktur hierarki Pamong Dusun
  - Daftar Pengurus RW (RW 19, RW 20, RW 21, RW 39)
  - Daftar Pengurus RT (RT 01 s/d RT 09)
  - Seksi Sarana & Prasarana Fasilitas Publik Dusun (Ibadah, Sekolah, Posyandu, Balai Warga, Keamanan) dengan rincian unit.

- [ ] **Step 2: Verify build**
  Jalankan `npm run build` untuk memverifikasi rute `/pemerintahan`.

- [ ] **Step 3: Commit changes**
  `git add app/(public)/pemerintahan/page.tsx; git commit -m "feat(routes): add dedicated /pemerintahan page with pamong structure, RT/RW, and facilities"`

---

### Task 5: Dedicated Page - `/potensi`

**Files:**
- Create: `app/(public)/potensi/page.tsx`

**Interfaces:**
- Consumes: `getPotensi()`
- Produces: Complete potentials directory with in-depth view of agriculture, MSMEs, livestock, and culture/religion with PotensiModal detail.

- [ ] **Step 1: Create app/(public)/potensi/page.tsx**
  Buat Client Component / Server wrapper yang memuat data 4 potensi dusun:
  - Header halaman: "Potensi & Kemandirian Dusun"
  - Grid kartu potensi lengkap dengan foto asli
  - Integrasikan `PotensiModal.tsx` responsif agar pengunjung dapat membaca 4 data terstruktur (kegiatan utama, keunggulan hasil, tantangan/kendala, dan sumber data) secara langsung.

- [ ] **Step 2: Verify build**
  Jalankan `npm run build` untuk memverifikasi rute `/potensi`.

- [ ] **Step 3: Commit changes**
  `git add app/(public)/potensi/page.tsx; git commit -m "feat(routes): add dedicated /potensi page with detailed potential cards and modal"`

---

### Task 6: Dedicated Pages - `/berita`, `/galeri`, and `/kontak`

**Files:**
- Create: `app/(public)/berita/page.tsx`
- Create: `app/(public)/galeri/page.tsx`
- Create: `app/(public)/kontak/page.tsx`

**Interfaces:**
- Consumes: `getBerita()`, `getGaleri()`, `getProfilDesa()`
- Produces: Dedicated news catalog, photo gallery with touch-swipe lightbox, and interactive contact page with WhatsApp and citizen aspiration form.

- [ ] **Step 1: Create app/(public)/berita/page.tsx**
  Tampilkan seluruh arsip warta kegiatan warga, filter kategori sederhana (Semua, Pemerintahan, Kesehatan, Lingkungan), dan integrasikan `BeritaModal.tsx`.

- [ ] **Step 2: Create app/(public)/galeri/page.tsx**
  Tampilkan galeri foto dokumentasi lengkap kegiatan masyarakat dusun dalam grid responsif dengan penampil `GaleriLightbox.tsx` (navigasi keyboard dan touch swipe).

- [ ] **Step 3: Create app/(public)/kontak/page.tsx**
  Tampilkan informasi kontak sekretariat, direct WhatsApp Kepala Dukuh/Pamong, peta Google Maps, dan formulir penyampaian aspirasi/layanan warga (`KontakSection.tsx`).

- [ ] **Step 4: Verify build**
  Jalankan `npm run build` untuk memastikan rute `/berita`, `/galeri`, dan `/kontak` terkompilasi bersih.

- [ ] **Step 5: Commit changes**
  `git add app/(public)/berita/page.tsx app/(public)/galeri/page.tsx app/(public)/kontak/page.tsx; git commit -m "feat(routes): add dedicated /berita, /galeri, and /kontak pages"`

---

### Task 7: Build Verification, Responsiveness Audit & Live Push

**Files:**
- All touched files

**Interfaces:**
- Full Next.js production compilation, git origin main push, Vercel verification

- [ ] **Step 1: Run complete Next.js build verification**
  Jalankan `npm run build` dan pastikan seluruh rute (total ~20 rute) berstatus sukses dengan exit code 0.

- [ ] **Step 2: Git push to origin main**
  Lakukan `git push origin main` untuk memicu deployment otomatis di Vercel.

- [ ] **Step 3: Verify live site**
  Lakukan pengecekan HTTP code live portal (`https://desa-jumeneng.vercel.app`) menghasilkan 200 OK.
