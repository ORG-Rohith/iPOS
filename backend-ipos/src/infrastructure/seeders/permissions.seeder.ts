import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Permission } from 'src/modules/permissions/entity/permissions.entity';

// ─── All system permissions ───────────────────────────────
export const DEFAULT_PERMISSIONS = [
  { code: 'TENANT_VIEW', name: 'View Tenant', module: 'TENANT' },
  { code: 'TENANT_CREATE', name: 'Create Tenant', module: 'TENANT' },
  { code: 'TENANT_UPDATE', name: 'Update Tenant', module: 'TENANT' },
  { code: 'TENANT_DELETE', name: 'Delete Tenant', module: 'TENANT' },

  { code: 'BUSINESS_OWNER_VIEW', name: 'View Business Owner', module: 'BUSINESS_OWNER' },
  { code: 'BUSINESS_OWNER_CREATE', name: 'Create Business Owner', module: 'BUSINESS_OWNER' },
  { code: 'BUSINESS_OWNER_UPDATE', name: 'Update Business Owner', module: 'BUSINESS_OWNER' },
  { code: 'BUSINESS_OWNER_DELETE', name: 'Delete Business Owner', module: 'BUSINESS_OWNER' },

  { code: 'OUTLET_VIEW', name: 'View Outlet', module: 'OUTLET' },
  { code: 'OUTLET_CREATE', name: 'Create Outlet', module: 'OUTLET' },
  { code: 'OUTLET_UPDATE', name: 'Update Outlet', module: 'OUTLET' },
  { code: 'OUTLET_DELETE', name: 'Delete Outlet', module: 'OUTLET' },

  { code: 'USER_VIEW', name: 'View User', module: 'USER' },
  { code: 'USER_CREATE', name: 'Create User', module: 'USER' },
  { code: 'USER_UPDATE', name: 'Update User', module: 'USER' },
  { code: 'USER_DELETE', name: 'Delete User', module: 'USER' },

  { code: 'ROLE_VIEW', name: 'View Role', module: 'ROLE' },
  { code: 'ROLE_CREATE', name: 'Create Role', module: 'ROLE' },
  { code: 'ROLE_UPDATE', name: 'Update Role', module: 'ROLE' },
  { code: 'ROLE_DELETE', name: 'Delete Role', module: 'ROLE' },

  { code: 'ORDER_VIEW', name: 'View Order', module: 'ORDER' },
  { code: 'ORDER_CREATE', name: 'Create Order', module: 'ORDER' },
  { code: 'ORDER_UPDATE', name: 'Update Order', module: 'ORDER' },
  { code: 'ORDER_DELETE', name: 'Delete Order', module: 'ORDER' },

  { code: 'REPORT_VIEW', name: 'View Reports', module: 'REPORT' },
  { code: 'REPORT_EXPORT', name: 'Export Reports', module: 'REPORT' },

  { code: 'PRODUCT_VIEW', name: 'View Product', module: 'PRODUCT' },
  { code: 'PRODUCT_CREATE', name: 'Create Product', module: 'PRODUCT' },
  { code: 'PRODUCT_UPDATE', name: 'Update Product', module: 'PRODUCT' },
  { code: 'PRODUCT_DELETE', name: 'Delete Product', module: 'PRODUCT' },
];

@Injectable()
export class PermissionsSeeder {
  private readonly logger = new Logger(PermissionsSeeder.name);

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) { }

  async seedPermissions(): Promise<void> {
    this.logger.log('🔐 Seeding permissions...');

    for (const perm of DEFAULT_PERMISSIONS) {
      const existing = await this.permissionRepo.findOne({
        where: { code: perm.code },
      });

      if (existing) {
        this.logger.log(`  ⏭️ Skipped: ${perm.code}`);
        continue;
      }

      const newPerm = this.permissionRepo.create({
        uuid: uuidv4(),
        code: perm.code,
        name: perm.name,
        module: perm.module,
      });

      await this.permissionRepo.save(newPerm);
      this.logger.log(`  ✅ Created: ${perm.code}`);
    }

    this.logger.log('✅ Permissions seeding complete.');
  }
}
