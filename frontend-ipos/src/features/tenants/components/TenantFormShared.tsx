import React from "react";
import FormInput from "../../../shared/components/ui/FormInput";
import FormSelect from "../../../shared/components/ui/FormSelect";
import { Card } from "../../../shared/components/ui/card";
import PlanCard from "./PlanCard";
import { Button } from "../../../shared/components/ui/Button";

interface SectionProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const BusinessInfoSection: React.FC<SectionProps> = ({ form, handleChange }) => (
  <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold text-app-text">Company Information</h2>
    <p className="text-sm text-gray-400 mb-4">Core details about the company</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormInput id="businessName" name="businessName" label="Company Name" value={form.businessName} placeholder="Company Name" onChange={handleChange} />
      <FormInput id="legalName" name="legalName" label="Legal Name" placeholder="Legal Name" value={form.legalName} onChange={handleChange} />
      <FormSelect id="businessType" name="businessType" label="Business Type" options={["Retail", "F&B"]} value={form.businessType} onChange={handleChange} />
      <FormInput id="registrationNumber" name="registrationNumber" label="Registration Number" value={form.registrationNumber} onChange={handleChange} />
      <FormInput id="taxId" name="taxId" label="Tax ID (ABN / GST)" value={form.taxId} placeholder="No 123456789" onChange={handleChange} />
    </div>
  </Card>
);

export const ContactDetailsSection: React.FC<SectionProps> = ({ form, handleChange }) => (
  <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold text-app-text">Contact Details</h2>
    <p className="text-sm text-gray-400 mb-4">Primary contact information for the tenant</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormInput id="contactName" name="contactName" label="Contact Name" value={form.contactName} placeholder="Contact Name" onChange={handleChange} />
      <FormInput id="email" name="email" label="Email" value={form.email} placeholder="email@example.com" onChange={handleChange} />
      <FormInput id="phone" name="phone" label="Phone" value={form.phone} placeholder="Phone" onChange={handleChange} />
      <FormInput id="website" name="website" label="Website" value={form.website} placeholder="https://example.com" onChange={handleChange} />
    </div>
  </Card>
);

export const LocationSection: React.FC<SectionProps> = ({ form, handleChange }) => (
  <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold text-app-text">Location</h2>
    <p className="text-sm text-gray-400 mb-4">Business address and geographical information</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormInput id="country" name="country" label="Country" value={form.country} placeholder="Country" onChange={handleChange} />
      <FormInput id="state" name="state" label="State" value={form.state} placeholder="State" onChange={handleChange} />
      <FormInput id="city" name="city" label="City" value={form.city} placeholder="City" onChange={handleChange} />
      <FormInput id="postalCode" name="postalCode" label="Postal Code" value={form.postalCode} placeholder="Postal Code" onChange={handleChange} />
      <FormInput id="address" name="address" label="Address" value={form.address} placeholder="Address" onChange={handleChange} />
    </div>
  </Card>
);

interface PlanSectionProps {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export const PlanBillingSection: React.FC<PlanSectionProps> = ({ form, setForm }) => (
  <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="mb-4">
      <h2 className="font-semibold text-lg text-app-text">Plans & Billing</h2>
      <p className="text-[13px] text-gray-400">Choose a License plan for this tenant</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <PlanCard
        name="Standard"
        price="$49/mo"
        features={[
          "Up to 3 outlets",
          "10 devices per outlet",
          "Basic analytics",
          "Email support",
          "Standard integrations"
        ]}
        selected={form.plan === "Standard"}
        onClick={() => setForm({ ...form, plan: "Standard" })}
      />
      <PlanCard
        name="Premium"
        price="$99/mo"
        features={[
          "Up to 10 outlets",
          "Unlimited devices",
          "Advanced analytics",
          "Priority support",
          "All integrations",
          "Custom branding"
        ]}
        selected={form.plan === "Premium"}
        onClick={() => setForm({ ...form, plan: "Premium" })}
      />
      <PlanCard
        name="Enterprise"
        price="Custom"
        features={[
          "Unlimited outlets",
          "Dedicated manager",
          "Dedicated account manager",
          "24/7 Phone support",
          "Custom integrations",
          "SLA guarantee",
          "On-premise option"
        ]}
        selected={form.plan === "Enterprise"}
        onClick={() => setForm({ ...form, plan: "Enterprise" })}
      />
    </div>

    {/* BILLING TOGGLE */}
    <div className="mt-6 flex items-center gap-3">
      <span className="text-sm text-gray-600">Billing Cycle:</span>
      <Button
        type="button"
        variant={form.billingCycle === "Monthly" ? "default" : "outline"}
        onClick={() => setForm({ ...form, billingCycle: "Monthly" })}
        className={`px-4 py-1.5 h-auto rounded-lg text-sm ${form.billingCycle === "Monthly"
          ? "bg-primary text-white"
          : "bg-gray-100 border-none"
          }`}
      >
        Monthly
      </Button>
      <Button
        type="button"
        variant={form.billingCycle === "Yearly" ? "default" : "outline"}
        onClick={() => setForm({ ...form, billingCycle: "Yearly" })}
        className={`px-4 py-1.5 h-auto rounded-lg text-sm ${form.billingCycle === "Yearly"
          ? "bg-primary text-white"
          : "bg-gray-100 border-none"
          }`}
      >
        Yearly
      </Button>
    </div>
  </Card>
);
