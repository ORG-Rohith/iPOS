import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OutletsLayout from "../../../layout/OutletsLayout";
import OutletForm from "../components/OutletForm";
import { outletService } from "../services/outlet.service";
import type { Outlet } from "../../auth/types/outlet.types";
import { tenantService } from "../../../services/tenantService";
import { Card } from "../../../components/ui/card";

const OutletFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<Outlet> | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;

  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    const fetchTenants = async () => {
      const res = await tenantService.getAllTenants();
      setTenants(res); // adjust if res.data
    };

    fetchTenants();
  }, []);
  const tenantOptions = tenants.map((tenant: any) => ({
    label: tenant.name,
    value: tenant.id,
  }));



  useEffect(() => {
    if (isEditMode) {
      fetchOutlet();
    }
  }, [id]);

  const fetchOutlet = async () => {
    setLoading(true);
    try {
      const data = await outletService.getById(id!);
      setInitialData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch outlet details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      // Sanitize payload: remove fields that should not be sent to the backend
      const {
        id: _id,
        uuid: _uuid,
        created_on: _co,
        updated_on: _uo,
        manager: _m,
        tenant: _t,
        userRoles: _ur,
        status: _s,
        address: _a,
        devicesCount: _dc,
        todaySales: _ts,
        staffCount: _sc,
        tablesCount: _tc,
        ...sanitizedData
      } = formData;

      // Ensure IDs are strings
      const payload = {
        ...sanitizedData,
        tenant_id: String(formData.tenant_id || sanitizedData.tenant_id || "1"),
        manager_id: formData.manager_id ? String(formData.manager_id) : undefined,
        number_of_registers: Number(formData.number_of_registers)
      };

      if (isEditMode) {
        await outletService.update(id!, payload);
      } else {
        await outletService.create(payload);
      }
      navigate("/outlets");
    } catch (err: any) {
      setError(err.message || "Failed to save outlet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OutletsLayout title={isEditMode ? "Edit Outlet" : "Create Outlet"}>
      <div className="p-7">
        {error && (
          <Card className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 border-none shadow-none">
            {error}
          </Card>
        )}

        {loading && !initialData && isEditMode ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <OutletForm
            mode={isEditMode ? "edit" : "create"}
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={loading}
            tenantOptions={tenantOptions}
          />
        )}
      </div>
    </OutletsLayout>
  );
};

export default OutletFormPage;
