import { apiService } from "./apiService";
import { FaFlask, FaStore, FaUser, FaUserCheck } from "react-icons/fa";
import type {
  DashboardData,
  SidebarData,
} from "../../src/features/auth/types/dashboard";
import type { TenantStatsData } from "../features/auth/types/tenant.types";

export const fetchSidebarData = async (): Promise<SidebarData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
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
            items: [
              { label: "Outlets", icon: "🏢", path: "/outlets" },
              { label: "Users & Roles", icon: "👥", path: "/users" },
              { label: "Tenants", icon: "🌍", path: "/tenants" },
              { label: "Devices", icon: "📱", path: "/devices" },
            ],
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
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: [
          {
            color: "border-red-500",
            label: "Today's Sales",
            value: "$4,820",
            change: "↑ 12% from yesterday",
            trend: "up",
            icon: "💰",
            type: "sales",
          },
          {
            color: "border-blue-500",
            label: "Total Orders",
            value: "147",
            change: "↑ 8% from yesterday",
            trend: "up",
            icon: "🛒",
            type: "orders",
          },
          {
            color: "border-green-500",
            label: "Customers Served",
            value: "132",
            change: "↑ 5% from yesterday",
            trend: "up",
            icon: "👥",
            type: "customers",
          },
          {
            color: "border-orange-500",
            label: "Avg Order Value",
            value: "$32.80",
            change: "↓ 2% from yesterday",
            trend: "down",
            icon: "📊",
            type: "revenue",
          },
        ],
        chartData: [
          { label: "Mon", value: 60, type: "primary" },
          { label: "Tue", value: 80, type: "primary" },
          { label: "Wed", value: 55, type: "primary" },
          { label: "Thu", value: 90, type: "primary" },
          { label: "Fri", value: 75, type: "primary" },
          { label: "Sat", value: 100, type: "secondary" },
          { label: "Sun", value: 70, type: "secondary" },
        ],
        outlets: [
          {
            name: "Sydney CBD",
            type: "Retail",
            sales: "$1,840",
            status: "Online",
            iconType: "retail",
          },
          {
            name: "Melbourne Central",
            type: "F&B",
            sales: "$2,120",
            status: "Online",
            iconType: "fb",
          },
          {
            name: "Mumbai Main",
            type: "Retail",
            sales: "₹48,200",
            status: "Syncing",
            iconType: "retail",
          },
        ],
        transactions: [
          {
            id: "1",
            orderNumber: "#ORD-1047",
            outlet: "Sydney CBD",
            cashier: "Sarah K.",
            amount: "$42.50",
            paymentType: "Card",
          },
          {
            id: "2",
            orderNumber: "#ORD-1046",
            outlet: "Melbourne",
            cashier: "James R.",
            amount: "$88.00",
            paymentType: "Cash",
          },
          {
            id: "3",
            orderNumber: "#ORD-1045",
            outlet: "Mumbai Main",
            cashier: "Priya S.",
            amount: "₹1,240",
            paymentType: "UPI",
          },
          {
            id: "4",
            orderNumber: "#ORD-1044",
            outlet: "Sydney CBD",
            cashier: "Sarah K.",
            amount: "$24.90",
            paymentType: "Card",
          },
          {
            id: "5",
            orderNumber: "#ORD-1043",
            outlet: "Melbourne",
            cashier: "James R.",
            amount: "$156.00",
            paymentType: "Cash",
          },
        ],
        alerts: [
          {
            id: "1",
            message: "⚠️ Low stock: Coca-Cola 600ml (Mumbai Main — 3 left)",
            type: "warning",
          },
          {
            id: "2",
            message: "🔄 Mumbai Main syncing 12 offline transactions",
            type: "info",
          },
          {
            id: "3",
            message: "🖨️ Printer offline at Sydney CBD Terminal 2",
            type: "danger",
          },
          {
            id: "4",
            message: "⚠️ Low stock: Chicken Burger Patty (Melbourne — 5 left)",
            type: "warning",
          },
          {
            id: "5",
            message: "📦 Purchase order #PO-0023 received at Sydney CBD",
            type: "info",
          },
        ],
      });
    }, 500);
  });
};



export const fetchTenantsData = async (): Promise<TenantStatsData> => {
  const stats = await apiService.get<any>("/tenants/stats");
  
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
