import { useEffect, useState } from "react";
import type { Tenant } from "../types/tenant.types";
import { tenantService } from "../services/tenant.service";

export const useGetTenantDetailsById = (uuid?: string) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    const loadTenant = async () => {
      try {
        setLoading(true);
        const data = await tenantService.getTenantById(uuid);
        setTenant(data);
      } catch (err: any) {
        setError(err || "Failed to load tenant details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTenant();
  }, [uuid]);

  return { tenant, loading, error };
};
