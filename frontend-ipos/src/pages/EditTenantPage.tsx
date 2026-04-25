import React from "react";
import CreateTenantLayout from "../layout/CreateTenantLayout";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import EditTenantForm from "../features/auth/components/EditTenantForm";
import { useParams, useNavigate } from "react-router-dom";
import { useTenantDetails } from "../hooks/useTenantDetails";

export const EditTenantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tenant, loading, error, updateTenant } = useTenantDetails(id);

  const breadcrumbItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Tenants", path: "/tenants" },
    { label: "Edit Tenant" },
  ];

  if (loading) {
    return (
      <CreateTenantLayout title="Edit Tenant">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </CreateTenantLayout>
    );
  }

  if (error || !tenant) {
    return (
      <CreateTenantLayout title="Edit Tenant">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <p>{error || "Tenant not found"}</p>
        </div>
      </CreateTenantLayout>
    );
  }

  // Map real tenant data to the form payload structure
  const initialData: any = {
    businessName: tenant.name,
    legalName: tenant.legal_name || tenant.name, // fallback
    businessType: tenant.business_type || "N/A",
    registrationNumber: tenant.registration_number || "",
    taxId: tenant.tax_id || "",
    contactName: tenant.contact_name || "",
    email: tenant.email || "",
    phone: tenant.phone || "",
    website: tenant.website || "",
    country: tenant.country,
    state: tenant.state || "",
    city: tenant.city || "",
    address: tenant.address || "",
    postalCode: tenant.postal_code || "",
    plan: tenant.plan || "Premium",
    billingCycle: tenant.billing_cycle || "Monthly",
    outlets: tenant.outlets?.length || 0,
    currency: tenant.currency,
    timezone: tenant.timezone || "",
    status: tenant.status,
  };

  const handleUpdate = async (formData: any) => {
    try {
      await updateTenant(formData);
      navigate("/tenants");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <CreateTenantLayout title="Edit Tenant">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Tenant: {tenant.name}</h2>
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
