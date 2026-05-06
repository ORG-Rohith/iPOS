import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { PlatformAdminGuard } from 'src/shared/guards/platform-admin.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { RequestUser } from './types/jwt-payload.type';
import { UpdateUserDto } from './dto/update-users.dto';
import { ParseIntPipe } from '@nestjs/common';
import { Get, Patch, Delete, Param } from '@nestjs/common';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('admin')
  @UseGuards(PlatformAdminGuard)
  @HttpCode(HttpStatus.CREATED)
  adminUser(@Body() dto: CreateUserDto, @CurrentUser() user: RequestUser) {
    return this.usersService.adminUser(dto);
  }

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.usersService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto, @CurrentUser() user: RequestUser) {
    // If the user belongs to a tenant, force the new user to belong to that same tenant
    if (user.tenantId) {
      dto.tenant_id = user.tenantId;
    }
    return this.usersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto, @CurrentUser() user: RequestUser) {
    // A more thorough implementation would check if the user belongs to the tenant before updating
    if (user.tenantId) {
      dto.tenant_id = user.tenantId;
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // A more thorough implementation would verify the user belongs to the tenant before deleting
    return this.usersService.remove(id);
  }
}
