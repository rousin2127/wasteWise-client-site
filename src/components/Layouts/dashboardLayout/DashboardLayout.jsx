import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0 overflow-y-auto">
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
