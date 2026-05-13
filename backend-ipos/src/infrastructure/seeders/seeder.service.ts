import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PermissionsSeeder } from './permissions.seeder';
import { RolesSeeder } from './roles.seeder';
import { PlansService } from 'src/modules/plans/plans.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly permissionsSeeder: PermissionsSeeder,
    private readonly rolesSeeder: RolesSeeder,
    private readonly plansService: PlansService,
  ) {}

  async run(): Promise<void> {
    // ✅ Step 1: Run migrations (creates tables)
    await this.dataSource.runMigrations();

    // ✅ Step 2: Seed data
    await this.permissionsSeeder.seedPermissions();
    await this.rolesSeeder.seedRoles();

    // ✅ Step 3: Seed plans
    await this.plansService.seed();
  }
}
