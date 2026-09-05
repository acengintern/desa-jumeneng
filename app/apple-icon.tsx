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
          fontSize: 92,
          background: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fef08a',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          borderRadius: 40,
          border: '4px solid #166534',
        }}
      >
        JK
      </div>
    ),
    {
      ...size,
    }
  );
}
