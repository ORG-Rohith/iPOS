import { useState, useEffect } from "react";
import type { Tenant } from "../types/tenant.types";
import { tenantService } from "../services/tenant.service";

export const useTenantUpdate = (uuid?: string) => {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!uuid) {
            setLoading(false);
            return;
        }

        const fetchTenant = async () => {
            try {
                setLoading(true);
                const data = await tenantService.getTenantById(uuid);
                setTenant(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch tenant");
            } finally {
                setLoading(false);
            }
        };

        fetchTenant();
    }, [uuid]);


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