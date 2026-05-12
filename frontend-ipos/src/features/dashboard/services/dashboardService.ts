import { apiTenantService } from "../../auth/services/apiService";
import { FaFlask, FaStore, FaUser, FaUserCheck } from "react-icons/fa";
import type {
  DashboardData,
  SidebarData,
} from "../types/dashboard";
import type { TenantStatsData } from "../../tenants/types/tenant.types";

export const fetchSidebarData = async (): Promise<SidebarData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userStr = localStorage.getItem("user");
      let isTenantAdmin = false;
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const roleNames: string[] = user.roles ? user.roles.map((r: any) => r.roleName || "") : [];
          isTenantAdmin = roleNames.some(r => r.toLowerCase().includes("tenant admin"));
          const isSuperAdmin = roleNames.some(r => r.toLowerCase().includes("super admin") || r.toLowerCase().includes("platform admin") || r.toLowerCase().includes("support admin"));
          if (isSuperAdmin) isTenantAdmin = false; // Super admin sees everything
        } catch (e) { }
      }

      let managementItems = [
        { label: "Outlets", icon: "🏢", path: "/outlets" },
        { label: "Users", icon: "👥", path: "/users" },
        { label: "Roles", icon: "🛡️", path: "/roles" },
        { label: "Tenants", icon: "🌍", path: "/tenants" },
        { label: "BusinessOwners", icon: "🏬", path: "/businessOwners" },
        { label: "Devices", icon: "📱", path: "/devices" },
      ];

      if (isTenantAdmin) {
        managementItems = managementItems.filter(item => item.label !== "Tenants");
      }

      resolve({
        sections: [
          {
            label: "Overview",
            items: [
              { label: "Dashboard", icon: "📊", path: "/dashboard" },
              { label: "Analytics", icon: "📈", path: "/analytics" },
            ],
          },
          {
            label: "Management",
            items: managementItems,
          },
          {
            label: "Catalog",
            items: [
              { label: "Products", icon: "📦", path: "/products" },
              { label: "Categories", icon: "🏷️", path: "/categories" },
              { label: "Pricing", icon: "💰", path: "/pricing" },
              { label: "Tax Rules", icon: "🧾", path: "/tax" },
            ],
          },
          {
            label: "Operations",
            items: [
              { label: "Orders", icon: "📋", path: "/orders" },
              { label: "Inventory", icon: "📦", path: "/inventory" },
              { label: "Suppliers", icon: "🚛", path: "/suppliers" },
              { label: "Customers", icon: "👤", path: "/customers" },
            ],
          },
          {
            label: "Finance",
            items: [
              { label: "Reports", icon: "📑", path: "/reports" },
              { label: "Settlements", icon: "💳", path: "/settlements" },
              { label: "Audit Logs", icon: "🔍", path: "/audit" },
            ],
          },
          {
            label: "Settings",
            items: [
              { label: "Settings", icon: "⚙️", path: "/settings" },
              { label: "Integrations", icon: "🔌", path: "/integrations" },
            ],
          },
        ],
      });
    }, 500);
  });
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  return apiTenantService.get<DashboardData>("/dashboard/overview");
};



export const fetchTenantsData = async (): Promise<TenantStatsData> => {
  const stats = await apiTenantService.get<any>("/tenants/stats");

  return {
    TenantStats: [
      {
        color: "border-red-500",
        label: "Total Tenants",
        value: stats.total.toString(),
        change: "",
        trend: "up",
        icon: FaUser,
        type: "sales",
      },
      {
        color: "border-green-500",
        label: "Active Tenants",
        value: stats.active.toString(),
        change: "",
        trend: "up",
        icon: FaUserCheck,
        type: "orders",
      },
      {
        color: "border-blue-500",
        label: "Trial",
        value: stats.trial.toString(),
        change: "",
        trend: "up",
        icon: FaFlask,
        type: "customers",
      },
      {
        color: "border-orange-500",
        label: "Total Outlets",
        value: stats.totalOutlets.toString(),
        change: "",
        trend: "up",
        icon: FaStore,
        type: "revenue",
      },
    ],
  };
};
