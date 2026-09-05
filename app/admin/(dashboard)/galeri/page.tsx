import { Metadata } from 'next';
import { getGaleri } from '@/lib/data-service';
import GaleriClient from './GaleriClient';

export const metadata: Metadata = {
  title: 'Kelola Galeri Foto - Admin Jumeneng Kidul',
  description: 'Kelola foto arsip dokumentasi kegiatan Padukuhan Jumeneng Kidul.',
};

export const dynamic = 'force-dynamic';

export default async function AdminGaleriPage() {
  const galeriList = await getGaleri();

  return <GaleriClient initialGaleri={galeriList} />;
}
