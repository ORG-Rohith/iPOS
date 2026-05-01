import type { CreateTenantPayload } from "../types/tenant.types";
import { Button } from "../../../shared/components/ui/Button";
import { useState } from "react";
import { BusinessInfoSection, ContactDetailsSection, LocationSection, PlanBillingSection } from "./TenantFormShared";
import { useNavigate } from "react-router-dom";

interface Props {
    onSubmit: (data: CreateTenantPayload) => void;
}

const CreateTenantForm: React.FC<Props> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState<CreateTenantPayload>({
        businessName: "",
        legalName: "",
        businessType: undefined,
        registrationNumber: "",
        taxId: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        country_code: "",
        state: "",
        city: "",
        address: "",
        postalCode: "",
        plan: "Standard",
        billingCycle: "Monthly",
        currency: "",
        timezone: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

            {/* 🔥 ACTION */}
            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="px-4 py-2 border rounded-lg"
                    onClick={() => navigate("/tenants")}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                    Create Tenant
                </Button>
            </div>
        </form>
    );
};

export default CreateTenantForm;