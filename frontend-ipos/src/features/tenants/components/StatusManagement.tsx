import React from "react";
import { HiCheckCircle, HiPause, HiStop } from "react-icons/hi2";
import { Button } from "../../../shared/components/ui/Button";
import { Label } from "../../../shared/components/ui/label";
import { Textarea } from "../../../shared/components/ui/textarea";

interface StatusManagementProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  effectiveDate: string;
  onDateChange: (date: string) => void;
}

const StatusManagement: React.FC<StatusManagementProps> = ({
  currentStatus,
  onStatusChange,
  reason,
  onReasonChange,
  effectiveDate,
  onDateChange,
}) => {
  const statuses = [
    { id: "Active", label: "Active", icon: <HiCheckCircle className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { id: "Suspended", label: "Suspended", icon: <HiPause className="w-5 h-5" />, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
    { id: "Terminated", label: "Terminated", icon: <HiStop className="w-5 h-5" />, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-app-text">Status Management</h2>
        <p className="text-xs text-gray-400">Control the operational status of this tenant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Buttons */}
        <div className="flex gap-4">
          {statuses.map((status) => (
            <Button
              key={status.id}
              type="button"
              variant="outline"
              onClick={() => onStatusChange(status.id)}
              className={`flex-1 flex flex-col items-center justify-center p-4 h-auto rounded-xl border-2 transition-all duration-200 ${
                currentStatus === status.id
                  ? `${status.bg} ${status.border} ${status.color} scale-105 shadow-sm`
                  : "border-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="mb-2">{status.icon}</div>
              <span className="text-xs font-bold uppercase">{status.label}</span>
            </Button>
          ))}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Reason for Status Change
            </Label>
            <Textarea
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="Provide a reason if changing status..."
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-700 outline-none focus:border-pink-500 transition-all duration-200 resize-none h-20"
            />
          </div>

          <div>
            <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Effective Date
            </Label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => onDateChange(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-700 outline-none focus:border-pink-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusManagement;
