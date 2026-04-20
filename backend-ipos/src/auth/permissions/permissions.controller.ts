import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permissions.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PlatformAdminGuard } from '../guards/platform-admin.guard';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PlatformAdminGuard)
export class PermissionsController {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  // GET /api/v1/permissions
  @Get()
  findAll() {
    return this.permissionRepo.find({
      order: { module: 'ASC', code: 'ASC' },
    });
  }

  // GET /api/v1/permissions/grouped
  @Get('grouped')
  async findGrouped() {
    const permissions = await this.permissionRepo.find({
      order: { module: 'ASC', code: 'ASC' },
    });

    // Group by module
    return permissions.reduce(
      (acc, perm) => {
        const module = perm.module || 'OTHER';
        if (!acc[module]) acc[module] = [];
        acc[module].push(perm);
        return acc;
      },
      {} as Record<string, Permission[]>,
    );
  }
}
