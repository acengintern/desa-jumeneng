# Task 1 Brief: Navbar & Footer Redesign (Direct 7 Route Navigation)

## Background & Project Context
We are redesigning Padukuhan Jumeneng Kidul's public portal. Instead of a crowded single page where all anchors point to the same page, we are organizing the portal into 7 direct routes:
1. Beranda (`/`)
2. Profil (`/profil`)
3. Pemerintahan (`/pemerintahan`)
4. Potensi (`/potensi`)
5. Berita (`/berita`)
6. Galeri (`/galeri`)
7. Kontak (`/kontak`)

## Requirements for Task 1

### 1. `components/public/Navbar.tsx`
- Remove grouped flyout dropdowns and hash anchors (`#profil`, `#pemerintahan`, etc.).
- Convert navigation items to 7 direct Next.js `<Link>` items:
  ```ts
  const NAV_LINKS = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '/profil' },
    { label: 'Pemerintahan', href: '/pemerintahan' },
    { label: 'Potensi', href: '/potensi' },
    { label: 'Berita', href: '/berita' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Kontak', href: '/kontak' },
  ];
  ```
- Use `usePathname()` from `next/navigation` to detect active link:
  - Active: `text-emerald-950 font-bold bg-emerald-50 border-emerald-200 shadow-2xs`
  - Inactive: `text-stone-700 hover:text-stone-950 hover:bg-stone-50 font-medium`
- Desktop Nav:
  - Clean horizontal bar, 100% solid white background (`bg-white border-b border-stone-200/90 shadow-xs`).
  - Left: Logo `JK` (deep emerald + amber gold) + "Padukuhan Jumeneng Kidul" (links to `/`).
  - Center/Right: 7 direct links, clean, modern, spacious, without AI slop / card-in-card / glowing effects.
  - Far Right: "Hubungi Kami" button (links to `/kontak`) and lock icon for `/admin/login`.
- Mobile Drawer:
  - Accessible via hamburger toggle.
  - Protective backdrop overlay (`bg-slate-950/70 backdrop-blur-xs`).
  - Drawer content: solid white or crisp slate-900 background with clean list of 7 routes, WhatsApp button, and admin login link.
  - Closes automatically on link click.

### 2. `components/public/Footer.tsx`
- Replace internal hash anchor links with direct routes (`/`, `/profil`, `/pemerintahan`, `/potensi`, `/berita`, `/galeri`, `/kontak`).
- Streamline design: clean village identity, essential links, secretariat contact, copyright, and subtle admin portal link.
- Avoid oversized decorative bloat, random emojis, or excessive badges.

### 3. Verification
- Run `npm run build` to confirm 0 compilation errors.
- Commit to git: `feat(nav): update navbar and footer with direct 7-route navigation`.
- Write report to `.superpowers/briefs/redesign-task-1-report.md`.
