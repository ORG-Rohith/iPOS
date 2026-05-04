import { useState } from "react";
import type { Tenant } from "../types/tenant.types";
import { tenantService } from "../services/tenant.service";

export const useTenantUpdate = (uuid?: string) => {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const updateTenant = async (data: any) => {
        if (!uuid) return;
        try {
            setLoading(true);
            const updated = await tenantService.updateTenant(uuid, data);
            setTenant(updated);
            return updated;
        } catch (err: any) {
            setError(err || "Failed to update tenant");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { tenant, loading, error, updateTenant };
};