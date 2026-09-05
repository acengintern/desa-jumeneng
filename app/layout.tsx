import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#064e3b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Profil Padukuhan Jumeneng Kidul - Sumberadi, Mlati, Sleman',
  description:
    'Portal Resmi Profil dan Informasi Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta.',
  keywords: [
    'Jumeneng Kidul',
    'Padukuhan Jumeneng Kidul',
    'Sumberadi',
    'Mlati',
    'Sleman',
    'Desa Jumeneng',
    'Profil Dusun',
    'Yogyakarta',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen selection:bg-emerald-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
