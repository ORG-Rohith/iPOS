import Topbar from "./Topbar";

interface TenantsLayoutProps {
    children: React.ReactNode;
    title: string;
}

const CreateTenantLayout: React.FC<TenantsLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#f4f6fb] flex flex-col">
            <Topbar title="Create Tenant" variant="createTenant" />
            <main className="p-7 flex-1">{children}</main>
        </div>
    );
};

export default CreateTenantLayout;