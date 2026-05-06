export interface Role {
  id: string;
  uuid?: string;
  name: string;
  display_name: string;
  is_system: boolean;
  tenant_id?: string | null;
  created_on?: string;
}

export interface RoleFormData {
  name: string;
  display_name: string;
  is_system: boolean;
}

export interface RolesResponse {
  data: Role[];
  total: number;
}
