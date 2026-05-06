import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PlatformAdminGuard } from '../../shared/guards/platform-admin.guard';
import { RequestUser } from '../users/types/jwt-payload.type';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  // POST /api/v1/roles
  @Post()
  @UseGuards(PlatformAdminGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  // GET /api/v1/roles
  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.rolesService.findAll(user);
  }

  // GET /api/v1/roles/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  // POST /api/v1/roles/:id/permissions
  @Post(':id/permissions')
  assignPermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body('permission_ids') permissionIds: number[],
  ) {
    return this.rolesService.assignPermissions(id, permissionIds);
  }

  // DELETE /api/v1/roles/:id/permissions/:permissionId
  @Delete(':id/permissions/:permissionId')
  removePermission(
    @Param('id', ParseIntPipe) id: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
  ) {
    return this.rolesService.removePermission(id, permissionId);
  }

  // DELETE /api/v1/roles/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
