import React from 'react';
import type { StatData } from '../../../src/features/auth/types/dashboard';

interface StatCardProps {
  stat: StatData;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const getBorderColor = () => {
    switch (stat.type) {
      case 'sales': return 'before:bg-[#e94560]';
      case 'orders': return 'before:bg-[#4361ee]';
      case 'customers': return 'before:bg-[#2ec4b6]';
      case 'revenue': return 'before:bg-[#f77f00]';
      default: return 'before:bg-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-[14px] p-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:height-1 ${getBorderColor()} transition-transform hover:-translate-y-1`}>
      <div className="text-[12px] text-gray-400 uppercase tracking-[0.5px] font-semibold mb-2">
        {stat.label}
      </div>
      <div className="text-[28px] font-bold text-[#1a1a2e] mb-1.5">
        {stat.value}
      </div>
      <div className={`text-[12px] flex items-center gap-1 ${stat.trend === 'up' ? 'text-[#2ec4b6]' : 'text-[#e94560]'}`}>
        {stat.change}
      </div>
      <div className="absolute top-5 right-5 text-[32px] opacity-[0.15]">
        {stat.icon}
      </div>
    </div>
  );
};

export default StatCard;
