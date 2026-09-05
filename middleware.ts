import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

/**
 * Middleware untuk proteksi rute Panel Admin Padukuhan Jumeneng Kidul.
 * Mencegah akses ke /admin/* kecuali sesi Supabase aktif atau cookie admin_session terpasang.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Sinkronisasi sesi Supabase
  const { response, user } = await updateSession(request);

  // 2. Periksa autentikasi (Supabase user atau cookie admin_session demo)
  const hasLocalSession = Boolean(request.cookies.get('admin_session')?.value);
  const isAuthenticated = Boolean(user || hasLocalSession);

  // 3. Jika mengakses halaman login
  if (pathname === '/admin/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return response;
  }

  // 4. Jika mengakses rute admin lainnya (/admin, /admin/berita, dll)
  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    if (pathname !== '/admin') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
