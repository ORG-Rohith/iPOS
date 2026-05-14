import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateBusinessOwnerPayload } from "../types/CompanyOwers.types";
import { businessOwnerService } from "../services/CompanyOwnerService";

export const useEditBusinessOwner = (id: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateBusinessOwnerPayload>({
        name: "",
        slug: "",
        legal_name: "",
        business_type: "retail",
        tax_id: "",
        registration_number: "",
        contact_name: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        country_code: "",
        state: "",
        city: "",
        address: "",
        postal_code: "",
        currency: "",
        timezone: "",
        logo_url: "",
        status: "Active",
        onboarding_complete: false,
        subscriptions: [],
    });

    useEffect(() => {
        if (!id) return;

        const fetchBusinessOwner = async () => {
            try {
                setFetching(true);
                const data = await businessOwnerService.getBusinessOwnerById(id);

                setForm({
                    name: data.name || "",
                    slug: data.slug || "",
                    legal_name: data.legal_name || "",
                    business_type: data.business_type || "retail",
                    tax_id: data.tax_id || "",
                    registration_number: data.registration_number || "",
                    contact_name: data.contact_name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    website: data.website || "",
                    country: data.country || "",
                    country_code: data.country_code || "",
                    state: data.state || "",
                    city: data.city || "",
                    address: data.address || "",
                    postal_code: data.postal_code || "",
                    currency: data.currency || "",
                    timezone: data.timezone || "",
                    logo_url: data.logo_url || "",
                    status: data.status || "Active",
                    onboarding_complete: data.onboarding_complete || false,
                    subscriptions: (data.subscriptions || []).map(s => ({
                        plan_id: s.plan_id,
                        quantity: s.quantity,
                        custom_max_tenants: s.custom_max_tenants ?? undefined,
                        custom_max_outlets: s.custom_max_outlets ?? undefined,
                        custom_max_users: s.custom_max_users ?? undefined,
                        custom_max_devices: s.custom_max_devices ?? undefined,
                        status: s.status ?? 'active',
                        start_date: s.start_date ?? undefined,
                        end_date: s.end_date ?? undefined,
                        auto_renew: s.auto_renew ?? true,
                    })),
                });
            } catch (err: any) {
                setError(err.message || "Failed to fetch business owner details");
            } finally {
                setFetching(false);
            }
        };

        fetchBusinessOwner();
    }, [id]);

    const updateBusinessOwner = async (data: CreateBusinessOwnerPayload) => {
        if (!id) return;
        setLoading(true);
        setError(null);

        try {
            await businessOwnerService.updateBusinessOwner(id, data);
            navigate("/businessOwners");
        } catch (err: any) {
            setError(err?.message || "Failed to update business owner");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        setForm,
        updateBusinessOwner,
        loading,
        fetching,
        error,
    };
};
