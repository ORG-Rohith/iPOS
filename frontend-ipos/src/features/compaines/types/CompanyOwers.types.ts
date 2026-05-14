import type { IconType } from "react-icons";

/* =========================
   STATS
========================= */

export interface BusinessOwnersStatsData {
    BusinessOwnersStats: StatData[];
}

export interface StatData {
    color: string;
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: IconType;
    type: "sales" | "orders" | "customers" | "revenue";
}

/* =========================
   BUSINESS OWNER
========================= */

export interface BusinessOwner {
    id: number;
    uuid: string;

    // 🏢 Business Info
    name: string;
    slug: string | null;
    legal_name: string | null;

    business_type: "retail" | "fnb" | "both";

    tax_id: string | null;
    registration_number: string | null;

    // 🌍 Location
    country: string;
    country_code: string;
    currency: string;
    timezone: string | null;

    // 📞 Contact
    email: string | null;
    phone: string | null;
    contact_name: string | null;
    website: string | null;

    // 📍 Address
    address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;

    // 🏷 Branding
    logo_url: string | null;

    // 📊 Status
    status: "Active" | "Inactive" | "Suspended";
    onboarding_complete: boolean;

    // 🕒 Audit
    created_on: string;
    updated_on: string;

    // 🔗 Relations
    subscriptions?: Subscription[];
    tenants?: any[];
    outlets?: any[];
    devices?: any[];
    owners?: OwnerPayload[];
}

/* =========================
   PLAN
========================= */

export interface Plan {
    id: number;
    name: string;
    code: string;
    description: string | null;

    price: number;
    billing_cycle: "Monthly" | "Yearly";

    // Resource Limits
    max_tenants: number | null;
    max_outlets: number | null;
    max_users: number | null;
    max_devices: number | null;

    // Enterprise
    is_custom: boolean;
    is_active: boolean;

    created_on: string;
    updated_on: string;
}

/* =========================
   SUBSCRIPTION
========================= */

export interface Subscription {
    id: number;
    plan_id: number;
    quantity: number;

    // Enterprise Custom Overrides
    custom_max_tenants: number | null;
    custom_max_outlets: number | null;
    custom_max_users: number | null;
    custom_max_devices: number | null;

    // Lifecycle
    status: "active" | "trial" | "expired" | "cancelled";
    start_date: string;
    end_date: string | null;
    auto_renew: boolean;

    // Audit
    created_on: string;
    updated_on: string;

    // Relations
    business_owner?: BusinessOwner;
    plan?: Plan;
}

/* =========================
   CREATE PAYLOAD
========================= */

export interface CreateBusinessOwnerPayload {
    // 🏢 Business Info
    name: string;
    slug?: string;
    legal_name?: string;

    business_type?: "retail" | "fnb" | "both";

    tax_id?: string;
    registration_number?: string;

    // 📞 Contact
    contact_name?: string;
    email?: string;
    phone?: string;
    website?: string;

    // 🌍 Location
    country: string;
    country_code: string;

    state?: string;
    city?: string;
    address?: string;
    postal_code?: string;

    currency?: string;
    timezone?: string;

    // 🏷 Branding
    logo_url?: string;

    // 📊 Status
    status?: "Active" | "Inactive" | "Suspended";
    onboarding_complete?: boolean;

    // 💳 Subscriptions (IMPORTANT: ALWAYS ARRAY)
    subscriptions: SubscriptionPayload[];

    // 👥 Multi-Owner Support
    owners?: OwnerPayload[];
}

/* =========================
   OWNER PAYLOAD
========================= */

export interface OwnerPayload {
    name: string;
    email: string;
    phone?: string;
    role?: string;
    is_primary?: boolean;
}

/* =========================
   SUBSCRIPTION PAYLOAD
========================= */

export interface SubscriptionPayload {
    plan_id: number;
    quantity: number;

    // Enterprise Custom Overrides
    custom_max_tenants?: number;
    custom_max_outlets?: number;
    custom_max_users?: number;
    custom_max_devices?: number;

    // Lifecycle
    status?: "active" | "trial" | "expired" | "cancelled";
    start_date?: string;
    end_date?: string;
    auto_renew?: boolean;
}