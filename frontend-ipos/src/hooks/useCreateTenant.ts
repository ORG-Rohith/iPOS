import { useState } from "react";
import type { CreateTenantPayload } from "../features/auth/types/tenant.types";
import { tenantService } from "../services/tenantService";
import { useNavigate } from "react-router-dom";

export const useCreateTenant = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const createTenant = async (data: CreateTenantPayload) => {
        setLoading(true);
        setError(null);

        try {
            await tenantService.createTenant(data);
            navigate("/tenants");
        } catch (err: any) {
            setError(err || "Failed to create tenant");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createTenant, loading, error };
};