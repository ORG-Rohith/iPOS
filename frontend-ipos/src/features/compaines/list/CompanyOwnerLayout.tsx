import Sidebar from "../../../shared/layouts/Sidebar";
import Topbar from "../../../shared/layouts/Topbar";


interface BusinessOwnerLayoutProps {
    children: React.ReactNode;
    title: string;
}

const BusinessOwnerLayout: React.FC<BusinessOwnerLayoutProps> = ({ children, title }) => {
    return (
        <div className="flex min-h-screen bg-app-bg">
            <Sidebar />
            <div className="ml-[240px] flex-1 flex flex-col">
                <Topbar title={title} variant="companies" />
                <main className="p-7 flex-1">{children}</main>
            </div>
        </div>
    );
};

export default BusinessOwnerLayout;