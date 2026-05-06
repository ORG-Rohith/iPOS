import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OutletsService } from './outlets.service';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { RequestUser } from '../users/types/jwt-payload.type';

@Controller('outlets')
@UseGuards(JwtAuthGuard)
export class OutletsController {
  constructor(private readonly outletsService: OutletsService) { }

  @Post()
  create(@Body() createOutletDto: CreateOutletDto) {
    return this.outletsService.create(createOutletDto);
  }

  @Get()
  findAll(
    @Query('tenant_id') queryTenantId: string,
    @CurrentUser() user: RequestUser
  ) {
    // If the user belongs to a tenant, they can ONLY see their tenant's outlets
    const effectiveTenantId = user.tenantId ? String(user.tenantId) : queryTenantId;
    return this.outletsService.findAll(effectiveTenantId);
  }

  @Get(':idOrUuid')
  findOne(@Param('idOrUuid') idOrUuid: string) {
    return this.outletsService.findOne(idOrUuid);
  }

  @Put(':idOrUuid')
  update(@Param('idOrUuid') idOrUuid: string, @Body() updateOutletDto: UpdateOutletDto) {
    return this.outletsService.update(idOrUuid, updateOutletDto);
  }

  @Delete(':idOrUuid')
  remove(@Param('idOrUuid') idOrUuid: string) {
    return this.outletsService.remove(idOrUuid);
  }
}
