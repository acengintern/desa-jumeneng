'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { loginAction, type LoginState } from './actions';

export default function AdminLoginPage() {
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<LoginState | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(null);

    const formData = new FormData();
    formData.append('email', emailOrUser);
    formData.append('password', password);

    startTransition(async () => {
      try {
        const result = await loginAction(state, formData);
        if (result?.error) {
          setState(result);
        }
      } catch (err: any) {
        // Redirection in Next.js throws an error that is handled by the framework
        if (!err?.message?.includes('NEXT_REDIRECT')) {
          setState({
            error: 'Terjadi kesalahan sistem saat memproses login. Silakan coba sesaat lagi.',
          });
        }
      }
    });
  };

  const handleFillDemo = () => {
    setEmailOrUser('admin');
    setPassword('admin');
    setState(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Ambience / Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none -z-0" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Card Header & Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-xl shadow-emerald-900/40 mb-4 ring-4 ring-emerald-500/20">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <span className="inline-block px-2.5 py-1 mb-2 text-xs font-bold tracking-wider text-emerald-300 uppercase bg-emerald-900/60 rounded-md border border-emerald-700/50">
            Sistem Informasi Dusun
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Panel Administrasi Dusun
          </h1>
          <p className="mt-1 text-sm text-emerald-100/75">
            Padukuhan Jumeneng Kidul, Sumberadi, Mlati
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Masuk Petugas</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Gunakan akun resmi untuk mengelola portal informasi padukuhan.
            </p>
          </div>

          {/* Error Alert Box */}
          {state?.error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
                {state.error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Email / Nama Pengguna
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={emailOrUser}
                  onChange={(e) => setEmailOrUser(e.target.value)}
                  placeholder="admin atau email pengurus"
                  disabled={isPending}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-60"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isPending}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-60"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm transition-colors shadow-lg shadow-emerald-700/25 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Akses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Panel Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-600">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  Akun Demo Pengurus
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  Isi Otomatis
                </button>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Username: <code className="bg-slate-200/80 px-1 py-0.5 rounded text-slate-800 font-mono">admin</code> | Sandi:{' '}
                <code className="bg-slate-200/80 px-1 py-0.5 rounded text-slate-800 font-mono">admin</code>
              </p>
            </div>
          </div>
        </div>

        {/* Back Link to Public Portal */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website Padukuhan</span>
          </Link>
          <p className="mt-3 text-[11px] text-slate-400/80">
            © 2026 Padukuhan Jumeneng Kidul & KKN UAKPRIND Yogyakarta
          </p>
        </div>
      </div>
    </div>
  );
}
