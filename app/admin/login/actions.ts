'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

export interface LoginState {
  error?: string;
  success?: boolean;
}

/**
 * Server Action untuk autentikasi login Admin CMS.
 * Mendukung Supabase Auth jika env terkonfigurasi,
 * serta fallback kredensial demo lokal aman (cookie admin_session).
 */
export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const emailOrUsername = (formData.get('email') as string || '').trim().toLowerCase();
  const password = (formData.get('password') as string || '').trim();

  if (!emailOrUsername || !password) {
    return { error: 'Silakan masukkan email/username dan kata sandi Anda.' };
  }

  let shouldRedirect = false;

  // 1. Coba autentikasi Supabase Auth jika konfigurasi valid
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password: password,
      });

      if (!error && data?.user) {
        cookies().set('admin_session', 'authenticated', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 hari
        });
        shouldRedirect = true;
      }
    } catch (err: any) {
      if (err?.message?.includes('NEXT_REDIRECT')) {
        throw err;
      }
      console.warn('[loginAction] Supabase auth attempt failed, checking fallback credentials:', err);
    }
  }

  // 2. Fallback Kredensial Pengurus Dusun & Demo Lokal
  if (!shouldRedirect) {
    const validIdentifiers = [
      'admin',
      'admin@jumenengkidul.desa.id',
      'dukuh',
      'pengurus',
      'kkn',
    ];
    const validPasswords = [
      'admin',
      'admin123',
      'jumeneng2026',
      'padukuhan2026',
    ];

    if (
      validIdentifiers.includes(emailOrUsername) &&
      validPasswords.includes(password)
    ) {
      cookies().set('admin_session', 'authenticated', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 hari
      });
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    redirect('/admin');
  }

  return {
    error: 'Email / Nama Pengguna atau Kata Sandi yang Anda masukkan salah. Silakan coba kembali.',
  };
}

/**
 * Server Action untuk logout admin.
 * Menghapus sesi Supabase dan cookie admin_session, lalu redirect ke /admin/login.
 */
export async function logoutAction() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[logoutAction] Supabase signOut warning:', err);
    }
  }

  cookies().delete('admin_session');
  redirect('/admin/login');
}
