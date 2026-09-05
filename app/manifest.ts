import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Padukuhan Jumeneng Kidul',
    short_name: 'Jumeneng Kidul',
    description:
      'Portal Profil & Informasi Padukuhan Jumeneng Kidul, Kalurahan Sumberadi, Kapanewon Mlati, Sleman',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#14532d',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
