'use server';

import { revalidatePath } from 'next/cache';
import {
  createBerita,
  updateBerita,
  deleteBerita,
  createGaleri,
  updateGaleri,
  deleteGaleri,
  createPengurus,
  updatePengurus,
  deletePengurus,
  createSarana,
  updateSarana,
  deleteSarana,
  createPotensi,
  updatePotensi,
  deletePotensi,
  updateProfilDesa,
  updateStatistik,
  tandaiPesanDibaca,
  deletePesan,
} from '@/lib/data-service';
import { KategoriPengurus, StatusBerita } from '@/lib/types';

/**
 * Helper untuk membuat slug ramah URL dari judul
 */
function sanitizeSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || `berita-${Date.now().toString(36)}`;
}

// ============================================================
// 1. BERITA & KEGIATAN
// ============================================================

export async function tambahBeritaAction(formData: FormData) {
  try {
    const judul = (formData.get('judul') as string) || '';
    const ringkasan = (formData.get('ringkasan') as string) || '';
    const konten = (formData.get('konten') as string) || '';
    const gambar_url = (formData.get('gambar_url') as string) || null;
    const kategori = (formData.get('kategori') as string) || 'Warta Dusun';
    const tanggal_publikasi =
      (formData.get('tanggal_publikasi') as string) ||
      new Date().toISOString().split('T')[0];
    const status = ((formData.get('status') as string) || 'published') as StatusBerita;

    if (!judul.trim()) {
      return { success: false, error: 'Judul berita wajib diisi.' };
    }
    if (!konten.trim()) {
      return { success: false, error: 'Isi konten berita wajib diisi.' };
    }

    const inputSlug = (formData.get('slug') as string) || '';
    const slug = sanitizeSlug(inputSlug || judul);

    const result = await createBerita({
      judul: judul.trim(),
      slug,
      ringkasan: ringkasan.trim() || judul.trim(),
      konten: konten.trim(),
      gambar_url: gambar_url?.trim() || null,
      kategori: kategori.trim(),
      tanggal_publikasi,
      status,
    });

    revalidatePath('/');
    revalidatePath('/berita');
    revalidatePath(`/berita/${slug}`);
    revalidatePath('/admin');
    revalidatePath('/admin/berita');

    return { success: true, message: 'Berita berhasil dipublikasikan.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menambahkan berita.' };
  }
}

export async function updateBeritaAction(id: string, formData: FormData) {
  try {
    const judul = (formData.get('judul') as string) || '';
    const ringkasan = (formData.get('ringkasan') as string) || '';
    const konten = (formData.get('konten') as string) || '';
    const gambar_url = (formData.get('gambar_url') as string) || null;
    const tanggal_publikasi = (formData.get('tanggal_publikasi') as string) || '';
    const status = (formData.get('status') as string) as StatusBerita;
    const inputSlug = formData.get('slug') as string | null;
    const kategori = formData.get('kategori') as string | null;

    if (!id) {
      return { success: false, error: 'ID berita tidak valid.' };
    }
    if (!judul.trim()) {
      return { success: false, error: 'Judul berita wajib diisi.' };
    }

    const payload: Record<string, any> = {
      judul: judul.trim(),
      ringkasan: ringkasan.trim(),
      konten: konten.trim(),
      gambar_url: gambar_url?.trim() || null,
    };

    if (tanggal_publikasi) payload.tanggal_publikasi = tanggal_publikasi;
    if (status) payload.status = status;
    if (inputSlug && inputSlug.trim()) payload.slug = sanitizeSlug(inputSlug);
    if (kategori && kategori.trim()) payload.kategori = kategori.trim();

    const result = await updateBerita(id, payload);

    revalidatePath('/');
    revalidatePath('/berita');
    if (payload.slug) revalidatePath(`/berita/${payload.slug}`);
    revalidatePath('/admin');
    revalidatePath('/admin/berita');

    return { success: true, message: 'Berita berhasil diperbarui.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui berita.' };
  }
}

export async function hapusBeritaAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID berita tidak valid.' };

    await deleteBerita(id);

    revalidatePath('/');
    revalidatePath('/berita');
    revalidatePath('/admin');
    revalidatePath('/admin/berita');

    return { success: true, message: 'Berita berhasil dihapus.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menghapus berita.' };
  }
}

// ============================================================
// 2. GALERI FOTO KEGIATAN
// ============================================================

export async function tambahGaleriAction(formData: FormData) {
  try {
    const judul_kegiatan = (formData.get('judul_kegiatan') as string) || '';
    const foto_url = (formData.get('foto_url') as string) || '';
    const tanggal_kegiatan = (formData.get('tanggal_kegiatan') as string) || null;
    const urutanStr = formData.get('urutan') as string;
    const urutan = urutanStr ? parseInt(urutanStr, 10) : 99;

    if (!judul_kegiatan.trim()) {
      return { success: false, error: 'Judul kegiatan wajib diisi.' };
    }
    if (!foto_url.trim()) {
      return { success: false, error: 'URL foto dokumentasi wajib diisi.' };
    }

    const result = await createGaleri({
      judul_kegiatan: judul_kegiatan.trim(),
      foto_url: foto_url.trim(),
      tanggal_kegiatan: tanggal_kegiatan?.trim() || null,
      urutan: isNaN(urutan) ? 99 : urutan,
    });

    revalidatePath('/');
    revalidatePath('/galeri');
    revalidatePath('/admin');
    revalidatePath('/admin/galeri');

    return { success: true, message: 'Foto galeri berhasil ditambahkan.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menambahkan galeri.' };
  }
}

export async function updateGaleriAction(id: string, formData: FormData) {
  try {
    const judul_kegiatan = (formData.get('judul_kegiatan') as string) || '';
    const foto_url = (formData.get('foto_url') as string) || '';
    const tanggal_kegiatan = (formData.get('tanggal_kegiatan') as string) || null;
    const urutanStr = formData.get('urutan') as string;

    if (!id) return { success: false, error: 'ID galeri tidak valid.' };
    if (!judul_kegiatan.trim()) return { success: false, error: 'Judul kegiatan wajib diisi.' };
    if (!foto_url.trim()) return { success: false, error: 'URL foto wajib diisi.' };

    const payload: Record<string, any> = {
      judul_kegiatan: judul_kegiatan.trim(),
      foto_url: foto_url.trim(),
      tanggal_kegiatan: tanggal_kegiatan?.trim() || null,
    };

    if (urutanStr) {
      const parsed = parseInt(urutanStr, 10);
      if (!isNaN(parsed)) payload.urutan = parsed;
    }

    const result = await updateGaleri(id, payload);

    revalidatePath('/');
    revalidatePath('/galeri');
    revalidatePath('/admin');
    revalidatePath('/admin/galeri');

    return { success: true, message: 'Galeri berhasil diperbarui.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui galeri.' };
  }
}

export async function hapusGaleriAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID galeri tidak valid.' };

    await deleteGaleri(id);

    revalidatePath('/');
    revalidatePath('/galeri');
    revalidatePath('/admin');
    revalidatePath('/admin/galeri');

    return { success: true, message: 'Foto galeri berhasil dihapus.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menghapus galeri.' };
  }
}

// ============================================================
// 3. STRUKTUR PENGURUS DUSUN
// ============================================================

export async function tambahPengurusAction(formData: FormData) {
  try {
    const nama = (formData.get('nama') as string) || '';
    const jabatan = (formData.get('jabatan') as string) || '';
    const kategori = ((formData.get('kategori') as string) || 'rt') as KategoriPengurus;
    const foto_url = (formData.get('foto_url') as string) || null;
    const urutanStr = formData.get('urutan') as string;
    const urutan = urutanStr ? parseInt(urutanStr, 10) : 99;

    if (!nama.trim()) return { success: false, error: 'Nama pengurus wajib diisi.' };
    if (!jabatan.trim()) return { success: false, error: 'Jabatan pengurus wajib diisi.' };

    const result = await createPengurus({
      nama: nama.trim(),
      jabatan: jabatan.trim(),
      kategori,
      foto_url: foto_url?.trim() || null,
      urutan: isNaN(urutan) ? 99 : urutan,
    });

    revalidatePath('/');
    revalidatePath('/struktur');
    revalidatePath('/admin');
    revalidatePath('/admin/struktur');

    return { success: true, message: 'Data pengurus berhasil ditambahkan.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menambahkan pengurus.' };
  }
}

export async function updatePengurusAction(id: string, formData: FormData) {
  try {
    const nama = (formData.get('nama') as string) || '';
    const jabatan = (formData.get('jabatan') as string) || '';
    const kategori = (formData.get('kategori') as string) as KategoriPengurus;
    const foto_url = (formData.get('foto_url') as string) || null;
    const urutanStr = formData.get('urutan') as string;

    if (!id) return { success: false, error: 'ID pengurus tidak valid.' };
    if (!nama.trim()) return { success: false, error: 'Nama pengurus wajib diisi.' };
    if (!jabatan.trim()) return { success: false, error: 'Jabatan pengurus wajib diisi.' };

    const payload: Record<string, any> = {
      nama: nama.trim(),
      jabatan: jabatan.trim(),
      foto_url: foto_url?.trim() || null,
    };

    if (kategori) payload.kategori = kategori;
    if (urutanStr) {
      const parsed = parseInt(urutanStr, 10);
      if (!isNaN(parsed)) payload.urutan = parsed;
    }

    const result = await updatePengurus(id, payload);

    revalidatePath('/');
    revalidatePath('/struktur');
    revalidatePath('/admin');
    revalidatePath('/admin/struktur');

    return { success: true, message: 'Data pengurus berhasil diperbarui.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui pengurus.' };
  }
}

export async function hapusPengurusAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID pengurus tidak valid.' };

    await deletePengurus(id);

    revalidatePath('/');
    revalidatePath('/struktur');
    revalidatePath('/admin');
    revalidatePath('/admin/struktur');

    return { success: true, message: 'Pengurus berhasil dihapus.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menghapus pengurus.' };
  }
}

// ============================================================
// 4. SARANA & PRASARANA
// ============================================================

export async function tambahSaranaAction(formData: FormData) {
  try {
    const kategori = (formData.get('kategori') as string) || '';
    const nama_fasilitas = (formData.get('nama_fasilitas') as string) || '';
    const jumlah = (formData.get('jumlah') as string) || '';
    const urutanStr = formData.get('urutan') as string;
    const urutan = urutanStr ? parseInt(urutanStr, 10) : 99;

    if (!kategori.trim()) return { success: false, error: 'Kategori fasilitas wajib diisi.' };
    if (!nama_fasilitas.trim()) return { success: false, error: 'Nama fasilitas wajib diisi.' };
    if (!jumlah.trim()) return { success: false, error: 'Jumlah / status unit wajib diisi.' };

    const result = await createSarana({
      kategori: kategori.trim(),
      nama_fasilitas: nama_fasilitas.trim(),
      jumlah: jumlah.trim(),
      urutan: isNaN(urutan) ? 99 : urutan,
    });

    revalidatePath('/');
    revalidatePath('/sarana');
    revalidatePath('/admin');
    revalidatePath('/admin/sarana');

    return { success: true, message: 'Sarana & prasarana berhasil ditambahkan.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menambahkan sarana.' };
  }
}

export async function updateSaranaAction(id: string, formData: FormData) {
  try {
    const kategori = (formData.get('kategori') as string) || '';
    const nama_fasilitas = (formData.get('nama_fasilitas') as string) || '';
    const jumlah = (formData.get('jumlah') as string) || '';
    const urutanStr = formData.get('urutan') as string;

    if (!id) return { success: false, error: 'ID sarana tidak valid.' };
    if (!nama_fasilitas.trim()) return { success: false, error: 'Nama fasilitas wajib diisi.' };

    const payload: Record<string, any> = {
      kategori: kategori.trim(),
      nama_fasilitas: nama_fasilitas.trim(),
      jumlah: jumlah.trim(),
    };

    if (urutanStr) {
      const parsed = parseInt(urutanStr, 10);
      if (!isNaN(parsed)) payload.urutan = parsed;
    }

    const result = await updateSarana(id, payload);

    revalidatePath('/');
    revalidatePath('/sarana');
    revalidatePath('/admin');
    revalidatePath('/admin/sarana');

    return { success: true, message: 'Sarana & prasarana berhasil diperbarui.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui sarana.' };
  }
}

export async function hapusSaranaAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID sarana tidak valid.' };

    await deleteSarana(id);

    revalidatePath('/');
    revalidatePath('/sarana');
    revalidatePath('/admin');
    revalidatePath('/admin/sarana');

    return { success: true, message: 'Sarana & prasarana berhasil dihapus.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menghapus sarana.' };
  }
}

// ============================================================
// 5. POTENSI WILAYAH
// ============================================================

export async function tambahPotensiAction(formData: FormData) {
  try {
    const judul = (formData.get('judul') as string) || '';
    const icon = (formData.get('icon') as string) || 'sparkles';
    const deskripsi_singkat = (formData.get('deskripsi_singkat') as string) || '';
    const kegiatan_utama = (formData.get('kegiatan_utama') as string) || '';
    const keunggulan_hasil = (formData.get('keunggulan_hasil') as string) || '';
    const tantangan_kendala = (formData.get('tantangan_kendala') as string) || '';
    const sumber_data = (formData.get('sumber_data') as string) || 'Pemerintah Dusun';
    const urutanStr = formData.get('urutan') as string;
    const urutan = urutanStr ? parseInt(urutanStr, 10) : 99;

    if (!judul.trim()) return { success: false, error: 'Judul potensi wilayah wajib diisi.' };

    const result = await createPotensi({
      judul: judul.trim(),
      icon: icon.trim() || 'sparkles',
      deskripsi_singkat: deskripsi_singkat.trim(),
      kegiatan_utama: kegiatan_utama.trim(),
      keunggulan_hasil: keunggulan_hasil.trim(),
      tantangan_kendala: tantangan_kendala.trim(),
      sumber_data: sumber_data.trim() || 'Pemerintah Dusun',
      urutan: isNaN(urutan) ? 99 : urutan,
    });

    revalidatePath('/');
    revalidatePath('/potensi');
    revalidatePath('/admin');
    revalidatePath('/admin/potensi');

    return { success: true, message: 'Potensi wilayah berhasil ditambahkan.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menambahkan potensi.' };
  }
}

export async function updatePotensiAction(id: string, formData: FormData) {
  try {
    const judul = (formData.get('judul') as string) || '';
    const icon = (formData.get('icon') as string) || 'sparkles';
    const deskripsi_singkat = (formData.get('deskripsi_singkat') as string) || '';
    const kegiatan_utama = (formData.get('kegiatan_utama') as string) || '';
    const keunggulan_hasil = (formData.get('keunggulan_hasil') as string) || '';
    const tantangan_kendala = (formData.get('tantangan_kendala') as string) || '';
    const sumber_data = (formData.get('sumber_data') as string) || 'Pemerintah Dusun';
    const urutanStr = formData.get('urutan') as string;

    if (!id) return { success: false, error: 'ID potensi tidak valid.' };
    if (!judul.trim()) return { success: false, error: 'Judul potensi wilayah wajib diisi.' };

    const payload: Record<string, any> = {
      judul: judul.trim(),
      icon: icon.trim() || 'sparkles',
      deskripsi_singkat: deskripsi_singkat.trim(),
      kegiatan_utama: kegiatan_utama.trim(),
      keunggulan_hasil: keunggulan_hasil.trim(),
      tantangan_kendala: tantangan_kendala.trim(),
      sumber_data: sumber_data.trim() || 'Pemerintah Dusun',
    };

    if (urutanStr) {
      const parsed = parseInt(urutanStr, 10);
      if (!isNaN(parsed)) payload.urutan = parsed;
    }

    const result = await updatePotensi(id, payload);

    revalidatePath('/');
    revalidatePath('/potensi');
    revalidatePath('/admin');
    revalidatePath('/admin/potensi');

    return { success: true, message: 'Potensi wilayah berhasil diperbarui.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui potensi.' };
  }
}

export async function hapusPotensiAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID potensi tidak valid.' };

    await deletePotensi(id);

    revalidatePath('/');
    revalidatePath('/potensi');
    revalidatePath('/admin');
    revalidatePath('/admin/potensi');

    return { success: true, message: 'Potensi wilayah berhasil dihapus.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menghapus potensi.' };
  }
}

// ============================================================
// 6. PROFIL DESA & STATISTIK KEPENDUDUKAN
// ============================================================

export async function updateProfilAction(formData: FormData) {
  try {
    const nama_dusun = (formData.get('nama_dusun') as string) || '';
    const kalurahan = (formData.get('kalurahan') as string) || '';
    const kapanewon = (formData.get('kapanewon') as string) || '';
    const kabupaten = (formData.get('kabupaten') as string) || '';
    const provinsi = (formData.get('provinsi') as string) || '';
    const deskripsi_hero = (formData.get('deskripsi_hero') as string) || '';
    const sejarah = (formData.get('sejarah') as string) || '';
    const visi = (formData.get('visi') as string) || '';
    const misiRaw = (formData.get('misi') as string) || '';
    const kontak_telepon = (formData.get('kontak_telepon') as string) || '';
    const kontak_alamat = (formData.get('kontak_alamat') as string) || '';
    const kontak_map_url = (formData.get('kontak_map_url') as string) || '';
    const gambar_profil_url = (formData.get('gambar_profil_url') as string) || '';

    // Olah misi dari textarea (satu baris per butir)
    const misi = misiRaw
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload: Record<string, any> = {};

    if (nama_dusun) payload.nama_dusun = nama_dusun.trim();
    if (kalurahan) payload.kalurahan = kalurahan.trim();
    if (kapanewon) payload.kapanewon = kapanewon.trim();
    if (kabupaten) payload.kabupaten = kabupaten.trim();
    if (provinsi) payload.provinsi = provinsi.trim();
    if (deskripsi_hero !== undefined) payload.deskripsi_hero = deskripsi_hero.trim();
    if (sejarah !== undefined) payload.sejarah = sejarah.trim();
    if (visi !== undefined) payload.visi = visi.trim();
    if (misi.length > 0) payload.misi = misi;
    if (kontak_telepon !== undefined) payload.kontak_telepon = kontak_telepon.trim();
    if (kontak_alamat !== undefined) payload.kontak_alamat = kontak_alamat.trim();
    if (kontak_map_url !== undefined) payload.kontak_map_url = kontak_map_url.trim();
    if (gambar_profil_url !== undefined) payload.gambar_profil_url = gambar_profil_url.trim();

    const result = await updateProfilDesa(payload);

    revalidatePath('/');
    revalidatePath('/profil');
    revalidatePath('/admin');
    revalidatePath('/admin/profil');

    return { success: true, message: 'Profil padukuhan berhasil disimpan.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menyimpan profil.' };
  }
}

export async function updateStatistikAction(formData: FormData) {
  try {
    const total_penduduk = parseInt((formData.get('total_penduduk') as string) || '0', 10);
    const kepala_keluarga = parseInt((formData.get('kepala_keluarga') as string) || '0', 10);
    const jumlah_rt = parseInt((formData.get('jumlah_rt') as string) || '0', 10);
    const jumlah_rw = parseInt((formData.get('jumlah_rw') as string) || '0', 10);
    const jumlah_laki_laki = parseInt((formData.get('jumlah_laki_laki') as string) || '0', 10);
    const jumlah_perempuan = parseInt((formData.get('jumlah_perempuan') as string) || '0', 10);

    const payload = {
      total_penduduk: isNaN(total_penduduk) ? 0 : total_penduduk,
      kepala_keluarga: isNaN(kepala_keluarga) ? 0 : kepala_keluarga,
      jumlah_rt: isNaN(jumlah_rt) ? 0 : jumlah_rt,
      jumlah_rw: isNaN(jumlah_rw) ? 0 : jumlah_rw,
      jumlah_laki_laki: isNaN(jumlah_laki_laki) ? 0 : jumlah_laki_laki,
      jumlah_perempuan: isNaN(jumlah_perempuan) ? 0 : jumlah_perempuan,
    };

    const result = await updateStatistik(payload);

    revalidatePath('/');
    revalidatePath('/profil');
    revalidatePath('/admin');
    revalidatePath('/admin/profil');

    return { success: true, message: 'Statistik kependudukan berhasil diperbarui.', data: result.data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui data statistik.' };
  }
}

// ============================================================
// 7. PESAN KONTAK / ASPIRASI WARGA
// ============================================================

export async function tandaiPesanDibacaAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID pesan tidak valid.' };

    await tandaiPesanDibaca(id);

    revalidatePath('/admin');
    revalidatePath('/admin/pesan');

    return { success: true, message: 'Pesan ditandai telah dibaca.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal memperbarui status pesan.' };
  }
}

export async function hapusPesanAction(id: string) {
  try {
    if (!id) return { success: false, error: 'ID pesan tidak valid.' };

    await deletePesan(id);

    revalidatePath('/admin');
    revalidatePath('/admin/pesan');

    return { success: true, message: 'Pesan berhasil dihapus dari kotak masuk.' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menghapus pesan.' };
  }
}
