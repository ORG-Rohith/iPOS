import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './core/tenants/tenants.module';
import { OutletsModule } from './core/outlets/outlets.module';
import { UsersModule } from './auth/users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './common/email/email.module';
import { SeederModule } from './config/seeders/seeder.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
