import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entity/subscription.entity';
import { Plan } from '../plans/entity/plan.entity';
import { Tenant } from '../tenants/entity/tenants.entity';
import { SubscriptionLimitsService } from './subscription-limits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Plan, Tenant])],
  providers: [SubscriptionLimitsService],
  exports: [TypeOrmModule, SubscriptionLimitsService],
})
export class SubscriptionsModule {}
