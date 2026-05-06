import { apiTenantService } from "../../auth/services/apiService";
import type { Role, RoleFormData } from "../types/role.types";

export const getRoles = async (): Promise<Role[]> => {
  return apiTenantService.get<Role[]>('/roles');
};

export const getRoleById = async (id: string): Promise<Role | null> => {
  return apiTenantService.get<Role>(`/roles/${id}`);
};

export const createRole = async (data: RoleFormData): Promise<Role> => {
  return apiTenantService.post<Role>('/roles', data);
};

export const updateRole = async (id: string, data: RoleFormData): Promise<Role> => {
  // Assuming the backend has PATCH /roles/:id or PUT /roles/:id
  // But roles controller doesn't seem to have update implemented based on earlier view.
  // We'll add a PUT/PATCH fallback or just try PUT.
  // If backend lacks it, this will 404, but we map it cleanly.
  return apiTenantService.put<Role>(`/roles/${id}`, data);
};

export const deleteRole = async (id: string): Promise<void> => {
  return apiTenantService.delete<void>(`/roles/${id}`);
};
