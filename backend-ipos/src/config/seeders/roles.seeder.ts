import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../auth/roles/roles.entity';
import { RolePermission } from '../../auth/roles/role-permissions.entity';
import { Permission } from '../../auth/permissions/permissions.entity';

// ─── Default system roles with their permissions ──────────
export const DEFAULT_ROLES = [
  {
    name: 'Tenant Admin',
    display_name: 'Tenant Administrator',
    is_system: true,
    permissions: [
      'OUTLET_VIEW',
      'OUTLET_CREATE',
      'OUTLET_UPDATE',
      'OUTLET_DELETE',
      'USER_VIEW',
      'USER_CREATE',
      'USER_UPDATE',
      'USER_DELETE',
      'ROLE_VIEW',
      'ROLE_CREATE',
      'ROLE_UPDATE',
      'ROLE_DELETE',
      'ORDER_VIEW',
      'ORDER_CREATE',
      'ORDER_UPDATE',
      'ORDER_DELETE',
      'REPORT_VIEW',
      'REPORT_EXPORT',
      'PRODUCT_VIEW',
      'PRODUCT_CREATE',
      'PRODUCT_UPDATE',
      'PRODUCT_DELETE',
    ],
  },
  {
    name: 'Outlet Manager',
    display_name: 'Outlet Manager',
    is_system: true,
    permissions: [
      'USER_VIEW',
      'ORDER_VIEW',
      'ORDER_CREATE',
      'ORDER_UPDATE',
      'REPORT_VIEW',
      'REPORT_EXPORT',
      'PRODUCT_VIEW',
      'PRODUCT_CREATE',
      'PRODUCT_UPDATE',
      'OUTLET_VIEW',
    ],
  },
  {
    name: 'Cashier',
    display_name: 'Cashier',
    is_system: true,
    permissions: ['ORDER_VIEW', 'ORDER_CREATE', 'PRODUCT_VIEW'],
  },
];

@Injectable()
export class RolesSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(RolesSeeder.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedRoles();
  }

  async seedRoles(): Promise<void> {
    this.logger.log('👥 Seeding default roles...');

    for (const roleData of DEFAULT_ROLES) {
      // Check if role already exists
      let role = await this.roleRepo.findOne({
        where: { name: roleData.name, is_system: true },
      });

      if (!role) {
        // Create role
        role = this.roleRepo.create({
          uuid: uuidv4(),
          name: roleData.name,
          display_name: roleData.display_name,
          is_system: true,
          tenant_id: null, // system-level roles
        });

        role = await this.roleRepo.save(role);
        this.logger.log(`  ✅ Role created: ${role.name}`);
      } else {
        this.logger.log(`  ⏭️  Role exists: ${role.name}. Skipping.`);
      }

      // Assign permissions to role
      await this.assignPermissionsToRole(role, roleData.permissions);
    }

    this.logger.log('✅ Roles seeding complete.');
  }

  // ─── Assign permissions to a role ────────────────────────
  private async assignPermissionsToRole(
    role: Role,
    permissionCodes: string[],
  ): Promise<void> {
    for (const code of permissionCodes) {
      // Find permission by code
      const permission = await this.permissionRepo.findOne({
        where: { code },
      });

      if (!permission) {
        this.logger.warn(`  ⚠️  Permission not found: ${code}`);
        continue;
      }

      // Check if already assigned
      const existing = await this.rolePermissionRepo.findOne({
        where: {
          role_id: role.id,
          permission_id: permission.id,
        },
      });

      if (existing) continue; // skip duplicate

      // Assign
      const rp = this.rolePermissionRepo.create({
        role_id: role.id,
        permission_id: permission.id,
      });

      await this.rolePermissionRepo.save(rp);
    }
  }
}
