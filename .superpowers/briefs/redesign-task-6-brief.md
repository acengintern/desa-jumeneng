# Task 6 Brief: Dedicated Pages - `/berita`, `/galeri`, `/kontak`

## Goal
Create three dedicated, fully featured pages:
1. `/berita` at `app/(public)/berita/page.tsx`
2. `/galeri` at `app/(public)/galeri/page.tsx`
3. `/kontak` at `app/(public)/kontak/page.tsx`

Each page features breadcrumb navigation, page header, specialized layout, and cross-linking to other pages.

## Requirements

### 1. `/berita` (`app/(public)/berita/page.tsx`)
- **Data to Fetch:** `getBerita()` from `@/lib/data-service`
- **Metadata:** Title: "Warta & Berita Kegiatan - Padukuhan Jumeneng Kidul"
- **Features:**
  - Breadcrumb (`Beranda` -> `Warta & Kegiatan`)
  - Filter kategori interaktif (Semua, Kesehatan, Pemerintahan, Lingkungan, Warta Dusun)
  - Grid kartu berita dengan thumbnail gambar / visual tematik fallback
  - Integrasi dengan `BeritaModal.tsx` untuk membaca seluruh isi artikel berita
  - Tanggal publikasi berformat bahasa Indonesia

### 2. `/galeri` (`app/(public)/galeri/page.tsx`)
- **Data to Fetch:** `getGaleri()` from `@/lib/data-service`
- **Metadata:** Title: "Galeri Foto Kegiatan - Padukuhan Jumeneng Kidul"
- **Features:**
  - Breadcrumb (`Beranda` -> `Galeri Dokumentasi`)
  - Grid foto responsif (3 kolom) dengan efek hover dan judul kegiatan
  - Integrasi dengan `GaleriLightbox.tsx` (tampilan penuh layar dengan navigasi keyboard panah & tombol tutup)
  - Penanganan gambar error graceful jika URL gambar offline

### 3. `/kontak` (`app/(public)/kontak/page.tsx`)
- **Data to Fetch:** `getProfilDesa()` from `@/lib/data-service`
- **Metadata:** Title: "Kontak & Layanan Warga - Padukuhan Jumeneng Kidul"
- **Features:**
  - Breadcrumb (`Beranda` -> `Kontak & Layanan`)
  - Kolom Informasi: Alamat lengkap dusun, jam pelayanan administrasi, nomor telepon/WhatsApp dengan tombol chat langsung
  - Google Maps embed
  - Formulir aspirasi warga terhubung langsung ke `app/api/kontak/route.ts` dengan status loading, validasi input, dan pesan sukses

### Anti-AI Slop Standards:
- Tipografi bersih, nyaman dibaca, tanpa dekorasi berlebihan atau efek neon.
- Seluruh gambar menyertakan `loading="lazy"` dan `decoding="async"`.
- Mobile responsive di segala ukuran viewport.

## Verification & Testing:
- `npm run build` exits 0 with no errors.
- Commit to git: `feat(routes): add dedicated /berita, /galeri, and /kontak pages`.
- Write report to: `.superpowers/briefs/redesign-task-6-report.md`.
