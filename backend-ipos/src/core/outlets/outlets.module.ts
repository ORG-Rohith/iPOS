import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutletsService } from './outlets.service';
import { OutletsController } from './outlets.controller';
import { Outlet } from './outlets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Outlet])],
  controllers: [OutletsController],
  providers: [OutletsService],
  exports: [OutletsService],
})
export class OutletsModule {}
