/**
 * Test & Verification Script for lib/data-service.ts
 * Memverifikasi seluruh data repository getters & mutators berfungsi dengan benar.
 */
import {
  getProfilDesa,
  getStatistik,
  getPengurus,
  getSarana,
  getPotensi,
  getBerita,
  getBeritaBySlug,
  getGaleri,
  getPesanKontak,
  kirimPesanKontak,
  getDashboardStats,
} from '../lib/data-service';

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 Memulai Pengujian Data Repository & Service Layer');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} ${detail ? `-> ${detail}` : ''}`);
      failed++;
    }
  }

  try {
    // 1. Profil Desa
    const profil = await getProfilDesa();
    assert(
      profil.nama_dusun === 'Padukuhan Jumeneng Kidul',
      'Profil Desa: nama_dusun sesuai'
    );
    assert(
      profil.sejarah.includes('Kyai Nur Jumeneng'),
      'Profil Desa: memuat sejarah Kyai Nur Jumeneng'
    );
    assert(
      Array.isArray(profil.misi) && profil.misi.length === 4,
      'Profil Desa: memiliki 4 poin misi'
    );
    assert(
      profil.kontak_telepon === '0878-3906-4121',
      'Profil Desa: nomor kontak telepon 0878-3906-4121'
    );

    // 2. Statistik Kependudukan
    const statistik = await getStatistik();
    assert(
      statistik.total_penduduk === 1659,
      'Statistik: total penduduk 1659 jiwa'
    );
    assert(
      statistik.kepala_keluarga === 527,
      'Statistik: kepala keluarga 527 KK'
    );
    assert(
      statistik.jumlah_rt === 9 && statistik.jumlah_rw === 5,
      'Statistik: 9 RT dan 5 RW'
    );
    assert(
      statistik.jumlah_laki_laki === 852 && statistik.jumlah_perempuan === 805,
      'Statistik: rasio gender 852 Laki-laki & 805 Perempuan'
    );

    // 3. Pengurus Dusun (14 Orang)
    const pengurus = await getPengurus();
    assert(
      pengurus.length === 14,
      `Pengurus Dusun: total 14 orang pengurus (ditemukan: ${pengurus.length})`
    );
    assert(
      pengurus[0]?.nama === 'Edhy Purwanta' && pengurus[0]?.kategori === 'dukuh',
      'Pengurus Dusun: Kepala Dukuh adalah Bapak Edhy Purwanta'
    );
    const rwCount = pengurus.filter((p) => p.kategori === 'rw').length;
    const rtCount = pengurus.filter((p) => p.kategori === 'rt').length;
    assert(
      rwCount === 4 && rtCount === 9,
      `Pengurus Dusun: susunan RW (${rwCount}/4) dan RT (${rtCount}/9) akurat`
    );

    // 4. Sarana & Prasarana (7 Kategori)
    const sarana = await getSarana();
    assert(
      sarana.length === 7,
      `Sarana & Prasarana: total 7 kategori sarana (ditemukan: ${sarana.length})`
    );
    assert(
      sarana.some((s) => s.kategori === 'Ibadah' && s.nama_fasilitas === 'Masjid'),
      'Sarana: fasilitas Ibadah (Masjid) tersedia'
    );

    // 5. Potensi Wilayah (4 Potensi Terstruktur)
    const potensi = await getPotensi();
    assert(
      potensi.length === 4,
      `Potensi Wilayah: total 4 potensi wilayah (ditemukan: ${potensi.length})`
    );
    const hasStructuredFields = potensi.every(
      (p) =>
        p.kegiatan_utama &&
        p.keunggulan_hasil &&
        p.sumber_data &&
        typeof p.tantangan_kendala === 'string'
    );
    assert(
      hasStructuredFields,
      'Potensi Wilayah: seluruh 4 field terstruktur terisi lengkap'
    );

    // 6. Berita & Kegiatan (3 Artikel)
    const berita = await getBerita();
    assert(
      berita.length === 3,
      `Berita: total 3 artikel berita (ditemukan: ${berita.length})`
    );
    const beritaDetail = await getBeritaBySlug('kegiatan-posyandu-balita-lansia');
    assert(
      beritaDetail !== null && beritaDetail.judul === 'Kegiatan Posyandu Balita & Lansia',
      'Berita: getBeritaBySlug berhasil menemukan artikel posyandu'
    );

    // 7. Galeri Foto (2 Foto)
    const galeri = await getGaleri();
    assert(
      galeri.length === 2,
      `Galeri: total 2 dokumentasi foto (ditemukan: ${galeri.length})`
    );

    // 8. Pesan Kontak & Form Kirim Pesan
    const pesanAwal = await getPesanKontak();
    assert(
      pesanAwal.length >= 1,
      'Pesan Kontak: data awal pesan warga terbaca'
    );

    const kirimRes = await kirimPesanKontak({
      nama_pengirim: 'Warga Tes Otomasi',
      pesan: 'Pertanyaan uji validasi sistem pesan kontak',
      no_telepon: '08999999999',
    });
    assert(
      kirimRes.success === true,
      'Pesan Kontak: kirimPesanKontak berhasil mengirim dan merespons sukses'
    );

    const pesanSesudah = await getPesanKontak();
    assert(
      pesanSesudah.length === pesanAwal.length + 1 &&
        pesanSesudah[0].nama_pengirim === 'Warga Tes Otomasi',
      'Pesan Kontak: pesan baru langsung masuk ke repositori'
    );

    // 9. Dashboard Stats
    const stats = await getDashboardStats();
    assert(
      stats.totalBerita === 3 &&
        stats.totalGaleri === 2 &&
        stats.totalPengurus === 14 &&
        stats.totalSarana === 7 &&
        stats.totalPesan >= 2,
      'Dashboard Stats: agregasi seluruh entitas data akurat'
    );

    console.log('\n====================================================');
    console.log(`📊 Hasil Pengujian: ${passed} Passed, ${failed} Failed`);
    console.log('====================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('💥 Terjadi kesalahan tidak terduga saat pengujian:', error);
    process.exit(1);
  }
}

runVerification();
