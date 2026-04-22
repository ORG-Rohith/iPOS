import React from "react";

interface Props {
    label: string;
    value: string | number;
    color: string;
}

const TenantStatCard: React.FC<Props> = ({ label, value, color }) => {
    return (
        <div className={`bg-white rounded-xl p-5 border-t-4 ${color}`}>
            <p className="text-xs text-gray-400 font-semibold uppercase">{label}</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
        </div>
    );
};

export default TenantStatCard;