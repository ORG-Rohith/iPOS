import TenantDetailsLayout from "../layout/TenantDetailsLayout";

export const TenantDetailsPage: React.FC = () => {
    return (
        <TenantDetailsLayout title="Tenant Details">
            <div className="p-7">
                <h1>Tenant Details</h1>
            </div>
        </TenantDetailsLayout>
    );
};

export default TenantDetailsPage;