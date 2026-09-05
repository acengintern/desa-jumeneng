import { Metadata } from 'next';
import { getBerita } from '@/lib/data-service';
import BeritaClient from './BeritaClient';

export const metadata: Metadata = {
  title: 'Kelola Berita & Kegiatan - Admin Jumeneng Kidul',
  description: 'Kelola publikasi warta berita, agenda kegiatan, dan pengumuman dusun.',
};

export const dynamic = 'force-dynamic';

export default async function AdminBeritaPage() {
  const beritaList = await getBerita();

  return <BeritaClient initialBerita={beritaList} />;
}
