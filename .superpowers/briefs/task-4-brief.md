# Task 4: Portal Publik - Pemerintahan, Sarana Prasarana & Potensi (Modal Pop-up)

**Files:**
- Create: `components/public/PemdesSection.tsx`
- Create: `components/public/SaranaSection.tsx`
- Create: `components/public/PotensiSection.tsx`
- Create: `components/public/PotensiModal.tsx`
- Modify: `app/(public)/page.tsx`

**Interfaces:**
- Consumes: `lib/data-service.ts` (`getPengurus`, `getSarana`, `getPotensi`)
- Produces: UI Struktur Pengurus Dusun, Sarana Prasarana, dan Potensi Wilayah dengan Modal Popup Interaktif.

## Requirements
1. **Pemerintahan (`components/public/PemdesSection.tsx`)**:
   - ID: `pemerintahan`.
   - Menampilkan 14 pengurus dusun autentik.
   - Tata letak hierarkis:
     * Kepala Dukuh (Edhy Purwanta) di posisi atas dengan aksen khusus.
     * Jajaran Ketua RW (RW 19 Ngabidi, RW 20 Moh Idris, RW 21 Mujiman, RW 39 Misbakhul Anam).
     * Jajaran Ketua RT 01 s/d RT 09 dengan nama lengkap dan nomor RT masing-masing.
   - Kartu pengurus modern dengan badge jabatan berwarna rapi (tidak sekadar emoji kaku).
2. **Sarana & Prasarana (`components/public/SaranaSection.tsx`)**:
   - ID: `fasilitas`.
   - Grid fasilitas dusun dikelompokkan berdasarkan 7 kategori asli:
     * Ibadah (Masjid - 1 buah)
     * Pendidikan (Sekolah Dasar Jumeneng - 1 buah)
     * Kesehatan (Posyandu - 1 tempat)
     * Umum (Balai Dusun - 1 buah)
     * Olahraga & Ekonomi (Lapangan - 1 buah)
     * Keamanan & Lingkungan (Pos Ronda - Tersedia)
     * Lembaga Kemasyarakatan (PKK - 1)
   - Badge kuantitas berdesain clean dengan aksen emerald.
3. **Potensi Wilayah & Modal Dialog (`components/public/PotensiSection.tsx` & `PotensiModal.tsx`)**:
   - ID: `potensi`.
   - 4 Kartu potensi: Pertanian (🌾), UMKM Rumahan (🏠), Kehidupan Keagamaan (🕌), Peternakan (🐄).
   - Efek hover interaktif dan indikator "Klik untuk detail potensi".
   - **PotensiModal.tsx**:
     * Dialog modal responsif dengan animasi fade-in / scale-in halus.
     * Menampilkan 4 data terstruktur:
       1. Kegiatan Utama
       2. Potensi & Keunggulan
       3. Tantangan & Kendala
       4. Sumber Data (Pak Dukuh)
     * Tombol tutup (ESC key, klik luar, tombol silang ✕).
4. **Integrasi `app/(public)/page.tsx`**:
   - Panggil `getPengurus()`, `getSarana()`, dan `getPotensi()`.
   - Render `PemdesSection`, `SaranaSection`, dan `PotensiSection`.
5. Run `npm run build` dan pastikan compile 100% sukses tanpa error.
6. Commit dengan pesan: "feat: add pemdes, sarana, and interactive potensi modal sections".
