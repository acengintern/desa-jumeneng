# Task 1: Next.js Project Scaffolding & Configuration

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

## Global Constraints
- Bahasa antarmuka: Bahasa Indonesia yang baku, ramah, dan komunikatif untuk instansi desa.
- 100% konsisten dengan cakupan menu eksisting: Beranda, Profil, Pemerintahan, Sarana & Prasarana, Potensi, Berita, Galeri, Kontak, serta Admin CMS.
- Warna identitas desa: Deep Forest Green (`#166534` / Emerald) dan Warm Amber/Gold (`#D97706`).
- Tipografi: Plus Jakarta Sans / Inter yang tajam dan nyaman dibaca.
- Zero external UI library bloat: Menggunakan Tailwind murni dan Lucide React.
- Harus menyertakan data autentik Dusun Jumeneng Kidul yang telah diekstrak (14 pengurus RT/RW/Dukuh, sejarah Kyai Nur Jumeneng, 4 potensi detail, 7 kategori fasilitas, statistik 1659 jiwa).
