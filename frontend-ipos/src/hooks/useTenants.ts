import { useEffect, useState } from "react";
import type { Tenant, TenantStatsData } from "../features/auth/types/tenant.types";
import { fetchTenantsData } from "../services/dashboardService";
import { tenantService } from "../services/tenantService";

export const useTenants = () => {
  const [stats, setStats] = useState<TenantStatsData | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsData, tenantsData] = await Promise.all([
          fetchTenantsData(),
          tenantService.getAllTenants(),
        ]);
        setStats(statsData);
        setTenants(tenantsData);
      } catch (err: any) {
        setError(err.message || "Failed to load tenant data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { stats, tenants, loading, error };
};
