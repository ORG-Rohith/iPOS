import React from "react";
import type { OutletStatus } from "../types/dashboard";
import { Card } from "../../../shared/components/ui/card";

interface OutletStatusListProps {
  outlets: OutletStatus[];
}

const OutletStatusList: React.FC<OutletStatusListProps> = ({ outlets }) => {
  return (
    <Card className="bg-white rounded-[14px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-none">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-bold text-app-text">Outlet Status</h3>
        <a href="#" className="text-[12px] text-primary font-semibold">
          Manage
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {outlets.map((outlet, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-[10px]"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-base ${
                  outlet.iconType === "retail" ? "bg-primary-light" : "bg-secondary-light"
                }`}
              >
                {outlet.iconType === "retail" ? "🏪" : "🍽️"}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-app-text">
                  {outlet.name}
                </div>
                <div className="text-[11px] text-gray-400">{outlet.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold text-app-text">
                {outlet.sales}
              </div>
              <div
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block ${
                  outlet.status === "Online"
                    ? "bg-success-light text-success"
                    : outlet.status === "Offline"
                      ? "bg-primary-light text-primary"
                      : "bg-warning-light text-warning"
                }`}
              >
                {outlet.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OutletStatusList;
