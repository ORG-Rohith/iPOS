import React, { useState, useEffect } from "react";
import FormInput from "../../../shared/components/ui/FormInput";
import FormSelect from "../../../shared/components/ui/FormSelect";
import { Button } from "../../../shared/components/ui/Button";
import type { Outlet, WeeklyOperatingHours, OperatingHours } from "../types/outlet.types";
import { Card } from "../../../shared/components/ui/card";
import { Label } from "../../../shared/components/ui/label";
import { Switch } from "../../../shared/components/ui/switch";
import { Textarea } from "../../../shared/components/ui/textarea";

interface OutletFormProps {
  initialData?: Partial<Outlet>;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  mode: "create" | "edit";
  tenantOptions: { label: string; value: number }[];
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

const defaultOperatingHours: WeeklyOperatingHours = {
  monday: { open: "09:00", close: "18:00", isClosed: false },
  tuesday: { open: "09:00", close: "18:00", isClosed: false },
  wednesday: { open: "09:00", close: "18:00", isClosed: false },
  thursday: { open: "09:00", close: "18:00", isClosed: false },
  friday: { open: "09:00", close: "21:00", isClosed: false },
  saturday: { open: "10:00", close: "17:00", isClosed: false },
  sunday: { open: "00:00", close: "00:00", isClosed: true },
};

const OutletForm: React.FC<OutletFormProps> = ({ initialData, onSubmit, isLoading, mode, tenantOptions }) => {



  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    name: "",
    type: "Retail",
    description: "",
    address_line1: "",
    tenant_id: 1,
    city: "",
    state: "",
    country: "Australia",
    postal_code: "",
    timezone: "Australia/Melbourne",
    phone: "",
    email: "",
    manager_id: "",
    tax_rule: "GST 10% (Australia)",
    currency: "AUD — Australian Dollar",
    receipt_header: "",
    receipt_footer: "",
    number_of_registers: 1,
    operating_hours: defaultOperatingHours,
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev: any) => ({
        ...prev,
        ...initialData,
        operating_hours: initialData.operating_hours || defaultOperatingHours,
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleOperatingHoursChange = (day: keyof WeeklyOperatingHours, field: keyof OperatingHours, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      operating_hours: {
        ...prev.operating_hours,
        [day]: {
          ...prev.operating_hours[day],
          [field]: value,
        },
      },
    }));
  };

  const copyMondayHours = () => {
    const mondayHours = formData.operating_hours.monday;
    const newHours = { ...formData.operating_hours };
    DAYS.forEach((day) => {
      if (day !== "monday") {
        newHours[day] = { ...mondayHours };
      }
    });
    setFormData((prev: any) => ({ ...prev, operating_hours: newHours }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      onSubmit(formData);
    } else {
      nextStep();
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{mode === "edit" ? "Edit Outlet" : "Create Outlet"}</h1>
        <p className="text-sm text-gray-500">{mode === "edit" ? "Update outlet details and configuration" : "Fill in the details to create a new outlet"}</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === s ? "bg-[#e94560] text-white" : step > s ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {step > s ? "✓" : s}
            </div>
            <span className={`text-sm font-semibold ${step === s ? "text-gray-900" : "text-gray-400"}`}>
              {s === 1 ? "Basic Info" : s === 2 ? "Operations" : "Configuration"}
            </span>
            {s < 3 && <div className="w-12 h-[2px] bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            {/* Basic Information Section */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Basic Information</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">General details about this outlet</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Outlet Name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Melbourne CBD Store" />
                <FormSelect label="Outlet Type" name="type" value={formData.type} onChange={handleChange} options={[{ label: "Retail", value: "Retail" }, { label: "F&B", value: "F&B" }]} />

                <FormSelect
                  label="Tenant"
                  name="tenant_id"
                  value={formData.tenant_id}
                  onChange={handleChange}
                  options={tenantOptions}
                />
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <Label className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">Description</Label>
                  <Textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none transition-all focus:border-[#e94560] min-h-[100px]" placeholder="Tell us about this outlet..." />
                </div>
              </div>
            </Card>

            {/* Address Section */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Address</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Physical location of the outlet</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <FormInput label="Street Address" name="address_line1" value={formData.address_line1} onChange={handleChange} required placeholder="Shop 42, 211 La Trobe Street" />
                </div>
                <FormInput label="City" name="city" value={formData.city} onChange={handleChange} required placeholder="Melbourne" />
                <FormInput label="State / Region" name="state" value={formData.state} onChange={handleChange} required placeholder="VIC" />
                <FormInput label="Postal Code" name="postal_code" value={formData.postal_code} onChange={handleChange} required placeholder="3000" />
                <FormSelect label="Country" name="country" value={formData.country} onChange={handleChange} options={[{ label: "Australia", value: "Australia" }, { label: "India", value: "India" }]} />
                <div className="md:col-span-2">
                  <FormSelect label="Timezone" name="timezone" value={formData.timezone} onChange={handleChange} options={[{ label: "Australia/Melbourne", value: "Australia/Melbourne" }, { label: "Asia/Kolkata", value: "Asia/Kolkata" }]} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            {/* Operating Hours Section */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Operating Hours</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Set opening and closing times for each day</p>

              <div className="space-y-4">
                <div className="grid grid-cols-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">
                  <span>Day</span>
                  <span>Open Time</span>
                  <span>Close Time</span>
                  <span className="text-right">Closed</span>
                </div>
                {DAYS.map((day) => (
                  <div key={day} className="grid grid-cols-4 items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold text-gray-700 capitalize">{day}</span>
                    <input type="time" value={formData.operating_hours[day].open} onChange={(e) => handleOperatingHoursChange(day, "open", e.target.value)} disabled={formData.operating_hours[day].isClosed} className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-[#e94560] disabled:bg-gray-100 disabled:text-gray-400" />
                    <input type="time" value={formData.operating_hours[day].close} onChange={(e) => handleOperatingHoursChange(day, "close", e.target.value)} disabled={formData.operating_hours[day].isClosed} className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-[#e94560] disabled:bg-gray-100 disabled:text-gray-400" />
                    <div className="flex justify-end">
                      <Switch 
                        checked={formData.operating_hours[day].isClosed} 
                        onCheckedChange={(checked) => handleOperatingHoursChange(day, "isClosed", checked)} 
                      />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={copyMondayHours} className="mt-4 text-xs font-bold text-[#e94560] flex items-center gap-2 hover:underline">
                  📋 Copy Monday hours to all days
                </button>
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Contact</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Primary contact information for this outlet</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+61 3 9654 2100" />
                <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="melbourne.cbd@demoretail.com.au" />
                <div className="md:col-span-2">
                  <FormSelect label="Manager" name="manager_id" value={formData.manager_id} onChange={handleChange} options={[{ label: "James Ryan — Outlet Manager", value: "1" }]} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            {/* iPOS Configuration Section */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">iPOS Configuration</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Point of sale settings for this outlet</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect label="Default Tax Rule" name="tax_rule" value={formData.tax_rule} onChange={handleChange} options={[{ label: "GST 10% (Australia)", value: "GST 10% (Australia)" }]} />
                <FormSelect label="Currency" name="currency" value={formData.currency} onChange={handleChange} options={[{ label: "AUD — Australian Dollar", value: "AUD — Australian Dollar" }, { label: "INR — Indian Rupee", value: "INR — Indian Rupee" }]} />
                <div className="md:col-span-2">
                  <FormInput label="Receipt Header" name="receipt_header" value={formData.receipt_header} onChange={handleChange} placeholder="Melbourne CBD Store — Premium Electronics" />
                </div>
                <div className="md:col-span-2">
                  <FormInput label="Receipt Footer" name="receipt_footer" value={formData.receipt_footer} onChange={handleChange} placeholder="Thank you for shopping with us!" />
                </div>
                <div className="w-1/2">
                  <FormInput label="Number of Registers" name="number_of_registers" type="number" value={formData.number_of_registers} onChange={handleChange} min="1" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Button type="button" onClick={prevStep} disabled={step === 1 || isLoading} variant="outline" className={`px-8 py-3 h-auto rounded-xl font-bold text-sm transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "bg-white text-gray-500 border-2 border-gray-200 hover:bg-gray-50"}`}>
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => window.history.back()} className="px-8 py-3 h-auto rounded-xl font-bold text-sm bg-white text-gray-400 border-2 border-gray-100 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="px-8 py-3 h-auto rounded-xl font-bold text-sm bg-[#e94560] text-white shadow-lg shadow-pink-100 hover:bg-[#d63d54] border-none">
              {step === 3 ? (mode === "edit" ? "Save Changes" : "Create Outlet") : "Next Step"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OutletForm;
