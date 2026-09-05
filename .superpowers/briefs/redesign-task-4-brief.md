# Task 4 Brief: Dedicated Page - `/pemerintahan`

## Goal
Create the dedicated `/pemerintahan` page at `app/(public)/pemerintahan/page.tsx`. This page houses the full governance structure (Kepala Dukuh, RW 19-39, RT 01-09) and the village public facilities (Sarana & Prasarana 7 categories) in one organized administrative hub.

## Requirements

### File to Create:
- `app/(public)/pemerintahan/page.tsx`

### Data to Fetch:
```ts
import { getPengurus, getSarana } from '@/lib/data-service';
```

### Metadata:
```ts
export const metadata: Metadata = {
  title: 'Pemerintahan & Sarana Dusun - Padukuhan Jumeneng Kidul',
  description: 'Struktur organisasi aparatur pamong dusun, ketua RW/RT, dan fasilitas sarana prasarana publik Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman.',
};
```

### Sections to Include:
1. **Breadcrumb & Header:**
   - Link `Beranda` (`/`) -> `Pemerintahan & Sarana`
   - Judul: "Pemerintahan Dusun & Sarana Wilayah"
   - Deskripsi: Struktur organisasi aparatur pamong dusun, ketua lingkungan RW & RT, serta fasilitas publik yang mendukung kesejahteraan warga Padukuhan Jumeneng Kidul.

2. **Profil Kepala Dukuh:**
   - Foto resmi Bapak Edhy Purwanta (`https://info-jumenengkidul.site.je/uploads/struktur/img_20260824_025758_61818482.png`) dengan fallback jika offline.
   - Narasi wewenang & tugas utama kepala dukuh dalam mengayomi warga dan mengkoordinasikan kegiatan RT/RW.
   - Nilai kepemimpinan: Amanah, Guyub Rukun, Transparan, dan Melayani Warga.

3. **Jajaran Ketua RW (Rukun Warga):**
   - 4 wilayah RW: RW 19 (Ngabidi), RW 20 (Moh Idris), RW 21 (Mujiman), RW 39 (Misbakhul Anam).
   - Kartu bersih berstruktur rapi tanpa border neon.

4. **Jajaran Ketua RT 01 s/d RT 09:**
   - 9 unit RT: RT 01 (Fastabiq Ahmad), RT 02 (Usman Slamet), RT 03 (Darojat Hilal Fatah), RT 04 (Dahri Iskandar), RT 05 (Hardiyanto), RT 06 (Sukirdi), RT 07 (Irawan Wibowo), RT 08 (Lilik Sunarsa), RT 09 (Masrul Indrayana).
   - Grid 3 kolom responsif yang nyaman dibaca di mobile.

5. **Sarana & Prasarana Publik Dusun:**
   - 7 Kategori fasilitas:
     - Ibadah: Masjid (Pusat ibadah shalat berjamaah, pengajian, dan tradisi adzan 4)
     - Pendidikan: SD Jumeneng (Pendidikan dasar formal anak dusun)
     - Kesehatan: Posyandu (Layanan terpadu balita dan lansia)
     - Umum: Balai Dusun (Sentra pertemuan, rapat warga, dan pelatihan)
     - Olahraga & Ekonomi: Lapangan (Ruang terbuka kegiatan warga dan turnamen)
     - Keamanan & Lingkungan: Pos Ronda (Sistem keamanan swakarsa warga)
     - Lembaga Kemasyarakatan: PKK & Karang Taruna (Pemberdayaan kesejahteraan keluarga dan pemuda)
   - Kartu bersih dengan badge jumlah dan status aktif.

6. **Navigasi Pintas Bawah:**
   - Link ke `/potensi` (Eksplorasi Potensi Dusun) dan `/kontak` (Hubungi Pengurus Dusun).

### Anti-AI Slop Standards:
- Tipografi bersih dan tenang, warna dasar emerald dan warm slate.
- Tidak ada border berlebihan, glowing box shadow, atau emoji sebagai ikon UI.
- Semua gambar menyertakan `loading="lazy"` dan `decoding="async"`.
- Mobile responsive dan touch friendly.

## Verification & Testing:
- `npm run build` exits 0 with no errors.
- Commit to git: `feat(routes): add dedicated /pemerintahan page with pamong structure, RT/RW, and facilities`.
- Write report to: `.superpowers/briefs/redesign-task-4-report.md`.
