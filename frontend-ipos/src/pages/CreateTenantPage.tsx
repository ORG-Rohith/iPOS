import Breadcrumbs from "../components/ui/Breadcrumbs";
import CreateTenantForm from "../features/auth/components/CreateTenantForm";
import { useCreateTenant } from "../hooks/useCreateTenant";
import CreateTenantLayout from "../layout/CreateTenantLayout";

export const CreateTenantPage: React.FC = () => {
    const { createTenant, loading, error } = useCreateTenant();
    const breadcrumbItems = [
        { label: "Home", path: "/dashboard" },
        { label: "Tenants", path: "/tenants" },
        { label: "Create Tenant" },
    ];


    return (

        <CreateTenantLayout title="Create Tenant">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />

                {error && (
                    <div className="mx-7 mt-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                        <span className="text-xl">⚠️</span>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="p-7">
                    <div className={loading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
                        <CreateTenantForm onSubmit={createTenant} />
                    </div>
                    {loading && (
                        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        </div>
                    )}
                </div>
            </div>

        </CreateTenantLayout>
    );
};
