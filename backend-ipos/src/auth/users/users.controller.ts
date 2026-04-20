import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateTenantDto } from 'src/core/tenants/dto/create-tenant.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RequestUser } from './types/jwt-payload.type';
import { CreateUserDto } from './dto/create-users.dto';
import { PlatformAdminGuard } from '../guards/platform-admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('admin')
  @UseGuards(JwtAuthGuard, PlatformAdminGuard)
  @HttpCode(HttpStatus.CREATED)
  adminUser(@Body() dto: CreateUserDto, @CurrentUser() user: RequestUser) {
    return this.usersService.adminUser(dto);
  }
}
