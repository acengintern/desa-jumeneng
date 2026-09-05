import { Metadata } from 'next';
import { getPengurus } from '@/lib/data-service';
import StrukturClient from './StrukturClient';

export const metadata: Metadata = {
  title: 'Struktur Pengurus Dusun - Admin Jumeneng Kidul',
  description: 'Kelola data aparatur padukuhan (Dukuh, Ketua RW, dan Ketua RT).',
};

export const dynamic = 'force-dynamic';

export default async function AdminStrukturPage() {
  const pengurusList = await getPengurus();

  return <StrukturClient initialPengurus={pengurusList} />;
}
