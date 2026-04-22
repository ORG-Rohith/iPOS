import React from "react";
import CreateTenantLayout from "../layout/CreateTenantLayout";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import EditTenantForm from "../features/auth/components/EditTenantForm";

export const EditTenantPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Tenants", path: "/tenants" },
    { label: "Edit Tenant" },
  ];

  // Mock initial data for "Demo Retail Group"
  const initialData = {
    businessName: "Demo Retail Group",
    legalName: "Demo Retail Group Pty Ltd",
    businessType: "Retail",
    registrationNumber: "ACN 648 392 105",
    taxId: "51 648 392 105",
    contactName: "James Richardson",
    email: "james@demoretail.com.au",
    phone: "+61 402 845 319",
    website: "https://demoretail.com.au",
    country: "Australia",
    state: "Victoria",
    city: "Melbourne",
    address: "Level 8, 350 Collins St, Melbourne VIC 3000",
    postalCode: "3000",
    plan: "Premium",
    billingCycle: "Monthly",
    outlets: 3,
    currency: "AUD",
    timezone: "Australia/Melbourne",
    status: "Active",
  };

  const handleUpdate = (data: any) => {
    console.log("Updating tenant:", data);
    // Add update logic here
  };

  return (
    <CreateTenantLayout title="Edit Tenant">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Tenant</h2>
          <p className="text-sm text-gray-500">Update business information and manage operational status</p>
        </div>

        <div className="mt-7">
          <EditTenantForm initialData={initialData} onSubmit={handleUpdate} />
        </div>
      </div>
    </CreateTenantLayout>
  );
};

export default EditTenantPage;
