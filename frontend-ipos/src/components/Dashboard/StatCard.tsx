import React from "react";
import type { StatData } from "../../../src/features/auth/types/dashboard";
import { Card } from "../ui/card";

interface StatCardProps {
  stat: StatData;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const getBorderColor = () => {
    switch (stat.type) {
      case "sales":
        return "border-t-[#e94560]";
      case "orders":
        return "border-t-[#4361ee]";
      case "customers":
        return "border-t-[#2ec4b6]";
      case "revenue":
        return "border-t-[#f77f00]";
      default:
        return "border-t-gray-200";
    }
  };

  const getTrendColor =
    stat.trend === "up" ? "text-[#2ec4b6]" : "text-[#e94560]";

  return (
    <Card
      className={`relative bg-white rounded-xl p-5 border-t-4 ${getBorderColor()} shadow-sm transition-transform duration-200 hover:-translate-y-1 border-x-0 border-b-0`}
    >
      {/* Label */}
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
        {stat.label}
      </p>

      {/* Value */}
      <h2 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h2>

      {/* Change */}
      <div className={`text-xs flex items-center gap-1 mt-1 ${getTrendColor}`}>
        {stat.change}
      </div>

      {/* Icon */}
      <div className="absolute top-4 right-4 text-3xl opacity-20">
        {stat.icon}
      </div>
    </Card>
  );
};

export default StatCard;
