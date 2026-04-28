import React from "react";
import { HiOutlinePencil, HiOutlineArrowUpTray } from "react-icons/hi2";
import { Button } from "./ui/Button";
import { Card } from "./ui/card";

const countryData: Record<string, { code: string }> = {
  India: { code: "IN" },
  Australia: { code: "AU" },
  "United States": { code: "US" },
};

// 👉 reusable function
const getFlag = (country?: string): string => {
  if (!country) return "🌍";

  const code = countryData[country]?.code;
  if (!code) return "🌍";

  return code
    .split("")
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
};

interface TenantHeaderProps {
  name: string;
  country?: string;
  badges: string[];
}

const CommonHeader: React.FC<TenantHeaderProps> = ({
  name,
  country,
  badges,
}) => {
  return (
    <Card className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 w-full md:w-auto">

        {/* FLAG */}
        <div className="w-16 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl">
            {getFlag(country)}
          </span>
        </div>

        {/* NAME + BADGES */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

          <div className="flex gap-2 mt-1">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${badge === "Active"
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

      {/* RIGHT SECTION */}
      <div className="flex gap-3 w-full md:w-auto">

        <Button
          variant="outline"
          className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-2 h-auto rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <HiOutlineArrowUpTray className="w-4 h-4" />
          Export
        </Button>

        <Button
          className="flex-1 md:flex-none bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 h-auto rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-100 transition-all flex items-center justify-center gap-2 border-none"
        >
          <HiOutlinePencil className="w-4 h-4" />
          Edit
        </Button>

      </div>
    </Card>
  );
};

export default CommonHeader;