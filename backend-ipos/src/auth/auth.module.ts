import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../auth/users/strategy/jwt.strategy';

import { User } from './users/users.entity';
import { UserRole } from './user-roles/user-roles.entity';
import { Role } from './roles/roles.entity';
import { SuperAdminSeeder } from '../config/seeders/super-admin.seeder';
import { PermissionsSeeder } from 'src/config/seeders/permissions.seeder';
import { RolesSeeder } from 'src/config/seeders/roles.seeder';
import { Permission } from './permissions/permissions.entity';
import { RolePermission } from './roles/role-permissions.entity';
import { RolesModule } from './roles/roles.module';
import { EmailModule } from 'src/common/email/email.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // ✅ Clean JWT config using process.env directly
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [],
      useFactory: () => ({
        secret: process.env.JWT_SECRET!,
        signOptions: {
          expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
        },
      }),
    }),

    TypeOrmModule.forFeature([
      User,
      UserRole,
      Role,
      Permission,
      RolePermission,
    ]),

    RolesModule,
    EmailModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PermissionsSeeder, // runs first
    RolesSeeder, // runs second
    SuperAdminSeeder, // run third
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
