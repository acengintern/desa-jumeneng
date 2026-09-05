'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export interface AdminShellProps {
  children: React.ReactNode;
  unreadCount?: number;
}

export default function AdminShell({ children, unreadCount = 0 }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation (Desktop Fixed & Mobile Drawer) */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        unreadCount={unreadCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-64 transition-all">
        {/* Top Header */}
        <AdminHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
