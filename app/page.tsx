export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50 to-amber-50 text-slate-900">
      <div className="max-w-2xl text-center space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full">
          Portal Resmi
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-emerald-950 font-heading">
          Padukuhan Jumeneng Kidul
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta
        </p>
      </div>
    </main>
  );
}
