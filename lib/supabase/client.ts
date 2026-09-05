import { createBrowserClient } from '@supabase/ssr';

/**
 * Memeriksa apakah konfigurasi Supabase telah diisi dengan valid di environment variables.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    url !== 'https://your-project.supabase.co' &&
    key !== 'your-anon-key' &&
    !url.includes('placeholder')
  );
}

/**
 * Browser client Supabase menggunakan @supabase/ssr.
 * Jika environment variables belum dikonfigurasi, menggunakan placeholder aman
 * agar komponen UI tidak mengalami fatal crash saat inisialisasi awal.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
