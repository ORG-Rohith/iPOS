export interface CreateTenantPayload {
    businessName: string;
    legalName: string;
    businessType: string;
    registrationNumber: string;
    taxId: string;
    contactName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    website: string;
    address: string;
    postalCode: string;
    plan: string;
    billingCycle: string;
    outlets: number;
    currency: string;
    timezone: string;
}