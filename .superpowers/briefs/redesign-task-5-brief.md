# Task 5 Brief: Dedicated Page - `/potensi`

## Goal
Create the dedicated `/potensi` page at `app/(public)/potensi/page.tsx`. This page houses the full potential directory of Padukuhan Jumeneng Kidul (Pertanian & Jagung, UMKM Emping Melinjo, Kehidupan Keagamaan & Adzan 4, Peternakan Domba/Sapi), complete with structured interactive detail modals (`PotensiModal.tsx`).

## Requirements

### File to Create:
- `app/(public)/potensi/page.tsx`

### Data to Fetch:
```ts
import { getPotensi } from '@/lib/data-service';
```

### Metadata:
```ts
export const metadata: Metadata = {
  title: 'Potensi Unggulan Wilayah - Padukuhan Jumeneng Kidul',
  description: 'Eksplorasi potensi pertanian, sentra UMKM emping melinjo, tradisi keagamaan leluhur, dan peternakan warga Padukuhan Jumeneng Kidul, Sleman.',
};
```

### Sections to Include:
1. **Breadcrumb & Header:**
   - Link `Beranda` (`/`) -> `Potensi Wilayah`
   - Judul: "Potensi & Kemandirian Dusun Jumeneng Kidul"
   - Deskripsi: Mengembangkan ketahanan pangan agraris, ekonomi produktif UMKM rumahan, lestarinya nilai keagamaan tradisi, dan peternakan rakyat yang berkelanjutan.

2. **Ringkasan 4 Pilar Sektor:**
   - 4 kartu highlight mini: Pertanian Jagung & Padi, UMKM Emping Melinjo, Budaya Religius (Adzan 4 & Badui), Peternakan Domba & Sapi.

3. **Direktori Potensi Interaktif:**
   - Grid 4 sektor potensi lengkap dengan deskripsi, komoditas utama, keunggulan, serta tombol modal "Lihat Rincian Potensi".
   - Integrasi langsung dengan `PotensiModal.tsx` yang menampilkan 4 butir terstruktur:
     1. Kegiatan Utama
     2. Potensi & Keunggulan
     3. Tantangan & Kendala
     4. Sumber Data Terverifikasi

4. **Navigasi Pintas Bawah:**
   - Tautan ke `/berita` (Kabar & Kegiatan Dusun) dan `/kontak` (Kolaborasi / Pemesanan Produk Warga).

### Anti-AI Slop Standards:
- Tipografi tajam dan hierarki bersih.
- Tidak ada border neon, gradient text, atau badge berlebihan.
- Modal harus responsif di mobile (pull-down handle, scroll internal rapi).

## Verification & Testing:
- `npm run build` exits 0 with no errors.
- Commit to git: `feat(routes): add dedicated /potensi page with detailed potential cards and modal`.
- Write report to: `.superpowers/briefs/redesign-task-5-report.md`.
