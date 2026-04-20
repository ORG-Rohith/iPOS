import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from './users.entity';
import { Role } from '../roles/roles.entity';
import { UserRole } from '../user-roles/user-roles.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY', // later move to env
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Role, UserRole]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
