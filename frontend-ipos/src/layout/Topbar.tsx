import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

interface TopbarProps {
  title?: string;
  subtitle?: string;
  variant?: "dashboard" | "tenants" | "createTenant" | "tenantDetails" | "outlets" | "outletsDetails";
}

const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 🔥 LEFT CONTENT
  const renderLeftContent = () => {
    switch (variant) {
      case "dashboard":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Dashboard
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              {currentDate} — All Outlets
            </p>
          </>
        );

      case "tenants":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Tenants
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Super Admin — all tenants across the platform
            </p>
          </>
        );

      case "outlets":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Outlet Management
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Manage your business locations and devices
            </p>
          </>
        );

      case "createTenant":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Create Tenant
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Register a new tenant on the platform
            </p>
          </>
        );

      case "tenantDetails":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Tenant Details
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Tenant details
            </p>
          </>
        );
      case "outletsDetails":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Outlet Details
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Outlet details
            </p>
          </>
        );

      default:
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              {title}
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              {subtitle || `${currentDate} — All Outlets`}
            </p>
          </>
        );
    }
  };

  // 🔥 RIGHT CONTENT
  const renderRightContent = () => {
    switch (variant) {
      case "dashboard":
        return (
          <>
            <select className="px-3.5 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 bg-gray-50">
              <option>All Outlets</option>
              <option>Sydney CBD</option>
              <option>Melbourne Central</option>
              <option>Mumbai Main</option>
            </select>

            <Button
              className="px-[18px] py-2 h-auto bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90 border-none"
            >
              + New Sale
            </Button>
          </>
        );

      case "tenants":
        return (
          <Button
            onClick={() => navigate("/tenants/create")}
            className="px-[18px] py-2 h-auto bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90 border-none"
          >
            + Add Tenant
          </Button>
        );
      case "outlets":
        return (
          <Button
            onClick={() => navigate("/outlets/create")}
            className="px-[18px] py-2 h-auto bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90 border-none"
          >
            + Add New Outlet
          </Button>
        );


      case "createTenant":
        return (
          <Button
            variant="outline"
            onClick={() => navigate("/tenants")}
            className="px-[18px] py-2 h-auto border border-gray-300 rounded-lg text-[13px] font-semibold hover:bg-gray-100"
          >
            ← Back to Tenants
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white px-7 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">

      {/* ✅ LEFT SIDE */}
      <div className="flex flex-col min-w-0">
        {renderLeftContent()}
      </div>

      {/* ✅ RIGHT SIDE */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {renderRightContent()}
      </div>
    </div>
  );
};

export default Topbar;
