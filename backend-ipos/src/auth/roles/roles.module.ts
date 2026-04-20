import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

import { Role } from './roles.entity';
import { RolePermission } from './role-permissions.entity';
import { Permission } from '../permissions/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission, Permission])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
