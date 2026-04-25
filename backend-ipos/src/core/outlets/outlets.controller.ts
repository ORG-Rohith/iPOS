import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OutletsService } from './outlets.service';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';

@Controller('outlets')
export class OutletsController {
  constructor(private readonly outletsService: OutletsService) { }

  @Post()
  create(@Body() createOutletDto: CreateOutletDto) {
    return this.outletsService.create(createOutletDto);
  }

  @Get()
  findAll(@Query('tenant_id') tenantId?: string) {
    return this.outletsService.findAll(tenantId);
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
