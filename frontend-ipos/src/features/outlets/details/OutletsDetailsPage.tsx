import React, { useState } from "react";
import Breadcrumbs from "../../../shared/components/ui/Breadcrumbs";
import Tabs from "../../../shared/components/ui/Tabs";
import ActivityTimeline from "../../tenants/components/ActivityTimeline";
import StatCard from "../../dashboard/components/StatCard";
import { useParams } from "react-router-dom";
import OutletsDetailsLayout from "./OutletsDetailsLayout";
import { useOutletDetails } from "./useOutletDetails";
import { Card } from "../../../shared/components/ui/card";
import CommonHeader from "../../../shared/components/CommonHeader";

interface Activity {
    id: string;
    type: "user" | "device" | "billing" | "catalog";
    title: string;
    description: string;
    time: string;
    color: string;
}

const activities: Activity[] = [
    {
        id: "2",
        type: "user",
        title: "User role updated — Sarah Chen → Store Manager",
        description: "1 day ago by Super Admin",
        time: "1 DAY AGO",
        color: "var(--tw-color-secondary, #4361ee)",
    },
];

export const OutletsDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { outlet, loading, error } = useOutletDetails(id);
    console.log("outlet -> ", outlet);
    const [activeTab, setActiveTab] = useState("overview");

    if (loading) {
        return (
            <OutletsDetailsLayout title="Outlet Detail">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </OutletsDetailsLayout>
        );
    }

    if (error || !outlet) {
        return (
            <OutletsDetailsLayout title="Outlet Detail">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100">
                    <h2 className="text-lg font-bold mb-2">Error</h2>
                    <p>{error || "Outlet not found"}</p>
                </div>
            </OutletsDetailsLayout>
        );
    }

    const breadcrumbItems = [
        { label: "Home", path: "/dashboard" },
        { label: "Outlets", path: "/outlets" },
        { label: outlet.name },
    ];

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "devices", label: "Devices" },
        { id: "users", label: "Users" },
        { id: "settings", label: "Settings" },
    ];

    const stats = [
        {
            label: "Active Devices",
            value: outlet.devicesCount || "0",
            change: "+0 this month",
            trend: "up" as const,
            icon: "📱",
            type: "customers" as const,
            color: "border-t-teal-500",
        },
        {
            label: "Staff Count",
            value: outlet.staffCount || "0",
            change: "Active staff",
            trend: "up" as const,
            icon: "👥",
            type: "orders" as const,
            color: "border-t-blue-500",
        },
        {
            label: "Today's Sales",
            value: outlet.todaySales || "$0",
            change: "Current session",
            trend: "up" as const,
            icon: "💰",
            type: "revenue" as const,
            color: "border-t-orange-500",
        },
        {
            label: "Registers",
            value: outlet.number_of_registers || "1",
            change: "Configured",
            trend: "up" as const,
            icon: "📠",
            type: "sales" as const,
            color: "border-t-pink-500",
        },
    ];

    return (
        <OutletsDetailsLayout title="Outlet Detail">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col gap-2 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Outlet Detail</h2>
                    <p className="text-sm text-gray-500">View and manage information for {outlet.name}</p>
                </div>

                <CommonHeader
                    name={outlet.name}
                    country={outlet.country}
                    badges={[outlet.status, outlet.type]}
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
                            <Card className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Outlet Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Outlet Name</p>
                                        <p className="text-sm text-gray-700">{outlet.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Outlet Type</p>
                                        <p className="text-sm text-gray-700">{outlet.type}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                                        <p className="text-sm text-gray-700">{outlet.description || "No description provided"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-sm text-gray-700">{outlet.address || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">City / State</p>
                                        <p className="text-sm text-gray-700">{outlet.city}, {outlet.state}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Country</p>
                                        <p className="text-sm text-gray-700">{outlet.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-sm text-gray-700">{outlet.phone || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-sm text-gray-700">{outlet.email || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Currency</p>
                                        <p className="text-sm text-gray-700">{outlet.currency}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Timezone</p>
                                        <p className="text-sm text-gray-700">{outlet.timezone}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tax Rule</p>
                                        <p className="text-sm text-gray-700">{outlet.tax_rule}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Number of Registers</p>
                                        <p className="text-sm text-gray-700">{outlet.number_of_registers}</p>
                                    </div>
                                </div>
                            </Card>

                            <ActivityTimeline activities={activities} />
                        </div>
                    </div>
                )}

                {activeTab !== "overview" && (
                    <Card className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl text-gray-300">🚧</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{tabs.find(t => t.id === activeTab)?.label} Section</h3>
                        <p className="text-sm text-gray-500 max-w-xs">This section is currently under development and will be available soon.</p>
                    </Card>
                )}
            </div>
        </OutletsDetailsLayout>
    );
};

export default OutletsDetailsPage;