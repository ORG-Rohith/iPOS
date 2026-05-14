import React from "react";
import { useNavigate } from "react-router-dom";
import type { BusinessOwner } from "../types/CompanyOwers.types";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-600",
    trial: "bg-blue-100 text-blue-600",
    suspended: "bg-red-100 text-red-600",
    inactive: "bg-gray-100 text-gray-600",
};

const BusinessOwnerCard: React.FC<{ owner: BusinessOwner }> = ({ owner }) => {
    const navigate = useNavigate();
    const statusKey = owner.status?.toLowerCase() || 'active';

    return (
        <Card className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-800">{owner.name}</h3>
                    <span className="text-xs text-gray-400">{owner.email}</span>
                </div>

                <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[statusKey] || "bg-gray-100 text-gray-600"}`}>
                    {owner.status || 'Active'}
                </span>
            </div>

            {/* Info */}
            <div className="mt-3 text-sm text-gray-600">
                <p>{owner.tenants?.length || 0} tenants</p>
                <p>{owner.subscriptions?.reduce((acc: number, sub: any) => acc + sub.quantity, 0) || 0} active subscriptions</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <Button
                    variant="ghost"
                    className="bg-pink-100 text-pink-600 px-3 py-1.5 h-auto rounded text-sm hover:bg-pink-200 transition-colors"
                    onClick={() => navigate(`/business-owners/manage/${owner.id}`)}>
                    Manage
                </Button>
                <Button
                    variant="outline"
                    className="border border-gray-200 px-3 py-1.5 h-auto rounded text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => navigate(`/business-owners/edit/${owner.id}`)}>
                    Edit
                </Button>
            </div>
        </Card>
    );
};

export default BusinessOwnerCard;
