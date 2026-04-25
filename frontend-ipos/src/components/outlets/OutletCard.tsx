import React from 'react';
import { HiOutlineBuildingStorefront, HiOutlineMapPin } from 'react-icons/hi2';
import { MdOutlineRestaurant } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import type { WeeklyOperatingHours } from '../../features/auth/types/outlet.types';

export interface Outlet {
  id: string;
  uuid: string;
  name: string;
  type: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  timezone: string;
  phone: string;
  email: string;
  devicesCount: string;
  todaySales: string;
  staffCount: string;
  operating_hours: WeeklyOperatingHours;
  tax_rule: string;
  currency: string;
  receipt_header: string;
  receipt_footer: string;
  number_of_registers: string;
  manager_id?: string;
  tenant_id: string;
  is_active: boolean;
  status: string;
  tablesCount: string;
  created_on: string;
  updated_on: string;
}

interface OutletCardProps {
  outlet: Outlet;
}

const OutletCard: React.FC<OutletCardProps> = ({ outlet }) => {
  const navigate = useNavigate();
  const isFnB = outlet.type === 'F&B';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
      {/* Top Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className={`p-3 rounded-xl ${isFnB ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
            {isFnB ? (
              <MdOutlineRestaurant className="w-6 h-6" />
            ) : (
              <HiOutlineBuildingStorefront className="w-6 h-6" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-gray-900">{outlet.name}</h3>
            <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
              <HiOutlineMapPin className="w-4 h-4 text-red-400" />
              <span>{outlet.address}</span>
            </div>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-500 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
          {outlet.status}
        </span>
      </div>

      {/* Grid Info Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Type */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Type</p>
          <p className="font-bold text-gray-900">{outlet.type}</p>
        </div>
        {/* Devices */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Devices</p>
          <p className="font-bold text-gray-900">{outlet.devicesCount}</p>
        </div>
        {/* Today Sales */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Today Sales</p>
          <p className="font-bold text-gray-900">{outlet.todaySales}</p>
        </div>
        {/* Staff/Tables */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            {isFnB ? 'Tables' : 'Staff'}
          </p>
          <p className="font-bold text-gray-900">{isFnB ? outlet.tablesCount : outlet.staffCount}</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-[#f0f4ff] text-[#4f7cff] font-bold rounded-lg text-sm hover:bg-blue-100 transition-colors"
          onClick={() => navigate(`/outlets/edit/${outlet.uuid}`)}
        >
          Edit
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors border border-gray-200">
          Devices
        </button>
        <button className="px-4 py-2 bg-[#ee445e] text-white font-bold rounded-lg text-sm hover:bg-[#d63d54] transition-colors shadow-sm"
          onClick={() => navigate(`/outlets/manage/${outlet.uuid}`)}>
          Manage
        </button>
      </div>
    </div>
  );
};

export default OutletCard;

