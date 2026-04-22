import React, { useState } from "react";
import TenantDetailsLayout from "../layout/TenantDetailsLayout";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import TenantHeader from "../components/tenants/TenantHeader";
import Tabs from "../components/ui/Tabs";
import ActivityTimeline from "../components/tenants/ActivityTimeline";
import StatCard from "../components/Dashboard/StatCard";

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
        color: "#e94560",
    },
    {
        id: "2",
        type: "user",
        title: "User role updated — Sarah Chen → Store Manager",
        description: "1 day ago by Super Admin",
        time: "1 DAY AGO",
        color: "#4361ee",
    },
    {
        id: "3",
        type: "device",
        title: "Device registered — iPad iPOS #08",
        description: "2 days ago by James Richardson",
        time: "2 DAYS AGO",
        color: "#2ec4b6",
    },
    {
        id: "4",
        type: "billing",
        title: "Subscription renewed — Premium Monthly",
        description: "5 days ago (automatic)",
        time: "5 DAYS AGO",
        color: "#f77f00",
    },
    {
        id: "5",
        type: "catalog",
        title: "Product catalog imported — 245 items",
        description: "1 week ago by Admin",
        time: "1 WEEK AGO",
        color: "#4361ee",
    },
];

export const TenantDetailsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const breadcrumbItems = [
        { label: "Home", path: "/dashboard" },
        { label: "Tenants", path: "/tenants" },
        { label: "Demo Retail Group" },
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
            value: "3",
            change: "All operational",
            trend: "up" as const,
            icon: "🏪",
            type: "sales" as const, // For pink color
            color: "border-t-pink-500",
        },
        {
            label: "Active Devices",
            value: "8",
            change: "+2 this month",
            trend: "up" as const,
            icon: "📱",
            type: "customers" as const, // For teal color
            color: "border-t-teal-500",
        },
        {
            label: "Users",
            value: "12",
            change: "3 admins, 9 staff",
            trend: "up" as const,
            icon: "👥",
            type: "orders" as const, // For blue color
            color: "border-t-blue-500",
        },
        {
            label: "Monthly Revenue",
            value: "$24,500",
            change: "↑ 12% vs last month",
            trend: "up" as const,
            icon: "💰",
            type: "revenue" as const, // For orange color
            color: "border-t-orange-500",
        },
    ];

    return (
        <TenantDetailsLayout title="Tenant Detail">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col gap-2 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Tenant Detail</h2>
                    <p className="text-sm text-gray-500">View and manage tenant information</p>
                </div>

                <TenantHeader
                    name="Demo Retail Group"
                    badges={["Active", "Premium"]}
                />

                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

                {activeTab === "overview" && (
                    <div className="flex flex-col gap-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, idx) => (
                                <StatCard key={idx} stat={stat} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Business Details */}
                            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Business Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Business Name</p>
                                        <p className="text-sm text-gray-700">Demo Retail Group</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Legal Name</p>
                                        <p className="text-sm text-gray-700">Demo Retail Group Pty Ltd</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Business Type</p>
                                        <p className="text-sm text-gray-700">Retail</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Registration Number</p>
                                        <p className="text-sm text-gray-700">ACN 648 392 105</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tax ID (ABN)</p>
                                        <p className="text-sm text-gray-700">51 648 392 105</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Country</p>
                                        <p className="text-sm text-gray-700 flex items-center gap-1">🇦🇺 Australia</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-sm text-gray-700">Level 8, 350 Collins St, Melbourne VIC 3000</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Contact</p>
                                        <p className="text-sm text-gray-700">James Richardson</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-sm text-gray-700">james@demoretail.com.au</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-sm text-gray-700">+61 402 845 319</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Currency</p>
                                        <p className="text-sm text-gray-700">AUD — Australian Dollar</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Timezone</p>
                                        <p className="text-sm text-gray-700">Australia/Melbourne (AEST)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
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