# Task 5: Portal Publik - Berita, Galeri (Lightbox), Kontak & Footer

**Files:**
- Create: `components/public/BeritaSection.tsx`
- Create: `components/public/BeritaModal.tsx`
- Create: `components/public/GaleriSection.tsx`
- Create: `components/public/GaleriLightbox.tsx`
- Create: `components/public/KontakSection.tsx`
- Create: `components/public/Footer.tsx`
- Create: `app/api/kontak/route.ts`
- Modify: `app/(public)/page.tsx`
- Modify: `app/(public)/layout.tsx`

**Interfaces:**
- Consumes: `lib/data-service.ts` (`getBerita`, `getGaleri`, `kirimPesanKontak`)
- Produces: Komponen Berita, Galeri Foto dengan Lightbox, Form Kontak Publik, API endpoint `/api/kontak`, dan Footer resmi.

## Requirements
1. **Berita (`components/public/BeritaSection.tsx` & `BeritaModal.tsx`)**:
   - ID: `berita`.
   - Grid berita kegiatan warga (Posyandu Balita & Lansia, Rapat Koordinasi RT/RW, Kerja Bakti Lingkungan).
   - Thumbnail foto cover/icon, tanggal terbit berformat lokal Indonesia, judul tegas, cuplikan ringkasan.
   - Tombol "Baca Selengkapnya" yang membuka modal pembaca artikel berita lengkap.
2. **Galeri Foto (`components/public/GaleriSection.tsx` & `GaleriLightbox.tsx`)**:
   - ID: `galeri`.
   - Grid foto kegiatan warga dengan rasio rapi dan takarir (*caption*).
   - Efek hover interaktif dan fitur **Lightbox View** (layar penuh) saat diklik untuk melihat foto secara detail.
3. **Kontak & Peta (`components/public/KontakSection.tsx`)**:
   - ID: `kontak`.
   - Alamat dusun: Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman, DIY.
   - Kontak Telepon / WhatsApp: 0878-3906-4121 dengan tombol langsung WhatsApp (Chat Langsung).
   - Form kirim pesan interaktif (Nama, No. Telepon/WA, Pesan).
   - Validasi formulir di sisi klien dan pengiriman data ke `/api/kontak`.
   - Alert pesan terkirim dengan feedback ramah ("Pesan Anda berhasil kami terima!").
   - Iframe Google Maps terintegrasi secara rapi dan responsif.
4. **API Route Kontak (`app/api/kontak/route.ts`)**:
   - Endpoint POST menerima JSON `{ nama, pesan, no_telepon }`.
   - Validasi data (nama & pesan wajib diisi).
   - Memanggil `kirimPesanKontak` dari `lib/data-service.ts`.
   - Mengembalikan JSON response `{ success: true, message: '...' }`.
5. **Footer (`components/public/Footer.tsx`)**:
   - Hak Cipta 2026 Padukuhan Jumeneng Kidul.
   - Logo/Kredit resmi pengembang: Mahasiswa Universitas AKPRIND Indonesia - KKN Dusun Jumeneng Kidul.
   - Tautan tersembunyi/elegan: "Portal Admin Dusun" menuju `/admin/login`.
6. **Integrasi Halaman Publik**:
   - `app/(public)/layout.tsx` memasang `Footer`.
   - `app/(public)/page.tsx` memuat data berita dan galeri, merender semua seksi dari Beranda hingga Kontak secara seamless.
7. Run `npm run build` dan pastikan sukses 100% tanpa error.
8. Commit dengan pesan: "feat: add berita, galeri lightbox, kontak form with api, and footer".
