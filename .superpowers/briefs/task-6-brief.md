# Task 6: Admin CMS - Autentikasi & Dashboard Shell

**Files:**
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/login/actions.ts`
- Create: `components/admin/AdminSidebar.tsx`
- Create: `components/admin/AdminHeader.tsx`
- Create: `app/admin/(dashboard)/layout.tsx`
- Create: `app/admin/(dashboard)/page.tsx`
- Create: `middleware.ts`

**Interfaces:**
- Consumes: Supabase Auth, `lib/data-service.ts` (`getProfilDesa`, `getStatistik`, `getBerita`, `getGaleri`, `getPengurus`, `getSarana`, `getPotensi`, `getPesanKontak`)
- Produces: Halaman Login Admin, Protected Shell (Sidebar & Header), dan Halaman Ringkasan Dashboard Admin.

## Requirements
1. **Login Admin (`app/admin/login/page.tsx` & `actions.ts`)**:
   - Desain modern, bersih, dan berwibawa khas portal instansi desa.
   - Form input Email / Username dan Password.
   - Proteksi sesi: Login via Supabase Auth jika kredensial aktif, atau mode administrasi lokal aman (cookie `admin_session`) jika Supabase belum terkonfigurasi di env lokal.
   - Notifikasi error yang jelas jika password salah.
   - Tombol "← Kembali ke Website Padukuhan".
2. **Admin Sidebar (`components/admin/AdminSidebar.tsx`)**:
   - Tema elegan: Deep Forest Green / Slate (`bg-emerald-950 text-white border-r border-emerald-900/60`).
   - Logo/Nama: "Admin Dusun - Jumeneng Kidul".
   - 8 Tautan menu dengan ikon Lucide dan active indicator:
     1. Dashboard (`/admin`) - `LayoutDashboard`
     2. Kelola Berita (`/admin/berita`) - `Newspaper`
     3. Kelola Galeri (`/admin/galeri`) - `Image`
     4. Struktur Dusun (`/admin/struktur`) - `Users`
     5. Sarana & Prasarana (`/admin/sarana`) - `Building2`
     6. Potensi Wilayah (`/admin/potensi`) - `Sprout`
     7. Profil & Demografi (`/admin/profil`) - `BookOpen`
     8. Pesan Warga (`/admin/pesan`) - `Mail` (badge jumlah pesan belum dibaca)
   - Menu drawer responsif untuk tampilan smartphone / tablet.
3. **Admin Header (`components/admin/AdminHeader.tsx`)**:
   - Header bar putih bersih dengan breadcrumb/judul seksi aktif.
   - Tombol cepat: "Lihat Website Publik" (membuka tab baru).
   - Profil Admin aktif dan tombol "Keluar / Logout" (menghapus session cookie dan redirect ke `/admin/login`).
4. **Dashboard Overview (`app/admin/(dashboard)/page.tsx`)**:
   - 6 Kartu Metrik Ringkasan:
     * Total Berita Terbit
     * Total Foto Galeri
     * Total Pengurus Dusun (14 Pengurus)
     * Total Sarana & Fasilitas (7 Kategori)
     * Total Potensi Wilayah
     * Kotak Masuk Pesan Warga
   - Tombol Aksi Cepat (*Quick Actions*).
   - Tabel cuplikan pesan kontak terbaru dan berita terkini.
5. **Next.js Route Protection (`middleware.ts`)**:
   - Memastikan rute `/admin/(dashboard)` atau `/admin/*` (kecuali `/admin/login` dan aset publik) hanya bisa diakses saat sesi admin aktif.
   - Mengarahkan kembali ke `/admin/login` jika belum terautentikasi.
6. Run `npm run build` dan pastikan sukses 100% tanpa error.
7. Commit dengan pesan: "feat: add admin authentication, responsive shell, and overview dashboard".
