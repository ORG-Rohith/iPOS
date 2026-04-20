import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PermissionsSeeder } from './permissions.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly permissionsSeeder: PermissionsSeeder,
  ) {}

  async run(): Promise<void> {
    // ✅ Step 1: Run migrations (creates tables)
    await this.dataSource.runMigrations();

    // ✅ Step 2: Seed data
    await this.permissionsSeeder.seedPermissions();
  }
}
