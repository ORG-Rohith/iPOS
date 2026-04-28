import React, { useState } from "react";
import type { CreateTenantPayload } from "../types/tenant.types";
import StatusManagement from "./StatusManagement";
import { Button } from "../../../shared/components/ui/Button";
import { BusinessInfoSection, ContactDetailsSection, LocationSection, PlanBillingSection } from "./TenantFormShared";

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
      <BusinessInfoSection form={form} handleChange={handleChange} />

      {/* 🔥 CONTACT */}
      <ContactDetailsSection form={form} handleChange={handleChange} />

      {/* 🔥 LOCATION */}
      <LocationSection form={form} handleChange={handleChange} />

      {/* 🔥 PLAN & BILLING */}
      <PlanBillingSection form={form} setForm={setForm} />

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
