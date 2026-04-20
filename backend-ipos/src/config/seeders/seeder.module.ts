import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../auth/permissions/permissions.entity';
import { PermissionsSeeder } from './permissions.seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsSeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
