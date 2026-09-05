# Portal Profil & CMS Padukuhan Jumeneng Kidul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun ulang website profil Padukuhan Jumeneng Kidul menjadi portal desa modern profesional dengan antarmuka elegan, mobile-responsive, dan sistem CMS Admin Panel lengkap berbasis Next.js App Router, Tailwind CSS, dan Supabase, siap di-deploy ke Vercel Free Tier.

**Architecture:** Monorepo Next.js App Router dengan pemisahan route group `(public)` untuk portal warga dan `admin/(dashboard)` untuk CMS pengurus. Menggunakan Server & Client Components secara proporsional, Tailwind CSS untuk styling responsif berkelas, Lucide Icons, serta Supabase untuk database, auth, dan media storage dengan fallback repository data lokal yang tangguh.

**Tech Stack:** Next.js 14/15, TypeScript, Tailwind CSS, Lucide React, Supabase JS & SSR (`@supabase/supabase-js`, `@supabase/ssr`), Vercel.

## Global Constraints
- Bahasa antarmuka: Bahasa Indonesia yang baku, ramah, dan komunikatif untuk instansi desa.
- 100% konsisten dengan cakupan menu eksisting: Beranda, Profil, Pemerintahan, Sarana & Prasarana, Potensi, Berita, Galeri, Kontak, serta Admin CMS.
- Warna identitas desa: Deep Forest Green (`#166534` / Emerald) dan Warm Amber/Gold (`#D97706`).
- Tipografi: Plus Jakarta Sans / Inter yang tajam dan nyaman dibaca.
- Zero external UI library bloat: Menggunakan Tailwind murni dan Lucide React.
- Harus menyertakan data autentik Dusun Jumeneng Kidul yang telah diekstrak (14 pengurus RT/RW/Dukuh, sejarah Kyai Nur Jumeneng, 4 potensi detail, 7 kategori fasilitas, statistik 1659 jiwa).

---

### Task 1: Next.js Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `lib/types.ts`
- Test: Build verification check

**Interfaces:**
- Produces: `lib/types.ts` (Semua tipe data TypeScript: `ProfilDesa`, `StatistikKependudukan`, `PengurusDusun`, `SaranaPrasarana`, `PotensiWilayah`, `Berita`, `Galeri`, `PesanKontak`).

- [ ] **Step 1: Inisialisasi package.json dan instal dependensi Next.js, Tailwind, Lucide, dan Supabase**
- [ ] **Step 2: Konfigurasi tsconfig.json dan tailwind.config.ts dengan palet warna desa**
- [ ] **Step 3: Setup app/globals.css dan root layout di app/layout.tsx**
- [ ] **Step 4: Tulis interface TypeScript lengkap di lib/types.ts**
- [ ] **Step 5: Verifikasi build Next.js dapat berjalan tanpa error**
- [ ] **Step 6: Commit ke Git**

---

### Task 2: Data Repository, Supabase Client & Seed Data

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/middleware.ts`
- Create: `lib/initial-data.ts` (Data asli dari web info-jumenengkidul)
- Create: `lib/data-service.ts` (Service layer cerdas yang membaca Supabase dengan fallback ke data lokal)
- Create: `supabase/schema.sql` (Skema 8 tabel + RLS)
- Create: `supabase/seed.sql` (Seed script SQL untuk Supabase Studio)
- Create: `.env.example`

**Interfaces:**
- Consumes: `lib/types.ts`
- Produces: `getProfilDesa()`, `getStatistik()`, `getPengurus()`, `getSarana()`, `getPotensi()`, `getBerita()`, `getGaleri()`, `kirimPesanKontak()`.

- [ ] **Step 1: Buat konfigurasi Supabase client (browser, server, middleware)**
- [ ] **Step 2: Tulis data awal autentik Jumeneng Kidul di lib/initial-data.ts**
- [ ] **Step 3: Tulis skema database SQL di supabase/schema.sql dan seed di supabase/seed.sql**
- [ ] **Step 4: Buat data-service.ts yang menyediakan abstraksi data read/write**
- [ ] **Step 5: Buat unit test/verifikasi data service memastikan semua entitas data dapat diambil dengan lengkap**
- [ ] **Step 6: Commit ke Git**

---

### Task 3: Portal Publik - Header, Hero, and Profil & Demografi

**Files:**
- Create: `components/public/Navbar.tsx`
- Create: `components/public/HeroSection.tsx`
- Create: `components/public/ProfilSection.tsx`
- Create: `app/(public)/layout.tsx`
- Create: `app/(public)/page.tsx`

**Interfaces:**
- Consumes: `lib/data-service.ts` (`getProfilDesa`, `getStatistik`)
- Produces: UI bagian Header navigasi, Hero sambutan, Sejarah Kyai Nur Jumeneng, Visi Misi, dan Grafik Rasio Gender.

- [ ] **Step 1: Buat komponen Navbar.tsx dengan sticky blur, scroll links, dan mobile drawer**
- [ ] **Step 2: Buat komponen HeroSection.tsx dengan headline sambutan dan 4 kartu statistik angka**
- [ ] **Step 3: Buat komponen ProfilSection.tsx dengan sejarah dusun, visi misi, dan visual bar chart kependudukan**
- [ ] **Step 4: Rakit di app/(public)/page.tsx dan layout.tsx**
- [ ] **Step 5: Verifikasi tampilan render dan responsivitas**
- [ ] **Step 6: Commit ke Git**

---

### Task 4: Portal Publik - Pemerintahan, Sarana Prasarana & Potensi (Modal Pop-up)

**Files:**
- Create: `components/public/PemdesSection.tsx`
- Create: `components/public/SaranaSection.tsx`
- Create: `components/public/PotensiSection.tsx`
- Create: `components/public/PotensiModal.tsx`
- Modify: `app/(public)/page.tsx`

**Interfaces:**
- Consumes: `lib/data-service.ts` (`getPengurus`, `getSarana`, `getPotensi`)
- Produces: UI Struktur Pengurus Dusun (Dukuh, RW, RT), Grid Sarana Prasarana per kategori, dan Kartu Potensi dengan Modal Detail Interaktif.

- [ ] **Step 1: Buat PemdesSection.tsx dengan kartu pengurus rapi (Dukuh, RW, RT 01-09)**
- [ ] **Step 2: Buat SaranaSection.tsx dengan kategori Ibadah, Pendidikan, Kesehatan, Balai, Olahraga, Keamanan, Lembaga**
- [ ] **Step 3: Buat PotensiModal.tsx untuk menampilkan data terstruktur (Kegiatan, Keunggulan, Kendala, Sumber Dukuh)**
- [ ] **Step 4: Buat PotensiSection.tsx yang terhubung dengan modal dialog**
- [ ] **Step 5: Hubungkan ke app/(public)/page.tsx dan uji interaksi klik modal**
- [ ] **Step 6: Commit ke Git**

---

### Task 5: Portal Publik - Berita, Galeri (Lightbox), Kontak & Footer

**Files:**
- Create: `components/public/BeritaSection.tsx`
- Create: `components/public/GaleriSection.tsx`
- Create: `components/public/KontakSection.tsx`
- Create: `components/public/Footer.tsx`
- Modify: `app/(public)/page.tsx`
- Create: `app/api/kontak/route.ts` (Endpoint simpan pesan warga)

**Interfaces:**
- Consumes: `lib/data-service.ts` (`getBerita`, `getGaleri`, `kirimPesanKontak`)
- Produces: UI Berita Warga, Galeri Foto dengan preview modal lightbox, Form Kontak interaktif terhubung API, dan Footer.

- [ ] **Step 1: Buat BeritaSection.tsx dengan thumbnail dan modal baca artikel**
- [ ] **Step 2: Buat GaleriSection.tsx dengan hover effect dan lightbox foto layar penuh**
- [ ] **Step 3: Buat KontakSection.tsx dengan tombol chat WA, validasi form instan, dan Google Maps**
- [ ] **Step 4: Buat app/api/kontak/route.ts untuk menerima submit form**
- [ ] **Step 5: Buat Footer.tsx dengan identitas, kredit KKN/AKPRIND, dan tautan Login Admin**
- [ ] **Step 6: Uji menyeluruh portal publik dari ujung ke ujung**
- [ ] **Step 7: Commit ke Git**

---

### Task 6: Admin CMS - Autentikasi & Dashboard Shell

**Files:**
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/(dashboard)/layout.tsx`
- Create: `app/admin/(dashboard)/page.tsx`
- Create: `components/admin/AdminSidebar.tsx`
- Create: `components/admin/AdminHeader.tsx`
- Create: `middleware.ts`

**Interfaces:**
- Consumes: Supabase Auth / Local admin session
- Produces: Halaman Login Admin elegan, Layout Sidebar Navigasi Admin, Dashboard overview dengan statistik ringkasan.

- [ ] **Step 1: Buat form login admin modern di app/admin/login/page.tsx**
- [ ] **Step 2: Buat AdminSidebar.tsx dan AdminHeader.tsx**
- [ ] **Step 3: Buat layout terproteksi di app/admin/(dashboard)/layout.tsx**
- [ ] **Step 4: Buat dashboard overview di app/admin/(dashboard)/page.tsx**
- [ ] **Step 5: Uji alur login, logout, dan navigasi admin**
- [ ] **Step 6: Commit ke Git**

---

### Task 7: Admin CMS - Modul Kelola Konten & Kotak Masuk

**Files:**
- Create: `app/admin/(dashboard)/berita/page.tsx`
- Create: `app/admin/(dashboard)/galeri/page.tsx`
- Create: `app/admin/(dashboard)/struktur/page.tsx`
- Create: `app/admin/(dashboard)/sarana/page.tsx`
- Create: `app/admin/(dashboard)/potensi/page.tsx`
- Create: `app/admin/(dashboard)/profil/page.tsx`
- Create: `app/admin/(dashboard)/pesan/page.tsx`
- Create: `components/admin/DataTable.tsx`

**Interfaces:**
- Consumes: `lib/data-service.ts`
- Produces: Seluruh 7 modul CRUD data desa dan kotak pesan kontak.

- [ ] **Step 1: Buat modul CRUD Berita di app/admin/(dashboard)/berita/page.tsx**
- [ ] **Step 2: Buat modul CRUD Galeri Foto di app/admin/(dashboard)/galeri/page.tsx**
- [ ] **Step 3: Buat modul CRUD Struktur Pemerintahan di app/admin/(dashboard)/struktur/page.tsx**
- [ ] **Step 4: Buat modul CRUD Sarana & Prasarana di app/admin/(dashboard)/sarana/page.tsx**
- [ ] **Step 5: Buat modul CRUD Potensi Wilayah di app/admin/(dashboard)/potensi/page.tsx**
- [ ] **Step 6: Buat modul Pengaturan Profil & Demografi di app/admin/(dashboard)/profil/page.tsx**
- [ ] **Step 7: Buat modul Kotak Masuk Pesan Warga di app/admin/(dashboard)/pesan/page.tsx**
- [ ] **Step 8: Verifikasi seluruh modul admin dapat mengupdate data**
- [ ] **Step 9: Commit ke Git**

---

### Task 8: Build Verification, Optimasi, dan Panduan Deployment Vercel

**Files:**
- Create: `README.md`
- Verify: `npm run build`
- Verify: Responsive UI mobile & desktop

- [ ] **Step 1: Jalankan `npm run build` dan pastikan compile berhasil 100% tanpa error**
- [ ] **Step 2: Verifikasi responsivitas tampilan publik dan admin di berbagai viewport**
- [ ] **Step 3: Tulis README.md lengkap dengan petunjuk setup Supabase dan deploy gratis ke Vercel**
- [ ] **Step 4: Final commit dan verifikasi akhir**
