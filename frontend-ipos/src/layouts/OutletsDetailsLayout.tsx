import Topbar from "./Topbar";

interface OutletsDetailsLayoutProps {
    children: React.ReactNode;
    title: string;
}

const OutletsDetailsLayout: React.FC<OutletsDetailsLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-app-bg flex flex-col">
            <Topbar title="Outlet Details" variant="outletsDetails" />
            <main className="p-7 flex-1">{children}</main>
        </div>
    );
};

export default OutletsDetailsLayout;