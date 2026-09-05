import React from 'react';

interface VillageEmblemProps {
  className?: string;
  size?: number;
  /** 'dark' = untuk latar gelap (default, hijau/hitam). 'light' = untuk latar terang (navbar putih). */
  variant?: 'dark' | 'light';
}

/**
 * Ilustrasi Lambang Resmi Padukuhan Jumeneng Kidul
 * Menggabungkan siluet atap Joglo (kearifan lokal & pengayoman warga),
 * fajar keemasan, dan sepasang bulir padi (kemakmuran agraris & gotong royong).
 */
export function VillageEmblem({ className = 'w-6 h-6', size, variant = 'dark' }: VillageEmblemProps) {
  const isLight = variant === 'light';

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Sinar fajar pagi di balik atap joglo */}
      <circle
        cx="16"
        cy="11"
        r="5"
        fill={isLight ? '#d97706' : '#fef08a'}
        fillOpacity={isLight ? 0.15 : 0.3}
      />

      {/* Mahkota Atap Joglo (Bumbungan) */}
      <path
        d="M13.8 6.2H18.2L19.8 9.5H12.2L13.8 6.2Z"
        fill={isLight ? '#b45309' : '#fde047'}
      />

      {/* Atap Utama Joglo (Tritisan melengkung khas Sleman) */}
      <path
        d="M11 9.5H21L26.5 14.5C22.8 14.1 19.2 13.9 16 13.9C12.8 13.9 9.2 14.1 5.5 14.5L11 9.5Z"
        fill={isLight ? '#d97706' : '#facc15'}
      />

      {/* Tiang Saka Guru Balai Dusun */}
      <line x1="10" y1="14.8" x2="10" y2="20.5" stroke={isLight ? '#92400e' : '#fef08a'} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="22" y1="14.8" x2="22" y2="20.5" stroke={isLight ? '#92400e' : '#fef08a'} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="14.2" x2="16" y2="19.8" stroke={isLight ? '#92400e' : '#fef08a'} strokeWidth="1.2" strokeLinecap="round" />

      {/* Tangkai Bulir Padi Kiri (Simbol Pertanian Pangan) */}
      <path
        d="M16 25.5C11.5 24.2 7.5 20.5 7.5 17C9 18.2 10.5 19.8 11.2 21.8C12.2 20 13.8 18.6 15 19.8C15.5 21.5 15.8 23.5 16 25.5Z"
        fill={isLight ? '#b45309' : '#fbbf24'}
      />

      {/* Tangkai Bulir Padi Kanan */}
      <path
        d="M16 25.5C20.5 24.2 24.5 20.5 24.5 17C23 18.2 21.5 19.8 20.8 21.8C19.8 20 18.2 18.6 17 19.8C16.5 21.5 16.2 23.5 16 25.5Z"
        fill={isLight ? '#b45309' : '#fbbf24'}
      />

      {/* Titik Inti Padi */}
      <circle cx="16" cy="18" r="1.2" fill={isLight ? '#14532d' : '#ffffff'} />

      {/* Garis Tanah Sawah Subur Dusun */}
      <path
        d="M6 26.5C12 28 20 28 26 26.5"
        stroke={isLight ? '#166534' : '#86efac'}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
