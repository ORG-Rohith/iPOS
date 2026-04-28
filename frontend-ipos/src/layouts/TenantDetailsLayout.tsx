import Topbar from "./Topbar";

interface TenantsLayoutProps {
    children: React.ReactNode;
    title: string;
}

const TenantDetailsLayout: React.FC<TenantsLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-app-bg flex flex-col">
            <Topbar title="Tenant Details" variant="tenantDetails" />
            <main className="p-7 flex-1">{children}</main>
        </div>
    );
};

export default TenantDetailsLayout;