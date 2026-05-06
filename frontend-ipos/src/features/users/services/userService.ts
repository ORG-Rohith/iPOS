import { apiTenantService } from "../../auth/services/apiService";
import type { User, UserFormData } from '../types/user.types';

export const getUsers = async (): Promise<User[]> => {
  return apiTenantService.get<User[]>('/users');
};

export const getUserById = async (id: string): Promise<User | null> => {
  return apiTenantService.get<User>(`/users/${id}`);
};

export const createUser = async (data: UserFormData): Promise<User> => {
  return apiTenantService.post<User>('/users', data);
};

export const updateUser = async (id: string, data: UserFormData): Promise<User> => {
  return apiTenantService.patch<User>(`/users/${id}`, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  return apiTenantService.delete<void>(`/users/${id}`);
};
