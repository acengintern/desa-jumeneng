# Task 3 Brief: Dedicated Page - `/profil`

## Goal
Create the dedicated `/profil` page at `app/(public)/profil/page.tsx`. This page houses the full profile, rich history of Kyai Nur Jumeneng, characteristics, vision & mission, detailed demographics, education, and livelihoods without overwhelming the homepage.

## Requirements

### File to Create:
- `app/(public)/profil/page.tsx`

### Data to Fetch:
```ts
import { getProfilDesa, getStatistik } from '@/lib/data-service';
```

### Content & Sections:
1. **Header & Breadcrumbs:**
   - Link `Beranda` (`/`) -> `Profil Padukuhan`
   - Judul: "Profil & Sejarah Padukuhan Jumeneng Kidul"
   - Deskripsi ringkas identitas wilayah: Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, D.I. Yogyakarta.

2. **Sejarah Kyai Nur Jumeneng & Asal Usul:**
   - Cerita pemekaran Padukuhan Jumeneng Gedhe menjadi Jumeneng Lor dan Jumeneng Kidul.
   - Sosok perintis Kyai Nur Jumeneng dan nilai-nilai sosial keagamaan yang diwariskan.
   - Foto arsip sejarah/suasana dusun (`gambar_profil_url` atau fallback autentik).

3. **Karakteristik Wilayah:**
   - Karakteristik geografis agraris, tanah subur, kedekatan antarwarga yang guyub rukun, dan tradisi gotong royong yang lestari.

4. **Visi & Misi Dusun:**
   - Visi resmi padukuhan dalam kutipan bersih dan elegan.
   - 4 butir misi padukuhan dalam daftar terstruktur rapi.

5. **Demografi Kependudukan, Pendidikan & Mata Pencaharian:**
   - Statistik gender (852 Laki-laki / 51% & 805 Perempuan / 49%, Total 1.659 Jiwa, 527 KK).
   - Mata pencaharian warga: Petani, pekebun, buruh, dan pelaku UMKM emping melinjo.
   - Sarana pendidikan: TK / PAUD dan Sekolah Dasar Jumeneng.

### Anti-AI Slop Standards:
- Bersih, hangat, lokal, mengutamakan tipografi dan whitespace.
- Hindari card di dalam card, neon glow, atau badge berlebihan.
- Pastikan gambar menggunakan `loading="lazy"` dan `decoding="async"`.
- Responsive di semua ukuran layar mobile dan desktop.

## Verification & Testing:
- `npm run build` exits 0 with no errors.
- Commit to git: `feat(routes): add dedicated /profil page with history, vision, and full demographics`.
- Write report to: `.superpowers/briefs/redesign-task-3-report.md`.
