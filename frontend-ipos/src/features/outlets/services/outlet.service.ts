import { apiTenantService } from "../../../services/apiService";
import type { Outlet, CreateOutletPayload, UpdateOutletPayload } from "../../auth/types/outlet.types";

export const outletService = {
  getAll: async (tenantId?: number): Promise<Outlet[]> => {
    const endpoint = tenantId ? `/outlets?tenant_id=${tenantId}` : "/outlets";
    return apiTenantService.get<Outlet[]>(endpoint);
  },

  getById: async (idOrUuid: string | number): Promise<Outlet> => {
    return apiTenantService.get<Outlet>(`/outlets/${idOrUuid}`);
  },

  create: async (payload: CreateOutletPayload): Promise<Outlet> => {
    return apiTenantService.post<Outlet>("/outlets", payload);
  },

  update: async (idOrUuid: string | number, payload: UpdateOutletPayload): Promise<Outlet> => {
    return apiTenantService.put<Outlet>(`/outlets/${idOrUuid}`, payload);
  },

  delete: async (idOrUuid: string | number): Promise<void> => {
    return apiTenantService.delete(`/outlets/${idOrUuid}`);
  },
};
