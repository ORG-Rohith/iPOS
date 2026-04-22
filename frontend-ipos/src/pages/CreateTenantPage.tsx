import CreateTenantForm from "../features/auth/components/CreateTenantForm";
import { useCreateTenant } from "../hooks/useCreateTenant";
import CreateTenantLayout from "../layout/CreateTenantLayout";

export const CreateTenantPage: React.FC = () => {
    const { createTenant } = useCreateTenant();


    return (
        <CreateTenantLayout title="Create Tenant">
            <div className="p-7">
                <CreateTenantForm onSubmit={createTenant} />
            </div>

        </CreateTenantLayout>
    );
};
