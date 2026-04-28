import React from "react";
import { useNavigate } from "react-router-dom";
import type { Tenant } from "../types/tenant.types";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-600",
    trial: "bg-blue-100 text-blue-600",
    suspended: "bg-red-100 text-red-600",
    inactive: "bg-gray-100 text-gray-600",
};

const TenantCard: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
    const navigate = useNavigate();
    const statusKey = tenant.status.toLowerCase();

    return (
        <Card className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-800">{tenant.name}</h3>
                    <span className="text-xs text-gray-400">{tenant.country_code}</span>
                </div>

                <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[statusKey] || "bg-gray-100 text-gray-600"}`}>
                    {tenant.status}
                </span>
            </div>

            {/* Info */}
            <div className="mt-3 text-sm text-gray-600">
                <p>{tenant.outlets?.length || 0} outlets</p>
                <p>{tenant.devices?.length || 0} active devices</p>

                {/* <p>{tenant.settings?.plan || "Standard"} Plan</p> */}
            </div>

            {/* Plan */}
            <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded">
                {tenant.plan}
            </span>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <Button 
                    variant="ghost"
                    className="bg-pink-100 text-pink-600 px-3 py-1.5 h-auto rounded text-sm hover:bg-pink-200 transition-colors"
                    onClick={() => navigate(`/tenants/manage/${tenant.uuid}`)}>
                    Manage
                </Button>
                <Button 
                    variant="outline"
                    className="border border-gray-200 px-3 py-1.5 h-auto rounded text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => navigate(`/tenants/edit/${tenant.uuid}`)}>
                    Edit
                </Button>
            </div>
        </Card>
    );
};

export default TenantCard;