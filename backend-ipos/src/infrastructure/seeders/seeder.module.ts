import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permissions/entity/permissions.entity';
import { PermissionsSeeder } from './permissions.seeder';
import { SeederService } from './seeder.service';
import { RolePermission } from 'src/modules/roles/role-permissions.entity';
import { Role } from 'src/modules/roles/entity/roles.entity';
import { RolesSeeder } from './roles.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, RolePermission]), // ✅ include all
  ],
  providers: [PermissionsSeeder, SeederService, RolesSeeder],
  exports: [SeederService],
})
export class SeederModule { }
