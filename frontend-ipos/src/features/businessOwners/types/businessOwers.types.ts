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
}

/* =========================
   PLAN
========================= */

export interface Plan {
    id: number;
    uuid: string;

    name: "Standard" | "Plus" | "Pro" | "Enterprise";
    code: string;
    description: string | null;

    monthly_price: number;
    yearly_price: number;
    currency: string;

    max_tenants: number | null;
    max_outlets: number | null;
    max_users: number | null;
    max_devices: number | null;

    features?: Record<string, any>;
    is_active: boolean;

    created_on: string;
    updated_on: string;
}

/* =========================
   SUBSCRIPTION
========================= */

export interface Subscription {
    id: number;
    uuid: string;

    business_owner_id: number;
    plan_id: number;

    quantity: number;

    billing_cycle: "monthly" | "yearly";

    amount: number;
    currency: string;

    start_date: string;
    end_date: string | null;
    renewal_date: string | null;

    status: "active" | "expired" | "cancelled" | "trial";

    auto_renew: boolean;

    payment_status: "paid" | "pending" | "failed";

    created_on: string;
    updated_on: string;

    business_owner?: BusinessOwner;
    plan?: Plan;
}

/* =========================
   CREATE PAYLOAD (IMPORTANT FIX)
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
}

/* =========================
   SUBSCRIPTION PAYLOAD
========================= */

export interface SubscriptionPayload {
    plan_id: number;
    quantity: number;
}