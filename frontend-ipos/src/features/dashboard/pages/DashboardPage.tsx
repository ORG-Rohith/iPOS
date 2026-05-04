import React from 'react';
import DashboardLayout from './DashboardLayout';
import StatCard from '../components/StatCard';
import WeeklySalesChart from '../components/WeeklySalesChart';
import OutletStatusList from '../components/OutletStatusList';
import RecentTransactions from '../components/RecentTransactions';
import AlertsPanel from '../components/AlertsPanel';
import { useDashboard } from './useDashboard';

export const SuperAdminDashboard: React.FC = () => {
  const { data, loading, error } = useDashboard();
  // const userRaw = localStorage.getItem("user");
  // const user = userRaw ? JSON.parse(userRaw) : null;

  // if (!user) return <div>Please login.</div>;

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <span>Loading dashboard data...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        {data?.stats.map((stat: any, idx: number) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
        <div className="lg:col-span-2">
          <WeeklySalesChart data={data?.chartData || []} />
        </div>
        <div>
          <OutletStatusList outlets={data?.outlets || []} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={data?.transactions || []} />
        </div>
        <div>
          <AlertsPanel alerts={data?.alerts || []} />
        </div>
      </div>
    </DashboardLayout>
  );
};
