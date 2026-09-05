import { Metadata } from 'next';
import { getDashboardStats } from '@/lib/data-service';
import AdminShell from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Panel Administrasi - Padukuhan Jumeneng Kidul',
  description: 'Sistem Informasi & Manajemen Konten Padukuhan Jumeneng Kidul, Sumberadi, Mlati, Sleman',
  robots: {
    index: false,
    follow: false,
  },
};

// Pastikan layout dinamis agar status pesan terbaru selalu diperbarui
export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = await getDashboardStats();

  return (
    <AdminShell unreadCount={stats.pesanBelumDibaca}>
      {children}
    </AdminShell>
  );
}
