import { NextRequest, NextResponse } from 'next/server';
import { kirimPesanKontak } from '@/lib/data-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, no_telepon, pesan } = body || {};

    // Validasi field nama
    if (!nama || typeof nama !== 'string' || nama.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama lengkap wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (nama.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama lengkap minimal terdiri dari 2 karakter.',
        },
        { status: 400 }
      );
    }

    // Validasi field pesan
    if (!pesan || typeof pesan !== 'string' || pesan.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Pesan atau aspirasi warga wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (pesan.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Pesan minimal terdiri dari 5 karakter.',
        },
        { status: 400 }
      );
    }

    // Simpan ke database via data-service
    const result = await kirimPesanKontak({
      nama_pengirim: nama.trim(),
      no_telepon:
        typeof no_telepon === 'string' && no_telepon.trim().length > 0
          ? no_telepon.trim()
          : null,
      pesan: pesan.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          result.message ||
          'Pesan Anda berhasil kami terima! Pengurus dusun akan segera menindaklanjuti aspirasi Anda.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API /api/kontak] Error submitting message:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          'Terjadi kendala teknis saat memproses pesan Anda. Silakan coba kembali sesaat lagi.',
      },
      { status: 500 }
    );
  }
}
