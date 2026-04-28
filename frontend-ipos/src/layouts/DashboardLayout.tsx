import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <Sidebar />
      <div className="ml-[240px] flex-1 flex flex-col">
        <Topbar title={title} variant="dashboard" />
        <main className="p-7 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
