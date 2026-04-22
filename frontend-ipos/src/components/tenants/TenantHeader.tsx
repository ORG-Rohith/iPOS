import React from "react";
import { HiOutlinePencil, HiOutlineArrowUpTray } from "react-icons/hi2";

interface TenantHeaderProps {
  name: string;
  logoUrl?: string;
  badges: string[];
}

const TenantHeader: React.FC<TenantHeaderProps> = ({ name, logoUrl, badges }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-16 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-2xl">🇦🇺</span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <div className="flex gap-2 mt-1">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  badge === "Active"
                    ? "bg-teal-50 text-teal-600 border border-teal-100"
                    : "bg-orange-50 text-orange-600 border border-orange-100"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <HiOutlineArrowUpTray className="w-4 h-4" />
          Export
        </button>
        <button className="flex-1 md:flex-none bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-100 transition-all flex items-center justify-center gap-2">
          <HiOutlinePencil className="w-4 h-4" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default TenantHeader;
