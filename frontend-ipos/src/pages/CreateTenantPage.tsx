import Breadcrumbs from "../components/ui/Breadcrumbs";
import CreateTenantForm from "../features/auth/components/CreateTenantForm";
import { useCreateTenant } from "../hooks/useCreateTenant";
import CreateTenantLayout from "../layout/CreateTenantLayout";

export const CreateTenantPage: React.FC = () => {
    const { createTenant } = useCreateTenant();
    const breadcrumbItems = [
        { label: "Home", path: "/dashboard" },
        { label: "Tenants", path: "/tenants" },
        { label: "Create Tenant" },
    ];


    return (

        <CreateTenantLayout title="Create Tenant">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="p-7">
                    <CreateTenantForm onSubmit={createTenant} />
                </div>
            </div>

        </CreateTenantLayout>
    );
};
