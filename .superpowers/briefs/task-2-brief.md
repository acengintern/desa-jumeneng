# Task 2: Data Repository, Supabase Client & Seed Data

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/middleware.ts`
- Create: `lib/initial-data.ts`
- Create: `lib/data-service.ts`
- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`
- Create: `.env.example`
- Create: `scripts/test-data-service.ts`

**Interfaces:**
- Consumes: `lib/types.ts`
- Produces: Functions in `lib/data-service.ts`:
  - `getProfilDesa(): Promise<ProfilDesa>`
  - `getStatistik(): Promise<StatistikKependudukan>`
  - `getPengurus(): Promise<PengurusDusun[]>`
  - `getSarana(): Promise<SaranaPrasarana[]>`
  - `getPotensi(): Promise<PotensiWilayah[]>`
  - `getBerita(): Promise<Berita[]>`
  - `getGaleri(): Promise<Galeri[]>`
  - `getPesanKontak(): Promise<PesanKontak[]>`
  - `kirimPesanKontak(pesan: Omit<PesanKontak, 'id' | 'created_at' | 'dibaca'>): Promise<{ success: boolean; message: string }>`

## Requirements
1. `lib/supabase/client.ts`: Browser client using `createBrowserClient` from `@supabase/ssr`.
2. `lib/supabase/server.ts`: Server client using `createServerClient` from `@supabase/ssr` with cookies handling.
3. `lib/supabase/middleware.ts`: Helper for updating auth session in Next.js middleware.
4. `lib/initial-data.ts`: Complete authentic data extracted from `info-jumenengkidul.site.je`:
   - Profil desa (sejarah Kyai Nur Jumeneng, visi, 4 misi, mata pencaharian, lembaga pendidikan, kontak 0878-3906-4121)
   - Statistik (Penduduk: 1659, KK: 527, RT: 9, RW: 5, Laki-laki: 852, Perempuan: 805)
   - 14 Pengurus dusun (Dukuh Edhy Purwanta, RW 19, RW 20, RW 21, RW 39, RT 01 s/d RT 09)
   - 7 Kategori sarana prasarana
   - 4 Potensi wilayah lengkap dengan 4 field structured (kegiatan_utama, keunggulan_hasil, tantangan_kendala, sumber_data)
   - 3 Berita & kegiatan
   - 2 Galeri foto kegiatan
5. `lib/data-service.ts`:
   - Checks if Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are present and valid.
   - If available, queries Supabase table.
   - If not available (or during local dev without Supabase credentials), seamlessly returns initial-data so development and demo never fail or throw unhandled exceptions!
   - Supports mutating methods: `kirimPesanKontak`, `updateProfilDesa`, `updateStatistik`, `createBerita`, `updateBerita`, `deleteBerita`, etc.
6. `supabase/schema.sql`: Full SQL DDL creating all 8 tables with proper indexes and RLS policies (read public for portal data, write for authenticated admin, insert public for pesan_kontak).
7. `supabase/seed.sql`: SQL INSERT statements inserting all initial data.
8. `.env.example`: Example environment variables for Supabase URL and Anon Key.
9. Verify by writing and executing a test script (`scripts/test-data-service.ts` or node execution) that proves all data getter functions return the expected counts and fields.
10. Commit with message: "feat: add supabase clients, schema, authentic seed data, and robust data service".
