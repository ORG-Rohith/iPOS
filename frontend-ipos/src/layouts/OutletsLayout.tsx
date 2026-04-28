import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface OutletsLayoutProps {
    children: React.ReactNode;
    title: string;
}

const OutletsLayout: React.FC<OutletsLayoutProps> = ({ children, title }) => {

    return (
        <div className="flex min-h-screen bg-[#f4f6fb]">
            <Sidebar />
            <div className="ml-[240px] flex-1 flex flex-col">
                <Topbar title={title} variant="outlets" />
                <main className="p-7 flex-1">{children}</main>
            </div>
        </div>

    );

};

export default OutletsLayout;
