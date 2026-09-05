# Final Comprehensive UI/UX Polish — Padukuhan Jumeneng Kidul

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menuntaskan pemolesan menyeluruh (final UI/UX polish) pada seluruh halaman publik portal Padukuhan Jumeneng Kidul agar tampil matang, rapi, modern, hangat, berkarakter lokal, responsive (320px+), accessible, berkinerja tinggi, dan 100% bebas dari AI-slop.

**Architecture:** Menerapkan sistem design token berbasis Tailwind & CSS Variables (palet hijau hutan, warm earth, off-white, aksen amber lembut), merestrukturisasi navigasi mobile dengan custom morphing hamburger icon (20–22px, 44px hit-area, natural easing), merombak card-density pada halaman padat seperti struktur RT/RW di `/pemerintahan` menjadi structured directory list, mengoptimalkan ritme visual halaman `/profil`, `/potensi`, `/galeri`, `/kontak`, `/berita`, serta melengkapi favicon dinamis (JK monogram), apple-touch-icon, PWA manifest, dan SEO metadata.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React, Next.js ImageResponse (`app/icon.tsx`, `app/apple-icon.tsx`), Web App Manifest (`app/manifest.ts`).

## Global Constraints

- **Strict Anti-AI-Slop:** DILARANG menggunakan rounded-full pills di semua tempat, decorative dots/circles, glowing blobs, neon gradients, glassmorphism berlebih, card-in-card berulang, atau icon di setiap heading.
- **Identitas Desa Autentik:** Warna utama forest green (`#14532d`), warm earth (`#854d0e`), canvas warm stone/off-white (`#fafaf9`), aksen amber lembut (`#b45309`).
- **Responsive Guarantee:** Wajib 0 horizontal scrollbar pada viewport 320px, 360px, 375px, 390px, 412px, 430px, hingga desktop 1920px.
- **Mobile Touch Standards:** Semua interactive touch targets minimal 44x44px; input form font-size minimal 16px di mobile untuk mencegah auto-zoom iOS.
- **Performance & Zero Downtime:** Tidak menambah library animasi eksternal besar; gunakan native CSS transitions dan SSR/ISR Next.js 14.

---

### Task 1: Design Tokens, Global CSS, & Typography Harmonization

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [x] **Step 1: Update design tokens & CSS variables di app/globals.css**
Tambahkan CSS custom properties untuk surface colors, rhythm tints, fluid typography scale, and reduced-motion enforcement.
- [x] **Step 2: Update tailwind.config.ts dengan palet warna desa yang matang**
Pastikan forest green, warm earth, stone, and amber lembut terintegrasi secara semantik.
- [x] **Step 3: Verifikasi kompilasi CSS dengan build ringan**
Run: `npm run build`
Expected: Berhasil tanpa error Tailwind / CSS.

---

### Task 2: Favicon, Web App Manifest & Branding Metadata

**Files:**
- Create: `app/icon.tsx` (Dynamic 32x32 SVG/PNG icon dengan monogram resmi "JK" berlatar forest green)
- Create: `app/apple-icon.tsx` (Dynamic 180x180 Apple touch icon)
- Create: `app/manifest.ts` (Next.js Web App Manifest)
- Modify: `app/layout.tsx` (Update viewport themeColor ke `#14532d`, pasang manifest link & metadata)

- [x] **Step 1: Buat app/icon.tsx dengan ImageResponse**
Render monogram "JK" dengan font Plus Jakarta Sans / bold sans, background forest green (`#14532d`), border halus amber (`#f59e0b`), dan kontras tajam.
- [x] **Step 2: Buat app/apple-icon.tsx dengan ImageResponse 180x180**
- [x] **Step 3: Buat app/manifest.ts**
Definisikan nama "Padukuhan Jumeneng Kidul", short_name "Jumeneng Kidul", theme_color "#14532d", background_color "#fafaf9".
- [x] **Step 4: Sinkronkan app/layout.tsx**
Pasang themeColor `#14532d` dan pastikan OpenGraph global terdefinisi.
- [x] **Step 5: Verifikasi build Next.js**
Run: `npm run build`
Expected: Rute `/icon`, `/apple-icon`, dan `/manifest.webmanifest` ter-generate otomatis.

---

### Task 3: Refined Mobile Navbar & Navigation System

**Files:**
- Modify: `components/public/Navbar.tsx`

- [x] **Step 1: Implementasikan custom hamburger button dengan animasi halus**
Tombol square-ish 42x42px, radius 8px, background neutral halus. Icon 2 garis horizontal bersih (20–22px, stroke 1.75px) yang bertransisi (morph) menjadi tanda "X" dengan durasi 200ms cubic-bezier(0.16, 1, 0.3, 1) tanpa bounce atau rotasi berlebih.
- [x] **Step 2: Poles mobile drawer navigasi**
Ubah dari kartu menjadi text navigation yang bersih, minimalis, dan elegan dengan spacing yang nyaman. Berikan penanda rute aktif berupa teks primary forest green dengan font-weight 600 dan underline halus (bukan capsule pill).
- [x] **Step 3: Pisahkan aksi sekunder "Hubungi Pengurus Dusun"**
Tempatkan di bagian bawah drawer secara bersih dan terpisah dari 7 rute utama.
- [x] **Step 4: Perbaiki indikator aktif pada navbar desktop**
Gantikan model capsule pill dengan border-bottom underline halus atau warna teks primary yang anggun.
- [x] **Step 5: Lengkapi seluruh atribut aksesibilitas**
`aria-expanded`, `aria-controls`, `aria-label`, body scroll lock saat terbuka, dan listener tombol Escape.

---

### Task 4: Homepage Final Polish & Responsive Flow

**Files:**
- Modify: `components/public/HeroSection.tsx`
- Modify: `components/public/QuickAccessSection.tsx`
- Modify: `components/public/StatistikBarSection.tsx`
- Modify: `components/public/SambutanDukuhSection.tsx`
- Modify: `components/public/PotensiPreviewSection.tsx`
- Modify: `components/public/BeritaPreviewSection.tsx`
- Modify: `components/public/GaleriPreviewSection.tsx`
- Modify: `components/public/KontakPreviewSection.tsx`

- [x] **Step 1: Optimasi HeroSection.tsx**
Atur ketinggian hero di mobile agar tidak terlalu tinggi (`min-h-[380px] sm:min-h-[480px] lg:min-h-[540px]`), ubah image loading ke `eager` untuk LCP, pastikan CTA stacked rapi tanpa overflow pada layar 320px.
- [x] **Step 2: Poles QuickAccessSection.tsx & StatistikBarSection.tsx**
Beri ritme warna latar belakang lembut (warm white & very light green tint).
- [x] **Step 3: Poles SambutanDukuhSection.tsx**
Pastikan 1 kolom rapi pada mobile, foto dukuh proporsional dengan aspect ratio tetap, dan tipografi sambutan nyaman dibaca.
- [x] **Step 4: Poles Potensi, Berita, Galeri, dan Kontak Preview**
Pastikan grid 1 kolom di mobile untuk berita dan potensi, 2 kolom untuk galeri, dan kontak tidak mengalami overflow.

---

### Task 5: Dedicated Page Polish — /profil

**Files:**
- Modify: `app/(public)/profil/page.tsx`

- [x] **Step 1: Audit dan reduksi eyebrow badges berlebih**
Hapus atau ubah label seperti "Asal-Usul & Riwayat Leluhur", "Pilar Kehidupan Warga", "Langkah Nyata" menjadi teks pengantar alami.
- [x] **Step 2: Berikan ritme visual berbeda untuk setiap sub-bagian**
  - Sejarah: format editorial buku dengan quote box hangat dan foto lanskap dusun.
  - Karakteristik: grid ringkas dengan ikon kontekstual.
  - Visi & Misi: tata letak seimbang antara panel visi dan daftar 4 misi padukuhan.
  - Demografi: angka pokok + bar visual rasio gender yang bersih.
  - Sosio-Ekonomi & Pendidikan: layout direktori ringkas (bukan card-in-card berulang).
- [x] **Step 3: Pastikan text width 60–75 karakter dan mobile 1 kolom natural**

---

### Task 6: Dedicated Page Polish — /pemerintahan (Rombak RT/RW)

**Files:**
- Modify: `app/(public)/pemerintahan/page.tsx`

- [x] **Step 1: Poles profil Kepala Dukuh**
Pusatkan profil Kepala Dukuh Bapak Edhy Purwanta dengan hierarki foto dan narasi tugas pamong yang proporsional.
- [x] **Step 2: Tata ulang jajaran RW (4 wilayah)**
Tampilkan 4 koordinator RW dalam grid 2 kolom / 4 kolom yang ringkas dan informatif.
- [x] **Step 3: ROMBAK jajaran RT (RT 01 s/d RT 09) dari 9 card besar menjadi Structured Directory List**
Sesuai instruksi spesifik pengguna: ubah 9 kartu besar menjadi format daftar efisien bergaris pembatas (`RT 01 — Bapak Fastabiq Ahmad`, divider, `RT 02 — Bapak Usman Slamet`, dst.) yang tampil 2–3 kolom di desktop dan 1 kolom di mobile.
- [x] **Step 4: Poles Sarana & Prasarana Dusun**
Rapikan 7 kategori fasilitas dan kartu kearifan lokal pemeliharaan swadaya.
- [x] **Step 5: Poles Alur Layanan Administrasi Warga**
Sajikan panduan 3 langkah pengurusan surat pengantar secara jelas.

---

### Task 7: Dedicated Page Polish — /potensi & /galeri

**Files:**
- Modify: `components/public/PotensiPageContent.tsx`
- Modify: `components/public/GaleriPageContent.tsx`

- [x] **Step 1: Poles PotensiPageContent.tsx menjadi Image-Led Editorial Showcase**
Gunakan foto autentik/editorial resolusi proporsional sebagai visual utama setiap sektor potensi, kurangi dominasi bubble icon, dan pertahankan modal detail interaktif dengan 4 field terstruktur.
- [x] **Step 2: Poles GaleriPageContent.tsx**
Atur grid galeri menjadi 2 kolom di mobile (`grid-cols-2 sm:grid-cols-2 lg:grid-cols-3`) agar nyaman dipandang seperti album foto dan tidak memanjang ke bawah berlebihan.
- [x] **Step 3: Pastikan aspect-ratio konsisten dan lightbox responsif**

---

### Task 8: Dedicated Page Polish — /kontak, /berita, & 404 Pages

**Files:**
- Modify: `components/public/KontakPageContent.tsx`
- Modify: `components/public/BeritaPageContent.tsx`
- Modify: `app/(public)/berita/[slug]/page.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/(public)/berita/[slug]/not-found.tsx`

- [x] **Step 1: Optimasi formulir kontak untuk perangkat bergerak (mobile)**
Atur `font-size: 16px` (`text-base sm:text-sm`) pada input & textarea untuk mencegah involuntary auto-zoom pada iOS Safari. Pastikan tinggi input minimal 44–48px.
- [x] **Step 2: Audit daftar berita dan halaman detail /berita/[slug]**
Pastikan keterbacaan paragraf left-aligned (60–75ch), tombol kembali dan bagikan (WhatsApp & Salin Tautan) nyaman ditekan, serta rekomendasi artikel terkait responsif.
- [x] **Step 3: Periksa halaman 404 global dan warta 404**
Pastikan pesan santun, hangat, dan tombol kembali ke beranda berfungsi baik.

---

### Task 9: Footer Polish & Anti-AI-Slop Global Pass

**Files:**
- Modify: `components/public/Footer.tsx`

- [x] **Step 1: Poles Footer.tsx**
Gunakan palet deep forest green yang kokoh, rapikan identitas Padukuhan, 7 link navigasi langsung, dan apresiasi KKN AKPRIND Indonesia 2026.
- [x] **Step 2: Eliminasi seluruh sisa AI-slop**
Audit menyeluruh terhadap sisa badge/chip/dot yang tidak perlu, gradient berlebih, atau kartu yang tidak meningkatkan keterbacaan.

---

### Task 10: Multi-Viewport Responsive QA & Production Verification

- [x] **Step 1: Jalankan pengujian build produksi**
Run: `npm run build`
Expected: Exit code 0, seluruh rute terkompilasi dengan sukses.
- [x] **Step 2: Uji runtime server lokal pada berbagai viewport**
Periksa responsivitas pada lebar: 320px, 360px, 375px, 390px, 412px, 430px, 768px, 1024px, 1280px, 1440px. Pastikan TIDAK ADA horizontal overflow.
- [x] **Step 3: Commit & Push ke GitHub**
Commit semua perubahan dengan pesan deskriptif dan push ke remote `main`.
