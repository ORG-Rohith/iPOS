import React from "react";
import TenantsLayout from "./TenantsLayout";
import TenantCard from "../components/TenantCard";
import StatCard from "../../dashboard/components/StatCard";
import { useTenants } from "./useTenants";

export const TenantsPage: React.FC = () => {
  const { stats, tenants, loading, error } = useTenants();

  if (loading) {
    return (
      <TenantsLayout title="Tenants">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </TenantsLayout>
    );
  }

  if (error) {
    return (
      <TenantsLayout title="Tenants">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </TenantsLayout>
    );
  }

  return (
    <TenantsLayout title="Tenants">
      {/* 🔥 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats?.TenantStats.map((stat: any, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      {/* 🔥 Tenant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tenants.map((tenant) => (
          <TenantCard key={tenant.id} tenant={tenant} />
        ))}
        {tenants.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">No tenants found. Create your first one!</p>
          </div>
        )}
      </div>
    </TenantsLayout>
  );
};
