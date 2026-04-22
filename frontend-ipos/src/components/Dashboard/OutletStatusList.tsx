import React from 'react';
import type { OutletStatus } from '../../../src/features/auth/types/dashboard';

interface OutletStatusListProps {
  outlets: OutletStatus[];
}

const OutletStatusList: React.FC<OutletStatusListProps> = ({ outlets }) => {
  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-bold text-[#1a1a2e]">Outlet Status</h3>
        <a href="#" className="text-[12px] text-[#e94560] font-semibold hover:underline">Manage</a>
      </div>

      <div className="flex flex-col gap-3">
        {outlets.map((outlet, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-[10px]">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-base ${outlet.iconType === 'retail' ? 'bg-[#fff0f3]' : 'bg-[#f0f4ff]'
                }`}>
                {outlet.iconType === 'retail' ? '🏪' : '🍽️'}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#1a1a2e]">{outlet.name}</div>
                <div className="text-[11px] text-gray-400">{outlet.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold text-[#1a1a2e]">{outlet.sales}</div>
              <div className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block ${outlet.status === 'Online'
                ? 'bg-[#e6faf8] text-[#2ec4b6]'
                : outlet.status === 'Offline'
                  ? 'bg-[#fff0f3] text-[#e94560]'
                  : 'bg-[#fff5e6] text-[#f77f00]'
                }`}>
                {outlet.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutletStatusList;
