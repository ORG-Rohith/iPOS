import React from "react";
import FormInput from "../../../shared/components/ui/FormInput";
import FormSelect from "../../../shared/components/ui/FormSelect";
import { Card } from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/Button";
import type { CreateBusinessOwnerPayload, OwnerPayload } from "../types/CompanyOwers.types";

interface Props {
    form: CreateBusinessOwnerPayload;
    setForm: React.Dispatch<React.SetStateAction<CreateBusinessOwnerPayload>>;
}

const OwnersSection: React.FC<Props> = ({ form, setForm }) => {
    const owners = form.owners ?? [];

    // =========================================
    // ADD OWNER
    // =========================================
    const handleAddOwner = () => {
        setForm((prev) => ({
            ...prev,
            owners: [
                ...(prev.owners ?? []),
                {
                    name: "",
                    email: "",
                    phone: "",
                    role: "Owner",
                    is_primary: (prev.owners ?? []).length === 0,
                },
            ],
        }));
    };

    // =========================================
    // REMOVE OWNER
    // =========================================
    const handleRemoveOwner = (index: number) => {
        setForm((prev) => {
            const updated = [...(prev.owners ?? [])];
            const wasPrimary = updated[index]?.is_primary;
            updated.splice(index, 1);

            // If removed owner was primary, make the first one primary
            if (wasPrimary && updated.length > 0) {
                updated[0].is_primary = true;
            }

            return { ...prev, owners: updated };
        });
    };

    // =========================================
    // UPDATE OWNER FIELD
    // =========================================
    const handleOwnerChange = (
        index: number,
        field: keyof OwnerPayload,
        value: string | boolean
    ) => {
        setForm((prev) => {
            const updated = [...(prev.owners ?? [])];

            if (field === "is_primary" && value === true) {
                // Only one owner can be primary
                updated.forEach((o, i) => {
                    o.is_primary = i === index;
                });
            } else {
                updated[index] = {
                    ...updated[index],
                    [field]: value,
                };
            }

            return { ...prev, owners: updated };
        });
    };

    return (
        <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-app-text">
                        Company Owners
                    </h2>
                    <p className="text-sm text-gray-400">
                        Add multiple owners or directors for this company
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddOwner}
                >
                    + Add Owner
                </Button>
            </div>

            {/* BODY */}
            <div className="space-y-4">
                {owners.length === 0 && (
                    <div className="border border-dashed border-gray-200 rounded-lg py-8 text-center text-sm text-gray-500">
                        No owners added yet. Click "+ Add Owner" to get started.
                    </div>
                )}

                {owners.map((owner, index) => (
                    <div
                        key={index}
                        className={`relative p-5 rounded-xl border space-y-4 transition-all ${owner.is_primary
                                ? "bg-blue-50/50 border-blue-200 shadow-sm"
                                : "bg-gray-50 border-gray-100"
                            }`}
                    >
                        {/* PRIMARY BADGE */}
                        {owner.is_primary && (
                            <div className="absolute -top-2.5 left-4">
                                <span className="text-[11px] font-semibold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">
                                    Primary Owner
                                </span>
                            </div>
                        )}

                        {/* ROW 1: Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            <FormInput
                                id={`owner-name-${index}`}
                                name={`owner-name-${index}`}
                                label="Full Name"
                                placeholder="John Doe"
                                value={owner.name}
                                onChange={(e) =>
                                    handleOwnerChange(index, "name", e.target.value)
                                }
                                required
                            />

                            <FormInput
                                id={`owner-email-${index}`}
                                name={`owner-email-${index}`}
                                label="Email Address"
                                type="email"
                                placeholder="john@example.com"
                                value={owner.email}
                                onChange={(e) =>
                                    handleOwnerChange(index, "email", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* ROW 2: Phone + Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                id={`owner-phone-${index}`}
                                name={`owner-phone-${index}`}
                                label="Phone Number"
                                placeholder="+91 9876543210"
                                value={owner.phone || ""}
                                onChange={(e) =>
                                    handleOwnerChange(index, "phone", e.target.value)
                                }
                            />

                            <FormSelect
                                id={`owner-role-${index}`}
                                name={`owner-role-${index}`}
                                label="Role"
                                options={[
                                    "Owner",
                                    "Co-Owner",
                                    "Director",
                                    "Managing Partner",
                                    "CEO",
                                    "CFO",
                                    "CTO",
                                    "Other",
                                ]}
                                value={owner.role || "Owner"}
                                onChange={(e) =>
                                    handleOwnerChange(index, "role", e.target.value)
                                }
                            />
                        </div>

                        {/* ACTIONS ROW */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                            {/* Primary Toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="primary-owner"
                                    checked={owner.is_primary ?? false}
                                    onChange={() =>
                                        handleOwnerChange(index, "is_primary", true)
                                    }
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">
                                    Set as Primary
                                </span>
                            </label>

                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm"
                                onClick={() => handleRemoveOwner(index)}
                            >
                                Remove Owner
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default OwnersSection;
