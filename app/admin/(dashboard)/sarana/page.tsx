import { Metadata } from 'next';
import { getSarana } from '@/lib/data-service';
import SaranaClient from './SaranaClient';

export const metadata: Metadata = {
  title: 'Sarana & Prasarana - Admin Jumeneng Kidul',
  description: 'Kelola data fasilitas umum, ibadah, pendidikan, dan kesehatan padukuhan.',
};

export const dynamic = 'force-dynamic';

export default async function AdminSaranaPage() {
  const saranaList = await getSarana();

  return <SaranaClient initialSarana={saranaList} />;
}
