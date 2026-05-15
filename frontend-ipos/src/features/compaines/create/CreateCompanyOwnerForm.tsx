import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { CreateBusinessOwnerPayload } from "../types/CompanyOwers.types";

import { BusinessInfoSection } from "../../tenants/components/TenantFormShared";

import { Button } from "../../../shared/components/ui/Button";

import BusinessOwnerInfoSection from "../components/CompanyOwnerInfoSection";
import SubscriptionSection from "../components/LicencesSection";
import OwnersSection from "../components/OwnersSection";
import AddressSection from "../components/AddressSection";

interface Props {
    onSubmit: (data: CreateBusinessOwnerPayload) => void;
    loading: boolean;
}

const CreateCompanyOwnerForm: React.FC<Props> = ({
    onSubmit,
    loading,
}) => {
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateBusinessOwnerPayload>({
        name: "",
        slug: "",
        legal_name: "",
        business_type: "retail",

        tax_id: "",
        registration_number: "",

        contact_name: "",
        email: "",
        phone: "",
        website: "",

        country: "",
        country_code: "",

        state: "",
        city: "",
        address: "",
        postal_code: "",

        currency: "",
        timezone: "",

        logo_url: "",

        status: "Active",
        onboarding_complete: false,

        subscriptions: [],
        owners: [],
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
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
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <BusinessInfoSection
                form={form}
                handleChange={handleChange}
            />

            <BusinessOwnerInfoSection
                form={form}
                handleChange={handleChange}
            />

            <OwnersSection
                form={form}
                setForm={setForm}
            />

            <AddressSection
                form={form}
                handleChange={handleChange}
            />

            <SubscriptionSection
                form={form}
                setForm={setForm}
            />

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="px-4 py-2 border rounded-lg"
                    onClick={() =>
                        navigate("/businessOwners")
                    }
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                    {loading
                        ? "Creating..."
                        : "Create Business Owner"}
                </Button>
            </div>
        </form>
    );
};

export default CreateCompanyOwnerForm;