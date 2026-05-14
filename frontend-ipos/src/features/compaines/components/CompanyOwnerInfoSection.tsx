// components/BusinessOwnerInfoSection.tsx

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

const BusinessOwnerInfoSection: React.FC<Props> = ({
    form,
    handleChange,
}) => {
    return (
        <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-app-text">
                Company Owner Information
            </h2>

            <p className="text-sm text-gray-400 mb-4">
                Core details about the company owner
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                    id="name"
                    name="name"
                    label="Full Name"
                    value={form.name}
                    placeholder="John Doe"
                    onChange={handleChange}
                    required
                />

                <FormInput
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    placeholder="john@example.com"
                    onChange={handleChange}
                    required
                />

                <FormInput
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    value={form.phone || ""}
                    placeholder="+91 9876543210"
                    onChange={handleChange}
                />

                <FormSelect
                    id="status"
                    name="status"
                    label="Status"
                    options={["Active", "Inactive", "Suspended"]}
                    value={form.status}
                    onChange={handleChange}
                />
            </div>
        </Card>
    );
};

export default BusinessOwnerInfoSection;