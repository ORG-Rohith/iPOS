import React from 'react';
import type { Alert } from '../../../src/features/auth/types/dashboard';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-[#fff8e6] text-[#d4a000]';
      case 'info': return 'bg-[#f0f4ff] text-[#4361ee]';
      case 'danger': return 'bg-[#fff0f3] text-[#e94560]';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-bold text-[#1a1a2e]">Alerts & Notifications</h3>
        <a href="#" className="text-[12px] text-[#e94560] font-semibold hover:underline">Dismiss All</a>
      </div>

      <div className="flex flex-col gap-2.5">
        {alerts.map((alert) => (
          <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-[10px] text-[13px] ${getAlertStyles(alert.type)}`}>
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
