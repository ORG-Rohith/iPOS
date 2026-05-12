import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessOwnersService } from './business-owners.service';
import { BusinessOwnersController } from './business-owners.controller';
import { BusinessOwner } from './entity/business-owner.entity';
import { Subscription } from '../subscriptions/entity/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessOwner, Subscription])],
  controllers: [BusinessOwnersController],
  providers: [BusinessOwnersService],
  exports: [BusinessOwnersService],
})
export class BusinessOwnersModule {}
