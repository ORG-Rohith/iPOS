import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PlatformAdminGuard } from '../../shared/guards/platform-admin.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { RequestUser } from 'src/modules/users/types/jwt-payload.type';

// ✅ All routes protected — JWT + Super Admin only
@Controller('tenants')
@UseGuards(JwtAuthGuard, PlatformAdminGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  // POST /api/v1/tenants
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTenantDto, @CurrentUser() user: RequestUser) {
    return this.tenantsService.create(dto);
  }

  // GET /api/v1/tenants
  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  // GET /api/v1/tenants/stats
  @Get('stats')
  getStats() {
    return this.tenantsService.getStats();
  }

  // GET /api/v1/tenants/:uuid
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.tenantsService.findOne(uuid);
  }

  // PUT /api/v1/tenants/:uuid
  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.update(uuid, dto);
  }

  // DELETE /api/v1/tenants/:uuid
  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  remove(@Param('uuid', ParseIntPipe) uuid: string) {
    return this.tenantsService.remove(uuid);
  }
}
