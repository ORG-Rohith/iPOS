import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entity/plan.entity';

@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) { }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find({
      where: { is_active: true },
      order: { price: 'ASC' },
    });
  }

  // ================================
  // 🚀 SAFE SEED (UPSERT STYLE)
  // ================================
  async seed(): Promise<Plan[]> {
    const plans = [
      {
        name: 'Standard',
        code: 'standard',
        description: 'Best for small businesses with a single location.',
        price: 99,
        billing_cycle: 'Monthly' as const,
        max_tenants: 1,
        max_outlets: 2,
        max_users: 10,
        max_devices: 4,
        is_custom: false,
        is_active: true,
      },
      {
        name: 'Plus',
        code: 'plus',
        description: 'Ideal for growing businesses with multiple outlets.',
        price: 199,
        billing_cycle: 'Monthly' as const,
        max_tenants: 2,
        max_outlets: 3,
        max_users: 30,
        max_devices: 6,
        is_custom: false,
        is_active: true,
      },
      {
        name: 'Pro',
        code: 'pro',
        description: 'For established businesses managing multiple brands.',
        price: 399,
        billing_cycle: 'Monthly' as const,
        max_tenants: 5,
        max_outlets: 10,
        max_users: 100,
        max_devices: 20,
        is_custom: false,
        is_active: true,
      },
      {
        name: 'Enterprise',
        code: 'enterprise',
        description: 'Custom limits and dedicated support for large organizations.',
        price: 999,
        billing_cycle: 'Monthly' as const,
        max_tenants: null,
        max_outlets: null,
        max_users: null,
        max_devices: null,
        is_custom: true,
        is_active: true,
      },
    ];

    // ================================
    // 🔧 STEP 1: Backfill codes on old plans (name exists, code is null)
    // ================================
    const codeMap: Record<string, string> = {
      Standard: 'standard',
      Plus: 'plus',
      Pro: 'pro',
      Enterprise: 'enterprise',
    };

    for (const [name, code] of Object.entries(codeMap)) {
      await this.planRepository
        .createQueryBuilder()
        .update(Plan)
        .set({ code })
        .where('name = :name AND code IS NULL', { name })
        .execute();
    }

    // ================================
    // 🔥 STEP 2: UPSERT = INSERT OR UPDATE
    // ================================
    for (const plan of plans) {
      await this.planRepository
        .createQueryBuilder()
        .insert()
        .into(Plan)
        .values(plan)
        .orUpdate(
          [
            'name',
            'description',
            'price',
            'billing_cycle',
            'max_tenants',
            'max_outlets',
            'max_users',
            'max_devices',
            'is_custom',
            'is_active',
          ],
          ['code'] // 👈 UNIQUE KEY (VERY IMPORTANT)
        )
        .execute();

      this.logger.log(`✔ Upserted plan: ${plan.code}`);
    }

    return this.findAll();
  }
}