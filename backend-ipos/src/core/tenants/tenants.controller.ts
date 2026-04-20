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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PlatformAdminGuard } from '../../auth/guards/platform-admin.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RequestUser } from '../../auth/users/types/jwt-payload.type';

// ✅ All routes protected — JWT + Super Admin only
@Controller('tenants')
@UseGuards(JwtAuthGuard, PlatformAdminGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

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

  // GET /api/v1/tenants/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.findOne(id);
  }

  // PUT /api/v1/tenants/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.update(id, dto);
  }

  // DELETE /api/v1/tenants/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.remove(id);
  }
}
