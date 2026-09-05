import { Metadata } from 'next';
import { getPotensi } from '@/lib/data-service';
import PotensiClient from './PotensiClient';

export const metadata: Metadata = {
  title: 'Potensi Wilayah - Admin Jumeneng Kidul',
  description: 'Kelola data potensi pertanian, UMKM, peternakan, dan keagamaan padukuhan.',
};

export const dynamic = 'force-dynamic';

export default async function AdminPotensiPage() {
  const potensiList = await getPotensi();

  return <PotensiClient initialPotensi={potensiList} />;
}
