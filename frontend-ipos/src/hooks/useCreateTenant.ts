import { useState } from "react";
import type { CreateTenantPayload } from "../features/auth/types/tenant.types";

export const useCreateTenant = () => {
    const [loading, setLoading] = useState(false);

    const createTenant = async (data: CreateTenantPayload) => {
        setLoading(true);

        try {
            console.log("API CALL:", data);

            // await api.post('/tenants', data)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { createTenant, loading };
};