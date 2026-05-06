import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './infrastructure/database/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './modules/tenants/tenants.module';
import { OutletsModule } from './modules/outlets/outlets.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './infrastructure/email/email.module';
import { SeederModule } from './infrastructure/seeders/seeder.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: configService.get<boolean>('database.sync'),
        synchronize: true,
        logging: true,
      }),
    }),
    TenantsModule,
    OutletsModule,
    UsersModule,
    AuthModule,
    EmailModule,
    SeederModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
