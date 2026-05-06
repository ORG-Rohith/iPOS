import type { Role } from "../../roles/types/role.types";

export interface User {
  id: string;
  uuid?: string;
  name: string;
  email: string;
  is_active: boolean;
  role_id?: string;
  role?: Role; // joined from roles
  outlet_id?: string | null;
  tenant_id?: string | null;
  created_on?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  is_active: boolean;
  role_id: string;
  outlet_id?: string | null;
}
