import Sidebar from "../../../shared/layouts/Sidebar";
import Topbar from "../../../shared/layouts/Topbar";


interface TenantsLayoutProps {
  children: React.ReactNode;
  title: string;
}

const TenantsLayout: React.FC<TenantsLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-app-bg">
      <Sidebar />
      <div className="ml-[240px] flex-1 flex flex-col">
        <Topbar title={title} variant="tenants" />
        <main className="p-7 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default TenantsLayout;