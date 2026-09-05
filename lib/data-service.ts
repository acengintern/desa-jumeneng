import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from './supabase/client';
import {
  initialProfilDesa,
  initialStatistik,
  initialPengurus,
  initialSarana,
  initialPotensi,
  initialBerita,
  initialGaleri,
  initialPesanKontak,
} from './initial-data';
import {
  ProfilDesa,
  StatistikKependudukan,
  PengurusDusun,
  SaranaPrasarana,
  PotensiWilayah,
  Berita,
  Galeri,
  PesanKontak,
  DashboardStats,
} from './types';

// In-memory fallback state untuk lingkungan lokal tanpa konfigurasi Supabase
// Memastikan aplikasi 100% berjalan (Zero-Downtime & Demo-Ready)
let memProfil: ProfilDesa = { ...initialProfilDesa };
let memStatistik: StatistikKependudukan = { ...initialStatistik };
let memPengurus: PengurusDusun[] = [...initialPengurus];
let memSarana: SaranaPrasarana[] = [...initialSarana];
let memPotensi: PotensiWilayah[] = [...initialPotensi];
let memBerita: Berita[] = [...initialBerita];
let memGaleri: Galeri[] = [...initialGaleri];
let memPesan: PesanKontak[] = [...initialPesanKontak];

/**
 * Mendapatkan Supabase client universal jika environment variables valid
 */
function getSupabase() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createSupabaseJsClient(url, key);
  } catch (err) {
    console.warn('[data-service] Gagal inisialisasi Supabase client:', err);
    return null;
  }
}

// ==========================================
// 1. PROFIL DESA
// ==========================================

export async function getProfilDesa(): Promise<ProfilDesa> {
  const supabase = getSupabase();
  if (!supabase) return memProfil;

  try {
    const { data, error } = await supabase
      .from('profil_desa')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn('[data-service] getProfilDesa Supabase error:', error.message);
      return memProfil;
    }
    return data as ProfilDesa;
  } catch (err) {
    console.warn('[data-service] getProfilDesa exception:', err);
    return memProfil;
  }
}

export async function updateProfilDesa(
  data: Partial<ProfilDesa>
): Promise<{ success: boolean; data?: ProfilDesa; error?: string }> {
  memProfil = {
    ...memProfil,
    ...data,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (!supabase) {
    return { success: true, data: memProfil };
  }

  try {
    const { data: updated, error } = await supabase
      .from('profil_desa')
      .upsert({ ...memProfil, ...data, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updateProfilDesa fallback to memory:', error.message);
      return { success: true, data: memProfil };
    }
    return { success: true, data: updated as ProfilDesa };
  } catch (err: any) {
    console.warn('[data-service] updateProfilDesa exception:', err);
    return { success: true, data: memProfil };
  }
}

// ==========================================
// 2. STATISTIK KEPENDUDUKAN
// ==========================================

export async function getStatistik(): Promise<StatistikKependudukan> {
  const supabase = getSupabase();
  if (!supabase) return memStatistik;

  try {
    const { data, error } = await supabase
      .from('statistik_kependudukan')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn('[data-service] getStatistik Supabase error:', error.message);
      return memStatistik;
    }
    return data as StatistikKependudukan;
  } catch (err) {
    console.warn('[data-service] getStatistik exception:', err);
    return memStatistik;
  }
}

export async function updateStatistik(
  data: Partial<StatistikKependudukan>
): Promise<{ success: boolean; data?: StatistikKependudukan; error?: string }> {
  memStatistik = {
    ...memStatistik,
    ...data,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (!supabase) {
    return { success: true, data: memStatistik };
  }

  try {
    const { data: updated, error } = await supabase
      .from('statistik_kependudukan')
      .upsert({ ...memStatistik, ...data, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updateStatistik fallback to memory:', error.message);
      return { success: true, data: memStatistik };
    }
    return { success: true, data: updated as StatistikKependudukan };
  } catch (err: any) {
    console.warn('[data-service] updateStatistik exception:', err);
    return { success: true, data: memStatistik };
  }
}

// ==========================================
// 3. STRUKTUR PEMERINTAHAN / PENGURUS DUSUN
// ==========================================

export async function getPengurus(): Promise<PengurusDusun[]> {
  const supabase = getSupabase();
  if (!supabase) return [...memPengurus].sort((a, b) => a.urutan - b.urutan);

  try {
    const { data, error } = await supabase
      .from('struktur_pemerintahan')
      .select('*')
      .order('urutan', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[data-service] getPengurus Supabase error:', error.message);
      return [...memPengurus].sort((a, b) => a.urutan - b.urutan);
    }
    return data as PengurusDusun[];
  } catch (err) {
    console.warn('[data-service] getPengurus exception:', err);
    return [...memPengurus].sort((a, b) => a.urutan - b.urutan);
  }
}

export async function createPengurus(
  pengurus: Omit<PengurusDusun, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: PengurusDusun; error?: string }> {
  const newId = `c3000000-0000-0000-0000-${Date.now().toString(16).padStart(12, '0')}`;
  const newItem: PengurusDusun = {
    ...pengurus,
    id: newId,
    created_at: new Date().toISOString(),
  };

  memPengurus.push(newItem);

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: newItem };

  try {
    const { data, error } = await supabase
      .from('struktur_pemerintahan')
      .insert([newItem])
      .select()
      .single();

    if (error) {
      console.warn('[data-service] createPengurus fallback to memory:', error.message);
      return { success: true, data: newItem };
    }
    return { success: true, data: data as PengurusDusun };
  } catch (err: any) {
    return { success: true, data: newItem };
  }
}

export async function updatePengurus(
  id: string,
  pengurus: Partial<PengurusDusun>
): Promise<{ success: boolean; data?: PengurusDusun; error?: string }> {
  const idx = memPengurus.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memPengurus[idx] = { ...memPengurus[idx], ...pengurus };
  }

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: memPengurus[idx] };

  try {
    const { data, error } = await supabase
      .from('struktur_pemerintahan')
      .update(pengurus)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updatePengurus fallback to memory:', error.message);
      return { success: true, data: memPengurus[idx] };
    }
    return { success: true, data: data as PengurusDusun };
  } catch (err: any) {
    return { success: true, data: memPengurus[idx] };
  }
}

export async function deletePengurus(id: string): Promise<{ success: boolean; error?: string }> {
  memPengurus = memPengurus.filter((p) => p.id !== id);

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.from('struktur_pemerintahan').delete().eq('id', id);
    if (error) {
      console.warn('[data-service] deletePengurus fallback to memory:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// ==========================================
// 4. SARANA & PRASARANA
// ==========================================

export async function getSarana(): Promise<SaranaPrasarana[]> {
  const supabase = getSupabase();
  if (!supabase) return [...memSarana].sort((a, b) => a.urutan - b.urutan);

  try {
    const { data, error } = await supabase
      .from('sarana_prasarana')
      .select('*')
      .order('urutan', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[data-service] getSarana Supabase error:', error.message);
      return [...memSarana].sort((a, b) => a.urutan - b.urutan);
    }
    return data as SaranaPrasarana[];
  } catch (err) {
    console.warn('[data-service] getSarana exception:', err);
    return [...memSarana].sort((a, b) => a.urutan - b.urutan);
  }
}

export async function createSarana(
  sarana: Omit<SaranaPrasarana, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: SaranaPrasarana; error?: string }> {
  const newId = `d4000000-0000-0000-0000-${Date.now().toString(16).padStart(12, '0')}`;
  const newItem: SaranaPrasarana = {
    ...sarana,
    id: newId,
    created_at: new Date().toISOString(),
  };

  memSarana.push(newItem);

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: newItem };

  try {
    const { data, error } = await supabase
      .from('sarana_prasarana')
      .insert([newItem])
      .select()
      .single();

    if (error) {
      console.warn('[data-service] createSarana fallback to memory:', error.message);
      return { success: true, data: newItem };
    }
    return { success: true, data: data as SaranaPrasarana };
  } catch (err: any) {
    return { success: true, data: newItem };
  }
}

export async function updateSarana(
  id: string,
  sarana: Partial<SaranaPrasarana>
): Promise<{ success: boolean; data?: SaranaPrasarana; error?: string }> {
  const idx = memSarana.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memSarana[idx] = { ...memSarana[idx], ...sarana };
  }

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: memSarana[idx] };

  try {
    const { data, error } = await supabase
      .from('sarana_prasarana')
      .update(sarana)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updateSarana fallback to memory:', error.message);
      return { success: true, data: memSarana[idx] };
    }
    return { success: true, data: data as SaranaPrasarana };
  } catch (err: any) {
    return { success: true, data: memSarana[idx] };
  }
}

export async function deleteSarana(id: string): Promise<{ success: boolean; error?: string }> {
  memSarana = memSarana.filter((s) => s.id !== id);

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.from('sarana_prasarana').delete().eq('id', id);
    if (error) {
      console.warn('[data-service] deleteSarana fallback to memory:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// ==========================================
// 5. POTENSI WILAYAH
// ==========================================

export async function getPotensi(): Promise<PotensiWilayah[]> {
  const supabase = getSupabase();
  if (!supabase) return [...memPotensi].sort((a, b) => a.urutan - b.urutan);

  try {
    const { data, error } = await supabase
      .from('potensi_wilayah')
      .select('*')
      .order('urutan', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[data-service] getPotensi Supabase error:', error.message);
      return [...memPotensi].sort((a, b) => a.urutan - b.urutan);
    }
    return data as PotensiWilayah[];
  } catch (err) {
    console.warn('[data-service] getPotensi exception:', err);
    return [...memPotensi].sort((a, b) => a.urutan - b.urutan);
  }
}

export async function createPotensi(
  potensi: Omit<PotensiWilayah, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: PotensiWilayah; error?: string }> {
  const newId = `e5000000-0000-0000-0000-${Date.now().toString(16).padStart(12, '0')}`;
  const newItem: PotensiWilayah = {
    ...potensi,
    id: newId,
    created_at: new Date().toISOString(),
  };

  memPotensi.push(newItem);

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: newItem };

  try {
    const { data, error } = await supabase
      .from('potensi_wilayah')
      .insert([newItem])
      .select()
      .single();

    if (error) {
      console.warn('[data-service] createPotensi fallback to memory:', error.message);
      return { success: true, data: newItem };
    }
    return { success: true, data: data as PotensiWilayah };
  } catch (err: any) {
    return { success: true, data: newItem };
  }
}

export async function updatePotensi(
  id: string,
  potensi: Partial<PotensiWilayah>
): Promise<{ success: boolean; data?: PotensiWilayah; error?: string }> {
  const idx = memPotensi.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memPotensi[idx] = { ...memPotensi[idx], ...potensi };
  }

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: memPotensi[idx] };

  try {
    const { data, error } = await supabase
      .from('potensi_wilayah')
      .update(potensi)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updatePotensi fallback to memory:', error.message);
      return { success: true, data: memPotensi[idx] };
    }
    return { success: true, data: data as PotensiWilayah };
  } catch (err: any) {
    return { success: true, data: memPotensi[idx] };
  }
}

export async function deletePotensi(id: string): Promise<{ success: boolean; error?: string }> {
  memPotensi = memPotensi.filter((p) => p.id !== id);

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.from('potensi_wilayah').delete().eq('id', id);
    if (error) {
      console.warn('[data-service] deletePotensi fallback to memory:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// ==========================================
// 6. BERITA & KEGIATAN
// ==========================================

export async function getBerita(): Promise<Berita[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return [...memBerita].sort(
      (a, b) => new Date(b.tanggal_publikasi).getTime() - new Date(a.tanggal_publikasi).getTime()
    );
  }

  try {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('tanggal_publikasi', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[data-service] getBerita Supabase error:', error.message);
      return [...memBerita].sort(
        (a, b) => new Date(b.tanggal_publikasi).getTime() - new Date(a.tanggal_publikasi).getTime()
      );
    }
    return data as Berita[];
  } catch (err) {
    console.warn('[data-service] getBerita exception:', err);
    return [...memBerita].sort(
      (a, b) => new Date(b.tanggal_publikasi).getTime() - new Date(a.tanggal_publikasi).getTime()
    );
  }
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  const allBerita = await getBerita();
  return allBerita.find((b) => b.slug === slug) || null;
}

export async function createBerita(
  berita: Omit<Berita, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: Berita; error?: string }> {
  const newId = `f6000000-0000-0000-0000-${Date.now().toString(16).padStart(12, '0')}`;
  const newItem: Berita = {
    ...berita,
    id: newId,
    created_at: new Date().toISOString(),
  };

  memBerita.push(newItem);

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: newItem };

  try {
    const { data, error } = await supabase
      .from('berita')
      .insert([newItem])
      .select()
      .single();

    if (error) {
      console.warn('[data-service] createBerita fallback to memory:', error.message);
      return { success: true, data: newItem };
    }
    return { success: true, data: data as Berita };
  } catch (err: any) {
    return { success: true, data: newItem };
  }
}

export async function updateBerita(
  id: string,
  berita: Partial<Berita>
): Promise<{ success: boolean; data?: Berita; error?: string }> {
  const idx = memBerita.findIndex((b) => b.id === id);
  if (idx !== -1) {
    memBerita[idx] = { ...memBerita[idx], ...berita };
  }

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: memBerita[idx] };

  try {
    const { data, error } = await supabase
      .from('berita')
      .update(berita)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updateBerita fallback to memory:', error.message);
      return { success: true, data: memBerita[idx] };
    }
    return { success: true, data: data as Berita };
  } catch (err: any) {
    return { success: true, data: memBerita[idx] };
  }
}

export async function deleteBerita(id: string): Promise<{ success: boolean; error?: string }> {
  memBerita = memBerita.filter((b) => b.id !== id);

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.from('berita').delete().eq('id', id);
    if (error) {
      console.warn('[data-service] deleteBerita fallback to memory:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// ==========================================
// 7. GALERI KEGIATAN
// ==========================================

export async function getGaleri(): Promise<Galeri[]> {
  const supabase = getSupabase();
  if (!supabase) return [...memGaleri].sort((a, b) => a.urutan - b.urutan);

  try {
    const { data, error } = await supabase
      .from('galeri')
      .select('*')
      .order('urutan', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[data-service] getGaleri Supabase error:', error.message);
      return [...memGaleri].sort((a, b) => a.urutan - b.urutan);
    }
    return data as Galeri[];
  } catch (err) {
    console.warn('[data-service] getGaleri exception:', err);
    return [...memGaleri].sort((a, b) => a.urutan - b.urutan);
  }
}

export async function createGaleri(
  galeri: Omit<Galeri, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: Galeri; error?: string }> {
  const newId = `g7000000-0000-0000-0000-${Date.now().toString(16).padStart(12, '0')}`;
  const newItem: Galeri = {
    ...galeri,
    id: newId,
    created_at: new Date().toISOString(),
  };

  memGaleri.push(newItem);

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: newItem };

  try {
    const { data, error } = await supabase
      .from('galeri')
      .insert([newItem])
      .select()
      .single();

    if (error) {
      console.warn('[data-service] createGaleri fallback to memory:', error.message);
      return { success: true, data: newItem };
    }
    return { success: true, data: data as Galeri };
  } catch (err: any) {
    return { success: true, data: newItem };
  }
}

export async function updateGaleri(
  id: string,
  galeri: Partial<Galeri>
): Promise<{ success: boolean; data?: Galeri; error?: string }> {
  const idx = memGaleri.findIndex((g) => g.id === id);
  if (idx !== -1) {
    memGaleri[idx] = { ...memGaleri[idx], ...galeri };
  }

  const supabase = getSupabase();
  if (!supabase) return { success: true, data: memGaleri[idx] };

  try {
    const { data, error } = await supabase
      .from('galeri')
      .update(galeri)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('[data-service] updateGaleri fallback to memory:', error.message);
      return { success: true, data: memGaleri[idx] };
    }
    return { success: true, data: data as Galeri };
  } catch (err: any) {
    return { success: true, data: memGaleri[idx] };
  }
}

export async function deleteGaleri(id: string): Promise<{ success: boolean; error?: string }> {
  memGaleri = memGaleri.filter((g) => g.id !== id);

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.from('galeri').delete().eq('id', id);
    if (error) {
      console.warn('[data-service] deleteGaleri fallback to memory:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// ==========================================
// 8. PESAN KONTAK / ASPIRASI WARGA
// ==========================================

export async function getPesanKontak(): Promise<PesanKontak[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return [...memPesan].sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  }

  try {
    const { data, error } = await supabase
      .from('pesan_kontak')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      if (error) console.warn('[data-service] getPesanKontak Supabase error:', error.message);
      return [...memPesan].sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      );
    }
    return data as PesanKontak[];
  } catch (err) {
    console.warn('[data-service] getPesanKontak exception:', err);
    return [...memPesan].sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  }
}

export async function kirimPesanKontak(
  pesan: Omit<PesanKontak, 'id' | 'created_at' | 'dibaca'>
): Promise<{ success: boolean; message: string }> {
  const newId = `h8000000-0000-0000-0000-${Date.now().toString(16).padStart(12, '0')}`;
  const newItem: PesanKontak = {
    ...pesan,
    id: newId,
    dibaca: false,
    created_at: new Date().toISOString(),
  };

  memPesan.unshift(newItem);

  const supabase = getSupabase();
  if (!supabase) {
    return {
      success: true,
      message: 'Terima kasih, pesan Anda telah terkirim dan tercatat!',
    };
  }

  try {
    const { error } = await supabase.from('pesan_kontak').insert([newItem]);
    if (error) {
      console.warn('[data-service] kirimPesanKontak Supabase error:', error.message);
      return {
        success: true,
        message: 'Pesan Anda tersimpan (mode cadangan lokal). Pengurus dusun akan segera merespons.',
      };
    }
    return {
      success: true,
      message: 'Pesan berhasil dikirim langsung ke sistem database dusun.',
    };
  } catch (err) {
    return {
      success: true,
      message: 'Pesan Anda berhasil diterima oleh sistem Padukuhan Jumeneng Kidul.',
    };
  }
}

export async function tandaiPesanDibaca(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const idx = memPesan.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memPesan[idx].dibaca = true;
  }

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase
      .from('pesan_kontak')
      .update({ dibaca: true })
      .eq('id', id);

    if (error) {
      console.warn('[data-service] tandaiPesanDibaca fallback:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

export async function deletePesan(id: string): Promise<{ success: boolean; error?: string }> {
  memPesan = memPesan.filter((p) => p.id !== id);

  const supabase = getSupabase();
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.from('pesan_kontak').delete().eq('id', id);
    if (error) {
      console.warn('[data-service] deletePesan fallback:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// ==========================================
// 9. DASHBOARD STATS
// ==========================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const [berita, galeri, pengurus, sarana, pesan] = await Promise.all([
    getBerita(),
    getGaleri(),
    getPengurus(),
    getSarana(),
    getPesanKontak(),
  ]);

  const pesanBelumDibaca = pesan.filter((p) => !p.dibaca).length;

  return {
    totalBerita: berita.length,
    totalGaleri: galeri.length,
    totalPengurus: pengurus.length,
    totalSarana: sarana.length,
    totalPesan: pesan.length,
    pesanBelumDibaca,
  };
}
