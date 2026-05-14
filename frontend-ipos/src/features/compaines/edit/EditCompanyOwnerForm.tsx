import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateBusinessOwnerPayload } from "../types/CompanyOwers.types";
import { BusinessInfoSection } from "../../tenants/components/TenantFormShared";
import { Button } from "../../../shared/components/ui/Button";
import BusinessOwnerInfoSection from "../components/CompanyOwnerInfoSection";
import SubscriptionSection from "../components/LicencesSection";

interface Props {
    initialData: CreateBusinessOwnerPayload;
    onSubmit: (data: CreateBusinessOwnerPayload) => void;
    loading: boolean;
}

const EditBusinessOwnerForm: React.FC<Props> = ({
    initialData,
    onSubmit,
    loading,
}) => {
    const navigate = useNavigate();
    const [form, setForm] = useState<CreateBusinessOwnerPayload>(initialData);

    useEffect(() => {
        setForm(initialData);
    }, [initialData]);

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
            <BusinessInfoSection
                form={form}
                handleChange={handleChange}
            />

            <BusinessOwnerInfoSection
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
                    onClick={() => navigate("/businessOwners")}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                    {loading ? "Updating..." : "Update Business Owner"}
                </Button>
            </div>
        </form>
    );
};

export default EditBusinessOwnerForm;
