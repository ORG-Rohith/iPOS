import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entity/licence.entity';
import { Tenant } from '../tenants/entity/tenants.entity';

@Injectable()
export class SubscriptionLimitsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,

    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) { }

  // ================================
  // CORE: Resolve effective limit
  // ================================
  getEffectiveLimit(
    subscription: Subscription,
    field: 'max_tenants' | 'max_outlets' | 'max_users' | 'max_devices',
  ): number | null {
    const customField = `custom_${field}` as keyof Subscription;
    const customValue = subscription[customField] as number | null;
    const planValue = subscription.plan?.[field] ?? null;

    return customValue ?? planValue;
  }

  // ================================
  // Get active subscription for a business owner
  // ================================
  async getActiveSubscription(businessOwnerId: number): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({
      where: {
        business_owner: { id: businessOwnerId },
        status: 'active',
      },
      relations: ['plan'],
      order: { start_date: 'DESC' },
    });
  }

  // ================================
  // VALIDATE: Tenant creation limit
  // ================================
  async validateTenantLimit(businessOwnerId: number): Promise<void> {
    const subscription = await this.getActiveSubscription(businessOwnerId);
    if (!subscription) {
      throw new ForbiddenException('No active subscription found for this business owner.');
    }

    const maxTenants = this.getEffectiveLimit(subscription, 'max_tenants');
    if (maxTenants === null) return; // Enterprise with no cap

    const currentCount = await this.tenantRepository.count({
      where: { business_owner_id: businessOwnerId, is_deleted: false },
    });

    if (currentCount >= maxTenants) {
      throw new ForbiddenException(
        `Tenant limit reached (${currentCount}/${maxTenants}). Upgrade your plan or contact support.`,
      );
    }
  }

  // ================================
  // VALIDATE: Outlet creation limit
  // ================================
  async validateOutletLimit(businessOwnerId: number): Promise<void> {
    const subscription = await this.getActiveSubscription(businessOwnerId);
    if (!subscription) {
      throw new ForbiddenException('No active subscription found for this business owner.');
    }

    const maxOutlets = this.getEffectiveLimit(subscription, 'max_outlets');
    if (maxOutlets === null) return;

    // Count outlets across all tenants of this business owner
    const currentCount = await this.tenantRepository
      .createQueryBuilder('tenant')
      .innerJoin('tenant.outlets', 'outlet')
      .where('tenant.business_owner_id = :businessOwnerId', { businessOwnerId })
      .andWhere('tenant.is_deleted = false')
      .getCount();

    if (currentCount >= maxOutlets) {
      throw new ForbiddenException(
        `Outlet limit reached (${currentCount}/${maxOutlets}). Upgrade your plan or contact support.`,
      );
    }
  }

  // ================================
  // VALIDATE: User creation limit
  // ================================
  async validateUserLimit(businessOwnerId: number): Promise<void> {
    const subscription = await this.getActiveSubscription(businessOwnerId);
    if (!subscription) {
      throw new ForbiddenException('No active subscription found for this business owner.');
    }

    const maxUsers = this.getEffectiveLimit(subscription, 'max_users');
    if (maxUsers === null) return;

    const currentCount = await this.tenantRepository
      .createQueryBuilder('tenant')
      .innerJoin('tenant.users', 'user')
      .where('tenant.business_owner_id = :businessOwnerId', { businessOwnerId })
      .andWhere('tenant.is_deleted = false')
      .getCount();

    if (currentCount >= maxUsers) {
      throw new ForbiddenException(
        `User limit reached (${currentCount}/${maxUsers}). Upgrade your plan or contact support.`,
      );
    }
  }

  // ================================
  // VALIDATE: Device creation limit
  // ================================
  async validateDeviceLimit(businessOwnerId: number): Promise<void> {
    const subscription = await this.getActiveSubscription(businessOwnerId);
    if (!subscription) {
      throw new ForbiddenException('No active subscription found for this business owner.');
    }

    const maxDevices = this.getEffectiveLimit(subscription, 'max_devices');
    if (maxDevices === null) return;

    // Device limit validation placeholder
    // Implement when Device entity/relation is available
    // const currentCount = await deviceRepository.count(...)
  }
}
