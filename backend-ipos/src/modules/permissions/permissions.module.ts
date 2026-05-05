import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [],
  exports: [TypeOrmModule],
})
export class PermissionsModule {}
