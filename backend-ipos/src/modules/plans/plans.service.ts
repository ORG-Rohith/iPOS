import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entity/plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }

  async seed(): Promise<Plan[]> {
    const plans = [
      { name: 'Standard', price: 99, billing_cycle: 'Monthly' as const },
      { name: 'Plus', price: 199, billing_cycle: 'Monthly' as const },
      { name: 'Enterprise', price: 299, billing_cycle: 'Monthly' as const },
    ];

    for (const p of plans) {
      const exists = await this.planRepository.findOne({ where: { name: p.name } });
      if (!exists) {
        await this.planRepository.save(this.planRepository.create(p));
      }
    }
    
    return this.findAll();
  }
}
