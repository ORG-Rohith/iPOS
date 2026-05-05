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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('admin')
  @UseGuards(JwtAuthGuard, PlatformAdminGuard)
  @HttpCode(HttpStatus.CREATED)
  adminUser(@Body() dto: CreateUserDto, @CurrentUser() user: RequestUser) {
    return this.usersService.adminUser(dto);
  }
}
