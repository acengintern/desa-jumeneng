import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 17,
          background: '#14532d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fef08a',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          borderRadius: 6,
          border: '1px solid #166534',
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
