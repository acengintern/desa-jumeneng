# Task 2 Brief: Homepage Overview Redesign (`app/(public)/page.tsx` & Concise Sections)

## Goal
Redesign the homepage into a concise, well-structured, fast overview portal. The homepage must NOT be a dumping ground for all website content. Information is strictly previewed with direct links to full dedicated pages.

## Required Sections & Components to Create/Modify:

### 1. `components/public/HeroSection.tsx` (Refactor)
- Authentic village photo as visual backdrop (`https://info-jumenengkidul.site.je/uploads/galeri/img_20260903_090702_36036d62.jpg` or local fallback).
- Headline: "Padukuhan Jumeneng Kidul"
- Administrative location: "Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta"
- Concise tagline: "Mewujudkan padukuhan mandiri, guyub rukun, dan berdaya berbasis kearifan lokal."
- 2 CTAs:
  - `Jelajahi Padukuhan` (Link to `/profil`)
  - `Layanan & Kontak` (Link to `/kontak`)
- Clean height, no neon glowing effects, no floating AI blobs.

### 2. `components/public/QuickAccessSection.tsx` (New)
- 4 clean navigation shortcuts in a 2x2 or 4x1 grid:
  1. **Profil Padukuhan** (`/profil`) - Riwayat, visi misi, dan karakteristik wilayah.
  2. **Pemerintahan Dusun** (`/pemerintahan`) - Pamong dukuh, struktur RW, dan RT.
  3. **Potensi Wilayah** (`/potensi`) - Pertanian, UMKM emping, dan peternakan.
  4. **Layanan Warga** (`/kontak`) - Kontak sekretariat, aspirasi, dan lokasi.
- Clean borders, no card-in-card, subtle hover state.

### 3. `components/public/StatistikBarSection.tsx` (New)
- 1 clean horizontal row/grid of 4 key numbers (no complex charts!):
  - **1.659** Penduduk Jiwa
  - **527** Kepala Keluarga (KK)
  - **9** Rukun Tetangga (RT)
  - **5** Rukun Warga (RW)
- Clean, readable typography and subtle divider lines.

### 4. `components/public/SambutanDukuhSection.tsx` (New)
- Authentic portrait of Kepala Dukuh (Bpk. Edhy Purwanta, photo: `https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png`).
- 2-3 warm, welcoming paragraphs from the Dukuh for citizens and visitors.
- Button: `Baca Profil Dusun Selengkapnya →` (Link to `/profil`).

### 5. `components/public/PotensiPreviewSection.tsx` (New)
- Displays 4 core potentials (Pertanian, UMKM Melinjo, Peternakan, Keagamaan/Budaya).
- Each item has clean icon/image, title, and 1-2 sentence description.
- Button: `Lihat Seluruh Potensi Dusun →` (Link to `/potensi`).

### 6. `components/public/BeritaPreviewSection.tsx` (New)
- Displays up to 3 latest news items.
- Card has thumbnail (with `loading="lazy"`), publication date, title, and 2-line excerpt.
- Button: `Lihat Semua Warta Kegiatan →` (Link to `/berita`).

### 7. `components/public/GaleriPreviewSection.tsx` (New)
- Displays 6 preview photos of community activities in a clean visual grid.
- Button: `Buka Galeri Foto Lengkap →` (Link to `/galeri`).

### 8. `components/public/KontakPreviewSection.tsx` (New)
- Compact address, secretariat service hours, direct WhatsApp link, and compact Google Maps embed.
- Link: `Hubungi Kami / Sampaikan Aspirasi →` (Link to `/kontak`).

### 9. `app/(public)/page.tsx` (Update)
- Assemble the concise overview:
  `HeroSection` -> `QuickAccessSection` -> `StatistikBarSection` -> `SambutanDukuhSection` -> `PotensiPreviewSection` -> `BeritaPreviewSection` -> `GaleriPreviewSection` -> `KontakPreviewSection`.
- Data fetched cleanly via `getProfilDesa()`, `getStatistik()`, `getPotensi()`, `getBerita()`, `getGaleri()`.

## Verification:
- `npm run build` exits 0 with no errors.
- Commit to git: `feat(home): redesign homepage to concise overview layout with authentic photos and quick access`.
- Write report to `.superpowers/briefs/redesign-task-2-report.md`.
