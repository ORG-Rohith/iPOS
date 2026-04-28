import React, { useState } from "react";
import type { CreateTenantPayload } from "../types/tenant.types";
import FormInput from "../../../shared/components/ui/FormInput";
import FormSelect from "../../../shared/components/ui/FormSelect";
import PlanCard from "./PlanCard";
import StatusManagement from "./StatusManagement";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";

interface Props {
  initialData: CreateTenantPayload & { status: string };
  onSubmit: (data: any) => void;
}

const EditTenantForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    ...initialData,
    statusReason: "",
    statusEffectiveDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 🔥 BUSINESS */}
      <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Business Information</h2>
        <p className="text-sm text-gray-400 mb-4">Core details about the tenant's business entity</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            id="businessName"
            name="businessName"
            label="Business Name"
            value={form.businessName}
            placeholder="Business Name"
            onChange={handleChange}
          />

          <FormInput
            id="legalName"
            name="legalName"
            label="Legal Name"
            placeholder="Legal Name"
            value={form.legalName}
            onChange={handleChange}
          />

          <FormSelect
            id="businessType"
            name="businessType"
            label="Business Type"
            options={["Retail", "F&B"]}
            value={form.businessType}
            onChange={handleChange}
          />

          <FormInput
            id="registrationNumber"
            name="registrationNumber"
            label="Registration Number"
            value={form.registrationNumber}
            onChange={handleChange}
          />

          <FormInput
            id="taxId"
            name="taxId"
            label="Tax ID (ABN / GST)"
            value={form.taxId}
            placeholder="No 123456789"
            onChange={handleChange}
          />
        </div>
      </Card>

      {/* 🔥 CONTACT */}
      <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Contact Details</h2>
        <p className="text-sm text-gray-400 mb-4">Primary contact information for the tenant</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            id="contactName"
            name="contactName"
            label="Contact Name"
            value={form.contactName}
            placeholder="Contact Name"
            onChange={handleChange}
          />

          <FormInput
            id="email"
            name="email"
            label="Email"
            value={form.email}
            placeholder="email@example.com"
            onChange={handleChange}
          />

          <FormInput
            id="phone"
            name="phone"
            label="Phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
          />

          <FormInput
            id="website"
            name="website"
            label="Website"
            value={form.website}
            placeholder="https://example.com"
            onChange={handleChange}
          />
        </div>
      </Card>

      {/* 🔥 LOCATION */}
      <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Location</h2>
        <p className="text-sm text-gray-400 mb-4">Business address and geographical information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            id="country"
            name="country"
            label="Country"
            value={form.country}
            placeholder="Country"
            onChange={handleChange}
          />

          <FormInput
            id="state"
            name="state"
            label="State"
            value={form.state}
            placeholder="State"
            onChange={handleChange}
          />

          <FormInput
            id="city"
            name="city"
            label="City"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
          />

          <FormInput
            id="postalCode"
            name="postalCode"
            label="Postal Code"
            value={form.postalCode}
            placeholder="Postal Code"
            onChange={handleChange}
          />

          <FormInput
            id="address"
            name="address"
            label="Address"
            value={form.address}
            placeholder="Address"
            onChange={handleChange}
          />
        </div>
      </Card>

      {/* 🔥 PLAN & BILLING */}
      <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-[#1a1a2e]">Plan & Billing</h2>
          <p className="text-[13px] text-gray-400">Manage subscription plan for this tenant</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PlanCard
            name="Standard"
            price="$49/mo"
            features={["Up to 3 outlets", "10 devices per outlet", "Basic analytics"]}
            selected={form.plan === "Standard"}
            onClick={() => setForm({ ...form, plan: "Standard" })}
          />
          <PlanCard
            name="Premium"
            price="$99/mo"
            features={["Up to 10 outlets", "Unlimited devices", "Advanced analytics"]}
            selected={form.plan === "Premium"}
            onClick={() => setForm({ ...form, plan: "Premium" })}
          />
          <PlanCard
            name="Enterprise"
            price="Custom"
            features={["Unlimited outlets", "Dedicated manager", "24/7 Phone support"]}
            selected={form.plan === "Enterprise"}
            onClick={() => setForm({ ...form, plan: "Enterprise" })}
          />
        </div>
      </Card>

      {/* 🔥 STATUS MANAGEMENT (Edit Only) */}
      <StatusManagement
        currentStatus={form.status}
        onStatusChange={(status) => setForm({ ...form, status })}
        reason={form.statusReason}
        onReasonChange={(reason) => setForm({ ...form, statusReason: reason })}
        effectiveDate={form.statusEffectiveDate}
        onDateChange={(date) => setForm({ ...form, statusEffectiveDate: date })}
      />

      {/* 🔥 ACTIONS */}
      <div className="flex justify-end gap-3 mt-8">
        <Button 
          type="button" 
          variant="outline"
          className="px-6 py-2.5 h-auto border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="px-8 py-2.5 h-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-bold shadow-md shadow-pink-100 hover:from-pink-600 hover:to-rose-600 transition-all border-none"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditTenantForm;
