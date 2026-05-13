import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BusinessOwnersService } from './business-owners.service';
import { CreateBusinessOwnerDto } from './dto/create-business-owner.dto';
import { UpdateBusinessOwnerDto } from './dto/update-business-owner.dto';

@Controller('business-owners')
export class BusinessOwnersController {
  constructor(private readonly businessOwnersService: BusinessOwnersService) { }

  @Post()
  create(@Body() createBusinessOwnerDto: CreateBusinessOwnerDto) {
    return this.businessOwnersService.create(createBusinessOwnerDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.businessOwnersService.findAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessOwnersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessOwnerDto: UpdateBusinessOwnerDto) {
    return this.businessOwnersService.update(+id, updateBusinessOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.businessOwnersService.remove(id);
  }
}
