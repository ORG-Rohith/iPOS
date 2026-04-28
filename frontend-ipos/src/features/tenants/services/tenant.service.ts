import { apiTenantService } from "../../auth/services/apiService";
import type { Tenant, CreateTenantPayload } from "../types/tenant.types";

export const tenantService = {
  getAllTenants: async (): Promise<Tenant[]> => {
    return apiTenantService.get<Tenant[]>("/tenants");
  },

  // ✅ use uuid
  getTenantById: async (uuid: string): Promise<Tenant> => {
    return apiTenantService.get<Tenant>(`/tenants/${uuid}`);
  },

  createTenant: async (data: CreateTenantPayload): Promise<Tenant> => {
    const payload = {
      name: data.businessName,
      legal_name: data.legalName,
      business_type: data.businessType?.toLowerCase(),
      tax_id: data.taxId,
      registration_number: data.registrationNumber,

      country: data.country,
      country_code: data.country_code,
      currency: data.currency,
      timezone: data.timezone,

      email: data.email,
      phone: data.phone,
      contact_name: data.contactName,
      website: data.website,

      address: data.address,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,

      plan: data.plan,
      billing_cycle: data.billingCycle,

      logo_url: data.logoUrl,
    };

    return apiTenantService.post<Tenant>("/tenants", payload);
  },

  updateTenant: async (
    uuid: string,
    data: Partial<CreateTenantPayload> & { status?: string }
  ): Promise<Tenant> => {
    const payload: any = {};

    // 🏢 Basic
    if (data.businessName) payload.name = data.businessName;
    if (data.legalName) payload.legal_name = data.legalName;
    if (data.businessType) payload.business_type = data.businessType.toLowerCase();
    if (data.taxId) payload.tax_id = data.taxId;
    if (data.registrationNumber) payload.registration_number = data.registrationNumber;

    // 🌍 Location
    if (data.country) payload.country = data.country;
    if (data.country_code) payload.country_code = data.country_code;
    if (data.currency) payload.currency = data.currency;
    if (data.timezone) payload.timezone = data.timezone;

    // 📞 Contact
    if (data.email) payload.email = data.email;
    if (data.phone) payload.phone = data.phone;
    if (data.contactName) payload.contact_name = data.contactName;
    if (data.website) payload.website = data.website;

    // 📍 Address
    if (data.address) payload.address = data.address;
    if (data.city) payload.city = data.city;
    if (data.state) payload.state = data.state;
    if (data.postalCode) payload.postal_code = data.postalCode;

    // 💳 Subscription
    if (data.plan) payload.plan = data.plan;
    if (data.billingCycle) payload.billing_cycle = data.billingCycle;

    // 🏷 Branding
    if (data.logoUrl) payload.logo_url = data.logoUrl;

    // 📊 Status
    if (data.status) payload.status = data.status;

    return apiTenantService.put<Tenant>(`/tenants/${uuid}`, payload);
  },

  // ⚠️ If backend uses soft delete, this should be PATCH
  deleteTenant: async (uuid: string): Promise<{ message: string }> => {
    return apiTenantService.delete<{ message: string }>(`/tenants/${uuid}`);
  },
};