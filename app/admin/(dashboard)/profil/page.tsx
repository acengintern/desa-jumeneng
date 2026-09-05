import { Metadata } from 'next';
import { getProfilDesa, getStatistik } from '@/lib/data-service';
import ProfilClient from './ProfilClient';

export const metadata: Metadata = {
  title: 'Profil & Demografi - Admin Jumeneng Kidul',
  description: 'Kelola sejarah, visi-misi, statistik demografi kependudukan, dan informasi kontak.',
};

export const dynamic = 'force-dynamic';

export default async function AdminProfilPage() {
  const [profil, statistik] = await Promise.all([
    getProfilDesa(),
    getStatistik(),
  ]);

  return (
    <ProfilClient
      initialProfil={profil}
      initialStatistik={statistik}
    />
  );
}
