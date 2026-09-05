import { Metadata } from 'next';
import { getPesanKontak } from '@/lib/data-service';
import PesanClient from './PesanClient';

export const metadata: Metadata = {
  title: 'Kotak Masuk Pesan Warga - Admin Jumeneng Kidul',
  description: 'Kelola kotak masuk aspirasi, pertanyaan, dan permohonan warga dusun.',
};

export const dynamic = 'force-dynamic';

export default async function AdminPesanPage() {
  const pesanList = await getPesanKontak();

  return <PesanClient initialPesan={pesanList} />;
}
