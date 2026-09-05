import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          border: '4px solid #166534',
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 32 32"
          fill="none"
        >
          <circle cx="16" cy="11" r="5" fill="#fef08a" fillOpacity="0.35" />
          <path d="M13.8 6.2H18.2L19.8 9.5H12.2L13.8 6.2Z" fill="#fde047" />
          <path d="M11 9.5H21L26.5 14.5C22.8 14.1 19.2 13.9 16 13.9C12.8 13.9 9.2 14.1 5.5 14.5L11 9.5Z" fill="#facc15" />
          <line x1="10" y1="14.8" x2="10" y2="20.5" stroke="#fef08a" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="22" y1="14.8" x2="22" y2="20.5" stroke="#fef08a" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="16" y1="14.2" x2="16" y2="19.8" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M16 25.5C11.5 24.2 7.5 20.5 7.5 17C9 18.2 10.5 19.8 11.2 21.8C12.2 20 13.8 18.6 15 19.8C15.5 21.5 15.8 23.5 16 25.5Z" fill="#fbbf24" />
          <path d="M16 25.5C20.5 24.2 24.5 20.5 24.5 17C23 18.2 21.5 19.8 20.8 21.8C19.8 20 18.2 18.6 17 19.8C16.5 21.5 16.2 23.5 16 25.5Z" fill="#fbbf24" />
          <circle cx="16" cy="18" r="1.2" fill="#ffffff" />
          <path d="M6 26.5C12 28 20 28 26 26.5" stroke="#86efac" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

