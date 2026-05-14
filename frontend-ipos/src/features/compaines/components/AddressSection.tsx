import React from "react";
import FormInput from "../../../shared/components/ui/FormInput";
import FormSelect from "../../../shared/components/ui/FormSelect";
import { Card } from "../../../shared/components/ui/card";
import type { CreateBusinessOwnerPayload } from "../types/CompanyOwers.types";

interface Props {
    form: CreateBusinessOwnerPayload;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

const AddressSection: React.FC<Props> = ({ form, handleChange }) => {
    return (
        <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-app-text">
                Address & Location
            </h2>

            <p className="text-sm text-gray-400 mb-4">
                Business address and regional settings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ADDRESS - Full width */}
                <div className="md:col-span-2">
                    <FormInput
                        id="address"
                        name="address"
                        label="Street Address"
                        placeholder="123 Business Park, Suite 456"
                        value={form.address || ""}
                        onChange={handleChange}
                    />
                </div>

                <FormInput
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Mumbai"
                    value={form.city || ""}
                    onChange={handleChange}
                />

                <FormInput
                    id="state"
                    name="state"
                    label="State / Province"
                    placeholder="Maharashtra"
                    value={form.state || ""}
                    onChange={handleChange}
                />

                <FormInput
                    id="postal_code"
                    name="postal_code"
                    label="Postal Code"
                    placeholder="400001"
                    value={form.postal_code || ""}
                    onChange={handleChange}
                />

                <FormInput
                    id="country"
                    name="country"
                    label="Country"
                    placeholder="India"
                    value={form.country || ""}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    id="country_code"
                    name="country_code"
                    label="Country Code"
                    placeholder="IN"
                    value={form.country_code || ""}
                    onChange={handleChange}
                    required
                />

                <FormSelect
                    id="currency"
                    name="currency"
                    label="Currency"
                    options={[
                        { label: "INR (₹)", value: "INR" },
                        { label: "USD ($)", value: "USD" },
                        { label: "EUR (€)", value: "EUR" },
                        { label: "GBP (£)", value: "GBP" },
                        { label: "AUD (A$)", value: "AUD" },
                        { label: "SGD (S$)", value: "SGD" },
                        { label: "AED (د.إ)", value: "AED" },
                    ]}
                    value={form.currency || ""}
                    onChange={handleChange}
                />

                <FormSelect
                    id="timezone"
                    name="timezone"
                    label="Timezone"
                    options={[
                        { label: "Asia/Kolkata (IST)", value: "Asia/Kolkata" },
                        { label: "America/New_York (EST)", value: "America/New_York" },
                        { label: "America/Los_Angeles (PST)", value: "America/Los_Angeles" },
                        { label: "Europe/London (GMT)", value: "Europe/London" },
                        { label: "Europe/Berlin (CET)", value: "Europe/Berlin" },
                        { label: "Asia/Dubai (GST)", value: "Asia/Dubai" },
                        { label: "Asia/Singapore (SGT)", value: "Asia/Singapore" },
                        { label: "Australia/Sydney (AEST)", value: "Australia/Sydney" },
                    ]}
                    value={form.timezone || ""}
                    onChange={handleChange}
                />
            </div>
        </Card>
    );
};

export default AddressSection;
