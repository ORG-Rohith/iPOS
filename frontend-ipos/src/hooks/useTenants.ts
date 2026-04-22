import { useEffect, useState } from "react";
import type { TenantStatsData } from "../features/auth/types/tenant.types";
import { fetchTenantsData } from "../services/dashboardService";

export const useTenants = () => {
  const [data, setData] = useState<TenantStatsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const tenantData = await fetchTenantsData();
        setData(tenantData);
      } catch (err) {
        setError("Failed to load tenant data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);
  return { data, loading, error };
};
