// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// interface TopbarProps {
//   title: string;
//   subtitle?: string;
//   variant?: "dashboard" | "tenants" | "Create Tenant";
// }

// const Topbar: React.FC<TopbarProps> = ({
//   title,
//   subtitle,
//   variant,
// }) => {
//   const navigate = useNavigate();
//   const currentDate = new Date().toLocaleDateString("en-GB", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   // ✅ Dynamic Left Content
//   const renderLeftContent = () => {
//     switch (variant) {
//       case "dashboard":
//         return (
//           <>
//             <h1 className="text-xl font-bold text-[#1a1a2e]">
//               Dashboard
//             </h1>
//             <p className="text-[13px] text-gray-400 mt-0.5">
//               {currentDate} — All Outlets
//             </p>
//           </>
//         );

//       case "tenants":
//         return (
//           <>
//             <h1 className="text-xl font-bold text-[#1a1a2e]">
//               Tenants
//             </h1>
//             <p className="text-[13px] text-gray-400 mt-0.5">
//               Super Admin -- all tenants across the platform
//             </p>
//           </>
//         );
//       case "Create Tenant":
//         return (
//           <>
//             <h1 className="text-xl font-bold text-[#1a1a2e]">
//               Create Tenant
//             </h1>
//             <p className="text-[13px] text-gray-400 mt-0.5">
//               Register a new tenant on the platform
//             </p>
//           </>
//         );

//       default:
//         return (
//           <>
//             <h1 className="text-xl font-bold text-[#1a1a2e]">
//               {title}
//             </h1>
//             <p className="text-[13px] text-gray-400 mt-0.5">
//               {subtitle || `${currentDate} — All Outlets`}
//             </p>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="bg-white px-7 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">

//       {/* 🔥 LEFT SIDE */}
//       <div>{renderLeftContent()}</div>

//       {/* 🔥 RIGHT SIDE */}
//       <div className="flex items-center gap-3">

//         {variant === "dashboard" && (
//           <>
//             <select className="px-3.5 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 bg-gray-50">
//               <option>All Outlets</option>
//             </select>

//             <button className="px-[18px] py-2 bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90">
//               + New Sale
//             </button>
//           </>
//         )}

//         {variant === "tenants" && (
//           <button
//             onClick={() => navigate("/tenants/create")}
//             className="px-[18px] py-2 bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90">
//             + Add Tenant
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Topbar;


import React from "react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  title?: string;
  subtitle?: string;
  variant?: "dashboard" | "tenants" | "createTenant" | "tenantDetails" | "outlets" | "outletsDetails";
}

const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 🔥 LEFT CONTENT
  const renderLeftContent = () => {
    switch (variant) {
      case "dashboard":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Dashboard
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              {currentDate} — All Outlets
            </p>
          </>
        );

      case "tenants":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Tenants
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Super Admin — all tenants across the platform
            </p>
          </>
        );

      case "outlets":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Outlet Management
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Manage your business locations and devices
            </p>
          </>
        );

      case "createTenant":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Create Tenant
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Register a new tenant on the platform
            </p>
          </>
        );

      case "tenantDetails":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Tenant Details
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Tenant details
            </p>
          </>
        );
      case "outletsDetails":
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              Outlet Details
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              Outlet details
            </p>
          </>
        );

      default:
        return (
          <>
            <h1 className="text-xl font-bold text-[#1a1a2e] truncate">
              {title}
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5 truncate">
              {subtitle || `${currentDate} — All Outlets`}
            </p>
          </>
        );
    }
  };

  // 🔥 RIGHT CONTENT
  const renderRightContent = () => {
    switch (variant) {
      case "dashboard":
        return (
          <>
            <select className="px-3.5 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 bg-gray-50">
              <option>All Outlets</option>
              <option>Sydney CBD</option>
              <option>Melbourne Central</option>
              <option>Mumbai Main</option>
            </select>

            <button className="px-[18px] py-2 bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90">
              + New Sale
            </button>
          </>
        );

      case "tenants":
        return (
          <button
            onClick={() => navigate("/tenants/create")}
            className="px-[18px] py-2 bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90"
          >
            + Add Tenant
          </button>
        );
      case "outlets":
        return (
          <button
            onClick={() => navigate("/outlets/create")}
            className="px-[18px] py-2 bg-[#e94560] text-white rounded-lg text-[13px] font-semibold hover:opacity-90"
          >
            + Add New Outlet
          </button>
        );


      case "createTenant":
        return (
          <button
            onClick={() => navigate("/tenants")}
            className="px-[18px] py-2 border border-gray-300 rounded-lg text-[13px] font-semibold hover:bg-gray-100"
          >
            ← Back to Tenants
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white px-7 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">

      {/* ✅ LEFT SIDE */}
      <div className="flex flex-col min-w-0">
        {renderLeftContent()}
      </div>

      {/* ✅ RIGHT SIDE */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {renderRightContent()}
      </div>
    </div>
  );
};

export default Topbar;
