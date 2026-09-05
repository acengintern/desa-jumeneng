# Task 7: Admin CMS - Modul Kelola Konten & Kotak Masuk

**Files:**
- Create: `app/admin/(dashboard)/berita/page.tsx`
- Create: `app/admin/(dashboard)/galeri/page.tsx`
- Create: `app/admin/(dashboard)/struktur/page.tsx`
- Create: `app/admin/(dashboard)/sarana/page.tsx`
- Create: `app/admin/(dashboard)/potensi/page.tsx`
- Create: `app/admin/(dashboard)/profil/page.tsx`
- Create: `app/admin/(dashboard)/pesan/page.tsx`
- Create: `app/admin/(dashboard)/actions.ts` (Server actions for all CMS mutations)

**Interfaces:**
- Consumes: `lib/data-service.ts`
- Produces: Seluruh 7 modul admin interaktif dengan form modal, tabel data, feedback notifikasi sukses, dan pembaruan data real-time.

## Requirements
1. **Server Actions (`app/admin/(dashboard)/actions.ts`)**:
   - Fungsi aksi mutasi lengkap dengan `revalidatePath('/')` dan `revalidatePath('/admin')`:
     * Berita: `tambahBeritaAction`, `updateBeritaAction`, `hapusBeritaAction`
     * Galeri: `tambahGaleriAction`, `hapusGaleriAction`
     * Pengurus: `tambahPengurusAction`, `updatePengurusAction`, `hapusPengurusAction`
     * Sarana: `tambahSaranaAction`, `updateSaranaAction`, `hapusSaranaAction`
     * Potensi: `updatePotensiAction`, `tambahPotensiAction`, `hapusPotensiAction`
     * Profil & Demografi: `updateProfilAction`, `updateStatistikAction`
     * Pesan Kontak: `tandaiPesanDibacaAction`, `hapusPesanAction`
2. **Kelola Berita (`/admin/berita`)**:
   - Menampilkan tabel berita (thumbnail cover, judul, tanggal, status published/draft).
   - Modal Form Tambah & Edit Berita (Judul, Ringkasan, Isi Konten, URL Gambar Cover, Tanggal).
   - Hapus berita dengan konfirmasi.
3. **Kelola Galeri (`/admin/galeri`)**:
   - Menampilkan kartu foto galeri kegiatan dengan thumbnail dan takarir.
   - Form Tambah Foto Dokumentasi (Judul kegiatan, URL foto, tanggal kegiatan).
   - Tombol hapus foto kegiatan.
4. **Struktur Pengurus (`/admin/struktur`)**:
   - Menampilkan 14 pengurus dikelompokkan rapi per tingkatan (Dukuh, RW, RT).
   - Form Tambah & Edit Pengurus (Nama, Jabatan, Kategori `dukuh`/`rw`/`rt`, Foto URL, Urutan).
   - Tombol Hapus Pengurus.
5. **Sarana & Prasarana (`/admin/sarana`)**:
   - Menampilkan fasilitas per 7 kategori (Ibadah, Pendidikan, Kesehatan, Balai, Olahraga, Keamanan, Lembaga).
   - Form Tambah & Edit Fasilitas (Kategori, Nama Sarana, Jumlah/Status unit).
   - Tombol Hapus Fasilitas.
6. **Potensi Wilayah (`/admin/potensi`)**:
   - Menampilkan 4 potensi wilayah lengkap (Pertanian, UMKM, Keagamaan, Peternakan).
   - Form Edit & Tambah Potensi dengan 4 field terstruktur modal (Kegiatan Utama, Keunggulan/Hasil, Tantangan/Kendala, Sumber Data).
7. **Profil & Demografi (`/admin/profil`)**:
   - Tab navigasi modern:
     * Tab 1: Sejarah & Narasi Hero (edit kisah Kyai Nur Jumeneng dan deskripsi pengantar)
     * Tab 2: Visi & Misi (edit visi dan tambah/kurang butir misi secara dinamis)
     * Tab 3: Statistik Demografi (update angka Penduduk, KK, RT, RW, Laki-laki, Perempuan)
     * Tab 4: Info Kontak & Alamat (telepon/WA, alamat fisik, embed maps)
8. **Kotak Masuk Pesan Warga (`/admin/pesan`)**:
   - Tabel aspirasi warga dari form kontak.
   - Detail pengirim, tanggal, dan isi pesan lengkap.
   - Tombol status dibaca / belum dibaca.
   - Tombol pintasan langsung hubungi warga via WhatsApp (`wa.me`).
   - Tombol Hapus Pesan.
9. Run `npm run build` dan pastikan sukses 100% tanpa error.
10. Commit dengan pesan: "feat: add complete admin CMS modules for berita, galeri, struktur, sarana, potensi, profil, and pesan".
