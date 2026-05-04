import React, { useState } from "react";
import TenantDetailsLayout from "./TenantDetailsLayout";
import Breadcrumbs from "../../../shared/components/ui/Breadcrumbs";
import Tabs from "../../../shared/components/ui/Tabs";
import ActivityTimeline from "../components/ActivityTimeline";
import StatCard from "../../dashboard/components/StatCard";
import { useParams } from "react-router-dom";
import { useGetTenantDetailsById } from "./useTenantDetails";
import CommonHeader from "../../../shared/components/CommonHeader";

interface Activity {
    id: string;
    type: "outlet" | "user" | "device" | "billing" | "catalog";
    title: string;
    description: string;
    time: string;
    color: string;
}

const activities: Activity[] = [
    {
        id: "1",
        type: "outlet",
        title: "New outlet added — CBD Flagship",
        description: "2 hours ago by James Richardson",
        time: "2 HOURS AGO",
        color: "var(--tw-color-primary, #e94560)",
    },
    {
        id: "2",
        type: "user",
        title: "User role updated — Sarah Chen → Store Manager",
        description: "1 day ago by Super Admin",
        time: "1 DAY AGO",
        color: "var(--tw-color-secondary, #4361ee)",
    },
];

export const TenantDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { tenant, loading, error } = useGetTenantDetailsById(id);
    const [activeTab, setActiveTab] = useState("overview");

    if (loading) {
        return (
            <TenantDetailsLayout title="Tenant Detail">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </TenantDetailsLayout>
        );
    }

    if (error || !tenant) {
        return (
            <TenantDetailsLayout title="Tenant Detail">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100">
                    <h2 className="text-lg font-bold mb-2">Error</h2>
                    <p>{error || "Tenant not found"}</p>
                </div>
            </TenantDetailsLayout>
        );
    }

    const breadcrumbItems = [
        { label: "Home", path: "/dashboard" },
        { label: "Tenants", path: "/tenants" },
        { label: tenant.name },
    ];

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "outlets", label: "Outlets" },
        { id: "devices", label: "Devices" },
        { id: "users", label: "Users" },
        { id: "billing", label: "Billing" },
    ];

    const stats = [
        {
            label: "Outlets",
            value: tenant.outlets?.length.toString() || "0",
            change: "All operational",
            trend: "up" as const,
            icon: "🏪",
            type: "sales" as const,
            color: "border-t-pink-500",
        },
        {
            label: "Active Devices",
            value: "0",
            change: "+0 this month",
            trend: "up" as const,
            icon: "📱",
            type: "customers" as const,
            color: "border-t-teal-500",
        },
        {
            label: "Users",
            value: "0",
            change: "0 admins, 0 staff",
            trend: "up" as const,
            icon: "👥",
            type: "orders" as const,
            color: "border-t-blue-500",
        },
        {
            label: "Monthly Revenue",
            value: "$0",
            change: "↑ 0% vs last month",
            trend: "up" as const,
            icon: "💰",
            type: "revenue" as const,
            color: "border-t-orange-500",
        },
    ];

    return (
        <TenantDetailsLayout title="Tenant Detail">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col gap-2 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Tenant Detail</h2>
                    <p className="text-sm text-gray-500">View and manage information for {tenant.name}</p>
                </div>

                <CommonHeader
                    name={tenant.name}
                    country={tenant.country}
                    badges={[tenant.status, tenant.settings?.plan || "Standard"]}
                />

                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

                {activeTab === "overview" && (
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, idx) => (
                                <StatCard key={idx} stat={stat} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Business Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Business Name</p>
                                        <p className="text-sm text-gray-700">{tenant.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Legal Name</p>
                                        <p className="text-sm text-gray-700">{tenant.settings?.legalName || tenant.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Business Type</p>
                                        <p className="text-sm text-gray-700">{tenant.business_type || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Registration Number</p>
                                        <p className="text-sm text-gray-700">{tenant.registration_number || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tax ID (ABN)</p>
                                        <p className="text-sm text-gray-700">{tenant.tax_id || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Country</p>
                                        <p className="text-sm text-gray-700">{tenant.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-sm text-gray-700">{tenant.address || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Contact</p>
                                        <p className="text-sm text-gray-700">{tenant.contact_name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-sm text-gray-700">{tenant.email || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-sm text-gray-700">{tenant.phone || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Currency</p>
                                        <p className="text-sm text-gray-700">{tenant.currency}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Timezone</p>
                                        <p className="text-sm text-gray-700">{tenant.timezone || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <ActivityTimeline activities={activities} />
                        </div>
                    </div>
                )}

                {activeTab !== "overview" && (
                    <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl text-gray-300">🚧</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{tabs.find(t => t.id === activeTab)?.label} Section</h3>
                        <p className="text-sm text-gray-500 max-w-xs">This section is currently under development and will be available soon.</p>
                    </div>
                )}
            </div>
        </TenantDetailsLayout>
    );
};

export default TenantDetailsPage;