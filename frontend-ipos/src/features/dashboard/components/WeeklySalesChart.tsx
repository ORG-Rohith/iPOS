import React from "react";
import type { ChartData } from "../types/dashboard";

interface WeeklySalesChartProps {
  data: ChartData[];
}

const WeeklySalesChart: React.FC<WeeklySalesChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-bold text-[#1a1a2e]">
          Weekly Sales Overview
        </h3>
        <a href="#" className="text-[12px] text-[#e94560] font-semibold ">
          View Full Report
        </a>
      </div>

      <div className="flex items-end gap-2.5 h-[140px]">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
          >
            <div
              className={`w-full rounded-t-md transition-opacity group-hover:opacity-80 ${
                item.type === "primary" ? "bg-[#e94560]" : "bg-[#4361ee]"
              }`}
              style={{ height: `${item.value}%` }}
            ></div>
            <div className="text-[11px] text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
          <div className="w-2 h-2 rounded-full bg-[#e94560]"></div>
          Weekday
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
          <div className="w-2 h-2 rounded-full bg-[#4361ee]"></div>
          Weekend
        </div>
      </div>
    </div>
  );
};

export default WeeklySalesChart;
