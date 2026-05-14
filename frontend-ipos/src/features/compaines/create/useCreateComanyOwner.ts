// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import type { CreateBusinessOwnerPayload } from "../types/businessOwers.types";



// export const useCreateBusinessOwner = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const createBusinessOwner = async (data: CreateBusinessOwnerPayload) => {
//         setLoading(true);
//         setError(null);

//         try {
//             // await tenantService.createTenant(data);
//             navigate("/tenants");
//         } catch (err: any) {
//             setError(err || "Failed to create tenant");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { createBusinessOwner, loading, error };
// };

// hooks/useCreateBusinessOwner.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { CreateBusinessOwnerPayload } from "../types/CompanyOwers.types";
import { businessOwnerService } from "../services/CompanyOwnerService";

export const useCreateBusinessOwner = () => {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(
        null
    );

    const navigate = useNavigate();

    const createBusinessOwner = async (
        data: CreateBusinessOwnerPayload
    ) => {
        setLoading(true);

        setError(null);

        try {
            console.log("we are in the use create business owner with payload", data);

            await businessOwnerService.createBusinessOwner(data);

            navigate("/businessOwners");
        } catch (err: any) {
            setError(
                err?.message ||
                "Failed to create business owner"
            );

            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        createBusinessOwner,
        loading,
        error,
    };
};