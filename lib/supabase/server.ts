import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { isSupabaseConfigured } from './client';

export { isSupabaseConfigured };

type CookieToSet = {
  name: string;
  value: string;
  options?: any;
};

/**
 * Server client Supabase untuk Server Component, Server Actions, dan Route Handlers.
 * Menggunakan @supabase/ssr dengan penanganan cookies otomatis.
 */
export function createClient() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Pemanggilan setAll dari Server Component dapat diabaikan
            // karena middleware bertanggung jawab merefresh sesi pengguna.
          }
        },
      },
    }
  );
}
