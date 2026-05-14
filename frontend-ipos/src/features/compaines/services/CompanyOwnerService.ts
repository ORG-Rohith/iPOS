import { FaFlask, FaStore, FaUser, FaUserCheck } from "react-icons/fa";
import type { BusinessOwner, BusinessOwnersStatsData, CreateBusinessOwnerPayload, Plan } from "../types/CompanyOwers.types";
import { apiTenantService } from "../../auth/services/apiService";

export const businessOwnerService = {
    getAllBusinessOwners: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<{ data: BusinessOwner[]; total: number; page: number; limit: number }> => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        if (params?.status) queryParams.append("status", params.status);

        return apiTenantService.get<{ data: BusinessOwner[]; total: number; page: number; limit: number }>(
            `/business-owners?${queryParams.toString()}`
        );
    },
    getPlans: async (): Promise<Plan[]> => {
        return apiTenantService.get<Plan[]>("/plans");
    },
    getBusinessOwnerById: async (id: string): Promise<BusinessOwner> => {
        return apiTenantService.get<BusinessOwner>(`/business-owners/${id}`);
    },
    createBusinessOwner: async (data: CreateBusinessOwnerPayload): Promise<BusinessOwner> => {
        const payload = {
            // 🏢 Business Info
            name: data.name,
            slug: data.slug,
            legal_name: data.legal_name,
            business_type: data.business_type,

            tax_id: data.tax_id,
            registration_number: data.registration_number,

            // 🌍 Location
            country: data.country,
            country_code: data.country_code,
            currency: data.currency,
            timezone: data.timezone,

            // 📞 Contact
            email: data.email,
            phone: data.phone,
            contact_name: data.contact_name,
            website: data.website,

            // 📍 Address
            address: data.address,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code,

            // 🏷 Branding
            logo_url: data.logo_url,

            // 📊 Status
            status: data.status,
            onboarding_complete: data.onboarding_complete,

            // 💳 Subscriptions
            subscriptions: (data.subscriptions ?? []).map((sub) => ({
                plan_id: sub.plan_id,
                quantity: sub.quantity,
                custom_max_tenants: sub.custom_max_tenants || undefined,
                custom_max_outlets: sub.custom_max_outlets || undefined,
                custom_max_users: sub.custom_max_users || undefined,
                custom_max_devices: sub.custom_max_devices || undefined,
                status: sub.status || undefined,
                start_date: sub.start_date || undefined,
                end_date: sub.end_date || undefined,
                auto_renew: sub.auto_renew,
            })),
        };

        console.log("creating the business owner with payload -----> ", payload);


        return apiTenantService.post<BusinessOwner>("/business-owners", payload);
    },
    updateBusinessOwner: async (id: string, data: Partial<CreateBusinessOwnerPayload> | { is_deleted: boolean }): Promise<BusinessOwner> => {
        return apiTenantService.patch<BusinessOwner>(`/business-owners/${id}`, data);
    },
    deleteBusinessOwner: async (id: number): Promise<{ message: string }> => {
        return apiTenantService.delete<{ message: string }>(`/business-owners/${id}`);
    },
}

export const fetchBusinessOwnersStatsData = async (): Promise<BusinessOwnersStatsData> => {
    // const stats = await apiTenantService.get<any>("/businessowners/stats");

    return {
        BusinessOwnersStats: [
            {
                color: "border-red-500",
                label: "Total Companies",
                value: "",
                // value: stats.total.toString(),
                change: "",
                trend: "up",
                icon: FaUser,
                type: "sales",
            },
            {
                color: "border-green-500",
                label: "Active Companies",
                value: "",
                // value: stats.active.toString(),
                change: "",
                trend: "up",
                icon: FaUserCheck,
                type: "orders",
            },
            {
                color: "border-blue-500",
                label: "Trial",
                value: "",
                // value: stats.trial.toString(),
                change: "",
                trend: "up",
                icon: FaFlask,
                type: "customers",
            },
            {
                color: "border-orange-500",
                label: "Total Tenants",
                value: "",
                // value: stats.totalOutlets.toString(),
                change: "",
                trend: "up",
                icon: FaStore,
                type: "revenue",
            },
        ],
    };
};