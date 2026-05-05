export interface JwtUserRole {
  roleId: number;
  roleName: string;
  outletId: number | null; // null = tenant-wide access
}

export interface JwtPayload {
  sub: number;             // user.id
  uuid: string;            // user.uuid
  email: string;
  tenantId: number | null; // null = Platform Super Admin
  roles: JwtUserRole[];
  permissions: string[];   // permission codes
}

export interface RequestUser {
  id: number;
  uuid: string;
  email: string;
  tenantId: number | null;
  roles: JwtUserRole[];
  permissions: string[];
}