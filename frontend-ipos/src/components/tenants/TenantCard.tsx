import React from "react";
import { useNavigate } from "react-router-dom";

interface Tenant {
    name: string;
    country: string;
    outlets: number;
    devices: number;
    plan: string;
    status: "Active" | "Trial" | "Suspended";
}

const statusColors: any = {
    Active: "bg-green-100 text-green-600",
    Trial: "bg-blue-100 text-blue-600",
    Suspended: "bg-red-100 text-red-600",
};

const TenantCard: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-800">{tenant.name}</h3>
                    <span className="text-xs text-gray-400">{tenant.country}</span>
                </div>

                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[tenant.status]}`}>
                    {tenant.status}
                </span>
            </div>

            {/* Info */}
            <div className="mt-3 text-sm text-gray-600">
                <p>{tenant.outlets} outlets</p>
                <p>{tenant.devices} active devices</p>
            </div>

            {/* Plan */}
            <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded">
                {tenant.plan}
            </span>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <button className="bg-pink-100 text-pink-600 px-3 py-1.5 rounded text-sm">
                    Manage
                </button>
                <button className="border px-3 py-1.5 rounded text-sm"
                    onClick={() => navigate(`/tenants/edit`)}>
                    Edit
                </button>
            </div>
        </div>
    );
};

export default TenantCard;