import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../auth/permissions/permissions.entity';
import { PermissionsSeeder } from './permissions.seeder';
import { SeederService } from './seeder.service';
import { RolePermission } from 'src/auth/roles/role-permissions.entity';
import { Role } from 'src/auth/roles/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, RolePermission]), // ✅ include all
  ],
  providers: [PermissionsSeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
