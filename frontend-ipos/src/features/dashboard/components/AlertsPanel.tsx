import React from "react";
import type { Alert } from "../types/dashboard";

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-alert-light text-alert";
      case "info":
        return "bg-secondary-light text-secondary";
      case "danger":
        return "bg-primary-light text-primary";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-bold text-app-text">
          Alerts & Notifications
        </h3>
        <a href="#" className="text-[12px] text-primary font-semibold ">
          Dismiss All
        </a>
      </div>

      <div className="flex flex-col gap-2.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center gap-3 p-3 rounded-[10px] text-[13px] ${getAlertStyles(alert.type)}`}
          >
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
