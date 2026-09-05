# Task 3: Portal Publik - Header, Hero, and Profil & Demografi

**Files:**
- Create: `components/public/Navbar.tsx`
- Create: `components/public/HeroSection.tsx`
- Create: `components/public/ProfilSection.tsx`
- Create: `app/(public)/layout.tsx`
- Create: `app/(public)/page.tsx`

**Interfaces:**
- Consumes: `lib/data-service.ts` (`getProfilDesa`, `getStatistik`)
- Produces: Header Navbar, Hero Section, dan Profil Dusun Section di portal publik.

## Requirements
1. **Design Quality (Strictly High-End, No AI Slop)**:
   - Modern, authentic Indonesian village portal aesthetic.
   - Clean spacing, sophisticated typography using Plus Jakarta Sans, refined borders and shadows (`shadow-sm`, `shadow-emerald-950/5`).
   - Deep forest green (`text-emerald-900`, `bg-emerald-800`, `hover:bg-emerald-700`) with warm amber accents (`text-amber-700`, `bg-amber-500/10`).
2. **Navbar (`components/public/Navbar.tsx`)**:
   - Sticky top bar with glassmorphism `backdrop-blur-md bg-white/90 border-b border-emerald-100/80`.
   - Brand logo & title: "Padukuhan Jumeneng Kidul" with Kalurahan Sumberadi subtitle.
   - Desktop nav links (Beranda, Profil, Pemerintahan, Sarana, Potensi, Berita, Galeri, Kontak) with active anchor scroll.
   - Mobile menu toggle (hamburger) with animated sliding drawer on mobile viewport.
3. **Hero Section (`components/public/HeroSection.tsx`)**:
   - Regional badge: "Padukuhan • Sumberadi • Mlati • Sleman".
   - Headline: "Selamat Datang di Jumeneng Kidul".
   - Descriptive narrative from `profil.deskripsi_hero`.
   - Action buttons: "Jelajahi Profil Dusun" (#profil) and "Hubungi Kami" (#kontak).
   - 4 Quick Stat Cards with icons:
     * 1.659 Jumlah Penduduk (Users icon)
     * 527 Kepala Keluarga (Home icon)
     * 9 Rukun Tetangga / RT (MapPin icon)
     * 5 RW / Kring (Layers icon)
4. **Profil Section (`components/public/ProfilSection.tsx`)**:
   - Sejarah & Asal-usul wilayah: Narasi Kyai Nur Jumeneng, pemekaran Jumeneng Gedhe menjadi Jumeneng Lor & Kidul.
   - 4 Poin Karakteristik Dusun (Wilayah Sumberadi, gotong royong, keagamaan kuat, lingkungan pedesaan asri).
   - Visi & Misi: Kartu Visi mandiri dan 4 Misi terstruktur.
   - Data Demografi & Gender: Visual bar perbandingan Laki-laki (852 jiwa / 51%) dan Perempuan (805 jiwa / 49%).
   - Mata pencaharian warga & Lembaga pendidikan dusun.
5. **Integration (`app/(public)/layout.tsx` & `app/(public)/page.tsx`)**:
   - Layout wrapping with Navbar.
   - Server Component `page.tsx` fetching `getProfilDesa()` and `getStatistik()`.
6. Run `npm run build` and ensure 0 TypeScript/build errors.
7. Commit with message: "feat: add public portal navbar, hero, and profil sections".
