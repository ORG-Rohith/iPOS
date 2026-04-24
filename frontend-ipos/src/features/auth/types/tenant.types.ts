import type { IconType } from "react-icons";

// 🔹 Tenant Entity (matches backend)
export interface Tenant {
  id: number;
  uuid: string;

  // 🏢 Business Info
  name: string;
  slug: string | null;
  legal_name: string | null;
  business_type: "retail" | "fnb" | "both" | null;
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
  status: "active" | "inactive" | "suspended";
  onboarding_complete: boolean;

  // 💳 Subscription
  plan: string | null;
  billing_cycle: "Monthly" | "Yearly" | null;

  // ⚙️ Optional flexible data
  settings?: Record<string, any>;

  // 🕒 Audit
  created_on: string;
  updated_on: string;

  // 🔗 Relations
  outlets?: any[];
  devices?: any[];
}

// 🔹 Create / Form Payload (frontend → backend mapping)
export interface CreateTenantPayload {
  businessName: string;
  legalName?: string;
  businessType?: "retail" | "fnb" | "both";
  registrationNumber?: string;
  taxId?: string;

  contactName?: string;
  email?: string;
  phone?: string;

  country: string;
  country_code: string;
  state?: string;
  city?: string;
  website?: string;
  address?: string;
  postalCode?: string;

  plan?: string;
  billingCycle?: "Monthly" | "Yearly";

  currency?: string;
  timezone?: string;

  logoUrl?: string;
}

// 🔹 Stats Types (UI only)
export interface TenantStatsData {
  TenantStats: StatData[];
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