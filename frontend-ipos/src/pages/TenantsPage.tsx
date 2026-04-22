import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import TenantsLayout from "../layout/TenantsLayout";
import TenantCard from "../components/tenants/TenantCard";
import TenantStatCard from "../components/tenants/TenantStatCard";

export const TenantsPage: React.FC = () => {

  const { error } = useDashboard();

  const stats = [
    { label: "Total Tenants", value: 12, color: "border-red-400" },
    { label: "Active", value: 10, color: "border-green-400" },
    { label: "Trial", value: 2, color: "border-blue-400" },
    { label: "Total Outlets", value: 28, color: "border-orange-400" },
  ];

  const tenants = [
    {
      name: "Demo Retail Group",
      country: "AU",
      outlets: 3,
      devices: 8,
      plan: "Premium",
      status: "Active",
    },
    {
      name: "Mumbai Food Co",
      country: "IN",
      outlets: 2,
      devices: 5,
      plan: "Standard",
      status: "Active",
    },
    {
      name: "Sydney Fresh Market",
      country: "AU",
      outlets: 1,
      devices: 2,
      plan: "Standard",
      status: "Trial",
    },
    {
      name: "Delhi Spice House",
      country: "IN",
      outlets: 2,
      devices: 0,
      plan: "Standard",
      status: "Suspended",
    },
  ] as const;


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
        {stats.map((stat, i) => (
          <TenantStatCard key={i} {...stat} />
        ))}
      </div>

      {/* 🔥 Tenant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tenants.map((tenant, i) => (
          <TenantCard key={i} tenant={tenant} />
        ))}
      </div>
    </TenantsLayout>
  );
};
