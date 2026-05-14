import Topbar from "../../../shared/layouts/Topbar";

interface TenantsLayoutProps {
    children: React.ReactNode;
    title: string;
}

const CreateBusinessOwnerLayout: React.FC<TenantsLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-app-bg flex flex-col">
            <Topbar title="Create Tenant" variant="createTenant" />
            <main className="p-7 flex-1">{children}</main>
        </div>
    );
};

export default CreateBusinessOwnerLayout;